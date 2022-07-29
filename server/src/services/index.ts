import { AuthRepository } from 'src/repositories/AuthRepository';
import { AccountRepository } from 'src/repositories/AccountRepository';
import { ExpenseRepository } from 'src/repositories/ExpenseRepository';
import { IncomeRepository } from 'src/repositories/IncomeRepository';
import { logger } from '../classes/consoleLoggerClass';
import { IAccount } from 'src/interfaces/account';
import { IExpense } from 'src/interfaces/expense';

export class Service {

    //Auth ///
    private AuthRepository = new AuthRepository();
    private AccountRepository = new AccountRepository();
    private ExpenseRepository = new ExpenseRepository();
    private IncomeRepository = new IncomeRepository();

    public async loginUser(email: string, password: string) {
        try {
            const loggedInUser = await this.AuthRepository.login(email, password)
            if (loggedInUser) return loggedInUser;
        } catch (error) {
            logger.errorData('error data:', error);
        }
    }
    public async registerUser(name: string, email: string, password: string,) {
        try {
            const registeredUser = await this.AuthRepository.register(name, email, password)
            if (registeredUser) return registeredUser;
        } catch (error) {
            logger.errorData('error data:', error);
        }
    }
    public async findExistingUserByEmailOrName(name: string, email: string) {
        try {
            const existingUser = this.AuthRepository.findExistingUserByEmailOrName(name, email);
            if (existingUser) return existingUser
        } catch (error) {
            logger.errorData('error data:', error);
        }
    }

    //Account ///
    public async createAccount(newAccount: IAccount) {
        try {
            const existingUser = this.AccountRepository.createAccount(newAccount);
            if (existingUser) return existingUser
        } catch (error) {
            logger.errorData('error data:', error);
        }
    }
    public async findExistingAccountByNumberOrName(name: string, number: number) {
        try {
            const existingUser = this.AccountRepository.findExistingAccountByNumberOrName(name, number);
            if (existingUser) return existingUser
        } catch (error) {
            logger.errorData('error data:', error);
        }
    }

    public async getAllAccounts(userId: string) {
        try {
            const allAccounts = this.AccountRepository.getAllAccounts(userId);
            if (allAccounts) return allAccounts;
        } catch (error) {
            logger.errorData('error data:', error)
        }
    }

    //Expense ///
    public async registerExpense(newExpense: IExpense) {
        try {
            const registeredExpense = this.ExpenseRepository.registerExpense(newExpense)
            if (registeredExpense) return registeredExpense
        } catch (error) {
            logger.errorData('error data:', error);
        }
    }
    public async getAllExpense(userId: string, accountId: string) {
        try {
            const registeredExpense = this.ExpenseRepository.fetchAllExpense(userId, accountId)
            if (registeredExpense) return registeredExpense
        } catch (error) {
            logger.errorData('error data:', error);
        }
    }
    public async deleteExpense(id: string) {
        try {
            const deletedExpense = this.ExpenseRepository.deleteExpense(id)
            if (deletedExpense) return deletedExpense
        } catch (error) {
            logger.errorData('error data:', error);
        }
    }

    //Income ///
    public async registerIncome(newIncome: IExpense) {
        try {
            const registeredExpense = this.IncomeRepository.registerIncome(newIncome)
            if (registeredExpense) return registeredExpense
        } catch (error) {
            logger.errorData('error data:', error);
        }
    }
    public async getAllIncome(userId: string, accountId: string) {
        try {
            const registeredExpense = this.IncomeRepository.fetchAllIncome(userId, accountId)
            if (registeredExpense) return registeredExpense
        } catch (error) {
            logger.errorData('error data:', error);
        }
    }
    public async deleteIncome(id: string) {
        try {
            const deletedIncome = this.IncomeRepository.deleteIncome(id)
            if (deletedIncome) return deletedIncome
        } catch (error) {
            logger.errorData('error data:', error);
        }
    }
}