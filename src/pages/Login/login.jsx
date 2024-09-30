import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputFieldLog from "../../components/Input Field/inputFieldLog";
import Wallpaper3 from "../../components/Wallpaper/wallpaper3";
import { NavLink } from "react-router-dom";
import LogoDinas from '../../assets/images/Logo Pemkot Bontang.svg';
import Footer from "../../components/Footer/footer";
import PasswordLog from "../../components/Input Field/passwordLog";
import api from '../../components/api'; // Import axios instance
// import AlertLogErr from '../../components/Alert/alertLogErr';
import Swal from 'sweetalert2';

function Login() {
    const [formData, setFormData] = useState({ NIK: '', password: '' });
    const [errors, setErrors] = useState({});
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
        if (!formData.NIK.trim()) newErrors.NIK = 'Field tidak boleh kosong';
        if (!formData.password.trim()) newErrors.password = 'Field tidak boleh kosong';
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

            // Redirect users based on role_id
            if (user.role === 2) {
                navigate('/home');
            } else if (user.role === 1) {
                navigate('/admin/dashboard');
            } else if (user.role === 3) {
                navigate('/kadis/dashboard');
            } else {
                // Handle other roles if needed
            }

            Swal.fire({
                title: "Login Berhasil",
                text: "Anda berhasil login. Silahkan menikmati layanan kami.",
                icon: "success"
            });
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    Swal.fire({
                        icon: "error",
                        title: "NIK Belum Terdaftar",
                        text: "NIK yang Anda masukkan belum terdaftar. Silakan daftar terlebih dahulu.",
                    });
                } else if (error.response.status === 400) {
                    Swal.fire({
                        icon: "error",
                        title: "Salah Input Password",
                        text: "Password yang anda inputkan salah.",
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Terjadi kesalahan pada server.",
                    });
                }
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Tidak dapat terhubung ke server.",
                });
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
                                <div className='text-end'>
                                    <NavLink to='/lupa-password' className="text-decoration-none ubuntu-sans-medium" style={{fontSize: '.85rem'}}>Lupa Password?</NavLink>
                                </div>
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
                                        Belum punya akun? <NavLink to='/register' className='text-primary text-decoration-none ubuntu-sans-medium'>Daftar</NavLink> 
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
