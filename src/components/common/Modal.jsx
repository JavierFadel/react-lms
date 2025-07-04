import { X } from "lucide-react";
import PropTypes from "prop-types";

/**
 * Komponen Modal menampilkan konten dalam sebuah dialog overlay.
 *
 * @param {object} props
 * @param {boolean} props.isOpen - Mengontrol visibilitas modal.
 * @param {function} props.onClose - Fungsi yang dipanggil saat modal ditutup.
 * @param {string} props.title - Judul yang ditampilkan di header modal.
 * @param {React.ReactNode} props.children - Konten yang akan ditampilkan di dalam modal.
 */
const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) {
        return null;
    };

    return (
        // Lapisan latar belakang (overlay)
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
            onClick={onClose} // Memungkinkan menutup modal dengan mengklik di luar area konten
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            {/* Kontainer konten modal */}
            <div
                className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl"
                onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat mengklik di dalam area konten
            >
                {/* Header Modal */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                    <h3 id="modal-title" className="text-xl font-semibold text-gray-800">
                        {title}
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        aria-label="Tutup modal"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Body Modal */}
                <div className="mt-4">{children}</div>
            </div>
        </div>
    );
};

// Mendefinisikan tipe prop untuk validasi dan dokumentasi
Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export default Modal;