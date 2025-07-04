import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '../common/Input';
import { Search } from 'lucide-react';

/**
 * Komponen SearchFilter untuk forum.
 *
 * @param {object} props
 * @param {function} props.onSearchChange - Callback saat nilai pencarian berubah.
 * @param {function} props.onFilterChange - Callback saat filter berubah.
 * @param {Array<object>} props.categories - Daftar kategori untuk opsi filter.
 * @param {string} props.currentFilter - Nilai filter yang sedang aktif.
 */
const SearchFilter = ({ onSearchChange, onFilterChange, categories, currentFilter }) => {
    return (
        <div className="p-4 bg-white rounded-lg shadow-sm border flex flex-col md:flex-row items-center gap-4">
            {/* Input Pencarian */}
            <div className="relative w-full md:w-2/3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                    type="text"
                    placeholder="Cari utas diskusi..."
                    className="pl-10"
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            {/* Dropdown Filter */}
            <div className="w-full md:w-1/3">
                <select
                    value={currentFilter}
                    onChange={(e) => onFilterChange(e.target.value)}
                    className="w-full p-2 h-10 border border-input bg-background rounded-md text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                    <option value="all">Semua Kategori</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

SearchFilter.propTypes = {
    onSearchChange: PropTypes.func.isRequired,
    onFilterChange: PropTypes.func.isRequired,
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    currentFilter: PropTypes.string.isRequired,
};

export default SearchFilter;