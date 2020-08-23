import { createMockContext } from "./mock-context";

describe("Mock Context", () => {
  const context = createMockContext();

  it("can check the remaining time in milliseconds", () => {
    expect(context.getRemainingTimeInMillis()).toEqual(1);
  })

  it("can be done", () => {
    expect(context.done()).toEqual(undefined);
  })

  it("can fail", () => {
    expect(context.fail(new Error("test"))).toEqual(undefined);;
  })

  it("can succeed", () => {
    expect(context.succeed("successful")).toEqual(undefined);
  })
})
