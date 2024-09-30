import SidebarAdmin from "../../components admin/sidebar";
import InputFieldLog from "../../components/Input Field/inputFieldLog";
import Topbar from "../../components admin/topbar";
import TextAreaLog from "../../components/Input Field/textAreaLog";
import OptionFieldLog from "../../components/Input Field/optionFieldLog";
import PasswordLog from "../../components/Input Field/passwordLog";
import { useState, useEffect } from 'react';
import api from "../../components/api";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function DetailUser() {
    const { nik } = useParams();
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedPendidikan, setSelectedPendidikan] = useState('');
    const [selectedPekerjaan, setSelectedPekerjaan] = useState('');
    const [selectedKecamatan, setSelectedKecamatan] = useState('');
    const [kelurahanOptions, setKelurahanOptions] = useState([]);
    const [selectedKelurahan, setSelectedKelurahan] = useState('');
    const [errors, setErrors] = useState({});
    const [originalEmail, setOriginalEmail] = useState('');
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        nik: '',
        full_name: '',
        gender: '',
        alamat: '',
        kecamatan: '',
        kelurahan: '',
        rt: '',
        pendidikan: '',
        pekerjaan: '',
        email: '',
        no_telp: '',
        password: ''
    });

    const getRole = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user.role;
    };
    const role = getRole();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get(`/user/${nik}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = response.data;
                setUserData({
                    nik: data.nik,
                    full_name: data.full_name,
                    gender: data.gender,
                    alamat: data.alamat,
                    kecamatan: data.kecamatan,
                    kelurahan: data.kelurahan,
                    rt: data.rt,
                    pendidikan: data.pendidikan,
                    pekerjaan: data.pekerjaan,
                    email: data.email,
                    no_telp: data.no_telp,
                    password: ''
                });
                setOriginalEmail(data.email);
                setSelectedGender(data.gender);
                setSelectedPendidikan(data.pendidikan);
                setSelectedPekerjaan(data.pekerjaan);
                setSelectedKecamatan(data.kecamatan);
                setSelectedKelurahan(data.kelurahan);
                if (data.kecamatan) {
                    setKelurahanOptions(kecamatanToKelurahan[data.kecamatan] || []);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [nik]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!String(userData.full_name).trim()) newErrors.full_name = 'Field tidak boleh kosong';
        if (!String(userData.gender).trim()) newErrors.gender = 'Field tidak boleh kosong';
        if (!String(userData.alamat).trim()) newErrors.alamat = 'Field tidak boleh kosong';
        if (!String(userData.kecamatan).trim()) newErrors.kecamatan = 'Field tidak boleh kosong';
        if (!String(userData.kelurahan).trim()) newErrors.kelurahan = 'Field tidak boleh kosong';
        if (!String(userData.rt).trim()) newErrors.rt = 'Field tidak boleh kosong';
        if (!String(userData.pendidikan).trim()) newErrors.pendidikan = 'Field tidak boleh kosong';
        if (!String(userData.pekerjaan).trim()) newErrors.pekerjaan = 'Field tidak boleh kosong';
        if (!String(userData.email).trim()) newErrors.email = 'Field tidak boleh kosong';
        if (!String(userData.no_telp).trim()) newErrors.no_telp = 'Field tidak boleh kosong';
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
        try {
            const response = await api.put(`/user/${nik}`, userData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                Swal.fire({
                    title: "Data Berhasil Diupdate!",
                    text: "Data Berhasil Diupdate",
                    icon: "success"
                });
                resetPasswordField();
            } else {
                console.error('Failed to update user data');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                Swal.fire({
                    icon: "error",
                    title: "Email yang anda ganti telah Terdaftar",
                    text: "Email yang Anda masukkan sudah terdaftar dalam sistem kami.",
                });
            } else {
                console.error('Error:', error);
            }
        }
    };

    const deleteUser = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.delete(`/user/${nik}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                console.log('User deleted successfully');
                navigate('/admin/users');
            } else {
                console.error('Failed to delete user');
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

    const showAlertDelete = () => {
        Swal.fire({
            title: "Apakah Anda yakin untuk menghapus data user ini?",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Iya, hapus",
            icon: 'question',
            confirmButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUser();
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
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
            <div style={{ backgroundColor: '#f5f5f5' }}>
                <div className="row m-0">
                    <div className="col-2 p-0">
                        <SidebarAdmin />
                    </div>
                    <div className="col-10 p-0 main-content min-vh-100">
                        <Topbar />
                        <div className="bg-white m-3 rounded border p-4">
                            <div>
                                <h5 className="ubuntu-sans-medium">
                                    Detail Data User
                                </h5>
                            </div>
                            <div className="row">
                                <h6 className="mt-4">Data Pemohon</h6>
                                <InputFieldLog 
                                    label='NIK' 
                                    col='col-lg-6' 
                                    disabled 
                                    value={userData.nik}
                                />
                                <InputFieldLog 
                                    label="Nama" 
                                    placeholder="Masukkan Nama" 
                                    name="full_name" 
                                    col='col-lg-6' 
                                    value={userData.full_name}
                                    onChange={handleInputChange} 
                                    error={errors.full_name}
                                    disabled={role === 3}
                                />
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
                                    disabled={role === 3}
                                />
                                <TextAreaLog 
                                    label="Alamat" 
                                    placeholder="Masukkan Alamat" 
                                    name="alamat" 
                                    col='col-lg-6' 
                                    value={userData.alamat} 
                                    onChange={handleInputChange} 
                                    error={errors.alamat}
                                    disabled={role === 3}
                                />
                                <OptionFieldLog 
                                    label="Kecamatan" 
                                    placeholder="Masukkan Kecamatan" 
                                    name="kecamatan" 
                                    col='col-lg-6' 
                                    value={userData.kecamatan} 
                                    options={[
                                        { value: 'Bontang Barat', label: 'Bontang Barat' },
                                        { value: 'Bontang Selatan', label: 'Bontang Selatan' },
                                        { value: 'Bontang Utara', label: 'Bontang Utara' },
                                    ]} 
                                    onChange={handleKecamatanChange} 
                                    error={errors.kecamatan}
                                    disabled={role === 3}
                                />
                                <OptionFieldLog 
                                    label="Kelurahan" 
                                    placeholder="Masukkan Kelurahan" 
                                    name="kelurahan" 
                                    col='col-lg-6' 
                                    value={userData.kelurahan} 
                                    options={kelurahanOptions} 
                                    onChange={(e) => setUserData({ ...userData, kelurahan: e.target.value })} 
                                    error={errors.kelurahan}
                                    disabled={role === 3}
                                />
                                <InputFieldLog 
                                    label="RT" 
                                    placeholder="Masukkan RT" 
                                    name="rt" 
                                    col='col-lg-6' 
                                    value={userData.rt} 
                                    onChange={handleInputChange} 
                                    error={errors.rt}
                                    disabled={role === 3}
                                />
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
                                    disabled={role === 3}
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
                                    disabled={role === 3}
                                />
                                <InputFieldLog 
                                    label="Email" 
                                    placeholder="Masukkan Email" 
                                    name="email" 
                                    col='col-lg-6' 
                                    value={userData.email} 
                                    onChange={handleInputChange} 
                                    error={errors.email}
                                    disabled={role === 3}
                                />
                                <InputFieldLog 
                                    label="No. Telp" 
                                    placeholder="Masukkan No. Telp" 
                                    name="no_telp" 
                                    col='col-lg-6' 
                                    value={userData.no_telp} 
                                    onChange={handleInputChange} 
                                    error={errors.no_telp}
                                    disabled={role === 3}
                                />
                                {role !== 3 && (
                                    <PasswordLog 
                                        label="Password" 
                                        placeholder="Masukkan Password jika ingin mengganti" 
                                        name="password" 
                                        col='col-lg-6' 
                                        value={userData.password} 
                                        onChange={handleInputChange} 
                                        error={errors.password}
                                        disabled={role === 3}
                                    />
                                )}
                            </div>
                            {role !== 3 && (
                                <div className="row">
                                    <div className="col-lg-12 mt-4 text-end">
                                        <button className="btn btn-danger me-2" style={{fontSize: '.85rem'}} onClick={showAlertDelete}>
                                            Hapus Data
                                        </button>
                                        <button className="btn btn-primary mr-2" style={{fontSize: '.85rem'}} onClick={updateUserData}>
                                            Update Data
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DetailUser;
