import {
    deleteExoplanetById,
    exoplanetsModel,
    getExoplanetById,
    updateExoplanetById
} from "../../models/exoplanetsModel.js";

export default function (exoplanetsService) {
    let operations = {
        GET: getById,
        PATCH: updateById,
        DELETE: deleteById
    };

    async function getById(request, response, next) {
        let exoplanet = await getExoplanetById(request.params.id)
        response
            .status(200)
            .json(exoplanet);

    }

    async function updateById(request, response, next) {
        response
            .status(200)
            .json(await updateExoplanetById(request.body, request.params.id));
    }

    async function deleteById(request, response, next) {
        response
            .status(200)
            .json(await deleteExoplanetById(request.params.id));
    }

    getById.apiDoc = {
        summary: 'returns a single exoplanet by id.',
        operationId: 'getExoplanetById',
        parameters: [
            {
                name: 'id',
                in: 'path',
                description: 'id of exoplanet to return.',
                required: true,
                schema: {
                    type: 'integer',
                    format: 'int64'
                }
            }
        ],
        responses: {
            200: {
                description: 'an exoplanet with the given id.',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/exoplanet'
                        }
                    },
                    'application/xml': {
                        schema: {
                            $ref: '#/components/schemas/exoplanet'
                        }
                    }
                }
            },
            404: {
                description: 'exoplanet with given id does not exist.'
            }
        }
    };

    updateById.apiDoc = {
        summary: 'updates a single exoplanet by id.',
        operationId: 'updateById',
        parameters: [
            {
                name: 'id',
                in: 'path',
                description: 'id of exoplanet to update.',
                required: true,
                schema: {
                    type: 'integer',
                    format: 'int64'
                }
            }
        ],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            planet_name: {
                                type: 'string'
                            },
                            hostname: {
                                type: 'string'
                            },
                            planet_letter: {
                                type: 'string'
                            }
                        },
                    }
                }
            }
        },
        responses: {
            200: {
                description: 'the updated exoplanet.',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/exoplanet'
                        }
                    },
                    'application/xml': {
                        schema: {
                            $ref: '#/components/schemas/exoplanet'
                        }
                    }
                }
            },
            404: {
                description: 'exoplanet with given id does not exist.'
            }
        }
    };

    deleteById.apiDoc = {
        summary: 'deletes a single exoplanet by id.',
        operationId: 'deleteById',
        parameters: [
            {
                name: 'id',
                in: 'path',
                description: 'id of exoplanet to delete.',
                required: true,
                schema: {
                    type: 'integer',
                    format: 'int64'
                }
            }
        ],
        responses: {
            200: {
                description: 'the deleted exoplanet.',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/exoplanet'
                        }
                    },
                    'application/xml': {
                        schema: {
                            $ref: '#/components/schemas/exoplanet'
                        }
                    }
                }
            },
            404: {
                description: 'exoplanet with given id does not exist.'
            }
        }
    };

    return operations;
}