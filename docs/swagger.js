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
 * /api/user/pets/{petId}/medical-record:
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
 * /api/user/pets/{petId}/medical-record:
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
 * /api/user/pets/{petId}/medical-record:
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
 * /api/specialists:
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
