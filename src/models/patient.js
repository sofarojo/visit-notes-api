import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PatientSchema = new Schema({
  dni: { type: String },
  name: { type: String },
  phone: { type: String },
  address: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  visits: [{
    type: Schema.Types.ObjectId,
    ref: 'visit'
  }]
});

PatientSchema.statics.addVisit = function(user, patientId, visitDate, diagnosis, secondDiagnosis, notes, indications) {
  const Visit = mongoose.model('visit');

  return this.findById(patientId)
    .then(patient => {
      const visit = new Visit({ visitDate, diagnosis, secondDiagnosis, notes, indications, patient, user })
      patient.visits.push(visit)
      return Promise.all([visit.save(), patient.save()])
        .then(([visit]) => visit);
    });
};

PatientSchema.statics.findUser = function(id) {
  return this.findById(id)
    .populate('user')
    .then(patient => patient.user);
};

PatientSchema.statics.findVisits = function(id) {
  return this.findById(id)
    .populate('visits')
    .then(patient => patient.visits);
};

mongoose.model('patient', PatientSchema);