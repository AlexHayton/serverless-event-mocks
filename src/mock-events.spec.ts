import { APIGatewayProxyEvent } from "aws-lambda";
import { createMockAPIGatewayEvent } from "./mock-events";

describe("Mock Events", () => {
  describe("createMockAPIGatewayEvent", () => {
    const body = { hello: "world" };
    const stringBody = JSON.stringify(body);

    it("Can mock an event with no parameters", () => {
      const event: APIGatewayProxyEvent = createMockAPIGatewayEvent();
      expect(event).toBeDefined();
    });

    it("Can mock an event with just a path", () => {
      const event: APIGatewayProxyEvent = createMockAPIGatewayEvent({
        path: "/test",
      });
      expect(event).toBeDefined();
    });

    it("Can mock an event with a path, method and string body", () => {
      const event: APIGatewayProxyEvent = createMockAPIGatewayEvent({
        path: "/test",
        httpMethod: "post",
        body: JSON.stringify({ hello: "world" }),
      });
      expect(event).toBeDefined();
      expect(event.body).toEqual(stringBody);
    });

    it("Can mock an event with a path, method and object body", () => {
      const event: APIGatewayProxyEvent = createMockAPIGatewayEvent({
        path: "/test",
        httpMethod: "post",
        body,
      });
      expect(event).toBeDefined();
      expect(event.body).toEqual(stringBody);
    });
  });
});
