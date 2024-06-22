import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiGrid, FiUser, FiFolder } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import './admin.css';

function SidebarAdmin() {
    const [showLayanan, setShowLayanan] = useState(false);
    const [activeItem, setActiveItem] = useState('Dashboard');
    const [selectedLayanan, setSelectedLayanan] = useState(null);
    const location = useLocation();

    const layananItems = [
        { name: 'Bantuan Logistik Korban Bencana', count: 198, path: 'bantuan-logistik' },
        { name: 'Pemberian Santunan Kematian', count: 150, path: 'santunan-kematian' },
        { name: 'SKT', count: 100, path: 'SKT' },
        { name: 'SIO', count: 100, path: 'SIO' },
        { name: 'Pengumpulan Uang dan Barang', count: 100, path: 'pengumpulan-uang-dan-barang' },
        { name: 'Rumah Singgah', count: 100, path: 'rumah-singgah' },
        { name: 'Rehabilitasi Sosial Lanjut Usia', count: 100, path: 'rehabilitasi-lansia' },
        { name: 'Rehabilitasi Sosial Dasar Anak Terlantar', count: 100, path: 'rehabilitasi-anak-terlantar' },
        { name: 'Penyandang Disabilitas', count: 100, path: 'penyandang-disabilitas' },
        { name: 'Usulan Calon Pengangkatan Anak', count: 100, path: 'pengangkatan-anak' },
        { name: 'DTKS', count: 100, path: 'DTKS' },
        { name: 'PBI-JK', count: 100, path: 'PBI-JK' },
    ];

    useEffect(() => {
        const path = location.pathname;
        if (path.includes('/admin/dashboard')) {
            setActiveItem('Dashboard');
            setShowLayanan(false);
        } else if (path.includes('/admin/users')) {
            setActiveItem('Users');
            setShowLayanan(false);
        } else if (path.includes('/admin/layanan')) {
            const layananPath = layananItems.find(item => path.includes(item.path));
            if (layananPath) {
                setSelectedLayanan(layananPath);
                setActiveItem(layananPath.name);
                setShowLayanan(true); // Tetap membuka submenu Layanan ketika salah satu item di dalamnya aktif
            }
        } else if (path.includes('/admin/pengaduan-DSPM')) {
            setActiveItem('Pengaduan');
            setShowLayanan(false);
        } else if (path.includes('/admin/informasi')) {
            setActiveItem('Informasi');
            setShowLayanan(false);
        }
    }, [location]);

    const toggleLayanan = () => {
        setShowLayanan(prevShowLayanan => !prevShowLayanan);
    };

    const handleItemClick = (item) => {
        setActiveItem(item);
        if (item !== 'Layanan') {
            setShowLayanan(false); // Pastikan submenu layanan ditutup saat menu lain dipilih
            setSelectedLayanan(null); // Reset layanan yang dipilih
        }
    };

    const handleLayananClick = (layanan) => {
        setSelectedLayanan(layanan);
        setActiveItem(layanan.name);
    };

    return (
        <div className="sidebar p-0" style={{ backgroundColor: '#1E0342' }}>
            <div className="row w-100 m-0">
                <div className="col d-flex flex-column justify-content-between min-vh-100 sidebar-scroll">
                    <div>
                        <NavLink to="/admin/dashboard" className='text-decoration-none ms-4 d-flex align-items-center text-white d-none d-sm-inline'>
                            <span className='fs-4 text-center'>Side Admin</span>
                        </NavLink>
                        <hr className="text-white d-none d-sm-block" />
                        <h6 className='text-white'>Menu</h6>
                        <ul className="nav nav-pills flex-column gap-1" id="parentM">
                            <li className="nav-item">
                                <NavLink
                                    to="/admin/dashboard"
                                    className={`text-decoration-none d-flex align-items-center gap-2 lh-1 rounded ${activeItem === 'Dashboard' ? 'text-white bg-primary' : 'text-white'}`}
                                    aria-current="page"
                                    style={{ padding: '14px 16px' }}
                                    onClick={() => handleItemClick('Dashboard')}
                                >
                                    <FiGrid size='18px' strokeWidth='2' />
                                    <span className='ubuntu-sans-medium' style={{ fontSize: '.85rem' }}>Dashboard</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/admin/users"
                                    className={`text-decoration-none d-flex align-items-center gap-2 lh-1 rounded ${activeItem === 'Users' ? 'text-white bg-primary' : 'text-white'}`}
                                    aria-current="page"
                                    style={{ padding: '14px 16px' }}
                                    onClick={() => handleItemClick('Users')}
                                >
                                    <FiUser size='18px' strokeWidth='2' />
                                    <span className='ubuntu-sans-medium' style={{ fontSize: '.85rem' }}>Users</span>
                                </NavLink>
                            </li>
                            <li className="nav-item rounded">
                                <div
                                    className="text-decoration-none d-flex align-items-center gap-2 lh-1 justify-content-between text-white rounded"
                                    aria-current="page"
                                    style={{ padding: '14px 16px', cursor: 'pointer' }}
                                    onClick={toggleLayanan}
                                >
                                    <div className="d-flex align-items-center gap-2 lh-1">
                                        <FiFolder size='18px' strokeWidth='2' />
                                        <span className='ubuntu-sans-medium' style={{ fontSize: '.85rem' }}>Layanan</span>
                                        <span className='bg-primary ubuntu-sans-medium text-white p-1 rounded-5' style={{ fontSize: '.7rem' }}>198</span>
                                    </div>
                                    <div>
                                        <IoIosArrowDown size='14px' />
                                    </div>
                                </div>
                                <ul className={`nav flex-column gap-1 mt-1 rounded ${showLayanan ? 'p-1 show' : ''}`} style={{ backgroundColor: '#0E46A3', transition: 'max-height 0.3s ease-in-out' }}>
                                    {layananItems.map(layanan => (
                                        <li key={layanan.name} className="nav-item rounded">
                                            <NavLink
                                                to={`/admin/layanan/${layanan.path}`}
                                                className={`text-decoration-none d-flex gap-1 justify-content-between align-items-center ${selectedLayanan?.name === layanan.name ? 'text-white bg-primary rounded' : 'text-white'}`}
                                                aria-current="page"
                                                style={{ padding: '8px 12px' }}
                                                onClick={() => handleLayananClick(layanan)}
                                            >
                                                <div className='d-flex align-items-center gap-2'>
                                                    <span className='ubuntu-sans-medium' style={{ fontSize: '.85rem' }}>{layanan.name}</span>
                                                </div>
                                                <span className={`px-1 ubuntu-sans-medium rounded-pill ${selectedLayanan?.name === layanan.name ? 'bg-white text-primary' : 'bg-primary text-white'}`} style={{ fontSize: '.7rem' }}>{layanan.count}</span>
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/admin/pengaduan-DSPM"
                                    className={`text-decoration-none d-flex align-items-center gap-2 lh-1 rounded ${activeItem === 'Pengaduan' ? 'text-white bg-primary' : 'text-white'}`}
                                    aria-current="page"
                                    style={{ padding: '14px 16px' }}
                                    onClick={() => handleItemClick('Pengaduan')}
                                >
                                    <FiUser size='18px' strokeWidth='2' />
                                    <span className='ubuntu-sans-medium' style={{ fontSize: '.85rem' }}>Pengaduan DSPM</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/admin/informasi"
                                    className={`text-decoration-none d-flex align-items-center gap-2 lh-1 rounded ${activeItem === 'Informasi' ? 'text-white bg-primary' : 'text-white'}`}
                                    aria-current="page"
                                    style={{ padding: '14px 16px' }}
                                    onClick={() => handleItemClick('Informasi')}
                                >
                                    <FiUser size='18px' strokeWidth='2' />
                                    <span className='ubuntu-sans-medium' style={{ fontSize: '.85rem' }}>Informasi</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SidebarAdmin;
