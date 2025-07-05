import { ArrowUp, ArrowDown } from "lucide-react";

// Komponen Baru: Voting (UI Saja)
const Voting = ({ votes }) => (
    <div className="flex flex-col items-center justify-center px-4">
        <button className="text-gray-400 hover:text-green-500"><ArrowUp className="w-6 h-6" /></button>
        <span className="text-lg font-bold text-gray-700 my-1">{votes}</span>
        <button className="text-gray-400 hover:text-red-500"><ArrowDown className="w-6 h-6" /></button>
    </div>
);

export default Voting;