import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import reportService from "../../services/reportService";
import districtService from "../../services/districtService";
import shehiaService from "../../services/shehiaService";
import Pagination from "../../components/common/Pagination";
import { saveAs } from "file-saver";

function Reports() {

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");

    const [districts, setDistricts] = useState([]);
    const [shehia, setShehia] = useState([]);

    const [districtId, setDistrictId] = useState("");
    const [shehiaId, setShehiaId] = useState("");

    const [sex, setSex] = useState("");

    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");

    const [page, setPage] = useState(0);
    const [size] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {

        loadDistricts();
        loadReports();

    }, [page]);

    async function loadDistricts() {

        try {

            const data = await districtService.getAll();

            setDistricts(data);

        } catch (error) {

            console.log(error);

        }

    }

    async function loadShehia(id) {

        try {

            const data = await shehiaService.getByDistrict(id);

            setShehia(data);

        } catch (error) {

            console.log(error);

        }

    }

    async function loadReports() {

        setLoading(true);

        try {

            const data = await reportService.getAll({

                page,
                size,
                search,
                districtId,
                shehiaId,
                sex,
                dateFrom,
                dateTo

            });

            if (data.content) {

                setReports(data.content);
                setTotalPages(data.totalPages);

            } else {

                setReports(data);
                setTotalPages(1);

            }

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    }

    async function exportPdf() {

        try {

            const blob = await reportService.exportPdf({

                search,
                districtId,
                shehiaId,
                sex,
                dateFrom,
                dateTo

            });

            saveAs(blob, "System_Officer_Report.pdf");

        } catch (error) {

            console.log(error);

        }

    }

    async function exportExcel() {

        try {

            const blob = await reportService.exportExcel({

                search,
                districtId,
                shehiaId,
                sex,
                dateFrom,
                dateTo

            });

            saveAs(blob, "System_Officer_Report.xlsx");

        } catch (error) {

            console.log(error);

        }

    }

    function printReport() {

        window.print();

    }

    return (

        <MainLayout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>

                    System Officer Reports

                </h2>

                <div className="btn-group shadow-sm">

                    <button
                        className="btn btn-danger"
                        onClick={exportPdf}
                    >
                        PDF
                    </button>

                    <button
                        className="btn btn-success"
                        onClick={exportExcel}
                    >
                        Excel
                    </button>

                    <button
                        className="btn btn-dark"
                        onClick={printReport}
                    >
                        Print
                    </button>

                </div>

            </div>

            <div className="table-card">

                <div className="row g-3 mb-4">

                    <div className="col-lg-4">

                        <label className="form-label fw-bold">

                            Search Name

                        </label>

                        <input
                            className="form-control"
                            placeholder="Enter Full Name"
                            value={search}
                            onChange={(e)=>setSearch(e.target.value)}
                        />

                    </div>

                    <div className="col-lg-4">

                        <label className="form-label fw-bold">

                            District

                        </label>

                        <select
                            className="form-select"
                            value={districtId}
                            onChange={(e)=>{

                                setDistrictId(e.target.value);

                                setShehiaId("");

                                loadShehia(e.target.value);

                            }}
                        >

                            <option value="">All Districts</option>

                            {

                                districts.map(d=>(

                                    <option
                                        key={d.id}
                                        value={d.id}
                                    >

                                        {d.name}

                                    </option>

                                ))

                            }

                        </select>

                    </div>

                    <div className="col-lg-4">

                        <label className="form-label fw-bold">

                            Shehia

                        </label>

                        <select
                            className="form-select"
                            value={shehiaId}
                            onChange={(e)=>setShehiaId(e.target.value)}
                        >

                            <option value="">All Shehia</option>

                            {

                                shehia.map(s=>(

                                    <option
                                        key={s.id}
                                        value={s.id}
                                    >

                                        {s.name}

                                    </option>

                                ))

                            }

                        </select>

                    </div>

                    <div className="col-lg-3">

                        <label className="form-label fw-bold">

                            Sex

                        </label>

                        <select
                            className="form-select"
                            value={sex}
                            onChange={(e)=>setSex(e.target.value)}
                        >

                            <option value="">All</option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>

                        </select>

                    </div>

                    <div className="col-lg-3">

                        <label className="form-label fw-bold">

                            Start Date

                        </label>

                        <input
                            type="date"
                            className="form-control"
                            value={dateFrom}
                            onChange={(e)=>setDateFrom(e.target.value)}
                        />

                    </div>

                    <div className="col-lg-3">

                        <label className="form-label fw-bold">

                            End Date

                        </label>

                        <input
                            type="date"
                            className="form-control"
                            value={dateTo}
                            onChange={(e)=>setDateTo(e.target.value)}
                        />

                    </div>

                    <div className="col-lg-3 d-flex align-items-end">

                        <button
                            className="btn btn-primary me-2"
                            onClick={loadReports}
                        >
                            Search
                        </button>

                        <button
                            className="btn btn-secondary"
                            onClick={() => {

                                setSearch("");
                                setDistrictId("");
                                setShehiaId("");
                                setSex("");
                                setDateFrom("");
                                setDateTo("");

                                loadReports();

                            }}
                        >
                            Reset
                        </button>

                    </div>

                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">

                    <h5 className="mb-0">

                        Voter Records

                    </h5>

                    <span className="badge bg-primary">

                        Total: {reports.length}

                    </span>

                </div>

                {loading &&

                    <div className="text-center my-4">

                        <div className="spinner-border text-warning"></div>

                    </div>

                }

                <div className="table-responsive">

                    <table className="table table-striped table-hover align-middle">

                        <thead>

                            <tr>

                                <th>#</th>
                                <th>Full Name</th>
                                <th>Voter Number</th>
                                <th>District</th>
                                <th>Shehia</th>
                                <th>Phone</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                reports.length === 0 ?

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="text-center py-5"
                                    >

                                        No voter records found.

                                    </td>

                                </tr>

                                :

                                reports.map((report,index)=>(

                                    <tr key={report.id}>

                                        <td>{page * size + index + 1}</td>
                                        <td>{report.fullName}</td>
                                        <td>{report.voterNumber}</td>
                                        <td>{report.district}</td>
                                        <td>{report.shehia}</td>
                                        <td>{report.phoneNumber}</td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                </div>

                <Pagination

                    page={page}
                    totalPages={totalPages}
                    onPrevious={() => setPage(page - 1)}
                    onNext={() => setPage(page + 1)}

                />

            </div>

        </MainLayout>

    );

}

export default Reports;