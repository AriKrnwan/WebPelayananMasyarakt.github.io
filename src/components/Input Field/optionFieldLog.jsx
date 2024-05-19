import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

function OptionFieldLog({ label, placeholder, disabled, options, onChange, value, name }) {
    return (
        <div className="input-field col py-2 mb-2">
            <Form.Label className='ubuntu-sans-medium mb-1' style={{fontSize: '.85rem'}}>{label}</Form.Label>
            <Form.Control 
                as="select" 
                disabled={disabled} 
                style={{fontSize: '.85rem'}} 
                required 
                onChange={onChange}
                value={value}
                name={name}
            >
                <option value="">{placeholder}</option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                ))}
            </Form.Control>
        </div>
    );
}

OptionFieldLog.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired
        })
    ).isRequired,
    onChange: PropTypes.func,
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

OptionFieldLog.defaultProps = {
    disabled: false,
    options: [],
    onChange: () => {}
};

export default OptionFieldLog;
