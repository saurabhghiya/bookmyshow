import { Button, message } from "antd";
import React, { useEffect } from "react";
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";

function ProtectedRoute({ children }) {

  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getpresentUser = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetCurrentUser();
      dispatch(HideLoading());
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        dispatch(SetUser(null));
        message.error(response.message);
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      dispatch(HideLoading());
      dispatch(SetUser(null));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getpresentUser();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    user &&
    (
      <div className="layout">
        <div className="header bg-primary flex justify-between items-center p-2">
          <div>
            <b className="text-3xl text-white cursor-pointer"
              onClick={() => navigate("/")}
            >BookMyShow</b>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-white">
              <b
                className="text-xl underline"
                onClick={() => {
                  if (user.isAdmin) {
                    navigate("/admin");
                  } else {
                    navigate("/profile");
                  }
                }}
              >
                {user.name}
              </b>
              <i className="ri-shield-user-line text-3xl"></i>
            </div>
              <Button
                className="underline bold"
                size="large"
                type="default"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
              >Sign Out</Button>
            {/* <div className="bg-white p-1 flex items-center gap-1 br-1">
            </div> */}
          </div>
        </div>
        <div className="max-w-1280 m-auto">
          {children}
        </div>

      </div>
    )
  );
}

export default ProtectedRoute;