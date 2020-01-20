const gql = require("graphql-tag");
const { ApolloServer } = require("apollo-server");

const typeDefs = gql`
  """
  鞋的品牌枚举集
  """
  enum ShoeType {
    JORDAN
    NIKE
    ADIDDAS
    TIMBERLAND
  }

  type User {
    email: String!
    avatar: String
    friends: [User]!
  }

  interface Shoe {
    brand: ShoeType!
    size: Int!
  }

  type Sneaker implements Shoe {
    brand: ShoeType!
    size: Int!
    sport: String
  }

  type Boot implements Shoe {
    brand: ShoeType!
    size: Int!
    hasGrip: Boolean
  }

  input ShoesInput {
    brand: ShoeType
    size: Int
  }

  input NewShoeInput {
    brand: ShoeType!
    size: Int!
  }

  type Query {
    me: User!
    shoes(input: ShoesInput): [Shoe]
  }

  type Mutation {
    newShoe(input: NewShoeInput!): Shoe!
  }
`;

const resolvers = {
  Query: {
    shoes() {
      return [
        { brand: "NIKE", size: 42, sport: 'cool' },
        { brand: "TIMBERLAND", size: 45, hasGrip: true }
      ];
    },
    me() {
      return {
        email: "szy0syz@me.com",
        avatar: "https://jerryshi.com/avatar.jpeg",
        friends: []
      };
    }
  },
  Mutation: {
    newShoe(_, { input }) {
      return input;
    }
  },
  Shoe: {
    __resolveType(shop) {
      if (shop.sport) return "Sneaker";
      return "Boot";
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen(8405).then(() => console.info("on port 8405"));
