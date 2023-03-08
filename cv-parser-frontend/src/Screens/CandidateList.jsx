import React, { useState } from "react";
import EditButton from "../Component/EditButton";
import parsedData from "../test-parseddata.json";

export default function CandidateList() {
  const [candidates, setCandidates] = useState(parsedData);
  const candidatesWithTempKey = candidates.map((candidate, index) => {
    return {
      ...candidate,
      tempKey: `temp_${index}`, // generate temporary key using the index
    };
  });

  function handleSave(tempKey, formData) {
    const index = candidatesWithTempKey.findIndex(candidate => candidate.tempKey === tempKey);
   
    if (index === -1) {
      console.error(`Candidate with tempKey ${tempKey} not found`);
      return;
    }
     const updatedCandidate = {
      ...candidatesWithTempKey[index],
      ...formData,
      tempKey: tempKey
    };

    candidatesWithTempKey[index] = updatedCandidate;
    setCandidates(candidatesWithTempKey);
  }
    // const handleEdit = (id) =>
    // {
    //     navigate(`/edit/${id}`);
    // };
    
  return (
    <div>
      <h1>Candidate List</h1>
      <ul>
        {candidatesWithTempKey.map((candidate) => (
          <li key={candidate.tempKey}>
            {candidate.firstName} {candidate.lastName} - {candidate.email}
            <EditButton candidate={candidate} onSave={handleSave} />
          </li>
        ))}
      </ul>
    </div>
  );
}
