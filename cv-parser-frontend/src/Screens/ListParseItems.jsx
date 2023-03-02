import React from 'react';
import { useNavigate } from 'react-router-dom'


const ListParseItems = () =>
{

    let navigate = useNavigate()

    const token = sessionStorage.getItem("token")
    if (!token)
    {
        navigate(`login`)
    }

    const handleGetList = () =>
    {
        try
        {
            fetch(process.env.REACT_APP_CAND_URL, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
            })
        } catch (error)
        {
            console.log("got error")
        }

    }


    return (
        <div>
            <button type="button" className="btn btn-primary btn-block mb-4" onClick={handleGetList}>Test GET LIST</button>
        </div>
    );
};

export default ListParseItems;