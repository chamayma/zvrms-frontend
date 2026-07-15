/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import voterService from "../../services/voterService";
import shehiaService from "../../services/shehiaService";

function VoterModal({

    show,
    voter,
    onClose,
    onSuccess

}) {

    const [shehia, setShehia] = useState([]);

    const [form, setForm] = useState({

        fullName: "",

        voterNumber: "",

        phoneNumber: "",

        address: "",

        sex: "",

        dateOfBirth: "",

        shehiaId: ""

    });

    useEffect(() => {

        loadShehia();

    }, []);

  useEffect(() => {

    if (voter) {

        setForm({

            fullName: voter.fullName || "",

            voterNumber: voter.voterNumber || "",

            phoneNumber: voter.phoneNumber || "",

            address: voter.address || "",

            sex: voter.sex || "",

            dateOfBirth: voter.dateOfBirth || "",

            shehiaId: voter.shehiaId || ""

        });

    }

}, [voter]);

   

    async function loadShehia() {

        try {

            const data = await shehiaService.getMine();

            setShehia(data);

        }

        catch (error) {

            console.log(error);

        }

    }

    async function save() {

        try {

            await voterService.update(

                voter.id,

                form

            );

            onSuccess();

            onClose();

        }

        catch {

            toast.success("Update failed.");

        }

    }

    if (!show) return null;

    return (

        <div
            className="modal d-block"
            style={{ background: "rgba(0,0,0,.5)" }}
        >

            <div className="modal-dialog modal-lg">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5>

                            Edit Voter

                        </h5>

                    </div>

                    <div className="modal-body">

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label>Full Name</label>

                                <input
                                    className="form-control"
                                    value={form.fullName}
                                    onChange={(e)=>setForm({
                                        ...form,
                                        fullName:e.target.value
                                    })}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Phone Number</label>

                                <input
                                    className="form-control"
                                    value={form.phoneNumber}
                                    onChange={(e)=>setForm({
                                        ...form,
                                        phoneNumber:e.target.value
                                    })}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Address</label>

                                <input
                                    className="form-control"
                                    value={form.address}
                                    onChange={(e)=>setForm({
                                        ...form,
                                        address:e.target.value
                                    })}
                                />

                            </div>

                            <div className="col-md-3 mb-3">

                                <label>Sex</label>

                                <select
                                    className="form-select"
                                    value={form.sex}
                                    onChange={(e)=>setForm({
                                        ...form,
                                        sex:e.target.value
                                    })}
                                >

                                    <option value="MALE">Male</option>

                                    <option value="FEMALE">Female</option>

                                </select>

                            </div>

                            <div className="col-md-3 mb-3">

                                <label>Shehia</label>

                                <select
                                    className="form-select"
                                    value={form.shehiaId}
                                    onChange={(e)=>setForm({
                                        ...form,
                                        shehiaId:e.target.value
                                    })}
                                >

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

                        </div>

                    </div>

                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={onClose}
                        >

                            Cancel

                        </button>

                        <button
                            className="btn btn-primary"
                            onClick={save}
                        >

                            Update

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default VoterModal;