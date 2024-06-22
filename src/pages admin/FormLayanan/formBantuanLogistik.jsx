import { useState } from "react";
import InputFieldLog from "../../components/Input Field/inputFieldLog";
import InputFile from "../../components/Input Field/inputFile";
import InputNumber from "../../components/Input Field/inputNumber";
import TextAreaLog from "../../components/Input Field/textAreaLog";
import api from "../../components/api";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

function FormAdminBantuanLogistik() {
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
        jml_tedampak: "",
        alasan: "",
        produk_layanan: null,
        ktp: [],
        surat_permohonan_bantuan_logistik: [],
        dokumentasi_bencana: []
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
        if (!formData.NIK || !formData.jml_tedampak || formData.ktp.length === 0 || formData.surat_permohonan_bantuan_logistik.length === 0 || formData.dokumentasi_bencana.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Harap mengisi semua field yang diperlukan',
            });
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('NIK', formData.NIK);
        formDataToSend.append('jml_tedampak', formData.jml_tedampak);
        formDataToSend.append('ktp', formData.ktp[0]);
        formDataToSend.append('surat_permohonan_bantuan_logistik', formData.surat_permohonan_bantuan_logistik[0]);
        formDataToSend.append('dokumentasi_bencana', formData.dokumentasi_bencana[0]);

        try {
            const token = localStorage.getItem('token');
            const response = await api.post('/admin-upload-bantuan-logistik', formDataToSend, {
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
            navigate('/admin/layanan/bantuan-logistik');
        } catch (error) {
            console.error("Error submitting form data:", error);
        }
    };

    return (
        <>
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
            <InputFile
                label="KTP"
                name="ktp"
                onChange={handleFileChange}
            />
            <InputFile
                label="Surat Permohonan Bantuan Logistik"
                name="surat_permohonan_bantuan_logistik"
                onChange={handleFileChange}
            />
            <InputFile
                label="Dokumentasi Kejadian Bencana"
                name="dokumentasi_bencana"
                onChange={handleFileChange}
            />
            <InputNumber
                label="Jumlah Terdampak"
                name="jml_tedampak"
                placeholder="Jumlah Terdampak"
                value={formData.jml_tedampak}
                onChange={(name, value) => setFormData({ ...formData, [name]: value })}
            />
            <div className="text-end mt-3">
                <div className="btn btn-primary" onClick={handleSubmit} style={{fontSize: '.9rem'}}>Kirim</div>
            </div>
        </>
    );
}

export default FormAdminBantuanLogistik;
