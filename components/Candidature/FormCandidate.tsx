"use client";
import { useContext, useState } from "react";
import { motion as m, AnimatePresence } from "framer-motion";
import CheckPrimaryBtn from "../CheckPrimaryBtn";
import CheckSecondaryBtn from "../CheckSecondaryBtn";
import { CandidatureContext } from "@/app/page";
import { Input, DatePicker, Tooltip, DateInput } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import { CalendarDate } from "@internationalized/date";
export default function sFormCandidate() {
  const btss = [
    { sigle: "SIO", tooltip: "Services Informatiques aux Organisations" },
    {
      sigle: "NDRC",
      tooltip: "Négociation et Digitalisation de la Relation Client",
    },
    { sigle: "MCO", tooltip: "Management Commercial Opérationnel" },
    { sigle: "GPME", tooltip: "Gestion de Petites et Moyennes Entreprises" },
  ];
  const bachelors: { sigle: string; tooltip: string }[] = [
    { sigle: "CS", tooltip: "Cyber-sécurité" },
    { sigle: "DCG", tooltip: "Diplôme de comptabilité et de gestion" },
    {
      sigle: "CMO",
      tooltip: "Commerce et Marketing Opérationnel",
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

  return (
    <form className="h-full">
      <AnimatePresence mode="wait">
        <div key={step} className="h-full">
          {step === 1 && (
            <m.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: "just" }}
              className="h-full"
            >
              <div className="flex justify-center items-center gap-10 flex-col h-full">
                <h2 className="text-black text-xl">Je candidate pour :</h2>
                <div className="space-x-8">
                  <CheckPrimaryBtn
                    label="BTS"
                    onClick={(e) => {
                      e.preventDefault();
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        cursus: 1,
                        formation: null,
                      }));
                    }}
                    active={formData.cursus === 1}
                  />
                  <CheckPrimaryBtn
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
                  />
                </div>
                <div className="flex gap-4">
                  {formData.cursus &&
                    (formData.cursus == 1
                      ? btss.map((value, index) => (
                          <CheckSecondaryBtn
                            key={index}
                            label={value.sigle}
                            tooltip={value.tooltip}
                            onClick={(e) => {
                              e.preventDefault();
                              if (formData.formation == null) {
                                setFormData((prevFormData) => ({
                                  ...prevFormData,
                                  formation: index,
                                }));
                              } else {
                                setFormData((prevFormData) => ({
                                  ...prevFormData,
                                  formation: null,
                                }));
                              }
                            }}
                            active={formData.formation === index}
                          />
                        ))
                      : bachelors.map((value, index) => (
                          <CheckSecondaryBtn
                            key={index}
                            label={value.sigle}
                            tooltip={value.tooltip}
                            onClick={(e) => {
                              e.preventDefault();
                              if (formData.formation == null) {
                                setFormData((prevFormData) => ({
                                  ...prevFormData,
                                  formation: index,
                                }));
                              } else {
                                setFormData((prevFormData) => ({
                                  ...prevFormData,
                                  formation: null,
                                }));
                              }
                            }}
                            active={formData.formation === index}
                          />
                        )))}
                </div>
              </div>
            </m.div>
          )}

          {step === 2 && (
            <m.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: "just" }}
              className="h-full"
            >
              <div className="flex justify-center items-center gap-10 flex-col h-full">
                <h2 className="text-black text-xl">Je candidate pour :</h2>
                <div className="space-x-8">
                  <CheckPrimaryBtn
                    label="Initial"
                    onClick={(e) => {
                      e.preventDefault();
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        alternance: false,
                      }));
                    }}
                    active={formData.alternance === false}
                  />
                  <CheckPrimaryBtn
                    label="Alternance"
                    onClick={(e) => {
                      e.preventDefault();
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        alternance: true,
                      }));
                    }}
                    active={formData.alternance === true}
                  />
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
