import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, Typography }
  from "@mui/material";
import { useLazyGet400ErrorQuery, useLazyGet401ErrorQuery, useLazyGet404ErrorQuery, useLazyGet500ErrorQuery, useLazyGetValidationErrorQuery } from "./erroApi";
import { useState } from "react";

export default function AboutPage() {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [trigger400Error] = useLazyGet400ErrorQuery();
  const [trigger401Error] = useLazyGet401ErrorQuery();
  const [trigger404Error] = useLazyGet404ErrorQuery();
  const [trigger500Error] = useLazyGet500ErrorQuery();
  const [triggerValidationError] = useLazyGetValidationErrorQuery();

  const getVationError = async () => {
    try {
      await triggerValidationError().unwrap();
    }
    catch (error: unknown) {
      if (error && typeof error === 'object' && 'message' in error && typeof (error as { message: unknown }).message === 'string') {
        const errorArray = (error as { message: string }).message.split(', ');
        setValidationErrors(errorArray);
      }
    }
  }
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        About Page
      </Typography>
      <ButtonGroup>
        <Button onClick={() => trigger400Error().catch(err => console.log(err))}>Trigger 400 Error</Button>
        <Button onClick={() => trigger401Error().catch(err => console.log(err))}>Trigger 401 Error</Button>
        <Button onClick={() => trigger404Error().catch(err => console.log(err))}>Trigger 404 Error</Button>
        <Button onClick={() => trigger500Error().catch(err => console.log(err))}>Trigger 500 Error</Button>
        <Button onClick={getVationError}>Trigger Validation Error</Button>
      </ButtonGroup>
      {validationErrors.length > 0 && (
        <Alert severity="error">
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validationErrors.map((err: string) => (
              <ListItem key={err}>{err}</ListItem>
            ))}
          </List>
        </Alert>
      )}
    </Container>
  )
}
