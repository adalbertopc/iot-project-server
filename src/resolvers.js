import User from "./models/User";
import Pool from "./models/Pool";
import bcrypt from "bcryptjs";

import { getToken } from "./utils/getToken";
import { getUser } from "./utils/getUser";

export const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find().populate("pools");
      return users;
    },
    user: async (_, { id }, ctx) => {
      const res = await getUser(ctx);
      if (res.ok) {
        const user = await User.findById(id).populate("pools");
        return user;
      }
      return null;
    },
    token: async (_, { token }, ctx) => {},
    pools: async (_, args, ctx) => {
      const res = await getUser(ctx);
      if (res.ok) {
        const pools = await Pool.find();
        return pools;
      }
      return null;
    },
    pool: async (_, { id }, ctx) => {
      const res = await getUser(ctx);
      if (res.ok) {
        const pool = await Pool.findById(id);
        return pool;
      }
      return null;
    },
  },
  Mutation: {
    createPool: async (_, { input }, ctx) => {
      const res = await getUser(ctx);
      if (res.ok) {
        const newPool = new Pool(input);
        await newPool.save();
        const user = await User.findById(res.decoded.id);
        user.pools.push(newPool);
        await user.save();
        return newPool;
      }
    },
    LoginUser: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        return {
          error: "User not found",
        };
      }
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return {
          error: "Password is incorrect",
        };
      }
      const token = getToken(user);

      return {
        id: user._id,
        ...user._doc,
        token,
      };
    },
    RegisterUser: async (_, { input }) => {
      const { firstName, lastName, email, password } = input;

      const user = await User.findOne({ email });
      if (user) {
        return {
          error: "User already exists",
        };
      }
      const bcryptPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: bcryptPassword,
      });

      const res = await newUser.save();
      const token = getToken(res);

      return {
        id: res._id,
        ...res._doc,
        token,
      };
    },
  },
};
