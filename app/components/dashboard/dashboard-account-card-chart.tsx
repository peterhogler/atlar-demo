"use client";
import { formatDateTick, formatYAxisTick } from "@/utils/chart/formatChart";
import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function DashboardAccountCardChart({ transactions }: { transactions: any }) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                data={transactions}
                margin={{
                    top: 5,
                    right: 15,
                    left: 0,
                    bottom: 0,
                }}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="10%" stopColor="#454752" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#454752" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tickFormatter={formatDateTick} />
                <YAxis tickFormatter={formatYAxisTick} />
                <Tooltip />
                <Area type="monotone" dataKey="uv" stroke="#454752" fill="url(#colorUv)" />
            </AreaChart>
        </ResponsiveContainer>
    );
}
