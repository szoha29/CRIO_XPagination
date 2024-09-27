import React, { useState, useEffect } from "react";
import "./Employees.css";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]); // to store all employees
  const [currentPage, setCurrentPage] = useState(1); // track the current page
  const [hasError, setHasError] = useState(false); // track error state
  const employeesPerPage = 10; // 10 entries per page

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    try {
      const response = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      if (!response.ok) throw new Error("Error fetching data");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      setHasError(true);
      alert("failed to fetch data");
    }
  };

  // Calculate the index for slicing data for current page
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  return (
    <div>
      {!hasError && (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((employee, index) => (
                <tr key={index}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button
              onClick={() =>
                setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
              }
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button>{currentPage}</button>
            <button
              onClick={() =>
                setCurrentPage((prevPage) =>
                  Math.min(
                    prevPage + 1,
                    Math.ceil(employees.length / employeesPerPage)
                  )
                )
              }
              disabled={
                currentPage === Math.ceil(employees.length / employeesPerPage)
              }
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeTable;
