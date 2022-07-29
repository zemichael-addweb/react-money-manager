import { ObjectId } from "bson"

export interface IIncome {
    userId: ObjectId,
    accountId: ObjectId,
    amount: number,
    reason?: string,
    created: string
}