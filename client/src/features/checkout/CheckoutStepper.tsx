import { Box, Button, Paper, Step, StepLabel, Stepper } from "@mui/material";
import { useState } from "react";

const steps = ["andress", "payment", "review"]; // Define os passos do checkout

export default function CheckoutStepper() {
  const [activeStep, setActiveStep] = useState(0); // Define o estadua inicial

  const handleNext = () => {
    setActiveStep((step) => step + 1); // Incrementa o passo ativo
  };

  const handleBack = () => {
    setActiveStep((step) => step - 1); // Decrementa o passo ativo
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: activeStep === 0 ? "block" : "none" }}>
          Adress step
        </Box>
        <Box sx={{ display: activeStep === 1 ? "block" : "none" }}>
          Payment step
        </Box>
        <Box sx={{ display: activeStep === 2 ? "block" : "none" }}>
          Review step
        </Box>
      </Box>
      <Box display="flex" paddingTop={2} justifyContent="space-between" >
        <Button onClick={handleBack}>Back</Button>
        <Button onClick={handleNext}>Next</Button>
      </Box>
    </Paper>
  );
}
  
 
