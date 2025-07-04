import { createContext, useState } from "react";
import { useContext } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const LayoutContext = createContext();

export const useLayout = () => {
    const context = useContext(LayoutContext);
    if (!context) {
        throw new Error("useLayout must be used within a LayoutProvider");
    }
    return context;
}

const Layout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeRoute, setActiveRoute] = useState("dashboard");

    return (
        <LayoutContext.Provider value={{ 
            sidebarOpen, 
            setSidebarOpen, 
            activeRoute, 
            setActiveRoute }}
        >
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="flex pt-16">
                    <Sidebar />
                    {/* <main className="flex-1 transition-all duration-300 ease-in-out"></main> */}
                    {/* Main Content */}
                    <main className={`
                        flex-1 transition-all duration-300 ease-in-out
                        ${sidebarOpen ? 'lg:ml-0' : 'lg:ml-0'}
                        lg:ml-6
                    `}>
                        <div className="p-6">
                        {children}
                        </div>
                    </main>
                </div>
            </div>
        </LayoutContext.Provider>
    )
};

export default Layout;