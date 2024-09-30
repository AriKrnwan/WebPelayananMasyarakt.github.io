import '../components/Form Profile/formProfile.css';
import AlertLayanan from '../components/Alert/alertLayanan';
import InputFieldLog from '../components/Input Field/inputFieldLog';
import TextAreaLog from '../components/Input Field/textAreaLog';
import OptionFieldLog from '../components/Input Field/optionFieldLog';
import PasswordLog from '../components/Input Field/passwordLog';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import apiConfig from '../config/config';
import Topbar from '../components admin/topbar';
import SidebarAdmin from '../components admin/sidebar';

function ProfileAdmin() {
    const [selectedKecamatan, setSelectedKecamatan] = useState('');
    const [kelurahanOptions, setKelurahanOptions] = useState([]);
    const [selectedKelurahan, setSelectedKelurahan] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedPekerjaan, setSelectedPekerjaan] = useState('');
    const [selectedPendidikan, setSelectedPendidikan] = useState('');
    const [errors, setErrors] = useState({});
    const [userData, setUserData] = useState({
        NIK: '',
        nama: '',
        gender: '',
        alamat: '',
        kecamatan: '',
        kelurahan: '',
        rt: '',
        pekerjaan: '',
        pendidikan: '',
        email: '',
        no_telp: '',
        password: ''
    });

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            fetchUserData(token);
        }
    }, []);

    useEffect(() => {
        if (userData.kecamatan) {
            setSelectedKecamatan(userData.kecamatan);
            const kelurahan = kecamatanToKelurahan[userData.kecamatan] || [];
            setKelurahanOptions(kelurahan);
        }
    }, [userData.kecamatan]);

    useEffect(() => {
        if (userData.kelurahan) {
            setSelectedKelurahan(userData.kelurahan);
        }
    }, [userData.kelurahan]);

    useEffect(() => {
        if (userData.gender) {
            setSelectedGender(userData.gender);
        }
    }, [userData.gender]);

    const fetchUserData = async (token) => {
        try {
            const response = await fetch(`${apiConfig.baseURL}/user`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const userData = await response.json();
                const formattedUserData = {
                    NIK: userData.NIK ? userData.NIK.toString() : '',
                    nama: userData.nama ? userData.nama.toString() : '',
                    gender: userData.gender ? userData.gender.toString() : '',
                    alamat: userData.alamat ? userData.alamat.toString() : '',
                    kecamatan: userData.kecamatan ? userData.kecamatan.toString() : '',
                    kelurahan: userData.kelurahan ? userData.kelurahan.toString() : '',
                    rt: userData.rt ? userData.rt.toString() : '',
                    pekerjaan: userData.pekerjaan ? userData.pekerjaan.toString() : '',
                    pendidikan: userData.pendidikan ? userData.pendidikan.toString() : '',
                    email: userData.email ? userData.email.toString() : '',
                    no_telp: userData.no_telp ? userData.no_telp.toString() : '',
                    password: ''
                };
                setUserData(formattedUserData);
                setSelectedKelurahan(formattedUserData.kelurahan || '');
                setSelectedGender(formattedUserData.gender || '');
                setSelectedPekerjaan(formattedUserData.pekerjaan || '');
                setSelectedPendidikan(formattedUserData.pendidikan || '');
            } else {
                console.error('Failed to fetch user data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    const validateForm = () => {
        const newErrors = {};
        if (typeof userData.NIK !== 'string' || !userData.NIK.trim()) newErrors.NIK = 'Field tidak boleh kosong';
        if (typeof userData.nama !== 'string' || !userData.nama.trim()) newErrors.nama = 'Field tidak boleh kosong';
        if (typeof userData.gender !== 'string' || !userData.gender.trim()) newErrors.gender = 'Field tidak boleh kosong';
        if (typeof userData.alamat !== 'string' || !userData.alamat.trim()) newErrors.alamat = 'Field tidak boleh kosong';
        if (typeof userData.kecamatan !== 'string' || !userData.kecamatan.trim()) newErrors.kecamatan = 'Field tidak boleh kosong';
        if (typeof userData.kelurahan !== 'string' || !userData.kelurahan.trim()) newErrors.kelurahan = 'Field tidak boleh kosong';
        if (typeof userData.rt !== 'string' || !userData.rt.trim()) newErrors.rt = 'Field tidak boleh kosong';
        if (typeof userData.pendidikan !== 'string' || !userData.pendidikan.trim()) newErrors.pendidikan = 'Field tidak boleh kosong';
        if (typeof userData.pekerjaan !== 'string' || !userData.pekerjaan.trim()) newErrors.pekerjaan = 'Field tidak boleh kosong';
        if (typeof userData.email !== 'string' || !userData.email.trim()) newErrors.email = 'Field tidak boleh kosong';
        if (typeof userData.no_telp !== 'string' || !userData.no_telp.trim()) newErrors.no_telp = 'Field tidak boleh kosong';
        if (userData.password && userData.password.length < 8) newErrors.password = 'Password minimal 8 karakter';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const updateUserData = async () => {
        if (!validateForm()) {
            window.scrollTo(0, 0);
            return;
        }

        const token = localStorage.getItem('token');
        const { password, ...userDataWithoutPassword } = userData;
        const payload = password ? userData : userDataWithoutPassword;

        try {
            const response = await fetch(`${apiConfig.baseURL}/user`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                console.log('User data updated successfully');
                Swal.fire({
                    title: "Data Berhasil Diupdate!",
                    text: "Data Berhasil Diupdate",
                    icon: "success"
                });
                resetPasswordField();
                const newToken = response.headers.get('Authorization');
                if (newToken) {
                    localStorage.setItem('token', newToken);
                }
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Email yang anda ganti telah Terdaftar",
                    text: "Email yang Anda masukkan sudah terdaftar dalam sistem kami.",
                });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const resetPasswordField = () => {
        setUserData({
            ...userData,
            password: ''
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });

        // Hapus error ketika user mulai mengisi field
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

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

    const kecamatanToKelurahan = {
        'Bontang Barat': allKelurahan.slice(0, 3),
        'Bontang Selatan': allKelurahan.slice(3, 9),
        'Bontang Utara': allKelurahan.slice(9, 15),
    };

    const handleKecamatanChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedKecamatan(selectedValue);
        const kelurahan = kecamatanToKelurahan[selectedValue] || [];
        setKelurahanOptions(kelurahan);
        setUserData({
            ...userData,
            kecamatan: selectedValue,
            kelurahan: ''
        });
        setSelectedKelurahan('');
    };

    return (
        <>
            <div className="overflow-hi wv-100" style={{ backgroundColor: '#f5f5f5' }}>
                <div className="row m-0">
                    <div className="col-2 p-0">
                        <SidebarAdmin />
                    </div>
                    <div className="col-10 p-0 min-vh-100">
                        <Topbar />
                        <div className="bg-white m-3 rounded border p-2">
                            <div className="p-4 row">
                                <InputFieldLog label='NIK' col='col-lg-6' disabled value={userData.NIK} error={errors.NIK} />
                                <InputFieldLog label="Nama" placeholder="Masukkan Nama" name="nama" col='col-lg-6' value={userData.nama} onChange={handleInputChange} error={errors.nama} />
                                <OptionFieldLog
                                    label="Jenis Kelamin"
                                    placeholder="Pilih Jenis Kelamin"
                                    options={[
                                        { value: 'Laki-laki', label: 'Laki-laki' },
                                        { value: 'Perempuan', label: 'Perempuan' },
                                    ]}
                                    onChange={(event) => {
                                        setSelectedGender(event.target.value);
                                        setUserData({
                                            ...userData,
                                            gender: event.target.value
                                        });
                                    }}
                                    value={selectedGender}
                                    name="gender"
                                    col='col-lg-6'
                                    error={errors.gender}
                                />
                                <TextAreaLog label="Alamat" placeholder="Masukkan Alamat" name="alamat" col='col-lg-6' value={userData.alamat} onChange={handleInputChange} error={errors.alamat} />
                                <OptionFieldLog
                                    label="Kecamatan"
                                    placeholder="Pilih Kecamatan"
                                    options={[
                                        { value: 'Bontang Barat', label: 'Bontang Barat' },
                                        { value: 'Bontang Selatan', label: 'Bontang Selatan' },
                                        { value: 'Bontang Utara', label: 'Bontang Utara' }
                                    ]}
                                    onChange={handleKecamatanChange}
                                    value={selectedKecamatan}
                                    name="kecamatan"
                                    col='col-lg-6'
                                    error={errors.kecamatan}
                                />
                                <OptionFieldLog
                                    label="Kelurahan"
                                    placeholder="Pilih Kelurahan"
                                    options={kelurahanOptions}
                                    value={selectedKelurahan}
                                    onChange={(event) => {
                                        setSelectedKelurahan(event.target.value);
                                        setUserData({
                                            ...userData,
                                            kelurahan: event.target.value
                                        });
                                    }}
                                    name="kelurahan"
                                    col='col-lg-6'
                                    error={errors.kelurahan}
                                />
                                <InputFieldLog label="RT" placeholder="Masukkan RT" name="rt" col='col-lg-6' value={userData.rt} onChange={handleInputChange} error={errors.rt} />
                                <OptionFieldLog
                                    label="Pekerjaan"
                                    placeholder="Pilih Pekerjaan"
                                    options={[
                                        { value: 'PNS', label: 'PNS' },
                                        { value: 'TNI/Polri', label: 'TNI/Polri' },
                                        { value: 'Pegawai Swasta', label: 'Pegawai Swasta' },
                                        { value: 'Wiraswasta', label: 'Wiraswasta' },
                                        { value: 'Pelajar/Mahasiswa', label: 'Pelajar/Mahasiswa' },
                                        { value: 'Lainnya', label: 'Lainnya' },
                                    ]}
                                    onChange={(event) => {
                                        setSelectedPekerjaan(event.target.value);
                                        setUserData({
                                            ...userData,
                                            pekerjaan: event.target.value
                                        });
                                    }}
                                    value={selectedPekerjaan}
                                    name="pekerjaan"
                                    col='col-lg-6'
                                    error={errors.pekerjaan}
                                />
                                <OptionFieldLog
                                    label="Pendidikan Terakhir"
                                    placeholder="Pilih Pendidikan Terakhir"
                                    options={[
                                        { value: 'Tidak Sekolah', label: 'Tidak Sekolah' },
                                        { value: 'SD', label: 'SD' },
                                        { value: 'SLTP/sederajat', label: 'SLTP/sederajat' },
                                        { value: 'SLTA/sederajat', label: 'SLTA/sederajat' },
                                        { value: 'D3', label: 'D3' },
                                        { value: 'Sarjana', label: 'Sarjana' },
                                    ]}
                                    onChange={(event) => {
                                        setSelectedPendidikan(event.target.value);
                                        setUserData({
                                            ...userData,
                                            pendidikan: event.target.value
                                        });
                                    }}
                                    value={selectedPendidikan}
                                    name="pendidikan"
                                    col='col-lg-6'
                                    error={errors.pendidikan}
                                />
                                <InputFieldLog label="Email" placeholder="Masukkan Email" name="email" col='col-lg-6' value={userData.email} onChange={handleInputChange} error={errors.email} />
                                <InputFieldLog label="No. Telepon" placeholder="Masukkan No. Telepon" name="no_telp" col='col-lg-6' value={userData.no_telp} onChange={handleInputChange} error={errors.no_telp} />
                                <PasswordLog label="Password" placeholder="Masukkan Password jika ingin mengganti password baru" name="password" col='col-lg-6' value={userData.password} onChange={handleInputChange} error={errors.password} />
                                <div className="lg pt-3 text-end">
                                    <div className="btn btn-primary" style={{fontSize: '.9rem'}} onClick={updateUserData}>Update Data</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileAdmin;
