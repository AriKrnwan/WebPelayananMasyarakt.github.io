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
import '../components admin/admin.css';
import api from "../components/api";

function LayAdminSide() {
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
                const response = await api.get(`/all-lay-${layananType}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // const response = await api.get(`/all-lay-${layananType}`);
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

    const calculateStatus = (item) => {
        const { submit_at, valid_at, reject_at, accept_at } = item;
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
        return "Tidak Diketahui";
    };

    const sortedData = [...data].sort((a, b) => {
        const dateComparison = b.no_lay.substr(2, 8) - a.no_lay.substr(2, 8);
        if (dateComparison !== 0) {
            return dateComparison;
        }
        return parseInt(b.no_lay.substr(10)) - parseInt(a.no_lay.substr(10));
    });

    const filteredData = sortedData.filter((item) => {
    return (
        (item.no_lay && item.no_lay.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.submit_at && item.submit_at.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.nik && item.nik.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.nama && item.nama.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    });


    const startIndex = (currentPage - 1) * showEntries;
    const endIndex = startIndex + showEntries;

    const getStatusClass = (status) => {
        switch (status) {
            case 'Menunggu Validasi':
            case 'Berkas Diproses':
                return 'bg-primary text-white';
            case 'Diterima':
                return 'bg-success text-white';
            case 'Berkas Tidak Valid':
            case 'Ditolak':
                return 'bg-danger text-white';
            default:
                return '';
        }
    };

    const handleView = (noLay) => {
        navigate(`/admin/layanan/${layananType}/detail/${noLay}`);
    };

    const handleEdit = (noLay) => {
        navigate(`/admin/layanan/${layananType}/edit/${noLay}`);
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
                                            Layanan {layananType.replace(/-/g, ' ')}
                                        </h5>
                                    </div>
                                    <NavLink to={`/admin/layanan/${layananType}/tambah-data`}>
                                        <div className="btn btn-success" style={{fontSize: '.85rem'}}>
                                            Tambah Data
                                        </div>
                                    </NavLink>
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
                                                    <td className="col-nopel">{item.no_lay}</td>
                                                    <td className="col-tanggal">{formatDate(item.submit_at)}</td>
                                                    <td className="col-nik">{item.nik}</td>
                                                    <td className="col-nama">{item.nama}</td>
                                                    <td className='col-status'>
                                                        <span className={`p-1 rounded ubuntu-sans-medium ${getStatusClass(calculateStatus(item))}`} style={{ fontSize: '.7rem' }}>
                                                            {calculateStatus(item)}
                                                        </span>
                                                    </td>
                                                    <td className="col-aksi">
                                                        {calculateStatus(item) === 'Menunggu Validasi' && (
                                                            <>
                                                                <div className="btn btn-primary lh-1 p-1 me-1" onClick={() => handleEdit(item.no_lay)}>
                                                                    <RiPencilFill size={'18px'} />
                                                                </div>
                                                                <div className="btn btn-danger lh-1 p-1 me-1">
                                                                    <IoMdTrash size={'18px'} />
                                                                </div>
                                                            </>
                                                        )}
                                                        {(calculateStatus(item) === 'Berkas Diproses' || calculateStatus(item) === 'Ditolak' || calculateStatus(item) === 'Berkas Tidak Valid') && (
                                                            <div className="btn btn-primary lh-1 p-1 me-1" onClick={() => handleView(item.no_lay)}>
                                                                <IoEyeSharp size={'18px'} />
                                                            </div>
                                                        )}
                                                        {calculateStatus(item) === 'Diterima' && (
                                                            <div className="btn btn-primary lh-1 p-1 me-1" onClick={() => handleView(item.no_lay)}>
                                                                <IoEyeSharp size={'18px'} />
                                                            </div>
                                                        )}
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

export default LayAdminSide;