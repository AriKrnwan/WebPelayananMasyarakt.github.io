import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

function InputNumber({ label, placeholder }) {
    return (
        <>
            <div className="input-field col-lg-6 py-2">
                <Form.Label className='ubuntu-sans-medium' style={{fontSize: '.85rem'}}>{label}</Form.Label>
                <Form.Control type="number" placeholder={placeholder} style={{fontSize: '.9rem'}} required />
            </div>
        </>
    )
}

InputNumber.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired
};

export default InputNumber