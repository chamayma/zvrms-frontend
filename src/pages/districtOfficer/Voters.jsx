import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import MainLayout from "../../layouts/MainLayout";
import voterService from "../../services/voterService";
import VoterModal from "../../components/modals/VoterModal";

function Voters() {

    const [voters, setVoters] = useState([]);

    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);

    const [selectedVoter, setSelectedVoter] = useState(null);

    useEffect(() => {

        loadVoters();

    }, []);

    async function loadVoters() {

    try {

        const data = await voterService.getMine();

        let filtered = data;

        if (search.trim() !== "") {

            filtered = data.filter(voter =>
                voter.fullName
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );

        }

        setVoters(filtered);

    } catch (error) {

        console.log(error);

    }

}

    function editVoter(voter){

        setSelectedVoter(voter);

        setShowModal(true);

    }

   async function deleteVoter(id) {

    const result = await Swal.fire({

        title: "Delete Voter?",

        text: "This action cannot be undone.",

        icon: "warning",

        showCancelButton: true,

        confirmButtonText: "Yes, Delete",

        cancelButtonText: "Cancel",

        confirmButtonColor: "#dc3545",

        cancelButtonColor: "#6c757d",

        reverseButtons: true

    });

    if (!result.isConfirmed) {

        return;

    }

    try {

        await voterService.delete(id);

        toast.success("Voter deleted successfully.");

        loadVoters();

    } catch (error) {

        toast.error(

            error.response?.data?.message ||

            "Failed to delete voter."

        );

    }

}

    return(

        <MainLayout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>

                    Registered Voters

                </h2>

            </div>

            <div className="table-card">

                <div className="row mb-4">

                    <div className="col-md-4">

                        <input

                            className="form-control"

                            placeholder="Search..."

                            value={search}

                            onChange={(e)=>setSearch(e.target.value)}

                        />

                    </div>

                    <div className="col-md-2">

                        <button

                            className="btn btn-primary"

                            onClick={loadVoters}

                        >

                            Search

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

                            <th>Phone</th>

                            <th>Sex</th>

                            <th>Shehia</th>

                            <th width="180">

                                Action

                            </th>

                        </tr>

                        </thead>

                        <tbody>

                        {

                            voters.length===0 ?

                            (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="text-center py-5"
                                    >

                                        No Voters Found.

                                    </td>

                                </tr>

                            )

                            :

                            (

                                voters.map((voter,index)=>(

                                    <tr key={voter.id}>

                                        <td>

                                            {index+1}

                                        </td>

                                        <td>

                                            {voter.fullName}

                                        </td>

                                        <td>

                                            {voter.voterNumber}

                                        </td>

                                        <td>

                                            {voter.phoneNumber}

                                        </td>

                                        <td>

                                            {voter.sex}

                                        </td>

                                        <td>

                                            {voter.shehia}

                                        </td>

                                        <td>

                                            <button

                                                className="btn btn-warning btn-sm me-2"

                                                onClick={() => editVoter(voter)}

                                            >

                                                Edit

                                            </button>

                                            <button

                                                className="btn btn-danger btn-sm"

                                                onClick={() => deleteVoter(voter.id)}

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

            </div>

            <VoterModal

                show={showModal}

                voter={selectedVoter}

                onClose={() => setShowModal(false)}

                onSuccess={loadVoters}

            />

        </MainLayout>

    );

}

export default Voters;