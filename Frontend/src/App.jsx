import {createBrowserRouter,RouterProvider} from "react-router-dom"

import Home from "./Pages/Home"
import About from "./Pages/About"
import MovieDetails from "./Pages/MovieDetails"
import Layout from "./Pages/Layout"
import SearchMovie from "./Pages/SearchMovie"
import Account from "./Pages/Account"
import PrivateRoute from "./components/PrivateRoute"
import ProfileComplete from "./components/ProfileComplete"
import ReviewPrivateRoute from "./components/ReviewPrivateRoute"
import AddReview from "./components/AddReview"
import Header from "./components/Header"
import ShowOneReview from "./Pages/ShowOneReview"
import { Helmet } from "react-helmet"


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
        <Header/>
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
    },
    {
      path:'/addReview/:movieID',
      element:<ReviewPrivateRoute/>,
      children:[
        {path: "/addReview/:movieID",element: <AddReview/>}
      ]
    },
    {
      path:'/showReview',
      element:(

      <>
        <Layout/>
        <ShowOneReview/>
      </>
      )
      
    }
  ])

  return (
    <>
    <div className="bg-slate-200 dark:bg-[#121111] min-h-screen">
      <Helmet>
          <title>FilmGalaxy</title>
        </Helmet>
      <RouterProvider router={router}/>
    </div>
    </>
  )
}

export default App
