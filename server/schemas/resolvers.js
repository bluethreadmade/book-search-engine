// resolvers go here
const { User } = require("../models");
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
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });

            if (!user) {
                throw new Error('Something is wrong!');
            }

            const token = signToken(user);
            return { token, user };
        },

        login: async (parent, { username, email, password }) => {
            const user = await User.findOne({ $or: [{ username }, { email }] });

            if (!user) {
                throw new Error("Can't find this user");
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new Error('Wrong password!');
            }

            const token = signToken(user);
            return { token, user };
        },

        saveBook: async (parent, { input }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: input } },
                    { new: true, runValidators: true }
                );

                return updatedUser;
            }

            throw new Error('You need to be logged in!');
        },

        deleteBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );

                if (!updatedUser) {
                    throw new Error("Couldn't find user with this id!");
                }

                return updatedUser;
            }

            throw new Error('You need to be logged in!');
        },
    }
}

module.exports = resolvers;