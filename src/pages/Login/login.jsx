import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputFieldLog from "../../components/Input Field/inputFieldLog";
import Wallpaper3 from "../../components/Wallpaper/wallpaper3";
import { NavLink } from "react-router-dom";
import LogoDinas from '../../assets/images/Logo Pemkot Bontang.svg';
import Footer from "../../components/Footer/footer";
import PasswordLog from "../../components/Input Field/passwordLog";
import api from '../../components/api'; // Import axios instance
import AlertLogErr from '../../components/Alert/alertLogErr';

function Login() {
    const [formData, setFormData] = useState({ NIK: '', password: '' });
    const [error, setError] = useState(false);
    const [errors, setErrors] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const [NIKNotFoundError, setNIKNotFoundError] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        const newErrors = { ...errors };
        delete newErrors[name];
        setErrors(newErrors);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.NIK.trim()) newErrors.NIK = 'NIK is required';
        if (!formData.password.trim()) newErrors.password = 'Password is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }
        try {
            const response = await api.post('/login', formData);
            const { token, user } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            navigate('/home');
        } catch (error) {
            setError(true);
            if (error.response && error.response.status === 404) {
                setNIKNotFoundError(true);
                setShowAlert(true);
            } else {
                setNIKNotFoundError(false);
                setShowAlert(true);
            }
        }
    };

    return (
        <>
            <div className="bg position-relative">
                <Wallpaper3 />
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
                            <h4 className="ubuntu-sans-medium">Login</h4>
                            {error && <AlertLogErr variant='danger' desc={NIKNotFoundError ? 'NIK yang Anda masukkan belum terdaftar. Silakan daftar terlebih dahulu.' : 'NIK atau password yang Anda masukkan salah.'} showAlert={showAlert} setShowAlert={setShowAlert} />}
                            <div className="form-login">
                                <InputFieldLog 
                                    label="NIK" 
                                    placeholder="Masukkan NIK" 
                                    name="NIK"  
                                    value={formData.NIK} 
                                    onChange={handleInputChange} 
                                    error={errors.NIK} 
                                />
                                <PasswordLog 
                                    label="Password" 
                                    placeholder="Masukkan Password" 
                                    name="password" 
                                    value={formData.password} 
                                    onChange={handleInputChange} 
                                    error={errors.password} 
                                />
                                <NavLink>
                                    <p className="text-end" style={{fontSize: '.85rem'}}>Lupa Password?</p>
                                </NavLink>
                                <div className="mt-3">
                                    <div 
                                        className="btn btn-primary w-100 ubuntu-sans-medium p-2" 
                                        style={{fontSize: '.85rem'}} 
                                        onClick={handleSubmit}
                                    >
                                        Login
                                    </div>
                                </div>
                                <div className="rounded my-4" style={{ height:'2px', width: '100%', backgroundColor: '#e0e0e0' }}></div>
                                <div className="to-regist">
                                    <p className="ubuntu-sans-regular text-center" style={{fontSize: '.85rem'}}>
                                        Belum punya akun? 
                                        <NavLink to='/register' className='text-primary text-decoration-none'>Daftar</NavLink> 
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Login;
