import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentUser: null,
	error: null,
	loading: false,
};
const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		signInStart: (state) => {
			state.loading = true;
			state.error = null;
		},
		signInSuccess: (state, action) => {
			const { user, token } = action.payload;
			state.currentUser = { ...user, token };
			state.loading = false;
			state.error = null;
		},
		signInFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		updateStart: (state) => {
			state.loading = true;
			state.error = null;
		},
		updateSuccess: (state, action) => {
			state.currentUser = {
				...state.currentUser, // keep token
				...action.payload, // updated user info
			};
			state.loading = false;
			state.error = null;
		},
		updateFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
	},
});

export const {
	signInStart,
	signInSuccess,
	signInFailure,
	updateStart,
	updateSuccess,
	updateFailure,
} = userSlice.actions;
export default userSlice.reducer;
