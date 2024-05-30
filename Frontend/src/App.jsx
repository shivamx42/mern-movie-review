import {createBrowserRouter,RouterProvider} from "react-router-dom"

import Home from "./Pages/Home"
import About from "./Pages/About"
import MovieDetails from "./Pages/MovieDetails"
import Layout from "./Pages/Layout"
import SearchMovie from "./Pages/SearchMovie"
import Account from "./Pages/Account"
import PrivateRoute from "./components/PrivateRoute"
import ProfileComplete from "./components/ProfileComplete"


function App() {

  const router=createBrowserRouter([
    {
      path:'/',
      element:(
        <>
        <Layout/>
        <Home/>
        </>
      )
    },
    {
      path:'/about',
      element:(
        <>
        <Layout/>
        <About/>
        </>
      )
    },
    {
      path:'/movie/:id',
      element:(
        <>
        <Layout/>
        <MovieDetails/>
        </>
      )
    },
    {
      path:'/search/:searchTerm',
      element:(
        <>
        <Layout/>
        <SearchMovie/>
        </>
      )
    },
    {
      path:'/account',
      element:(
        <>
        <Account/>
        </>
      )
    },
    {
      path:'/profile',
      element:<PrivateRoute/>,
      children:[
        {path: "/profile",element: <ProfileComplete/>}
      ]
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
