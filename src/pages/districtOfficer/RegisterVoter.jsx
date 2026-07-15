/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MainLayout from "../../layouts/MainLayout";

import voterService from "../../services/voterService";
import shehiaService from "../../services/shehiaService";

function RegisterVoter() {

    const [shehia,setShehia]=useState([]);

    const [form,setForm]=useState({

        fullName:"",

        voterNumber:"",

        phoneNumber:"",

        address:"",

        sex:"",

        dateOfBirth:"",

        shehiaId:""

    });

    useEffect(()=>{

        loadShehia();

    },[]);

    async function loadShehia(){

        try{

            // backend returns only officer district shehia

            const data=await shehiaService.getMine();

            setShehia(data);

        }

        catch(error){

            console.log(error);

        }

    }

    async function save(e){

        e.preventDefault();

        try{

            await voterService.create(form);

            toast.success("Voter Registered Successfully.");

            setForm({

                fullName:"",

                voterNumber:"",

                phoneNumber:"",

                address:"",

                sex:"",

                dateOfBirth:"",

                shehiaId:""

            });

        }

        catch (error) {

    console.log(error.response);

    toast.error(

        error.response?.data?.message ||

        error.response?.data ||

        "Registration Failed."

    );

}

    }

    return(

        <MainLayout>

            <div className="table-card">

                <h3 className="mb-4">

                    Register Voter

                </h3>

                <form onSubmit={save}>

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <label>

                                Full Name

                            </label>

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

                            <label>

                                Voter Number

                            </label>

                            <input

                                className="form-control"

                                value={form.voterNumber}

                                onChange={(e)=>setForm({

                                    ...form,

                                    voterNumber:e.target.value

                                })}

                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label>

                                Date of Birth

                            </label>

                            <input

                                type="date"

                                className="form-control"

                                value={form.dateOfBirth}

                                onChange={(e)=>setForm({

                                    ...form,

                                    dateOfBirth:e.target.value

                                })}

                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label>

                                Phone Number

                            </label>

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

                            <label>

                                Address

                            </label>

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

                            <label>

                                Sex

                            </label>

                            <select

                                className="form-select"

                                value={form.sex}

                                onChange={(e)=>setForm({

                                    ...form,

                                    sex:e.target.value

                                })}

                            >

                                <option value="">

                                    Select

                                </option>

                                <option value="MALE">

                                    Male

                                </option>

                                <option value="FEMALE">

                                    Female

                                </option>

                            </select>

                        </div>

                        <div className="col-md-3 mb-3">

                            <label>

                                Shehia

                            </label>

                            <select

                                className="form-select"

                                value={form.shehiaId}

                                onChange={(e)=>setForm({

                                    ...form,

                                    shehiaId:e.target.value

                                })}

                            >

                                <option value="">

                                    Select Shehia

                                </option>

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

                    <button

                        className="btn btn-primary"

                    >

                        Register Voter

                    </button>

                </form>

            </div>

        </MainLayout>

    );

}

export default RegisterVoter;