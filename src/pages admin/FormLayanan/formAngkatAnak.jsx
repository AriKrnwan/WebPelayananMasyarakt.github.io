import { useState } from "react";
import InputFieldLog from "../../components/Input Field/inputFieldLog";
import InputFile from "../../components/Input Field/inputFile";
import TextAreaLog from "../../components/Input Field/textAreaLog";
import api from "../../components/api";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

function FormAdminAngkatAnak() {
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
                title: "NIK Tidak Tersedia",
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!selectedData.NIK.trim()) newErrors.NIK = 'Field tidak boleh kosong';
        if (selectedData.ktp.length === 0) newErrors.ktp = 'Field tidak boleh kosong';
        if (selectedData.suket_fisik_jiwa.length === 0) newErrors.suket_fisik_jiwa = 'Field tidak boleh kosong';
        if (selectedData.suket_narkoba.length === 0) newErrors.suket_narkoba = 'Field tidak boleh kosong';
        if (selectedData.skck.length === 0) newErrors.skck = 'Field tidak boleh kosong';
        if (selectedData.suket_penghasilan.length === 0) newErrors.suket_penghasilan = 'Field tidak boleh kosong';
        if (selectedData.izin_tertulis.length === 0) newErrors.izin_tertulis = 'Field tidak boleh kosong';
        if (selectedData.kk.length === 0) newErrors.kk = 'Field tidak boleh kosong';
        if (selectedData.akta_kelahiran.length === 0) newErrors.akta_kelahiran = 'Field tidak boleh kosong';
        if (selectedData.akta_nikah.length === 0) newErrors.akta_nikah = 'Field tidak boleh kosong';
        if (selectedData.foto.length === 0) newErrors.foto = 'Field tidak boleh kosong';
        if (selectedData.form_pernyataan.length === 0) newErrors.form_pernyataan = 'Field tidak boleh kosong';

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
            const fields = ['ktp', 'suket_fisik_jiwa', 'suket_narkoba', 'skck', 'suket_penghasilan', 'izin_tertulis', 'kk', 'akta_kelahiran', 'akta_nikah', 'foto', 'form_pernyataan'];
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

            const response = await api.post('/admin-upload-pengangkatan-anak', formData, config);
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
                label="Surat Keterangan Fisik dan Kejiwaan"
                name="suket_fisik_jiwa"
                onChange={(e) => handleFileChange('suket_fisik_jiwa', Array.from(e.target.files))}
                error={errors.suket_fisik_jiwa}
            />
            <InputFile
                label="Surat Keterangan Bebas Narkoba"
                name="suket_narkoba"
                onChange={(e) => handleFileChange('suket_narkoba', Array.from(e.target.files))}
                error={errors.suket_narkoba}
            />
            <InputFile
                label="SKCK"
                name="skck"
                onChange={(e) => handleFileChange('skck', Array.from(e.target.files))}
                error={errors.skck}
            />
            <InputFile
                label="Surat Keterangan Penghasilan"
                name="suket_penghasilan"
                onChange={(e) => handleFileChange('suket_penghasilan', Array.from(e.target.files))}
                error={errors.suket_penghasilan}
            />
            <InputFile
                label="Persetujuan atau Izin Tertulis"
                name="izin_tertulis"
                onChange={(e) => handleFileChange('izin_tertulis', Array.from(e.target.files))}
                error={errors.izin_tertulis}
            />
            <InputFile
                label="KK Calon Anak Angkat(CAA)"
                name="kk"
                onChange={(e) => handleFileChange('kk', Array.from(e.target.files))}
                error={errors.kk}
            />
            <InputFile
                label="Akta Kelahiran CAA"
                name="akta_kelahiran"
                onChange={(e) => handleFileChange('akta_kelahiran', Array.from(e.target.files))}
                error={errors.akta_kelahiran}
            />
            <InputFile
                label="Akta Nikah"
                name="akta_nikah"
                onChange={(e) => handleFileChange('akta_nikah', Array.from(e.target.files))}
                error={errors.akta_nikah}
            />
            <InputFile
                label="Foto"
                name="foto"
                onChange={(e) => handleFileChange('foto', Array.from(e.target.files))}
                error={errors.foto}
            />
            <InputFile
                label="Form Pernyataan"
                name="form_pernyataan"
                onChange={(e) => handleFileChange('form_pernyataan', Array.from(e.target.files))}
                error={errors.form_pernyataan}
            />
            <div className="text-end mt-3">
                <div className="btn btn-primary" onClick={handleSubmit} style={{fontSize: '.9rem'}}>Kirim</div>
            </div>
        </>
    );
}

export default FormAdminAngkatAnak;
