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
import '../components admin/admin.css';
import api from "../components/api";
import Swal from "sweetalert2";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from 'xlsx';
// import { setTableStyles } from 'sheetjs-style';
// import XLSX from 'xlsx-style';
// import { BsFiletypeXlsx, BsFiletypePdf } from "react-icons/bs";
// import * as XLSX from 'xlsx';

import Dropdown from 'react-bootstrap/Dropdown';

function LayAdminSide() {
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
    // const rolePrefix = role === 1 ? '/admin' : role === 3 ? '/kadis' : '';

    const handleDownloadOption = (option, format) => {
        setDownloadOption(option);
        if (option === 'all') {
            if (format === 'pdf') {
                downloadPDF(filteredData); 
            } else if (format === 'excel') {
                downloadExcel(filteredData);
            }
        } else if (option === 'checked') {
            const filteredCheckedData = filteredData.filter(item => checkedItems[item.no_lay]);
            if (format === 'pdf') {
                downloadPDF(filteredCheckedData); 
            } else if (format === 'excel') {
                downloadExcel(filteredCheckedData); 
            }
        }
    };

    const handleCheckboxChange = (event, item) => {
        const { name, checked } = event.target;
        setCheckedItems(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    const getLayananName = (layananType) => {
        const layananNames = {
            'bantuan-logistik': 'Layanan Bantuan Logistik Korban Bencana',
            'santunan-kematian': 'Layanan Pemberian Santunan Kematian',
            'SKT': 'Layanan Surat Keterangan Terdaftar (SKT)',
            'SIO': 'Layanan Surat Izin Operasional (SIO)',
            'pengumpulan-uang-dan-barang': 'Layanan Rekomendasi Pengumpulan Uang dan Barang',
            'rumah-singgah': 'Layanan Rumah Singgah',
            'rehabilitasi-lansia': 'Layanan Rekomendasi Rehabilitasi Sosial Dasar Anak Terlantar',
            'rehabilitasi-anak-terlantar': 'Layanan Rekomendasi Rehabilitasi Sosial Dasar Anak Terlantar',
            'penyandang-disabilitas': 'Layanan Data dan Pengaduan Penyandang Disabilitas',
            'pengangkatan-anak': 'Layanan Penertiban Rekomendasi Usulan Calon Pengangkatan Anak',
            'DTKS': 'Layanan Surat Keterangan Data Terpadu Kesejahteraan Sosial',
            'PBI-JK': 'Layanan Penanganan Pengaduan Penerima Bantuan Iuran-Jaminan Kesehatan (PBI-JK)'
        };
        return layananNames[layananType] || layananType;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get(`/all-lay-${layananType}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log("Fetched data:", response.data); // Menampilkan seluruh data ke dalam console
                
                // Asumsi bahwa id properti dalam data adalah 'logistik_id'
                const ids = response.data.map(item => item.lay_id); 
                console.log("Fetched IDs:", ids); // Menampilkan ID ke dalam console
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

    const sortedData = [...data].sort((a, b) => b.lay_id - a.lay_id);

    const filteredData = sortedData.filter((item) => {
    return (
        (item.no_lay && item.no_lay.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.submit_at && item.submit_at.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.nik && item.nik.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.full_name && item.full_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.no_telp && item.no_telp.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.alamat && item.alamat.toLowerCase().includes(searchTerm.toLowerCase()))
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

    const handleDelete = async (noLay) => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: `Anda akan menghapus pengajuan dengan nomor layanan: ${noLay}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = localStorage.getItem('token');
                    const response = await api.delete(`/delete-${layananType}/${noLay}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if (response.status === 200) {
                        setData(prevData => prevData.filter(item => item.no_lay !== noLay));
                        Swal.fire({
                            title: 'Terhapus',
                            text: 'Data pengajuan berhasil dihapus',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        });
                    } else {
                        console.error('Failed to delete data');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to delete data',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }
        })
    };

    // const handleView = (noLay) => {
    //     navigate(`${rolePrefix}/layanan/${layananType}/detail/${noLay}`);
    // };

    // const handleEdit = (noLay) => {
    //     navigate(`/admin/layanan/${layananType}/edit/${noLay}`);
    // };

    // const downloadPDF = async (dataToDownload) => {
    //     const doc = new jsPDF();
    //     doc.setFontSize(11); // Set font size to 11 for all text outside the table
    //     doc.setFont("helvetica");
    
    //     const layananName = getLayananName(layananType);
    
    //     // Add the HTML content as a header
    //     const headerHTML = `
    //     <html>
    //         <head>
    //             <style>
    //                 * {
    //                     font-family: Arial, Helvetica, sans-serif !important;
    //                     line-height: 1;
    //                 }
    //             </style>
    //         </head>
    //         <body>
    //             <div class="kop" style="text-align: center; display: flex; align-items: center; justify-content: center; padding-bottom: 20px; width: 90%; margin: 0px auto; border-bottom: 3px solid black;">
    //                 <img src="../../src/assets/images/Logo Pemkot Bontang.svg" style="width: 140px; height: 140px;" alt="Logo">
    //                 <div style="text-align: center; padding-left: 20px">
    //                     <h3>PEMERINTAH KOTA BONTANG</h3>
    //                     <h1 style="font-weight: 600;">DINAS SOSIAL DAN PEMBERDAYAAN MASYARAKAT</h1>
    //                     <p style="font-size: 1.5rem;">Jl. Bessai Berinta Gedung Graha Taman Praja blok III Lt. 2 Kel. Bontang Lestari </p>
    //                     <p style="font-size: 1.5rem;">Laman: dspm.bontangkota.go.id, Pos-el: dspmbontang@gmail.com, Kode Pos 75325</p>
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
    
    //     const isSpecialLayanan = ['DTKS', 'penyandang-disabilitas', 'rehabilitasi-lansia'].includes(layananType);
    //     const isPenyandangDisabilitas = layananType === 'penyandang-disabilitas';
    //     const isBantuanLogistik = layananType === 'bantuan-logistik';
    
    //     const head = isSpecialLayanan ?
    //         isPenyandangDisabilitas ?
    //             [['No', 'No. Pelayanan', 'Tanggal Pengajuan', 'NIK Pemohon', 'Nama Pemohon', 'Alamat', 'No. Telepon', 'Kebutuhan', 'Jenis Disabilitas', 'Kelengkapan Berkas']] :
    //             [['No', 'No. Pelayanan', 'Tanggal Pengajuan', 'NIK Pemohon', 'Nama Pemohon', 'Alamat', 'No. Telepon', 'Kebutuhan', 'Kelengkapan Berkas']] :
    //         isBantuanLogistik ?
    //             [['No', 'No. Pelayanan', 'Tanggal Pengajuan', 'NIK Pemohon', 'Nama Pemohon', 'Alamat', 'No. Telepon', 'Jumlah Terdampak', 'Kelengkapan Berkas']] :
    //             [['No', 'No. Pelayanan', 'Tanggal Pengajuan', 'NIK Pemohon', 'Nama Pemohon', 'Alamat', 'No. Telepon', 'Kelengkapan Berkas']];
    
    //     const body = dataToDownload.map((item, index) => {
    //         const status = calculateStatus(item);
    //         let kelengkapanBerkas;
    //         if (status === 'Menunggu Validasi') {
    //             kelengkapanBerkas = 'Menunggu Validasi';
    //         } else if (status === 'Ditolak' || status === 'Diterima' || status === 'Berkas Diproses') {
    //             kelengkapanBerkas = 'Lengkap';
    //         } else if (status === 'Berkas Tidak Valid') {
    //             kelengkapanBerkas = 'Tidak Lengkap';
    //         }
    
    //         const row = [
    //             startIndex + index + 1,
    //             item.no_lay,
    //             formatDate(item.submit_at),
    //             item.nik,
    //             item.full_name,
    //             item.alamat,
    //             item.no_telp,
    //             kelengkapanBerkas,
    //         ];
    //         if (isSpecialLayanan) {
    //             row.splice(7, 0, item.kebutuhan);
    //         }
    //         if (isPenyandangDisabilitas) {
    //             row.splice(8, 0, item.jns_disabilitas);
    //         }
    //         if (isBantuanLogistik) {
    //             row.splice(8, 0, item.jml_tedampak);
    //         }
    //         return row;
    //     });
    
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
    
    //     const fileName = `Data Pengajuan ${layananName}.pdf`;
    //     doc.save(fileName);
    // };

    // const downloadPDF = async (dataToDownload) => {
    //     const doc = new jsPDF({
    //         orientation: 'portrait',
    //         unit: 'mm',
    //         format: 'a4',
    //     });

    //     doc.setFontSize(11); // Set font size to 11 for all text outside the table
    //     doc.setFont("helvetica");

    //     const layananName = getLayananName(layananType);

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

    //     // Initialize variables for content placement
    //     let currentY = pdfHeight + 20; // Starting Y position for content
    //     let currentPage = 1; // Current page number

    //     dataToDownload.forEach((item, index) => {
    //         const status = calculateStatus(item);
    //         let kelengkapanBerkas;
    //         if (status === 'Menunggu Validasi') {
    //             kelengkapanBerkas = 'Menunggu Validasi';
    //         } else if (status === 'Ditolak' || status === 'Diterima' || status === 'Berkas Diproses') {
    //             kelengkapanBerkas = 'Lengkap';
    //         } else if (status === 'Berkas Tidak Valid') {
    //             kelengkapanBerkas = 'Tidak Lengkap';
    //         }

    //         // Check if adding this item will exceed the current page height
    //         const lineHeight = 10; // Height per line
    //         const itemHeight = 100; // Estimated height per item
    //         const spaceForFooter = 50; // Space needed for footer

    //         if (currentY + itemHeight + spaceForFooter > doc.internal.pageSize.getHeight()) {
    //             // Add new page if content exceeds current page height
    //             doc.addPage();
    //             currentPage++;
    //             currentY = 40; // Reset Y position for new page
    //         }

    //         // Add content for current item
    //         doc.text(`No: ${startIndex + index + 1}`, 20, currentY);
    //         doc.text(`No. Pelayanan: ${item.no_lay}`, 20, currentY + lineHeight * 1);
    //         doc.text(`Tanggal Pengajuan: ${formatDate(item.submit_at)}`, 20, currentY + lineHeight * 2);
    //         doc.text(`NIK Pemohon: ${item.nik}`, 20, currentY + lineHeight * 3);
    //         doc.text(`Nama Pemohon: ${item.full_name}`, 20, currentY + lineHeight * 4);
    //         doc.text(`Alamat: ${item.alamat}`, 20, currentY + lineHeight * 5);
    //         doc.text(`No. Telepon: ${item.no_telp}`, 20, currentY + lineHeight * 6);

    //         if (['DTKS', 'penyandang-disabilitas', 'rehabilitasi-lansia'].includes(layananType)) {
    //             doc.text(`Kebutuhan: ${item.kebutuhan}`, 20, currentY + lineHeight * 7);
    //         }
    //         if (layananType === 'penyandang-disabilitas') {
    //             doc.text(`Jenis Disabilitas: ${item.jns_disabilitas}`, 20, currentY + lineHeight * 8);
    //         }
    //         if (layananType === 'bantuan-logistik') {
    //             doc.text(`Jumlah Terdampak: ${item.jml_tedampak}`, 20, currentY + lineHeight * 7);
    //         }

    //         doc.text(`Kelengkapan Berkas: ${kelengkapanBerkas}`, 20, currentY + lineHeight * 9);
    //         currentY += itemHeight; // Increment Y position for the next item
    //     });

    //     // Add signature on the last page
    //     doc.text("Kepala Dinas", 128, doc.internal.pageSize.getHeight() - 60);
    //     doc.text("drg. Toetoek Pribadi Ekowati, M. Kes", 128, doc.internal.pageSize.getHeight() - 20);
    //     // doc.text("NIP. 122112141412", 128, doc.internal.pageSize.getHeight() - 5);

    //     const fileName = `Data Pengajuan ${layananName} - Page ${currentPage}.pdf`;
    //     doc.save(fileName);
    // };
    
    const downloadExcel = (dataToDownload) => {
        const ws = XLSX.utils.json_to_sheet([]);
    
        // Add the header rows
        const layananName = getLayananName(layananType).toUpperCase();
        const headers = [
            [`DATA PENGAJUAN ${layananName}`],
            ['DINAS SOSIAL DAN PEMBERDAYAAN MASYARAKAT KOTA BONTANG'],
            [] // Blank row for spacing
        ];
    
        XLSX.utils.sheet_add_aoa(ws, headers, { origin: 'A1' });
    
        // Add the table data
        const data = dataToDownload.map((item, index) => {
            const status = calculateStatus(item);
            let kelengkapanBerkas;
            if (status === 'Menunggu Validasi') {
                kelengkapanBerkas = 'Menunggu Validasi';
            } else if (status === 'Ditolak' || status === 'Diterima' || status === 'Berkas Diproses') {
                kelengkapanBerkas = 'Lengkap';
            } else if (status === 'Berkas Tidak Valid') {
                kelengkapanBerkas = 'Tidak Lengkap';
            }
    
            const row = {
                "No": startIndex + index + 1,
                "No. Pelayanan": item.no_lay,
                "Tanggal Pengajuan": formatDate(item.submit_at),
                "NIK Pemohon": item.nik,
                "Nama Pemohon": item.full_name,
                "Alamat": item.alamat,
                "No. Telepon": item.no_telp,
            };
    
            // Insert specific columns before "Kelengkapan Berkas"
            if (['DTKS', 'penyandang-disabilitas', 'rehabilitasi-lansia'].includes(layananType)) {
                row["Kebutuhan"] = item.kebutuhan;
            }
            if (layananType === 'penyandang-disabilitas') {
                row["Jenis Disabilitas"] = item.jns_disabilitas;
            }
            if (layananType === 'bantuan-logistik') {
                row["Jumlah Terdampak"] = item.jml_tedampak;
            }
    
            row["Kelengkapan Berkas"] = kelengkapanBerkas;
            row["Status"] = status;
    
            return row;
        });
    
        XLSX.utils.sheet_add_json(ws, data, { origin: -1 });
    
        // Merge cells for headers
        ws['!merges'] = [
            { s: { r: 0, c: 0 }, e: { r: 0, c: 9 } }, // Merge cells for first header
            { s: { r: 1, c: 0 }, e: { r: 1, c: 9 } }  // Merge cells for second header
        ];
    
        // Style for headers
        const headerStyle = {
            font: {
                bold: true,
                sz: 14
            },
            alignment: {
                horizontal: 'center'
            }
        };
    
        // Apply style to header rows
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j <= 9; j++) {
                const cellRef = XLSX.utils.encode_cell({ r: i, c: j });
                if (!ws[cellRef]) ws[cellRef] = { t: 's', v: '' };
                ws[cellRef].s = headerStyle;
            }
        }
    
        // Adjust column widths
        const colWidths = [
            { wch: 5 },  // No
            { wch: 15 }, // No. Pelayanan
            { wch: 20 }, // Tanggal Pengajuan
            { wch: 20 }, // NIK Pemohon
            { wch: 25 }, // Nama Pemohon
            { wch: 25 }, // Alamat
            { wch: 20 }, // No. Telepon
            { wch: 20 }, // Kebutuhan / Jenis Disabilitas / Jumlah Terdampak
            { wch: 20 }, // Kelengkapan Berkas
            { wch: 20 }, // Status
        ];
    
        ws['!cols'] = colWidths;
    
        // Set NIK column as text
        const range = XLSX.utils.decode_range(ws['!ref']);
        for (let R = range.s.r; R <= range.e.r; ++R) {
            const cell_address = { c: 3, r: R + 3 }; // NIK Pemohon column is at index 3 and data starts after 3 header rows
            const cell_ref = XLSX.utils.encode_cell(cell_address);
            if (ws[cell_ref] && ws[cell_ref].t === 'n') {
                ws[cell_ref].t = 's'; // Change cell type to string
            }
        }
    
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    
        const fileName = `Data Pengajuan ${layananName}.xlsx`;
        XLSX.writeFile(wb, fileName);
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
                                    {role !== 3 && (
                                        <div className="d-flex gap-2">
                                            {['rumah-singgah'].includes(layananType) && (
                                                <NavLink to={`/admin/layanan/${layananType}/template`}>
                                                    <div className="btn btn-primary" style={{fontSize: '.85rem'}}>
                                                        Template
                                                    </div>
                                                </NavLink>
                                            )}
                                            <NavLink to={`/admin/layanan/${layananType}/tambah-data`}>
                                                <div className="btn btn-primary" style={{fontSize: '.85rem'}}>
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
                                                    <Dropdown.Item onClick={() => handleDownloadOption('all', 'pdf')} style={{ fontSize: '.8rem' }}>Download Semua Data</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleDownloadOption('checked', 'pdf')} style={{ fontSize: '.8rem' }}>Download Data yg Dicheck</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div> */}
                                        <div>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ fontSize: '.8rem' }}>
                                                    Excel
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => handleDownloadOption('all', 'excel')} style={{ fontSize: '.8rem' }}>Download Semua Data</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleDownloadOption('checked', 'excel')} style={{ fontSize: '.8rem' }}>Download Data yg Dicheck</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                        <div className="search-bar">
                                            <Form.Control 
                                                type="text"
                                                style={{ fontSize: '.85rem', width: '180px' }}
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
                                                <th className="colnama">Nama Pemohon</th>
                                                <th className="colnama">No. Telepon</th>
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
                                                            name={item.no_lay} 
                                                            id={item.no_lay} 
                                                            checked={checkedItems[item.no_lay] || false} 
                                                            onChange={(e) => handleCheckboxChange(e, item)} 
                                                        />
                                                    </td>
                                                    <td className='text-center col-no'>{startIndex + index + 1}</td>
                                                    <td className="col-nopel">{item.no_lay}</td>
                                                    <td className="col-tanggal">{formatDate(item.submit_at)}</td>
                                                    <td className="col-nik">{item.nik}</td>
                                                    <td className="colnama">{item.full_name}</td>
                                                    <td className="colnama">{item.no_telp}</td>
                                                    <td className='col-status'>
                                                        <span className={`p-1 rounded ubuntu-sans-medium ${getStatusClass(calculateStatus(item))}`} style={{ fontSize: '.7rem' }}>
                                                            {calculateStatus(item)}
                                                        </span>
                                                    </td>
                                                    <td className="col-aksi">
                                                        {role !== 3 && (
                                                            <>
                                                                {calculateStatus(item) === 'Menunggu Validasi' && (
                                                                    <NavLink to={`/admin/layanan/${layananType}/edit/${item.no_lay}`} className="btn btn-primary lh-1 p-1 me-1">
                                                                        <RiPencilFill size={'18px'} />
                                                                    </NavLink>
                                                                )}
                                                                {(calculateStatus(item) === 'Berkas Diproses' || calculateStatus(item) === 'Ditolak' || calculateStatus(item) === 'Berkas Tidak Valid' || calculateStatus(item) === 'Diterima') && (
                                                                    <NavLink to={`/admin/layanan/${layananType}/detail/${item.no_lay}`} className="btn btn-primary lh-1 p-1 me-1">
                                                                        <IoEyeSharp size={'18px'} />
                                                                    </NavLink>
                                                                )}
                                                            </>
                                                        )}
                                                        {role !== 1 && (
                                                            <NavLink to={`/kadis/layanan/${layananType}/detail/${item.no_lay}`} className="btn btn-primary lh-1 p-1 me-1">
                                                                <IoEyeSharp size={'18px'} />
                                                            </NavLink>
                                                        )}
                                                        {role !== 3 && (
                                                            <NavLink className="btn btn-danger lh-1 p-1 me-1" onClick={() => handleDelete(item.no_lay)}>
                                                                <IoMdTrash size={'18px'}  />
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

export default LayAdminSide;
