import { FormControl, FormHelperText, InputLabel, MenuItem } from "@mui/material";
import { UseControllerProps, useController, FieldValues } from "react-hook-form";
import Select, { SelectProps } from "@mui/material/Select";

type Props<T extends FieldValues> = {
  label: string;
    name: keyof T;
    items: string[];
} & UseControllerProps<T> & Partial<SelectProps>;// SelectInputProps troquei pois estava dando erro na exportação

export default function AppSelectInput<T extends FieldValues>(props: Props<T>) 
{
  const { fieldState, field } = useController({ ...props});

  return (
    <FormControl fullWidth error={!!fieldState.error}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        value={field.value || ""}
        label={props.label}
        onChange={field.onChange}
      >
        {props.items.map((item, index) => (
          <MenuItem value={item} key={index}>
            {item}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{fieldState.error?.message}</FormHelperText>
    </FormControl>
  );

}
