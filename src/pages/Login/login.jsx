import InputFieldLog from "../../components/Input Field/inputFieldLog"
import Wallpaper3 from "../../components/Wallpaper/wallpaper3"
import { NavLink } from "react-router-dom";
import LogoDinas from '../../assets/images/Logo Pemkot Bontang.svg';
import Footer from "../../components/Footer/footer";
import PasswordLog from "../../components/Input Field/passwordLog";

function Login() {
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
                                <InputFieldLog label="NIK" placeholder="Masukkan NIK" />
                                <PasswordLog label="Password" placeholder="Masukkan Password" />
                                <NavLink>
                                    <p className="text-end" style={{fontSize: '.85rem'}}>Lupa Password?</p>
                                </NavLink>
                                <div className="mt-3">
                                    <div className="btn btn-primary w-100 ubuntu-sans-medium p-2" style={{fontSize: '.85rem'}}>Login</div>
                                </div>
                                <div className="rounded my-4" style={{ height:'2px', width: '100%', backgroundColor: '#e0e0e0' }}></div>
                                <div className="to-regist">
                                    <p className="ubuntu-sans-regular text-center" style={{fontSize: '.85rem'}}>Belum punya akun? <NavLink to='/register' className='text-primary text-decoration-none'>Daftar</NavLink> </p>
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

export default Login