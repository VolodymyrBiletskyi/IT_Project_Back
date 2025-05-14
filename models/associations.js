const Appointment = require('./Appointment');
const Specialist = require('./Specialist');
const Pet = require('./Pet');
const User = require('./User');
const Service = require('./Service');
const Review = require('./Review');

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

Pet.belongsTo(User, {
  foreignKey: 'owner_id',
  as: 'owner'
});

User.hasMany(Pet, {
  foreignKey: 'owner_id',
  as: 'pets' // You can choose an alias for the user's pets
});

Pet.hasMany(Appointment, { foreignKey: 'pet_id' });


Service.hasMany(Review, { foreignKey: 'service_id' });
Review.belongsTo(Service, { foreignKey: 'service_id' });

Specialist.hasMany(Review, { foreignKey: 'specialist_id' });
Review.belongsTo(Specialist, { foreignKey: 'specialist_id' });

User.hasMany(Review, { foreignKey: 'user_id' });
Review.belongsTo(User, { foreignKey: 'user_id' });




module.exports = { Appointment, Specialist };