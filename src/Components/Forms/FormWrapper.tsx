import { UseFormReturn } from 'react-hook-form'
import { CustomDialog } from '../CustomDialog'
import { useFormGuard } from '../../Hooks/useFormGuard'

type FormWrapperProps = {
  children: React.ReactNode
  form: UseFormReturn<any>
}

const FormWrapper: React.FC<FormWrapperProps> = ({ children, form }) => {
  const { openDialog, confirmNavigation, cancelNavigation } = useFormGuard({
    isDirty: form.formState.isDirty,
    onConfirm: () => {
      form.reset()
    },
  })

  return (
    <>
      {children}

      <CustomDialog
        open={openDialog}
        onClose={cancelNavigation}
        onConfirm={confirmNavigation}
        title='Descartar cambios'
        content='¿Está seguro que desea descartar los cambios realizados?'
      />
    </>
  )
}

export default FormWrapper