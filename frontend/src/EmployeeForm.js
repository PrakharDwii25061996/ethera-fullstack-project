import React, { useState } from "react";
import axios from "axios";
import { API_URLS } from "./api.js";

function EmployeeForm() {

  const [employee, setEmployee] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e)

    axios.post(API_URLS.EMPLOYEES, employee)
      .then(res => {
        console.log('response data - ', res.data.data)
        
        setErrors(res.data.data);
        
      })
      .catch(err => {
        if (err.response && err.response.data) {
          setErrors(err.response.data);
        }
      });
  };

  return (
    <div className="container mt-4">

      <div className="card p-4">
        <h3>Add Employee</h3>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Employee ID</label>
            <input className="form-control" name="employee_id" onChange={handleChange}/>
          </div>
          {errors.employee_id && (
            <div className="text-danger">
              {errors.employee_id[0]}
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input className="form-control" name="full_name" onChange={handleChange}/>
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input className="form-control" name="email" onChange={handleChange}/>
          </div>
          {errors.email && (
            <div className="text-danger">
              {errors.email[0]}
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Department</label>
            <input className="form-control" name="department" onChange={handleChange}/>
          </div>

          <button className="btn btn-primary">Submit</button>

        </form>
      </div>

    </div>
  );
}

export default EmployeeForm;