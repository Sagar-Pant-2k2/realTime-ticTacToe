import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import CreateRoom from './pages/CreateRoom'
import GamePage from './pages/GamePage'
import HomePage from './pages/HomePage'
import Layout from './pages/Layout'
import JoinRoom from './pages/JoinRoom'
import { SocketProvider } from './SocketContext'
import { GameContextProvider } from './GameContext'


const router = createBrowserRouter([
  {
    path: "/", element: <Layout />, children: [
      { path: "/", element: <HomePage /> },
      { path: "/createRoom", element: <CreateRoom /> },
      { path: "/joinRoom", element: <JoinRoom /> },
      { path: "/game", element: <GamePage /> }
    ]
  }

])

export default () => {

  return (
    <SocketProvider>
      <GameContextProvider>
        <RouterProvider router={router}></RouterProvider>
      </GameContextProvider>
    </SocketProvider>
  )
}