import {createBrowserRouter,RouterProvider} from "react-router-dom"

import Header from "./components/Header"
import Home from "./Pages/Home"
import About from "./Pages/About"

function App() {

  const router=createBrowserRouter([
    {
      path:'/',
      element:(
        <>
        <Header/>
        <Home/>
        </>
      )
    },
    {
      path:'/about',
      element:(
        <>
        <Header/>
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
