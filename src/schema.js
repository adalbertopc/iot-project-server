import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./resolvers";

const typeDefs = `
    type Query {
        users: [User]
        user(id:String): User
        pools: [Pool]
        pool(id: ID!): Pool
        token(token:String): Boolean
    }

    type User {
        _id: ID!
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        pools: [Pool]
        token: String
    }

    type Pool {
        _id: ID!
        owner: ID!
        name: String!
        description: String
        location: String
        volumen: Int!
        sensorDataHistory: [SensorData]
        image: String
    }

    type SensorData {
        date: String
        ph: Float
    }
    

    type Mutation {
        createPool(input: PoolInput): Pool
        RegisterUser(input: UserInput): User
        LoginUser(email: String!, password: String!): User
        updateUser(input: UserInput): User
        updatePool(input: PoolInput): Pool
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
        volumen: Int!
        sensorID: String!
        image: String
    }

`;

export default makeExecutableSchema({ typeDefs, resolvers });
