import { createSlice } from "@reduxjs/toolkit";

const getInitialDarkMode = () => {
    const storedDarkMode = localStorage.getItem('darkMode');
    return storedDarkMode ? JSON.parse(storedDarkMode) : true
}
export const uiSlice = createSlice({
    name: "ui",
    initialState: {
        isLoading: false,
        darkMode: getInitialDarkMode()
    },
    reducers: {
        StartLoading: (state) => {
            state.isLoading = true;
        },
        StopLoading: (state) => {
            state.isLoading = false;
        },
        setDarkMode: (state) => {
            localStorage.setItem('darkMode', JSON.stringify(!state.darkMode));
            state.darkMode = !state.darkMode
            
        }
    }
});
export const { StartLoading, StopLoading, setDarkMode } = uiSlice.actions; 