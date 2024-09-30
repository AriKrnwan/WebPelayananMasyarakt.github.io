import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiGrid, FiUser, FiFolder } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import './admin.css';
import api from '../components/api';
import LogoPemkot from "../assets/images/Logo Pemkot Bontang.svg";

function SidebarAdmin() {
    const [showLayanan, setShowLayanan] = useState(false);
    const [activeItem, setActiveItem] = useState('Dashboard');
    const [selectedLayanan, setSelectedLayanan] = useState(null);
    const [layananCounts, setLayananCounts] = useState({});
    const location = useLocation();

    const getRole = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user.role;
    };
    const role = getRole();
    const rolePrefix = role === 1 ? '/admin' : role === 3 ? '/kadis' : '';

    useEffect(() => {
        const layananItems = [
            'bantuan-logistik',
            'santunan-kematian',
            'SKT',
            'SIO',
            'pengumpulan-uang-dan-barang',
            'rumah-singgah',
            'rehabilitasi-lansia',
            'rehabilitasi-anak-terlantar',
            'penyandang-disabilitas',
            'pengangkatan-anak',
            'DTKS',
            'PBI-JK'
        ];

        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const counts = {};

                for (const layanan of layananItems) {
                    const response = await api.get(`/all-lay-${layanan}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    console.log(`Fetched data for ${layanan}:`, response.data);

                    counts[layanan] = response.data.reduce((acc, item) => {
                        const status = calculateStatus(item);
                        if (status === "Menunggu Validasi" || status === "Berkas Diproses") {
                            acc += 1;
                        }
                        return acc;
                    }, 0);
                }

                setLayananCounts(counts);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const calculateStatus = (item) => {
        const { submit_at, valid_at, reject_at, accept_at } = item;
        if (submit_at && !valid_at && !reject_at && !accept_at) {
            return "Menunggu Validasi";
        } else if (submit_at && valid_at && !reject_at && !accept_at) {
            return "Berkas Diproses";
        }
        return "Tidak Diketahui";
    };

    const layananItems = [
        { name: 'Bantuan Logistik Korban Bencana', path: 'bantuan-logistik' },
        { name: 'Pemberian Santunan Kematian', path: 'santunan-kematian' },
        { name: 'SKT', path: 'SKT' },
        { name: 'SIO', path: 'SIO' },
        { name: 'Pengumpulan Uang dan Barang', path: 'pengumpulan-uang-dan-barang' },
        { name: 'Rumah Singgah', path: 'rumah-singgah' },
        { name: 'Rehabilitasi Sosial Lanjut Usia', path: 'rehabilitasi-lansia' },
        { name: 'Rehabilitasi Sosial Dasar Anak Terlantar', path: 'rehabilitasi-anak-terlantar' },
        { name: 'Penyandang Disabilitas', path: 'penyandang-disabilitas' },
        { name: 'Usulan Calon Pengangkatan Anak', path: 'pengangkatan-anak' },
        { name: 'DTKS', path: 'DTKS' },
        { name: 'PBI-JK', path: 'PBI-JK' },
    ];

    useEffect(() => {
        const path = location.pathname;
        if (path.includes('/admin/dashboard') || path.includes('/kadis/dashboard')) {
            setActiveItem('Dashboard');
            setShowLayanan(false);
        } else if (path.includes('/admin/users') || path.includes('/kadis/users')) {
            setActiveItem('Users');
            setShowLayanan(false);
        } else if (path.includes('/admin/layanan') || path.includes('/kadis/layanan')) {
            const layananPath = layananItems.find(item => path.includes(item.path));
            if (layananPath) {
                setSelectedLayanan(layananPath);
                setActiveItem(layananPath.name);
                setShowLayanan(true);
            }
        } else if (path.includes('/admin/pengaduan-DSPM') || path.includes('/kadis/pengaduan-DSPM')) {
            setActiveItem('Pengaduan');
            setShowLayanan(false);
        } else if (path.includes('/admin/informasi') || path.includes('/kadis/informasi')) {
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
            setShowLayanan(false);
            setSelectedLayanan(null);
        }
    };

    const handleLayananClick = (layanan) => {
        setSelectedLayanan(layanan);
        setActiveItem(layanan.name);
    };

    const totalLayananCount = Object.values(layananCounts).reduce((acc, count) => acc + count, 0);

    return (
        <div className="sidebar p-0" style={{ backgroundColor: '#1E0342' }}>
            <div className="row w-100 m-0">
                <div className="col d-flex flex-column justify-content-between min-vh-100 sidebar-scroll">
                    <div>
                        <NavLink to={`${rolePrefix}/dashboard`} className='text-decoration-none d-flex align-items-center text-white gap-2 mt-3'>
                            <div >
                                <img src={LogoPemkot} alt="Logo Pemkot" />
                            </div>
                            <div>
                                <h6 className='ubuntu-sans-semibold m-0'>DSPM Kota Bontang</h6>
                            </div>
                        </NavLink>
                        <hr className="text-white d-none d-sm-block" />
                        <h6 className='text-white'>Menu</h6>
                        <ul className="nav nav-pills flex-column gap-1" id="parentM">
                            <li className="nav-item">
                                <NavLink
                                    to={`${rolePrefix}/dashboard`}
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
                                    to={`${rolePrefix}/users`}
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
                                        <span className='bg-primary ubuntu-sans-medium text-white p-1 rounded-5' style={{ fontSize: '.7rem' }}>{totalLayananCount}</span>
                                    </div>
                                    <div>
                                        <IoIosArrowDown size='14px' />
                                    </div>
                                </div>
                                <ul className={`nav flex-column gap-1 mt-1 rounded ${showLayanan ? 'p-1 show' : ''}`} style={{ backgroundColor: '#0E46A3', transition: 'max-height 0.3s ease-in-out' }}>
                                    {layananItems.map(layanan => (
                                        <li key={layanan.name} className="nav-item rounded">
                                            <NavLink
                                                to={`${rolePrefix}/layanan/${layanan.path}`}
                                                className={`text-decoration-none d-flex gap-1 justify-content-between align-items-center ${selectedLayanan?.name === layanan.name ? 'text-white bg-primary rounded' : 'text-white'}`}
                                                aria-current="page"
                                                style={{ padding: '8px 12px' }}
                                                onClick={() => handleLayananClick(layanan)}
                                            >
                                                <div className='d-flex align-items-center gap-2'>
                                                    <span className='ubuntu-sans-medium' style={{ fontSize: '.85rem' }}>{layanan.name}</span>
                                                </div>
                                                {layananCounts[layanan.path] > 0 && (
                                                    <span className={`px-1 ubuntu-sans-medium rounded-pill ${selectedLayanan?.name === layanan.name ? 'bg-white text-primary' : 'bg-primary text-white'}`} style={{ fontSize: '.7rem' }}>
                                                        {layananCounts[layanan.path] || 0}
                                                    </span>
                                                )}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to={`${rolePrefix}/pengaduan-DSPM`}
                                    className={`text-decoration-none d-flex align-items-center gap-2 lh-1 rounded ${activeItem === 'Pengaduan' ? 'text-white bg-primary' : 'text-white'}`}
                                    aria-current="page"
                                    style={{ padding: '14px 16px' }}
                                    onClick={() => handleItemClick('Pengaduan')}
                                >
                                    <FiUser size='18px' strokeWidth='2' />
                                    <span className='ubuntu-sans-medium' style={{ fontSize: '.85rem' }}>Pengaduan DSPM</span>
                                </NavLink>
                            </li>
                            {role !== 3 && (
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
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SidebarAdmin;
