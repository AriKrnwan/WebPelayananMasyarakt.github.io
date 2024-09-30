import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import '../Table Layanan/table.css';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { RiPencilFill } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
import api from '../api';
import Swal from 'sweetalert2';

function TablePengaduan() {
    const [showEntries, setShowEntries] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);

    const handleShowEntriesChange = (event) => {
        setShowEntries(parseInt(event.target.value));
        setCurrentPage(1);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString('id-ID'); // Ubah ke format tanggal yang diinginkan, sesuaikan dengan locale yang diinginkan
    };

    const startIndex = (currentPage - 1) * showEntries;
    const endIndex = startIndex + showEntries;

    useEffect(() => {
        console.log('Fetching data...');
        const fetchData = async () => {
            try {
                const userData = JSON.parse(localStorage.getItem('user'));
                console.log(userData)
                const token = localStorage.getItem('token');

                if (!userData || !userData.NIK || !token) {
                    console.error('Invalid user data or token.');
                    return;
                }

                const response = await api.get('/lay-pengaduan', {
                    params: { user_nik: userData.NIK },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setData(response.data);
                console.log('Data yang berhasil diambil:', response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (no_adu) => {
        Swal.fire({
            title: "Apakah Anda yakin untuk menghapus pengaduan ini?",
            text: "Anda tidak akan dapat mengembalikan ini!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, hapus!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = localStorage.getItem('token');
                    await api.delete(`/delete-pengaduan/${no_adu}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    // Update data setelah penghapusan berhasil
                    setData(data.filter(item => item.no_adu !== no_adu));

                    Swal.fire(
                        "Dihapus!",
                        "Pengaduan telah dihapus.",
                        "success"
                    );
                } catch (error) {
                    console.error('Error deleting data:', error);
                    Swal.fire(
                        "Error!",
                        "Terjadi kesalahan saat menghapus data.",
                        "error"
                    );
                }
            }
        });
    };

    return (
        <div className="row mx-auto py-3 overflow-hidden mx-auto">
            <div className="show-entries d-flex align-items-center gap-1 mb-2">
                <span style={{ fontSize: '.8rem' }}>Show</span>
                <Form.Control
                    className='custom-entries px-1 text-center'
                    as="select"
                    style={{ fontSize: '.8rem', width: '6%' }}
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
            <div className="col fixed-table-container">
                <Table striped bordered hover className="fixed-table">
                    <thead>
                        <tr>
                            <th className='text-center col-no' >No</th>
                            <th className="col-nopel" style={{width: '160px'}}>No. Pelayanan</th>
                            <th className="col-tanggal" style={{width: '120px'}}>Tanggal</th>
                            <th className="col-tanggal"style={{width: '200px'}}>Masalah</th>
                            <th className="col-tanggal"style={{width: '200px'}}>Harapan</th>
                            <th className="col-status" style={{width: '120px'}}>Status</th>
                            <th className="col-aksi" style={{width: '90px'}}>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.slice(startIndex, endIndex).map((item, index) => (
                            <tr key={index}>
                                <td className='text-center col-no'>{startIndex + index + 1}</td>
                                <td className="col-nopel">{item.no_adu}</td>
                                <td className="col-tanggal">{formatDate(item.submit_at)}</td>
                                <td className="col-tanggal">{item.masalah}</td>
                                <td className="col-tanggal">{item.harapan}</td>
                                <td className="col-status">
                                    {item.jawaban === null ? 'Belum Dijawab' : 'Dijawab'}
                                </td>
                                <td className="col-aksi">
                                    {item.jawaban === null && (
                                        <>
                                            <NavLink to={`/pengaduan-DSPM/edit-pengaduan/${item.no_adu}`}>
                                                <div className="btn btn-primary lh-1 p-1 me-1">
                                                    <RiPencilFill size={'18px'} />
                                                </div>
                                            </NavLink>
                                            <div className="btn btn-danger lh-1 p-1 me-1" onClick={() => handleDelete(item.no_adu)}>
                                                <IoMdTrash size={'18px'} />
                                            </div>
                                        </>
                                    )}
                                    {item.jawaban !== null && (
                                        <NavLink to={`/pengaduan-DSPM/detail-pengaduan/${item.no_adu}`}>
                                            <div className="btn btn-primary lh-1 p-1 me-1">
                                                <IoEyeSharp size={'18px'} />
                                            </div>
                                        </NavLink>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-2">
                <div className="showing-entries" style={{ fontSize: '.85rem' }}>
                    Showing {Math.min(startIndex + 1, data.length)} to {Math.min(endIndex, data.length)} of {data.length} entries
                </div>
                <div className="pagination d-flex gap-2">
                    <button className="btn btn-primary" onClick={handlePrevPage} disabled={currentPage === 1} style={{ fontSize: '.85rem' }}>
                        <IoIosArrowBack />
                    </button>
                    <button className="btn btn-primary" onClick={handleNextPage} disabled={endIndex >= data.length} style={{ fontSize: '.85rem' }}>
                        <IoIosArrowForward />
                    </button>
                </div>
            </div>
        </div>
    );
}

TablePengaduan.propTypes = {
    data: PropTypes.array.isRequired,
    layanan: PropTypes.string.isRequired
};

export default TablePengaduan;
