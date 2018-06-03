import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import UserType from './user_type';
import PatientType from './patient_type';
import VisitType from './visit_type';
import mongoose from 'mongoose';
import { UnauthorizedError } from '../../common/unauthorized_permission';

const Patient = mongoose.model('patient');
const Visit = mongoose.model('visit');

const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        user: {
            type: UserType,
            resolve(parent, args, context) {
                if (context.user) {
                    return context.user;
                }
                throw new UnauthorizedError();
            }
        },
        patients: {
            type: new GraphQLList(PatientType),
            resolve(parent, args, context) {
                if (context.user) {
                    return Patient.find({
                        user: context.user
                    });
                }
                throw new UnauthorizedError();
            }
        },
        patient: {
            type: PatientType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parent, { id }, context) {
                if (context.user) {
                    return Patient.findOne({
                        _id: id,
                        user: context.user
                    });
                }
                throw new UnauthorizedError();
            }
        },
        visits: {
            type: new GraphQLList(VisitType),
            resolve(parent, args, context) {
                if (context.user) {
                    return Visit.find({
                        user: context.user
                    });
                }
                throw new UnauthorizedError();
            }
        },
        visit: {
            type: VisitType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, { id }, context) {
                if (context.user) {
                    return Visit.findOne({
                        _id: id,
                        user: context.user
                    });
                }
                throw new UnauthorizedError();
            }
        }
    })
});

export default RootQueryType;
