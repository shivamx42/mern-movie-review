import React from 'react'
import { ThreeCircles } from 'react-loader-spinner';


export default function LoadingEffect({toTranslate}) {
  return (
    <div className={`flex items-center justify-center ${toTranslate?"-translate-y-32 h-screen":""}`}><ThreeCircles
    visible={true}
    height="40"
    width="40"
    color="#EF4444"
    ariaLabel="three-circles-loading"
    /></div>
  )
}
