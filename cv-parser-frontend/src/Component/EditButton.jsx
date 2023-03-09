import React, { useState } from "react";
import Modal from "react-modal";
import EditForm from "./EditForm";
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import IconButton from '@mui/material/IconButton';
import "../css/Edit.css";

export default function EditButton({ candidate, onSave }) {
  const [isEditing, setIsEditing] = useState(false);

    //   let str = JSON.stringify(candidate, null, 4);
    //   console.log("stringify edit button candidate:" + str);
    //   let str1 = JSON.stringify(candidate.tempKey, null, 4);
    //   console.log("stringify edit button candidate.tempKey:" + str1);

  function handleSave(formData) {
    onSave(candidate.tempKey, formData);

    console.log("handlesave candidate.tempKey: " + candidate.tempKey)
    let str = JSON.stringify(formData, null, 4);
    console.log("stringify formData:" + str);

    setIsEditing(false);
  }

  function handleCancel() {
    setIsEditing(false);
  }

  return (
    <div>
      <IconButton aria-label="edit" onClick={() => setIsEditing(true)}><EditRoundedIcon /></IconButton>
      <Modal 
        isOpen={isEditing}
        onRequestClose={handleCancel}
        ariaHideApp={false}
        contentLabel="Edit Candidate"
        style={{
            content: {
              width: "820px",
              top: '20%',
              left: '25%',
              right: '25%',
              bottom: '20%',
              border: '1px solid #ccc',
              background: '#fff',
              overflow: 'auto',
              borderRadius: '4px',
              outline: 'none',
              padding: '20px'
            }
          }}
      >
        
        <EditForm data={candidate} onSave={handleSave} onCancel={handleCancel} />
      </Modal>
    </div>
  );
}

