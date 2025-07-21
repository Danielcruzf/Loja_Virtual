import { UploadFile } from "@mui/icons-material";
import { FormControl, Typography, FormHelperText } from "@mui/material";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UseControllerProps, useController, FieldValues } from "react-hook-form";

type Props<T extends FieldValues> = {
    name: keyof T
} & UseControllerProps<T>

export default function AppDropzone<T extends FieldValues>(props: Props<T>) {
  const { fieldState, field } = useController({ ...props });
  

 const onDrop = useCallback(
   (acceptedFiles: File[]) => {
     if (acceptedFiles.length > 0) {
       const fileWithPreview = Object.assign(acceptedFiles[0], {
         preview: URL.createObjectURL(acceptedFiles[0]),
       });

       field.onChange(fileWithPreview);
     }
   },
   [field]
 );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const dzStyles = {
    display: "flex",
    border: "dashed 3px #eee",
    borderColor: "#eee",
    borderRadius: "5px",
    paddingTop: "20px",
    alignItems: "center",
    height: 150,
    width: 300,
  };

  const dzActive = {
    borderColor: "green",
  };


 return (
   <div {...getRootProps()}>
     <FormControl
       style={isDragActive ? { ...dzStyles, ...dzActive } : dzStyles}
       error={!!fieldState.error}
     >
       <input {...getInputProps()} />
       <UploadFile sx={{ fontSize: "80px" }} />
       <Typography variant="h6">Drop image here</Typography>
       <FormHelperText>{fieldState.error?.message}</FormHelperText>
     </FormControl>
   </div>
 );

}
