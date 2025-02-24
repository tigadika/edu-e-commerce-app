import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { getUserProfileThunk } from "../store/appSlice";

export const AuthContext = createContext(null);

const Auth = () => {
  const [theme, setTheme] = useState(true);
  const { loginUser, isLoading, loginUserRole } = useSelector(
    (state) => state.app
  );
  const dispatch = useDispatch();

  const changeTheme = () => {
    setTheme(!theme);
  };

  // ambil user
  useEffect(() => {
    dispatch(getUserProfileThunk());
  }, []);

  return (
    <AuthContext.Provider
      value={{ theme, changeTheme, loginUser, isLoading, loginUserRole }}
    >
      <Outlet />;
    </AuthContext.Provider>
  );
};

export default Auth;
