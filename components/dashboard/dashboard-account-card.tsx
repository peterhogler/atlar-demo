"use client";
import Link from "next/link";
import { formatCurrency } from "@/utils/currency/formatCurrency";
import DashboardAccountCardChart from "./dashboard-account-card-chart";
import { Account, Balance, Transaction } from "@/typings/account.typings";
import { DashboardAccountCardProps } from "@/typings/component.typings";
import { useEffect, useState } from "react";

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

export default function DashboardAccountCard({ account, accountId }: DashboardAccountCardProps) {
    const [transactions, setTransactions] = useState<Balance[]>([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const transactions = await fetchAccountTransactions(accountId);
                setTransactions(transactions);
            } catch (error) {
                if (error instanceof Error) {
                    throw new Error("Unable to fetch transaction");
                } else {
                    throw new Error("Unknown error while trying to fetch transactions");
                }
            }
        };
        fetchTransactions();
    }, []);

    return (
        <Link className="h-max" href={`/account/${account.id}`}>
            <div className="flex flex-col rounded-lg border flex-1 w-full h-full 2xl:h-[200px]  bg-white hover:scale-[101%] duration-100">
                <div className="p-4 space-y-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className=" text-lg">{account.name}</div>
                            <div className="font-medium">{formatCurrency(account.balance.amount.stringValue, account.balance.amount.currency)}</div>
                        </div>
                        <div>{account.balance.amount.currency}</div>
                    </div>
                </div>
                <div className="h-full">
                    <DashboardAccountCardChart transactions={transactions} />
                </div>
            </div>
        </Link>
    );
}
