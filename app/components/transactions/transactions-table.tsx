"use client";
import { formatCurrency } from "@/utils/currency/formatCurrency";
import React, { useState } from "react";

interface Transaction {
    id: string;
    organizationId: string;
    accountId: string;
    amount: {
        currency: string;
        value: number;
        stringValue: string;
    };
    type: string;
    reportedType: string;
    timestamp: string;
    localDate: string;
    version: number;
}

interface BalanceTableProps {
    balances: any;
}

const TransactionsTable: React.FC<BalanceTableProps> = ({ balances }) => {
    return (
        <div className="h-max flex flex-col overflow-scroll  ">
            <table className="table-fixed    flex-1  min-w-full leading-normal ">
                <thead>
                    <tr className="text-left bg-white ">
                        <th className="p-4 border">Account</th>
                        <th className="p-4 border">Account Bank</th>
                        <th className="p-4 border">Amount</th>
                        <th className="p-4 border">Description</th>
                        <th className="p-4 border">Date</th>
                        <th className="p-4 border">Returned</th>
                    </tr>
                </thead>
                <tbody>
                    {balances.map((balance: any) => {
                        return (
                            <tr className="border " key={balance.id}>
                                <td className="border px-4 py-1">{balance.account.name}</td>
                                <td className="border px-4 py-1">{balance.account.bank.name}</td>
                                <td className={`border px-4 py-1 ${balance.amount.stringValue.startsWith("-") ? "text-red-600" : "text-green-600"}`}>{formatCurrency(balance.amount.stringValue, balance.amount.currency)}</td>
                                <td className="border px-4 py-1">{balance.description}</td>
                                <td className="border px-4 py-1">{balance.date}</td>
                                <td className="border px-4 py-1">{balance.characteristics?.returned ? "TRUE" : "FALSE"}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionsTable;
