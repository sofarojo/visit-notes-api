const { GraphQLObjectType, GraphQLString } = require('graphql');

const AuthService = require('../services/auth_service');
const UserType = require('./types/user_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, args, request) {
        return AuthService.signup({
          name: args.name,
          email: args.email,
          password: args.password,
          req: request
        });
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, request) {
        const { user } = request;
        request.logout();
        return user;
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, args, request) {
        return AuthService.login({
          email: args.email,
          password: args.password,
          req: request
        });
      }
    },
  }
});

module.exports = mutation;