import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URLS } from "./api.js";

function AttendanceList() {
    const [attendace, setAttendance] = useState('')
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [attendanceList, setAttendanceList] = useState([]);

    // Fetch employees on load
    useEffect(() => {
    axios.get(API_URLS.EMPLOYEES)
        .then(res => setEmployees(res.data.data))
        .catch(err => console.log(err));
    }, []);

    // Fetch attendance
    const getAttendance = () => {
        if (!selectedEmployee) {

            alert("Please select employee");
            return;
        }
        
        axios.get(`${API_URLS.ATTENDANCE}?employee_id=${selectedEmployee}`)
            .then(res => {
                console.log(res.data.data)
                setAttendanceList(res.data.data)
            })
            .catch(err => console.log(err));
    }

  return (
    <div className="container mt-4">

      <select
        value={selectedEmployee}
        onChange={(e) => setSelectedEmployee(e.target.value)}
      >
        <option value="">-- Select Employee --</option>
        {employees.map(emp => (
          <option key={emp.id} value={emp.employee_id}>
            {emp.full_name}
          </option>
        ))}
      </select>

      {/* Button */}
      <button onClick={getAttendance}>Get Attendance</button>


      <h3>Attendance List</h3>

      <table className="table table-bordered table-striped">

        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Employee</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {attendanceList.map(attendance => (
            <tr key={attendance.id}>
              <td>{attendance.id}</td>
              <td>{attendance.employee_name}</td>
              <td>{attendance.date}</td>
              <td>{attendance.status}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default AttendanceList;