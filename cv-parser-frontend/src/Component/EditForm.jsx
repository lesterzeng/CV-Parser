import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { width } from "@mui/system";

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
    // let str = JSON.stringify(formData, null, 4);
    // console.log("EditForm stringify formData:" + str);
  }

  return (
    <form onSubmit={handleSubmit} >
      <Box 
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
      >
        <h2>Personal Particulars </h2>
        <div>
          <TextField
            id="outlined-helperText"
            label="First Name"
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={formData.firstName}
            type="text"
            name="firstName"
            onChange={handleChange}
          />
          <TextField
            id="outlined-helperText"
            label="Middle Name"
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={formData.midName}
            type="text"
            name="midName"
            onChange={handleChange}
          />
          <TextField
            id="outlined-helperText"
            label="Last Name"
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={formData.lastName}
            type="text"
            name="lastName"
            onChange={handleChange}
          />
        </div>

        <div>
          <TextField
            id="outlined-helperText"
            label="Email"
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={formData.email}
            type="email"
            name="email"
            onChange={handleChange}
          />
          <TextField
            id="outlined-helperText"
            label="Phone Number"
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={formData.phoneNumber}
            type="tel"
            name="phoneNumber"
            onChange={handleChange}
          />
          <TextField
            id="outlined-helperText"
            label="Work Experience:"
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={formData.workExp}
            type="text"
            name="workExp"
            onChange={handleChange}
          />
        </div>

        <h2>Skills</h2>

        <div>
          <TextField
            id="filled-helperText"
            label="Skill 1"
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={formData.skill1}
            variant="filled"
            type="text"
            name="skill1"
            onChange={handleChange}
          />

          <TextField
            id="filled-helperText"
            label="Skill 2"
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={formData.skill2}
            variant="filled"
            type="text"
            name="skill2"
            onChange={handleChange}
          />

          <TextField
            id="filled-helperText"
            label="Skill 3"
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={formData.skill3}
            variant="filled"
            type="text"
            name="skill3"
            onChange={handleChange}
          />
        </div>

        <h2>Company #1</h2>

        <div>
          <TextField
            id="filled-helperText"
            label="Company Name"
            InputLabelProps={{
              shrink: true,
            }}
            // defaultValue={formData.company1.name}
            variant="filled"
            type="text"
            name="company1Name"
            onChange={handleChange}
          />

          <TextField
            id="filled-helperText"
            label="Date Joined"
            InputLabelProps={{
              shrink: true,
            }}
            // defaultValue={formData.company1.joinYear}
            variant="filled"
            type="date"
            name="company1joinYear"
            onChange={handleChange}
          />

          <TextField
            id="filled-helperText"
            label="End Date"
            InputLabelProps={{
              shrink: true,
            }}
            // defaultValue={formData.company1.leaveYear}
            variant="filled"
            type="date"
            name="company1leaveYear"
            onChange={handleChange}
          />
        </div>

        <div>
          <TextField
            id="filled-helperText"
            label="Reason for Leaving"
            InputLabelProps={{
              shrink: true,
            }}
            // defaultValue={formData.company1.reasonForLeaving}
            variant="filled"
            type="text"
            name="company1ReasonForLeaving"
            onChange={handleChange}
          />
        </div>

        <h2>Company #2</h2>

        <div>
          <TextField
            id="filled-helperText"
            label="Company Name"
            InputLabelProps={{
              shrink: true,
            }}
            // defaultValue={formData.company2.name}
            variant="filled"
            type="text"
            name="company2Name"
            onChange={handleChange}
          />

          <TextField
            id="filled-helperText"
            label="Date Joined"
            InputLabelProps={{
              shrink: true,
            }}
            // defaultValue={formData.company2.joinYear}
            variant="filled"
            type="date"
            name="company2joinYear"
            onChange={handleChange}
          />

          <TextField
            id="filled-helperText"
            label="End Date"
            InputLabelProps={{
              shrink: true,
            }}
            // defaultValue={formData.company2.leaveYear}
            variant="filled"
            type="date"
            name="company2leaveYear"
            onChange={handleChange}
          />
        </div>

        <div>
          <TextField
            id="filled-helperText"
            label="Reason for Leaving"
            InputLabelProps={{
              shrink: true,
            }}
            // defaultValue={formData.company2.reasonForLeaving}
            variant="filled"
            type="text"
            name="company2ReasonForLeaving"
            onChange={handleChange}
          />
        </div>

        <h2>Company #3</h2>

        <div>
          <TextField
            id="filled-helperText"
            label="Company Name"
            InputLabelProps={{
              shrink: true,
            }}
            // defaultValue={formData.company3.name}
            variant="filled"
            type="text"
            name="company3Name"
            onChange={handleChange}
          />

          <TextField
            id="filled-helperText"
            label="Date Joined"
            InputLabelProps={{
              shrink: true,
            }}
            // defaultValue={formData.company3.joinYear}
            variant="filled"
            type="date"
            name="company3joinYear"
            onChange={handleChange}
          />

          <TextField
            id="filled-helperText"
            label="End Date"
            InputLabelProps={{
              shrink: true,
            }}
            // defaultValue={formData.company3.leaveYear}
            variant="filled"
            type="date"
            name="company3leaveYear"
            onChange={handleChange}
          />
        </div>

        <div>
          <TextField
            id="filled-helperText"
            label="Reason for Leaving"
            InputLabelProps={{
              shrink: true,
            }}
            // defaultValue={formData.company3.reasonForLeaving}
            variant="filled"
            type="text"
            name="company3ReasonForLeaving"
            onChange={handleChange}
          />
        </div>

        <h2>Job List Id</h2>

        <div>
          <TextField
            id="filled-helperText"
            label="Job List Id"
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={formData.jobsListId}
            variant="filled"
            type="text"
            name="jobsListId"
            onChange={handleChange}
          />
        </div>
      </Box>

      <Stack spacing={2} direction="row-reverse">
        <Button variant="contained" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="contained" type="submit">
          Save
        </Button>
      </Stack>
    </form>
  );
}
