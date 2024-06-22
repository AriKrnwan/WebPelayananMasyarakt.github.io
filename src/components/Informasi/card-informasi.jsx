import { NavLink } from "react-router-dom";
import foto1 from "../../assets/images/Foto Kegiatan.png";
import "./informasi.css";
import { useState, useEffect } from 'react';
import api from "../api";
// import fotoBontang from "../../assets/images/bontang.jpg"

function CardInformasi() {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [data, setData] = useState([]);
    const baseURL = "http://localhost:4121/";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get(`/all-informasi`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // Tambahkan data dummy
                const dummyData = [
                    {
                        id: 101,
                        foto: JSON.stringify(["path/to/foto1.jpg"]),
                        judul: "Aplikasi Pelayanan Masyarakat Kota Bontang",
                        submit_at: new Date().toISOString()
                    },
                    {
                        id: 102,
                        foto: JSON.stringify(["path/to/foto2.jpg"]),
                        judul: "Informasi Dummy 2",
                        submit_at: new Date().toISOString()
                    }
                ];
                setData([...response.data, ...dummyData]);
                console.log([...response.data, ...dummyData]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {data.map((info, index) => (
                <div className="col-lg-4 mb-3" key={info.id}>
                    <div className="card p-3">
                        <div className="gambar-card d-flex justify-content-center align-items-center mb-2">
                            <img 
                                src={info.foto ? `${baseURL}${JSON.parse(info.foto)[0]}` : foto1} 
                                className="object-fit-cover" 
                                alt={info.judul} 
                            />
                        </div>
                        <div className="judul-info position-relative mb-3">
                            <p className="ubuntu-sans-regular">{new Date(info.submit_at).toLocaleDateString()}</p>
                            <div className="judul">
                                <h6 
                                    className="m-0 overflow-hidden"
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    {info.judul}
                                </h6>
                            </div>
                            {hoveredIndex === index && (
                                <div className="bubble-chat p-2 position-absolute rounded">
                                    <div className="isi-bubble-chat position-relative">
                                        <p className="ubuntu-sans-regular text-white text-center">{info.judul}</p>
                                        <div className="arrow position-absolute"></div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <NavLink to={`/detail-info/${info.id}`} className="btn btn-primary p-2">
                            <p>Baca</p>
                        </NavLink>
                    </div>
                </div>
            ))}
        </>
    );
}

export default CardInformasi;
