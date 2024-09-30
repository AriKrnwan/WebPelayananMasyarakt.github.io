// import { useNavigate } from "react-router-dom";
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
import * as XLSX from 'xlsx';
import Dropdown from 'react-bootstrap/Dropdown';
import html2canvas from "html2canvas";

function PengaduanAdminSide() {
    const { layananType } = useParams();
    // const navigate = useNavigate();
    const [showEntries, setShowEntries] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState([]);
    const [checkedItems, setCheckedItems] = useState({});
    const [downloadOption, setDownloadOption] = useState(null);

    const getRole = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user.role;
    };
    const role = getRole();

    const handleDownloadOption = (option, format) => {
        setDownloadOption(option);
        if (option === 'all') {
            if (format === 'pdf') {
                downloadPDF(filteredData); 
            } else if (format === 'excel') {
                downloadExcel(filteredData);
            }
        } else if (option === 'checked') {
            const filteredCheckedData = filteredData.filter(item => checkedItems[item.no_adu]);
            if (format === 'pdf') {
                downloadPDF(filteredCheckedData); 
            } else if (format === 'excel') {
                downloadExcel(filteredCheckedData); 
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error("No token found in localStorage");
                }
                const response = await api.get(`/all-lay-pengaduan-DSPM`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
    
                if (response.data.length === 0) {
                    console.log("No data received from the API");
                } else {
                    console.log("Data received from the API:", response.data);
                }
    
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

    const handleCheckboxChange = (event, item) => {
        const { name, checked } = event.target;
        setCheckedItems(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    const sortedData = [...data].sort((a, b) => b.id - a.id);

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

    // const handleView = (noLay) => {
    //     navigate(`/admin/pengaduan-DSPM/detail/${noLay}`);
    // };

    // const handleEdit = (noLay) => {
    //     navigate(`/admin/pengaduan-DSPM/edit/${noLay}`);
    // };

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

    // const downloadPDF = async (dataToDownload) => {
    //     const doc = new jsPDF({
    //         orientation: 'portrait',
    //         unit: 'mm',
    //         format: 'a4',
    //     });
    
    //     doc.setFontSize(11); // Set font size to 11 for all text outside the table
    //     doc.setFont("helvetica");
    
    //     // Add the HTML content as a header
    //     const headerHTML = `
    //     <html>
    //         <head>
    //             <style>
    //                 * {
    //                     font-family: Arial, Helvetica, sans-serif !important;
    //                     line-height: 1.2;
    //                 }
    //                 .kop {
    //                     text-align: center;
    //                     display: flex;
    //                     align-items: center;
    //                     justify-content: center;
    //                     padding-bottom: 20px;
    //                     width: 85%;
    //                     margin: 0px auto;
    //                     border-bottom: 3px solid black;
    //                 }
    //                 .kop img {
    //                     width: 160px;
    //                     height: 160px;
    //                 }
    //                 .alamat {
    //                     font-size: 12px;
    //                     margin-top: 10px;
    //                 }
    //             </style>
    //         </head>
    //         <body>
    //             <div class="kop">
    //                 <img src="../../src/assets/images/Logo Pemkot Bontang.svg" alt="Logo">
    //                 <div style="text-align: center; padding-left: 20px">
    //                     <h3>PEMERINTAH KOTA BONTANG</h3>
    //                     <h1 style="font-weight: 600; font-size: 2.3rem;">DINAS SOSIAL DAN PEMBERDAYAAN MASYARAKAT</h1>
    //                     <p style="font-size: 1.4rem;">Jl. Bessai Berinta Gedung Graha Taman Praja blok III Lt. 2 Kel. Bontang Lestari </p>
    //                     <p style="font-size: 1.4rem;">Laman: dspm.bontangkota.go.id, Pos-el: dspmbontang@gmail.com, Kode Pos 75325</p>
    //                 </div>
    //             </div>
    //         </body>
    //     </html>
    //     `;
    
    //     // Create a temporary div for the HTML content
    //     const tempDiv = document.createElement("div");
    //     tempDiv.innerHTML = headerHTML;
    //     document.body.appendChild(tempDiv);
    
    //     // Use html2canvas to capture the HTML content as an image
    //     const canvas = await html2canvas(tempDiv);
    //     const imgData = canvas.toDataURL("image/png");
    //     const imgProps = doc.getImageProperties(imgData);
    
    //     // Calculate the image dimensions
    //     const pdfWidth = doc.internal.pageSize.getWidth();
    //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    //     doc.addImage(imgData, "PNG", 0, 10, pdfWidth, pdfHeight);
    
    //     // Remove the temporary div
    //     document.body.removeChild(tempDiv);
    
    //     // Move to the position where the table should start
    //     doc.setFontSize(11);
    //     const startY = pdfHeight + 20; // Adjust startY if needed
    
    //     // Define table headers and body content
    //     const head = [['No', 'Tanggal Submit', 'NIK Pemohon', 'Nama Pemohon', 'Masalah', 'Harapan']];
    //     const body = dataToDownload.map((item, index) => [
    //         startIndex + index + 1,
    //         formatDate(item.submit_at),
    //         item.nik,
    //         item.nama,
    //         item.masalah,
    //         item.harapan,
    //     ]);
    
    //     doc.autoTable({
    //         head: head,
    //         body: body,
    //         startY: startY,
    //         styles: {
    //             fontSize: 10, // Set font size for table content
    //             fillColor: [255, 255, 255], // White background
    //             textColor: [0, 0, 0], // Black text color
    //             lineColor: [0, 0, 0], // Black border
    //             lineWidth: 0.1,
    //         },
    //         bodyStyles: {
    //             fillColor: [255, 255, 255], // Ensure all body rows have white background
    //         },
    //         headStyles: {
    //             fontSize: 10, // Set font size for table header
    //             fontStyle: 'bold', // Semibold header
    //             fillColor: [255, 255, 255], // White background
    //             textColor: [0, 0, 0], // Black text color
    //             lineColor: [0, 0, 0], // Black border
    //             lineWidth: 0.1,
    //         },
    //     });
    
    //     const tableHeight = doc.lastAutoTable.finalY + 20;
    
    //     // Add signature
    //     doc.text("Kepala Dinas", 128, tableHeight + 15);
    //     doc.text("drg. Toetoek Pribadi Ekowati, M. Kes", 128, tableHeight + 45);
    //     doc.text("NIP. 122112141412", 128, tableHeight + 50);
    
    //     // Use the same file name as downloadPDFOld
    //     const fileName = "pengaduan_dspm.pdf";
    //     doc.save(fileName);
    // };    

    const downloadExcel = (dataToDownload) => {
        const worksheetData = dataToDownload.map((item, index) => ({
            No: startIndex + index + 1,
            'No. Pelayanan': item.no_adu,
            'Tanggal Pengajuan': formatDate(item.submit_at),
            'NIK Pemohon': item.nik.toString(), // Convert NIK to string
            'Nama Pemohon': item.nama,
            'Masalah': item.masalah,
            'Harapan': item.harapan,
            'Jawaban': item.jawaban
        }));
    
        const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    
        // Set NIK column to text format
        const nikColumnIndex = worksheetData.length > 0 ? Object.keys(worksheetData[0]).indexOf('NIK Pemohon') + 1 : -1;
        if (nikColumnIndex > -1) {
            const range = XLSX.utils.decode_range(worksheet['!ref']);
            for (let row = range.s.r + 1; row <= range.e.r; ++row) {
                const cell = worksheet[XLSX.utils.encode_cell({ r: row, c: nikColumnIndex })];
                if (cell) {
                    cell.z = '@';
                    cell.t = 's';
                }
            }
        }
    
        // Set column widths
        const colWidths = [
            { wpx: 50 },  // No
            { wpx: 120 }, // No. Pelayanan
            { wpx: 100 }, // Tanggal Pengajuan
            { wpx: 180 }, // NIK Pemohon
            { wpx: 150 }, // Nama Pemohon
            { wpx: 200 }, // Masalah
            { wpx: 200 }, // Harapan
            { wpx: 200 }  // Jawaban
        ];
        worksheet['!cols'] = colWidths;
    
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Pengaduan DSPM");
    
        // Use the same file name as in downloadExcelOld
        XLSX.writeFile(workbook, "pengaduan_dspm.xlsx");
    };
    

    return (
        <>
            <div style={{ backgroundColor: '#f5f5f5' }}>
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
                                    {role !== 3 && (
                                        <div className="d-flex gap-2">
                                            <NavLink to={`/admin/pengaduan-DSPM/tambah-data`}>
                                                <div className="btn btn-success" style={{ fontSize: '.85rem' }}>
                                                    Tambah Data
                                                </div>
                                            </NavLink>
                                        </div>
                                    )}
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
                                    <div className="d-flex align-items-center gap-2">
                                        {/* <div>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ fontSize: '.8rem' }}>
                                                    PDF
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => handleDownloadOption('all', 'pdf')} style={{ fontSize: '.85rem' }}>Download Semua Data</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleDownloadOption('checked', 'pdf')} style={{ fontSize: '.85rem' }}>Download Data yg Dicheck</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div> */}
                                        <div>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ fontSize: '.8rem' }}>
                                                    Excel
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => handleDownloadOption('all', 'excel')} style={{ fontSize: '.85rem' }}>Download Semua Data</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleDownloadOption('checked', 'excel')} style={{ fontSize: '.85rem' }}>Download Data yg Dicheck</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                        <div className="search-bar">
                                            <Form.Control 
                                                type="text"
                                                style={{ fontSize: '.8rem', width: '180px' }}
                                                value={searchTerm}
                                                onChange={handleSearchChange}
                                                placeholder="Search..."
                                            ></Form.Control>
                                        </div>
                                    </div>
                                </div>
                                <div className="col fixed-table-container">
                                    <Table striped bordered hover className="fixed-table">
                                        <thead>
                                            <tr>
                                                <th className='text-center col-cek'></th>
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
                                                    <td className='text-center col-no'>
                                                        <input 
                                                            type="checkbox" 
                                                            name={item.no_adu} 
                                                            id={item.no_adu} 
                                                            checked={checkedItems[item.no_adu] || false} 
                                                            onChange={(e) => handleCheckboxChange(e, item)} 
                                                        />
                                                    </td>
                                                    <td className='text-center col-no'>{startIndex + index + 1}</td>
                                                    <td className="col-nopel">{item.no_adu}</td>
                                                    <td className="col-tanggal">{formatDate(item.submit_at)}</td>
                                                    <td className="col-nik">{item.nik}</td>
                                                    <td className="col-nama">{item.nama}</td>
                                                    <td className='col-status'>
                                                        {item.jawaban === null ? 'Belum Dijawab' : 'Dijawab'}
                                                    </td>
                                                    <td className="col-aksi">
                                                        {role !== 3 && (
                                                            <>
                                                                {item.jawaban !== null && (
                                                                    <NavLink to={`/admin/pengaduan-DSPM/detail/${item.no_adu}`} className="btn btn-primary lh-1 p-1 me-1">
                                                                        <IoEyeSharp size={'18px'} />
                                                                    </NavLink>
                                                                )}
                                                                {item.jawaban === null && (
                                                                    <NavLink to={`/admin/pengaduan-DSPM/edit/${item.no_adu}`} className="btn btn-primary lh-1 p-1 me-1">
                                                                        <RiPencilFill size={'18px'} />
                                                                    </NavLink>
                                                                )}
                                                                <NavLink className="btn btn-danger lh-1 p-1 me-1" onClick={() => showAlertHapus(item.no_adu)}>
                                                                    <IoMdTrash size={'18px'} />
                                                                </NavLink>
                                                            </>
                                                        )}
                                                        {role !== 1 && (
                                                            <NavLink to={`/kadis/pengaduan-DSPM/detail/${item.no_adu}`} className="btn btn-primary lh-1 p-1 me-1">
                                                                <IoEyeSharp size={'18px'} />
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
