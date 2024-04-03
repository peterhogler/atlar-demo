"use client";
import DashboardAccountSummary from "./dashboard-account-summary";
import DashboardAccountChart from "./dashboard-account-chart";
import React, { useState } from "react";
import DashboardAccountCard from "./dashboard-account-card";
import { DashboardProps } from "@/typings/component.typings";
import { Account } from "@/typings/account.typings";

export default function Dashboard({ accounts, balance }: DashboardProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCurrency, setSelectedCurrency] = useState("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCurrency(event.target.value);
    };

    const filteredAccounts = accounts.filter((account) => {
        const matchesName = account.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCurrency = account.currency === selectedCurrency || selectedCurrency === "";

        return matchesName && matchesCurrency;
    });

    return (
        <div className="h-full flex flex-col gap-4">
            <div className="flex flex-col xl:flex-row gap-4">
                <DashboardAccountSummary accounts={accounts} />
                <DashboardAccountChart balances={balance} />
            </div>
            <div className="h-full flex flex-col border rounded-lg ">
                <div className="flex items-center px-4 py-3 border-b bg-white rounded-t-lg">
                    <div className="inline-flex items-center space-x-4">
                        <span>Accounts ({filteredAccounts.length})</span>
                        <div className="border-r h-[20px]" />
                        <div className="inline-flex items-center gap-2">
                            <label htmlFor="search">Search</label>
                            <input className="p-2 rounded-lg border indent-2" type="text" placeholder="Ex: Collection, SEK" value={searchTerm} onChange={handleSearchChange} />
                        </div>
                    </div>
                    <div className="ml-auto inline-flex items-center gap-2">
                        <label htmlFor="currency">Currency</label>
                        <select className="p-2 border bg-transparent rounded-lg" name="currency" id="currency" value={selectedCurrency} onChange={handleCurrencyChange}>
                            <option value="">Any</option>
                            <option value="SEK">SEK</option>
                            <option value="USD">USD</option>
                            <option value="GBP">GBP</option>
                            <option value="EUR">EUR</option>
                        </select>
                    </div>
                </div>
                <div className="h-full grid grid-cols-1 xl:grid-cols-4 gap-4 p-4 overflow-scroll">
                    {filteredAccounts.map((account: Account) => (
                        <DashboardAccountCard key={account.id} account={account} accountId={account.id} />
                    ))}
                </div>
            </div>
        </div>
    );
}
