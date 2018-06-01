import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';
import mongoose from 'mongoose';
import PatientType from "./patient_type";

const Schema = mongoose.Schema;

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
        patient: {
            type: PatientType,
            resolve(parentValue) {
                return Visit.findPatient(parentValue.id);
            }
        },
    })
});

export default VisitType;