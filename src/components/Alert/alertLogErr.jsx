import { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import { RxCross2 } from "react-icons/rx";
import PropTypes from 'prop-types';

function AlertLogErr({ desc, showAlert, setShowAlert, variant }) {
    const [show, setShow] = useState(showAlert);

    useEffect(() => {
        setShow(showAlert); // Update show state when showAlert prop changes
    }, [showAlert]);

    const handleClose = () => {
        setShow(false);
        setShowAlert(false); // Update showAlert state in parent component
    };

    if (!show) {
        return null;
    }

    return (
        <>
            <Alert variant={variant} className='p-3 d-flex align-items-center gap-3 justify-content-between' style={{fontSize: '.85rem'}}>
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

AlertLogErr.propTypes = {
    desc: PropTypes.string.isRequired,
    variant: PropTypes.string.isRequired,
    showAlert: PropTypes.bool.isRequired,
    setShowAlert: PropTypes.func.isRequired
};

export default AlertLogErr;
