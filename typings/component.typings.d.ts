import { Transaction } from "./account.typings";

interface DashboardProps {
    accounts: Account[];
    balance: Balance[];
}

interface DashboardAccountCardProps {
    account: Account;
    accountId: string;
}

interface TransactionsProps {
    transactions: Transaction[];
    accountId?: string;
}
