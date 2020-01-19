const gql = require("graphql-tag");
const { ApolloServer } = require("apollo-server");

const typeDefs = gql`
  type User {
    email: String!
    avatar: String
    friends: [User]!
  }

  type Shoe {
    brand: String!
    size: Int!
  }

  input ShoesInput {
    brand: String!
    size: Int
  }

  type Query {
    me: User!
    shoes(input: ShoesInput): [Shoe]
  }
`;

const resolvers = {
  Query: {
    shoes(_, { input }) {
      return [
        { brand: "nike", size: 42 },
        { brand: "adiddas", size: 40 }
      ].filter(shoe => shoe.brand === input.brand);
    },
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
