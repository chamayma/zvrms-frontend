import Sidebar from "../components/common/Sidebar";
import Topbar from "../components/common/Topbar";
import Footer from "../components/common/Footer";

function MainLayout({ children }) {

    return (

        <>

            <Sidebar />

            <Topbar />

            <div
                className="main d-flex flex-column"
                style={{
                    minHeight: "calc(100vh - 80px)"
                }}
            >

                <div className="flex-grow-1">

                    {children}

                </div>

                <Footer />

            </div>

        </>

    );

}

export default MainLayout;