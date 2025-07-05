// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { useAuth } from '../../hooks/useAuth'; // Hook untuk mendapatkan data user
// import { Button } from '../common/Button';
// import { Send } from 'lucide-react';

// /**
//  * Komponen form untuk mengirim balasan di sebuah utas.
//  *
//  * @param {object} props
//  * @param {function} props.onSubmit - Callback yang dipanggil saat form disubmit.
//  * @param {boolean} [props.isSubmitting=false] - Status untuk menonaktifkan form saat proses submit.
//  */
// const ReplyForm = ({ onSubmit, isSubmitting = false }) => {
//     const [content, setContent] = useState('');
//     const { user } = useAuth(); // Mengambil data pengguna yang sedang login

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!content.trim()) return; // Jangan kirim jika kosong
//         onSubmit(content);
//         setContent(''); // Kosongkan textarea setelah submit
//     };

//     if (!user) {
//         return (
//             <div className="p-4 text-center bg-gray-100 border-t">
//                 <p className="text-gray-600">
//                     Silakan <a href="/login" className="text-blue-600 font-semibold">login</a> untuk membalas.
//                 </p>
//             </div>
//         );
//     }

//     return (
//         <div className="p-4 bg-gray-50 border-t">
//             <div className="flex items-start space-x-4">
//                 <img
//                     src={user.avatar || 'https://via.placeholder.com/150'}
//                     alt={`Avatar for ${user.name}`}
//                     className="w-10 h-10 rounded-full"
//                 />
//                 <form onSubmit={handleSubmit} className="flex-grow">
//                     <textarea
//                         value={content}
//                         onChange={(e) => setContent(e.target.value)}
//                         placeholder="Tulis balasan Anda..."
//                         className="w-full p-2 border rounded-md"
//                         rows="4"
//                         disabled={isSubmitting}
//                     />
//                     <div className="text-right mt-2">
//                         <Button type="submit" disabled={!content.trim() || isSubmitting}>
//                             <Send className="w-4 h-4 mr-2" />
//                             {isSubmitting ? 'Mengirim...' : 'Kirim Balasan'}
//                         </Button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// ReplyForm.propTypes = {
//     onSubmit: PropTypes.func.isRequired,
//     isSubmitting: PropTypes.bool,
// };

// export default ReplyForm;

import { useState } from "react";
import { currentUser } from "../../utils/dummyData";

const ReplyForm = ({ onSubmit, parentId = null }) => {
    const [content, setContent] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (content.trim()) {
            onSubmit({ content, parentId });
            setContent('');
        }
    };
    return (
        <form onSubmit={handleSubmit} className="mt-4 flex items-start space-x-3">
            <img src={currentUser.avatar} alt="Your avatar" className="h-10 w-10 rounded-full" />
            <div className="flex-1">
                <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Tulis balasan..."
                    className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" rows="3"></textarea>
                <button type="submit" className="mt-2 flex items-center space-x-2 bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700">
                    <Send className="h-5 w-5" /><span>Kirim Balasan</span>
                </button>
            </div>
        </form>
    );
};