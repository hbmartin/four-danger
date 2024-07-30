"use client";

import { GameList } from "@/components/game-list";
import { LoginForm } from "@/components/login-form";
import { Tooltip } from "@/components/tooltip";
import { getNameLS, saveNameLS } from "@/lib/database";
import { useEffect, useMemo, useState } from "react";


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

  const showInstallMessage = () => {
    const isIos = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase())
    const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator.standalone)
    return isIos && !isInStandaloneMode
  }

  if (isLoading) { return <div />; }

  return (
    <main className="flex min-h-full flex-col items-center justify-between md:px-24">
      {name ? (
        <GameList name={name} />
      ) : (
        <LoginForm loginClick={handleLogin} />
      )}
      {showInstallMessage() && <Tooltip message="Tap the share button &rarr; scroll down to the 2nd section &rarr; tap &ldquo;Add to Home Screen&rdquo; [+]." />}
    </main>
  );
}
