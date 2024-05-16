import foto1 from "../../assets/images/Foto Kegiatan.png"
import "./informasi.css"
import { useState } from 'react';

function CardInformasi() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
            <div className="col-lg-4">
                <div className="card p-3">
                    <div className="gambar-card d-flex justify-content-center align-items-center mb-2">
                        <img src={foto1} className="object-fit-cover" alt="" />
                    </div>
                    <div className="judul-info position-relative mb-3">
                        <p className="ubuntu-sans-regular">7 Mei 2024</p>
                        <div className="judul">
                            <h6 
                                className="m-0 overflow-hidden"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >Pendistribusian Bantuan Sembako dari Staf Kepresidenan RI ke LKSA dan LKSLU se Kota Bontang</h6>
                        </div>
                        {isHovered && (
                            <div className="bubble-chat p-2 position-absolute rounded">
                                <div className="isi-bubble-chat position-relative">
                                    <p className="ubuntu-sans-regular text-white text-center">Pendistribusian Bantuan Sembako dari Staf Kepresidenan RI ke LKSA dan LKSLU se Kota Bontang</p>
                                    <div className="arrow position-absolute"></div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="btn btn-primary p-2">
                        <p>Baca</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardInformasi