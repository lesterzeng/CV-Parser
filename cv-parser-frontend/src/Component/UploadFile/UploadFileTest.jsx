import React, { useState } from 'react'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

export const Test = () => {

    const [pdfFile, setPdfFile] = useState(null);
    const [pdfFileError, setPdfFileError] = useState('');


    const fileType = ['application/pdf']
    const handlePdfFileChange = (e) => {
        let selectedFile = e.target.files[0]
        if (selectedFile) {
            if (fileType.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = (e) => {
                    console.log(e.target.result)
                    setPdfFile(e.target.result);
                    setPdfFileError('');
                }
            } else {
                setPdfFileError('Invalid file')
                setPdfFile(null);
            }
        } else {
            console.log('No file selected')
        }
    }

    const handlePdfFileSubmit = (e) => {
        e.preventDefault();
        console.log("Method called successfully")
        const fileData = pdfFile
        // console.log(typeof fileData)
        let fileDataSplit = fileData.split(',', 2)
        // console.log(fileDataSplit)
        var fileType = ""
        for (let i = fileDataSplit[0].indexOf("data:") + 5; i < fileDataSplit[0].length; i++) {
            if (fileDataSplit[0][i]!==';')
                fileType += fileDataSplit[0][i]
            else
                break;
        }
        // let fileType = fileDataSplit[0].substring(fileDataSplit[0].indexOf("data:") + 5, fileDataSplit[0].indexOf(";"))
        // console.log(fileType)
        // console.log(fileType, fileDataSplit[1])

        try {
            fetch(process.env.REACT_APP_PARSE_FILE_URL+"/upload",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        fileType: fileType,
                        encodedData: fileDataSplit[1]
                    }),
                })
                .then((res) => res.json())
                .then((data) => {

                });
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <form onSubmit={(handlePdfFileSubmit)}>
                <input type="file" name="" id="" onChange={handlePdfFileChange} />
                {pdfFileError && <div>{pdfFileError}</div>}
                <br />
                <button type="submit">Upload</button>

            </form>
            <br />

        </div>
    )
}

export default Test