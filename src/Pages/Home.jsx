import { useDispatch } from 'react-redux'

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import { deleteUser, getAllUsersPayload } from '../Redux/Features/user-slice';
import { deleteUserService } from '../Services/Services';
import { useNavigate } from 'react-router-dom'

import PropTypes from 'prop-types';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));

export const Home = ({ users }) => {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const deleteHandler = (id) => {
        if(window.confirm("Are you sure you want to delete this record?"))
        deleteUserService(id)
        dispatch(deleteUser(id));
        dispatch(getAllUsersPayload())
    }
   
    return (
        <div>
            <div className='add-user-btn'>
                <Button variant='outlined' color="secondary" onClick={()=> navigate("/adduser")}>Add An User</Button>
            </div>
             <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="right">Email</StyledTableCell>
                            <StyledTableCell align="right">Contact</StyledTableCell>
                            <StyledTableCell align="right">Address</StyledTableCell>
                            <StyledTableCell align="right">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users && users.map((user) => (
                            <StyledTableRow key={user.id}>
                            <StyledTableCell component="th" scope="row">
                                {user.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{user.email}</StyledTableCell>
                            <StyledTableCell align="right">{user.contact}</StyledTableCell>
                            <StyledTableCell align="right">{user.address}</StyledTableCell>
                            <StyledTableCell align="right">
                                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                    <Button style={{marginRight:5}} color="secondary" onClick={()=> deleteHandler(user.id)}>Delete</Button>
                                    <Button color="primary" onClick={() => navigate(`/edituser/${user.id}` )}>Edit</Button>
                                </ButtonGroup>
                            </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

Home.propTypes = {
    users: PropTypes.array
}