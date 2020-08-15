import { RootState } from './rootReducer';

// auth selectors
export const user = (state: RootState) => state.auth?.user;
export const token = (state: RootState) => state.auth?.token;
// --
