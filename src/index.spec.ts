import * as index from ".";

describe("index", () => {
  it("should export mockContext", () => {
    expect(index.createMockContext).toBeInstanceOf(Function);
  });

  it("should export createMockAPIGatewayEvent", () => {
    expect(index.createMockAPIGatewayEvent).toBeInstanceOf(Function);
  });

  it("should export createMockSQSRecord", () => {
    expect(index.createMockSQSRecord).toBeInstanceOf(Function);
  });

  it("should export createMockDynamoDBStreamRecord", () => {
    expect(index.createMockDynamoDBStreamRecord).toBeInstanceOf(Function);
  });
});
