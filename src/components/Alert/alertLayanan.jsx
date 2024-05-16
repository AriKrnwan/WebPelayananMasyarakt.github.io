import { FaCircleInfo } from "react-icons/fa6";

function AlertLayanan() {
    return (
        <>
            <div className="col w-100 d-flex align-items-center rounded p-4 gap-3" style={{backgroundColor: '#224B80'}}>
                <div className="icon-alert">
                    <FaCircleInfo size="28px" color="white" />
                </div>
                <div className="text-alert">
                    <p className="ubuntu-sans-medium text-white mb-1" style={{fontSize: '.85rem'}}>Info</p>
                    <p className="ubuntu-sans-light text-white" style={{fontSize: '.85rem'}}>Berkas yang diunggah akan diproses saat hari dan jam kerja berlangsung.</p>
                </div>
            </div>
        </>
    )
}

export default AlertLayanan;