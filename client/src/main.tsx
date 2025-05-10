import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/layout/styles.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { RouterProvider } from 'react-router-dom'
import { routes } from './app/routes/Routes';
import { configureStore } from './app/store/Stores'
import { Provider } from 'react-redux';
const store = configureStore();

console.log(store.getState());



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={routes}  />
    </Provider>
  </StrictMode>,
)

