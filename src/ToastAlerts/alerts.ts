import { toast } from "sonner"
import { toastErrorStyle, toastSuccessStyle } from "./toastStyles"

export const ToastSuccess = (message: string) => {
    return toast.success(message, toastSuccessStyle)
}

export const ToastError = (message: string) => {
    return toast.error(message, toastErrorStyle)
}