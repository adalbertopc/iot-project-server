import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./resolvers";

const typeDefs = `
    type Query {
        hello: String
        allUsers: [User]
        allPools: [Pool]
    }

    type User {
        _id: ID!
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        pools: [Pool]
    }

    type Pool {
        _id: ID!
        owner: ID!
        name: String!
        description: String
        location: String
        specs: Specs!
        image: String
    }

    type Specs {
        width: Int!
        length: Int!
        depth: Int!
        capacity: Int!
    }

    type Mutation {
        createUser(input: UserInput): User
        createPool(input: PoolInput): Pool
    }

    input UserInput {
        firstName: String!
        lastName: String!
        email: String!
        password: String!
    }

    input PoolInput {
        owner: ID!
        name: String!
        description: String
        location: String
        specs: SpecsInput!
        image: String
    }

    input SpecsInput {
        width: Int!
        length: Int!
        depth: Int!
        capacity: Int!
    }
`;

export default makeExecutableSchema({ typeDefs, resolvers });
