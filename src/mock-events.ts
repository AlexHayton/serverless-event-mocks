import createEvent from "@serverless/event-mocks";
import {
  APIGatewayProxyEvent,
  DynamoDBRecord,
  SQSRecord,
} from "aws-lambda";

const bodyHeaders = {
  "Content-Type": "application/json",
};

export const isObject = (body: unknown): boolean => typeof body === "object";

export const serialiseBody = (body: unknown): string | null => {
  if (typeof body === "string") {
    return body;
  }

  if (isObject(body)) {
    return JSON.stringify(body);
  }

  return null;
};

export interface MockApiGatewayEvent extends Partial<APIGatewayProxyEvent> {
  body?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export const createMockAPIGatewayEvent = (
  args?: MockApiGatewayEvent
): APIGatewayProxyEvent =>
  createEvent("aws:apiGateway", {
    headers: isObject(args?.body) ? bodyHeaders : {},
    httpMethod: "GET",
    isBase64Encoded: false,
    multiValueHeaders: {},
    multiValueQueryStringParameters: {},
    path: "/",
    pathParameters: {},
    requestContext: {
      accountId: "123456789012",
      authorizer: null,
      resourceId: "us4z18",
      protocol: "https",
      stage: "test",
      requestId: "41b45ea3-70b5-11e6-b7bd-69b5aaebc7d9",
      identity: {
        accessKey: "",
        apiKeyId: "",
        cognitoIdentityPoolId: "",
        accountId: "",
        cognitoIdentityId: "",
        caller: "",
        apiKey: "",
        sourceIp: "192.168.100.1",
        cognitoAuthenticationType: "",
        cognitoAuthenticationProvider: "",
        principalOrgId: "123456789012",
        userArn: "",
        userAgent:
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36 OPR/39.0.2256.48",
        user: "",
      },
      path: "",
      requestTimeEpoch: 0,
      resourcePath: "/{proxy+}",
      httpMethod: "GET",
      apiId: "wt6mne2s9k",
    },
    queryStringParameters: {},
    resource: "/{proxy+}",
    stageVariables: {},
    ...args,
    body: serialiseBody(args?.body),
  });

  export interface MockSQSRecord extends Partial<SQSRecord> {
    body?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  }

export const createMockSQSRecord = (args?: Partial<MockSQSRecord>): SQSRecord => ({
  messageId: "4a74756e-4a37-404c-927f-242fd79b6f1e",
  receiptHandle: "asd",
  attributes: {
    ApproximateReceiveCount: "32",
    SentTimestamp: new Date().toISOString(),
    SenderId: Math.floor(Math.random() * 100000).toString(),
    ApproximateFirstReceiveTimestamp: new Date().toISOString(),
  },
  messageAttributes: {},
  md5OfBody: "string",
  eventSource: "string",
  eventSourceARN: "string",
  awsRegion: "string",
  ...args,
  body: serialiseBody(args?.body) || "",
});

export const createMockDynamoDBStreamRecord = (
  args?: Partial<DynamoDBRecord>
): DynamoDBRecord => ({
  eventID: "1",
  eventVersion: "1.0",
  dynamodb: {
    Keys: {
      Id: {
        N: "101",
      },
    },
    NewImage: {
      Message: {
        S: "New item!",
      },
      Id: {
        N: "101",
      },
    },
    StreamViewType: "NEW_AND_OLD_IMAGES",
    SequenceNumber: "111",
    SizeBytes: 26,
  },
  awsRegion: "eu-west-2",
  eventName: "INSERT",
  eventSourceARN: "arn:aws:dynamodb:us-east-1:123456789012:table/images",
  eventSource: "aws:dynamodb",
  ...args,
});
