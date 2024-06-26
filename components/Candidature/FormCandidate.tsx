"use client";
import { useContext, useEffect, useState } from "react";
import { motion as m, AnimatePresence } from "framer-motion";
import CheckPrimaryBtn from "../CheckPrimaryBtn";
import CheckSecondaryBtn from "../CheckSecondaryBtn";
import { CandidatureContext } from "@/app/page";
import { Input, DatePicker, Tooltip, DateInput } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import { CalendarDate } from "@internationalized/date";
export default function sFormCandidate() {
  const btss: { sigle: string; tooltip: string; id: number }[] = [
    {
      sigle: "SIO",
      tooltip: "Services Informatiques aux Organisations",
      id: 1,
    },
    {
      sigle: "NDRC",
      tooltip: "Négociation et Digitalisation de la Relation Client",
      id: 2,
    },
    { sigle: "MCO", tooltip: "Management Commercial Opérationnel", id: 3 },
    {
      sigle: "GPME",
      tooltip: "Gestion de Petites et Moyennes Entreprises",
      id: 4,
    },
  ];
  const bachelors: { sigle: string; tooltip: string; id: number }[] = [
    { sigle: "CS", tooltip: "Cyber-sécurité", id: 5 },
    { sigle: "DCG", tooltip: "Diplôme de comptabilité et de gestion", id: 6 },
    {
      sigle: "CMO",
      tooltip: "Commerce et Marketing Opérationnel",
      id: 7,
    },
  ];
  const context = useContext(CandidatureContext);
  if (!context)
    throw new Error(
      "You probably forgot to wrap your component with CandidatureContext.Provider"
    );

  const { step, formData, setFormData } = context;

  const handleInputForm3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDateChange = (date: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      birthdate: date,
    }));
  };

  const getCalendarDate = (date: string): string => {
    return date ? parseDate(date).toString() : "";
  };
  const [validEmail, setValidEmail] = useState(false);
  useEffect(() => {
    console.log(formData.known);
  }, [formData.known]);
  return (
    <form className="h-full">
      <AnimatePresence mode="wait">
        <div key={step} className="h-full">
          {step === 1 && (
            <m.div
              initial={{ opacity: 0, x: 99 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: "just" }}
              className="h-full"
            >
              <div className="flex justify-center items-center gap-10 flex-col h-full">
                <h2 className="text-black text-xl">Je candidate pour :</h2>
                <div className="space-y-8">
                  <div className="flex flex-col gap-2 items-center">
                    <h1 className="text-xl font-medium text-blue-i">BTS</h1>
                    <div className="flex gap-4">
                      {btss.map((value, index) => (
                        <CheckSecondaryBtn
                          key={value.sigle}
                          label={value.sigle}
                          tooltip={value.tooltip}
                          onClick={(e) => {
                            e.preventDefault();
                            const isPresent = formData.formation.some(
                              (item) => item.id === value.id
                            );
                            setFormData((prevFormData) => ({
                              ...prevFormData,
                              formation: isPresent
                                ? prevFormData.formation.filter(
                                    (item) => item.id !== value.id
                                  )
                                : [
                                    ...prevFormData.formation,
                                    { sigle: value.sigle, id: value.id },
                                  ],
                            }));
                          }}
                          active={formData.formation.some(
                            (item) => item.id === value.id
                          )}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-center">
                    <h1 className="text-xl font-medium text-blue-i">
                      Bachelors
                    </h1>
                    <div className="flex gap-4">
                      {bachelors.map((value, index) => (
                        <CheckSecondaryBtn
                          key={value.sigle}
                          label={value.sigle}
                          tooltip={value.tooltip}
                          onClick={(e) => {
                            e.preventDefault();
                            const isPresent = formData.formation.some(
                              (item) => item.id === value.id
                            );
                            setFormData((prevFormData) => ({
                              ...prevFormData,
                              formation: isPresent
                                ? prevFormData.formation.filter(
                                    (item) => item.id !== value.id
                                  )
                                : [
                                    ...prevFormData.formation,
                                    { sigle: value.sigle, id: value.id },
                                  ],
                            }));
                          }}
                          active={formData.formation.some(
                            (item) => item.id === value.id
                          )}
                        />
                      ))}
                    </div>
                  </div>
                  {/* <CheckPrimaryBtn
                    label="Bachelor"
                    onClick={(e) => {
                      e.preventDefault();
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        cursus: 2,
                        formation: null,
                      }));
                    }}
                    active={formData.cursus === 2}
                  /> */}
                </div>
              </div>
            </m.div>
          )}
          {step === 3 && (
            <m.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: "just" }}
              className="h-full flex flex-col justify-center items-center w-full gap-10"
            >
              <h1>Derniere formation suivie ou cursus en cours</h1>
              <div className="w-full  grid grid-cols-2 gap-2 h-fit">
                <Input
                  label="Etablissement d'origine"
                  className="col-span-2"
                  value={formData.prevFormation?.Etablissement}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    // @ts-ignore
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      prevFormation: {
                        ...prevFormData.prevFormation,
                        Etablissement: e.target.value,
                      },
                    }));
                  }}
                />
                <Input
                  label="Ville"
                  value={formData.prevFormation?.Ville}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    // @ts-ignore
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      prevFormation: {
                        ...prevFormData.prevFormation,
                        Ville: e.target.value,
                      },
                    }));
                  }}
                />
                <Input
                  label="Code Postal"
                  value={formData.prevFormation?.CodePostal}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    // @ts-ignore
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      prevFormation: {
                        ...prevFormData.prevFormation,
                        CodePostal: e.target.value,
                      },
                    }));
                  }}
                />
              </div>
            </m.div>
          )}
          {step === 4 && (
            <m.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: "just" }}
              className="h-full flex flex-col justify-center items-center w-full gap-10"
            >
              <h1>J'ai connu l'iscio grace à :</h1>
              <div className="flex gap-x-4 px-2 flex-wrap justify-center items-center   ">
                {[
                  "Bouche à oreille",
                  "Réseaux sociaux",
                  "Parcoursup",

                  "Salon/Forum",
                  "Entourage",
                  "Autre",
                ].map((value, index) => (
                  <CheckSecondaryBtn
                    key={value}
                    label={value}
                    onClick={(e) => {
                      e.preventDefault();
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        known: value,
                      }));
                    }}
                    active={formData.known === value}
                  />
                ))}
              </div>
              <div className="w-full flex justify-end">
                <label htmlFor="verif" className="flex gap-2 text-blue-i">
                  J'accepte que l'ISCIO conserve et utilise mes données.
                  <input
                    type="checkbox"
                    onClick={() => {
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        allowed: !prevFormData.allowed,
                      }));
                    }}
                    name=""
                    id="verif"
                  />
                </label>
              </div>
            </m.div>
          )}

          {step === 2 && (
            <m.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: "just" }}
              className="flex justify-center items-center h-full w-full"
            >
              <div className="grid grid-cols-2 gap-4 w-full h-fit">
                <Input
                  size="sm"
                  onChange={handleInputForm3}
                  value={formData.name !== null ? formData.name : ""}
                  type="text"
                  label="Nom"
                  name="name"
                  isClearable
                  isRequired
                  errorMessage="Vous devez remplir ce champ"
                  isInvalid={formData.name === ""}
                />
                <Input
                  size="sm"
                  onChange={handleInputForm3}
                  value={formData.firstname !== null ? formData.firstname : ""}
                  type="text"
                  label="Prenom"
                  name="firstname"
                  isClearable
                  isRequired
                  errorMessage="Vous devez remplir ce champ"
                  isInvalid={formData.firstname === ""}
                />
                <Input
                  size="sm"
                  onChange={handleInputForm3}
                  value={formData.email !== null ? formData.email : ""}
                  type="email"
                  label="Email"
                  name="email"
                  isClearable
                  isRequired
                  className="col-span-2"
                  errorMessage="Email invalide"
                  isInvalid={
                    formData.email === "" ||
                    (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                      formData.email || ""
                    ) &&
                      formData.email !== null)
                  }
                />
                <Input
                  size="sm"
                  onChange={handleInputForm3}
                  value={formData.phone !== null ? formData.phone : ""}
                  type="tel"
                  label="Telephone"
                  name="phone"
                  isClearable
                  isRequired
                  errorMessage="Vous devez remplir ce champ"
                  isInvalid={formData.phone === ""}
                />
                <DateInput
                  label={"Date de naissance"}
                  placeholderValue={new CalendarDate(1995, 11, 6)}
                  className="text-gray-500"
                  classNames={{
                    input: "text-gray-500",
                    segment: "text-gray-500",
                  }}
                  onChange={(date) => {
                    if (!date) return;
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      birthdate: date.toString(),
                    }));
                  }}
                  size="sm"
                />
                {/* <DatePicker
                  size="sm"
                  label="Date de naissance"
                  name="birthdate"
                  isRequired
                  errorMessage="Vous devez remplir ce champ"
                /> */}
              </div>
            </m.div>
          )}
        </div>
      </AnimatePresence>
    </form>
  );
}
