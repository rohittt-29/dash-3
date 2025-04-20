import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home'
import Coins from './Coins'

const Body = () => {

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Home/>
        },
        {
            path:"/coins/:id",
            element:<Coins/>
        }
    ])
    
  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body
