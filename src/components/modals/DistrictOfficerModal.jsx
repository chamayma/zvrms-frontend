/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import districtOfficerService from "../../services/districtOfficerService";
import districtService from "../../services/districtService";

function DistrictOfficerModal({

    show,
    onClose,
    onSuccess,
    officer

}) {

    const [districts, setDistricts] = useState([]);

    const [form, setForm] = useState({

        fullName: "",

        username: "",

        password: "",

        districtId: ""

    });

    useEffect(() => {

        loadDistricts();

    }, []);

    useEffect(() => {

        if (show) {

            if (officer) {

                setForm({

                    fullName: officer.fullName,

                    username: officer.username,

                    password: "",

                    districtId: officer.districtId

                });

            } else {

                setForm({

                    fullName: "",

                    username: "",

                    password: "",

                    districtId: ""

                });

            }

        }

    }, [officer, show]);

    async function loadDistricts() {

        try {

            const data = await districtService.getAll();

            setDistricts(data);

        } catch (error) {

            console.log(error);

        }

    }

    async function save() {

        try {

            if (officer) {

                await districtOfficerService.update(

                    officer.id,

                    {

                        fullName: form.fullName,

                        username: form.username,

                        districtId: form.districtId,

                        active: true

                    }

                );

                toast.success("District Officer updated successfully.");

            } else {

                await districtOfficerService.create(form);

                toast.success("District Officer successfully registered.");

            }

            onSuccess();

            onClose();

        } catch (error) {

            toast.error(

                error.response?.data?.message || "Failed to save District Officer."

            );

        }

    }

    if (!show) return null;

    return (

        <div
            className="modal d-block"
            style={{ background: "rgba(0,0,0,.4)" }}
        >

            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5>

                            {

                                officer

                                    ? "Edit District Officer"

                                    : "New District Officer"

                            }

                        </h5>

                    </div>

                    <div className="modal-body">

                        <input
                            className="form-control mb-3"
                            placeholder="Full Name"
                            value={form.fullName}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    fullName: e.target.value
                                })
                            }
                        />

                        <input
                            className="form-control mb-3"
                            placeholder="Username"
                            value={form.username}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    username: e.target.value
                                })
                            }
                        />

                        {

                            !officer &&

                            <input
                                type="password"
                                className="form-control mb-3"
                                placeholder="Password"
                                value={form.password}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        password: e.target.value
                                    })
                                }
                            />

                        }

                        <select
                            className="form-select"
                            value={form.districtId}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    districtId: e.target.value
                                })
                            }
                        >

                            <option value="">

                                Select District

                            </option>

                            {

                                districts.map(d => (

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

                            Save

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default DistrictOfficerModal;