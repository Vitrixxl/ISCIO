"use client";
import FormCandidate from "@/components/Candidature/FormCandidate";
import FormProgressBar from "@/components/Candidature/FormProgressBar";
import { useState, createContext, ReactNode } from "react";
import { motion as m } from "framer-motion";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import Button from "@/components/Button";

type CandidatureContextType = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  formData: {
    cursus: number | null;
    formation: number | null;
    alternance: boolean;
    email: string | null;
    phone: string | null;
    firstname: string | null;
    name: string | null;
    birthdate: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      cursus: number | null;
      formation: number | null;
      alternance: boolean;
      email: string | null;
      phone: string | null;
      firstname: string | null;
      name: string | null;
      birthdate: string;
    }>
  >;
};

export const CandidatureContext = createContext<CandidatureContextType | null>(null);

export default function Candidature() {
  const [step, setStep] = useState<number>(1);

  const [formData, setFormData] = useState<{
    cursus: number | null;
    formation: number | null;
    alternance: boolean;
    email: string | null;
    phone: string | null;
    firstname: string | null;
    name: string | null;
    birthdate: string;
  }>({
    cursus: null,
    formation: null,
    alternance: false,
    email: null,
    phone: null,
    firstname: null,
    name: null,
    birthdate: "",
  });

  const handleNextForm = () => {
    if (step === 1 && (formData.cursus === null || formData.formation === null)) return;
    if (step === 2 && formData.alternance === null) return;
    if (step === 3 && (formData.email === "" || formData.phone === "" || formData.firstname === "" || formData.name === "" || formData.birthdate === "")) return;
    setStep(step + 1);
  };

  const handlePrevForm = () => {
    if (step > 1) setStep(step - 1);
  };
  const sendForm = () => {
    console.log(formData);
  };

  return (
    <CandidatureContext.Provider value={{ step, formData, setFormData, setStep }}>
      <div className="w-full flex-grow h-full grid grid-cols-12 bg-white">
        <div className="col-span-4 w-full col-start-5 mx-auto flex flex-col items-center justify-center h-full gap-10">
          <h1 className="text-3xl font-semibold bg-gradient-to-tr from-blue-i to-green-i bg-clip-text">
            <span className="text-transparent">Candidature</span>
          </h1>
          <div className="flex flex-col gap-4 w-full">
            <FormProgressBar />
            <div className="w-full bg-foreground rounded-3xl p-8 h-96 flex flex-col">
              <FormCandidate />
              <div className={"w-full flex justify-between flex-shrink-0" + (step !== 1 ? "" : " flex-row-reverse")}>
                {step !== 1 && (
                  <button onClick={handlePrevForm} className="text-gray-500 font-it italic px-2 py-1 flex items-center gap-2">
                    <FaArrowLeft /> Précédent
                  </button>
                )}
                {step === 3 ? (
                  <Button
                    label="Envoyer"
                    loading={false}
                    onClick={() => {
                      sendForm();
                    }}
                  />
                ) : (
                  <button onClick={handleNextForm} className="text-gray-500 font-it italic px-2 py-1 flex items-center gap-2">
                    Suivant <FaArrowRight />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CandidatureContext.Provider>
  );
}
