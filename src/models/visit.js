import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const VisitSchema = new Schema({
    visitDate: { type: Date },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'patient'
    },
    diagnosis: { type: String },
    secondDiagnosis: { type: String },
    notes: { type: String },
    indications: { type: String }
});

VisitSchema.statics.findPatient = function(id) {
  return this.findById(id)
    .populate('patient')
    .then(visit => visit.patient);
};

VisitSchema.statics.findUser = function(id) {
    return this.findById(id)
        .populate('user')
        .then(visit => visit.user);
};

mongoose.model('visit', VisitSchema);