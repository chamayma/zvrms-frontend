import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import MainLayout from "../../layouts/MainLayout";
import districtOfficerService from "../../services/districtOfficerService";
import DistrictOfficerModal from "../../components/modals/DistrictOfficerModal";

function DistrictOfficer() {

    const [officers, setOfficers] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [selectedOfficer, setSelectedOfficer] = useState(null);

    useEffect(() => {

        loadData();

    }, []);

    async function loadData() {

        try {

            const data = await districtOfficerService.getAll();

            setOfficers(data);

        } catch (error) {

            console.log(error);

        }

    }

    function addOfficer() {

        setSelectedOfficer(null);

        setShowModal(true);

    }

    function editOfficer(officer) {

        setSelectedOfficer(officer);

        setShowModal(true);

    }

   async function deleteOfficer(id) {

    const result = await Swal.fire({

        title: "Delete District Officer?",

        text: "This action cannot be undone.",

        icon: "warning",

        showCancelButton: true,

        confirmButtonColor: "#d33",

        cancelButtonColor: "#6c757d",

        confirmButtonText: "Yes, Delete",

        cancelButtonText: "Cancel"

    });

    if (!result.isConfirmed) {

        return;

    }

    try {

        await districtOfficerService.delete(id);

        toast.success("District Officer deleted successfully.");

        loadData();

    } catch (error) {

        toast.error(

            error.response?.data?.message ||

            "Failed to delete District Officer."

        );

    }

}

    return (

        <MainLayout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>

                    District Officers

                </h2>

                <button

                    className="btn btn-primary"

                    onClick={addOfficer}

                >

                    + New District Officer

                </button>

            </div>

            <div className="table-card">

                <table className="table table-striped table-hover">

                    <thead>

                    <tr>

                        <th>#</th>

                        <th>Full Name</th>

                        <th>Username</th>

                        <th>District</th>

                        <th>Status</th>

                        <th width="180">

                            Action

                        </th>

                    </tr>

                    </thead>

                    <tbody>

                    {

                        officers.length === 0 ?

                        (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="text-center py-5"
                                >

                                    No District Officers Found.

                                </td>

                            </tr>

                        )

                        :

                        (

                            officers.map((officer,index)=>(

                                <tr key={officer.id}>

                                    <td>

                                        {index+1}

                                    </td>

                                    <td>

                                        {officer.fullName}

                                    </td>

                                    <td>

                                        {officer.username}

                                    </td>

                                    <td>

                                        {officer.district}

                                    </td>

                                    <td>

                                        {

                                            officer.active ?

                                            <span className="badge bg-success">

                                                Active

                                            </span>

                                            :

                                            <span className="badge bg-danger">

                                                Inactive

                                            </span>

                                        }

                                    </td>

                                    <td>

                                        <button

                                            className="btn btn-warning btn-sm me-2"

                                            onClick={() => editOfficer(officer)}

                                        >

                                            Edit

                                        </button>

                                        <button

                                            className="btn btn-danger btn-sm"

                                            onClick={() => deleteOfficer(officer.id)}

                                        >

                                            Delete

                                        </button>

                                    </td>

                                </tr>

                            ))

                        )

                    }

                    </tbody>

                </table>

            </div>

            <DistrictOfficerModal

                show={showModal}

                officer={selectedOfficer}

                onClose={() => setShowModal(false)}

                onSuccess={loadData}

            />

        </MainLayout>

    );

}

export default DistrictOfficer;