import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InputFieldLog from "../../components/Input Field/inputFieldLog";
import InputFile from "../../components/Input Field/inputFile";
import TextAreaLog from "../../components/Input Field/textAreaLog";
import Swal from "sweetalert2";
import api from "../../components/api";

function DetailPBIJK() {
    const { nopel } = useParams();
    const [data, setData] = useState(null);
    const [status, setStatus] = useState("Tidak Diketahui");
    const [files, setFiles] = useState({
        ktp: [],
        suket_rawat_inap: [],
        product: [],
    });
    const [reason, setReason] = useState('');
    const [reasonFromDB, setReasonFromDB] = useState('');
    const layanan = 'lay_pbijk';

    const handleFileChange = (e) => {
        const { name, files: selectedFiles } = e.target;
        setFiles(prevFiles => ({
            ...prevFiles,
            [name]: Array.from(selectedFiles)
        }));
    };

    const getRole = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user.role;
    };
    const role = getRole();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get(`/lay-PBI-JK/${nopel}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data)
                setData(response.data);
                setStatus(calculateStatus(response.data));
                setReasonFromDB(response.data.reason || '');
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [nopel]);

    const calculateStatus = (selectedData) => {
        if (selectedData) {
            const { submit_at, valid_at, reject_at, accept_at } = selectedData;
            if (submit_at && !valid_at && !reject_at && !accept_at) {
                return "Menunggu Validasi";
            } else if (submit_at && valid_at && !reject_at && !accept_at) {
                return "Berkas Diproses";
            } else if (submit_at && valid_at && reject_at && !accept_at) {
                return "Ditolak";
            } else if (submit_at && valid_at && !reject_at && accept_at) {
                return "Diterima";
            } else if (submit_at && !valid_at && reject_at && !accept_at) {
                return "Berkas Tidak Valid";
            }
        }
        return "Tidak Diketahui";
    };

    const handleUpdate = async () => {
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

        let formData = new FormData();
        Object.keys(files).forEach(fileType => {
            files[fileType].forEach(file => {
                formData.append(fileType, file);
            });
        });
        formData.append('id', data.id);

        // Jika ada alasan baru yang diinputkan, tambahkan ke FormData
        if (reason.trim() !== "") {
            formData.append('reason', reason.trim());
        } else if (reasonFromDB) {
            // Jika tidak, tambahkan alasan dari database
            formData.append('reason', reasonFromDB);
        } else {
            // Jika tidak ada alasan yang baru dan tidak ada alasan di database, beri nilai kosong
            formData.append('reason', '');
        }

        try {
            const token = localStorage.getItem('token');
            const response = await api.put(`update-PBI-JK/${nopel}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Data updated successfully:', response.data);
            Swal.fire({
                title: "Good job!",
                text: "Data Berhasil Diupdate",
                icon: "success"
            });
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleValid = async () => {
        if (reason.trim() !== "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Field Alasan harus kosong sebelum validasi data.",
            });
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await api.put(`update-PBI-JK/${nopel}`, {
                valid_at: new Date().toISOString()
            },{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Data validated successfully:', response.data);
            setStatus("Berkas Diproses");

            const notifResponse = await api.post('/notifikasi', {
                user_nik: data.user_nik,
                no_lay: data.no_lay,
                layanan: "PBI-JK",
                type_message: 1
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Notification created successfully:', notifResponse.data);

            Swal.fire({
                title: "Good job!",
                text: "Status Pengajuan Menjadi Berkas Diproses",
                icon: "success"
            });
        } catch (error) {
            console.error('Error validating data:', error);
        }
    };

    const handleInvalid = async (typeMessage) => {
        if (reason.trim() === "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Field Alasan harus diisi untuk menolak data.",
            });
            return;
        }
        
        if (files.product.length !== 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Field Produk Layanan harus kosong!",
            });
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await api.put(`update-PBI-JK/${nopel}`, {
                reject_at: new Date().toISOString(),
                reason: reason.trim()
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Data invalidated successfully:', response.data);
            setStatus("Berkas Tidak Valid");

            const notifResponse = await api.post('/notifikasi', {
                user_nik: data.user_nik,
                no_lay: data.no_lay,
                layanan: "PBI-JK",
                type_message: typeMessage
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Notification created successfully:', notifResponse.data);

            Swal.fire({
                title: "Good job!",
                text: "Status Pengajuan Menjadi Tidak Valid",
                icon: "success"
            });
        } catch (error) {
            console.error('Error invalidating data:', error);
        }
    };

    const handleAccept = async () => {
        if (files.product.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "File Produk Layanan harus diunggah untuk menerima data.",
            });
            return;
        }

        if (reason.trim() !== "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Field Alasan harus kosong sebelum menerima data.",
            });
            return;
        }

        let formData = new FormData();
        Object.keys(files).forEach(fileType => {
            files[fileType].forEach(file => {
                formData.append(fileType, file);
            });
        });
        formData.append('id', data.id);

        const currentDate = new Date().toISOString();
        formData.append('accept_at', currentDate);

        try {
            const token = localStorage.getItem('token');
            const response = await api.put(`update-PBI-JK/${nopel}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Data accepted successfully:', response.data);
            setStatus("Diterima");

            const notifResponse = await api.post('/notifikasi', {
                user_nik: data.user_nik,
                no_lay: data.no_lay,
                layanan: "PBI-JK",
                type_message: 3
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Notification created successfully:', notifResponse.data);

            Swal.fire({
                title: "Good job!",
                text: "Status Pengajuan Menjadi Diterima",
                icon: "success"
            });
        } catch (error) {
            console.error('Error accepting data:', error);
        }
    };

    const showAlertInvalid = () => {
        Swal.fire({
            title: "Apakah Anda yakin pengajuan ini berkasnya tidak valid?",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Iya",
            icon: 'question',
            confirmButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                handleInvalid(2);
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };

    const showAlertReject = () => {
        Swal.fire({
            title: "Apakah Anda yakin pengajuan ini ditolak?",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Iya",
            icon: 'question',
            confirmButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                handleInvalid(4);
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };

    const showAlertValid = () => {
        Swal.fire({
            title: "Apakah Anda yakin pengajuan ini berkasnya sudah valid?",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Iya",
            icon: 'question',
            // confirmButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                handleValid();
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };

    const showAlertAccept = () => {
        Swal.fire({
            title: "Apakah Anda yakin pengajuan ini berkasnya sudah valid?",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Iya",
            icon: 'question',
            // confirmButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                handleAccept();
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };

    return (
        <>
            <h6 className="mt-4">Data Pemohon</h6>
            <InputFieldLog 
                label="NIK"
                name="NIK"
                placeholder="NIK"
                value={data && data.user ? data.user.nik : ''}
                disabled
            />
            <InputFieldLog 
                label="Nama Lengkap"
                col="col-lg-6"
                placeholder="Nama Lengkap"
                value={data && data.user ? data.user.full_name : ''}
                disabled
            />
            <TextAreaLog
                label="Alamat"
                col="col-lg-6"
                placeholder="Alamat"
                value={data && data.user ? data.user.alamat : ''}
                disabled
            />
            <InputFieldLog 
                label="Kecamatan"
                col="col-lg-6"
                placeholder="Kecamatan"
                value={data && data.user ? data.user.kecamatan : ''}
                disabled
            />
            <InputFieldLog 
                label="Kelurahan"
                name="kelurahan"
                col="col-lg-6"
                placeholder="Kelurahan"
                value={data && data.user ? data.user.kelurahan : ''}
                disabled
            />
            <InputFieldLog 
                label="RT"
                name="rt"
                col="col-lg-6"
                placeholder="RT"
                value={data && data.user ? data.user.rt : ''}
                disabled
            />
            <InputFieldLog 
                label="Email"
                name="email"
                col="col-lg-6"
                placeholder="Email"
                value={data && data.user ? data.user.email : ''}
                disabled
            />
            <InputFieldLog 
                label="No. Telepon"
                col="col-lg-6"
                placeholder="No. Telepon"
                value={data && data.user ? data.user.no_telp : ''}
                disabled
            />
            <h6 className="mt-4">Berkas Pemohon</h6>
            <InputFieldLog 
                label="No. Pelayanan"
                col="col-lg-6"
                placeholder="No. Pelayanan"
                value={data ? data.no_lay : ''}
                disabled
            />
            <InputFieldLog 
                label="Status"
                col="col-lg-6"
                placeholder="Status"
                value={status}
                disabled
            />
            <InputFieldLog 
                label="Tanggal Submit"
                col="col-lg-6"
                placeholder="Tanggal Submit"
                value={data ? new Date(data.submit_at).toLocaleDateString() : ''}
                disabled
            />
            <div className="col-lg-6"></div>
            <InputFile
                label="KTP"
                name="ktp"
                showDownloadButton
                id={data && data.id ? data.id : ''}
                table={layanan}
                onChange={handleFileChange}
                disabled={role === 3 || status !== "Menunggu Validasi"}
            />
            <InputFile
                label="Surat Keterangan Rawat Inap"
                name="suket_rawat_inap"
                showDownloadButton
                id={data && data.id ? data.id : ''}
                table={layanan}
                onChange={handleFileChange}
                disabled={role === 3 || status !== "Menunggu Validasi"}
            />
            {((role === 3 && (status === "Ditolak" || status === "Berkas Tidak Valid" || status === "Diterima")) || (role === 1 && (status === "Menunggu Validasi" || status === "Ditolak" || status === "Berkas Tidak Valid" || status === "Berkas Diproses" || status === "Diterima"))) && (
                <h6 className="mt-4">Respon</h6>
            )}
            {((role === 3 && (status === "Ditolak" || status === "Berkas Tidak Valid")) || (role === 1 && (status === "Menunggu Validasi" || status === "Ditolak" || status === "Berkas Tidak Valid" || status === "Berkas Diproses"))) && (
                <TextAreaLog
                    label="Alasan"
                    name="reason"
                    col="col-lg-6"
                    placeholder="Masukkan Alasan"
                    value={reason || reasonFromDB}
                    onChange={(e) => setReason(e.target.value)}
                    disabled={role === 3}
                />
            )}
            {((role === 3 && status === "Diterima") || (role === 1 && (status === "Berkas Diproses" || status === "Diterima"))) && (
                <InputFile
                    label="Produk Layanan"
                    name="product"
                    id={data && data.id ? data.id : ''}
                    table={layanan}
                    onChange={handleFileChange}
                    showDownloadButton={status === "Diterima"}
                    disabled={role === 3}
                />
            )}
            {role !== 3 && (
                <div className="text-end mt-3">
                    {status === "Menunggu Validasi" && (
                        <>
                            <div className="btn btn-danger me-2" style={{ fontSize: '.9rem' }} onClick={showAlertInvalid}>Tidak Valid</div>
                            <div className="btn btn-success me-2" style={{ fontSize: '.9rem' }} onClick={showAlertValid}>Data Valid</div>
                            <div className="btn btn-primary" style={{ fontSize: '.9rem' }} onClick={handleUpdate}>Update</div>
                        </>
                    )}
                    {(status === "Ditolak" || status === "Berkas Tidak Valid" || status === "Diterima") && (
                        <>
                            <div className="btn btn-primary" style={{ fontSize: '.9rem' }} onClick={handleUpdate}>Update</div>
                        </>
                    )}
                    {status === "Berkas Diproses" && (
                        <>
                            <div className="btn btn-danger me-2" style={{ fontSize: '.9rem' }} onClick={showAlertReject}>Tolak</div>
                            <div className="btn btn-success" style={{ fontSize: '.9rem' }} onClick={showAlertAccept}>Terima</div>
                        </>
                    )}
                </div>
            )}
        </>
    );
}

export default DetailPBIJK;
