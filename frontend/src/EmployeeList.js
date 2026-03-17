import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URLS } from "./api.js";

function EmployeeList() {

  const [employees, setEmployees] = useState([]);

  const deleteEmployee = async (employeeId) => {
    try {
      await axios.delete(`${API_URLS.EMPLOYEES}?employee_id=${employeeId}`);

      // remove employee from UI
      setEmployees(employees.filter(employee => employee.employee_id !== employeeId));

      alert("Employee deleted successfully");

    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  useEffect(() => {
    axios.get(API_URLS.EMPLOYEES)
      .then(res => {
        console.log(res)
        setEmployees(res.data.data)
      })
      .catch(err => {
        console.log(err)
      });
  }, []);

  return (
    <div className="container mt-4">

      <h3>Employee List</h3>

      <table className="table table-bordered table-striped">

        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>

          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.employee_id}</td>
              <td>{emp.full_name}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>
                <i
                className="bi bi-trash text-danger"
                style={{ cursor: "pointer", fontSize: "20px" }}
                onClick={() => deleteEmployee(emp.employee_id)}
              ></i>
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default EmployeeList;