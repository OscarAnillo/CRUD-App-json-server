import { createSlice } from '@reduxjs/toolkit';
import { addUserService, getAllUsers, getSingleUserService, updateUserService } from '../../Services/Services';

const initialState = {
    loading: true,
    users: [],
    user:{}
}

const userSlice = createSlice({
    name:"users",
    initialState,
    reducers: {
        getUsers: (state, action) => {
            return {
                loading: false,
                users : action.payload,
                user: {}
            }
        },
        addUser: (state, action) => {
            return {
                loading: false,
                users: state.users.concat(action.payload),
                user: {}
            }
        },
        deleteUser: (state, action) => {
            return {
                loading: false,
                users: state.users.filter((user) => user.id !== action.payload),
                user: {}
            }
        },
        getSingleUser: (state, action) => {
            return {
                loading: false,
                users: state.users,
                user: action.payload 
            }
        },
        updateUser: (state) => {
            return {
                ...state,
                loading: false,
                
            }
        }
    },
    
})

export const getAllUsersPayload = () => {
    return async (dispatch) => {
        const allUsers = await getAllUsers();
        dispatch(getUsers(allUsers))
    }
}

export const addUserPayload = (user) => {
    return async (dispatch) => {
        const newUser = await addUserService(user)
        dispatch(addUser(newUser))
    }
}

export const getSingleUserPayload = (id) => {
    return async (dispatch) => {
        const singleUser = await getSingleUserService(id);
        dispatch(getSingleUser(singleUser))
    }
}

export const updateUserPayload = (id, user) => {
    return async (dispatch) => {
        const updatedUser = await updateUserService(id, user);
        dispatch(updateUser(updatedUser))
    }
}

export const { getUsers, addUser, deleteUser, getSingleUser, updateUser } = userSlice.actions
export default userSlice.reducer;