import { Box, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { formatLicence } from "../../utils";

interface Props {
  licence: string;
  width?: string | number;
  dialog?: boolean;
}

const OldPlateTable: React.FC<Props> = ({ licence, dialog, width }) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const adjustScale = () => {
      const textEl = textRef.current;
      const containerEl = containerRef.current;

      if (textEl && containerEl) {
        const containerWidth = containerEl.offsetWidth;
        const textWidth = textEl.scrollWidth;
        const newScale = containerWidth / textWidth;
        setScale(Math.min(newScale, 1)); // No agrandamos, solo achicamos si es necesario
      }
    };

    adjustScale();
    window.addEventListener("resize", adjustScale);
    return () => window.removeEventListener("resize", adjustScale);
  }, [licence]);

  return (
    <Box position="relative" width="fit-content" mt={dialog ? 0 : 2.5}>
      <Box
        component="img"
        src="/oldLicence.png"
        width={width ?? 100}
        height={40}
      />
      <Box
        ref={containerRef}
        position="absolute"
        bgcolor="black"
        height={22}
        top={10}
        left={2}
        right={2}
        borderRadius={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          ref={textRef}
          color="white"
          fontFamily="Helvetica, Arial, sans-serif"
          sx={{
            fontSize: 25,
            transform: `scaleX(${scale})`,
            transformOrigin: 'center',
            whiteSpace: 'nowrap',
            mt: 0.2
          }}
        >
          {formatLicence(licence)}
        </Typography>
      </Box>
    </Box>
  );
};

export default OldPlateTable;
