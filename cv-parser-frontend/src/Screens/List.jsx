import React, { useState } from "react";
// import { Link } from "react-router-dom";
import EditForm from "./EditForm";
import parsedData from "../test-parseddata.json";

function List() {
  const [data, setData] = useState(parsedData);
  const [editIndex, setEditIndex] = useState(null);

  //   function EditButton({ index }) {
  //     return (
  //       <Link to={`/edit/${index}`}>
  //         <button>Edit</button>
  //       </Link>
  //     );
  //   }

//   function EditButton() {
//     const handleEditClick = (index) => {
//       setEditIndex(index);
//     };
//     return <button onClick={handleEditClick}>Edit</button>;
//   }

    const handleEdit = (index) => {
      setEditIndex(index);
    };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Years of Working Experience</th>
            <th>Job List ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.firstName}</td>
              <td>{item.midName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.workExp}</td>
              <td>{item.jobsListId}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                {/* <EditButton onClick={() => handleEdit(index)}>Edit</EditButton> */}
                {/* <Link to={`/edit/${index}`}>
                  <EditButton />
                </Link> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br/><br/>
      {editIndex !== null && (
        <EditForm
          data={data[editIndex]}
          setData={setData}
          setEditIndex={setEditIndex}
        />
      )}
    </div>
  );
}

export default List;
