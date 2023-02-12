import React, { useEffect, useState } from "react";

//mui imports
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import "./FirstPage.css";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Typography } from "@mui/material";
toast.configure();

type InputProps = {
  Name?: string;
  phoneNumber?: string;
  Email?: string;
};

function FirstPage() {
  const navigate = useNavigate();

  const [state, setState] = React.useState<InputProps>();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmitButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    if (
      state?.Name != undefined &&
      state?.Name != "" &&
      state?.phoneNumber != undefined &&
      state?.phoneNumber != "" &&
      state?.Email != undefined &&
      state?.Email != ""
    ) {
      localStorage.setItem("user_data", JSON.stringify(state));
      toast.success("Login successful!", {
        toastId: "Login successful!",
        autoClose: 2000,
      });
      navigate("/secondpage");
    } else {
      toast.error("Enter complete Details", {
        toastId: "Enter complete Details",
        autoClose: 2000,
      });
    }
  };

  return (
    <Box className="firstpage-form">
      <Typography
        sx={{ fontSize: "25px", fontWeight: 600, marginBottom: "30px" }}
      >
        Please Enter Details
      </Typography>
      <TextField
        sx={{ width: "300px" }}
        label="Name"
        aria-label="Name"
        name="Name"
        value={state?.Name}
        onChange={handleChange}
      />
      <TextField
        sx={{ width: "300px" }}
        label="Phone Number"
        //aria-label="phoneNumber"
        name="phoneNumber"
        value={state?.phoneNumber}
        onChange={handleChange}
      />
      <TextField
        sx={{ width: "300px" }}
        label="Email"
        aria-label="Email"
        name="Email"
        value={state?.Email}
        onChange={handleChange}
      />

      <Button
        sx={{ marginTop: "30px" }}
        variant="contained"
        onClick={(e) => handleSubmitButtonClick(e)}
      >
        Submit
      </Button>

      {/* <div>{JSON.stringify(state)}</div> */}
    </Box>
  );
}

export default FirstPage;
