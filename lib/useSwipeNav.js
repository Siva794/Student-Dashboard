"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

const routes = [
  "/attendance",
  "/marks",
  "/dashboard",
  "/timetable",
  "/planner",
];

export default function useSwipeNav(pathname) {
  const router = useRouter();
  const touchStartX = useRef(0);

  const index = routes.indexOf(pathname);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;

    // swipe left
    if (diff > 60 && index < routes.length - 1) {
      router.push(routes[index + 1]);
    }

    // swipe right
    if (diff < -60 && index > 0) {
      router.push(routes[index - 1]);
    }
  };

  return { onTouchStart, onTouchEnd };
}