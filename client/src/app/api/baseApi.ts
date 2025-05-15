import { BaseQueryApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { StartLoading } from "../layout/uiSlice";

  
const cusotmBaseQuery = fetchBaseQuery({
    baseUrl: "https://localhost:5001/api"  
});

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

 export const baseQueryWithErrorHandling = async (args: string|FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    api.dispatch(StartLoading());
    await sleep();
    const result = await cusotmBaseQuery(args, api, extraOptions);
    api.dispatch(StartLoading());
    
    if (result.error) {
        const{status, data} = result.error;
        console.log(status, data);
    }

     return result;
 }



 