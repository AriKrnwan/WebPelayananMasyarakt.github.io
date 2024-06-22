import Footer from "../../components/Footer/footer";
import CollapsibleExample from "../../components/Navbar/navbar";
import Wallpaper2 from "../../components/Wallpaper/wallpaper2";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../components/api";
import bontang from "../../assets/images/bontang.jpg"

function DetailInfo() {
    const { id } = useParams();
    const [judul, setJudul] = useState('');
    const [isi, setIsi] = useState('');
    const [tanggal, setTanggal] = useState('');
    const [fotoUrl, setFotoUrl] = useState('');

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get(`/informasi/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const responseData = response.data;
                setJudul(responseData.judul || '');
                setIsi(responseData.isi || '');
                setTanggal(responseData.submit_at ? formatDate(responseData.submit_at) : '');

                if (responseData.foto && responseData.foto.length > 0) {
                    const rawPath = responseData.foto;
                    const cleanedPath = rawPath.slice(2, -2); // Remove the first and last character
                    const formattedPath = cleanedPath.replace(/\\/g, '/');
                    setFotoUrl(`http://localhost:4121/${formattedPath}`);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchDummyData = async () => {
            // Data dummy yang sama dengan yang digunakan di CardInformasi
            const dummyData = [
                {
                    id: 101,
                    judul: "Aplikasi Pelayanan Masyarakat Kota Bontang",
                    isi: "Halo semuanya! Ini adalah aplikasi pelayanan msyarakat untuk Dinas Sosial dan Pemberdayaan Masyarakat. Perlu diingat aplikasi ini baru berupa tampilan jadi belum bisa difungsikan secara baik. Tapi saya memohon kepada temman-teman yang telah melihat ini jangan lupa untuk mengisi kuesioner terkait apakah aplikasi ini memudahkan masyarakat dalam mengakses dan melakukan permohonan layanan masyarakat yg ada pada Dinas terkait. Terima Kasih",
                    submit_at: new Date().toISOString(),
                    foto: setFotoUrl(bontang)
                },
                {
                    id: 102,
                    judul: "Informasi Dummy 2",
                    isi: "Ini adalah isi dari informasi dummy 2.",
                    submit_at: new Date().toISOString(),
                    foto: setFotoUrl(bontang)
                }
            ];

            const info = dummyData.find(item => item.id === parseInt(id));
            if (info) {
                setJudul(info.judul);
                setIsi(info.isi);
                setTanggal(formatDate(info.submit_at));
                setFotoUrl(`http://localhost:4121/${info.foto}`);
            }
        };

        if (parseInt(id) >= 101 && parseInt(id) <= 102) {
            fetchDummyData();
        } else {
            fetchData();
        }
    }, [id]);

    return (
        <>
            <CollapsibleExample />
            <div className="bg position-relative">
                <Wallpaper2 />
            </div>
            <div className="container">
                <div className="wrap-prof">
                    <div className="form-profile row rounded border p-4 g-1 g-lg-2 mx-auto bg-white">
                        <div className="img-info w-100 border rounded" style={{ height: '500px' }}>
                            <img src={fotoUrl} className="object-fit-cover w-100 h-100" alt={judul} />
                        </div>
                        <div className="mt-3">
                            <p className="ubuntu-sans-regular" style={{ fontSize: '.85rem', color: '#bdbdbd' }}>{tanggal}</p>
                            <h5 className="ubuntu-sans-medium mt-2">{judul}</h5>
                            <p>
                                {isi}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default DetailInfo;
