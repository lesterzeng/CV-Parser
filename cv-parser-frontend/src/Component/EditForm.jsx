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

  const btnStyle = () =>
  {
      return {
          margin: "0 10px 0 10px",
          height: "100%",
          bgcolor: "#461d5c",
          '&:hover': {
              bgcolor: "#6a2b8c",
          }
      }
  }

  return (
    <form onSubmit={handleSubmit} >
      <Box 
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
            defaultValue={formData.skills[0]?.skill_description || ''}
            variant="filled"
            type="text"
            onChange={(e) => setFormData({
              ...formData,
              skills: [
                { ...formData.skills[0], skill_description: e.target.value },
                ...formData.skills.slice(1)
              ]
            })}
          />

          <TextField
            id="filled-helperText"
            label="Skill 2"
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={formData.skills[1]?.skill_description || ''}
            variant="filled"
            type="text"
            onChange={(e) => setFormData({
              ...formData,
              skills: [
                ...formData.skills.slice(0,1),
                { ...formData.skills[1], skill_description: e.target.value },
              ]
            })}
          />

          <TextField
            id="filled-helperText"
            label="Skill 3"
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={formData.skills[2]?.skill_description || ''}
            variant="filled"
            type="text"
            onChange={(e) => setFormData({
              ...formData,
              skills: [
                ...formData.skills.slice(0,2),
                { ...formData.skills[2], skill_description: e.target.value },
              ]
            })}
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
            defaultValue={formData.recentCompanies[0]?.company_name || ''}
            variant="filled"
            type="text"
            onChange={(e) => setFormData({
              ...formData,
              recentCompanies: [
                { ...formData.recentCompanies[0], company_name: e.target.value },
                ...formData.recentCompanies.slice(1)
              ]
            })}
          />

          <TextField
            id="filled-helperText"
            label="Year Joined"
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={formData.recentCompanies[0]?.join_year || ''}
            variant="filled"
            type="year"
            onChange={(e) => setFormData({
              ...formData,
              recentCompanies: [
                { ...formData.recentCompanies[0], join_year: e.target.value },
                ...formData.recentCompanies.slice(1)
              ]
            })}
          />

          <TextField
            id="filled-helperText"
            label="Year Left"
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={formData.recentCompanies[0]?.leave_year || ''}
            variant="filled"
            type="year"
            onChange={(e) => setFormData({
              ...formData,
              recentCompanies: [
                { ...formData.recentCompanies[0], leave_year: e.target.value },
                ...formData.recentCompanies.slice(1)
              ]
            })}
          />
        </div>

        <div>
          <TextField 
            id="filled-helperText"
            label="Reason for Leaving"
            style={{ width: '78.5ch' }}
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={formData.recentCompanies[0]?.reason_for_leaving || ''}
            variant="filled"
            type="text"
            onChange={(e) => setFormData({
              ...formData,
              recentCompanies: [
                { ...formData.recentCompanies[0], reason_for_leaving: e.target.value },
                ...formData.recentCompanies.slice(1)
              ]
            })}
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
            defaultValue={formData.recentCompanies[1]?.company_name || ''}
            variant="filled"
            type="text"
            onChange={(e) => setFormData({
              ...formData,
              recentCompanies: [
                ...formData.recentCompanies.slice(0,1),
                { ...formData.recentCompanies[1], company_name: e.target.value }
              ]
            })}
          />

          <TextField
            id="filled-helperText"
            label="Year Joined"
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={formData.recentCompanies[1]?.join_year || ''}
            variant="filled"
            type="year"
            onChange={(e) => setFormData({
              ...formData,
              recentCompanies: [
                ...formData.recentCompanies.slice(0,1),
                { ...formData.recentCompanies[1], join_year: e.target.value }
              ]
            })}
          />

          <TextField
            id="filled-helperText"
            label="Year Left"
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={formData.recentCompanies[1]?.leave_year || ''}
            variant="filled"
            type="year"
            onChange={(e) => setFormData({
              ...formData,
              recentCompanies: [
                ...formData.recentCompanies.slice(0,1),
                { ...formData.recentCompanies[1], leave_year: e.target.value }
              ]
            })}
          />
        </div>

        <div>
          <TextField
            id="filled-helperText"
            label="Reason for Leaving"
            style={{ width: '78.5ch' }}
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={formData.recentCompanies[1]?.reason_for_leaving || ''}
            variant="filled"
            type="text"
            onChange={(e) => setFormData({
              ...formData,
              recentCompanies: [
                ...formData.recentCompanies.slice(0,1),
                { ...formData.recentCompanies[1], reason_for_leaving: e.target.value }
              ]
            })}
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
            defaultValue={formData.recentCompanies[2]?.company_name || ''}
            variant="filled"
            type="text"
            onChange={(e) => setFormData({
              ...formData,
              recentCompanies: [
                ...formData.recentCompanies.slice(0,2),
                { ...formData.recentCompanies[2], company_name: e.target.value }
              ]
            })}
          />

          <TextField
            id="filled-helperText"
            label="Year Joined"
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={formData.recentCompanies[2]?.join_year || ''}
            variant="filled"
            type="year"
            onChange={(e) => setFormData({
              ...formData,
              recentCompanies: [
                ...formData.recentCompanies.slice(0,2),
                { ...formData.recentCompanies[2], join_year: e.target.value }
              ]
            })}
          />

          <TextField
            id="filled-helperText"
            label="Year Left"
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={formData.recentCompanies[2]?.leave_year || ''}
            variant="filled"
            type="year"
            onChange={(e) => setFormData({
              ...formData,
              recentCompanies: [
                ...formData.recentCompanies.slice(0,2),
                { ...formData.recentCompanies[2], leave_year: e.target.value }
              ]
            })}
          />
        </div>

        <div>
          <TextField
            id="filled-helperText"
            label="Reason for Leaving"
            style={{ width: '78.5ch' }}
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={formData.recentCompanies[2]?.reason_for_leaving || ''}
            variant="filled"
            type="text"
            onChange={(e) => setFormData({
              ...formData,
              recentCompanies: [
                ...formData.recentCompanies.slice(0,2),
                { ...formData.recentCompanies[2], reason_for_leaving: e.target.value }
              ]
            })}
          />
        </div>

        <h2>Job Title</h2>

        <div>
          <TextField
            id="filled-helperText"
            label="Job Title"
            InputLabelProps={{
              shrink: true,
            }}
            disabled
            defaultValue={"Software Developer"}
            variant="filled"
            type="text"
            name="jobsList"
            onChange={handleChange}
            
            // defaultValue={formData.jobsList.jobTitle || ''}
            // variant="filled"
            // type="text"
            // onChange={(e) => setFormData({
            //   ...formData,
            //   jobsList: 
            //     { ...formData.jobsList[0], jobTitle: e.target.value },
            //     ...formData.jobsList.slice(1)
            // })}
          />
        </div>
      </Box>

      <Stack spacing={2} direction="row-reverse">
        <Button variant="contained" sx={btnStyle} onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="contained" sx={btnStyle} type="submit">
          Save
        </Button>
      </Stack>
    </form>
  );
}
