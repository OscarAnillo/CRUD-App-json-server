import { useState, useEffect } from 'react';
import { Box, Button, TextField } from "@mui/material"
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersPayload, getSingleUserPayload, updateUserPayload} from '../Redux/Features/user-slice';

export const EditUser = () => {
    const [userInput, setUserInput] = useState({
        name:"",
        email:"",
        contact:"",
        address:""
    })
    const [error, setError] = useState("");
    let navigate = useNavigate()
    let { id } = useParams();
    const { user } = useSelector((state) => state.users)
    const dispatch = useDispatch();
    const { name, email, contact, address } = userInput;

    const userInputHandler = e => {
        const {name, value} = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        })
    }
    
    useEffect(() => {
        dispatch(getSingleUserPayload(id))
    },[dispatch, id])

    useEffect(() => {
        setUserInput({ ...user })
    },[user])


    const submitHandler = async e => {
        e.preventDefault();
        if(!name || !email || !contact || !address){
            setError("Please fill all the required fields")
            return;
        }
        dispatch(updateUserPayload(id, userInput));
        dispatch(getAllUsersPayload()) 
        setError("")
        navigate("/")
    }
    

    return (
        <div>
            <Button type="submit" variant='outlined' color="primary" style={{width:150, margin: 30}} onClick={() => navigate("/")}>Go Back</Button>
            <h1>Edit User</h1>
            {error && <h3 style={{color:"red"}}>Please fill out all the required fields</h3>}
            <Box component="form"   
                sx={{'& > :not(style)': { m: 1, width: '45ch' }}}
                noValidate
                autoComplete="off"
                onSubmit={submitHandler}>
                <TextField variant="standard" label="Name" value={name || ""} name="name" onChange={userInputHandler} />
                <br />
                <TextField variant="standard" label="Email" value={email || ""} name="email" onChange={userInputHandler}/>
                <br />
                <TextField variant="standard" label="Contact" value={contact || ""} name="contact" onChange={userInputHandler}/>
                <br />
                <TextField variant="standard" label="Address" value={address || ""} name="address" onChange={userInputHandler}/>
                <br />
                <Button type="submit" variant='contained' color="primary" style={{width:150}}>Update</Button>
            </Box>
        </div>
    )
}