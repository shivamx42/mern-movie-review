import {createBrowserRouter,RouterProvider} from "react-router-dom"

import Header from "./components/Header"
import Home from "./Pages/Home"
import About from "./Pages/About"
import Navbar from "./components/Navbar"
import MovieDetails from "./Pages/MovieDetails"

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
    },
    {
      path:'/movie/:id',
      element:(
        <>
        <Header/>
        <Navbar/>
        <MovieDetails/>
        </>
      )
    }
  ])

  return (
    <>
    <div className="bg-slate-200 dark:bg-slate-600">

      <RouterProvider router={router}/>
    </div>
    </>
  )
}

export default App
