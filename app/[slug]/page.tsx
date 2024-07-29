"use client";

import { GameController } from "@/components/game-controller";
import { LoginForm } from "@/components/login-form";
import { getNameLS, saveNameLS } from "@/lib/database";
import { useEffect, useState } from "react";

export default function GamePage({ params }: { params: { slug: string } }) {
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
      <main className="flex min-h-screen flex-col items-center justify-between px-24">
        {name == null ? (
          <LoginForm loginClick={handleLogin} />
        ) : (
          <GameController id={params.slug} name={name} />
        )}
      </main>
    );
}

function loadGameFromDB(slug: string) {
    throw new Error("Function not implemented.");
}
