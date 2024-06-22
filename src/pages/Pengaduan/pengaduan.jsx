import PropTypes from 'prop-types';
import { useState } from 'react';
import SubmitPengaduan from "../../components/Form Submit/submitPengaduan";
import CollapsibleExample from '../../components/Navbar/navbar';
import Wallpaper2 from '../../components/Wallpaper/wallpaper2';
import Footer from '../../components/Footer/footer';
import TablePengaduan from '../../components/Table Pengaduan/tablePengaduan';
import SidebarPengaduan from '../../components/Sidebar/sidebarPengaduan';


function Pengaduan() {
    const [activeTab, setActiveTab] = useState('Formulir');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <>
            <CollapsibleExample />
            <div className="bg position-relative">
                <Wallpaper2 />
            </div>
            <div className="container">
                <div className="wrap-prof">
                    <div className="form-profile row rounded border p-4 g-1 g-lg-2 mx-auto" style={{ backgroundColor: 'white' }}>
                        <h4 className='text-center ubuntu-sans-medium mb-3'>Pengaduan DSPM</h4>
                        <div className="col-lg-3 mx-auto">
                            <SidebarPengaduan activeTab={activeTab} handleTabClick={handleTabClick} />
                        </div>
                        <div className="col-lg-9 mx-auto">
                            <div className="row border rounded py-3 mx-1">
                                {activeTab === 'Formulir' ? (
                                    <SubmitPengaduan />
                                ) : (
                                    <TablePengaduan layanan="layanan-id" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

Pengaduan.propTypes = {
    disabled: PropTypes.bool,
    showAlert: PropTypes.bool
};

Pengaduan.defaultProps = {
    disabled: false,
    showAlert: true
};

export default Pengaduan;
