"use client";

import { SmoothScroll } from "./SmoothScroll";
import { CustomCursor } from "./CustomCursor";
import { SideRail } from "./SideRail";
import { Menu } from "./Menu";
import { PageTransition } from "./PageTransition";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <Menu />
      <SideRail />
      <main>
        <PageTransition>{children}</PageTransition>
      </main>
    </>
  );
}
