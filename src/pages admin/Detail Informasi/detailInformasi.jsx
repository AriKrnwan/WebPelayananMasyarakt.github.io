import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InputFieldLog from "../../components/Input Field/inputFieldLog";
import InputFile from "../../components/Input Field/inputFile";
import TextAreaLog from "../../components/Input Field/textAreaLog";
import Swal from "sweetalert2";
import api from "../../components/api";
import Topbar from "../../components admin/topbar";
import SidebarAdmin from "../../components admin/sidebar";

function DetailInformasi() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [judul, setJudul] = useState('');
    const [isi, setIsi] = useState('');
    const [fotoFile, setFotoFile] = useState(null);
    const [fotoUrl, setFotoUrl] = useState('');
    const layanan = 'informasi';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get(`/informasi/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setData(response.data);
                console.log(response.data);
                setJudul(response.data.judul || '');
                setIsi(response.data.isi || '');
                setFotoFile(response.data.foto || '');
                
                // Assuming the response.data.foto is an array and we take the first element
                if (response.data.foto && response.data.foto.length > 0) {
                    const rawPath = response.data.foto;
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

    const handleUpdate = async () => {
        let formData = new FormData();
        formData.append('judul', judul);
        formData.append('isi', isi);
        formData.append('id', data.id);
        if (fotoFile) formData.append('foto', fotoFile);

        try {
            const token = localStorage.getItem('token');
            const response = await api.put(`update-informasi/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Data updated successfully:', response.data);
            Swal.fire({
                title: "Good job!",
                text: "Data Berhasil Diupdate",
                icon: "success"
            });
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleHapus = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.delete(`/delete-informasi/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Data deleted successfully:', response.data);
            Swal.fire({
                title: "Deleted!",
                text: "Data berhasil dihapus",
                icon: "success"
            });
            navigate('/admin/informasi');
        } catch (error) {
            console.error('Error deleting data:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Terjadi kesalahan saat menghapus data",
            });
        }
    };

    const showAlertHapus = () => {
        Swal.fire({
            title: "Apakah Anda yakin untuk menghapus pengaduan ini?",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Iya",
            icon: 'question',
            confirmButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                handleHapus();
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };

    return (
        <>
            <div style={{ backgroundColor: '#f5f5f5' }}>
                <div className="row m-0">
                    <div className="col-2 p-0">
                        <SidebarAdmin />
                    </div>
                    <div className="col-10 p-0 main-content min-vh-100">
                        <Topbar />
                        <div className="bg-white m-3 rounded border p-4">
                            <div>
                                <h5 className="ubuntu-sans-medium">
                                    Tambah Data Layanan
                                </h5>
                            </div>
                            <div className="row">
                                <InputFieldLog
                                    label="No. Pengaduan"
                                    col="col-lg-6"
                                    placeholder="No. Pengaduan"
                                    value={data ? data.id : ''}
                                    disabled
                                />
                                <TextAreaLog
                                    label="Judul"
                                    name="judul"
                                    col="col-lg-6"
                                    placeholder="Masukkan Judul"
                                    value={judul}
                                    onChange={(e) => setJudul(e.target.value)}
                                />
                                <TextAreaLog
                                    label="Isi"
                                    name="isi"
                                    col="col-lg-6"
                                    placeholder="Masukkan Isi"
                                    value={isi}
                                    onChange={(e) => setIsi(e.target.value)}
                                />
                                <div className="col-lg-6">
                                    <InputFile
                                        label="Foto"
                                        name="foto"
                                        showDownloadButton
                                        id={data && data.id ? data.id : ''}
                                        table={layanan}
                                        onChange={(e) => setFotoFile(e.target.files[0])}
                                        col='col'
                                    />
                                    <div className="border w-50">
                                        {fotoUrl && (
                                            <img
                                                src={fotoUrl}
                                                alt="Foto"
                                                style={{ width: '100%', height: 'auto' }}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="text-end mt-3">
                                    <div className="btn btn-danger me-2" style={{ fontSize: '.9rem' }} onClick={showAlertHapus}>Hapus Data</div>
                                    <div className="btn btn-primary" style={{ fontSize: '.9rem' }} onClick={handleUpdate}>Update</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DetailInformasi;
