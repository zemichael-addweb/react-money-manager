import { ObjectId } from 'bson';
import { ResponseBuilder } from '../shared/response-builder';
import { requestInterceptor } from '../interceptors/interceptor';
import { logger } from '../classes/consoleLoggerClass';
import { ErrorCode } from '../shared/error-codes';
import { Service } from '../services';
import { Request, Response } from 'express';
import { ICategory } from '../interfaces/category';
import { createCategorySchema, deleteCategorySchema, editCategorySchema } from '../routes/category/schema';
export class CategoryController {
    public constructor(private readonly _service: Service) { }

    //register
    public createCategory: any = async (req: Request, res: Response): Promise<void> => {
        requestInterceptor(req.body);
        try {
            if (req.body || req.params) {
                let validationBody = {
                    category: req.body.category,
                    description: req.body.description,
                    category_for: req.body.category_for,
                };
                const result = createCategorySchema.validate(validationBody);
                logger.logData('validation result', result);
                if (!result.error) {
                    logger.infoData(result.value);
                    if (Object.keys(result.value).length === 0) {
                        return ResponseBuilder.badRequest(
                            ErrorCode.Invalid,
                            'request body is required and must be not empty',
                            res
                        );
                    }
                    let category = result.value.category;
                    let description = result.value.description;
                    let created = new Date().toISOString();
                    let categoryFor = result.value.category_for;

                    //check userId and accountId...
                    //

                    const newCategory: ICategory = {
                        category: category,
                        description: description,
                        created: created,
                        categoryFor: categoryFor,
                    }
                    let createdCategory = await this._service.createCategory(newCategory);
                    logger.infoData(createdCategory, 'createdCategory');
                    if (createdCategory) {
                        return ResponseBuilder.ok(
                            { message: "Successfully Registered", data: createdCategory },
                            res
                        );
                    } else {
                        return ResponseBuilder.configurationError(
                            ErrorCode.GeneralError,
                            'Error registering category!',
                            res
                        );
                    }
                } else {
                    logger.infoData('error happened');
                    return ResponseBuilder.badRequest(
                        ErrorCode.Invalid,
                        result.error.details[0].message,
                        res
                    );
                }
            } else {
                logger.errorData('body parameters not found');
                return ResponseBuilder.badRequest(
                    ErrorCode.Invalid,
                    'body parameters not found',
                    res
                );
            }
        } catch (error) {
            logger.errorData(error);
            return ResponseBuilder.internalServerError(error, res);
        }
    };

    //fetch all Category
    public getAllCategory: any = async (req: Request, res: Response): Promise<void> => {
        // requestInterceptor(req.query);
        logger.infoData('Getting all category')
        try {
            let allCategory = await this._service.getAllCategory();
            logger.infoData(allCategory, 'All Category');
            if (allCategory) {
                return ResponseBuilder.ok(
                    { message: "Successfully Fetched", data: allCategory },
                    res
                );
            } else {
                return ResponseBuilder.configurationError(
                    ErrorCode.GeneralError,
                    'Error fetching Category!',
                    res
                );
            }

        } catch (error) {
            logger.errorData(error);
            return ResponseBuilder.internalServerError(error, res);
        }
    };

    //Delete Category
    public deleteCategory: any = async (req: Request, res: Response): Promise<void> => {
        // requestInterceptor(req.query);
        logger.infoData(req.query)
        try {
            if (req.query) {
                let validationBody = {
                    id: req.query.id,
                };
                const result = deleteCategorySchema.validate(validationBody);
                logger.logData('validation result', result);
                if (!result.error) {
                    logger.infoData(result.value);
                    if (Object.keys(result.value).length != 0) {
                        let id = result.value.id;
                        let deleted = await this._service.deleteCategory(id);
                        logger.infoData(deleted)
                        if (deleted) {
                            return ResponseBuilder.ok(
                                { message: "Successfully Deleted", data: deleted },
                                res
                            );
                        } else {
                            return ResponseBuilder.configurationError(
                                ErrorCode.GeneralError,
                                'Error deleting Category!',
                                res
                            );
                        }
                    } else {
                        return ResponseBuilder.badRequest(
                            ErrorCode.Invalid,
                            'request params is required and must be not empty',
                            res
                        );
                    }
                } else {
                    logger.infoData('error happened');
                    return ResponseBuilder.badRequest(
                        ErrorCode.Invalid,
                        result.error.details[0].message,
                        res
                    );
                }
            } else {
                logger.errorData('body parameters not found');
                return ResponseBuilder.badRequest(
                    ErrorCode.Invalid,
                    'body parameters not found',
                    res
                );
            }
        } catch (error) {
            logger.errorData(error);
            return ResponseBuilder.internalServerError(error, res);
        }
    };

    //Edit Category
    public editCategory: any = async (req: Request, res: Response): Promise<void> => {
        requestInterceptor(req.body);
        // logger.infoData(req.query)
        try {
            if (req.body) {
                let validationBody = {
                    id: req.body.id,
                    category: req.body.category,
                    description: req.body.description,
                };
                const result = editCategorySchema.validate(validationBody);
                logger.logData('validation result', result);
                if (!result.error) {
                    logger.infoData(result.value);
                    if (Object.keys(result.value).length != 0) {
                        let id = result.value.id;
                        let category = result.value.category;
                        let description = result.value.description;
                        let categoryFor = result.value.categoryFor;

                        const update: any = {
                            category: category,
                            description: description,
                            categoryFor: categoryFor,
                        }
                        let updatedCategory = await this._service.editCategory(id, update);
                        logger.infoData(updatedCategory, 'updatedCategory');
                        if (updatedCategory) {
                            return ResponseBuilder.ok(
                                { message: "Successfully updated", data: updatedCategory },
                                res
                            );
                        } else {
                            return ResponseBuilder.configurationError(
                                ErrorCode.GeneralError,
                                'Error registering category!',
                                res
                            );
                        }
                    } else {
                        return ResponseBuilder.badRequest(
                            ErrorCode.Invalid,
                            'request params is required and must be not empty',
                            res
                        );
                    }
                } else {
                    logger.infoData('error happened');
                    return ResponseBuilder.badRequest(
                        ErrorCode.Invalid,
                        result.error.details[0].message,
                        res
                    );
                }
            } else {
                logger.errorData('body parameters not found');
                return ResponseBuilder.badRequest(
                    ErrorCode.Invalid,
                    'body parameters not found',
                    res
                );
            }
        } catch (error) {
            logger.errorData(error);
            return ResponseBuilder.internalServerError(error, res);
        }
    };
}
