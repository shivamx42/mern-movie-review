import React, { useEffect, useState } from 'react'

export default function ShowBackground({children, showBlur}) {
    const [bgImage, setBgImage] = useState("/img5.jpg");

    useEffect(() => {
      const images = ["/img1.jpg", "/img2.jpg", "/img3.jpg", "/img4.jpg", "/img5.jpg", "/img6.jpg", "/img7.jpg", "/img8.jpg", "/img9.jpg", "/img10.jpg"];
      const changeBackgroundImage = () => {
        const randomImage = images[Math.floor(Math.random() * images.length)];
        setBgImage(randomImage);
      };
  
      const intervalId = setInterval(changeBackgroundImage, showBlur?30000:10000);
  
      return () => clearInterval(intervalId);
    }, []);
  
    return (
      <div className="relative flex items-center justify-center min-h-screen">
        <div
          style={{
            backgroundImage: `url(${bgImage})`,
            transition: "background-image ease-in-out",
            transitionDuration:showBlur?"10s":"4.3s",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: 1,
            filter: showBlur ? " grayscale(100%)" : "none",
            
          }}
        />
        <div style={{ position: "relative", zIndex: 2 }}>
          {children}
        </div>
      </div>
    );
  };