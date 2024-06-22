import SidebarAdmin from "../components admin/sidebar"
import Topbar from "../components admin/topbar"

function Admin() {
    return (
        <>
            <div className="overflow-hi" style={{backgroundColor: '#f5f5f5'}}>
                <div className="row m-0">
                    <div className="col-2 p-0">
                        <SidebarAdmin />
                    </div>
                    <div className="col-10 p-0">
                        <Topbar />
                        <div className="bg-white m-3 rounded border p-2">
                            Admin
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin