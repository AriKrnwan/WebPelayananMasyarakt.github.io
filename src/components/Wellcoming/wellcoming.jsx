import Kepala from "../../assets/images/Kepala.svg"
import "../Wellcoming/wellcoming.css"

function Wellcoming() {
    return (
        <>
        <div className="wellcome row">
            <div className="left col-lg-6 d-flex justify-content-center">
                <img className="" src={Kepala} alt="" />
            </div>
            <div className="right col-lg-6 d-flex flex-column gap-1 justify-content-center ">
                <div className="text-wellcome">
                    <div className="text-top d-flex gap-1 align-items-center">
                        <div className="text-bg text-white px-2 py-1 rounded-2">
                            <p className="ubuntu-sans-semibold">Selamat Datang</p>
                        </div>
                        <div className="text-nonbg text-white">
                            <p className="ubuntu-sans-semibold">di</p>
                        </div>
                    </div>
                    <div className="custom-platform-text text-bottom ubuntu-sans-semibold text-white">Platform Pelayanan Publik</div>
                </div>
                <div className="long-text ubuntu-sans-regular text-white">Kami siap memberikan pelayanan yang cekatan, amanah, informatif, dan ramah. Kami hadir untuk memudahkan Anda dengan layanan yang handal dan penuh kepedulian.</div>
            </div>
        </div>
        </>
    )
}

export default Wellcoming