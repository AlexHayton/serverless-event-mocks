import {
  APIGatewayProxyEvent,
  SQSMessageAttributes,
  StreamRecord,
} from "aws-lambda";
import {
  createMockAPIGatewayEvent,
  createMockSQSRecord,
  createMockDynamoDBStreamRecord,
} from "./mock-events";

describe("Mock Events", () => {
  const body = { hello: "world" };
  const stringBody = JSON.stringify(body);

  describe("createMockAPIGatewayEvent", () => {
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
        body: stringBody,
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

  describe("createMockSQSRecord", () => {
    it("Can mock an event with no parameters", () => {
      const event = createMockSQSRecord();
      expect(event).toBeDefined();
    });

    it("Can mock an event with just message attributes", () => {
      const messageAttributes: SQSMessageAttributes = {
        hello: {
          stringValue: "world",
          dataType: "String",
          stringListValues: [],
          binaryListValues: [],
        },
      };
      const event = createMockSQSRecord({ messageAttributes });
      expect(event).toBeDefined();
      expect(event.messageAttributes).toEqual(messageAttributes);
    });

    it("Can mock an event with an object body", () => {
      const event = createMockSQSRecord({ body });
      expect(event).toBeDefined();
      expect(event.body).toEqual(stringBody);
    });

    it("Can mock an event with a string body", () => {
      const event = createMockSQSRecord({ body: stringBody });
      expect(event).toBeDefined();
      expect(event.body).toEqual(stringBody);
    });
  });

  describe("createMockDynamoDBStreamRecord", () => {
    it("Can mock an event with no parameters", () => {
      const event = createMockDynamoDBStreamRecord();
      expect(event).toBeDefined();
    });

    it("Can mock an event with dynamodb record", () => {
      const dynamodb: StreamRecord = {
        Keys: {
          Id: {
            N: "101",
          },
        },
        NewImage: {
          Message: {
            S: "Hey you!",
          },
          Id: {
            N: "101",
          },
        },
        StreamViewType: "NEW_AND_OLD_IMAGES",
        SequenceNumber: "111",
        SizeBytes: 2000,
      };
      const event = createMockDynamoDBStreamRecord({
        dynamodb,
      });
      expect(event).toBeDefined();
      expect(event.dynamodb).toEqual(dynamodb);
    });
  });
});
