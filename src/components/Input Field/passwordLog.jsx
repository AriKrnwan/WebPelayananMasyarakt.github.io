import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { IoMdEye, IoIosEyeOff } from "react-icons/io";

function PasswordLog({
    label,
    placeholder,
    disabled = false,
    value,
    onChange,
    name,
    error = null,
    col = 'col'
}) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={`input-field ${col} py-2 mb-2`}>
            <Form.Label className='ubuntu-sans-medium mb-1' style={{ fontSize: '.85rem' }}>
                {label}
            </Form.Label>
            <div className={`field border rounded ${error ? 'border-danger' : ''}`}>
                <div className="d-flex align-items-center pe-2">
                    <Form.Control
                        disabled={disabled}
                        type={showPassword ? "text" : "password"}
                        placeholder={placeholder}
                        style={{ fontSize: '.85rem' }}
                        className='border-0'
                        value={value}
                        onChange={onChange}
                        name={name}
                        required
                    />
                    {showPassword ? (
                        <IoIosEyeOff onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }} />
                    ) : (
                        <IoMdEye onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }} />
                    )}
                </div>
            </div>
            {error && <div className="text-danger mt-1" style={{ fontSize: '.85rem' }}>{error}</div>}
        </div>
    );
}

PasswordLog.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    error: PropTypes.string,
    col: PropTypes.string // Add col prop type
};

export default PasswordLog;
