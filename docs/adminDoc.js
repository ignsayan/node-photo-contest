/**
 * @swagger
 * /api/admin/overview:
 *   get:
 *     summary: Dashboard overview
 *     description: Retrieves overview statistics or data for the admin dashboard.
 *     tags:
 *       - Admin
 *     responses:
 *       default:
 *         description: API response
 */

/**
 * @swagger
 * /api/admin/category/list:
 *   get:
 *     summary: Retrieve the list of categories
 *     tags:
 *       - Admin Categories
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
 *         description: Page number for pagination
 *         required: false
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of categories per page
 *         required: false
 *     responses:
 *       default:
 *         description: API response
 */

/**
 * @swagger
 * /api/admin/category/{id}:
 *   get:
 *     summary: View details of a specific category
 *     tags:
 *       - Admin Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category unique ID
 *     responses:
 *       default:
 *         description: API response
 */

/**
 * @swagger
 * /api/admin/events:
 *   get:
 *     summary: Retrieve the list of events
 *     tags:
 *       - Admin Events
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search events by title or description
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of events per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by event status
 *     responses:
 *       default:
 *         description: API response
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
 *               category:
 *                 type: string
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               upload_limit:
 *                 type: integer
 *               upload_size:
 *                 type: integer
 *               banner:
 *                 type: string
 *                 format: binary
 *               subtitle:
 *                 type: string
 *               description:
 *                 type: string
 *               rules:
 *                 type: string
 *               visibility:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       default:
 *         description: API response
 */

/**
 * @swagger
 * /api/admin/event/{id}:
 *   get:
 *     summary: View details of a specific event
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
 *       default:
 *         description: API response
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
 *             required:
 *               - title
 *               - category
 *               - start_date
 *               - end_date
 *               - upload_limit
 *               - upload_size
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               upload_limit:
 *                 type: integer
 *               upload_size:
 *                 type: integer
 *               banner:
 *                 type: string
 *                 format: binary
 *               subtitle:
 *                 type: string
 *               description:
 *                 type: string
 *               rules:
 *                 type: string
 *               visibility:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       default:
 *         description: API response
 */

/**
 * @swagger
 * /api/admin/submissions:
 *   get:
 *     summary: Get all user submissions
 *     description: Retrieves a list of all submissions for admin review.
 *     tags:
 *       - Admin
 *     responses:
 *       default:
 *         description: API response
 */