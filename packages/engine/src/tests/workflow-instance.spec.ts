import { describe, expect, it } from "vitest";
import { Workflow } from "../domain/entities/workflow.js";
import { WorkflowInstance } from "../domain/entities/workflow-instance.js";

describe("WorkflowInstance", () => {
  const workflow = new Workflow("wf-1", "Test Flow", [
    { id: "draft", name: "Draft", nextStepIds: ["review"] },
    { id: "review", name: "Review", nextStepIds: ["approved"] },
    { id: "approved", name: "Approved", nextStepIds: [] },
  ]);

  it("should start at first step", () => {
    const instance = new WorkflowInstance("instance-1", workflow);

    expect(instance.currentStep.id).toBe("draft");
    expect(instance.status).toBe("running");
  });

  it("should move to next valid step", () => {
    const instance = new WorkflowInstance("instance-1", workflow);

    instance.moveTo("review");

    expect(instance.currentStep.id).toBe("review");
  });

  it("should complete when reaching final step", () => {
    const instance = new WorkflowInstance("instance-1", workflow);

    instance.moveTo("review");
    instance.moveTo("approved");

    expect(instance.status).toBe("completed");
  });

  it("should throw error on invalid transition", () => {
    const instance = new WorkflowInstance("instance-1", workflow);

    expect(() => {
      instance.moveTo("approved");
    }).toThrow();
  });
});
