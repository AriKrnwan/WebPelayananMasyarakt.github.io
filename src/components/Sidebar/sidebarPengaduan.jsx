import PropTypes from 'prop-types';

function SidebarPengaduan({ activeTab, handleTabClick }) {
    return (
        <>
            <div 
                className={`tab-pengajuan ubuntu-sans-medium w-100 p-2 btn ${activeTab === 'Formulir' ? 'btn-primary' : 'btn-light'} rounded mb-3`} 
                style={{fontSize: '.85rem'}} 
                onClick={() => handleTabClick('Formulir')}
            >
                Formulir
            </div>
            <div 
                className={`tab-pengaduan ubuntu-sans-medium w-100 p-2 btn ${activeTab === 'Pengaduan' ? 'btn-primary' : 'btn-light'} rounded mb-3`} 
                style={{fontSize: '.85rem'}} 
                onClick={() => handleTabClick('Pengaduan')}
            >
                Pengaduan
            </div>
        </>
    );
}

SidebarPengaduan.propTypes = {
    activeTab: PropTypes.string.isRequired,
    handleTabClick: PropTypes.func.isRequired,
};

export default SidebarPengaduan;
