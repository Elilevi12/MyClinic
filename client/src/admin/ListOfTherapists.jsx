import React, { useEffect, useState } from 'react';

function ListOfTherapists() {
    const [therapists, setTherapists] = useState([]);
    const [error, setError] = useState(null);

    const fetchPatientDetails = async () => {
        try {
            const response = await fetch("http://localhost:3300/admin/getTherapist");
            if (!response.ok) {
                throw new Error("שגיאה בקבלת פרטי המטפלים");
            }
            const data = await response.json();
            setTherapists(data);
        } catch (error) {
            setError("שגיאה בקבלת פרטי המטפלים");
            console.error(error);
        }
    };
    
    useEffect(() => {
        fetchPatientDetails();
    }, []); 

    return (
        <div>
            <h2>רשימת מטפלים</h2>
            {error && <p>{error}</p>}
            {therapists.length > 0 ? (
                <table border="1" style={{ borderCollapse: "collapse", width: "50%", textAlign: "center" }}>
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
                        {therapists.map((therapist, index) => (
                            <tr key={therapist.id}>
                                <td>{index + 1}</td>
                                <td>{therapist.first_name}</td>
                                <td>{therapist.last_name}</td>
                                <td>{therapist.license_number}</td>
                                <td>{therapist.phone_number}</td>
                                <td>{therapist.email}</td>
                                <td>{therapist.specialization}</td>
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
