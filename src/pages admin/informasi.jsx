import { useNavigate } from "react-router-dom";
import { Form, Table } from "react-bootstrap";
import SidebarAdmin from "../components admin/sidebar";
import Topbar from "../components admin/topbar";
import { useState, useEffect } from 'react';
import { useParams, NavLink } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RiPencilFill } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
import Swal from "sweetalert2";
import '../components admin/admin.css';
import api from "../components/api";
import '../components admin/admin.css';

function InformasiAdminSide() {
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
                const response = await api.get(`/all-informasi`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setData(response.data);
                console.log(response.data);
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
        // Check if no_adu exists and is a valid string before calling substr
        const aNoAdu = a.no_adu && a.no_adu.length >= 10 ? a.no_adu : "";
        const bNoAdu = b.no_adu && b.no_adu.length >= 10 ? b.no_adu : "";

        const dateComparison = bNoAdu.substr(2, 8) - aNoAdu.substr(2, 8);
        if (dateComparison !== 0) {
            return dateComparison;
        }
        return parseInt(bNoAdu.substr(10)) - parseInt(aNoAdu.substr(10));
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

    const handleEdit = (id) => {
        navigate(`/admin/informasi/edit/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.delete(`/delete-informasi/${id}`, {
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
                setData(data.filter(item => item.no_adu !== id));
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

    const showAlertHapus = (id) => {
        Swal.fire({
            title: "Apakah Anda yakin untuk menghapus pengaduan ini?",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Iya",
            icon: 'question',
            confirmButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(id);
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
                        <div className="bg-white m-3 rounded border p-2">
                            <div className="row mx-auto py-3 overflow-hidden mx-auto">
                                <div className="d-flex mb-2 justify-content-between align-items-center">
                                    <div>
                                        <h5 className="ubuntu-sans-medium">
                                            Data Informasi
                                        </h5>
                                    </div>
                                    <NavLink to={`/admin/informasi/tambah-informasi`}>
                                        <div className="btn btn-success" style={{fontSize: '.85rem'}}>
                                            Tambah Data
                                        </div>
                                    </NavLink>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                    <div className="show-entries d-flex align-items-center gap-1 w-100">
                                        <span style={{ fontSize: '.8rem' }}>Show</span>
                                        <Form.Control
                                            className='custom-entries px-1 text-center'
                                            as="select"
                                            style={{ fontSize: '.8rem', width: '48px' }}
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
                                        <Form.Control 
                                            type="text"
                                            style={{ fontSize: '.8rem', width: '180px' }}
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                            placeholder="Search..."
                                        ></Form.Control>
                                    </div>
                                </div>
                                <div className="col fixed-table-container">
                                    <Table striped bordered hover className="fixed-table">
                                        <thead>
                                            <tr>
                                                <th className='text-center col-no'>No</th>
                                                <th className="col-noinfo">No. Informasi</th>
                                                <th className="col-tanggal">Tanggal Submit</th>
                                                <th className="col-judul">Judul</th>
                                                <th className="col-aksi">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredData.slice(startIndex, endIndex).map((item, index) => (
                                                <tr key={index}>
                                                    <td className='text-center col-no'>{startIndex + index + 1}</td>
                                                    <td className="col-noinfo">{item.id}</td>
                                                    <td className="col-tanggal">{formatDate(item.submit_at)}</td>
                                                    <td className="col-judul">{item.judul}</td>
                                                    <td className="col-aksi">
                                                        <div className="btn btn-primary lh-1 p-1 me-1" onClick={() => handleEdit(item.id)}>
                                                            <RiPencilFill size={'18px'} />
                                                        </div>
                                                        <div className="btn btn-danger lh-1 p-1 me-1" onClick={() => showAlertHapus(item.id)}>
                                                            <IoMdTrash size={'18px'} />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                                <div className="d-flex justify-content-between align-items-center" style={{ fontSize: '.8rem' }}>
                                    <span>Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries</span>
                                    <div className="pagination d-flex justify-content-end gap-1">
                                        <button className="btn btn-primary btn-sm px-1 py-0" onClick={handlePrevPage} disabled={currentPage === 1}>
                                            <IoIosArrowBack />
                                        </button>
                                        <button className="btn btn-primary btn-sm px-1 py-0" onClick={handleNextPage} disabled={endIndex >= filteredData.length}>
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

export default InformasiAdminSide;
