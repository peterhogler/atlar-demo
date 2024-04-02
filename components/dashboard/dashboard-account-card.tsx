import Link from "next/link";
import { formatCurrency } from "@/utils/currency/formatCurrency";
import DashboardAccountCardChart from "./dashboard-account-card-chart";
import { Account, Balance } from "@/typings/account.typings";
import { DashboardAccountCardProps } from "@/typings/component.typings";

const USERNAME = "hUfCzFeteKCZgfotD59I";
const PASSWORD = "xmYWTEClhhl9720KE7ccC5FsqRhD8UsTDlpxzJPW2AN34iHE3jl0zgaPcpKfeocQhb_g";

async function fetchAccountTransactions(accountId: string): Promise<Balance[]> {
    const authentication = `Basic ${Buffer.from(`${USERNAME}:${PASSWORD}`).toString("base64")}`;

    const response = await fetch(`https://api.atlar.com/v1beta/accounts/${accountId}/balances`, {
        method: "GET",
        headers: { Authorization: authentication },
    });

    if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
    }

    const { items } = await response.json();

    return items
        .map((item: Balance) => ({
            name: item.localDate,
            uv: parseFloat(item.amount.stringValue.replace(/,/g, "")),
        }))
        .sort((a: any, b: any) => new Date(a.name).getTime() - new Date(b.name).getTime());
}

export default async function DashboardAccountCard({ account, accountId }: DashboardAccountCardProps) {
    const transactions = await fetchAccountTransactions(accountId);
    return (
        <Link className="h-full " href={`/account/${account.id}`}>
            <div className="flex flex-col rounded-lg border w-full h-full bg-white hover:scale-[101%] duration-100">
                <div className="p-4 space-y-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className=" text-lg">{account.name}</div>
                            <div className="font-medium">{formatCurrency(account.balance.amount.stringValue, account.balance.amount.currency)}</div>
                        </div>
                        <div>{account.balance.amount.currency}</div>
                    </div>
                    <hr />
                </div>
                <DashboardAccountCardChart transactions={transactions} />
            </div>
        </Link>
    );
}
