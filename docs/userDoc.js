/**
 * @swagger
 * /api/user/events:
 *   get:
 *     summary: Retrieve the list of active events
 *     tags:
 *       - User Submissions
 *     description: Retrieve a list of events for the authenticated user, optionally filtered by search and paginated.
 *     parameters:
 *       - name: search
 *         in: query
 *         description: Search term to filter events
 *         required: false
 *         schema:
 *           type: string
 *       - name: page
 *         in: query
 *         description: Page number for pagination
 *         required: false
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         description: Number of items per page
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       default:
 *         description: API response
 */

/**
 * @swagger
 * /api/user/event/{id}:
 *   get:
 *     summary: View details of a specific active event
 *     tags:
 *       - User Submissions
 *     description: Retrieve details of a single event for the authenticated user.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Event unique ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       default:
 *         description: API response
 */

/**
 * @swagger
 * /api/user/submission/create:
 *   post:
 *     summary: Create a new submission
 *     tags:
 *       - User Submissions
 *     description: Submits an upload tied to a specific event.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - event
 *               - user_uploads
 *             properties:
 *               event:
 *                 type: string
 *                 description: ID of the event being submitted to
 *               user_uploads:
 *                 type: array
 *                 description: Files to be uploaded
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       default:
 *         description: API response
 */

/**
 * @swagger
 * /api/user/submissions:
 *   get:
 *     summary: View own submissions
 *     tags:
 *       - User Submissions
 *     description: Retrieve user submissions with optional filtering by status and pagination.
 *     parameters:
 *       - name: status
 *         in: query
 *         description: Filter submissions by status (e.g., pending, approved, rejected)
 *         required: false
 *         schema:
 *           type: string
 *       - name: page
 *         in: query
 *         description: Page number for pagination
 *         required: false
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         description: Number of submissions per page
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       default:
 *         description: API response
 */

/**
 * @swagger
 * /api/user/submission/{id}:
 *   delete:
 *     summary: Delete a user submission
 *     tags:
 *       - User Submissions
 *     description: Allows the authenticated user to delete their own submission by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the submission to delete
 *     responses:
 *       default:
 *         description: Success or error response
 */
