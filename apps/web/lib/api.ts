import {
  buildControlTowerSnapshot,
  type ControlTowerSnapshot,
  type ControlTowerSummary,
} from "@workflow-engine/core";
import { cache } from "react";

export const getControlTowerSnapshot = cache(
  async (): Promise<ControlTowerSnapshot> => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!apiBaseUrl) {
      return buildControlTowerSnapshot();
    }

    try {
      const response = await fetch(`${apiBaseUrl}/v1/control-tower/snapshot`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Control tower request failed with ${response.status}`);
      }

      return (await response.json()) as ControlTowerSnapshot;
    } catch {
      return buildControlTowerSnapshot();
    }
  },
);

export const getControlTowerSummary = cache(
  async (): Promise<ControlTowerSummary> => {
    const snapshot = await getControlTowerSnapshot();
    return snapshot.dashboard;
  },
);
