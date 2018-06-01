import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    patients: [{
      type: Schema.Types.ObjectId,
      ref: 'patient'
    }]
});

UserSchema.pre('save', function save(next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, null, (err, hash) => {
          if (err) {
              return next(err);
          }

          user.password = hash;
          next();
        });
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, func) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      func(err, isMatch);
    });
};

UserSchema.statics.addPatient = function(userId, dni, name, phone, address) {
  const Patient = mongoose.model('patient');

  return this.findById(userId)
    .then(user => {
      const patient = new Patient({ dni, name, phone, address, user })
      user.patients.push(patient)
      return Promise.all([patient.save(), user.save()])
        .then(([patient]) => patient);
    });
}

UserSchema.statics.findPatients = function(id) {
  return this.findById(id)
    .populate('patients')
    .then(user => user.patients);
};

mongoose.model('user', UserSchema);