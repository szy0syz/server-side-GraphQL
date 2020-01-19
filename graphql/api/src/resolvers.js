/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

module.exports = {
  Query: {
    pets(_, { input }, ctx) {
      return ctx.models.Pet.findMany(input);
      // console.log('input~~', input);
      // console.log('ctx~~', ctx);
      // return [
      //   { id: 1, name: "aaa" },
      //   { id: 2, name: "bbb" }
      // ];
    },
    pet(_, { input }, ctx) {
      return ctx.models.Pet.findOne(input);
    }
  },
  // Mutation: {

  // },
  Pet: {
    id(pet) {
      console.log("\n\nResolver Pet id(pet):", pet);
      return 4;
    },
    img(pet) {
      console.log("pet", pet);
      return pet.type === "DOG" ? "https://placedog.net/300/300" : "http://placekitten.com/300/300";
    }
  }
  // User: {

  // }
};
