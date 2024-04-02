"use client";
import React, { useState, useEffect } from "react";
import TransactionsTable from "./transactions-table";
import convertCurrencyToUSD, { Currency } from "@/utils/currency/convertCurrencyToUSD";

interface Transaction {
    amount: {
        value: number;
        currency: string;
        stringValue: string;
    };
    characteristics?: {
        returned?: boolean;
    };
}

interface Props {
    transactions: Transaction[];
    accountId?: string;
}

export default function Transactions({ transactions }: Props) {
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [transactionsPerPage] = useState(18);

    const returnedTransactions = transactions.filter((transaction) => transaction.characteristics?.returned);

    const suspiciousTransactions = transactions.filter((transaction) => {
        console.log(transaction);
        const amountInUSD = convertCurrencyToUSD(transaction.amount.stringValue, transaction.amount.currency as Currency);
        return amountInUSD <= -5000;
    });

    const indexOfLastBalance = currentPage * transactionsPerPage;
    const indexOfFirstBalance = indexOfLastBalance - transactionsPerPage;
    const currentBalances = filteredTransactions.slice(indexOfFirstBalance, indexOfLastBalance);

    const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleShowAllTransactions = () => {
        setCurrentPage(1);
        setFilteredTransactions(transactions);
        console.log("Showing all transactions");
    };

    const handleShowSuspiciousTransactions = () => {
        setCurrentPage(1);
        setFilteredTransactions(suspiciousTransactions);
    };

    const handleShowReturnedTransactions = () => {
        setCurrentPage(1);
        setFilteredTransactions(returnedTransactions);
    };

    useEffect(() => {
        setFilteredTransactions(transactions);
    }, [transactions]);

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="inline-flex items-center gap-4 font-medium">
                <button className="py-2 px-4 rounded-full border bg-slate-50" onClick={handleShowAllTransactions}>
                    Show All ({transactions.length})
                </button>
                <button className="py-2 px-4 rounded-full border bg-red-100 border-red-100" onClick={handleShowSuspiciousTransactions}>
                    Suspicious Payments ({suspiciousTransactions.length})
                </button>
                <button className="py-2 px-4 rounded-full border bg-amber-100 border-amber-100" onClick={handleShowReturnedTransactions}>
                    Returned Payments ({returnedTransactions.length})
                </button>
            </div>
            <div className="flex-1">
                <TransactionsTable balances={currentBalances} /> {/* Render sliced currentBalances */}
            </div>
            <div className="flex justify-center items-center gap-2 mt-auto border p-2 rounded-lg bg-slate-50">
                <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded" disabled={currentPage === 1}>
                    &lt;
                </button>
                {pageNumbers.map((number) => (
                    <button key={number} onClick={() => paginate(number)} className={`${currentPage === number ? "bg-gray-500 text-white" : "bg-gray-200 text-gray-800"} font-semibold py-2 px-4 rounded hover:bg-gray-300`}>
                        {number}
                    </button>
                ))}
                <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded" disabled={currentPage === totalPages}>
                    &gt;
                </button>
            </div>
        </div>
    );
}
