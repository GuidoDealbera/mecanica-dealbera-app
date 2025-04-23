import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { formatLicence } from "../../utils";

interface Props {
  licence: string;
  width?: string | number;
}

const OldLicencePlate: React.FC<Props> = ({ licence, width }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const resize = () => {
      if (containerRef.current && textRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const textWidth = textRef.current.scrollWidth;
        const newScale = containerWidth / textWidth;
        setScale(Math.min(newScale, 2));
      }
    };

    resize();

    const observer = new ResizeObserver(resize);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [licence]);

  return (
    <Box position="relative" width="fit-content">
      <Box component="img" src="/oldLicence.png" width={width ?? 250} />
      <Box
        ref={containerRef}
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="absolute"
        width={230}
        bgcolor="#0A0A0A"
        height={65}
        top={25}
        right={10}
        overflow="hidden"
      >
        <Box
          ref={textRef}
          sx={{
            fontFamily: "sans-serif",
            color: "#EBEBEB",
            whiteSpace: "nowrap",
            transform: `scale(${scale})`,
            transformOrigin: "center center",
            fontSize: "60px",
          }}
        >
          {formatLicence(licence)}
        </Box>
      </Box>
    </Box>
  );
};

export default OldLicencePlate;
