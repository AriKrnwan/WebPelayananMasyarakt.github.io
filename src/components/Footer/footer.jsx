import logoPemkot from "../../assets/images/Logo Pemkot Bontang.svg"
import logoKemendesa from "../../assets/images/Logo Kemendesa.svg"
import logoKemensos from "../../assets/images/Logo Kemensos.svg"
import { HiPhone, HiGlobeAlt, HiEnvelope } from "react-icons/hi2";
import { HiLocationMarker } from "react-icons/hi";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import '../Footer/footer.css'

function Footer() {
    return (
        <>
            <div id="footer" className="mt-5 pt-5" style={{backgroundColor: '#f5f5f5', width: '100%'}}>
                <div className="container">
                    <div className="row pb-4">
                        <div className="col-lg-4 mb-3">
                            <div className="logos d-flex gap-3">
                                <div className="logo-pemkot" style={{width: '44px', height: '44px'}}><img src={logoPemkot} alt="" /></div>
                                <div className="logo-kemendesa" style={{width: '44px', height: '44px'}}><img src={logoKemendesa} alt="" /></div>
                                <div className="logo-kemensos" style={{width: '44px', height: '44px'}}><img src={logoKemensos} alt="" /></div>
                            </div>
                            <div className="ubuntu-sans-semibold h5 mt-3">Dinas Sosial dan Pemberdayaan Masyarakat Kota Bontang</div>
                            <div className="desc-footer ubuntu-sans-regular mt-2" style={{fontSize: '.85rem'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime sit aliquam voluptas, saepe possimus ea excepturi deleniti accusamus animi.</div>
                        </div>
                        <div className="col-lg-4 mb-3">
                            <div className="ubuntu-sans-semibold h6 mb-2"> Hubungi Kami</div>
                            <div className="d-flex flex-column gap-2">
                                <div className="telepon d-flex align-items-start gap-2">
                                    <div className="icon-footer d-flex align-items-center">
                                        <HiPhone size='18px' />
                                    </div>
                                    <div className="ubuntu-sans-regular" style={{fontSize: '.9rem'}}>082133444123</div>
                                </div>
                                <div className="d-flex align-items-start gap-2">
                                    <div className="icon-footer d-flex align-items-center">
                                        <HiLocationMarker size='18px' />
                                    </div>
                                    <div className="ubuntu-sans-regular" style={{fontSize: '.9rem'}}>Jl. Bessai Berinta Gedung Graha Taman Praja Blok III Lantai 2 Kel. Bontang Lestari</div>
                                </div>
                                <div className="d-flex align-items-start gap-2">
                                    <div className="icon-footer d-flex align-items-center">
                                        <HiGlobeAlt size='18px' />
                                    </div>
                                    <a href='https:dspm.bontangkota.go.id' className="website ubuntu-sans-regular text-decoration-none text-black " style={{fontSize: '.9rem'}}>dspm.bontangkota.go.id</a>
                                </div>
                                <div className="d-flex align-items-start gap-2">
                                    <div className="icon-footer lh-1">
                                        <HiEnvelope size='18px' />
                                    </div>
                                    <div className="ubuntu-sans-regular" style={{fontSize: '.9rem'}}>@gmail.com</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-3">
                            <div className="h6 mb-2 ubuntu-sans-semibold">Sosial Media</div>
                            <div className="social-media d-flex gap-2">
                                <a href='https://www.instagram.com/dinsospm_bontang/' className="instagram rounded-circle p-2 d-flex align-items-center" style={{backgroundColor: '#5356FF'}}>
                                    <FaInstagram color="#fff"/>
                                </a>
                                <a href="https://web.facebook.com/profile.php?id=100068842615319" className="facebook rounded-circle p-2 d-flex align-items-center" style={{backgroundColor: '#5356FF'}}>
                                    <FaFacebookF color="#fff"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer