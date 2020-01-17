# Server-Side-GraphQL

frontend masters 《Server-Side GraphQL in Node.js》

## Introduction

### Schemas

* Creating a Schema
  * Using Schema Definition Language (SDL)
  * Programmatically Creating a Schema using language construts

* Basic parts
  * Types - a construct defining a shape with fields
  * Fields - keys on a type that have a name and a value type
  * Scalars - primitive value type built into GraphQL
  * Query - type that defines how clients can access data
  * Mutation - type that defines how clients can modify or create data

```js
const gql = require("graphql-tag");
const { ApolloServer } = require("apollo-server");

const typeDefs = gql`
  type User {
    email: String!
    avatar: String
    friends: [User]!
  }
  type Query {
    me: User!
  }
`;

const resolvers = {
  Query: {
    me() {
      return {
        email: "szy0syz@me.com",
        avatar: "https://jerryshi.com/avatar.jpeg",
        friends: []
      };
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});
server.listen(8405).then(() => console.info("on port 8405"));
```
