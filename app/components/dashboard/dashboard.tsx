import Link from "next/link";
import DashboardAccountSummary from "./dashboard-account-summary";
import DashboardAccountChart from "./dashboard-account-chart";
import dynamic from "next/dynamic";
import React from "react";
import DashboardAccountCard from "./dashboard-account-card";

interface Props {
    accounts: any[];
}

export default function Dashboard({ accounts }: Props) {
    return (
        <div className="flex flex-col h-full gap-4">
            <div className="h-2/6 flex flex-col xl:flex-row gap-4">
                <DashboardAccountSummary accounts={accounts} />
                <DashboardAccountChart />
            </div>
            <div className="h-4/6 flex flex-col bg-gradient-to-t from-transparent to-gray-50 border rounded-lg ">
                <div className="flex items-center px-4 py-4 border-b font-bold bg-white rounded-t-lg">
                    <div className="inline-flex items-center space-x-4">
                        <span>Accounts ({accounts.length})</span>
                        <div className="border-r h-[20px]" />
                        <div className="inline-flex items-center gap-2">
                            <label htmlFor="search">Search</label>
                            <input className="p-2 rounded-lg border indent-2" type="text" placeholder="Ex: Collection, SEK" />
                        </div>
                    </div>
                    <div className="ml-auto inline-flex items-center gap-2">
                        <label htmlFor="currency">Currency</label>
                        <select className="p-2 border bg-transparent rounded-lg font-bold" name="currency" id="currency">
                            <option value="SEK">SEK</option>
                            <option value="USD">USD</option>
                            <option value="GBP">GBP</option>
                            <option value="DKK">DKK</option>
                        </select>
                    </div>
                </div>
                <div className="h-full grid grid-cols-1 xl:grid-cols-4 gap-4 p-4 ">
                    {accounts.map((account) => {
                        return <DashboardAccountCard key={account.id} account={account} accountId={account.id} />;
                    })}
                </div>
            </div>
        </div>
    );
}