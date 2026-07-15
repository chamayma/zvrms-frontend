/* eslint-disable no-redeclare */
import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import reportService from "../../services/reportService";
import { saveAs } from "file-saver";
import districtService from "../../services/districtService";
import shehiaService from "../../services/shehiaService";
import Pagination from "../../components/common/Pagination";

function Reports() {

    const [reports, setReports] = useState([]);

    const [search, setSearch] = useState("");
    const [districts, setDistricts] = useState([]);

const [shehia, setShehia] = useState([]);

const [districtId, setDistrictId] = useState("");

const [shehiaId, setShehiaId] = useState("");
const [sex, setSex] = useState("");

const [dateFrom, setDateFrom] = useState("");

const [dateTo, setDateTo] = useState("");

const [loading, setLoading] = useState(false);

const [page, setPage] = useState(0);

const [size] = useState(10);

const [totalPages, setTotalPages] = useState(0);


 useEffect(() => {

    loadDistricts();

    loadReports();

}, [page]);

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

setReports(data.content);

setTotalPages(data.totalPages);
    } catch (error) {

        console.log(error);

    } finally {

        setLoading(false);

    }

}

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

    try {

        const data = await reportService.getAll({

            search,

            districtId,

            shehiaId,
            sex,

        dateFrom,

        dateTo

        });

        setReports(data);

    }

    catch (error) {

        console.log(error);

    }

}

    async function exportPdf() {

    try {

        const blob = await reportService.exportPdf({

            search

        });

        saveAs(blob, "Director_Report.pdf");

    } catch (error) {

        console.log(error);

    }

}

async function exportExcel() {

    try {

        const blob = await reportService.exportExcel({

            search

        });

        saveAs(blob, "Director_Report.xlsx");

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

                    Reports

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
    className="btn btn-secondary"
    onClick={() => {

        setSearch("");
        setDistrictId("");
        setShehiaId("");
        setSex("");
        setDateFrom("");
        setDateTo("");

        // Reload all reports after clearing filters
        setTimeout(() => {
            loadReports();
        }, 0);

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
{
    loading &&

    <div className="text-center my-5">

        <div className="spinner-border text-warning"></div>

    </div>
}

                <table className="table table-hover">

                    <thead>

                    <tr>

                        <th>#</th>

                        <th>Name</th>

                        <th>Voter Number</th>

                        <th>District</th>

                        <th>Shehia</th>

                        <th>Phone</th>

                    </tr>

                    </thead>

                    <tbody>

{
    reports.length === 0 ?

    (

        <tr>

            <td
                colSpan="6"
                className="text-center py-5 text-muted"
            >

                No voter records found.

            </td>

        </tr>

    )

    :

    (

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

    )

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

        </MainLayout>

    );

}

export default Reports;