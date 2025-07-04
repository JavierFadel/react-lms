import React from 'react';
import PropTypes from 'prop-types';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

/**
 * Komponen AreaChart yang dapat digunakan kembali dengan gradasi.
 *
 * @param {object} props
 * @param {Array<object>} props.data - Array objek data untuk grafik.
 * @param {string} props.xAxisKey - Kunci untuk sumbu X dari objek data.
 * @param {Array<{key: string, color: string}>} props.areas - Array objek yang mendefinisikan setiap area.
 */
const CustomAreaChart = ({ data, xAxisKey, areas }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey={xAxisKey} stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem',
                    }}
                />

                {/* Definisi gradasi untuk setiap area */}
                <defs>
                    {areas.map((area) => (
                        <linearGradient key={area.key} id={`color${area.key}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={area.color} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={area.color} stopOpacity={0} />
                        </linearGradient>
                    ))}
                </defs>

                {/* Merender setiap area berdasarkan props */}
                {areas.map((area) => (
                    <Area
                        key={area.key}
                        type="monotone"
                        dataKey={area.key}
                        stroke={area.color}
                        fillOpacity={1}
                        strokeWidth={2}
                        fill={`url(#color${area.key})`}
                    />
                ))}
            </AreaChart>
        </ResponsiveContainer>
    );
};

CustomAreaChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    xAxisKey: PropTypes.string.isRequired,
    areas: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            color: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default CustomAreaChart;