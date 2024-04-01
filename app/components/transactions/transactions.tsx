import React from "react";
import DashboardAccountChart from "../dashboard/dashboard-account-chart";
import { formatCurrency } from "@/utils/formatCurrency";
import TransactionsTable from "./transactions-table";

interface Props {
    transactions?: any;
    accountId?: string;
}

export default function Transactions({ transactions }: Props) {
    return (
        <div className="flex flex-col h-full gap-4">
            <div className="inline-flex items-center gap-4 font-medium">
                <div className="py-2 px-4 rounded-full border bg-red-50">Suspicious Payments (0)</div>
                <div className="py-2 px-4  rounded-full border bg-amber-50">Returned Payments (1)</div>
            </div>
            <div className="h-full flex flex-col bg-gradient-to-t from-transparent to-gray-50  rounded-lg ">
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
                <div className="flex flex-col h-full  gap-4 overflow-scroll">
                    <TransactionsTable balances={transactions} />
                </div>
            </div>
        </div>
    );
}
