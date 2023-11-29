
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface AppState {
    user: {
        id: number;
        email: string;
        name: string;
        user_type_id: number;
        team_id: number;
    };
    token: string;
    isLogged: boolean;
    partys: Array<any>;
}

// Define the initial state using that type

const initialState: AppState = {
    user: {
        id: 0,
        email: '',
        name: '',
        user_type_id: 0,
        team_id: 0,
    },
    token: '',
    isLogged: false,
    partys: [],
};

export const getPartys:any = createAsyncThunk('app/getPartys', async () => {
    const { data } = await axios.get('/api/partys');
    return data;
});


export const appSlice = createSlice({
    name: 'app',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        login: (state, action: PayloadAction<AppState>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLogged = true;
        },
        logout: (state) => {
            state.user = initialState.user;
            state.token = initialState.token;
            state.isLogged = initialState.isLogged;
            localStorage.removeItem('copaUser');
        },
        getUserData: (state) => {
            const data : any = localStorage.getItem('copaUser');

            state.user = JSON.parse(data);

            if (data.id !== 0) {
                state.isLogged = true;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPartys.fulfilled, (state, action) => {
            console.log(action.payload);
            state.partys = action.payload;
        });
    }
});


export const { login, logout, getUserData } = appSlice.actions;

export default appSlice.reducer;