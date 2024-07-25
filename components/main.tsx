"use client"

import { Board } from "@/components/board";
import Image from "next/image";
import { RealtimeChannel, createClient } from "@supabase/supabase-js";
import { useEffect, useRef } from "react";


export default function Main() {
  const isFirstRender = useRef(true);
  const subsChannel = useRef<RealtimeChannel | null>(null);
  useEffect(() => {
		if (isFirstRender.current) {

			isFirstRender.current = false;
		}
	}, []);


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={handleNoteAddition}>Send message</button>
      <Board />
    </main>
  );
}
