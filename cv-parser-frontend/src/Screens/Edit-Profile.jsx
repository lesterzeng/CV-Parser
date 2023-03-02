import React, { useState } from 'react';

function EditForm(props) {
  // state variables to store the form data
  const [name, setName] = useState(props.name);
  const [email, setEmail] = useState(props.email);
  const [mobile, setMobile] = useState(props.mobile);

  // event handlers to update the form data
  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleMobileChange = (event) => setMobile(event.target.value);

  // event handler to submit the form data
  const handleSubmit = (event) => {
    event.preventDefault();
    // call the parent component's update function with the updated data
    props.onSubmit({ name, email, mobile });
  };

  // render the form
  return (
    <div>
        <h2>Personal Particulars</h2>
        <form onSubmit={handleSubmit}>
        <label>
            Name:
            <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <br />
        <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <label>
            Mobile:
            <input type="tel" value={mobile} onChange={handleMobileChange} />
        </label>
        <br />
        <button type="submit">Save</button>
        </form>
    </div>
  );
}

export default EditForm;