"use client";

import { formatDateTick, formatYAxisTick } from "@/utils/chart/formatChart";
import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function DashboardAccountChart() {
    const chartData = [
        {
            name: "2024-02-10",
            uv: 12,
        },
        {
            name: "2024-02-12",
            uv: 22,
        },
        {
            name: "2024-02-13",
            uv: 10,
        },
        {
            name: "2024-02-20",
            uv: 44,
        },
        {
            name: "2024-02-30",
            uv: 20,
        },
        {
            name: "2024-03-05",
            uv: 33,
        },
        {
            name: "2024-03-10",
            uv: 55,
        },
    ];
    return (
        <div className="flex flex-col w-full border  h-full rounded-lg">
            <div className="flex items-center justify-between px-4 py-3  border-b gap-4 bg-white overfl rounded-t-lg">
                <div>
                    <span>Cash Position</span>
                </div>
                <select className="p-2 border bg-transparent rounded-lg" name="filter" id="filter" defaultValue="30">
                    <option className="inline-flex gap-2 " value="30" defaultValue="">
                        Last 30 Days
                    </option>
                    <option className="inline-flex" value="7">
                        Last 7 Days
                    </option>
                </select>
            </div>
            <div className="h-full p-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={chartData}
                        margin={{
                            top: 10,
                            right: 0,
                            left: -30,
                            bottom: 0,
                        }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="10%" stopColor="#454752" stopOpacity={0.8} />
                                <stop offset="90%" stopColor="#454752" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tickFormatter={formatDateTick} />
                        <YAxis tickFormatter={formatYAxisTick} />
                        <Tooltip />
                        <Area type="monotone" dataKey="uv" stroke="#454752" fill="url(#colorUv)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
