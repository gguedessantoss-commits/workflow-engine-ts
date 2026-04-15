import { buildControlTowerSnapshot } from "@workflow-engine/core";

export async function GET() {
  return Response.json(buildControlTowerSnapshot().dashboard);
}
