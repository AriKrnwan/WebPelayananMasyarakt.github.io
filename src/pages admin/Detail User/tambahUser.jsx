import SidebarAdmin from "../../components admin/sidebar";
import InputFieldLog from "../../components/Input Field/inputFieldLog";
import Topbar from "../../components admin/topbar";
import TextAreaLog from "../../components/Input Field/textAreaLog";
import OptionFieldLog from "../../components/Input Field/optionFieldLog";
import PasswordLog from "../../components/Input Field/passwordLog";
import { useState } from 'react';
import Swal from "sweetalert2";
import apiConfig from "../../config/config";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TambahUser() {
    const [formData, setFormData] = useState({
        NIK: '',
        nama: '',
        gender: '',
        alamat: '',
        kecamatan: '',
        kelurahan: '',
        rt: '',
        pendidikan: '',
        pekerjaan: '',
        email: '',
        no_telepon: '',
        password: '',
        confirmPassword: '',
        role_id: ''
    });

    const [selectedKecamatan, setSelectedKecamatan] = useState('');
    const [kelurahanOptions, setKelurahanOptions] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const allKelurahan = [
        { value: 'Belimbing', label: 'Belimbing' },
        { value: 'Kanaan', label: 'Kanaan' },
        { value: 'Telihan', label: 'Telihan' },
        { value: 'Berbas Pantai', label: 'Berbas Pantai' },
        { value: 'Berbas Tengah', label: 'Berbas Tengah' },
        { value: 'Bontang Lestari', label: 'Bontang Lestari' },
        { value: 'Satimpo', label: 'Satimpo' },
        { value: 'Tanjung Laut', label: 'Tanjung Laut' },
        { value: 'Tanjung Laut Indah', label: 'Tanjung Laut Indah' },
        { value: 'Api-api', label: 'Api-api' },
        { value: 'Bontang Baru', label: 'Bontang Baru' },
        { value: 'Bontang Kuala', label: 'Bontang Kuala' },
        { value: 'Guntung', label: 'Guntung' },
        { value: 'Gunung Elai', label: 'Gunung Elai' },
        { value: 'Lok Tuan', label: 'Lok Tuan' },
    ];

    const handleKecamatanChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedKecamatan(selectedValue);
        switch (selectedValue) {
            case 'Bontang Barat':
                setKelurahanOptions(allKelurahan.slice(0, 3));
                break;
            case 'Bontang Selatan':
                setKelurahanOptions(allKelurahan.slice(3, 9));
                break;
            case 'Bontang Utara':
                setKelurahanOptions(allKelurahan.slice(9, 15));
                break;
            default:
                setKelurahanOptions([]);
                break;
        }
        setFormData({ ...formData, kecamatan: selectedValue });
        const newErrors = { ...errors };
        delete newErrors.kecamatan;
        setErrors(newErrors);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.role_id.trim()) newErrors.role_id = 'Role is required';
        if (!formData.NIK.trim()) newErrors.NIK = 'NIK is required';
        if (!formData.nama.trim()) newErrors.nama = 'Nama is required';
        if (!formData.gender.trim()) newErrors.gender = 'Jenis Kelamin is required';
        if (!formData.alamat.trim()) newErrors.alamat = 'Alamat is required';
        if (!formData.kecamatan.trim()) newErrors.kecamatan = 'Kecamatan is required';
        if (!formData.kelurahan.trim()) newErrors.kelurahan = 'Kelurahan is required';
        if (!formData.rt.trim()) newErrors.rt = 'RT is required';
        if (!formData.pendidikan.trim()) newErrors.pendidikan = 'Pendidikan is required';
        if (!formData.pekerjaan.trim()) newErrors.pekerjaan = 'Pekerjaan is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.no_telepon.trim()) newErrors.no_telepon = 'No Telepon is required';
        if (!formData.password.trim()) newErrors.password = 'Password is required';
        else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        window.scrollTo(0, 0);
        if (!validateForm()) {
            return;
        }
        try {
            console.log("FormData:", formData);
            const response = await axios.post(`${apiConfig.baseURL}/register`, formData);
            console.log(response.data);
            Swal.fire({
                title: "Good job!",
                text: "Pendaftaran berhasil. Silahkan login untuk mengakses layanan kami.",
                icon: "success"
            });
            navigate('/admin/users');
        } catch (error) {
            console.error("Error:", error.response.data);
            Swal.fire({
                icon: "error",
                title: "NIK atau Email telah Terdaftar",
                text: "NIK atau Email yang Anda masukkan sudah terdaftar dalam sistem kami. Silakan periksa kembali NIK dan Email Anda atau hubungi petugas pelayanan kami untuk bantuan lebih lanjut",
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        const newErrors = { ...errors };
        delete newErrors[name];
        setErrors(newErrors);
    };

    return(
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
                                    Tambah Data User
                                </h5>
                            </div>
                            <div className="row">
                            <h6 className="mt-4">Data Pemohon</h6>
                                <OptionFieldLog 
                                    label="Role" 
                                    placeholder="Pilih Role" 
                                    name="role_id"  
                                    col="col-lg-6"
                                    options={[
                                        { value: 1, label: 'Admin' },
                                        { value: 2, label: 'Pengguna' }
                                    ]}
                                    value={formData.role_id}
                                    onChange={handleInputChange}
                                    error={errors.role_id}
                                />
                                <InputFieldLog 
                                    label="NIK" 
                                    placeholder="Masukkan NIK" 
                                    name="NIK"  
                                    col="col-lg-6"
                                    value={formData.NIK} 
                                    onChange={handleInputChange} 
                                    error={errors.NIK}
                                />
                                <InputFieldLog 
                                    label="Nama" 
                                    placeholder="Masukkan Nama" 
                                    name="nama" 
                                    col="col-lg-6"
                                    value={formData.nama} 
                                    onChange={handleInputChange} 
                                    error={errors.nama}
                                />
                                <OptionFieldLog 
                                    label="Jenis Kelamin" 
                                    placeholder="Pilih Jenis Kelamin" 
                                    name="gender"  
                                    col="col-lg-6"
                                    options={[
                                        { value: 'Laki-laki', label: 'Laki-laki' },
                                        { value: 'Perempuan', label: 'Perempuan' }
                                    ]}
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    error={errors.gender}
                                />
                                <TextAreaLog 
                                    label="Alamat" 
                                    placeholder="Masukkan Alamat" 
                                    name="alamat" 
                                    col="col-lg-6"
                                    value={formData.alamat} 
                                    onChange={handleInputChange} 
                                    error={errors.alamat}
                                />
                                <OptionFieldLog 
                                    label="Kecamatan" 
                                    placeholder="Pilih Kecamatan" 
                                    name="kecamatan"  
                                    col="col-lg-6"
                                    options={[
                                        { value: 'Bontang Barat', label: 'Bontang Barat' },
                                        { value: 'Bontang Selatan', label: 'Bontang Selatan' },
                                        { value: 'Bontang Utara', label: 'Bontang Utara' }
                                    ]}
                                    value={selectedKecamatan}
                                    onChange={handleKecamatanChange} 
                                    error={errors.kecamatan}
                                />
                                <OptionFieldLog 
                                    label="Kelurahan" 
                                    placeholder="Pilih Kelurahan" 
                                    name="kelurahan" 
                                    col="col-lg-6" 
                                    options={kelurahanOptions}
                                    value={formData.kelurahan} 
                                    onChange={handleInputChange} 
                                    error={errors.kelurahan}
                                />
                                <InputFieldLog 
                                    label="RT" 
                                    placeholder="Masukkan RT" 
                                    name="rt"  
                                    col="col-lg-6"
                                    value={formData.rt} 
                                    onChange={handleInputChange} 
                                    error={errors.rt}
                                />
                                <OptionFieldLog 
                                    label="Pendidikan Terakhir" 
                                    placeholder="Pilih Pendidikan Terakhir" 
                                    name="pendidikan"  
                                    options={[
                                        { value: 'Tidak Sekolah', label: 'Tidak Sekolah' },
                                        { value: 'SD', label: 'SD' },
                                        { value: 'SLTP/sederajat', label: 'SLTP/sederajat' },
                                        { value: 'SLTA/sederajat', label: 'SLTA/sederajat' },
                                        { value: 'D3', label: 'D3' },
                                        { value: 'Sarjana', label: 'Sarjana' },
                                    ]}
                                    value={formData.pendidikan}
                                    onChange={handleInputChange}
                                    col="col-lg-6"
                                    error={errors.pendidikan}
                                />
                                <OptionFieldLog 
                                    label="Pekerjaan" 
                                    placeholder="Pilih Pekerjaan" 
                                    name="pekerjaan"  
                                    options={[
                                        { value: 'PNS', label: 'PNS' },
                                        { value: 'TNI/Polri', label: 'TNI/Polri' },
                                        { value: 'Pegawai Swasta', label: 'Pegawai Swasta' },
                                        { value: 'Wiraswasta', label: 'Wiraswasta' },
                                        { value: 'Pelajar/Mahasiswa', label: 'Pelajar/Mahasiswa' },
                                        { value: 'Lainnya', label: 'Lainnya' },
                                    ]}
                                    value={formData.pekerjaan}
                                    onChange={handleInputChange}
                                    col="col-lg-6"
                                    error={errors.pekerjaan}
                                />
                                <InputFieldLog 
                                    label="No Telepon" 
                                    placeholder="Masukkan No Telepon" 
                                    name="no_telepon"  
                                    col="col-lg-6"
                                    value={formData.no_telepon} 
                                    onChange={handleInputChange} 
                                    error={errors.no_telepon}
                                />
                                <InputFieldLog 
                                    label="Email" 
                                    placeholder="Masukkan Email" 
                                    name="email"  
                                    col="col-lg-6"
                                    value={formData.email} 
                                    onChange={handleInputChange}
                                    error={errors.email}
                                />
                                <PasswordLog 
                                    label="Password" 
                                    placeholder="Masukkan Password" 
                                    name="password"  
                                    col="col-lg-6"
                                    value={formData.password} 
                                    onChange={handleInputChange} 
                                    error={errors.password}
                                />
                                <PasswordLog 
                                    label="Confirm Password" 
                                    placeholder="Konfirmasi Password" 
                                    name="confirmPassword" 
                                    col="col-lg-6"
                                    value={formData.confirmPassword} 
                                    onChange={handleInputChange} 
                                    error={errors.confirmPassword}
                                />
                                <div className="text-end mt-3">
                                    <div className="btn btn-primary" style={{fontSize: '.9rem'}} onClick={handleSubmit}>Kirim</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TambahUser;
