import { useDispatch, useSelector } from "react-redux"
import { CounterState } from "./counterReducer"
import { Button, ButtonGroup, Typography } from "@mui/material"

export default function ContactPage() {
  const data = useSelector((state: CounterState) => state.data)
  const dispatch = useDispatch();
  return (
    <>
    <Typography variant="h2" >
      contact page
    </Typography>
    <Typography variant="body1">
      the data is:{data}
    </Typography>
    <ButtonGroup>
      <Button color="error" onClick={() => dispatch({ type: "increment"  })}>Increment</Button>
      <Button color="secondary" onClick={() => dispatch({ type: "decrement" })}>Decrement</Button>
    </ButtonGroup>
    </>
  )
}