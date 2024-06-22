import { useState } from "react";
import InputFieldLog from "../../components/Input Field/inputFieldLog";
import InputFile from "../../components/Input Field/inputFile";
import TextAreaLog from "../../components/Input Field/textAreaLog";
import api from "../../components/api";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

function FormAdminAngkatAnak() {
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
        suket_fisik_jiwa: [],
        suket_narkoba: [],
        skck: [],
        suket_penghasilan: [],
        izin_tertulis: [],
        kk: [],
        akta_kelahiran: [],
        akta_nikah: [],
        foto: [],
        form_pernyataan: [],
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
        if (!formData.NIK || formData.ktp.length === 0 || formData.suket_fisik_jiwa.length === 0 || formData.suket_narkoba.length === 0 || formData.skck.length === 0 || formData.suket_penghasilan.length === 0 || formData.izin_tertulis.length === 0 || formData.kk.length === 0 || formData.akta_kelahiran.length === 0 || formData.akta_nikah.length === 0 || formData.foto.length === 0 || formData.form_pernyataan.length === 0 ) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Harap mengisi semua field yang diperlukan',
            });
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('NIK', formData.NIK);
        formDataToSend.append('ktp', formData.ktp[0]);
        formDataToSend.append('suket_fisik_jiwa', formData.suket_fisik_jiwa[0]);
        formDataToSend.append('suket_narkoba', formData.suket_narkoba[0]);
        formDataToSend.append('skck', formData.skck[0]);
        formDataToSend.append('suket_penghasilan', formData.suket_penghasilan[0]);
        formDataToSend.append('izin_tertulis', formData.izin_tertulis[0]);
        formDataToSend.append('kk', formData.kk[0]);
        formDataToSend.append('akta_kelahiran', formData.akta_kelahiran[0]);
        formDataToSend.append('akta_nikah', formData.akta_nikah[0]);
        formDataToSend.append('foto', formData.foto[0]);
        formDataToSend.append('form_pernyataan', formData.form_pernyataan[0]);

        try {
            const token = localStorage.getItem('token');
            const response = await api.post('/admin-upload-pengangkatan-anak', formDataToSend, {
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
            navigate('/admin/layanan/pengangkatan-anak');
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
                label="Surat Keterangan Fisik dan Kejiwaan"
                name="suket_fisik_jiwa"
                onChange={handleFileChange}
            />
            <InputFile
                label="Surat Keterangan Bebas Narkoba"
                name="suket_narkoba"
                onChange={handleFileChange}
            />
            <InputFile
                label="SKCK"
                name="skck"
                onChange={handleFileChange}
            />
            <InputFile
                label="Surat Keterangan Penghasilan"
                name="suket_penghasilan"
                onChange={handleFileChange}
            />
            <InputFile
                label="Persetujuan atau Izin Tertulis"
                name="izin_tertulis"
                onChange={handleFileChange}
            />
            <InputFile
                label="KK Calon Anak Angkat(CAA)"
                name="kk"
                onChange={handleFileChange}
            />
            <InputFile
                label="Akta Kelahiran CAA"
                name="akta_kelahiran"
                onChange={handleFileChange}
            />
            <InputFile
                label="Akta Nikah"
                name="akta_nikah"
                onChange={handleFileChange}
            />
            <InputFile
                label="Foto"
                name="foto"
                onChange={handleFileChange}
            />
            <InputFile
                label="Form Pernyataan"
                name="form_pernyataan"
                onChange={handleFileChange}
            />
            <div className="text-end mt-3">
                <div className="btn btn-primary" onClick={handleSubmit} style={{fontSize: '.9rem'}}>Kirim</div>
            </div>
        </>
    );
}

export default FormAdminAngkatAnak;
