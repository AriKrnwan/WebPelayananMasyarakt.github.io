import { useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { BsQuestionCircleFill } from "react-icons/bs";
import './input.css';
import api from '../api';
import { RxCross2 } from "react-icons/rx";

function InputFile({ label, moreInfo, name, onChange, disabled, error, filePath, showDownloadButton, table, col }) {
    const [isHovered, setIsHovered] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
        if (onChange) {
            onChange(e);
        }
    };

    const handleDownload = async () => {
        try {
            const response = await api.get(`/download-file/${table}/${filePath}/${name}`, {
                responseType: 'blob'
            });

            // Buat URL objek dari data blob
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;

            // Tentukan nama file yang akan diunduh
            const fileName = 'files.zip'; // Anda dapat menentukan nama file secara dinamis jika diperlukan
            link.setAttribute('download', fileName);

            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    const handleRemoveFile = (fileName) => {
        const newSelectedFiles = selectedFiles.filter(file => file.name !== fileName);
        setSelectedFiles(newSelectedFiles);

        // Create a new DataTransfer object and add the remaining files
        const dataTransfer = new DataTransfer();
        newSelectedFiles.forEach(file => dataTransfer.items.add(file));

        // Update the input file with the new DataTransfer files
        fileInputRef.current.files = dataTransfer.files;

        // Create a new event and call onChange
        const newEvent = new Event('change', { bubbles: true });
        fileInputRef.current.dispatchEvent(newEvent);
    };

    return (
        <div className={`input-field ${col} py-2 mb-2`}>
            <div className="label-more mb-1 d-flex align-items-center justify-content-between position-relative lh-1">
                <Form.Label htmlFor={name} className='ubuntu-sans-medium my-1' style={{ fontSize: '.85rem' }}>{label}</Form.Label>
                {moreInfo && (
                    <BsQuestionCircleFill size={14} color='#bdbdbd' className="m-0 overflow-hidden"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    />
                )}
                {moreInfo && isHovered && (
                    <div className="bubble-input p-2 position-absolute rounded">
                        <div className="isi-bubble-chat position-relative">
                            <p className="ubuntu-sans-regular text-white text-center">{moreInfo}</p>
                            <div className="arrow position-absolute"></div>
                        </div>
                    </div>
                )}
            </div>
            <div className="d-flex gap-2">
                <Form.Control
                    ref={fileInputRef}
                    type="file"
                    id={name}
                    name={name}
                    required
                    style={{ fontSize: '.85rem' }}
                    disabled={disabled}
                    onChange={handleFileChange}
                    isInvalid={!!error}
                    multiple
                />
                {showDownloadButton && (
                    <button type="button" className="btn btn-sm btn-primary" style={{ fontSize: '.85rem', backgroundColor: '#224B80' }} onClick={handleDownload}>
                        Unduh
                    </button>
                )}
            </div>
            {selectedFiles.length > 0 && (
                <div className="mt-1">
                    {selectedFiles.map((file, index) => (
                        <div key={index} className="d-inline-flex align-items-center gap-1 border p-1 rounded mb-1 me-1">
                            <small className="form-text text-muted m-0">{file.name}</small>
                            <RxCross2 size='14px' onClick={() => handleRemoveFile(file.name)} style={{ cursor: 'pointer' }} />
                        </div>
                    ))}
                </div>
            )}
            {error && <Form.Control.Feedback type="invalid" style={{ fontSize: '.85rem' }}>{error}</Form.Control.Feedback>}
        </div>
    );
}

InputFile.propTypes = {
    label: PropTypes.string.isRequired,
    moreInfo: PropTypes.string,
    name: PropTypes.string.isRequired,
    table: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    filePath: PropTypes.arrayOf(PropTypes.string),
    showDownloadButton: PropTypes.bool,
    col: PropTypes.string,
};

InputFile.defaultProps = {
    disabled: false,
    error: null,
    filePath: [],
    showDownloadButton: false,
    col: 'col-lg-6',
};

export default InputFile