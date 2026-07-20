/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MainLayout from "../../layouts/MainLayout";
import voterService from "../../services/voterService";
import shehiaService from "../../services/shehiaService";
import { FaSearch, FaIdCard, FaUser, FaCalendarAlt, FaMapMarkerAlt, FaPhone, FaVenusMars } from "react-icons/fa";
import "./RegisterCard.css";

function RegisterVoter() {
    const [shehia, setShehia] = useState([]);
    const [searchId, setSearchId] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const [form, setForm] = useState({
        fullName: "",
        voterNumber: "",
        phoneNumber: "",
        address: "",
        sex: "",
        dateOfBirth: "",
        placeOfBirth: "",
        issueDate: new Date().toISOString().split('T')[0],
        shehiaId: ""
    });

    useEffect(() => {
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

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchId || searchId.length !== 9) {
            toast.error("Please enter a valid 9-digit Voter ID.");
            return;
        }

        setIsSearching(true);
        
        // Simulate an API call to central registry
        setTimeout(() => {
            // Dummy Data
            setForm({
                ...form,
                voterNumber: searchId,
                fullName: "Haji Hassan Haji",
                sex: "MALE",
                dateOfBirth: "1990-05-15",
                placeOfBirth: "Stone Town, Zanzibar",
                address: "Kikwajuni, House 42",
                phoneNumber: "0771234567"
            });
            setIsSearching(false);
            toast.success("Citizen details found!");
        }, 1000);
    };

    async function save(e) {
        e.preventDefault();
        try {
            await voterService.create(form);
            toast.success("Card Registered Successfully.");
            setForm({
                fullName: "",
                voterNumber: "",
                phoneNumber: "",
                address: "",
                sex: "",
                dateOfBirth: "",
                placeOfBirth: "",
                issueDate: new Date().toISOString().split('T')[0],
                shehiaId: ""
            });
            setSearchId("");
        } catch (error) {
            console.log(error.response);
            
            let errorMessage = "Registration Failed.";
            if (error.response?.data) {
                if (error.response.data.message) {
                    errorMessage = error.response.data.message;
                } else if (typeof error.response.data === 'object') {
                    // Extract the first validation error message
                    const firstKey = Object.keys(error.response.data)[0];
                    if (firstKey) {
                        errorMessage = error.response.data[firstKey];
                    }
                } else if (typeof error.response.data === 'string') {
                    errorMessage = error.response.data;
                }
            }

            toast.error(errorMessage);
        }
    }

    return (
        <MainLayout>
            <div className="register-card-container mx-auto mt-4" style={{ maxWidth: '800px' }}>
                <h3 className="form-section-title">
                    <FaIdCard className="me-2 text-gold" />
                    Register New Card
                </h3>

                {/* Search Section */}
                <div className="search-section">
                    <form onSubmit={handleSearch} className="d-flex align-items-end">
                        <div className="flex-grow-1 me-3">
                            <label className="form-label-custom">
                                Search Citizen by Voter ID (9 digits)
                            </label>
                            <div className="input-group">
                                <span className="input-group-text bg-white"><FaSearch className="text-muted" /></span>
                                <input
                                    type="text"
                                    className="form-control form-control-custom border-start-0 ps-0"
                                    placeholder="Enter Voter ID..."
                                    value={searchId}
                                    onChange={(e) => setSearchId(e.target.value)}
                                    maxLength="9"
                                />
                            </div>
                        </div>
                        <button 
                            type="submit" 
                            className="btn btn-primary btn-search"
                            disabled={isSearching}
                        >
                            {isSearching ? "Searching..." : "Search"}
                        </button>
                    </form>
                </div>

                <form onSubmit={save}>
                    <div className="row">
                        <div className="col-md-4 mb-2">
                            <label className="form-label-custom"><FaUser className="me-2 text-muted"/>Full Name</label>
                            <input
                                className="form-control form-control-custom"
                                value={form.fullName}
                                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                                readOnly
                                required
                            />
                        </div>

                        <div className="col-md-4 mb-2">
                            <label className="form-label-custom"><FaIdCard className="me-2 text-muted"/>Voter Number</label>
                            <input
                                className="form-control form-control-custom"
                                value={form.voterNumber}
                                readOnly
                            />
                        </div>

                        <div className="col-md-4 mb-2">
                            <label className="form-label-custom"><FaCalendarAlt className="me-2 text-muted"/>Date of Birth</label>
                            <input
                                type="date"
                                className="form-control form-control-custom"
                                value={form.dateOfBirth}
                                onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
                                readOnly
                                required
                            />
                        </div>

                        <div className="col-md-4 mb-2">
                            <label className="form-label-custom"><FaMapMarkerAlt className="me-2 text-muted"/>Place of Birth</label>
                            <input
                                className="form-control form-control-custom"
                                value={form.placeOfBirth}
                                onChange={(e) => setForm({ ...form, placeOfBirth: e.target.value })}
                                readOnly
                                required
                            />
                        </div>

                        <div className="col-md-4 mb-2">
                            <label className="form-label-custom"><FaPhone className="me-2 text-muted"/>Phone Number</label>
                            <input
                                className="form-control form-control-custom"
                                value={form.phoneNumber}
                                onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                                readOnly
                                required
                            />
                        </div>

                        <div className="col-md-4 mb-2">
                            <label className="form-label-custom"><FaMapMarkerAlt className="me-2 text-muted"/>Address</label>
                            <input
                                className="form-control form-control-custom"
                                value={form.address}
                                onChange={(e) => setForm({ ...form, address: e.target.value })}
                                readOnly
                                required
                            />
                        </div>

                        <div className="col-md-4 mb-2">
                            <label className="form-label-custom"><FaVenusMars className="me-2 text-muted"/>Sex</label>
                            <select
                                className="form-select form-control-custom"
                                value={form.sex}
                                onChange={(e) => setForm({ ...form, sex: e.target.value })}
                                disabled
                                required
                            >
                                <option value="">Select</option>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                            </select>
                        </div>

                        <div className="col-md-4 mb-2">
                            <label className="form-label-custom"><FaMapMarkerAlt className="me-2 text-muted"/>Shehia</label>
                            <select
                                className="form-select form-control-custom"
                                value={form.shehiaId}
                                onChange={(e) => setForm({ ...form, shehiaId: e.target.value })}
                                required
                            >
                                <option value="">Select Shehia</option>
                                {shehia.map(s => (
                                    <option key={s.id} value={s.id}>
                                        {s.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-4 mb-2">
                            <label className="form-label-custom"><FaCalendarAlt className="me-2 text-muted"/>Date of Card Issue</label>
                            <input
                                type="date"
                                className="form-control form-control-custom"
                                value={form.issueDate}
                                onChange={(e) => setForm({ ...form, issueDate: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="text-end mt-3">
                        <button className="btn btn-submit text-white">
                            Save / Issue Card
                        </button>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}

export default RegisterVoter;