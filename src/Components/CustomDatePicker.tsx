import React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, type DateView } from "@mui/x-date-pickers";
import "dayjs/locale/es";

type CustomDatePickerProps = {
  value: dayjs.Dayjs | null | undefined;
  onChange: (date: dayjs.Dayjs | null) => void;
  label?: string;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  minDate?: dayjs.Dayjs | null;
  maxDate?: dayjs.Dayjs | null;
  views?: readonly DateView[];
};

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value,
  onChange,
  label,
  helperText,
  error,
  disabled = false,
  minDate = null,
  maxDate = null,
  views = ["year", "month", "day"] as readonly DateView[],
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <DatePicker
        label={label}
        value={value ? dayjs(value) : null}
        onChange={onChange}
        disabled={disabled}
        views={views}
        minDate={minDate ?? undefined}
        maxDate={maxDate ?? undefined}
        localeText={{
          cancelButtonLabel: "Cancelar",
          okButtonLabel: "Seleccionar",
          toolbarTitle: "Seleccionar fecha",
        }}
        slotProps={{
          textField: {
            helperText,
            error,
            fullWidth: true,
            disabled
          },
        }}
      />
    </LocalizationProvider>
  );
};
