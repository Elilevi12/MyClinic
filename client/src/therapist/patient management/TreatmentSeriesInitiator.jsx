import React, { useState } from 'react';

function TreatmentSeriesInitiator() {
    const [action, setAction] = useState(null);
    const [idNumber, setIdNumber] = useState('');
    const [startDate, setStartDate] = useState('');
    const [treatmentTime, setTreatmentTime] = useState('');

    const handleSetSeries = () => {
        setAction('setSeries');
    };

    const handleCancelSeries = () => {
        setAction('cancelSeries');
    };

    return (
        <div>
            <button onClick={handleSetSeries}>קביעת סדרת טיפולים</button>
            <button onClick={handleCancelSeries}>ביטול סדרת טיפולים</button>

            {action === 'setSeries' && (
                <div>
                    <input
                        type="text"
                        placeholder="תעודת זהות"
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                    />
                    <input
                        type="date"
                        placeholder="תאריך התחלה"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <input
                        type="time"
                        placeholder="שעת טיפול"
                        value={treatmentTime}
                        onChange={(e) => setTreatmentTime(e.target.value)}
                    />
                </div>
            )}

            {action === 'cancelSeries' && (
                <div>
                    <input
                        type="text"
                        placeholder="תעודת זהות"
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                    />
                </div>
            )}
        </div>
    );
}

export default TreatmentSeriesInitiator;
