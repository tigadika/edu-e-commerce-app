import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";

export default configureStore({
  reducer: {
    app: appSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false });
  },
});
