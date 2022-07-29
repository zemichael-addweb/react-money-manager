import { db } from 'src/config/database';
import { ObjectId } from 'bson';
import { logger } from '../classes/consoleLoggerClass';
import { IExpense } from 'src/interfaces/expense';

export class ExpenseRepository {
    public async registerExpense(newAccount: IExpense): Promise<any> {
        logger.infoData("Registering expense..");
        let result = await db.collection('Expense').insertOne(
            newAccount
            , { upsert: true, returnOriginal: false });

        logger.infoData(result, 'Registered Expense')
        if (result.ops[0]) return result.ops[0]
    };
    public async fetchAllExpense(userId: string, accountId: string): Promise<any> {
        logger.infoData("Fetching Expenses...");
        let result = await db.collection('Expense').find(
            { 'accountId': new ObjectId(accountId), 'userId': new ObjectId(userId) }
        ).toArray();

        logger.infoData(result, 'All Income')
        if (result) return result
    };
    public async deleteExpense(id: string): Promise<any> {
        logger.infoData("Deleting Expenses...");
        let result = await db.collection('Expense').deleteOne(
            { '_id': new ObjectId(id) }
        )
        logger.infoData('Successfully Deleted!')
        if (result.deletedCount === 1) {
            logger.infoData('Successfully Deleted!');
            return {
                message: 'Successfully Deleted!'
            }
        }
    }
}