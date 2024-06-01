import React from 'react'
import { ThreeCircles } from 'react-loader-spinner';


export default function LoadingEffect() {
  return (
    <div><ThreeCircles
    visible={true}
    height="40"
    width="40"
    color="black"
    ariaLabel="three-circles-loading"
    /></div>
  )
}
