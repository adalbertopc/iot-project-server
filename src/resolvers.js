import User from "./models/User";
import Pool from "./models/Pool";
export const resolvers = {
  Query: {
    hello: () => "Hello world!",
    allUsers: async () => {
      const users = await User.find().populate("pools");
      return users;
    },
    allPools: async () => {
      const pools = await Pool.find();
      return pools;
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      const newUser = new User(input);
      console.log(newUser);
      await newUser.save();
      return newUser;
    },
    createPool: async (_, { input }) => {
      const newPool = new Pool(input);
      console.log(newPool);
      await newPool.save();
      return newPool;
    },
  },
};
