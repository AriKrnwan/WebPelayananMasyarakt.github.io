import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InputFieldLog from "../../components/Input Field/inputFieldLog";
import InputFile from "../../components/Input Field/inputFile";
import TextAreaLog from "../../components/Input Field/textAreaLog";
import Swal from "sweetalert2";
import api from "../../components/api";
import Topbar from "../../components admin/topbar";
import SidebarAdmin from "../../components admin/sidebar";

function DetailPengaduan() {
    const { no_adu } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [status, setStatus] = useState("Tidak Diketahui");
    const [masalah, setMasalah] = useState('');
    const [harapan, setHarapan] = useState('');
    const [fotoFile, setFotoFile] = useState(null);
    const [jawaban, setJawaban] = useState('');
    const [jawabanFormDB, setJawabanFromDB] = useState('');
    const layanan = 'pengaduan';

    const getRole = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user.role;
    };
    const role = getRole();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get(`/lay-pengaduan/${no_adu}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setData(response.data);
                setStatus(calculateStatus(response.data));
                setMasalah(response.data.masalah || '');
                setHarapan(response.data.harapan || '');
                setJawabanFromDB(response.data.jawaban || '');
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [no_adu]);

    const calculateStatus = (selectedData) => {
        if (selectedData) {
            return selectedData.jawaban ? "Dijawab" : "Belum Dijawab";
        }
        return "Tidak Diketahui";
    };

    const handleUpdate = async () => {
        if (jawaban.trim() === "" && jawabanFormDB) {
            alert("Field Alasan harus diisi untuk memperbarui data alasan.");
            return;
        }

        let formData = new FormData();
        formData.append('masalah', masalah);
        formData.append('harapan', harapan);
        formData.append('id', data.id);
        if (fotoFile) formData.append('foto', fotoFile);

        // Jika ada alasan baru yang diinputkan, tambahkan ke FormData
        if (jawaban.trim() !== "") {
            formData.append('jawaban', jawaban.trim());
        } else if (jawabanFormDB) {
            // Jika tidak, tambahkan alasan dari database
            formData.append('jawaban', jawabanFormDB);
        } else {
            // Jika tidak ada alasan yang baru dan tidak ada alasan di database, beri nilai kosong
            formData.append('jawaban', '');
        }

        try {
            const token = localStorage.getItem('token');
            const response = await api.put(`update-pengaduan/${no_adu}`, formData, {
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

    const handleJawab = async () => {
        if (jawaban.trim() === "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Field Alasan harus kosong sebelum validasi data.",
            });
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await api.put(`update-pengaduan/${no_adu}`, {
                jawaban: jawaban.trim()
            },{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Data validated successfully:', response.data);
            setStatus("Berkas Diproses");
            Swal.fire({
                title: "Good job!",
                text: "Status Pengajuan Menjadi Berkas Diproses",
                icon: "success"
            });
        } catch (error) {
            console.error('Error validating data:', error);
        }
    };

    const handleHapus = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.delete(`/delete-pengaduan/${no_adu}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Data deleted successfully:', response.data);
            Swal.fire({
                title: "Deleted!",
                text: "Data berhasil dihapus",
                icon: "success"
            })
            navigate('/admin/pengaduan-DSPM');
        } catch (error) {
            console.error('Error deleting data:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Terjadi kesalahan saat menghapus data",
            });
        }
    };

    const showAlertHapus = () => {
        Swal.fire({
            title: "Apakah Anda yakin untuk menghapus pengaduan ini?",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Iya",
            icon: 'question',
            confirmButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                handleHapus();
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };

    const showAlertJawab = () => {
        Swal.fire({
            title: "Apakah Anda yakin menjawab pengaduan ini?",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Iya",
            icon: 'question',
        }).then((result) => {
            if (result.isConfirmed) {
                handleJawab();
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };

    return (
        <>
            <div style={{backgroundColor: '#f5f5f5'}}>
                <div className="row m-0">
                    <div className="col-2 p-0">
                        <SidebarAdmin />
                    </div>
                    <div className="col-10 p-0 main-content min-vh-100">
                        <Topbar />
                        <div className="bg-white m-3 rounded border p-4">
                            <div>
                                <h5 className="ubuntu-sans-medium">
                                    Tambah Data Layanan
                                </h5>
                            </div>
                            <div className="row">
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
                                    label="No. Pengaduan"
                                    col="col-lg-6"
                                    placeholder="No. Pengaduan"
                                    value={data ? data.no_adu : ''}
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
                                <TextAreaLog
                                    label="Masalah"
                                    name="masalah"
                                    col="col-lg-6"
                                    placeholder="Masukkan Masalah"
                                    value={masalah}
                                    onChange={(e) => setMasalah(e.target.value)}
                                    disabled={role === 3 || status !== "Belum Dijawab"}
                                />
                                <TextAreaLog
                                    label="Harapan"
                                    name="harapan"
                                    col="col-lg-6"
                                    placeholder="Masukkan Harapan"
                                    value={harapan}
                                    onChange={(e) => setHarapan(e.target.value)}
                                    disabled={role === 3 || status !== "Belum Dijawab"}
                                />
                                <InputFile
                                    label="Foto"
                                    name="foto"
                                    showDownloadButton
                                    id={data && data.id ? data.id : ''}
                                    table={layanan}
                                    onChange={(e) => setFotoFile(e.target.files[0])}
                                    disabled={role === 3 || status !== "Belum Dijawab"}
                                />
                                {((role === 3 && status === "Dijawab") || (role === 1)) && (
                                    <h6 className="mt-4">Respon</h6>
                                )}
                                {((role === 3 && status === "Dijawab") || (role === 1)) && (
                                    <TextAreaLog
                                        label="Jawaban"
                                        name="jawaban"
                                        col="col-lg-6"
                                        placeholder="Masukkan Jawaban"
                                        value={jawaban || jawabanFormDB}
                                        onChange={(e) => setJawaban(e.target.value)}
                                        disabled={role === 3}
                                    />
                                )}
                                {role !== 3 && (
                                    <div className="text-end mt-3">
                                        <div className="btn btn-danger me-2" style={{ fontSize: '.9rem' }} onClick={showAlertHapus}>Hapus Data</div>
                                        {status === "Belum Dijawab" && (
                                            <div className="btn btn-success me-2" style={{ fontSize: '.9rem' }} onClick={showAlertJawab}>Jawab</div>
                                        )}
                                        <div className="btn btn-primary" style={{ fontSize: '.9rem' }} onClick={handleUpdate}>Update</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default DetailPengaduan;
