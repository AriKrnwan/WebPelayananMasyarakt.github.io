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
    const [selectedKecamatan, setSelectedKecamatan] = useState('');
    const [kelurahanOptions, setKelurahanOptions] = useState([]);
    const [selectedKelurahan, setSelectedKelurahan] = useState('');
    const [originalEmail, setOriginalEmail] = useState(''); // Tambahkan state untuk email asli
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        nik: '',
        full_name: '',
        alamat: '',
        kecamatan: '',
        kelurahan: '',
        rt: '',
        email: '',
        no_telp: '',
        password: '' 
    });

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
                    alamat: data.alamat,
                    kecamatan: data.kecamatan,
                    kelurahan: data.kelurahan,
                    rt: data.rt,
                    email: data.email,
                    no_telp: data.no_telp,
                    password: '' 
                });
                setOriginalEmail(data.email); // Simpan email asli
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

    const updateUserData = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.put(`/user/${nik}`, userData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                console.log('User data updated successfully');
                resetPasswordField();
            } else {
                console.error('Failed to update user data');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data.message); // Menampilkan pesan kesalahan email sudah digunakan
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
                navigate('/admin/users'); // Redirect ke halaman daftar user setelah berhasil dihapus
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
            confirmButtonText: "Iya",
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
                                />
                                <TextAreaLog 
                                    label="Alamat" 
                                    placeholder="Masukkan Alamat" 
                                    name="alamat" 
                                    col='col-lg-6' 
                                    value={userData.alamat} 
                                    onChange={handleInputChange}
                                />
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
                                />
                                <InputFieldLog 
                                    label="RT" 
                                    placeholder="Masukkan RT" 
                                    name="rt" 
                                    col='col-lg-6' 
                                    value={userData.rt} 
                                    onChange={handleInputChange} 
                                />
                                <InputFieldLog 
                                    label="Email" 
                                    placeholder="Masukkan Email" 
                                    name="email" 
                                    col='col-lg-6' 
                                    value={userData.email} 
                                    onChange={handleInputChange} 
                                />
                                <InputFieldLog 
                                    label="No Telepon" 
                                    placeholder="Masukkan No Telepon" 
                                    name="no_telp" 
                                    col='col-lg-6' 
                                    value={userData.no_telp} 
                                    onChange={handleInputChange} 
                                />
                                <PasswordLog 
                                    label="Password"
                                    placeholder="Masukkan Password" 
                                    name="password" 
                                    col='col-lg-6' 
                                    value={userData.password}
                                    onChange={handleInputChange}
                                />
                                <div className="text-end mt-3">
                                    <div className="btn btn-danger me-2" style={{fontSize: '.9rem'}} onClick={showAlertDelete}>Hapus</div>
                                    <div className="btn btn-primary" style={{fontSize: '.9rem'}} onClick={updateUserData}>Update</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DetailUser;
