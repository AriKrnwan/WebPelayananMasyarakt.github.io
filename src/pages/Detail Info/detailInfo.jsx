import Footer from "../../components/Footer/footer";
import CollapsibleExample from "../../components/Navbar/navbar";
import Wallpaper2 from "../../components/Wallpaper/wallpaper2";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../components/api";

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

        fetchData();
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
