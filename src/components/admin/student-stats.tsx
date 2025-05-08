"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"

const data = [
    { name: "Class 6", value: 120, color: "#4f46e5" },
    { name: "Class 7", value: 150, color: "#8b5cf6" },
    { name: "Class 8", value: 180, color: "#a855f7" },
    { name: "Class 9", value: 210, color: "#d946ef" },
    { name: "Class 10", value: 250, color: "#ec4899" },
    { name: "Class 11", value: 180, color: "#f43f5e" },
    { name: "Class 12", value: 158, color: "#ef4444" },
]

export default function StudentStats() {
    return (
        <ResponsiveContainer width="100%" height={300} border-none>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none"  />
                    ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} students`, "Count"]} />
                 {/*<Legend /> — Removed legend */}
            </PieChart>
        </ResponsiveContainer>

    )
}
