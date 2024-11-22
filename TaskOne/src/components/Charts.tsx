import React from 'react';
import {
    ResponsiveContainer,
    BarChart,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
    CartesianGrid
} from 'recharts';
import { chartData } from '../assets/data';

const Charts: React.FC = () => {
    return (
        <div className="w-full h-[400px] p-4">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                    {/* Grid for better visualization */}
                    <CartesianGrid strokeDasharray="3 3" />

                    {/* X and Y Axes */}
                    <XAxis dataKey="name" />
                    <YAxis />

                    {/* Tooltip and Legend for interaction */}
                    <Tooltip />
                    <Legend />

                    {/* Bars for the chart */}
                    <Bar dataKey="total" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Charts;
