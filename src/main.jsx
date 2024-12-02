import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import {trelloStore} from './store/trelloStore.js'
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TrelloBoardSpace from './components/TrelloBoardSpace.jsx';
import TrelloBoardInternal from './components/InternalBoard/TrelloBoardInternal.jsx';


const router = createBrowserRouter([
  {path: "/", element: <App />, children: [
    {
      path: "/", element: <TrelloBoardSpace />
    },
    {
      path: "/board/:boardId", element: <TrelloBoardInternal />
    }
  ]}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={trelloStore}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
