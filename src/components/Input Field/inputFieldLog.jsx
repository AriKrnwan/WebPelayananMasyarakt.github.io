import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

function InputFieldLog({ label, placeholder, disabled, value, onChange, name }) {
    return (
        <>
            <div className="input-field col py-2 mb-2">
                <Form.Label className='ubuntu-sans-medium mb-1' style={{fontSize: '.85rem'}}>{label}</Form.Label>
                <Form.Control 
                    disabled={disabled} 
                    type="text" 
                    placeholder={placeholder} 
                    style={{fontSize: '.85rem'}} 
                    value={value}
                    onChange={onChange}
                    name={name} 
                    required 
                />
            </div>
        </>
    )
}

InputFieldLog.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired, 
};

InputFieldLog.defaultProps = {
    disabled: false
};

export default InputFieldLog;
