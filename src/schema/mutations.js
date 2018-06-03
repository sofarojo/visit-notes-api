import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';

import AuthService from '../services/auth_service';

import UserType from './types/user_type';
import PatientType from './types/patient_type';
import VisitType from './types/visit_type';

import mongoose from 'mongoose';

const User = mongoose.model('user');
const Patient = mongoose.model('patient');

const mutations = new GraphQLObjectType({
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
    addPatient: {
      type: PatientType,
      args: {
        userId: { type: GraphQLID },
        dni: { type: GraphQLString },
        name: { type: GraphQLString },
        phone: { type: GraphQLString },
        address: { type: GraphQLString },
      },
      resolve(parentValue, { userId, dni, name, phone, address }) {
        return User.addPatient(userId, dni, name, phone, address);
      }
    },
    addVisit: {
      type: VisitType,
      args: {
        userId: { type: GraphQLID },
        patientId: { type: GraphQLID },
        visitDate: { type: GraphQLDateTime },
        diagnosis: { type: GraphQLString },
        secondDiagnosis: { type: GraphQLString },
        notes: { type: GraphQLString },
        indications: { type: GraphQLString }
      },
      resolve(parentValue, args, context) {
        return Patient.addVisit(
            context.user,
            args.patientId,
            args.visitDate,
            args.diagnosis,
            args.secondDiagnosis,
            args.notes,
            args.indications);
      }
    }
  }
});

export default mutations;