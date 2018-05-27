const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID
} = require('graphql');

const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString }
    }
});

module.exports = UserType;