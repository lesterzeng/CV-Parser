import React, {useState, useEffect} from 'react';

const Create = () => {

    const token = sessionStorage.getItem("token")

    const [userInput, setUserInput] = useState({
        userId:"",
        password:""
    })

    const [groups, setGroups] = useState({
        firstName:"",
        lastName:"",
        firstName:"",
        firstName:"",
        department:{
            id:""
        }
    });
    
    const [tempArr,addArr] = useState([]);

    //run after Render
    useEffect(() => {
        try{
        fetch('http://localhost:8080/cvp/user',{
            method:"GET",
            headers:{
            Authorization:"Bearer " + token,
            "Content-Type":"application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            setGroups(data);
        })
        }
        catch (error) {
            console.log(error)
        }
    });

    const add = (event) => {
        alert(JSON.stringify(groups));
        var updatedList = [...tempArr];
        if (event.target.tempArr) {
            updatedList = [...tempArr, event.target.value];
        } else {
            updatedList.splice(tempArr.indexOf(event.target.value), 1);
        }
        addArr(updatedList);
        alert(JSON.stringify(tempArr));
    }
/*
    const SubmitFunc = async (event) => {
        event.preventDefault();
    
        await fetch('http://localhost:8080/api/auth', {
          method: 'POST',
          headers: {
            Authorization:"Bearer " + token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(group)
        });
      }
*/
    return (
        <div>
            <div>
                <div>
                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                    <label> Select All</label>
                </div>
                <div>
                    <div>
                        <div>
                            <table>
                                <tbody>
                                    {
                                        groups.map((item,index) =>{
                                            return(
                                                <tr key={index}>
                                                    <input type="checkbox" value={item} onChange={add}/>
                                                    <td>{item.firstName}</td>
                                                    <i></i>
                                                    <i></i>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div>
            </div>
            <div>
            </div>
            <div>
                <input type="submit" onClick={() => alert("Cancelled")} value="Cancel"/>
                <input type="submit" onClick={() => alert("Cancelled")} value="Create Profiles"/>
            </div>
        </div>
    );
};

export default Create;