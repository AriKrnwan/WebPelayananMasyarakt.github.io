import { useNavigate } from "react-router-dom";
import { Form, Table } from "react-bootstrap";
import SidebarAdmin from "../components admin/sidebar";
import Topbar from "../components admin/topbar";
import { useState, useEffect } from 'react';
import { useParams, NavLink } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoEyeSharp } from "react-icons/io5";
import { RiPencilFill } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
import Swal from "sweetalert2";
import '../components admin/admin.css';
import api from "../components/api";
import jsPDF from "jspdf";
import "jspdf-autotable";

function PengaduanAdminSide() {
    const { layananType } = useParams();
    const navigate = useNavigate();
    const [showEntries, setShowEntries] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get(`/all-lay-pengaduan-DSPM`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [layananType]);

    useEffect(() => {
        setCurrentPage(1);
    }, [showEntries]);

    const handleShowEntriesChange = (event) => {
        setShowEntries(parseInt(event.target.value));
        setCurrentPage(1);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    const sortedData = [...data].sort((a, b) => {
        const dateComparison = b.no_adu.substr(2, 8) - a.no_adu.substr(2, 8);
        if (dateComparison !== 0) {
            return dateComparison;
        }
        return parseInt(b.no_adu.substr(10)) - parseInt(a.no_adu.substr(10));
    });

    const filteredData = sortedData.filter((item) => {
    return (
        (item.no_adu && item.no_adu.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.submit_at && item.submit_at.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.nik && item.nik.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.nama && item.nama.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    });

    const startIndex = (currentPage - 1) * showEntries;
    const endIndex = startIndex + showEntries;

    const handleView = (noLay) => {
        navigate(`/admin/pengaduan-DSPM/detail/${noLay}`);
    };

    const handleEdit = (noLay) => {
        navigate(`/admin/pengaduan-DSPM/edit/${noLay}`);
    };

    const handleDelete = async (noLay) => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.delete(`/delete-pengaduan/${noLay}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Data deleted successfully:', response.data);
            Swal.fire({
                title: "Deleted!",
                text: "Data berhasil dihapus",
                icon: "success"
            }).then(() => {
                setData(data.filter(item => item.no_adu !== noLay));
            });
        } catch (error) {
            console.error('Error deleting data:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Terjadi kesalahan saat menghapus data",
            });
        }
    };

    const showAlertHapus = (noLay) => {
        Swal.fire({
            title: "Apakah Anda yakin untuk menghapus pengaduan ini?",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Iya",
            icon: 'question',
            confirmButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(noLay);
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text("Pengaduan DSPM", 14, 10);
        doc.autoTable({
            head: [['No', 'No. Pelayanan', 'Tanggal Pengajuan', 'NIK Pemohon', 'Nama Pemohon', 'Masalah', 'Harapan', 'Jawaban']],
            body: filteredData.map((item, index) => [
                startIndex + index + 1,
                item.no_adu,
                formatDate(item.submit_at),
                item.nik,
                item.nama,
                item.masalah,
                item.harapan,
                item.jawaban,
            ]),
            startY: 20,
        });
        doc.save("pengaduan_dspm.pdf");
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
                        <div className="bg-white m-3 rounded border p-2">
                            <div className="row mx-auto py-3 overflow-hidden mx-auto">
                                <div className="d-flex mb-2 justify-content-between align-items-center">
                                    <div>
                                        <h5 className="ubuntu-sans-medium">
                                            Pengaduan DSPM
                                        </h5>
                                    </div>
                                    <div className="d-flex gap-2">
                                        <NavLink to={`/admin/pengaduan-DSPM/tambah-data`}>
                                            <div className="btn btn-success" style={{fontSize: '.85rem'}}>
                                                Tambah Data
                                            </div>
                                        </NavLink>
                                        <div className="btn btn-secondary" style={{fontSize: '.85rem'}} onClick={downloadPDF}>
                                            Download PDF
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="show-entries d-flex align-items-center gap-1 mb-2 w-100">
                                        <span style={{ fontSize: '.8rem' }}>Show</span>
                                        <Form.Control
                                            className='custom-entries px-1 text-center'
                                            as="select"
                                            style={{ fontSize: '.8rem', width: '10%' }}
                                            value={showEntries}
                                            onChange={handleShowEntriesChange}
                                        >
                                            <option value={10}>10</option>
                                            <option value={25}>25</option>
                                            <option value={50}>50</option>
                                            <option value={100}>100</option>
                                        </Form.Control>
                                        <span style={{ fontSize: '.8rem' }}>entries</span>
                                    </div>
                                    <div className="search-bar w-100 d-flex align-items-center justify-content-end gap-2">
                                        <span style={{ fontSize: '.8rem' }}>Search: </span>
                                        <Form.Control 
                                            type="text"
                                            style={{ fontSize: '.8rem', width: '36%' }}
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                        ></Form.Control>
                                    </div>
                                </div>
                                <div className="col fixed-table-container">
                                    <Table striped bordered hover className="fixed-table">
                                        <thead>
                                            <tr>
                                                <th className='text-center col-no'>No</th>
                                                <th className="col-nopel">No. Pelayanan</th>
                                                <th className="col-tanggal">Tanggal Pengajuan</th>
                                                <th className="col-nik">NIK Pemohon</th>
                                                <th className="col-nama">Nama Pemohon</th>
                                                <th className="col-status">Status</th>
                                                <th className="col-aksi">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredData.slice(startIndex, endIndex).map((item, index) => (
                                                <tr key={index}>
                                                    <td className='text-center col-no'>{startIndex + index + 1}</td>
                                                    <td className="col-nopel">{item.no_adu}</td>
                                                    <td className="col-tanggal">{formatDate(item.submit_at)}</td>
                                                    <td className="col-nik">{item.nik}</td>
                                                    <td className="col-nama">{item.nama}</td>
                                                    <td className='col-status'>
                                                        {item.jawaban === null ? 'Belum Dijawab' : 'Dijawab'}
                                                    </td>
                                                    <td className="col-aksi">
                                                        {item.jawaban !== null && (
                                                            <div className="btn btn-primary lh-1 p-1 me-1" onClick={() => handleView(item.no_adu)}>
                                                                <IoEyeSharp size={'18px'} />
                                                            </div>
                                                        )}
                                                        {item.jawaban === null && (
                                                            <div className="btn btn-primary lh-1 p-1 me-1" onClick={() => handleEdit(item.no_adu)}>
                                                                <RiPencilFill size={'18px'} />
                                                            </div>
                                                        )}
                                                        <div className="btn btn-danger lh-1 p-1 me-1" onClick={() => showAlertHapus(item.no_adu)}>
                                                            <IoMdTrash size={'18px'} />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mt-2">
                                    <div className="showing-entries" style={{ fontSize: '.85rem' }}>
                                        Showing {Math.min(startIndex + 1, filteredData.length)} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
                                    </div>
                                    <div className="pagination d-flex gap-2">
                                        <button className="btn btn-primary" onClick={handlePrevPage} disabled={currentPage === 1} style={{ fontSize: '.85rem' }}>
                                            <IoIosArrowBack />
                                        </button>
                                        <button className="btn btn-primary" onClick={handleNextPage} disabled={endIndex >= filteredData.length} style={{ fontSize: '.85rem' }}>
                                            <IoIosArrowForward />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PengaduanAdminSide;
