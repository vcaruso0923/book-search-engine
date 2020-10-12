const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, Book } = require('../models');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('savedBooks')
                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },

        getSingleUser: async (parent, args) => {
            const oneUser = User.findOne({ $or: [{ _id: user ? user._id : args.id }, { username: args.username }] })
                .select('-__V -password')
                .populate('savedBooks');
            if (!oneUser) {
                return res.status(400).json({ message: 'Cannot find a user with this id!' });
            }
            return oneUser;
        },
    },
    Mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            if (!user) {
                return res.status(400).json({ message: 'Something is wrong!' });
            }
            return { token, user };
        },

        login: async (parent, args) => {
            const user = await User.findOne({ $or: [{ username: args.username }, { email: args.email }] });
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
        },

        saveBook: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: args } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        deleteBook: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: args.bookId } } },
                    { new: true }
                );
                if (!updatedUser) {
                    return res.status(404).json({ message: "Couldn't find user with this id!" });
                }
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        }

    }

}

module.exports = resolvers;