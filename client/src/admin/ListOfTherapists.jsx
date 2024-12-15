import React, { useEffect, useState } from 'react';
import styles from './css/listOfTherapists.module.css';

function ListOfTherapists() {
    const [therapists, setTherapists] = useState([]);
    const [filteredTherapists, setFilteredTherapists] = useState([]);
    const [error, setError] = useState(null);
    const [nameSearchTerm, setNameSearchTerm] = useState("");
    const [specialtySearchTerm, setSpecialtySearchTerm] = useState("");

    const fetchTherapistDetails = async () => {
        const token = localStorage.getItem("token");
    fetch("http://localhost:3300/admin/getTherapists", {
        method: "GET",
        headers: {
            Authorization: token, // שליחת הטוקן בכותרת Authorization
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("שגיאה באימות הטוקן או בגישה לנתיב");
            }
            return response.json();
        })
        .then((data) => {
            setTherapists(data)
        setFilteredTherapists(data)
        })
        .catch((error) => console.error("שגיאה:", error));
    };

    useEffect(() => {
        fetchTherapistDetails();
    }, []);

    const filterTherapists = () => {
        const filtered = therapists.filter(therapist => {
            const matchesName = 
                therapist.first_name.toLowerCase().includes(nameSearchTerm.toLowerCase()) ||
                therapist.last_name.toLowerCase().includes(nameSearchTerm.toLowerCase());
            const matchesSpecialty = 
                therapist.specialty.toLowerCase().includes(specialtySearchTerm.toLowerCase());
            return matchesName && matchesSpecialty;
        });
        setFilteredTherapists(filtered);
    };

    const handleNameSearch = (event) => {
        setNameSearchTerm(event.target.value);
    };

    const handleSpecialtySearch = (event) => {
        setSpecialtySearchTerm(event.target.value);
    };

    useEffect(() => {
        filterTherapists();
    }, [nameSearchTerm, specialtySearchTerm]);

    return (
        <div className={styles["therapists-container"]}>
            <h2>רשימת מטפלים</h2>
            {error && <p>{error}</p>}

            <div className={styles["search-boxes"]}>
                <input
                    type="text"
                    placeholder="חפש מטפל לפי שם פרטי או משפחה"
                    value={nameSearchTerm}
                    onChange={handleNameSearch}
                    className={styles["search-input"]}
                />
                <input
                    type="text"
                    placeholder="חפש מטפל לפי תחום טיפול"
                    value={specialtySearchTerm}
                    onChange={handleSpecialtySearch}
                    className={styles["search-input"]}
                />
            </div>

            {filteredTherapists.length > 0 ? (
                <table className={styles["therapists-table"]}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>שם פרטי</th>
                            <th>שם משפחה</th>
                            <th>מספר רישיון</th>
                            <th>טלפון</th>
                            <th>אימייל</th>
                            <th>תחום טיפול</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTherapists.map((therapist, index) => (
                            <tr key={therapist.id}>
                                <td>{index + 1}</td>
                                <td>{therapist.first_name}</td>
                                <td>{therapist.last_name}</td>
                                <td>{therapist.license_number}</td>
                                <td>{therapist.phone}</td>
                                <td>{therapist.email}</td>
                                <td>{therapist.specialty}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>לא נמצאו מטפלים</p>
            )}

          
        </div>
    );
}

export default ListOfTherapists;
