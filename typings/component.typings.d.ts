import { Transaction } from "./account.typings";

interface DashboardProps {
    accounts: Account[];
}

interface DashboardAccountCardProps {
    account: Account;
    accountId: string;
}

interface TransactionsProps {
    transactions: Transaction[];
    accountId?: string;
}
