import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URLS } from "./api.js";


function AttendanceForm() {

  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState({
    employee: "",
    date: "",
    status: "Present"
  });

  useEffect(() => {
    axios.get(API_URLS.EMPLOYEES)
      .then(res => setEmployees(res.data.data));
  }, []);

  const handleChange = (e) => {
    setAttendance({ ...attendance, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(API_URLS.ATTENDANCE, attendance)
      .then(res => alert("Attendance Added"));
  };

  return (
    <div className="container mt-4">

      <div className="card p-4">
        <h3>Attendance Form</h3>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Employee</label>
            <select className="form-control" name="employee" onChange={handleChange}>
              <option>Select Employee</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>
                  {emp.full_name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Date</label>
            <input type="date" className="form-control" name="date" onChange={handleChange}/>
          </div>

          <div className="mb-3">
            <label className="form-label">Status</label>
            <select className="form-control" name="status" onChange={handleChange}>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>

          <button className="btn btn-success">Submit</button>

        </form>
      </div>

    </div>
  );
}

export default AttendanceForm;