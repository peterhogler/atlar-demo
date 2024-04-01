import React from "react";
import DashboardAccountChart from "../dashboard/dashboard-account-chart";
import BalanceTable from "./balance-table";
import { formatCurrency } from "@/utils/formatCurrency";

interface Props {
    balances?: any;
    accountId?: string;
}

export default function AccountDetailsDashboard({ balances, accountId }: Props) {
    return (
        <div className="flex flex-col h-full gap-4">
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
                    <BalanceTable balances={balances} />
                </div>
            </div>
        </div>
    );
}
