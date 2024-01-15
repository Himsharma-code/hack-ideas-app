// app/providers.tsx
"use client";

import { AppContextProvider } from "@/context/AppContext";
import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <AppContextProvider>{children}</AppContextProvider>
    </NextUIProvider>
  );
}
