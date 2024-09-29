import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LabelList } from 'recharts';

interface PriceHistoryProps {
    priceData: { date: string; price: number }[];
}

const PriceHistoryBarChart: React.FC<PriceHistoryProps> = ({ priceData }) => {
    return (
        <div style={{ width: '100%', height: 300 }}>
            <h3 className="text-xl font-bold mb-4">Price History</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={priceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="price" fill="#82ca9d">
                        <LabelList dataKey="price" position="top" /> {/* Dodanie etykiet nad słupkami */}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PriceHistoryBarChart;