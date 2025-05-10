import { createSlice } from "@reduxjs/toolkit"

export type CounterState = {//tipo do estado do reducer
    data: number
}
const initialState: CounterState =//estado inicial do reducer
{
    data: 42
}
export const counterSlice=createSlice ({
    name: "counter",
    initialState,
    reducers: {
        increment: (state, action) => {
            state.data += action.payload
        },
        decrement: (state, action) => {
            state.data -= action.payload
        }
    }
})
//exportando as ações do reducer
export const {increment, decrement} = counterSlice.actions; 
//ação de incremento
export function incrementLegacy(amount=1)
{
    return { type: "increment", payload: amount }
        
}
//ação de decremento
export function decrementLegacy(amount=1)
{
    return { type: "decrement", payload: amount }
        
}




export default function counterReducer(state = initialState, action: { type: string , payload:number}) //ação de incremento e decremento 
{
    switch (action.type) {
        case "increment":
            return{
            ...state,
            data: state.data + action.payload
            };
        case "decrement":
              return{
            ...state,
            data: state.data - action.payload
            };
            break;
        default:
            return state;

    }
    
} 