import React from 'react';
import PropTypes from 'prop-types';
import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    Legend,
    ResponsiveContainer,
} from 'recharts';

/**
 * Komponen RadarChart yang dapat digunakan kembali.
 *
 * @param {object} props
 * @param {Array<object>} props.data - Array objek data. Contoh: [{ subject: 'Math', A: 120, fullMark: 150 }]
 * @param {Array<{name: string, dataKey: string, stroke: string, fill: string}>} props.radars - Array objek yg mendefinisikan setiap radar.
 */
const CustomRadarChart = ({ data, radars }) => {
    return (
        <ResponsiveContainer width="100%" height={320}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                {/* Grid berbentuk jaring laba-laba */}
                <PolarGrid />

                {/* Label untuk setiap sumbu (misal: Matematika, Fisika, dll.) */}
                <PolarAngleAxis dataKey="subject" />

                {/* Skala numerik dari pusat ke luar (opsional) */}
                <PolarRadiusAxis angle={30} domain={[0, 150]} />

                {/* Merender setiap lapisan radar */}
                {radars.map((radar) => (
                    <Radar
                        key={radar.name}
                        name={radar.name}
                        dataKey={radar.dataKey}
                        stroke={radar.stroke}
                        fill={radar.fill}
                        fillOpacity={0.6}
                    />
                ))}

                <Legend />
            </RadarChart>
        </ResponsiveContainer>
    );
};

CustomRadarChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    radars: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            dataKey: PropTypes.string.isRequired,
            stroke: PropTypes.string.isRequired,
            fill: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default CustomRadarChart;