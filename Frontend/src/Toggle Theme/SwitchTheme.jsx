import React, { useState, useEffect, useRef } from 'react';
import { IconMoon, IconSun } from './Icons';

export default function SwitchTheme() {
  const [theme, setTheme] = useState(() => {
    if (localStorage.getItem('userTheme')) {
      return localStorage.getItem('userTheme');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    } else {
      return 'light';
    }
  });

  const [animate, setAnimate] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    localStorage.setItem('userTheme', theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const switchTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    if (
      !ref.current ||
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTheme(newTheme);
      setAnimate(true);
      return;
    }

    document.startViewTransition(() => {
      setTheme(newTheme);
      setAnimate(true);
    }).ready.then(() => {
      const { top, left, width, height } = ref.current.getBoundingClientRect();
      const x = left + width / 2;
      const y = top + height / 2;
      const right = window.innerWidth - left;
      const bottom = window.innerHeight - top;
      const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 1000,
          easing: "linear",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  useEffect(() => {
    if (animate) {
      const timeout = setTimeout(() => setAnimate(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [animate]);

  return (
    <div>
      <button
        className=" data-[state=checked]:bg-slate-800"
        onClick={switchTheme}
        ref={ref}
        aria-checked={theme === "dark"}
      >
        <div className={animate ? 'icon-enter' : '' } >
          {theme === "dark" ? <IconMoon /> : <IconSun />}
        </div>
      </button>
    </div>
  );
}
