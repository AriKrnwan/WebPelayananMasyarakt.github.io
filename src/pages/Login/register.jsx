import InputFieldLog from "../../components/Input Field/inputFieldLog"
import Wallpaper4 from "../../components/Wallpaper/wallpaper4"
import { NavLink } from "react-router-dom";
import LogoDinas from '../../assets/images/Logo Pemkot Bontang.svg';
import Footer from "../../components/Footer/footer";
import TextAreaLog from "../../components/Input Field/textAreaLog";

function Register() {
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
                            <div className="form-login">
                                <InputFieldLog label="NIK" placeholder="Masukkan NIK" />
                                <InputFieldLog label="Nama" placeholder="Masukkan NIK" />
                                <TextAreaLog label="Alamat" placeholder="Masukkan NIK" />
                                <InputFieldLog label="Email" placeholder="Masukkan NIK" />
                                <InputFieldLog label="No Telepon" placeholder="Masukkan Password" />
                                <InputFieldLog label="Password" placeholder="Masukkan Password" />
                                <InputFieldLog label="Confirm Password" placeholder="Masukkan Password" />
                                <div className="mt-3">
                                    <div className="btn btn-primary w-100 ubuntu-sans-medium p-2" style={{fontSize: '.85rem'}}>Register</div>
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
    )
}

export default Register