"use client"

import { Board } from "@/components/board";
import { setupDB } from "@/lib/database";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Home() {
  const isFirstRender = useRef(true);
  useEffect(() => {
    setupDB();
	}, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Board />
    </main>
  );
}
