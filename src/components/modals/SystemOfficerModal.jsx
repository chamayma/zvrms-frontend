/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import systemOfficerService from "../../services/systemOfficerService";

function SystemOfficerModal({

    show,
    onClose,
    onSuccess,
    officer

}) {

    const [form, setForm] = useState({

        fullName: "",

        username: "",

        password: ""

    });

    useEffect(() => {

        if (officer) {

            setForm({

                fullName: officer.fullName,

                username: officer.username,

                password: ""

            });

        } else {

            setForm({

                fullName: "",

                username: "",

                password: ""

            });

        }

    }, [officer]);

    const save = async () => {

        try {

            if (officer) {

                await systemOfficerService.update(

                    officer.id,

                    {

                        fullName: form.fullName,

                        username: form.username,

                        active: true

                    }

                );

            } else {

                await systemOfficerService.create(form);

            }

            onSuccess();

            onClose();

        } catch (error) {

            console.log(error);

        }

    };

    if (!show) return null;

    return (

        <div
            className="modal d-block"
            style={{background:"rgba(0,0,0,.4)"}}
        >

            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5>

                            {

                                officer

                                ?

                                "Edit System Officer"

                                :

                                "New System Officer"

                            }

                        </h5>

                    </div>

                    <div className="modal-body">

                        <input
                            className="form-control mb-3"
                            placeholder="Full Name"
                            value={form.fullName}
                            onChange={(e)=>
                                setForm({
                                    ...form,
                                    fullName:e.target.value
                                })
                            }
                        />

                        <input
                            className="form-control mb-3"
                            placeholder="Username"
                            value={form.username}
                            onChange={(e)=>
                                setForm({
                                    ...form,
                                    username:e.target.value
                                })
                            }
                        />

                        {

                            !officer &&

                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                value={form.password}
                                onChange={(e)=>
                                    setForm({
                                        ...form,
                                        password:e.target.value
                                    })
                                }
                            />

                        }

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

export default SystemOfficerModal;