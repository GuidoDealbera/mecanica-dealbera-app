import { useSnackbar, VariantType } from 'notistack'
import { useCallback } from 'react'
import CustomSnackBarCloseButton from '../Components/CustomSnackBarCloseButton'

export const useToasts = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const showToast = useCallback(
    (message: string, variant: VariantType) => {
      enqueueSnackbar(message, {
        variant,
        action: key => CustomSnackBarCloseButton({ key, closeSnackbar }),
      })
    },
    [enqueueSnackbar, closeSnackbar]
  )

  return {
    showToast,
  }
}
