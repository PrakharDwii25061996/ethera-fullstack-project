import React from 'react'
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AttendanceForm from './AttendanceForm';
import AttendanceList from './AttendanceList';

function Dashboard() {
  return (
    <div>
      <Router>

      <nav>
        <Link to="/employees">Employee List</Link> | 
        <Link to="/add-employee">Add Employee</Link> |
        <Link to="/add-attendace">Add Attendance</Link> |
        <Link to="/attendance-list">Attendance List</Link>
      </nav>

      <Routes>
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/add-employee" element={<EmployeeForm />} />
        <Route path="/add-attendace" element={<AttendanceForm />} />
        <Route path='/attendance-list' element={<AttendanceList />} />
      </Routes>

    </Router>
    </div>
  )
}

export default Dashboard;