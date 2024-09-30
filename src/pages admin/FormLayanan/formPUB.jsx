import { useState } from "react";
import InputFieldLog from "../../components/Input Field/inputFieldLog";
import InputFile from "../../components/Input Field/inputFile";
import TextAreaLog from "../../components/Input Field/textAreaLog";
import api from "../../components/api";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

function FormAdminPUB() {
    const navigate = useNavigate();
    const [selectedData, setFormData] = useState({
        NIK: "",
        namaLengkap: "",
        gender: "",
        alamat: "",
        kecamatan: "",
        kelurahan: "",
        rt: "",
        pendidikan: "",
        pekerjaan: "",
        email: "",
        noTelepon: "",
        jml_tedampak: "",
        alasan: "",
        produk_layanan: null,
        ktp: [],
        suket_ormas: [],
        suket_lks: [],
        npwp: [],
        bukti_setor: [],
        rekening: [],
        surat_legal: [],
        surat_pernyataan_bermaterai: [],
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...selectedData, [name]: value });
        const newErrors = { ...errors };
        delete newErrors[name];
        setErrors(newErrors);
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
                gender: data.gender || "",
                alamat: data.alamat || "",
                kecamatan: data.kecamatan || "",
                kelurahan: data.kelurahan || "",
                rt: data.rt || "",
                pekerjaan: data.pekerjaan || "",
                pendidikan: data.pendidikan || "",
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
        if (selectedData.ktp.length === 0) newErrors.ktp = 'Field tidak boleh kosong';
        if (selectedData.suket_ormas.length === 0) newErrors.suket_ormas = 'Field tidak boleh kosong';
        if (selectedData.suket_lks.length === 0) newErrors.suket_lks = 'Field tidak boleh kosong';
        if (selectedData.npwp.length === 0) newErrors.npwp = 'Field tidak boleh kosong';
        if (selectedData.bukti_setor.length === 0) newErrors.bukti_setor = 'Field tidak boleh kosong';
        if (selectedData.rekening.length === 0) newErrors.rekening = 'Field tidak boleh kosong';
        if (selectedData.surat_legal.length === 0) newErrors.surat_legal = 'Field tidak boleh kosong';
        if (selectedData.surat_pernyataan_bermaterai.length === 0) newErrors.surat_pernyataan_bermaterai = 'Field tidak boleh kosong';

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

            const formData = new FormData();
            const fields = ['ktp', 'suket_ormas', 'suket_lks', 'npwp', 'bukti_setor', 'rekening', 'surat_legal', 'surat_pernyataan_bermaterai'];
            fields.forEach(field => {
                selectedData[field].forEach(file => {
                    formData.append(field, file);
                });
            });

            formData.append('NIK', selectedData.NIK);
    
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            };

            const response = await api.post('/admin-upload-PUB', formData, config);
            console.log("Data submitted successfully:", response.data);
            Swal.fire({
                title: "Good job!",
                text: "Data berhasil dikirim!",
                icon: "success"
            });
            navigate('/admin/layanan/pengumpulan-uang-dan-barang');
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
                    value={selectedData.NIK}
                    onChange={handleChange}
                    error={errors.NIK}
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
            <InputFieldLog 
                label="Jenis Kelamin"
                name="gender"
                col="col-lg-6"
                placeholder="Jenis Kelamin"
                value={selectedData.gender}
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
                label="Pendidikan Terakhir"
                name="pendidikan"
                col="col-lg-6"
                placeholder="Pendidikan Terakhir"
                value={selectedData.pendidikan}
                onChange={handleChange}
                disabled
            />
            <InputFieldLog 
                label="Pekerjaan"
                name="pekerjaan"
                col="col-lg-6"
                placeholder="Pekerjaan"
                value={selectedData.pekerjaan}
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
            <InputFile
                label="KTP"
                name="ktp"
                onChange={(e) => handleFileChange('ktp', Array.from(e.target.files))}
                error={errors.ktp}
            />
            <InputFile
                label="Surat Keterangan Terdaftar bagi Ormas"
                name="suket_ormas"
                onChange={(e) => handleFileChange('suket_ormas', Array.from(e.target.files))}
                error={errors.suket_ormas}
            />
            <InputFile
                label="Surat Keterangan Terdaftar bagi LKS"
                name="suket_lks"
                onChange={(e) => handleFileChange('suket_lks', Array.from(e.target.files))}
                error={errors.suket_lks}
            />
            <InputFile
                label="NPWP Lembaga"
                name="npwp"
                onChange={(e) => handleFileChange('npwp', Array.from(e.target.files))}
                error={errors.npwp}
            />
            <InputFile
                label="Bukti Setor/Sewa Tempat"
                name="bukti_setor"
                onChange={(e) => handleFileChange('bukti_setor', Array.from(e.target.files))}
                error={errors.bukti_setor}
            />
            <InputFile
                label="Nomor Rekening/Tempat Penampungan Dana"
                name="rekening"
                onChange={(e) => handleFileChange('rekening', Array.from(e.target.files))}
                error={errors.rekening}
            />
            <InputFile
                label="Surat Keabsahan Legalitas"
                name="surat_legal"
                onChange={(e) => handleFileChange('surat_legal', Array.from(e.target.files))}
                error={errors.surat_legal}
            />
            <InputFile
                label="Surat Pernyataan Bermaterai"
                name="surat_pernyataan_bermaterai"
                onChange={(e) => handleFileChange('surat_pernyataan_bermaterai', Array.from(e.target.files))}
                error={errors.surat_pernyataan_bermaterai}
            />
            <div className="text-end mt-3">
                <div className="btn btn-primary" onClick={handleSubmit} style={{fontSize: '.9rem'}}>Kirim</div>
            </div>
        </>
    );
}

export default FormAdminPUB;
