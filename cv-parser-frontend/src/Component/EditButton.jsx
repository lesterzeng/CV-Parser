import React, { useState } from "react";
import Modal from "react-modal";
import EditForm from "./EditForm";

export default function EditButton({ candidate, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  console.log("candidate.tempKey" + candidate.tempKey)

  function handleSave(formData) {
    onSave(candidate.tempKey, formData);
    console.log("candidate.tempKey: " + candidate.tempKey)
    setIsEditing(false);
  }

  function handleCancel() {
    setIsEditing(false);
  }

  return (
    <div>
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <Modal
        isOpen={isEditing}
        onRequestClose={handleCancel}
        ariaHideApp={false}
        contentLabel="Edit Candidate"
      >
        <EditForm data={candidate} onSave={handleSave} onCancel={handleCancel} />
      </Modal>
    </div>
  );
}

