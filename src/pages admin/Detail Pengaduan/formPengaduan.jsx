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
    const [selectedData, setFormData] = useState({
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

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...selectedData, [name]: value });
    };

    const handleFileChange = (name, files) => {
        setFormData(prevState => ({ ...prevState, [name]: files }));
        setErrors(prevState => ({ ...prevState, [name]: null }));
    };

    const handleKirimNIK = async () => {
        try {
            const response = await api.get(`/getUserByNIK/${selectedData.NIK}`);
            const data = response.data;
            setFormData({
                ...selectedData,
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

    const validateForm = () => {
        const newErrors = {};
        if (!selectedData.NIK.trim()) newErrors.NIK = 'Field tidak boleh kosong';
        if (!selectedData.masalah.trim()) newErrors.masalah = 'Field tidak boleh kosong';
        if (!selectedData.harapan.trim()) newErrors.harapan = 'Field tidak boleh kosong';
        if (selectedData.foto.length === 0) newErrors.foto = 'Field tidak boleh kosong';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        window.scrollTo(0, 0);
        if (!validateForm()) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('User token not found');
                return;
            }
    
            const formData = new FormData();
            const fields = ['foto'];
            fields.forEach(field => {
                selectedData[field].forEach(file => {
                    formData.append(field, file);
                });
            });

            // Append the jumlah terdampak
            formData.append('masalah', selectedData.masalah);
            formData.append('harapan', selectedData.harapan);
            formData.append('NIK', selectedData.NIK);
    
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            };
    
            const response = await api.post('/admin-upload-pengaduan', formData, config);
            console.log(response.data);

            // Show success alert
            Swal.fire({
                icon: "success",
                title: "Data Berhasil Diupload",
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: "OK",
                denyButtonText: `Don't save`,
                text: "Klik ok",
            })
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
                                        value={selectedData.NIK}
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
                                    value={selectedData.namaLengkap}
                                    onChange={handleChange}
                                    disabled
                                />
                                <TextAreaLog
                                    label="Alamat"
                                    name="alamat"
                                    col="col-lg-6"
                                    placeholder="Alamat"
                                    value={selectedData.alamat}
                                    onChange={handleChange}
                                    disabled
                                />
                                <InputFieldLog 
                                    label="Kecamatan"
                                    name="kecamatan"
                                    col="col-lg-6"
                                    placeholder="Kecamatan"
                                    value={selectedData.kecamatan}
                                    onChange={handleChange}
                                    disabled
                                />
                                <InputFieldLog 
                                    label="Kelurahan"
                                    name="kelurahan"
                                    col="col-lg-6"
                                    placeholder="Kelurahan"
                                    value={selectedData.kelurahan}
                                    onChange={handleChange}
                                    disabled
                                />
                                <InputFieldLog 
                                    label="RT"
                                    name="rt"
                                    col="col-lg-6"
                                    placeholder="RT"
                                    value={selectedData.rt}
                                    onChange={handleChange}
                                    disabled
                                />
                                <InputFieldLog 
                                    label="Email"
                                    name="email"
                                    col="col-lg-6"
                                    placeholder="Email"
                                    value={selectedData.email}
                                    onChange={handleChange}
                                    disabled
                                />
                                <InputFieldLog 
                                    label="No. Telepon"
                                    name="noTelepon"
                                    col="col-lg-6"
                                    placeholder="No. Telepon"
                                    value={selectedData.noTelepon}
                                    onChange={handleChange}
                                    disabled
                                />
                                <h6 className="mt-4">Berkas Pemohon</h6>
                                <TextAreaLog
                                    label="Masalah"
                                    name="masalah"
                                    placeholder="Masukkan Masalah"
                                    value={selectedData.masalah}
                                    onChange={handleChange}
                                    error={errors.masalah}
                                    col='col-lg-6'
                                />
                                <TextAreaLog
                                    label="Harapan"
                                    name="harapan"
                                    placeholder="Masukkan Harapan"
                                    value={selectedData.harapan}
                                    onChange={handleChange}
                                    error={errors.harapan}
                                    col='col-lg-6'
                                />
                                <InputFile
                                    label="Foto"
                                    name="foto"
                                    onChange={(e) => handleFileChange('foto', Array.from(e.target.files))}
                                    error={errors.foto}
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
