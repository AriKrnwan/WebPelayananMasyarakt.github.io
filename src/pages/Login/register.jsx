import { useState } from 'react';
import InputFieldLog from "../../components/Input Field/inputFieldLog";
import Wallpaper4 from "../../components/Wallpaper/wallpaper4";
import { NavLink } from "react-router-dom";
import LogoDinas from '../../assets/images/Logo Pemkot Bontang.svg';
import Footer from "../../components/Footer/footer";
import TextAreaLog from "../../components/Input Field/textAreaLog";
import OptionFieldLog from "../../components/Input Field/optionFieldLog";
import PasswordLog from "../../components/Input Field/passwordLog";
import axios from 'axios';
import AlertRegDone from '../../components/Alert/alertRegDone';
import AlertLayanan from '../../components/Alert/alertLayanan';

function Register() {
    const [formData, setFormData] = useState({
        NIK: '',
        nama: '',
        alamat: '',
        kecamatan: '',
        kelurahan: '',
        rt: '',
        email: '',
        no_telepon: '',
        password: ''
    });

    const [selectedKecamatan, setSelectedKecamatan] = useState('');
    const [kelurahanOptions, setKelurahanOptions] = useState([]);
    const [isRegistered, setIsRegistered] = useState(false);

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
    };

    const handleSubmit = async () => {
        window.scrollTo(0, 0);
        try {
            console.log("FormData:", formData); // Tambahkan log untuk memeriksa formData sebelum pengiriman
    
            const response = await axios.post('http://localhost:4121/api/register', formData);
            console.log(response.data);
            setIsRegistered(true);
        } catch (error) {
            console.error("Error:", error.response.data);
            alert(error.response.data || "Error occurred during registration.");
        }
    };
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    return (
        <>
            <div className="bg position-relative">
                <Wallpaper4 />
            </div>
            <div className="row w-100 mx-auto">
                <div className="col-lg-9 mx-auto">
                    <div className="logo d-flex align-items-center py-4">
                        <img src={LogoDinas} className='pe-2' alt="" />
                        <div className="namaLogo">
                            <p className={'ubuntu-sans-medium text-white'}>Dinas Sosial dan Pemberdayaan</p>
                            <p className={'ubuntu-sans-medium text-white'}>Masyarakat Kota Bontang</p>
                        </div>
                    </div>
                    <div className="row mx-auto my-4">
                        <div className="col-lg-7 mx-auto border rounded p-5 mx-auto" style={{backgroundColor: 'white'}}>
                            <h4 className="ubuntu-sans-medium">Register</h4>
                            {isRegistered && <AlertRegDone />}
                            <div className="mt-3 mb-2">
                                <AlertLayanan desc='Silakan isi data sesuai dengan yang tertera di KTP Anda.' />
                            </div>
                            <div className="form-login">
                                <InputFieldLog label="NIK" placeholder="Masukkan NIK" name="NIK" value={formData.NIK} onChange={handleInputChange} />
                                <InputFieldLog label="Nama" placeholder="Masukkan Nama" name="nama" value={formData.nama} onChange={handleInputChange} />
                                <TextAreaLog label="Alamat" placeholder="Masukkan Alamat" name="alamat" value={formData.alamat} onChange={handleInputChange} />
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
                                />
                                <OptionFieldLog 
                                    label="Kelurahan"
                                    placeholder="Pilih Kelurahan"
                                    options={kelurahanOptions} // Menggunakan state untuk opsi kelurahan
                                    name="kelurahan" 
                                    value={formData.kelurahan} 
                                    onChange={handleInputChange}
                                />
                                <InputFieldLog label="RT" placeholder="Masukkan RT" name="rt" value={formData.rt} onChange={handleInputChange} />
                                <InputFieldLog label="Email" placeholder="Masukkan Email" name="email" value={formData.email} onChange={handleInputChange} />
                                <InputFieldLog label="No Telepon" placeholder="Masukkan No Telepon" name="no_telepon" value={formData.no_telepon} onChange={handleInputChange} />
                                <PasswordLog label="Password" placeholder="Masukkan Password" name="password" value={formData.password} onChange={handleInputChange} />
                                <PasswordLog label="Confirm Password" placeholder="Masukkan Password" />
                                <div className="mt-3">
                                <div className="btn btn-primary w-100 ubuntu-sans-medium p-2" style={{fontSize: '.85rem'}} onClick={handleSubmit}>Register</div>
                                </div>
                                <div className="rounded my-4" style={{ height:'2px', width: '100%', backgroundColor: '#e0e0e0' }}></div>
                                <div className="to-regist">
                                    <p className="ubuntu-sans-regular text-center" style={{fontSize: '.85rem'}}>Sudah punya akun? <NavLink to='/login' className='text-primary text-decoration-none'>Login</NavLink> </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Register;
