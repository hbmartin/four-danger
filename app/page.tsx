"use client";

import { GameList } from "@/components/game-list";
import { LoginForm } from "@/components/login-form";
import { getNameLS, saveNameLS } from "@/lib/database";
import { useEffect, useState } from "react";


export default function Home() {
  const [name, setName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setName(getNameLS());
    setIsLoading(false);
  }, []);

  const handleLogin = (name: string) => {
    if (name.trim().length > 1) {
      setName(name);
      saveNameLS(name);
    }
  };

  if (isLoading) { return <div></div>; }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {name == null ? (
        <LoginForm loginClick={handleLogin} />
      ) : (
        <GameList name={name!} />
      )}
    </main>
  );
}
