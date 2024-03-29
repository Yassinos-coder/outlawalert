import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosConfig from "../Helpers/AxiosConfig";

export const AddUser = createAsyncThunk("user/AddUser", async (newUserData) => {
  try {
    console.log(newUserData);
    const response = await AxiosConfig.post("/user/newUser", newUserData);
    return response.data;
  } catch (err) {
    console.warn(`AddUser Reducer ${err}`);
  }
});

export const LogIn = createAsyncThunk("/user/LogIn", async (logInCreds) => {
  try {
    const response = await AxiosConfig.post("/user/LogIn", logInCreds);
    return response.data;
  } catch (err) {
    console.warn(`Error in LogIn Reducer ${err}`);
  }
});

export const GetUserData = createAsyncThunk(
  "user/GetUserData",
  async ({ uuid }) => {
    try {
      const response = await AxiosConfig.get(`/user/GetUserData/${uuid}`);
      return response.data;
    } catch (err) {
      console.warn(`Error in GetUserData ${err}`);
    }
  }
);

export const ProfilePicUpdater = createAsyncThunk(
  "user/ProfilePicUpdater",
  async ({ uuid, newPicture }) => {
    try {
      const response = await AxiosConfig.post(
        `/user/ProfilePictureUpdate/${uuid}`,
        newPicture
      );
      return response.data;
    } catch (err) {
      console.warn(`Error in ProfilePictureUpdate Reducer ${err}`);
    }
  }
);

export const DeleterUserAvatar = createAsyncThunk(
  "user/DeleterUserAvatar",
  async ({ uuid }) => {
    try {
      const response = await AxiosConfig.post(
        `/user/DeleteProfilePicture/${uuid}`
      );
      return response.data;
    } catch (err) {
      console.warn(`Error in DeleterUserAvatar Reducer ${err}`);
    }
  }
);

export const EmailUpdate = createAsyncThunk(
  "user/EmailUpdate",
  async ({ uuid, newEmailData }) => {
    try {
      const response = await AxiosConfig.post(
        `/user/EmailUpdate/${uuid}`,
        newEmailData
      );
      return response.data;
    } catch (err) {
      console.warn(`Error in EmailUpdate Reducer ${err}`);
    }
  }
);

export const PasswordUpdate = createAsyncThunk(
  "user/PasswordUpdate",
  async ({ uuid, PassData }) => {
    try {
      const response = await AxiosConfig.post(
        `/user/PasswordUpdate/${uuid}`,
        PassData
      );
      return response.data;
    } catch (err) {
      console.warn(`Error in PasswordUpdate Reducer ${err}`);
    }
  }
);

export const UserDeleteAccount = createAsyncThunk(
  "user/UserDeleteAccount",
  async ({ uuid }) => {
    try {
      const response = await AxiosConfig.post(`/user/DeleteAccount/${uuid}`);
      return response.data;
    } catch (err) {
      console.warn(`Error in UserDeleteAccount Reducer ${err}`);
    }
  }
);

export const RequestPasswordReset = createAsyncThunk(
  "user/RequestPasswordReset",
  async ({ cin }) => {
    try {
      const response = await AxiosConfig.post(
        `/user/RequestPasswordReset/${cin}`
      );
      return response.data;
    } catch (err) {
      console.warn(`Error in RequestPasswordReset Reducer ${err}`);
    }
  }
);

export const checkUserForPasswordReset = createAsyncThunk(
  "user/checkUserForPasswordReset",
  async ({ uuid }) => {
    try {
      const response = await AxiosConfig.get(
        `/user/checkUserForPasswordReset/${uuid}`
      );
      return response.data;
    } catch (err) {
      console.warn(`Error in checkUserForPasswordReset Reducer ${err}`);
    }
  }
);

export const PasswordResetExecution = createAsyncThunk(
  "user/PasswordResetExecution",
  async ({ uuid, userToken, NewPassData }) => {
    try {
      const response = await AxiosConfig.post(
        `/user/PasswordResetExecution/${uuid}/${userToken}`, NewPassData
      );
      return response.data;
    } catch (err) {
      console.warn(`Error in PasswordResetExecution Reducer ${err} `);
    }
  }
);
const UserReducer = createSlice({
  name: "UserHandler",
  initialState: {
    userData: [],
    status: "",
    error: "",
  },
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(AddUser.fulfilled, (state, action) => {
        state.status = "accepted";
      })
      .addCase(AddUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(AddUser.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(LogIn.fulfilled, (state, action) => {
        state.userData = action.payload.userData;
        state.status = "accepted";
      })
      .addCase(LogIn.pending, (state) => {
        state.status = "pending";
      })
      .addCase(LogIn.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(GetUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.status = "accepted";
      })
      .addCase(GetUserData.pending, (state) => {
        state.status = "pending";
      })
      .addCase(GetUserData.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(ProfilePicUpdater.fulfilled, (state, action) => {
        state.status = "accepted";
      })
      .addCase(ProfilePicUpdater.pending, (state) => {
        state.status = "pending";
      })
      .addCase(ProfilePicUpdater.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(DeleterUserAvatar.fulfilled, (state, action) => {
        state.status = "accepted";
      })
      .addCase(DeleterUserAvatar.pending, (state) => {
        state.status = "pending";
      })
      .addCase(DeleterUserAvatar.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(EmailUpdate.fulfilled, (state, action) => {
        state.status = "accepted";
      })
      .addCase(EmailUpdate.pending, (state) => {
        state.status = "pending";
      })
      .addCase(EmailUpdate.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(PasswordUpdate.fulfilled, (state, action) => {
        state.status = "accepted";
      })
      .addCase(PasswordUpdate.pending, (state) => {
        state.status = "pending";
      })
      .addCase(PasswordUpdate.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(UserDeleteAccount.fulfilled, (state, action) => {
        state.status = "accepted";
      })
      .addCase(UserDeleteAccount.pending, (state) => {
        state.status = "pending";
      })
      .addCase(UserDeleteAccount.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(RequestPasswordReset.fulfilled, (state, action) => {
        state.status = "accepted";
      })
      .addCase(RequestPasswordReset.pending, (state) => {
        state.status = "pending";
      })
      .addCase(RequestPasswordReset.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(PasswordResetExecution.fulfilled, (state, action) => {
        state.status = "accepted";
      })
      .addCase(PasswordResetExecution.pending, (state) => {
        state.status = "pending";
      })
      .addCase(PasswordResetExecution.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(checkUserForPasswordReset.fulfilled, (state, action) => {
        state.status = "accepted";
      })
      .addCase(checkUserForPasswordReset.pending, (state) => {
        state.status = "pending";
      })
      .addCase(checkUserForPasswordReset.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export default UserReducer.reducer;
