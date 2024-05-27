import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoEyeSharp } from "react-icons/io5";
import { RiPencilFill } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
import Modal from 'react-bootstrap/Modal'; // Import modal component
import Button from 'react-bootstrap/Button'; // Import button component
import { useNavigate } from 'react-router';
import api from '../api';

function TableLayanan({ data, layanan }) {
    const [showEntries, setShowEntries] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPengajuanNoLay, setSelectedPengajuanNoLay] = useState(null); // State untuk menyimpan id pengajuan yang akan dihapus
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false); // State untuk mengontrol tampilan modal konfirmasi
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentPage(1);
    }, [showEntries]);

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

    const handleEditPengajuan = async (item) => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.get(`/lay-${layanan}/${item.nopel}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Data pengajuan yang berhasil diambil:', response.data);

            localStorage.setItem('selectedPengajuan', JSON.stringify(response.data));
            navigate(`/${layanan}/edit-pengajuan/${item.nopel}`);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Unauthorized: Please log in first.');
            } else {
                console.error('Error fetching data:', error);
            }
        }
    };

    const handleDetailPengajuan = async (item) => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.get(`/lay-${layanan}/${item.nopel}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Data pengajuan yang berhasil diambil:', response.data);

            localStorage.setItem('selectedPengajuan', JSON.stringify(response.data));
            navigate(`/${layanan}/detail-pengajuan/${item.nopel}`);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Unauthorized: Please log in first.');
            } else {
                console.error('Error fetching data:', error);
            }
        }
    };

    const handleDeleteConfirmation = (noLay) => {
        setSelectedPengajuanNoLay(noLay); // Set id pengajuan yang akan dihapus
        setShowDeleteConfirmationModal(true); // Tampilkan modal konfirmasi
    };

    const handleDeletePengajuan = async () => {
        try {
            const token = localStorage.getItem('token');
            await api.delete(`/delete-${layanan}/${selectedPengajuanNoLay}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Refresh data setelah penghapusan berhasil
            // Anda mungkin ingin mengimplementasikan logika ini sesuai dengan kebutuhan Anda
            window.location.reload();
        } catch (error) {
            console.error('Error deleting pengajuan:', error);
        }
    };

    const handleCloseDeleteConfirmationModal = () => {
        setSelectedPengajuanNoLay(null); // Reset id pengajuan yang akan dihapus
        setShowDeleteConfirmationModal(false); // Tutup modal konfirmasi
    };

    const startIndex = (currentPage - 1) * showEntries;
    const endIndex = startIndex + showEntries;

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    const sortedData = [...data].sort((a, b) => {
        const dateComparison = b.nopel.substr(2, 8) - a.nopel.substr(2, 8);
        if (dateComparison !== 0) {
            return dateComparison;
        }
        return parseInt(b.nopel.substr(10)) - parseInt(a.nopel.substr(10));
    });

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

    return (
        <>
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
                                <th className='text-center col-no'>No</th>
                                <th className="col-nopel">No. Pelayanan</th>
                                <th className="col-tanggal">Tanggal</th>
                                <th className="col-status">Status</th>
                                <th className="col-aksi">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.slice(startIndex, endIndex).map((item, index) => (
                                <tr key={index}>
                                    <td className='text-center col-no'>{startIndex + index + 1}</td>
                                    <td className="col-nopel">{item.nopel}</td>
                                    <td className="col-tanggal">{formatDate(item.tanggal)}</td>
                                    <td className='col-status' >
                                        <span className={`p-1 rounded ubuntu-sans-medium ${getStatusClass(item.status)}`} style={{fontSize: '.7rem'}}>
                                            {item.status} 
                                        </span>
                                    </td>
                                    <td className="col-aksi">
                                        {item.status === 'Menunggu Validasi' && (
                                            <>
                                                <div className="btn btn-primary lh-1 p-1 me-1" onClick={() => handleEditPengajuan(item)}>
                                                    <RiPencilFill size={'18px'} />
                                                </div>
                                                <div className="btn btn-danger lh-1 p-1 me-1" onClick={() => handleDeleteConfirmation(item.nopel)}>
                                                    <IoMdTrash size={'18px'} />
                                                </div>
                                            </>
                                        )}
                                        {(item.status === 'Berkas Diproses' || item.status === 'Ditolak' || item.status === 'Berkas Tidak Valid') && (
                                            <div className="btn btn-primary lh-1 p-1 me-1" onClick={() => handleDetailPengajuan(item)}>
                                                <IoEyeSharp size={'18px'} />
                                            </div>
                                        )}
                                        {item.status === 'Diterima' && (
                                            <>
                                                <div className="btn btn-primary lh-1 p-1 me-1" onClick={() => handleDetailPengajuan(item)}>
                                                    <IoEyeSharp size={'18px'} />
                                                </div>
                                            </>
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
            <Modal show={showDeleteConfirmationModal} onHide={handleCloseDeleteConfirmationModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Konfirmasi Penghapusan</Modal.Title>
                </Modal.Header>
                <Modal.Body>Anda yakin ingin menghapus pengajuan ini?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteConfirmationModal}>
                        Batal
                    </Button>
                    <Button variant="danger" onClick={handleDeletePengajuan}>
                        Hapus
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

TableLayanan.propTypes = {
    data: PropTypes.array.isRequired,
    layanan: PropTypes.string.isRequired
};

export default TableLayanan;
