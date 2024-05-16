import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

function InputField({ label, placeholder }) {
    return (
        <>
            <div className="input-field col-lg-6 py-2">
                <Form.Label className='ubuntu-sans-medium' style={{fontSize: '.9rem'}}>{label}</Form.Label>
                <Form.Control type="text" placeholder={placeholder} style={{fontSize: '.8rem'}} required />
            </div>
        </>
    )
}

InputField.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired
};

export default InputField