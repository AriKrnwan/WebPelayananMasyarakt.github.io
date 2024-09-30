import { useState } from "react";
import InputFile from "../../components/Input Field/inputFile";
import TextAreaLog from "../../components/Input Field/textAreaLog";
import api from "../../components/api";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import Topbar from "../../components admin/topbar";
import SidebarAdmin from "../../components admin/sidebar";

function FormAdminInformasi() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        judul: "",
        isi: "",
        foto: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files });
    };

    const handleSubmit = async () => {
        // Validation checks
        if (!formData.judul || !formData.isi) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Harap mengisi field judul dan isi yang diperlukan',
            });
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('judul', formData.judul);
        formDataToSend.append('isi', formData.isi);
        formDataToSend.append('foto', formData.foto[0]);

        try {
            const token = localStorage.getItem('token');
            const response = await api.post('/upload-informasi', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Data submitted successfully:", response.data);
            Swal.fire({
                title: "Good job!",
                text: "Data berhasil dikirim!",
                icon: "success"
            });
            navigate('/admin/informasi');
        } catch (error) {
            console.error("Error submitting form data:", error);
        }
    };

    return (
        <>  
            <div style={{backgroundColor: '#f5f5f5'}}>
                <div className="row m-0">
                    <div className="col-2 p-0">
                        <SidebarAdmin />
                    </div>
                    <div className="col-10 p-0 main-content min-vh-100">
                        <Topbar />
                        <div className="bg-white m-3 rounded border p-4">
                            <div>
                                <h5 className="ubuntu-sans-medium">
                                    Tambah Data Informasi
                                </h5>
                            </div>
                            <div className="row">
                                <TextAreaLog
                                    label="Judul"
                                    name="judul"
                                    placeholder="Masukkan Judul Informasi"
                                    value={formData.judul}
                                    onChange={handleChange}
                                    col='col-lg-6'
                                />
                                <TextAreaLog
                                    label="Isi"
                                    name="isi"
                                    placeholder="Masukkan Isi Informasi"
                                    value={formData.isi}
                                    onChange={handleChange}
                                    col='col-lg-6'
                                />
                                <InputFile
                                    label="Foto"
                                    name="foto"
                                    onChange={handleFileChange}
                                    accept=".png,.jpg,.jpeg,.svg"
                                />
                                <div className="text-end mt-3">
                                    <div className="btn btn-primary" onClick={handleSubmit} style={{fontSize: '.9rem'}}>Kirim</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FormAdminInformasi;
