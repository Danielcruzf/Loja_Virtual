import { configureStore, legacy_createStore } from "@reduxjs/toolkit";
import counterReducer, { counterSlice } from "../../features/contact/CounterReducer";
import { useDispatch, useSelector } from "react-redux";
import { catalogApi } from "../../features/catalog/CatalogApi";
import { uiSlice } from "../layout/uiSlice";
import { errorApi } from "../../features/about/erroApi";
import { basketApi } from "../../features/basket/basketApi";
import { catalogSlice } from "../../features/catalog/catalogSlice";
import { accountApi } from "../../features/account/accountApi";
import { checkoutApi } from "../../features/checkout/checkoutApi";
import { orderApi } from "../../features/Orders/orderApi";


export function configuretheStore() {
    return legacy_createStore(counterReducer);
}
export const store = configureStore({
  reducer: {
    [catalogApi.reducerPath]: catalogApi.reducer,
    [errorApi.reducerPath]: errorApi.reducer,
    [basketApi.reducerPath]: basketApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [checkoutApi.reducerPath]: checkoutApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    counter: counterSlice.reducer,
    ui: uiSlice.reducer,
    catalog: catalogSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      catalogApi.middleware,
      errorApi.middleware,
      basketApi.middleware,
      accountApi.middleware,
      checkoutApi.middleware,
      orderApi.middleware
    ),
  // essa linha adiciona o middleware do RTK Query
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

/*
O código apresentado configura a store do Redux para uma aplicação React utilizando Redux Toolkit, 
que simplifica bastante o setup e a manutenção do estado global. 
Ele importa diversos reducers e middlewares de diferentes partes da aplicação, 
como recursos de catálogo, carrinho, autenticação, pedidos, entre outros, e os registra na store principal. 
O método configureStore do Redux Toolkit é utilizado para criar a store moderna, 
enquanto legacy_createStore é usado apenas em uma função auxiliar (configuretheStore), 
provavelmente para compatibilidade ou testes, mas não é o método recomendado atualmente.

No objeto passado para configureStore, o campo reducer define como o estado global será dividido entre os diferentes
slices e APIs. Cada API criada com RTK Query (como catalogApi, errorApi, etc.) 
adiciona seu próprio reducer e middleware, permitindo gerenciamento eficiente de dados assíncronos e cache. 
Os slices tradicionais (counter, ui, catalog) também são incluídos, cada um responsável por uma parte específica do estado.

O middleware padrão do Redux Toolkit é estendido com os middlewares das APIs, 
garantindo que as funcionalidades de RTK Query, como cache e invalidação automática, 
funcionem corretamente. Isso é feito através do método concat, 
que adiciona os middlewares extras ao pipeline padrão.


As definições de tipo RootState e AppDispatch são criadas para fornecer tipagem forte ao estado global e à função de dispatch, 
facilitando o uso do TypeScript e prevenindo erros comuns. Por fim, 
useAppDispatch e useAppSelector são hooks customizados que utilizam esses tipos, 
permitindo que componentes React acessem o estado e o dispatch de forma tipada e segura, 
melhorando a experiência de desenvolvimento e a robustez do código.

*/