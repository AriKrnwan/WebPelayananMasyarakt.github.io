import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

function InputNumber({ label, placeholder, disabled }) {
    return (
        <>
            <div className="input-field col-lg-6 py-2 mb-2">
                <Form.Label className='ubuntu-sans-medium mb-1' style={{fontSize: '.85rem'}}>{label}</Form.Label>
                <Form.Control disabled={disabled} type="number" placeholder={placeholder} style={{fontSize: '.85rem'}} required />
            </div>
        </>
    )
}

InputNumber.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    disabled: PropTypes.bool
};

InputNumber.defaultProps = {
    disabled: false
};

export default InputNumber