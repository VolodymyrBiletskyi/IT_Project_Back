/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *               petName:
 *                 type: string
 *               species:
 *                 type: string
 *               breed:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user and get JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /api/auth/edit:
 *   put:
 *     summary: Edit user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *               petName:
 *                 type: string
 *               species:
 *                 type: string
 *               breed:
 *                 type: string
 *               age:
 *                 type: integer
 *               gender:
 *                 type: string
 *               weight:
 *                 type: number
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */

/**
 * @swagger
 * /api/auth/protected:
 *   get:
 *     summary: Access a protected route
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Access granted
 */

/**
 * @swagger
 * /api/auth/reset-password-request:
 *   post:
 *     summary: Request password reset
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reset link sent
 */

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset password using token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successful
 */
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/user/pets:
 *   get:
 *     summary: Get all pets of the authenticated user
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's pets
 *       404:
 *         description: No pets found
 */

/**
 * @swagger
 * /api/user/pets:
 *   post:
 *     summary: Add a new pet for the authenticated user
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - species
 *               - breed
 *               - age
 *               - gender
 *               - weight
 *             properties:
 *               name:
 *                 type: string
 *               species:
 *                 type: string
 *               breed:
 *                 type: string
 *               age:
 *                 type: integer
 *               gender:
 *                 type: string
 *               weight:
 *                 type: number
 *     responses:
 *       201:
 *         description: Pet created
 */

/**
 * @swagger
 * /api/user/pets/{petId}:
 *   put:
 *     summary: Update pet information
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: petId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the pet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - species
 *               - breed
 *               - age
 *               - gender
 *               - weight
 *             properties:
 *               name:
 *                 type: string
 *               species:
 *                 type: string
 *               breed:
 *                 type: string
 *               age:
 *                 type: integer
 *               gender:
 *                 type: string
 *               weight:
 *                 type: number
 *     responses:
 *       200:
 *         description: Pet updated
 */

/**
 * @swagger
 * /api/pets/{petId}/medical-record:
 *   get:
 *     summary: Get a pet's medical record
 *     tags: [Medical Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: petId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pet's medical record
 *       404:
 *         description: Medical record not found
 */

/**
 * @swagger
 * /api/pets/{petId}/medical-record:
 *   post:
 *     summary: Create or update a pet's medical record
 *     tags: [Medical Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: petId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - medical_information
 *               - allergies
 *               - previous_diagnoses
 *               - prescriptions
 *             properties:
 *               medical_information:
 *                 type: string
 *               allergies:
 *                 type: array
 *                 items:
 *                   type: string
 *               previous_diagnoses:
 *                 type: array
 *                 items:
 *                   type: string
 *               prescriptions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Medical record created/updated
 */

/**
 * @swagger
 * /api/pets/{petId}/medical-record:
 *   delete:
 *     summary: Delete a pet's medical record
 *     tags: [Medical Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: petId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Medical record deleted
 *       404:
 *         description: Medical record not found
 */

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Get list of services
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: List of services
 */

/**
 * @swagger
 * /api/appointments:
 *   post:
 *     summary: Create a new appointment
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - phoneNumber
 *               - species
 *               - breed
 *               - serviceId
 *               - specialistId
 *               - date
 *               - time
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               petId:
 *                 type: integer
 *                 description: Optional if creating new pet
 *               species:
 *                 type: string
 *               breed:
 *                 type: string
 *               serviceId:
 *                 type: integer
 *               specialistId:
 *                 type: integer
 *               date:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *                 example: "10:00:00"
 *     responses:
 *       201:
 *         description: Appointment created
 */

/**
 * @swagger
 * /api/appointments:
 *   get:
 *     summary: Get all appointments for the authenticated user
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of appointments
 */

/**
 * @swagger
 * /api/appointments/available-slots:
 *   get:
 *     summary: Get available time slots for a service and date
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: serviceId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of available time slots
 */

/**
 * @swagger
 * /api/all-specialists:
 *   get:
 *     summary: Get list of specialists
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: List of specialists
 */
/**
 * @swagger
 * /api/pets/{petId}:
 *   patch:
 *     summary: Update pet information
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: petId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the pet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - species
 *               - breed
 *               - age
 *               - gender
 *               - weight
 *             properties:
 *               name:
 *                 type: string
 *               species:
 *                 type: string
 *               breed:
 *                 type: string
 *               age:
 *                 type: integer
 *               gender:
 *                 type: string
 *               weight:
 *                 type: number
 *     responses:
 *       200:
 *         description: Pet updated
 */
