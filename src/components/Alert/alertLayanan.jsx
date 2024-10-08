import { FaCircleInfo } from "react-icons/fa6";
import PropTypes from 'prop-types';

function AlertLayanan({ showAlert, desc }) {
    if (!showAlert) return null;

    return (
        <div className="col w-100 d-flex align-items-center rounded px-4 py-3 gap-3" style={{ backgroundColor: '#224B80' }}>
            <div className="icon-alert">
                <FaCircleInfo size="28px" color="white" />
            </div>
            <div className="text-alert">
                <p className="ubuntu-sans-medium text-white mb-1" style={{ fontSize: '.85rem' }}>Info</p>
                <p className="ubuntu-sans-light text-white" style={{ fontSize: '.85rem' }}>{desc}</p>
            </div>
        </div>
    );
}

AlertLayanan.propTypes = {
    showAlert: PropTypes.bool,
    desc: PropTypes.string.isRequired
};

export default AlertLayanan;
