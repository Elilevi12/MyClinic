import React, { useEffect, useState } from 'react';
import AddTherapist from './AddTherapist';
import './css/listOfTherapists.css';

function ListOfTherapists() {
    const [therapists, setTherapists] = useState([]);
    const [filteredTherapists, setFilteredTherapists] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchTherapistDetails = async () => {
        try {
            const response = await fetch("http://localhost:3300/admin/getTherapist");
            if (!response.ok) {
                throw new Error("שגיאה בקבלת פרטי המטפלים");
            }
            const data = await response.json();
            setTherapists(data);
            setFilteredTherapists(data); // שמירת נתונים מסוננים בהתחלה
        } catch (error) {
            setError("שגיאה בקבלת פרטי המטפלים");
            console.error(error);
        }
    };
    
    useEffect(() => {
        fetchTherapistDetails();
    }, []); 

    // פונקציה לסינון מטפלים לפי שם או תחום טיפול
    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = therapists.filter(therapist =>
            therapist.first_name.toLowerCase().includes(term) ||
            therapist.last_name.toLowerCase().includes(term) ||
            therapist.specialty.toLowerCase().includes(term)
        );
        setFilteredTherapists(filtered);
    };

    return (
        <div className="therapists-container">
            <h2>רשימת מטפלים</h2>
            {error && <p>{error}</p>}
            
            {/* שדה החיפוש */}
            <input
                type="text"
                placeholder="חפש מטפל לפי שם או תחום טיפול"
                value={searchTerm}
                onChange={handleSearch}
                style={{
                    marginBottom: '20px',
                    padding: '10px',
                    width: '100%',
                    maxWidth: '400px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    fontSize: '1em'
                }}
            />

            {filteredTherapists.length > 0 ? (
                <table className="therapists-table">
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

            <div className="add-therapist-container">
                <AddTherapist />
            </div>
        </div>
    );
}

export default ListOfTherapists;
