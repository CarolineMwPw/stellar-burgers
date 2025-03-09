import userSlice, {
  initialState,
  registerUser,
  loginUser,
  getUserData,
  updateUser,
  logoutUser
} from '../userSlice';

const mockUser = {
  email: 'test@example.com',
  name: 'Test User'
};

describe('userSlice', () => {
  it('should handle registerUser.pending', () => {
    const action = { type: registerUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: ''
    });
  });

  it('should handle registerUser.fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: { user: mockUser, success: true }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isAuthChecked: true,
      user: mockUser,
      error: ''
    });
  });

  it('should handle registerUser.rejected', () => {
    const action = {
      type: registerUser.rejected.type,
      error: { message: 'Error' }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: 'Error'
    });
  });

  it('should handle loginUser.pending', () => {
    const action = { type: loginUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isAuthChecked: false,
      error: ''
    });
  });

  it('should handle loginUser.fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: { user: mockUser, success: true }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isAuthChecked: true,
      user: mockUser,
      error: ''
    });
  });

  it('should handle loginUser.rejected', () => {
    const action = {
      type: loginUser.rejected.type,
      error: { message: 'Error' }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isAuthChecked: false,
      error: 'Error'
    });
  });

  it('should handle getUserData.fulfilled', () => {
    const action = {
      type: getUserData.fulfilled.type,
      payload: { user: mockUser, success: true }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isAuthChecked: true,
      user: mockUser
    });
  });

  it('should handle getUserData.rejected', () => {
    const action = {
      type: getUserData.rejected.type,
      error: { message: 'Error' }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isAuthChecked: false,
      error: 'Error'
    });
  });

  it('should handle updateUser.pending', () => {
    const action = { type: updateUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: ''
    });
  });

  it('should handle updateUser.fulfilled', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: { user: mockUser, success: true }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isAuthChecked: true,
      user: mockUser
    });
  });

  it('should handle updateUser.rejected', () => {
    const action = {
      type: updateUser.rejected.type,
      error: { message: 'Error' }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isAuthChecked: false,
      error: 'Error'
    });
  });

  it('should handle logoutUser.fulfilled', () => {
    const action = { type: logoutUser.fulfilled.type };
    const state = userSlice.reducer(
      { ...initialState, user: mockUser, isAuthChecked: true },
      action
    );
    expect(state).toEqual({
      ...initialState,
      isAuthChecked: false,
      user: { email: '', name: '' }
    });
  });
});
