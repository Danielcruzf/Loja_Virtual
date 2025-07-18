import { TextFieldProps, TextField } from "@mui/material";
import { UseControllerProps, useController, FieldValues } from "react-hook-form";

type Props<T extends FieldValues> = {
  label: string
    name: keyof T
} & UseControllerProps<T> &
  TextFieldProps

export default function AppTextInput<T extends FieldValues>(props: Props<T>) {
  const { fieldState, field } = useController({ ...props});

  return (
    <TextField
      {...props}
      {...field}
      multiline={props.multiline}
      rows={props.rows}
      type={props.type}
      fullWidth
      value={field.value || ''}
      variant="outlined"
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    />
  )
}
