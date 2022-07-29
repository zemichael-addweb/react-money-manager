import { ObjectId } from 'bson';
import { ResponseBuilder } from '../shared/response-builder';
import { requestInterceptor } from '../interceptors/interceptor';
import { logger } from '../classes/consoleLoggerClass';
import { ErrorCode } from '../shared/error-codes';
import { Service } from 'src/services';
import { Request, Response } from 'express';
import { createAccountSchema, getAllAccountsSchema } from '@routes/account/schema';
import { IAccount } from 'src/interfaces/account';

export class AccountController {
    public constructor(private readonly _service: Service) { }

    //register
    public createAccount: any = async (req: Request, res: Response): Promise<void> => {
        requestInterceptor(req.body);
        try {
            if (req.body || req.params) {
                let validationBody = {
                    userId: req.body.user_id,
                    balance: req.body.account_balance,
                    bank: req.body.bank,
                    number: req.body.account_number,
                    name: req.body.account_name,
                };
                const result = createAccountSchema.validate(validationBody);
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
                    let userId = result.value.userId;
                    let balance = result.value.balance;
                    let bank = result.value.bank;
                    let number = result.value.number;
                    let name = result.value.name
                    //find existing user for validation

                    //check passwords match validation
                    let existingAccount = await this._service.findExistingAccountByNumberOrName(name, number);
                    if (!existingAccount) {
                        const newAccount: IAccount = {
                            userId: new ObjectId(userId),
                            balance: balance,
                            accountName: name,
                            bank: bank,
                            accountNumber: number,
                            created: new Date().toISOString()
                        }
                        let registeredAccount = await this._service.createAccount(newAccount);
                        logger.infoData(registeredAccount, 'registeredAccount');
                        if (registeredAccount) {
                            return ResponseBuilder.ok(
                                { message: "Successfully Registered", data: registeredAccount },
                                res
                            );
                        } else {
                            return ResponseBuilder.configurationError(
                                ErrorCode.GeneralError,
                                'Error registering user!',
                                res
                            );
                        }
                    } else {
                        logger.infoData('Account already exist!');
                        return ResponseBuilder.badRequest(
                            ErrorCode.Invalid,
                            'Account already exist!',
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

    //get all accounts
    public getAllAccounts: any = async (req: Request, res: Response): Promise<void> => {
        requestInterceptor(req.body);
        try {
            if (req.body || req.params) {
                let validationBody = {
                    userId: req.body.user_id,
                };
                const result = getAllAccountsSchema.validate(validationBody);
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
                    let userId = result.value.userId;
                    let allAccounts = await this._service.getAllAccounts(userId);
                    if (allAccounts) {
                        logger.infoData(allAccounts, 'allAccounts');
                        return ResponseBuilder.ok(
                            { message: "Successfully fetched!", data: allAccounts },
                            res
                        );

                    } else {
                        logger.infoData('Error fetching accounts!');
                        return ResponseBuilder.badRequest(
                            ErrorCode.Invalid,
                            'Error fetching accounts!',
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
