import PropTypes from 'prop-types';

function SidebarLay({ activeTab, handleTabClick }) {
    return (
        <>
            <div 
                className={`tab-pengajuan ubuntu-sans-medium w-100 p-2 btn ${activeTab === 'Pengajuan' ? 'btn-primary' : 'btn-light'} rounded mb-3`} 
                style={{fontSize: '.85rem'}} 
                onClick={() => handleTabClick('Pengajuan')}
            >
                Pengajuan
            </div>
            <div 
                className={`tab-proses ubuntu-sans-medium w-100 p-2 btn ${activeTab === 'Proses' ? 'btn-primary' : 'btn-light'} rounded mb-3`} 
                style={{fontSize: '.85rem'}} 
                onClick={() => handleTabClick('Proses')}
            >
                Proses
            </div>
            <div 
                className={`tab-selesai ubuntu-sans-medium w-100 p-2 btn ${activeTab === 'Selesai' ? 'btn-primary' : 'btn-light'} rounded mb-3`} 
                style={{fontSize: '.85rem'}} 
                onClick={() => handleTabClick('Selesai')}
            >
                Selesai
            </div>
        </>
    );
}

SidebarLay.propTypes = {
    activeTab: PropTypes.string.isRequired,
    handleTabClick: PropTypes.func.isRequired,
};

export default SidebarLay;
