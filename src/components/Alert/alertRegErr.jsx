// AlertRegErr component
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { RxCross2 } from "react-icons/rx";
import PropTypes from 'prop-types';

function AlertRegErr({ desc, showAlert, setShowAlert }) {
    const [show, setShow] = useState(showAlert);

    const handleClose = () => {
        setShow(false);
        setShowAlert(false); // Reset isAvailable state when closing the alert
    };

    if (!show) {
        return null;
    }

    return (
        <>
            <Alert variant='danger' className='p-3 d-flex align-items-center gap-3 justify-content-between' style={{fontSize: '.85rem'}}>
                <div>
                    {desc}
                </div>
                <div>
                    <RxCross2 size={'20px'} style={{ cursor: 'pointer' }} onClick={handleClose} />
                </div>
            </Alert>
        </>
    );
}

AlertRegErr.propTypes = {
    desc: PropTypes.string.isRequired,
    showAlert: PropTypes.bool.isRequired,
    setShowAlert: PropTypes.func.isRequired
};

export default AlertRegErr;
