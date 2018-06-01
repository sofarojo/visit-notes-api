import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } from 'graphql';
import VisitType from './visit_type';
import UserType from './user_type';

import mongoose from 'mongoose';

const Patient = mongoose.model('patient');

const PatientType = new GraphQLObjectType({
    name: 'PatientType',
    fields: () => ({
        id: { type: GraphQLID },
        dni: { type: GraphQLString },
        name: { type: GraphQLString },
        phone: { type: GraphQLString },
        address: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parentValue) {
              return Patient.findUser(parentValue.id);
            }
        },
        visits: {
            type: new GraphQLList(VisitType),
            resolve(parentValue) {
                return Patient.findVisits(parentValue.id);
            }
        }
    })
});

export default PatientType;