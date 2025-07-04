import React from 'react';
import PropTypes from 'prop-types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

/**
 * Komponen LineChart yang dapat digunakan kembali.
 *
 * @param {object} props
 * @param {Array<object>} props.data - Array objek data untuk grafik. Contoh: [{ name: 'Jan', uv: 400, pv: 2400 }]
 * @param {string} props.xAxisKey - Kunci untuk sumbu X dari objek data.
 * @param {Array<{key: string, color: string}>} props.lines - Array objek yang mendefinisikan setiap garis.
 */
const CustomLineChart = ({ data, xAxisKey, lines, className }) => {
  return (
    // ResponsiveContainer membuat grafik menyesuaikan ukuran kontainer induknya.
    <ResponsiveContainer 
        width="100%" 
        height={300}
        className={className}
    >
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        {/* Garis-garis grid di latar belakang grafik */}
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />

        {/* Sumbu X (horizontal) */}
        <XAxis dataKey={xAxisKey} stroke="#6b7280" />

        {/* Sumbu Y (vertikal) */}
        <YAxis stroke="#6b7280" />

        {/* Tooltip yang muncul saat hover di atas titik data */}
        <Tooltip
          contentStyle={{
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
          }}
        />

        {/* Legenda untuk setiap garis */}
        <Legend />

        {/* Merender setiap garis berdasarkan props 'lines' */}
        {lines.map((line) => (
          <Line
            key={line.key}
            type="monotone"
            dataKey={line.key}
            stroke={line.color}
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

CustomLineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  xAxisKey: PropTypes.string.isRequired,
  lines: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CustomLineChart;