import { Router } from "express";
import {
    createCatalogResource,
    getCatalog,
    getCatalogById,
    updateCatalogById,
} from "../../../controllers/private/v1/catalog.private.controller";
import { body, check } from "express-validator";
import { auth } from "../../middlewares/auth.middleware";
const r: Router = Router();

/**
 * @swagger
 * tags:
 *   name: Catalogs
 *   description: Catalogs of a data space connector
 */

/**
 * @swagger
 * /private/catalogs/:
 *   get:
 *     summary: Get Data space Connector catalog
 *     tags: [Catalogs]
 *     security:
 *       - jwt: []
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Successful response
 */
r.get("/", auth, getCatalog);

/**
 * @swagger
 * /private/catalogs/{id}:
 *   get:
 *     summary: Get Data space Connector catalog
 *     tags: [Catalogs]
 *     security:
 *       - jwt: []
 *     produces:
 *       - application/json
 *     parameters:
 *        - name: id
 *          description: catalog id.
 *          in: path
 *          required: true
 *          type: string
 *     responses:
 *       '200':
 *         description: Successful response
 */
r.get("/:id", auth, getCatalogById);

/**
 * @swagger
 * /private/catalogs/{id}:
 *   put:
 *     summary: Get Data space Connector catalog
 *     tags: [Catalogs]
 *     security:
 *       - jwt: []
 *     produces:
 *       - application/json
 *     parameters:
 *        - name: id
 *          description: catalog id.
 *          in: path
 *          required: true
 *          type: string
 *     requestBody:
 *      content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             enabled:
 *               description: enable or disable the catalog line
 *               type: boolean
 *     responses:
 *       '200':
 *         description: Successful response
 */
r.put(
    "/:id",
    [check("id").isString(), body("enabled").optional().isBoolean()],
    auth,
    updateCatalogById
);

/**
 * @swagger
 * /private/catalogs/:
 *   post:
 *     summary: Create a resource
 *     tags: [Catalogs]
 *     security:
 *       - jwt: []
 *     produces:
 *       - application/json
 *     requestBody:
 *      content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             resourceId:
 *               description: resource id of the resource
 *               type: string
 *             endpoint:
 *               description: endpoint of the resource
 *               type: string
 *             type:
 *               description: type of the resource
 *               type: string
 *     responses:
 *       '200':
 *         description: Successful response
 */
r.post(
    "/",
    [
        body("resourceId").optional().isString(),
        body("type").optional().isString(),
    ],
    auth,
    createCatalogResource
);

export default r;