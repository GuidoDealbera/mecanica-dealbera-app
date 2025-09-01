import { forwardRef } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, type DateView } from "@mui/x-date-pickers";
import "dayjs/locale/es";
import { styled } from "@mui/material/styles";

const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 8,
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.grey[500],
    },
    '&:hover:not(.Mui-disabled):not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.contrastText,
    },
    '&.Mui-focused:not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.contrastText,
      borderWidth: 2,
    },
    '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.grey[100],
    },
    '&.Mui-disabled': {
      pointerEvents: 'none',
    },
  },
  '& .MuiOutlinedInput-input': {
    color: theme.palette.primary.contrastText,
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.grey[500],
    '&.Mui-focused': {
      color: theme.palette.primary.contrastText,
    },
  },
}));

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

export const CustomDatePicker = forwardRef<HTMLInputElement, CustomDatePickerProps>(
  ({
    value,
    onChange,
    label,
    helperText,
    error,
    disabled = false,
    minDate = null,
    maxDate = null,
    views = ["year", "month", "day"] as readonly DateView[],
  }, ref) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
        <StyledDatePicker
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
              ref, // Pasar la ref al TextField interno
              helperText,
              error,
              fullWidth: true,
              disabled
            },
          }}
        />
      </LocalizationProvider>
    );
  }
);

// Añadir displayName para debugging
CustomDatePicker.displayName = 'CustomDatePicker';