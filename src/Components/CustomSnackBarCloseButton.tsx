import { SnackbarKey } from 'notistack'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { IconButton } from '@mui/material'

interface CustomSnackBarCloseButtonProps {
  key: SnackbarKey
  closeSnackbar: (key: SnackbarKey) => void
}

const CustomSnackBarCloseButton: React.FC<CustomSnackBarCloseButtonProps> = ({
  key,
  closeSnackbar,
}) => {
  return (
    <IconButton onClick={() => closeSnackbar(key)} color='inherit' size='small'>
      <CloseIcon />
    </IconButton>
  )
}

export default CustomSnackBarCloseButton