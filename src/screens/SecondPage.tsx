import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// toaster imports
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";

interface ResponseData {
  table_data: Array<{
    body?: string;
    id?: number;
    title?: string;
    userId?: number;
  }>;
}

function SecondPage() {
  // navigate routes
  const navigate = useNavigate();

  // checking user logged in or not ---------
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("user_data")
  );

  useEffect(() => {
    if (isLoggedIn == null) {
      toast.error("please enter Details!", {
        toastId: "please enter Details!",
        autoClose: 2000,
      });
      navigate("/firstpage");
    }
  }, [isLoggedIn]);

  // fetching data from api
  const [data, setData] = useState<ResponseData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Fetchapi();
  }, []);

  const Fetchapi = async () => {
    setIsLoading(true);
    try {
      await axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
          const allData: ResponseData = {
            table_data: response.data,
          };
          setData(allData);
          setIsLoading(false);
        });
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const columns: GridColDef[] = [
    { field: "userId", headerName: "userId", width: 90, editable: false },
    {
      field: "id",
      headerName: "id",
      width: 90,
      editable: false,
    },
    {
      field: "title",
      headerName: "title",
      width: 300,
      editable: false,
    },
    {
      field: "body",
      headerName: "body",
      width: 700,
      editable: false,
    },
  ];

  const handleLogoutClick = (event: React.MouseEvent<HTMLElement>) => {
    localStorage.removeItem("user_data");
    toast.success("Logout successful!", {
      toastId: "Logout successful!",
      autoClose: 2000,
    });
    navigate("/firstpage");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <Button
          sx={{ margin: "10px", borderColor: "indianred", color: "indianred" }}
          variant="outlined"
          endIcon={<LogoutIcon />}
          onClick={(e) => handleLogoutClick(e)}
        >
          Logout
        </Button>
      </div>
      {isLoading && <p>Loading...</p>}

      <Box sx={{ height: 630, width: "78%" }}>
        {data != null && (
          <DataGrid
            rows={data.table_data}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            experimentalFeatures={{ newEditingApi: true }}
          />
        )}
      </Box>
    </div>
  );
}

export default SecondPage;
