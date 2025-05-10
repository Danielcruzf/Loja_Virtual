import { useAppDispatch, useAppSelector } from "../../app/store/Stores";
import {  decrement, increment } from "./counterReducer"
import { Button, ButtonGroup, Typography } from "@mui/material"

export default function ContactPage() {
  const {data} = useAppSelector(state=> state.counter);
  const dispatch = useAppDispatch();
  return (
    <>
    <Typography variant="h2" >
      contact page
    </Typography>
    <Typography variant="body1">
      the data is:{data}
    </Typography>
    <ButtonGroup>
      <Button color="error" onClick={() => dispatch(decrement(1))}>Decrement</Button>
      <Button color="secondary" onClick={() => dispatch(increment(1))}>Increment</Button>
    </ButtonGroup>
    </>
  )
}