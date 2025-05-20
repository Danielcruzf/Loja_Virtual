import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import { useGet404ErrorQuery, useGet500ErrorQuery,useGet400ErrorQuery,useGet401ErrorQuery, useGetValidationErrorQuery } from "./erroApi";

export default function AboutPage() {
  const get400Error = useGet400ErrorQuery();
  const get401Error = useGet401ErrorQuery();
  const get404Error = useGet404ErrorQuery();
  const get500Error = useGet500ErrorQuery();
  const getValidationError = useGetValidationErrorQuery();

  return (
    <Container maxWidth="lg">
      <Typography gutterBottom variant="h3">Erros for testing
      </Typography>
      <ButtonGroup>
        <Button variant="contained" onClick={() => get400Error.refetch().catch(err => console.log(err))}>Test 400 Error</Button>
         <Button variant="contained" onClick={() => get401Error.refetch().catch(err => console.log(err))}>Test 401 Error</Button>
          <Button variant="contained" onClick={() => get404Error.refetch().catch(err => console.log(err))}>Test 404 Error</Button>
        <Button variant="contained" onClick={() => get500Error.refetch().catch(err => console.log(err))}>Test 500 Error</Button>
        <Button variant="contained" onClick={() => getValidationError.refetch().unwrap().catch(err => console.log(err))}>Test Validation Error</Button>
      </ButtonGroup>
    </Container>
  )
}
