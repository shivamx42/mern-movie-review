import React, { useEffect, useState } from 'react'

export default function ShowBackground({children}) {
    const [bgImage, setBgImage] = useState("/img5.jpg");
    
    useEffect(() => {
      const images = [
        "/img1.jpg", "/img2.jpg", "/img3.jpg", "/img4.jpg", 
        "/img5.jpg", "/img6.jpg", "/img7.jpg", "/img8.jpg", 
        "/img9.jpg", "/img10.jpg"
      ];
  
      const preloadImage = (src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
        });
      };
  
      const changeBackgroundImage = async () => {
        const randomImage = images[Math.floor(Math.random() * images.length)];
        await preloadImage(randomImage);
        setBgImage(randomImage);
      };
  
      const intervalId = setInterval(changeBackgroundImage, 12000);
  
      return () => clearInterval(intervalId);
    }, []);
  
    return (
      <div className="relative flex items-center justify-center min-h-screen">
        <div
          style={{
            backgroundImage: `url(${bgImage})`,
            transition: "background-image ease-in-out",
            transitionDuration:"4.3s",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: 1,
            
          }}
        />
        <div style={{ position: "relative", zIndex: 2 }}>
          {children}
        </div>
      </div>
    );
  };
