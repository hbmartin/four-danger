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
        saveNameLS(name);
        setName(name);
      }
    };
  
    if (isLoading) { return <div></div>; }
  
    return (
      <main className="flex flex-col items-center justify-between md:px-24">
        {name == null ? (
          <LoginForm loginClick={handleLogin} />
        ) : (
          <GameController id={params.slug} name={name} />
        )}
      </main>
    );
}
