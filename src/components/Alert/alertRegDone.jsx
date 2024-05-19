import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { RxCross2 } from "react-icons/rx";

function AlertRegDone() {
    const [show, setShow] = useState(true);

    if (!show) {
        return null;
    }

    return (
        <>
            <Alert variant='success' className='p-3 d-flex align-items-center gap-3' style={{fontSize: '.85rem'}}>
                <div>
                    Pendaftaran Anda berhasil. Silakan <Alert.Link href="/login">Login</Alert.Link> untuk mulai menggunakan layanan kami.
                </div>
                <RxCross2 size={'20px'} style={{ cursor: 'pointer' }} onClick={() => setShow(false)} />
            </Alert>
        </>
    );
}

export default AlertRegDone;
