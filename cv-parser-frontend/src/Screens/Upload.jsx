import React, { useState, useRef, useEffect } from "react";
import "./Upload.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   Box,
   Typography,
} from "@mui/material";

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
   const [uploadMode, setUploadMode] = useState(true);
   const [loading, setLoading] = useState(false);
   const [success, setSuccess] = useState(false);
   const [error, setError] = useState(false);
   const [sizeError, setSizeError] = useState(false);
   const [showErrors, setShowErrors] = useState(false);
   const [errorList, setErrorList] = useState(dummyError);
   const [sizeErrorList, setSizeErrorList] = useState(dummyError);
   const [expanded, setExpanded] = useState(false);

   const fileInputRef = useRef(null);

   useEffect(() => {
      const headers = {
         Authorization: `Bearer ${sessionStorage.getItem("token")}`,
         "Content-Type": "application/json",
      };
      fetch("http://localhost:8080/api/upload/cancel", {
         method: "GET",
         headers: headers,
      })
         .then((response) => {
            if (response.ok) {
               setErrorList(dummyError);
            } else if (response.status === 400) {
               // Handle bad request
               response.json().then((data) => {
                  console.log(data); // Log the error message returned from the server
               });
            } else {
               // Handle other errors
            }
            setSelectedFiles([]);
         })
         .catch((error) => {
            alert("Reset failed");
         });
      // .finally(() => {
      //    setLoading(false);
      // });
   }, []);

   const handleAccordionChange = () => {
      setExpanded(!expanded);
   };

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

   const toggleErrors = () => {
      setShowErrors(!showErrors);
   };

   const handleSubmit = async (event) => {
      event.preventDefault();

      // Check if no files are selected
      if (selectedFiles.length === 0) {
         alert("Please select one or more files to upload.");
         return;
      }

      setLoading(true);
      setSuccess(false);
      const maxFileSize = 5 * 1024 * 1024; // 5MB
      const maxTotalFileSize = 10 * 1024 * 1024; //100MB
      let totalFileSize = 0;
      let invalidFiles = [];
      const formData = new FormData();
      // for (const file of selectedFiles) {
      //    formData.append("files", file);
      // }

      for (const file of selectedFiles) {
         if (file.size > maxFileSize) {
            invalidFiles.push(file);
         } else {
            formData.append("files", file);
            totalFileSize += file.size;
         }
      }

      if (invalidFiles.length > 0) {
         // alert(
         //    `The following files exceed the maximum file size limit of ${
         //       maxFileSize / 1024 / 1024
         //    } MB: ${invalidFiles.join(", ")}`
         // );
         // setSizeErrorList(dummyError);
         // console.log(invalidFiles);
         // const errorMessage = `The following files exceed the maximum file size limit of ${
         //    maxFileSize / 1024 / 1024
         // } MB: ${invalidFiles.join(", ")}`;
         // const invalidFileErrors = invalidFiles.map((fileName) => ({
         //    fileName,
         //    errorMessage,
         // }));
         // setSizeErrorList({
         //    errors: [...sizeErrorList.errors, ],
         //    failCount: sizeErrorList.failCount + invalidFiles.length,
         //    successCount: sizeErrorList.successCount,
         // });

         const newErrors = [];
         for (const file of invalidFiles) {
            const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2);
            const maxFileSizeInMB = (maxFileSize / (1024 * 1024)).toFixed(0);
            newErrors.push({
               fileName: file.name,
               errorMessage: `This file's size is ${fileSizeInMB} MB, over max file size of ${maxFileSizeInMB} MB`,
            });
         }
         const newSizeErrorList = {
            errors: newErrors,
            failCount: newErrors.length,
            successCount: 0,
         };
         setSizeErrorList(newSizeErrorList);

         console.log(sizeErrorList);
         setSizeError(true);
         setError(false);
         setLoading(false);
         setSelectedFiles([]);
         return;
      }

      if (totalFileSize > maxTotalFileSize) {
         // alert(
         //    `The total file size exceeds the maximum file size limit of ${
         //       maxTotalFileSize / 1024 / 1024
         //    } MB.`
         // );
         const totalFileSizeInMB = (totalFileSize / (1024 * 1024)).toFixed(2);
         const maxTotalFileSizeInMB = (
            maxTotalFileSize /
            (1024 * 1024)
         ).toFixed(0);
         const newErrors = [
            `Total batch file size is ${totalFileSizeInMB}MB and exceeds max file size of ${maxTotalFileSizeInMB}MB`,
         ];
         // for (const file of invalidFiles) {
         //    const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2);
         //    const maxFileSizeInMB = (maxFileSize / (1024 * 1024)).toFixed(0);
         //    newErrors.push({
         //       fileName: file.name,
         //       errorMessage: `This file's size is ${fileSizeInMB} MB, over max file size of ${maxFileSizeInMB} MB`,
         //    });
         // }
         const newSizeErrorList = {
            errors: [
               {
                  fileName: "Current Upload Batch",
                  errorMessage: newErrors,
               },
            ],
            failCount: newErrors.length,
            successCount: 0,
         };
         setSizeErrorList(newSizeErrorList);

         console.log(sizeErrorList);
         setSizeError(true);
         setError(false);
         setLoading(false);
         setSelectedFiles([]);
         return;
      }

      const headers = {
         Authorization: `Bearer ${sessionStorage.getItem("token")}`,
         // "Content-Type": "application/json",
         // "Content-Type": "multipart/form-data" ,
      };
      fetch("http://localhost:8080/api/upload/up", {
         method: "POST",
         headers: headers,
         body: formData,
      })
         .then((response) => {
            if (response.ok) {
               setSuccess(true);
               setError(false);
               setErrorList(dummyError);
               setUploadMode(false);
            } else if (response.status === 400) {
               // Handle bad request
               response.json().then((data) => {
                  console.log(data); // Log the error message returned from the server
                  setErrorList(data);
                  setError(true);
                  setSizeError(false);
                  setUploadMode(false);
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

   const handleCancel = () => {
      const headers = {
         Authorization: `Bearer ${sessionStorage.getItem("token")}`,
         "Content-Type": "application/json",
      };
      if (
         window.confirm(`Are you sure you want to cancel all current uploads?`)
      ) {
         fetch("http://localhost:8080/api/upload/cancel", {
            method: "GET",
            headers: headers,
         })
            .then((response) => {
               if (response.ok) {
                  setErrorList(dummyError);
                  alert("Upload Cancelled");
               } else if (response.status === 400) {
                  // Handle bad request
                  response.json().then((data) => {
                     console.log(data); // Log the error message returned from the server
                  });
               } else {
                  // Handle other errors
               }
               setSelectedFiles([]);
            })
            .catch((error) => {
               alert("Cancel failed");
            });
         // .finally(() => {
         //    setLoading(false);
         // });
      }
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
   const handleUploadMode = () => {
      setUploadMode(true);
      setError(false);
      setSuccess(false);
      setErrorList(dummyError);
      setSizeErrorList(dummyError);
      setSizeError(false);
      setLoading(false);
      setSelectedFiles([]);
   };

   const handleParse = () =>{
      fetch("http://localhost:8080/api/parse/uploaded", {
         method: "POST",
         // headers: headers,
      })
   }

   return (
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
         {uploadMode && (
            <div>
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
                     <p>Drag and Drop Files, or Click Here to Select Files</p>
                  )}

                  {selectedFiles.length > 0 && (
                     <p>Selected {selectedFiles.length} file(s)</p>
                  )}
               </div>
               <button type="submit" disabled={loading}>
                  {loading ? "Uploading..." : "Upload"}
               </button>
               <button type="button" onClick={handleClear}>
                  Clear Selected Files
               </button>
               <button type="button" onClick={handleCancel}>
                  Cancel Upload
               </button>
            </div>
         )}
         {success && (
            <p>
               {" "}
               <span style={{ color: "green" }}>Upload successful!</span>
            </p>
         )}
         {error && (
            // <div>
            //    {/* <p>Total Upload Successful: {errorList.successCount}</p> */}
            //    <span style={{ color: "green" }}>
            //       <ArrowRightIcon /> Successful Uploads:{" "}
            //       {errorList.successCount}
            //    </span>
            //    <div>
            //       <span style={{ color: "red" }} onClick={toggleErrors}>
            //          {showErrors ? (
            //             <span>
            //                <ArrowDropDownIcon />
            //             </span>
            //          ) : (
            //             <span>
            //                <ArrowRightIcon />
            //             </span>
            //          )}{" "}
            //          Failed Uploads: {errorList.failCount}
            //          {/* /{totalCount} */}
            //       </span>
            //       {showErrors && (
            //          <ul>
            //             {errorList.errors.map((error, i) => (
            //                <li key={i}>
            //                   {error.fileName}{" "}
            //                   <span style={{ color: "red" }}>
            //                      {error.errorMessage}
            //                   </span>
            //                </li>
            //             ))}
            //          </ul>
            //       )}
            //    </div>
            //    {/* <p>Upload Failed (in current batch): {errorList.failCount}</p>
            //    {errorList.errors.map((error) => (
            //       <p>
            //          {error.fileName} {error.errorMessage}
            //       </p>
            //    ))} */}
            // </div>
            <Box sx={{ width: "100%" }}>
               <Accordion>
                  <AccordionSummary>
                     <Typography variant="h6">
                        <span style={{ color: "green" }}>
                           {`Success count: ${errorList.successCount}`}
                        </span>
                     </Typography>
                  </AccordionSummary>
               </Accordion>
               <Accordion expanded={expanded} onChange={handleAccordionChange}>
                  <AccordionSummary
                     expandIcon={<ExpandMoreIcon />}
                     aria-controls="error-list-content"
                     id="error-list-header"
                  >
                     <Typography variant="h6" component="div">
                        <span
                           style={{ color: "red" }}
                        >{`Failed count: ${errorList.failCount}`}</span>
                     </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                     <Box sx={{ width: "100%" }}>
                        <Box
                           sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                           }}
                        >
                           {/* <Typography variant="body1">
          {`Failed count: ${errorList.failCount}`}
        </Typography> */}
                        </Box>
                        <Box
                           sx={{
                              marginTop: "8px",
                              overflow: "auto",
                              height: "190px",
                           }}
                        >
                           {errorList.errors.map((error, index) => (
                              <Box
                                 key={index}
                                 sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                 }}
                              >
                                 <Typography variant="body1">
                                    <span style={{ color: "red" }}>
                                       {error.fileName}
                                    </span>
                                    {`: ${error.errorMessage}`}
                                 </Typography>
                              </Box>
                           ))}
                        </Box>
                     </Box>
                  </AccordionDetails>
               </Accordion>
            </Box>
         )}
         {sizeError && (
            <div>
               {sizeErrorList.errors.map((error) => (
                  <p>
                     {error.fileName}{" "}
                     <span style={{ color: "red" }}>{error.errorMessage}</span>
                  </p>
               ))}
            </div>
         )}
         {!uploadMode && (
            <div>
               <button
                  type="button"
                  onClick={() => {
                     handleUploadMode();
                  }}
               >
                  Add More Files
               </button>
               <button type="button">Quick Create</button>
               <button type="button" onClick={handleParse}>Parse & Edit</button>
            </div>
         )}
      </form>
   );
}

export default FileUploader;
