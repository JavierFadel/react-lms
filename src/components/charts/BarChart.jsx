import React from 'react';
import PropTypes from 'prop-types';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

/**
 * Komponen BarChart yang dapat digunakan kembali.
 *
 * @param {object} props
 * @param {Array<object>} props.data - Array objek data untuk grafik.
 * @param {string} props.xAxisKey - Kunci untuk sumbu X dari objek data.
 * @param {Array<{key: string, color: string}>} props.bars - Array objek yang mendefinisikan setiap batang.
 */
const CustomBarChart = ({ data, xAxisKey, bars }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey={xAxisKey} stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                    cursor={{ fill: 'rgba(239, 246, 255, 0.5)' }} // Efek hover pada bar
                    contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem',
                    }}
                />
                <Legend />
                {bars.map((bar) => (
                    <Bar key={bar.key} dataKey={bar.key} fill={bar.color} radius={[4, 4, 0, 0]} />
                ))}
            </BarChart>
        </ResponsiveContainer>
    );
};

CustomBarChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    xAxisKey: PropTypes.string.isRequired,
    bars: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            color: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default CustomBarChart;