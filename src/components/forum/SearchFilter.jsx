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
const SearchFilter = ({ filters, onFilterChange, categories }) => {
    const sortOptions = [
        { value: 'latest', label: 'Terbaru' },
        { value: 'popular', label: 'Popularitas' },
        { value: 'solved', label: 'Terpecahkan' },
    ];

    return (
        <div className="bg-white border rounded-md border-gray-200 p-4 flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search for threads..."
                    className="input-field pl-10"
                    onChange={(e) => onFilterChange('keyword', e.target.value)}
                />
            </div>
            <div className="flex gap-4 w-full md:w-auto">
                <div className="relative flex-shrink-0 w-1/2 md:w-48">
                    <select 
                        className="input-field appearance-none"
                        onChange={(e) => onFilterChange('category', e.target.value)}
                        value={filters.category}
                    >
                        <option value="all">All Categories</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative flex-shrink-0 w-1/2 md:w-48">
                    <select value={filters.sortBy} onChange={(e) => onFilterChange('sortBy', e.target.value)} className="input-field appearance-none">
                        {sortOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
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