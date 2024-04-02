"use client";

import React, { useEffect, useRef, useState } from "react";
import DashboardAccountChart from "../dashboard/dashboard-account-chart";
import { formatCurrency } from "@/utils/currency/formatCurrency";
import { ColumnDef } from "@tanstack/react-table";
import { Balance, Currency, Transaction } from "@/typings/account.typings";
import { DataTable } from "../transactions/data-table";

interface Props {
    balances?: any;
    accountId?: string;
}

// <tr className="border " key={balance.id}>
//     <td className="border px-4 py-1">{balance.organizationId}</td>
//     <td className="border px-4 py-1">{balance.accountId}</td>
//     <td className="border px-4 py-1">{`${balance.amount.currency} ${formatCurrency(balance.amount.stringValue, balance.amount.currency)}`}</td>
//     <td className="border px-4 py-1">{balance.type}</td>
//     <td className="border px-4 py-1">{balance.reportedType}</td>
//     <td className="border px-4 py-1">{balance.localDate}</td>
// </tr>;

const columns: ColumnDef<Balance>[] = [
    {
        accessorKey: "organizationId", // Assuming these keys exist in your data
        header: "Org ID",
    },
    {
        accessorKey: "accountId",
        header: "Account ID",
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
        accessorKey: "localDate",
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
];

export default function AccountDetailsDashboard({ balances }: Props) {
    const [transactionsPerPage, setTransactionsPerPage] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (containerRef.current) {
            const containerHeight = containerRef.current.clientHeight;
            const rowHeight = 68;
            const calculatedItemsPerPage = Math.floor(containerHeight / rowHeight);

            setTransactionsPerPage(calculatedItemsPerPage);
        }
    }, []);

    return (
        <div className="h-full flex flex-col gap-4">
            <div className="h-full flex flex-col  gap-4">
                <div className="flex items-center gap-5 ">
                    <div className="inline-flex gap-5">
                        <div className="text-3xl">NTB BANK</div>
                        <div className="text-3xl text-black-/80"> {formatCurrency(balances[0].amount.stringValue, balances[0].amount.currency)}</div>
                    </div>
                    <div className="underline">Account Details</div>
                </div>
                <DashboardAccountChart />
            </div>
            <div className="h-full flex flex-col  rounded-lg ">
                <div className="flex px-4 py-4 font-bold bg-white rounded-t-lg border-x border-t">
                    <div className="w-full inline-flex  items-center space-x-4">
                        <span>Transactions</span>
                        <div className="border-r h-[15px]"></div>
                        <div className="inline-flex items-center gap-2">
                            <label htmlFor="search">Search</label>
                            <input className="p-2 border rounded-lg" type="text" placeholder="03-12" />
                        </div>
                    </div>
                    <div className="ml-auto flex items-center gap-2 whitespace-nowrap">
                        <label htmlFor="type">Reported Type</label>
                        <select className="p-2 border bg-transparent rounded-lg font-bold" name="currency" id="currency" defaultValue={""}>
                            <option value="" selected>
                                All
                            </option>
                            <option value="OPEN">OPEN</option>
                            <option value="CLOSED">CLOSED</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col h-full   gap-4 " ref={containerRef}>
                    <DataTable columns={columns} data={balances} transactionsPerPage={transactionsPerPage} />
                </div>
            </div>
        </div>
    );
}
