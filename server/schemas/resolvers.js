// resolvers go here
const { User, Book } = require("../models");
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, { id, username }) => {
            const query = id ? { _id: id } : { username };

            const foundUser = await User.findOne(query);

            if (!foundUser) {
                throw new Error('Cannot find a user with this id or username!');
            }

            return foundUser;
        },
    },

    Mutation: {

    }
}

module.exports = resolvers;