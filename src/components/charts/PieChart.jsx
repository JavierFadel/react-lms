import React from 'react';
import PropTypes from 'prop-types';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

// Palet warna yang akan digunakan untuk setiap segmen pai
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

/**
 * Komponen PieChart yang dapat digunakan kembali.
 *
 * @param {object} props
 * @param {Array<object>} props.data - Array objek data. Contoh: [{ name: 'React', value: 400 }]
 */
const CustomPieChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%" // Posisi horizontal tengah
                    cy="50%" // Posisi vertikal tengah
                    labelLine={false} // Menonaktifkan garis label
                    outerRadius={110} // Ukuran radius luar pai
                    fill="#8884d8"
                    dataKey="value" // Kunci untuk nilai data
                    nameKey="name" // Kunci untuk nama (label) data
                >
                    {/* Memberi warna berbeda untuk setiap segmen */}
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem',
                    }}
                />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};

CustomPieChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default CustomPieChart;