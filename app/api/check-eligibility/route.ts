import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export type EligibilityStatus = "both" | "gtd" | "fcfs" | "not-found" | "invalid";

function parseCsvAddresses(filename: string): string[] {
  const filePath = path.join(process.cwd(), "data", filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  return raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && line.toLowerCase() !== "address");
}

function normalize(address: string): string {
  return address.trim().toLowerCase();
}

// Build both sets ONCE per server instance, not per request.
const GTD_SET = new Set(parseCsvAddresses("gtd.csv").map(normalize));
const FCFS_SET = new Set(parseCsvAddresses("fcfs.csv").map(normalize));

// Loose EVM-address shape check — 0x + 40 hex chars.
// Swap/extend this if you're checking Solana or another chain's format.
function looksLikeAddress(address: string): boolean {
  return /^0x[a-f0-9]{40}$/i.test(address.trim());
}

export async function POST(req: NextRequest) {
  let body: { address?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { status: "invalid" as EligibilityStatus, error: "Malformed request body" },
      { status: 400 }
    );
  }

  const address = typeof body.address === "string" ? body.address : "";

  if (!address || !looksLikeAddress(address)) {
    return NextResponse.json(
      { status: "invalid" as EligibilityStatus, error: "Not a valid wallet address" },
      { status: 400 }
    );
  }

  const clean = normalize(address);
  const inGtd = GTD_SET.has(clean);
  const inFcfs = FCFS_SET.has(clean);

  let status: EligibilityStatus;
  if (inGtd && inFcfs) status = "both";
  else if (inGtd) status = "gtd";
  else if (inFcfs) status = "fcfs";
  else status = "not-found";

  // Never echo back the lists themselves — only this one address's result.
  return NextResponse.json({ status });
}