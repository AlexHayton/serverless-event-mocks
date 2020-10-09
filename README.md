# @homeservenow/serverless-event-mocks

This library exposes mock event factories for use in lambda tests. Each one accepts a partial event and fills in the rest of it with sensible defaults.

Each event that takes a `body` will also helpfully stringify any objects you pass to it, so you don't need to repeat this logic all over the place in your tests.

## Sample usage

```js
const context = createMockContext();
const event = createMockAPIGatewayEvent({
  path: "/path",
  httpMethod: "post",
  pathParameters: { jobID: job.id },
});

const result = await handler(event, context);
expect(result.statusCode).toEqual(200);
```

## Documentation

[createMockContext](src/mock-context.ts)

[createMockAPIGatewayEvent](src/mock-events.ts)
