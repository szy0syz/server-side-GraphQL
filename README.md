# Server-Side-GraphQL

> 补点基础了，要不然就只会用而已。

## Schemas

- **Creating a Schema**
  - Using Schema Definition Language (SDL)
  - Programmatically Creating a Schema using language construts
- **Creating a Schema**
  - Types - a construct defining a shape with fields
  - Fields - keys on a type that have a name and a value type
  - Scalars - primitive value type built into GraphQL
  - Query - type that defines how clients can access data
  - Mutation - type that defines how clients can modify or create data

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

## Queries & Resolvers

### What is a Query

A **Type **on a Schema that defines operations clients can perform to access data that resembles the shape of the other types in the Schema.

> Query 返回的是 Schema 中的一个 Type，它定义了客户端能够访问到的数据。什么样的数据呢？可能是 Schema 中其他多个 types 组成的 shape 组合 。

### Creating Query

- Create Query type in the Schema using SDL
- Add fields to the Query Type
- Create Resolvers that for the fields

### What are Resolvers

Functions that are responsible for returning values for fields that exist on Types in a Schema. Resolvers execution is dependent on the incoming client Query.

> Resolver 是一个负责返回 在 Schema 里已存在的 Types 的所有字段的值。Resolver 的解析依赖于传入的 Query 参数。

### Creating Resolvers

- Resolver names must match the exact field name on your Schema's Types
  - Resovler 的名称 必须匹配与 Schmea Query Type 里定义的名称一致
- Resovers must return the value type declared for the matching field
  - Resovler 返回的值类型必须是已在 Schmea 定义的 field
- Resolver can be async
- Can retrieve(检索) data from any source

### Schema + Resolvers => Server

To create a server, at minimum, we need a Query Type with a field, and a Resolver for that field.
