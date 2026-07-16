import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import reportService from "../../services/reportService";
import shehiaService from "../../services/shehiaService";
import { saveAs } from "file-saver";

function Reports() {

    const [reports, setReports] = useState([]);

    const [shehia, setShehia] = useState([]);

    const [search, setSearch] = useState("");

    const [shehiaId, setShehiaId] = useState("");

    const [sex, setSex] = useState("");

    const [dateFrom, setDateFrom] = useState("");

    const [dateTo, setDateTo] = useState("");

    useEffect(() => {

        loadReports();

        loadShehia();

    }, []);

    async function loadShehia() {

        try {

            const data = await shehiaService.getMine();

            setShehia(data);

        } catch (error) {

            console.log(error);

        }

    }

    async function loadReports() {

        try {

            const data = await reportService.getDistrictReports({

                search,

                shehiaId,

                sex,

                dateFrom,

                dateTo

            });

            setReports(data);

        } catch (error) {

            console.log(error);

        }

    }

    async function exportPdf() {

        const blob = await reportService.exportDistrictPdf({

            search,

            shehiaId,

            sex,

            dateFrom,

            dateTo

        });

        saveAs(blob, "District_Report.pdf");

    }

    async function exportExcel() {

        const blob = await reportService.exportDistrictExcel({

            search,

            shehiaId,

            sex,

            dateFrom,

            dateTo

        });

        saveAs(blob, "District_Report.xlsx");

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

                <div>

                    <button
                        className="btn btn-danger me-2"
                        onClick={exportPdf}
                    >

                        PDF

                    </button>

                    <button
                        className="btn btn-success me-2"
                        onClick={exportExcel}
                    >

                        Excel

                    </button>

                    <button
                        className="btn btn-secondary"
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

                    <div className="col-lg-4">

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

                    <div className="col-lg-4">

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

                    <div className="col-lg-4">

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

                    <div className="col-lg-4 d-flex align-items-end">

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
                                setShehiaId("");
                                setSex("");
                                setDateFrom("");
                                setDateTo("");

                                setTimeout(() => {
                                    loadReports();
                                }, 0);

                            }}
                        >
                            Reset
                        </button>

                    </div>

                </div>

                <div className="table-responsive">

                    <table className="table table-striped table-hover">

                        <thead>

                        <tr>

                            <th>#</th>

                            <th>Full Name</th>

                            <th>Voter Number</th>

                            <th>Shehia</th>

                            <th>Phone</th>

                            <th>Sex</th>

                        </tr>

                        </thead>

                        <tbody>

                        {

                            reports.length === 0 ?

                            (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="text-center py-5"
                                    >

                                        No Records Found.

                                    </td>

                                </tr>

                            )

                            :

                            (

                                reports.map((r,index)=>(

                                    <tr key={r.id}>

                                        <td>{index+1}</td>

                                        <td>{r.fullName}</td>

                                        <td>{r.voterNumber}</td>

                                        <td>{r.shehia}</td>

                                        <td>{r.phoneNumber}</td>

                                        <td>{r.sex}</td>

                                    </tr>

                                ))

                            )

                        }

                        </tbody>

                    </table>

                </div>

            </div>

        </MainLayout>

    );

}

export default Reports;