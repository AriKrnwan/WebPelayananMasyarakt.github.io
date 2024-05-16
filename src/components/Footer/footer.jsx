import logoPemkot from "../../assets/images/Logo Pemkot Bontang.svg"
import logoKemendesa from "../../assets/images/Logo Kemendesa.svg"
import logoKemensos from "../../assets/images/Logo Kemensos.svg"
import { HiPhone, HiGlobeAlt, HiEnvelope } from "react-icons/hi2";
import { HiLocationMarker } from "react-icons/hi";
import { FaInstagram, FaFacebookF } from "react-icons/fa";

function Footer() {
    return (
        <>
            <div id="footer" className="mt-5 pt-5" style={{backgroundColor: '#f5f5f5', width: '100%'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 mb-5">
                            <div className="logos d-flex gap-3">
                                <div className="logo-pemkot" style={{width: '44px', height: '44px'}}><img src={logoPemkot} alt="" /></div>
                                <div className="logo-kemendesa" style={{width: '44px', height: '44px'}}><img src={logoKemendesa} alt="" /></div>
                                <div className="logo-kemensos" style={{width: '44px', height: '44px'}}><img src={logoKemensos} alt="" /></div>
                            </div>
                            <div className="h5 mt-3">Dinas Sosial dan Pemberdayaan Masyarakat Kota Bontang</div>
                            <div className="desc-footer ubuntu-sans-regular mt-3" style={{fontSize: '.8rem'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime sit aliquam voluptas, saepe possimus ea excepturi deleniti accusamus animi.</div>
                        </div>
                        <div className="col-lg-4 mb-5">
                            <div className="h6 mb-3"> Hubungi Kami</div>
                            <div className="kontak d-flex flex-column gap-2">
                                <div className="telepon d-flex align-items-start gap-2">
                                    <div className="icon-footer d-flex align-items-center">
                                        <HiPhone />
                                    </div>
                                    <div className="ubuntu-sans-regular" style={{fontSize: '.85rem'}}>093232</div>
                                </div>
                                <div className="lokasi d-flex align-items-start gap-2">
                                    <div className="icon-footer d-flex align-items-center">
                                        <HiLocationMarker />
                                    </div>
                                    <div className="ubuntu-sans-regular" style={{fontSize: '.85rem'}}>Jl. Bessai Berinta Gedung Graha Taman Praja Blok III Lantai 2 Kel. Bontang Lestari</div>
                                </div>
                                <div className="website d-flex align-items-start gap-2">
                                    <div className="icon-footer d-flex align-items-center">
                                        <HiGlobeAlt />
                                    </div>
                                    <div className="ubuntu-sans-regular" style={{fontSize: '.85rem'}}>www.ww.w..w</div>
                                </div>
                                <div className="email d-flex align-items-start gap-2">
                                    <div className="icon-footer d-flex align-items-center">
                                        <HiEnvelope />
                                    </div>
                                    <div className="ubuntu-sans-regular" style={{fontSize: '.85rem'}}>@gmail.com</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-5">
                            <div className="h6 mb-3">Sosial Media</div>
                            <div className="social-media d-flex gap-2">
                                <div className="instagram rounded-circle p-2 d-flex align-items-center" style={{backgroundColor: '#5356FF'}}>
                                    <FaInstagram color="#fff"/>
                                </div>
                                <div className="facebook rounded-circle p-2 d-flex align-items-center" style={{backgroundColor: '#5356FF'}}>
                                    <FaFacebookF color="#fff"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer