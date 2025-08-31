import { ArrowBack } from "@mui/icons-material";
import { AppBar, Box, Button, Fab, Toolbar, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs, {Dayjs} from 'dayjs'

const Header = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Dayjs>(dayjs());
  const isHomePage = location.pathname === '/'
  useEffect(() => {
    const interval = setInterval(() => {
      setDate(dayjs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const BUTTONS = [
    {
      path: "/",
      text: "Inicio",
    },
    {
      path: "/clients",
      text: "Clientes",
    },
    {
      path: "/cars",
      text: "Autos",
    },
  ];

  return (
    <AppBar component="nav" sx={{ mt: 5 }}>
      <Toolbar
        sx={{
          bgcolor: "darkgrey",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {!isHomePage && (
          <Tooltip title='Atrás'>
            <Fab
              size="small"
              color="primary"
              onClick={() => navigate(-1)}
              sx={{
                position: "absolute",
              }}
            >
              <ArrowBack />
            </Fab>
            </Tooltip>
          )}
        <Box sx={{ display: "flex", gap: 2, ml: 8 }}>
          {BUTTONS.map(({ path, text }, i) => {
            const isActive =
              path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(path);
            return (
              <Button
                variant="contained"
                key={i}
                onClick={() => !isActive ? navigate(path) : null}
                sx={{
                  color: isActive ? "white" : "black",
                  fontWeight: 700,
                  bgcolor: isActive ? "primary.dark" : "transparent",
                  boxShadow: isActive ? undefined : "none",
                  "&:hover": {
                    bgcolor: isActive ? "primary.main" : "transparent",
                  },
                }}
              >
                {text}
              </Button>
            );
          })}
        </Box>
        <Box display='flex' gap={1}>
          <Typography color="#3E3E3E" fontWeight={700} display={{ xs: "none", sm: "block" }}>
            {date.format("DD/MM/YYYY")}
          </Typography>
          <Typography color="#3E3E3E" fontWeight={700} display={{ xs: "none", sm: "block" }}>
            {date.format("HH:mm")}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
