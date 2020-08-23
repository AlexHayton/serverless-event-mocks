import * as index from ".";

describe("index", () => {
  it("should export mockContext", () => {
    expect(index.createMockContext).toBeInstanceOf(Function);
  })

  it("should export mockEven", () => {
    expect(index.createMockAPIGatewayEvent).toBeInstanceOf(Function);
  })
});
