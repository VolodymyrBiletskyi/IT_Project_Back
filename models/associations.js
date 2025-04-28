const Appointment = require('./Appointment');
const Specialist = require('./Specialist');
const Pet = require('./Pet');
const User = require('./User');
const Service = require('./Service');

Appointment.belongsTo(Specialist, {
  foreignKey: 'specialist_id',
  as: 'specialist',
});

Specialist.hasMany(Appointment, { // If a specialist can have multiple appointments
  foreignKey: 'specialist_id',
  as: 'appointments',
});

Appointment.belongsTo(Pet, {
  foreignKey: 'pet_id',
  as: 'pet',
});
// Define the association with the Service model
Appointment.belongsTo(Service, {
  foreignKey: 'service_id',
  as: 'service',
});


// Define the association with the User model (if you want this relationship)
Appointment.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

module.exports = { Appointment, Specialist };