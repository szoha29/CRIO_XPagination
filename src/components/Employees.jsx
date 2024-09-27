import React, { useState, useEffect } from "react";
import "./Employees.css";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]); // to store all employees
  const [currentPage, setCurrentPage] = useState(1); // track the current page
  const [totalPages, setTotalPages] = useState(0); // track total number of pages
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
      alert("failed to fetch data");
    }
  };

  // Calculate total number of pages
  useEffect(() => {
    setTotalPages(Math.ceil(employees.length / employeesPerPage));
  }, [employees]);

  // Handle previous page
  const handlePreviousPage = () => {
    if (currentPage === 1) return;
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Handle next page
  const handleNextPage = () => {
    if (currentPage === totalPages) return;
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Calculate the index for slicing data for current page
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  return (
    <>
      <h1 className="title">Employee Data Table</h1>
      <div>
        <>
          <div>
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
          </div>
          <div className="pagination">
            <button onClick={handlePreviousPage}>Previous</button>
            <p>{currentPage}</p>
            <button onClick={handleNextPage}>Next</button>
          </div>
        </>
      </div>
    </>
  );
};

export default EmployeeTable;
