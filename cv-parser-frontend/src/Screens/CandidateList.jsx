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

  function handleSave(updatedData, tempKey) {
    // Add the edited data to the candidates list
    const newCandidate = { ...updatedData, tempKey };
    setCandidates([...candidates, newCandidate]);
  }

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
