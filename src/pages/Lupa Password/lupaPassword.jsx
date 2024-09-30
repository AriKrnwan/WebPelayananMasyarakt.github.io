import { useState } from "react";
import { NavLink } from "react-router-dom";
import Footer from "../../components/Footer/footer";
import InputFieldLog from "../../components/Input Field/inputFieldLog";
import Wallpaper3 from "../../components/Wallpaper/wallpaper3";
import LogoDinas from '../../assets/images/Logo Pemkot Bontang.svg';
import Swal from "sweetalert2";
import api from "../../components/api"; // Import API instance

function LupaPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async () => {
        setLoading(true);
        try {
            const response = await api.post('/forgot-password', { email });
            Swal.fire({
                title: "Success!",
                text: response.data.msg,
                icon: "success"
            });
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: error.response.data.msg || "An error occurred. Please try again.",
                icon: "error"
            });
        } finally {
            setLoading(false);
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
                            <h4 className="ubuntu-sans-medium">Reset Password</h4>
                            <h6 className="ubuntu-sans-regular" style={{fontSize: '.85rem', color: '#8f8f8f'}}>Masukkan email untuk mereset password</h6>
                            <div className="form-login">
                                <InputFieldLog 
                                    label="Email" 
                                    placeholder="Masukkan Email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <div className="mt-3">
                                    <button 
                                        className="btn btn-primary w-100 ubuntu-sans-medium p-2" 
                                        style={{fontSize: '.85rem'}}
                                        onClick={handleResetPassword}
                                        disabled={loading}
                                    >
                                        {loading ? "Loading..." : "Reset"}
                                    </button>
                                </div>
                                <div className="rounded my-4" style={{ height:'2px', width: '100%', backgroundColor: '#e0e0e0' }}></div>
                                <div className="to-regist">
                                    <p className="ubuntu-sans-regular text-center" style={{fontSize: '.85rem'}}>
                                        Sudah punya akun? 
                                        <NavLink to='/login' className='text-primary text-decoration-none ubuntu-sans-medium'> Login</NavLink> 
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

export default LupaPassword;
