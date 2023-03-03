import React, { useState, useRef } from "react";
import "./Upload.css";

function FileUploader() {
   const dummyError = {
      errors: [
         {
            fileName: "",
            errorMessage: "",
         },
      ],
      failCount: 0,
      successCount: 0,
   };
   const [selectedFiles, setSelectedFiles] = useState([]);
   const [loading, setLoading] = useState(false);
   const [success, setSuccess] = useState(false);
   const [error, setError] = useState(false);
   const [errorList, setErrorList] = useState(dummyError);

   const fileInputRef = useRef(null);

   const handleFileSelect = (event) => {
      setSelectedFiles([...selectedFiles, ...event.target.files]);
   };

   const handleDragOver = (event) => {
      event.preventDefault();
      event.stopPropagation();
      event.dataTransfer.dropEffect = "copy";
   };

   const handleDrop = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const files = event.dataTransfer.files;
      setSelectedFiles([...selectedFiles, ...files]);
      setSuccess(false);
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);
      setSuccess(false);

      const formData = new FormData();
      for (const file of selectedFiles) {
         formData.append("files", file);
      }
      fetch("http://localhost:8080/api/upload/up", {
         method: "POST",
         body: formData,
      })
         .then((response) => {
            if (response.ok) {
               setSuccess(true);
               setError(false);
               setErrorList(dummyError);
            } else if (response.status === 400) {
               // Handle bad request
               response.json().then((data) => {
                  console.log(data); // Log the error message returned from the server
                  setErrorList(data);
                  setError(true);
               });
            } else {
               // Handle other errors
            }
            setSelectedFiles([]);
         })
         .catch((error) => {
            alert("Upload failed");
         })
         .finally(() => {
            setLoading(false);
         });
      // try {
      //    // Send the files to the backend
      //    const response = await fetch("http://localhost:8080/api/upload/up", {
      //       method: "POST",
      //       body: formData,
      //    });

      //    if (response.ok) {
      //       setSuccess(true);
      //       setSelectedFiles([]);
      //    } else {
      //       alert("Upload failed");
      //    }
      // } catch (error) {
      //    alert("Upload failed");
      // } finally {
      //    setLoading(false);
      // }
   };

   const handleClear = () => {
      if (selectedFiles.length === 0) {
         return;
      }

      const confirmClear = window.confirm(
         "Are you sure you want to clear all selected files?"
      );

      if (confirmClear) {
         setSelectedFiles([]);
      }
   };

   return (
      <form onSubmit={handleSubmit}>
         <div
            className="file-uploader"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current.click()}
         >
            <input
               type="file"
               multiple
               ref={fileInputRef}
               onChange={handleFileSelect}
               style={{ display: "none" }}
            />
            {/* <p>Drag and drop files here, or click to select files</p> */}

            {loading ? (
               <div className="spinner" />
            ) : (
               <p>Drag and drop files here, or click to select files</p>
            )}

            {selectedFiles.length > 0 && (
               <p>Selected {selectedFiles.length} file(s)</p>
            )}
            {success && <p>Upload successful!</p>}
         </div>
         <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
         </button>
         <button type="button" onClick={handleClear}>
            Clear
         </button>
         {error && (
            <div>
               <p>Upload successful: {errorList.successCount}</p>
               <p>Upload failed: {errorList.failCount}</p>
               {errorList.errors.map((error) => (
                  <p>
                     {error.fileName} {error.errorMessage}
                  </p>
               ))}
            </div>
         )}
      </form>
   );
}

export default FileUploader;
