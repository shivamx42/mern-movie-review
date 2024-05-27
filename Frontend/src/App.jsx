import {createBrowserRouter,RouterProvider} from "react-router-dom"

import Header from "./components/Header"
import Home from "./Pages/Home"
import About from "./Pages/About"
import Navbar from "./components/Navbar"

function App() {

  const router=createBrowserRouter([
    {
      path:'/',
      element:(
        <>
        <Header/>
        <Navbar/>
        <Home/>
        </>
      )
    },
    {
      path:'/about',
      element:(
        <>
        <Header/>
        <Navbar/>
        <About/>
        </>
      )
    }
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
