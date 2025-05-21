import { BaseQueryApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { StartLoading, StopLoading } from "../layout/uiSlice";
import { toast } from "react-toastify";


const cusotmBaseQuery = fetchBaseQuery({
    baseUrl: "https://localhost:5001/api"
});
type ErroResponse= |string|{
title: string}|{errors:string[]};


const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));

export const baseQueryWithErrorHandling = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    api.dispatch(StartLoading());
    await sleep();
    const result = await cusotmBaseQuery(args, api, extraOptions);
    api.dispatch(StopLoading());

    if (result.error) {
        console.log(result.error);
        const originalStatus = result.error.status==='PARSING_ERROR' && result.error.originalStatus? result.error.originalStatus : result.error.status;
const responseData = result.error.data as ErroResponse;
        switch (originalStatus) {
            case 400:
                if (typeof responseData === 'string')toast.error(responseData);
                else if('errors' in responseData)
                {
                throw Object.values(responseData.errors).flat().join(',');
                }
                else toast.error(responseData.title);
                break;
            case 401:
                 if (typeof responseData === 'string')toast.error(responseData);
                else if('errors' in responseData)
                {
                throw Object.values(responseData.errors).flat().join(',');
                }
                else toast.error(responseData.title);
                break;

                case 404:
                if (typeof responseData === 'object'&&'title' in responseData)toast.error(responseData.title)
                break;
                
                case 500:
                 if (typeof responseData === 'object'&&'title' in responseData)toast.error(responseData.title)
                break;
            default:
                break;
        }

      
    }

    return result;
};