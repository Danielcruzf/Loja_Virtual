import { configureStore, legacy_createStore } from "@reduxjs/toolkit";
import counterReducer, { counterSlice } from "../../features/contact/CounterReducer";
import { useDispatch, useSelector } from "react-redux";
import { catalogApi } from "../../features/catalog/CatalogApi";
import { uiSlice } from "../layout/uiSlice";
import { errorApi } from "../../features/about/erroApi";
import { basketApi } from "../../features/basket/basketApi";


export function configuretheStore() {
    return legacy_createStore(counterReducer);
}
export const store = configureStore({
    reducer: {
        [catalogApi.reducerPath]: catalogApi.reducer,
        [errorApi.reducerPath]: errorApi.reducer,
        [basketApi.reducerPath]: basketApi.reducer,
        counter: counterSlice.reducer,
        ui: uiSlice.reducer

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            catalogApi.middleware, errorApi.middleware,
            basketApi.middleware
        )
    // essa linha adiciona o middleware do RTK Query
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
