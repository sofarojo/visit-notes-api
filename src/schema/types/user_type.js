import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } from 'graphql';
import mongoose from 'mongoose';
import PatientType from './patient_type';

const User = mongoose.model('user');

const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        patients: {
            type: new GraphQLList(PatientType),
            resolve(parent) {
              return User.findPatients(parent.id);
            }
        }
    })
});

export default UserType;