
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state

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
};

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
        },
    },
});


export const { login, logout } = appSlice.actions;

export default appSlice.reducer;