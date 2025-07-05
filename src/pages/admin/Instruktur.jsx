// import { useInstructors } from '../../hooks/useInstructors';
// import LoadingSpinner from '../../components/common/LoadingSpinner';
// import { User, Star, BookOpen } from 'lucide-react';

// const InstructorCard = ({ instructor }) => {
//     return (
//         <div className="card flex flex-col items-center text-center shadow-none">
//             <img
//                 src={instructor.avatar || `https://i.pravatar.cc/150?u=${instructor.id}`}
//                 alt={instructor.name}
//                 className="w-24 h-24 rounded-full mb-4 object-cover"
//             />
//             <h3 className="text-xl font-bold text-gray-800">{instructor.name}</h3>
//             <p className="text-primary-600 font-semibold">{instructor.title}</p>

//             <div className="flex items-center text-gray-500 my-3">
//                 <Star className="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" />
//                 <span>{instructor.rating}</span>
//                 <span className="mx-2">|</span>
//                 <BookOpen className="w-4 h-4 mr-1" />
//                 <span>{instructor.courses} Courses</span>
//             </div>

//             <p className="text-sm text-gray-600 mt-2">{instructor.bio}</p>
//         </div>
//     );
// };

// const Instruktur = ({ children }) => {
//     const { data: instructors, isLoading, error } = useInstructors();

//     if (isLoading) {
//         return <div className="flex justify-center items-center h-64"><LoadingSpinner /></div>;
//     }

//     if (error) {
//         return <div className="text-center text-red-500">Error: {error.message}</div>;
//     }

//     return (
//         <div>
//             <div className="mb-6">
//                 <h1 className="text-3xl font-bold text-gray-900">Our Instructors</h1>
//                 <p className="text-gray-600 mt-2">
//                     Track your learning milestones and celebrate your achievements
//                 </p>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {instructors?.map(instructor => (
//                     <InstructorCard key={instructor.id} instructor={instructor} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Instruktur;

import { singleInstructorDashboardData } from '../../utils/dummyData';
import { 
  BarChart, LineChart, PieChart, 
  ComposedChart, Tooltip, XAxis, YAxis, 
  Legend, CartesianGrid, Bar, Line, Pie, Cell 
} from 'recharts';
import { 
  AlertTriangle, CheckCircle, Clock, Upload, 
  Users, BookOpen, Target, BarChart2 
} from 'lucide-react';

// Komponen: Kartu Analitik Ringkas
const AnalyticCard = ({ title, value, icon: Icon, change, changeType }) => (
  <div className="card">
    <div className="flex items-center">
      <div className="p-3 bg-primary-50 rounded-lg mr-4">
        <Icon className="w-6 h-6 text-primary-600" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
    {change && (
      <p className={`text-xs mt-2 flex items-center ${changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
        {change} vs bulan lalu
      </p>
    )}
  </div>
);

// Komponen: Tabel Performa Mahasiswa
const StudentPerformanceTable = ({ students }) => (
  <div className="card">
    <h3 className="text-xl font-bold mb-4">Performa Mahasiswa</h3>
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="p-3">Nama Mahasiswa</th>
            <th className="p-3">Skor Rata-rata</th>
            <th className="p-3">Progres Modul</th>
            <th className="p-3 text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id} className="border-b hover:bg-gray-50">
              <td className="p-3 font-medium">{student.name}</td>
              <td className="p-3">{student.averageScore}%</td>
              <td className="p-3">{student.completedModules}/{student.totalModules}</td>
              <td className="p-3 text-center">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  student.status === 'excellent' ? 'bg-green-100 text-green-700' : 
                  student.status === 'good' ? 'bg-blue-100 text-blue-700' : 
                  'bg-red-100 text-red-700'
                }`}>
                  {student.status === 'needs-attention' ? 'Perlu Perhatian' : student.status === 'excellent' ? 'Sangat Baik' : 'Baik'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Komponen: Panel Manajemen Konten (UI Saja)
const ContentManagementPanel = ({ contentAnalytics }) => (
  <div className="card">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-bold">Manajemen & Analitik Konten</h3>
      <button className="btn-primary flex items-center">
        <Upload className="w-4 h-4 mr-2" />
        Upload Media
      </button>
    </div>
    <p className="text-sm text-gray-500 mb-4">Lacak performa konten Anda dan kumpulkan feedback dari mahasiswa.</p>
    <div>
      {contentAnalytics.map(content => (
        <div key={content.moduleId} className="p-3 rounded-lg hover:bg-gray-50 flex justify-between items-center">
          <div>
            <p className="font-semibold">{content.title}</p>
            <p className="text-sm text-gray-500">Engagement: {content.engagementRate}% | Rating: {content.averageRating}/5</p>
          </div>
          <button className="text-sm text-primary-600 hover:underline">Lihat Feedback</button>
        </div>
      ))}
    </div>
  </div>
);


// Halaman Utama: Dashboard Instruktur
const Instruktur = () => {
  const data = singleInstructorDashboardData; // Langsung gunakan data dummy

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Instruktur</h1>
      
      {/* Grid Analitik Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticCard title="Rata-rata Nilai" value="85.7%" icon={CheckCircle} change="+2.5%" changeType="increase" />
        <AnalyticCard title="Tingkat Penyelesaian" value="78%" icon={Target} change="-1.2%" changeType="decrease" />
        <AnalyticCard title="Waktu Belajar (Jam)" value="1,240" icon={Clock} change="+80" changeType="increase" />
        <AnalyticCard title="Mahasiswa Kesulitan" value="3" icon={AlertTriangle} />
      </div>

      {/* Tabel Performa Mahasiswa */}
      <StudentPerformanceTable students={data.studentPerformance} />

      {/* Panel Manajemen Konten */}
      <ContentManagementPanel contentAnalytics={data.contentAnalytics} />

    </div>
  );
};

export default Instruktur;