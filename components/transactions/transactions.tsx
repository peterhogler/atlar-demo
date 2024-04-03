"use client";
import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "./data-table";
import convertCurrencyToUSD from "@/utils/currency/convertCurrencyToUSD";
import { ColumnDef } from "@tanstack/react-table";
import { formatCurrency } from "@/utils/currency/formatCurrency";
import { Currency, Transaction } from "@/typings/account.typings";
import { TransactionsProps } from "@/typings/component.typings";
import Link from "next/link";
import { useCalculateItemsPerContainer } from "@/app/hooks/useCalculateItemsPerContainer";

const columns: ColumnDef<Transaction>[] = [
    {
        accessorKey: "account.name", // Assuming these keys exist in your data
        header: "Account",
    },
    {
        accessorKey: "account.bank.name",
        header: "Account Bank",
    },

    {
        accessorKey: "amount.stringValue",
        header: "Amount",
        cell: (info) => {
            const object = info.row.original;

            const stringValue = object.amount.stringValue;
            const currency = object.amount.currency;

            const formattedValue = formatCurrency(stringValue, currency as Currency);

            const isNegative = stringValue.startsWith("-");

            const className = isNegative ? "text-red-500" : "text-green-500";

            return <div className={className}>{formattedValue}</div>;
        },
    },
    {
        accessorKey: "date",
        header: "Date",
    },
    {
        accessorKey: "account.characteristics.returned",
        header: "Returned",
        cell: (info) => {
            //@ts-ignore
            const returnedValue = info.row.original.characteristics?.returned;
            const displayText = returnedValue ? "TRUE" : "FALSE";

            return <div>{displayText}</div>;
        },
    },
    {
        accessorKey: "account.id",
        header: "Details",
        cell: (info) => {
            const object = info.row.original;
            const id = object.account.id;
            return (
                <Link href={`/account/${id}`} className="border px-2 py-1 w-max bg-slate-50 rounded-full">
                    Details
                </Link>
            );
        },
    },
];

export default function Transactions({ transactions }: TransactionsProps) {
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const rowHeight = 60;
    const transactionsPerPage = useCalculateItemsPerContainer(containerRef, rowHeight);

    const returnedTransactions = transactions.filter((transaction: Transaction) => transaction.characteristics?.returned);

    const suspiciousTransactions = transactions.filter((transaction: Transaction) => {
        const amountInUSD = convertCurrencyToUSD(transaction.amount.stringValue, transaction.amount.currency as Currency);
        return amountInUSD <= -5000;
    });

    const handleShowAllTransactions = () => {
        setFilteredTransactions(transactions);
    };

    const handleShowSuspiciousTransactions = () => {
        setFilteredTransactions(suspiciousTransactions);
    };

    const handleShowReturnedTransactions = () => {
        setFilteredTransactions(returnedTransactions);
    };

    useEffect(() => {
        setFilteredTransactions(transactions);
    }, [transactions]);

    return (
        <div className="flex flex-col h-full gap-4 ">
            <div className="inline-flex items-center gap-4 ">
                <button className="py-1 px-4 rounded-full border bg-slate-50/20" onClick={handleShowAllTransactions}>
                    Show All ({transactions.length})
                </button>
                <button className="py-1 px-4 rounded-full border bg-red-100 border-red-100" onClick={handleShowSuspiciousTransactions}>
                    Suspicious Payments ({suspiciousTransactions.length})
                </button>
                <button className="py-1 px-4 rounded-full border bg-amber-100 border-amber-100" onClick={handleShowReturnedTransactions}>
                    Returned Payments ({returnedTransactions.length})
                </button>
            </div>
            <div className="h-full " ref={containerRef}>
                <DataTable columns={columns} data={filteredTransactions} transactionsPerPage={transactionsPerPage} />{" "}
            </div>
        </div>
    );
}
