import { useState } from "react";
import InputFieldLog from "../../components/Input Field/inputFieldLog";
import InputFile from "../../components/Input Field/inputFile";
import TextAreaLog from "../../components/Input Field/textAreaLog";
import api from "../../components/api";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import Topbar from "../../components admin/topbar";
import SidebarAdmin from "../../components admin/sidebar";

function FormAdminPengaduan() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        NIK: "",
        namaLengkap: "",
        alamat: "",
        kecamatan: "",
        kelurahan: "",
        rt: "",
        email: "",
        noTelepon: "",
        masalah: "",
        harapan: "",
        jawaban: "",
        produk_layanan: null,
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

    const handleKirimNIK = async () => {
        try {
            const response = await api.get(`/getUserByNIK/${formData.NIK}`);
            const data = response.data;
            setFormData({
                ...formData,
                namaLengkap: data.full_name || "",
                alamat: data.alamat || "",
                kecamatan: data.kecamatan || "",
                kelurahan: data.kelurahan || "",
                rt: data.rt || "",
                email: data.email || "",
                noTelepon: data.no_telp || ""
            });
        } catch (error) {
            console.error("Error fetching user data:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "NIK Tidak Ada",
            });
        }
    };

    const handleSubmit = async () => {
        // Validation checks
        if (!formData.NIK || !formData.masalah || !formData.harapan) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Harap mengisi field masalah dan harapan yang diperlukan',
            });
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('NIK', formData.NIK);
        formDataToSend.append('masalah', formData.masalah);
        formDataToSend.append('harapan', formData.harapan);
        formDataToSend.append('foto', formData.foto[0]);

        try {
            const token = localStorage.getItem('token');
            const response = await api.post('/admin-upload-pengaduan', formDataToSend, {
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
            navigate('/admin/pengaduan-DSPM');
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
                                    Tambah Data Pengaduan DSPM
                                </h5>
                            </div>
                            <div className="row">
                                <h6 className="mt-4">Data Pemohon</h6>
                                <div className="col-lg-6 d-flex flex-column">
                                    <InputFieldLog 
                                        label="NIK"
                                        name="NIK"
                                        placeholder="Masukkan NIK"
                                        value={formData.NIK}
                                        onChange={handleChange}
                                    />
                                    <div>
                                        <div className="btn btn-primary" onClick={handleKirimNIK} style={{fontSize: '.9rem', marginTop: '-8px'}}>Pilih</div>
                                    </div>
                                </div>
                                <InputFieldLog 
                                    label="Nama Lengkap"
                                    name="namaLengkap"
                                    col="col-lg-6"
                                    placeholder="Nama Lengkap"
                                    value={formData.namaLengkap}
                                    onChange={handleChange}
                                    disabled
                                />
                                <TextAreaLog
                                    label="Alamat"
                                    name="alamat"
                                    col="col-lg-6"
                                    placeholder="Alamat"
                                    value={formData.alamat}
                                    onChange={handleChange}
                                    disabled
                                />
                                <InputFieldLog 
                                    label="Kecamatan"
                                    name="kecamatan"
                                    col="col-lg-6"
                                    placeholder="Kecamatan"
                                    value={formData.kecamatan}
                                    onChange={handleChange}
                                    disabled
                                />
                                <InputFieldLog 
                                    label="Kelurahan"
                                    name="kelurahan"
                                    col="col-lg-6"
                                    placeholder="Kelurahan"
                                    value={formData.kelurahan}
                                    onChange={handleChange}
                                    disabled
                                />
                                <InputFieldLog 
                                    label="RT"
                                    name="rt"
                                    col="col-lg-6"
                                    placeholder="RT"
                                    value={formData.rt}
                                    onChange={handleChange}
                                    disabled
                                />
                                <InputFieldLog 
                                    label="Email"
                                    name="email"
                                    col="col-lg-6"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled
                                />
                                <InputFieldLog 
                                    label="No. Telepon"
                                    name="noTelepon"
                                    col="col-lg-6"
                                    placeholder="No. Telepon"
                                    value={formData.noTelepon}
                                    onChange={handleChange}
                                    disabled
                                />
                                <h6 className="mt-4">Berkas Pemohon</h6>
                                <TextAreaLog
                                    label="Masalah"
                                    name="masalah"
                                    placeholder="Masukkan Masalah"
                                    value={formData.masalah}
                                    onChange={handleChange}
                                    col='col-lg-6'
                                />
                                <TextAreaLog
                                    label="Harapan"
                                    name="harapan"
                                    placeholder="Masukkan Harapan"
                                    value={formData.harapan}
                                    onChange={handleChange}
                                    col='col-lg-6'
                                />
                                <InputFile
                                    label="Foto"
                                    name="foto"
                                    onChange={handleFileChange}
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

export default FormAdminPengaduan;
