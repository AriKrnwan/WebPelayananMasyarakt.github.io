import { useState } from "react";
import InputFieldLog from "../../components/Input Field/inputFieldLog";
import InputFile from "../../components/Input Field/inputFile";
import TextAreaLog from "../../components/Input Field/textAreaLog";
import api from "../../components/api";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

function FormAdminSKT() {
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
        surat_permohonan_pengajuan_lks: [],
        akta_notaris_pendirian: [],
        adart: [],
        struktur_organisasi: [],
        suket_domisili: [],
        biodata: [],
        proker: [],
        npwp: [],
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
        if (selectedData.surat_permohonan_pengajuan_lks.length === 0) newErrors.surat_permohonan_pengajuan_lks = 'Field tidak boleh kosong';
        if (selectedData.akta_notaris_pendirian.length === 0) newErrors.akta_notaris_pendirian = 'Field tidak boleh kosong';
        if (selectedData.adart.length === 0) newErrors.adart = 'Field tidak boleh kosong';
        if (selectedData.struktur_organisasi.length === 0) newErrors.struktur_organisasi = 'Field tidak boleh kosong';
        if (selectedData.suket_domisili.length === 0) newErrors.suket_domisili = 'Field tidak boleh kosong';
        if (selectedData.biodata.length === 0) newErrors.biodata = 'Field tidak boleh kosong';
        if (selectedData.proker.length === 0) newErrors.proker = 'Field tidak boleh kosong';
        if (selectedData.npwp.length === 0) newErrors.npwp = 'Field tidak boleh kosong';

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
            const fields = ['ktp', 'surat_permohonan_pengajuan_lks', 'akta_notaris_pendirian', 'adart', 'struktur_organisasi', 'suket_domisili', 'biodata', 'proker', 'npwp'];
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

            const response = await api.post('/admin-upload-SKT', formData, config);
            
            console.log("Data submitted successfully:", response.data);
            Swal.fire({
                title: "Good job!",
                text: "Data berhasil dikirim!",
                icon: "success"
            });
            navigate('/admin/layanan/SKT');
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
                label="Surat Permohonan Pengajuan LKS"
                name="surat_permohonan_pengajuan_lks"
                onChange={(e) => handleFileChange('surat_permohonan_pengajuan_lks', Array.from(e.target.files))}
                error={errors.surat_permohonan_pengajuan_lks}
            />
            <InputFile
                label="Akta Notaris Pendirian"
                name="akta_notaris_pendirian"
                onChange={(e) => handleFileChange('akta_notaris_pendirian', Array.from(e.target.files))}
                error={errors.akta_notaris_pendirian}
            />
            <InputFile
                label="Anggaran Dasar dan Anggaran Rumah Tangga"
                name="adart"
                onChange={(e) => handleFileChange('adart', Array.from(e.target.files))}
                error={errors.adart}
            />
            <InputFile
                label="Struktur Organisasi"
                name="struktur_organisasi"
                onChange={(e) => handleFileChange('struktur_organisasi', Array.from(e.target.files))}
                error={errors.struktur_organisasi}
            />
            <InputFile
                label="Surat Keterangan Domisili"
                name="suket_domisili"
                onChange={(e) => handleFileChange('suket_domisili', Array.from(e.target.files))}
                error={errors.suket_domisili}
            />
            <InputFile
                label="Biodata"
                name="biodata"
                onChange={(e) => handleFileChange('biodata', Array.from(e.target.files))}
                error={errors.biodata}
            />
            <InputFile
                label="Program Kerja"
                name="proker"
                onChange={(e) => handleFileChange('proker', Array.from(e.target.files))}
                error={errors.proker}
            />
            <InputFile
                label="NPWP"
                name="npwp"
                onChange={(e) => handleFileChange('npwp', Array.from(e.target.files))}
                error={errors.npwp}
            />
            <div className="text-end mt-3">
                <div className="btn btn-primary" onClick={handleSubmit} style={{fontSize: '.9rem'}}>Kirim</div>
            </div>
        </>
    );
}

export default FormAdminSKT;
