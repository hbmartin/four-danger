"use client"

import { GameList } from "@/components/game-list";
import { LoginForm } from "@/components/login-form";
import { getNameLS, saveNameLS } from "@/lib/database";
import { GameState } from "@/lib/models";
import { useState } from "react";


export default function Home() {
  const [name, setName] = useState<string | null>(getNameLS());

  var mainComponent;
  if (name !== null) {
    mainComponent = <GameList name={name} />
  } else {
    mainComponent = <LoginForm loginClick={(name: string) => {
      if (name.length > 1) {
        setName(name);
        saveNameLS(name);
        mainComponent = <GameList name={name} />
      }
    }} />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {mainComponent}
    </main>
  );
}
