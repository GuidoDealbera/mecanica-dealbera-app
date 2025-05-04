import { Box, CircularProgress, CircularProgressProps, Typography } from "@mui/material";

interface Props extends CircularProgressProps {
  size: number;
}

const CustomLoader = ({ size, ...props }: Props) => {
  return (
    <Box display='flex' justifyContent='center' gap={5} alignItems='center' flexDirection='column' top={0} bottom={0} right={0} left={0} position='absolute'>
      <CircularProgress {...props} sx={{ color: "whitesmoke" }} size={size} />
      <Typography fontFamily={'FE-FONT'} color="white">Cargando</Typography>
    </Box>
  );
};

export default CustomLoader;
