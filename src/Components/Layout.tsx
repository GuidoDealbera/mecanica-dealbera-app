import { Box } from "@mui/material";
import CustomTitleBar from "./CustomTitleBar";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <Box>
      <CustomTitleBar />
      <Box pt={14} height={"100vh"} overflow={"auto"}>
        <Header />
        <main>
          <Outlet />
        </main>
      </Box>
    </Box>
  );
};

export default Layout;
