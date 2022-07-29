import { ObjectId } from "bson";

export interface IExpense {
    userId: ObjectId,
    accountId: ObjectId,
    amount: number,
    reason?: string,
    created: string
}