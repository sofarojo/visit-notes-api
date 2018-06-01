import { GraphQLObjectType } from 'graphql';
import UserType from './user_type';

const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        user: {
            type: UserType,
            resolve(parentValue, args, request) {
                return request.user;
            }
        }
    })
});

export default RootQueryType;
