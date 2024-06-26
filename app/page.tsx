"use client";
import FormCandidate from "@/components/Candidature/FormCandidate";
import FormProgressBar from "@/components/Candidature/FormProgressBar";
import { useState, createContext, ReactNode, useEffect } from "react";
import { motion as m } from "framer-motion";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import Button from "@/components/Button";
import { formHandler } from "./action/form-action";
import { useRouter } from "next/navigation";
type CandidatureContextType = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  formData: {
    formation: { sigle: string; id: number }[];

    email: string | null;
    phone: string | null;
    firstname: string | null;
    name: string | null;
    birthdate: string;
    known:
      | "Bouche à oreille"
      | "Réseaux sociaux"
      | "Parcoursup"
      | "Autre"
      | "Salon/Forum"
      | "Entourage"
      | string
      | null;
    prevFormation: {
      Etablissement: string;
      Ville: string;
      CodePostal: string;
    } | null;
    allowed: boolean;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      firstname: string | null;
      name: string | null;
      email: string | null;
      phone: string | null;
      formation: { sigle: string; id: number }[];

      birthdate: string;
      known:
        | "Bouche à oreille"
        | "Réseaux sociaux"
        | "Parcoursup"
        | "Autre"
        | "Salon/Forum"
        | "Entourage"
        | string
        | null;
      prevFormation: { Etablissement: ""; Ville: ""; CodePostal: "" };
      allowed: boolean;
    }>
  >;
};

export const CandidatureContext = createContext<CandidatureContextType | null>(
  null
);

export default function Candidature() {
  const [step, setStep] = useState<number>(1);
  const router = useRouter();

  const [formData, setFormData] = useState<{
    formation: { sigle: string; id: number }[];

    email: string | null;
    phone: string | null;
    firstname: string | null;
    name: string | null;
    birthdate: string;
    known:
      | "Bouche à oreille"
      | "Réseaux sociaux"
      | "Parcoursup"
      | "Autre"
      | "Salon/Forum"
      | "Entourage"
      | string
      | null;
    prevFormation: {
      Etablissement: string;
      Ville: string;
      CodePostal: string;
    } | null;
    allowed: boolean;
  }>({
    firstname: null,
    name: null,
    email: null,
    phone: null,
    formation: [],

    birthdate: "",
    known: null,
    prevFormation: { Etablissement: "", Ville: "", CodePostal: "" } as {
      Etablissement: "";
      Ville: "";
      CodePostal: "";
    },
    allowed: false,
  });

  const handleNextForm = () => {
    if (step === 1 && formData.formation.length === 0) {
      console.log("test");
      return;
    }

    if (
      step === 2 &&
      (formData.email === "" ||
        formData.phone === "" ||
        formData.firstname === "" ||
        formData.name === "" ||
        formData.birthdate === "")
    ) {
      console.log(formData);
      return;
    }

    if (
      step === 3 &&
      (formData.prevFormation?.CodePostal == "" ||
        formData.prevFormation?.Etablissement == "" ||
        formData.prevFormation?.Ville == "")
    ) {
      return;
    }
    setStep(step + 1);
  };
  const currentVerify = () => {
    if (step === 1 && formData.formation.length === 0) return;

    if (
      step === 2 &&
      (formData.email === "" ||
        formData.phone === "" ||
        formData.firstname === "" ||
        formData.name === "" ||
        formData.birthdate === "")
    )
      return;
    return true;
  };
  const handlePrevForm = () => {
    if (step > 1) setStep(step - 1);
  };
  const sendForm = async () => {
    //@ts-ignore
    delete formData.alternance;
    console.log(formData.alternance);
    const res = await formHandler(formData);
    if (res.success) {
      alert("Formulaire envoyé");
    } else {
      alert("Erreur lors de l'envoi du formulaire");
    }
  };
  useEffect(() => {
    console.log(formData.prevFormation);
  }, [formData]);
  return (
    <CandidatureContext.Provider
      // @ts-ignore
      value={{ step, formData, setFormData, setStep }}
    >
      <div className="w-full flex-grow h-full grid grid-cols-12 bg-white">
        <div className="col-span-6 w-full col-start-4 mx-auto flex flex-col items-center justify-center h-full gap-10">
          <h1 className="text-3xl font-semibold bg-gradient-to-tr from-blue-i to-green-i bg-clip-text">
            <span className="text-transparent">Candidature</span>
          </h1>
          <div className="flex flex-col gap-4 w-full">
            <FormProgressBar stepping={step} />
            <div className="w-full bg-gray-200 rounded-3xl p-8 h-96 flex flex-col flex-shrink-0">
              <FormCandidate />
              <div
                className={
                  "w-full flex justify-between flex-shrink-0 " +
                  (step !== 1 ? "" : " flex-row-reverse")
                }
              >
                {step !== 1 && (
                  <button
                    onClick={handlePrevForm}
                    className="text-gray-500 font-it italic px-2 py-1 flex items-center gap-2"
                  >
                    <FaArrowLeft /> Précédent
                  </button>
                )}
                {step === 4 && currentVerify() ? (
                  <Button
                    label="Envoyer"
                    loading={false}
                    onClick={async () => {
                      if (formData.allowed) {
                        await sendForm();
                        router.push("/done");
                      }
                    }}
                  />
                ) : (
                  formData.formation.length > 0 && (
                    <button
                      onClick={handleNextForm}
                      className="text-gray-500 font-it italic px-2 py-1 flex items-center gap-2"
                    >
                      Suivant <FaArrowRight />
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CandidatureContext.Provider>
  );
}
