import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
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

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Cambialo a false si preferís formato 24 hs
  };

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
        <Box sx={{ display: "flex", gap: 2 }}>
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
                  bgcolor: isActive ? "primary.main" : "transparent",
                  boxShadow: isActive ? undefined : "none",
                  "&:hover": {
                    bgcolor: isActive ? "primary.dark" : "transparent",
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
            {date.toLocaleDateString()}
          </Typography>
          <Typography color="#3E3E3E" fontWeight={700} display={{ xs: "none", sm: "block" }}>
            {date.toLocaleTimeString([], timeOptions)}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
