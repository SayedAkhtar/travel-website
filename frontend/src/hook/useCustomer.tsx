import { login, logout } from "@/store/modal/loginUserSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useAppSelector } from "@/store/store";

const useCustomer = () => {
  const dispatch = useDispatch();

  const customer = useAppSelector((state) => state.loginUser.loginData);
  const setCustomer = (customer: any) => {
    return dispatch(login(customer));
  };
  const logoutCustomer = (customer: any) => {
    return dispatch(logout(customer));
  };
  return { customer, setCustomer, logoutCustomer };
};

export default useCustomer;
