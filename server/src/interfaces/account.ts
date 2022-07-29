import { ObjectId } from "bson";

export interface IAccount {
    userId: ObjectId,
    balance: number,
    accountName: string,
    bank?: string,
    accountNumber?: number,
    created: string
}