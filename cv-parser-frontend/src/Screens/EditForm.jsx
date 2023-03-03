import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./EditForm.css";

function EditForm({ data, setData, setEditIndex }) {
  const [formData, setFormData] = useState(data);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newData = [...setData];
    const index = newData.findIndex((item) => item.id === data.id);
    newData[index] = formData;
    setData(newData);
    setFormData({
      firstName: "",
      midName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      workexp: "",
      jobsListId: "",
    });
    setEditIndex(null);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <h2>Personal Particulars</h2>
        <div className="TextField">
          <TextField
            label="First Name"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <TextField
            label="Middle Name"
            type="text"
            name="midName"
            value={formData.midName}
            onChange={handleInputChange}
          />
          <TextField
            label="Last Name"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />

          <TextField
            label="Email"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            label="Phone Number"
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
          <TextField
            label="Years of Working Experience"
            type="number"
            name="workExp"
            value={formData.workExp}
            onChange={handleInputChange}
          />
        </div>

        {/* <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Middle Name:
        <input
          type="text"
          name="middleName"
          value={formData.midName}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Mobile:
        <input
          type="tel"
          name="mobile"
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Years of Working Experience:
        <input
          type="number"
          name="yearsOfExperience"
          value={formData.workExp}
          onChange={handleInputChange}
        />
      </label> */}

        <div className="SaveCancelButtons">
          <Button className="Button" variant="contained" type="submit">
            Save
          </Button>
          <Button className="Button" 
            variant="contained"
            type="button"
            onClick={() => setEditIndex(null)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditForm;

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// const EditForm = ({ data }) => {
//   const { index } = useParams();
//   const [formData, setFormData] = useState({});

//   useEffect(() => {
//     // Fetch the corresponding object from the JSON data using the index
//     setFormData(data[index]);
//   }, [data, index]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     // Update the corresponding object in the JSON data with the new form data
//     data[index] = formData;
//     // Save the updated JSON data to localStorage or a database
//     localStorage.setItem('data', JSON.stringify(data));
//     // Navigate back to the original page
//     window.history.back();
//   };

//   return (
//     <form onSubmit={handleFormSubmit}>
//       <label>
//         First Name:
//         <input
//           type="text"
//           name="firstName"
//           value={formData.firstName}
//           onChange={handleInputChange}
//         />
//       </label>
//       <label>
//         Middle Name:
//         <input
//           type="text"
//           name="middleName"
//           value={formData.midName}
//           onChange={handleInputChange}
//         />
//       </label>
//       <label>
//         Last Name:
//         <input
//           type="text"
//           name="lastName"
//           value={formData.lastName}
//           onChange={handleInputChange}
//         />
//       </label>
//       <label>
//         Email:
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleInputChange}
//         />
//       </label>
//       <label>
//         Mobile:
//         <input
//           type="tel"
//           name="mobile"
//           value={formData.phoneNumber}
//           onChange={handleInputChange}
//         />
//       </label>
//       <label>
//         Years of Working Experience:
//         <input
//           type="number"
//           name="yearsOfExperience"
//           value={formData.workExp}
//           onChange={handleInputChange}
//         />
//       </label>
//       <label>
//         Job List ID:
//         <input
//           type="number"
//           name="jobListId"
//           value={formData.jobsListId}
//           onChange={handleInputChange}
//         />
//       </label>
//       <button type="submit">Save</button>
//       <button type="button" onClick={() => index(null)}>
//         Cancel
//       </button>
//     </form>
//   );
// }

// export default EditForm;
