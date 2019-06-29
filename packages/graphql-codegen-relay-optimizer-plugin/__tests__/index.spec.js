require("@graphql-codegen/testing");
const { buildSchema, parse, print } = require("graphql");
const { plugin } = require("..");

const testSchema = buildSchema(/* GraphQL */ `
  type Avatar {
    id: ID!
    url: String!
  }

  type User {
    id: ID!
    login: String!
    avatar(height: Int!, width: Int!): Avatar
  }

  type Query {
    user: User!
    users: [User!]!
  }
`);

it("can be called", async () => {
  const testDocument = parse(/* GraphQL */ `
    query user {
      user {
        id
      }
    }
  `);
  await plugin(testSchema, [{ path: "lel", content: testDocument }]);
});

it("can be called with queries that include connection fragments", async () => {
  const testDocument = parse(/* GraphQL */ `
    query user {
      users @connection(key: "foo") {
        id
      }
    }
  `);
  await plugin(testSchema, [{ path: "lel", content: testDocument }]);
});

it("can inline @argumentDefinitions/@arguments annotated fragments", async () => {
  const fragmentDocument = parse(/* GraphQL */ `
    fragment UserLogin on User
      @argumentDefinitions(
        height: { type: "Int", defaultValue: 10 }
        width: { type: "Int", defaultValue: 10 }
      ) {
      id
      login
      avatar(width: $width, height: $height) {
        id
        url
      }
    }
  `);
  const queryDocument = parse(/* GraphQL */ `
    query user {
      users {
        ...UserLogin @arguments(height: 30, width: 30)
      }
    }
  `);
  const input = [
    { path: "fragment", content: fragmentDocument },
    { path: "query", content: queryDocument }
  ];
  await plugin(testSchema, input);
  const queryDoc = input.find(
    doc => doc.content.definitions[0].kind === "OperationDefinition"
  );

  expect(queryDoc).toBeDefined();
  expect(print(queryDoc.content)).toBeSimilarStringTo(/* GraphQL */ `
    query user {
      users {
        id
        login
        avatar(width: 30, height: 30) {
          id
          url
        }
      }
    }
  `);
});
