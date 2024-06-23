"use client";
import Button from "../../components/Button";
import React from "react";
import { useRouter } from "next/navigation";
export default function ComponentName() {
  const router = useRouter();
  return (
    <div className="h-full flex flex-col gap-10 flex-grow bg-white items-center justify-center">
      <h1 className="text-3xl text-blue-i">
        Votre formulaire a bien été envoyé !
      </h1>
      <Button label="Revenir a l'accueil" onClick={() => router.push("/")} />
    </div>
  );
}
