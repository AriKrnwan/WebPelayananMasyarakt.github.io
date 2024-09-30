import { useState } from "react";
import { useParams } from "react-router-dom";
import InputFile from "../components/Input Field/inputFile";
import Swal from "sweetalert2";
import api from "../components/api";
import Topbar from "../components admin/topbar";
import SidebarAdmin from "../components admin/sidebar";

function Template() {
    const { layananType } = useParams();
    const [files, setFiles] = useState({
        surat_permohonan_bantuan_logistik: [],
        surat_permohonan_santunan_kematian: [],
        surat_permohonan_lks: [],
        suket_terdaftar_lks: [],
        surat_pernyataan: []
    });

    const handleFileChange = (e) => {
        const { name, files: selectedFiles } = e.target;
        setFiles(prevFiles => ({
            ...prevFiles,
            [name]: Array.from(selectedFiles)
        }));
    };

    const handleSubmit = async () => {
        const hasFiles = Object.values(files).some(fileArray => fileArray.length > 0);

        if (!hasFiles) {
            Swal.fire({
                title: 'Field tidak terisi',
                text: 'Masukkan Field untuk mengupdate',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        const formData = new FormData();
        Object.keys(files).forEach(fileType => {
            files[fileType].forEach(file => {
                formData.append(fileType, file);
            });
        });

        try {
            const token = localStorage.getItem('token');
            const response = await api.put('/update-template', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            Swal.fire({
                title: 'Success',
                text: response.data,
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Kesalahan Server',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const renderInputFile = () => {
        switch (layananType) {
            case 'bantuan-logistik':
                return (
                    <InputFile
                        label="Surat Permohonan Bantuan Logistik"
                        name="surat_permohonan_bantuan_logistik"
                        showDownloadButton
                        table="template"
                        id='1'
                        onChange={handleFileChange}
                    />
                );
            case 'santunan-kematian':
                return (
                    <InputFile
                        label="Surat Permohonan Santunan Kematian"
                        name="surat_permohonan_santunan_kematian"
                        showDownloadButton
                        table="template"
                        id='1'
                        onChange={handleFileChange}
                    />
                );
            case 'pengumpulan-uang-dan-barang':
                return (
                    <InputFile
                        label="Surat Keterangan Terdaftar bagi LKS"
                        name="suket_terdaftar_lks"
                        showDownloadButton
                        table="template"
                        id='1'
                        onChange={handleFileChange}
                    />
                );
            case 'rumah-singgah':
                return (
                    <InputFile
                        label="Surat Pernyataan"
                        name="surat_pernyataan"
                        showDownloadButton
                        table="template"
                        id='1'
                        onChange={handleFileChange}
                    />
                );
            case 'SKT':
            case 'SIO':
                return (
                    <InputFile
                        label="Surat Permohonan Pengajuan LKS"
                        name="surat_permohonan_lks"
                        showDownloadButton
                        table="template"
                        id='1'
                        onChange={handleFileChange}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div style={{ backgroundColor: '#f5f5f5' }}>
            <div className="row m-0">
                <div className="col-2 p-0">
                    <SidebarAdmin />
                </div>
                <div className="col-10 p-0 main-content min-vh-100">
                    <Topbar />
                    <div className="bg-white m-3 rounded border p-4">
                        <div>
                            <h5 className="ubuntu-sans-medium">
                                Template Surat 
                            </h5>
                        </div>
                        <div className="row">
                            {renderInputFile()}
                            <div className="text-end mt-3">
                                <div className="btn btn-primary" style={{ fontSize: '.9rem' }} onClick={handleSubmit}>
                                    Update
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Template;
