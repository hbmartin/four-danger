"use client";

import { AddToHomeTooltip } from "@/components/add-to-home-tooltip";
import { GameList } from "@/components/game-list";
import { LoginForm } from "@/components/login-form";
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

  const showInstallMessage = useMemo(() => {
    const isIos = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase())
    const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator.standalone)
    return isIos && !isInStandaloneMode
  }, [window.navigator])

  if (isLoading) { return <div></div>; }

  return (
    <main className="flex min-h-full flex-col items-center justify-between md:px-24">
      {name == null ? (
        <LoginForm loginClick={handleLogin} />
      ) : (
        <GameList name={name!} />
      )}
      {showInstallMessage && <AddToHomeTooltip />}
    </main>
  );
}
