"use client"

import { Board } from "@/components/board";
import Image from "next/image";
import { RealtimeChannel, createClient } from "@supabase/supabase-js";
import { useEffect, useRef } from "react";

const SUPABASE_URL = 'https://kdmheuzdtaqxkoczxocf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkbWhldXpkdGFxeGtvY3p4b2NmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEzNDc5OTEsImV4cCI6MjAzNjkyMzk5MX0.0L0eEUF6PUSE1Pj6nhGQ1EP2kUXY2Q1-5jLkGlFIT5M';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
const channel = supabase.channel('room_01')

export default function Home() {
  const isFirstRender = useRef(true);
  const subsChannel = useRef<RealtimeChannel | null>(null);
  useEffect(() => {
		if (isFirstRender.current) {
			subsChannel.current = channel
      .on(
        'broadcast',
        { event: 'test' },
        (payload) => console.log('payload', payload)
      )
      .subscribe(async (status) => {
        console.log('status', status);
				if (status !== "SUBSCRIBED") return;
			});
			isFirstRender.current = false;
		}
	}, []);
  const handleNoteAddition = () => {
    const result = subsChannel.current?.send({
      type: 'broadcast',
      event: 'test',
      payload: { message: 'hello, world' },
    })
	};

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={handleNoteAddition}>Send message</button>
      <Board />
    </main>
  );
}
