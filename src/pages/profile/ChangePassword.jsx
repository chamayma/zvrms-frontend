import { useState } from "react";
import { toast } from "react-toastify";
import MainLayout from "../../layouts/MainLayout";
import authService from "../../services/authService";

function ChangePassword() {

    const [form, setForm] = useState({

        oldPassword: "",

        newPassword: "",

        confirmPassword: ""

    });

    const [loading, setLoading] = useState(false);

    async function save(e) {

        e.preventDefault();

        if (form.newPassword !== form.confirmPassword) {

            toast.success("Passwords do not match.");

            return;

        }

        try {

            setLoading(true);

            await authService.changePassword({

                oldPassword: form.oldPassword,

                newPassword: form.newPassword

            });

            toast.success("Password changed successfully.");

            setForm({

                oldPassword: "",

                newPassword: "",

                confirmPassword: ""

            });

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Failed to change password."

            );

        } finally {

            setLoading(false);

        }

    }

    return (

        <MainLayout>

            <div className="table-card">

                <h2 className="mb-4">

                    Change Password

                </h2>

                <form onSubmit={save}>

                    <div className="mb-3">

                        <label className="form-label">

                            Current Password

                        </label>

                        <input

                            type="password"

                            className="form-control"

                            value={form.oldPassword}

                            onChange={(e)=>

                                setForm({

                                    ...form,

                                    oldPassword:e.target.value

                                })

                            }

                            required

                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">

                            New Password

                        </label>

                        <input

                            type="password"

                            className="form-control"

                            value={form.newPassword}

                            onChange={(e)=>

                                setForm({

                                    ...form,

                                    newPassword:e.target.value

                                })

                            }

                            required

                        />

                    </div>

                    <div className="mb-4">

                        <label className="form-label">

                            Confirm Password

                        </label>

                        <input

                            type="password"

                            className="form-control"

                            value={form.confirmPassword}

                            onChange={(e)=>

                                setForm({

                                    ...form,

                                    confirmPassword:e.target.value

                                })

                            }

                            required

                        />

                    </div>

                    <button

                        className="btn btn-primary"

                        disabled={loading}

                    >

                        {

                            loading

                            ?

                            "Updating..."

                            :

                            "Change Password"

                        }

                    </button>

                </form>

            </div>

        </MainLayout>

    );

}

export default ChangePassword;