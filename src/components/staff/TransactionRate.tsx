import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const rateData = [
    { day: "Mon", rate: 40 },
    { day: "Tue", rate: 55 },
    { day: "Wed", rate: 30 },
    { day: "Thu", rate: 70 },
    { day: "Fri", rate: 60 },
    { day: "Sat", rate: 50 },
    { day: "Sun", rate: 65 },
]

export function TransactionRateGraph() {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <LineChart data={rateData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="day" stroke="#888888" fontSize={12} />
                <YAxis stroke="#888888" fontSize={12} />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="#4f46e5"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}
