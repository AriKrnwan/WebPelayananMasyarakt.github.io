import Footer from "../../components/Footer/footer";
import CollapsibleExample from "../../components/Navbar/navbar";
import Wallpaper2 from "../../components/Wallpaper/wallpaper2";
import { useEffect, useState } from 'react';
import api from "../../components/api";
import { useNavigate } from "react-router-dom";
import { LuFileClock, LuFileCheck2, LuFileX2 } from "react-icons/lu";
import { FiX } from "react-icons/fi";

function Notifikasi() {
    const [notifikasi, setNotifikasi] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user.NIK;

        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get(`/notifikasi/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // Urutkan data berdasarkan id dari terbesar ke terkecil
                const sortedData = response.data.sort((a, b) => b.id - a.id);
                setNotifikasi(sortedData); // Set the notifications data
                console.log('Data notifikasi yang berhasil diambil:', sortedData);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.error('Unauthorized: Please log in first.');
                } else {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchData();

        // Set interval for polling
        const intervalId = setInterval(fetchData, 5000); // Poll every 5 seconds

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

    const getStatus = (type_message) => {
        switch(type_message) {
            case 1:
                return 'Berkas Diproses';
            case 2:
                return 'Berkas Tidak Valid';
            case 3:
                return 'Diterima';
            case 4:
                return 'Ditolak';
            default:
                return 'Status Tidak Diketahui';
        }
    };

    const handleClick = async (notif) => {
        try {
            const token = localStorage.getItem('token');
            await api.put(`/notifikasi/read/${notif.id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate(`/${notif.layanan}/detail-pengajuan/${notif.no_lay}`);
        } catch (error) {
            console.error('Error updating notification:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await api.delete(`/notifikasi/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setNotifikasi(notifikasi.filter(notif => notif.id !== id));
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    return (
        <>
            <CollapsibleExample />
            <div className="bg position-relative">
                <Wallpaper2 />
            </div>
            <div className="container">
                <div className="wrap-prof row px-3">
                    <div className="mx-auto col-lg-10 form-profile row rounded border p-4 g-1 g-lg-2 bg-white">
                        <h4 className="text-center">Notifikasi</h4>
                        <div className="bars mt-4">
                            {notifikasi.map((notif, index) => (
                                <div key={index} className={`bar-notifikasi border p-4 d-flex justify-content-between ${notif.read_at ? 'bg-white' : 'bg-info-subtle'}`} style={{ cursor: 'pointer' }} onClick={() => handleClick(notif)}>
                                    <div className="d-flex gap-3">
                                        <div className="">
                                            <div className={`logo p-2 rounded-circle ${notif.type_message === 3 ? 'bg-success' : (notif.type_message === 2 || notif.type_message === 4) ? 'bg-danger' : 'bg-primary'} lh-1`}>
                                                {notif.type_message === 3 ? <LuFileCheck2 size={'18px'} color="white" /> : (notif.type_message === 2 || notif.type_message === 4) ? <LuFileX2 size={'18px'} color="white" /> : <LuFileClock size={'18px'} color="white" />}
                                            </div>
                                        </div>
                                        <div className="text-black">
                                            <p style={{ fontSize: '.95rem' }}>
                                                Permohonan dengan nomor pelayanan <b>{notif.no_lay}</b>, berstatus <b>{getStatus(notif.type_message)}</b>.
                                            </p>
                                            <p className="ubuntu-sans-regular" style={{ fontSize: '.8rem' }}>{new Date(notif.created_at).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <div className="eks" onClick={(e) => { e.stopPropagation(); handleDelete(notif.id); }}>
                                            <FiX size={'18px'} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Notifikasi;