/**
 * @swagger
 * /api/pets/all:
 *   get:
 *     summary: Get all pets in system
 *     tags: [Doctor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all pets
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/specialist/appointments:
 *   get:
 *     summary: Get appointments assigned to the doctor
 *     tags: [Doctor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully all appointments assigned to the doctor
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/appointments/{appointmentId}/status:
 *   patch:
 *     summary: Update appointment status by specialist
 *     tags: [Doctor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the appointment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, on time, completed, cancelled, delayed, no show]
 *                 example: on time
 *     responses:
 *       200:
 *         description: Appointment status updated successfully
 *       400:
 *         description: Invalid status or missing data
 *       403:
 *         description: Forbidden - Only doctors can update appointment status
 *       404:
 *         description: Appointment not found
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/auth/request-account-deletion:
 *   post:
 *     summary: Request account deletion
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Request link sent
 */
/**
 * @swagger
 * /api/auth/confirm-account-deletion:
 *   delete:
 *     summary: Delete account and associated pets using token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successful
 */

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Submit a new review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - service_id
 *               - specialist_id
 *               - rating
 *             properties:
 *               service_id:
 *                 type: string
 *                 format: uuid
 *               specialist_id:
 *                 type: string
 *                 format: uuid
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 review:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     rating:
 *                       type: integer
 *                     comment:
 *                       type: string
 *                     service_name:
 *                       type: string
 *                     doctor_name:
 *                       type: string
 *       400:
 *         description: Bad request
 *       404:
 *         description: Service or Specialist not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/reviews/service/{id}:
 *   get:
 *     summary: Get reviews for a specific service
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the service
 *     responses:
 *       200:
 *         description: List of reviews for the service
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                   rating:
 *                     type: integer
 *                   comment:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                   Service:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                   Specialist:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *       404:
 *         description: Service not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/reviews/doctor/{id}:
 *   get:
 *     summary: Get reviews for a specific doctor
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the doctor
 *     responses:
 *       200:
 *         description: List of reviews for the doctor
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                   rating:
 *                     type: integer
 *                   comment:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                   Service:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                   Specialist:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *       404:
 *         description: Doctor not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/receptionist/appointments:
 *   get:
 *     summary: Get all appointments (for receptionist)
 *     tags: [Receptionist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                   date:
 *                     type: string
 *                     format: date
 *                   time:
 *                     type: string
 *                   status:
 *                     type: string
 *                   full_name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   phone_number:
 *                     type: string
 *                   pet_name:
 *                     type: string
 *                   species:
 *                     type: string
 *                   breed:
 *                     type: string
 *       403:
 *         description: Forbidden - Only receptionists can access this endpoint
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/receptionist/appointments/{id}:
 *   put:
 *     summary: Update an appointment (for receptionist)
 *     tags: [Receptionist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the appointment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               service_id:
 *                 type: string
 *                 format: uuid
 *               specialist_id:
 *                 type: string
 *                 format: uuid
 *               date:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Appointment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 service_id:
 *                   type: string
 *                   format: uuid
 *                 specialist_id:
 *                   type: string
 *                   format: uuid
 *                 date:
 *                   type: string
 *                   format: date
 *                 time:
 *                   type: string
 *                 status:
 *                   type: string
 *       403:
 *         description: Forbidden - Only receptionists can access this endpoint
 *       404:
 *         description: Appointment not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/receptionist/pets/{id}/appointments:
 *   post:
 *     summary: Create a new appointment for a pet (for receptionist)
 *     tags: [Receptionist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the pet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - service_id
 *               - specialist_id
 *               - date
 *               - time
 *             properties:
 *               service_id:
 *                 type: string
 *                 format: uuid
 *               specialist_id:
 *                 type: string
 *                 format: uuid
 *               date:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 pet_id:
 *                   type: string
 *                   format: uuid
 *                 service_id:
 *                   type: string
 *                   format: uuid
 *                 specialist_id:
 *                   type: string
 *                   format: uuid
 *                 date:
 *                   type: string
 *                   format: date
 *                 time:
 *                   type: string
 *                 status:
 *                   type: string
 *       403:
 *         description: Forbidden - Only receptionists can access this endpoint
 *       404:
 *         description: Pet not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/receptionist/specialists/{specialistId}/appointments:
 *   get:
 *     summary: Get appointments for a specific specialist (for receptionist)
 *     tags: [Receptionist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: specialistId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the specialist
 *     responses:
 *       200:
 *         description: List of appointments for the specialist
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                   date:
 *                     type: string
 *                     format: date
 *                   time:
 *                     type: string
 *                   status:
 *                     type: string
 *                   pet_name:
 *                     type: string
 *                   species:
 *                     type: string
 *                   breed:
 *                     type: string
 *                   user:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                   specialist:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *       403:
 *         description: Forbidden - Only receptionists can access this endpoint
 *       404:
 *         description: Specialist not found
 *       500:
 *         description: Server error
 */