// AlertRegDone component
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { RxCross2 } from "react-icons/rx";
import PropTypes from 'prop-types';

function AlertRegDone({ show, setShow }) {
    const [showAlert, setShowAlert] = useState(show);

    const handleClose = () => {
        setShowAlert(false);
        setShow(false); // Reset isRegistered state when closing the alert
    };

    if (!showAlert) {
        return null;
    }

    return (
        <>
            <Alert variant='success' className='p-3 d-flex align-items-center gap-3 justify-content-between' style={{ fontSize: '.85rem' }}>
                <div>
                    Pendaftaran Anda berhasil. Silakan <Alert.Link href="/login">Login</Alert.Link> untuk mulai menggunakan layanan kami.
                </div>
                <div>
                    <RxCross2 size={'20px'} style={{ cursor: 'pointer' }} onClick={handleClose} />
                </div>
            </Alert>
        </>
    );
}

AlertRegDone.propTypes = {
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired
};

export default AlertRegDone;
