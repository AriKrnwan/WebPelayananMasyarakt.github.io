import '../Form Profile/formProfile.css';
import AlertLayanan from '../Alert/alertLayanan';
import InputFieldLog from '../Input Field/inputFieldLog';
import TextAreaLog from '../Input Field/textAreaLog';
import OptionFieldLog from '../Input Field/optionFieldLog';
import PasswordLog from '../Input Field/passwordLog';
import { useState, useEffect } from 'react';
import apiConfig from '../../config/config';

function FormProfile() {
    const [selectedKecamatan, setSelectedKecamatan] = useState('');
    const [kelurahanOptions, setKelurahanOptions] = useState([]);
    const [selectedKelurahan, setSelectedKelurahan] = useState('');
    const [userData, setUserData] = useState({
        NIK: '',
        nama: '',
        alamat: '',
        kecamatan: '',
        kelurahan: '',
        rt: '',
        email: '',
        no_telp: '',
        password: '' // Menambah state password baru
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
                setUserData(userData);
                setSelectedKelurahan(userData.kelurahan || '');
            } else {
                console.error('Failed to fetch user data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const updateUserData = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${apiConfig.baseURL}/user`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                console.log('User data updated successfully');
                // Perbarui token autentikasi setelah berhasil mengubah data
                const newToken = response.headers.get('Authorization');
                if (newToken) {
                    localStorage.setItem('token', newToken);
                }
            } else {
                console.error('Failed to update user data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

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
            kelurahan: '' // Reset kelurahan ketika kecamatan diubah
        });
        setSelectedKelurahan(''); // Reset kelurahan ketika kecamatan diubah
    };

    return (
        <>
            <div className="wrap-prof">
                <div className="form-profile row rounded border p-4 g-1 g-lg-2" style={{backgroundColor: 'white'}}>
                    <div className='p-0 d-flex flex-column'>
                        <h4 className='text-center ubuntu-sans-semibold'>Profile</h4>
                        <AlertLayanan desc='Pastikan data yang Anda masukkan pada profil sesuai dengan NIK yang tertera pada Kartu Tanda Penduduk (KTP) Anda.' />
                    </div>
                    <InputFieldLog label='NIK' col='col-lg-6' disabled value={userData.NIK} />
                    <InputFieldLog label="Nama" placeholder="Masukkan Nama" name="nama" col='col-lg-6' value={userData.nama} onChange={handleInputChange} />
                    <TextAreaLog label="Alamat" placeholder="Masukkan Alamat" name="alamat" col='col-lg-6' value={userData.alamat} onChange={handleInputChange} />
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
                    <InputFieldLog label="RT" placeholder="Masukkan RT" name="rt" col='col-lg-6' value={userData.rt} onChange={handleInputChange} />
                    <InputFieldLog label="Email" placeholder="Masukkan Email" name="email" col='col-lg-6' value={userData.email} onChange={handleInputChange} />
                    <InputFieldLog label="No Telepon" placeholder="Masukkan No Telepon" name="no_telp" col='col-lg-6' value={userData.no_telp} onChange={handleInputChange} />
                    <PasswordLog label="Password" placeholder="Masukkan Password" name="password" col='col-lg-6' onChange={handleInputChange} />
                    <div className="lg pt-3">
                        <div className="btn btn-primary w-100" onClick={updateUserData}>Kirim</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FormProfile;
