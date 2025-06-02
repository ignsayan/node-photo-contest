/**
 * @swagger
 * /api/admin/overview:
 *   get:
 *     summary: Get admin overview data
 *     description: Retrieves overview statistics or data for the admin dashboard.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved admin overview data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               # define the expected response schema here, for example:
 *               properties:
 *                 userCount:
 *                   type: integer
 *                 activeSessions:
 *                   type: integer
 *                 revenue:
 *                   type: number
 *                   format: float
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/admin/events:
 *   get:
 *     summary: Retrieve a list of admin events
 *     tags:
 *       - Admin Events
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of events retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "event123"
 *                       title:
 *                         type: string
 *                         example: "System Update"
 *                       description:
 *                         type: string
 *                         example: "System was updated successfully."
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-06-01T14:48:00.000Z"
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 10
 *       401:
 *         description: Unauthorized - invalid or missing token
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/admin/event/create:
 *   post:
 *     summary: Create a new event
 *     description: Creates a new event with details including title, category, dates, limits, and banner upload.
 *     tags:
 *       - Admin Events
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - category
 *               - start_date
 *               - end_date
 *               - upload_limit
 *               - upload_size
 *               - banner
 *             properties:
 *               title:
 *                 type: string
 *                 example: PUBG Lan Tournament
 *               category:
 *                 type: string
 *                 example: gaming
 *               start_date:
 *                 type: string
 *                 format: date
 *                 example: 2025-06-06
 *               end_date:
 *                 type: string
 *                 format: date
 *                 example: 2025-08-08
 *               upload_limit:
 *                 type: integer
 *                 example: 4
 *               upload_size:
 *                 type: integer
 *                 description: Maximum upload size in MB
 *                 example: 500
 *               banner:
 *                 type: string
 *                 format: binary
 *                 description: Banner image file upload
 *               subtitle:
 *                 type: string
 *                 example: PUBG Contest
 *               description:
 *                 type: string
 *                 example: This is a gaming photo contest event
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/admin/event/{id}:
 *   get:
 *     summary: Get details of a specific event
 *     description: Retrieves detailed information for an event by its ID.
 *     tags:
 *       - Admin Events
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Event ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved event details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date-time
 *                 description:
 *                   type: string
 *                 location:
 *                   type: string
 *                 attendeesCount:
 *                   type: integer
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Event not found
 */


/**
 * @swagger
 * /api/admin/event/{id}:
 *   put:
 *     summary: Update an existing event
 *     description: Updates event details such as title, category, dates, upload limits, etc.
 *     tags:
 *       - Admin Events
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: PUBG Lan Tournament
 *               category:
 *                 type: string
 *                 example: esports
 *               start_date:
 *                 type: string
 *                 format: date
 *                 example: 2025-06-09
 *               end_date:
 *                 type: string
 *                 format: date
 *                 example: 2025-08-20
 *               upload_limit:
 *                 type: integer
 *                 example: 5
 *               upload_size:
 *                 type: integer
 *                 description: Maximum upload size in MB
 *                 example: 500
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Event not found
 */

/**
 * @swagger
 * /api/admin/submissions:
 *   get:
 *     summary: Get all submissions
 *     description: Retrieves a list of all submissions for admin review.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of submissions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "submission_id_here"
 *                   event_id:
 *                     type: string
 *                     example: "event_id_here"
 *                   user_id:
 *                     type: string
 *                     example: "user_id_here"
 *                   file_url:
 *                     type: string
 *                     format: uri
 *                     example: "https://example.com/uploads/file.jpg"
 *                   submitted_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-06-03T12:00:00Z"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden — User lacks permissions
 */

/**
 * @swagger
 * /api/admin/category/list:
 *   get:
 *     summary: Retrieve a paginated list of categories with optional search
 *     tags:
 *       - Admin Categories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term to filter categories
 *         required: false
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *         required: false
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of categories per page
 *         required: false
 *     responses:
 *       200:
 *         description: List of categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "6838142e6895c07517d97d63"
 *                       name:
 *                         type: string
 *                         example: "Category Name"
 *                 meta:
 *                   type: object
 *                   properties:
 *                     current_page:
 *                       type: integer
 *                       example: 1
 *                     total_pages:
 *                       type: integer
 *                       example: 5
 *                     total_items:
 *                       type: integer
 *                       example: 50
 *       401:
 *         description: Unauthorized - invalid or missing token
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/admin/category/{id}:
 *   get:
 *     summary: Retrieve a single category by ID
 *     tags:
 *       - Admin Categories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category unique ID
 *         example: 68359db21b97f80393b135e8
 *     responses:
 *       200:
 *         description: Category details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 68359db21b97f80393b135e8
 *                 name:
 *                   type: string
 *                   example: "Category Name"
 *                 description:
 *                   type: string
 *                   example: "Optional category description"
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-06-01T12:00:00Z"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-06-05T12:00:00Z"
 *       401:
 *         description: Unauthorized - invalid or missing token
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
