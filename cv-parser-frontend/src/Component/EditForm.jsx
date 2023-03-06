import React, { useState } from "react";

export default function EditForm({ data, onSave, onCancel }) {
  const [formData, setFormData] = useState(data);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSave(formData);
    console.log(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td>First Name:</td>
            <td>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Middle Name:</td>
            <td>
              <input
                type="text"
                name="midName"
                value={formData.midName}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Last Name:</td>
            <td>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Phone Number:</td>
            <td>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Work Experience:</td>
            <td>
              <input
                type="text"
                name="workExp"
                value={formData.workExp}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Jobs List Id:</td>
            <td>
              <input
                type="text"
                name="jobsListId"
                value={formData.jobsListId}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Skill 1:</td>
            <td>
              <input
                type="text"
                name="skill1"
                value={formData.skill1}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Skill 2:</td>
            <td>
              <input
                type="text"
                name="skill2"
                value={formData.skill2}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Skill 2:</td>
            <td>
              <input
                type="text"
                name="skill2"
                value={formData.skill2}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Company 1:</td>
            <td>
              <input
                type="text"
                name="company1"
                value={formData.company1}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Company 2:</td>
            <td>
              <input
                type="text"
                name="company2"
                value={formData.company2}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Company 3:</td>
            <td>
              <input
                type="text"
                name="company3"
                value={formData.company3}
                onChange={handleChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}
