"use client";
import { CurrencyType, formatCurrency } from "@/utils/formatCurrency";
import React, { useState } from "react";

// Props type definition
interface Balance {
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
    balances: Balance[];
}

const BalanceTable: React.FC<BalanceTableProps> = ({ balances }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [balancesPerPage] = useState(10);

    const indexOfLastBalance = currentPage * balancesPerPage;
    const indexOfFirstBalance = indexOfLastBalance - balancesPerPage;
    const currentBalances = balances.slice(indexOfFirstBalance, indexOfLastBalance);

    const totalPages = Math.ceil(balances.length / balancesPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="flex flex-col min-h-full overflow-scroll">
            <table className="table-fixed flex-1 min-w-full leading-normal">
                <thead>
                    <tr className="text-left bg-white ">
                        <th className="border px-4 py-2">Org ID</th>
                        <th className="border px-4 py-2">Account ID</th>
                        <th className="border px-4 py-2">Amount</th>
                        <th className="border px-4 py-2">Type</th>
                        <th className="border px-4 py-2">Reported Type</th>
                        <th className="border px-4 py-2">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {currentBalances.map((balance: any) => (
                        <tr className="border " key={balance.id}>
                            <td className="border px-4 py-1">{balance.organizationId}</td>
                            <td className="border px-4 py-1">{balance.accountId}</td>
                            <td className="border px-4 py-1">{`${balance.amount.currency} ${formatCurrency(balance.amount.stringValue, balance.amount.currency)}`}</td>
                            <td className="border px-4 py-1">{balance.type}</td>
                            <td className="border px-4 py-1">{balance.reportedType}</td>
                            <td className="border px-4 py-1">{balance.localDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center items-center gap-2 p-4 border-x border-b rounded-b-lg">
                <button onClick={() => setCurrentPage((currentPage) => Math.max(currentPage - 1, 1))} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded" disabled={currentPage === 1}>
                    &lt;
                </button>

                {pageNumbers.map((number) => (
                    <button key={number} onClick={() => paginate(number)} className={`${currentPage === number ? "bg-gray-500 text-white" : "bg-gray-200 text-gray-800"}  font-semibold py-2 px-4 rounded hover:bg-gray-300`}>
                        {number}
                    </button>
                ))}

                <button onClick={() => setCurrentPage((currentPage) => Math.min(currentPage + 1, pageNumbers.length))} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded" disabled={currentPage === pageNumbers.length}>
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default BalanceTable;
