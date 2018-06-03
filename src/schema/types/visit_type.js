import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';
import mongoose from 'mongoose';
import PatientType from './patient_type';
import UserType from './user_type';

const Visit = mongoose.model('visit');

const VisitType = new GraphQLObjectType({
    name: 'VisitType',
    fields: () => ({
        id: { type: GraphQLID },
        visitDate: { type: GraphQLDateTime },
        diagnosis: { type: GraphQLString },
        secondDiagnosis: { type: GraphQLString },
        notes: { type: GraphQLString },
        indications: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent) {
                return Visit.findUser(parent.id);
            }
        },
        patient: {
            type: PatientType,
            resolve(parent) {
                return Visit.findPatient(parent.id);
            }
        },
    })
});

export default VisitType;