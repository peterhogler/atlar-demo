"use client";

import React, { useEffect, useRef, useState } from "react";
import DashboardAccountChart from "../dashboard/dashboard-account-chart";
import { formatCurrency } from "@/utils/currency/formatCurrency";
import { ColumnDef } from "@tanstack/react-table";
import { Balance, Currency, Transaction } from "@/typings/account.typings";
import { DataTable } from "../transactions/data-table";
import { useCalculateItemsPerContainer } from "@/app/hooks/useCalculateItemsPerContainer";

interface Props {
    balances?: any;
    accountId?: string;
}

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
            const returnedValue = info.row.original.characteristics?.returned;
            const displayText = returnedValue ? "TRUE" : "FALSE";

            return <div>{displayText}</div>;
        },
    },
];

export default function AccountDetailsDashboard({ balances }: Props) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const rowHeight = 68;
    const transactionsPerPage = useCalculateItemsPerContainer(containerRef, rowHeight);

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
                <DashboardAccountChart balances={balances} />
            </div>
            <div className="h-full flex flex-col  rounded-lg ">
                <div className="flex px-4 py-4  bg-white rounded-t-lg border-x border-t">
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
                        <select className="p-2 border bg-transparent rounded-lg " name="currency" id="currency" defaultValue={""}>
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
