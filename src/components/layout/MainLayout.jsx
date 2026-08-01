import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function MainLayout({ children }) {

    return (

        <div
            style={{
                display: "flex",
                background: "#111",
                minHeight: "100vh"
            }}
        >

            <Sidebar />

            <div
                style={{
                    marginLeft: "250px",
                    width: "100%"
                }}
            >

                <Navbar />

                <div
                    style={{
                        padding: "30px"
                    }}
                >

                    {children}

                </div>

            </div>

        </div>

    );

}