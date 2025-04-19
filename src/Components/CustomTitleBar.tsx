import { Settings } from "@mui/icons-material";
import { Box, Button, Paper, Tooltip, Typography } from "@mui/material";

const CustomTitleBar = () => {
  const handleAction = (action: "exit" | "minimize" | "maximize") => {
    window.ipcRenderer.send(`app/${action}`);
  };

  const BUTTONS = [
    { color: "#27c93f", action: "maximize", tooltip: "Maximizar / Restaurar" },
    { color: "#ffbd2e", action: "minimize", tooltip: "Minimizar" },
    { color: "#ff5f56", action: "exit", tooltip: "Cerrar" },
  ];

  return (
    <Box
      component={Paper}
      sx={{ WebkitAppRegion: "drag" }}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      position={"fixed"}
      top={0}
      left={0}
      right={0}
      bgcolor={"#2B2B2B"}
      p={1}
      elevation={4}
      zIndex={50}
    >
      <Box
        sx={{ position: "absolute", left: 20 }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <Settings sx={{ color: "darkgrey" }} />
      </Box>

      <Typography color="white" fontFamily={"sans-serif"}>
        Mecánica Dealbera
      </Typography>

      <Box
        position="absolute"
        right={20}
        display="flex"
        gap={3}
        sx={{ WebkitAppRegion: "no-drag" }}
        pl={1}
      >
        {BUTTONS.map(({ color, action, tooltip }) => (
          <Tooltip title={tooltip} key={action} placement="bottom">
            <Button
              onClick={() => handleAction(action as any)}
              sx={{
                minWidth: 14,
                width: 14,
                height: 14,
                padding: 0,
                borderRadius: "50%",
                bgcolor: color,
                "&:hover": {
                  bgcolor: color,
                  opacity: 0.8,
                },
              }}
            />
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
};

export default CustomTitleBar;
