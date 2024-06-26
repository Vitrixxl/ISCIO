"use server";
import { promises as fs } from "fs";
import { join } from "path";
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
export async function formHandler(formData: {
  formation: { sigle: string; id: number }[] | string;

  email: string | null;
  phone: string | null;
  firstname: string | null;
  name: string | null;
  birthdate: string;
  known: string | null;
  prevFormation:
    | {
        Etablissement: string;
        Ville: string;
        CodePostal: string;
      }
    | string;
  allowed: boolean;
}) {
  try {
    console.log("formData", formData);
    if (Array.isArray(formData.formation)) {
      formData.formation = formData.formation
        .map((f) => f.sigle.toLowerCase())
        .join(";");
    }
    if ("allowed" in formData) {
      delete formData.allowed;
    }
    console.log("formData", formData);
    //@ts-ignore
    formData.prevFormation = `Etablissement : ${formData.prevFormation.Etablissement}; Ville : ${formData.prevFormation.Ville}; Code Postal : ${formData.prevFormation.CodePostal}`;
    const currentDateName = new Date().toISOString().replace(/:/g, "");
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    const formattedDate = `${day}${month}${year}`;

    const formattedDateFileName = `${formattedDate}.csv`;
    const formattedDateFilePath = join(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      formattedDateFileName
    );

    // Vérifier si le fichier avec le nom formattedDate existe
    const fileExists = await fs
      .access(formattedDateFilePath)
      .then(() => true)
      .catch(() => false);

    if (fileExists) {
      // Lire le contenu précédent
      const prevContent = await fs.readFile(formattedDateFilePath, "utf-8");

      // Créer le nouveau contenu
      const content = Object.values(formData).join(",");

      // Joindre le nouveau contenu avec le précédent, en ajoutant une nouvelle ligne entre eux
      const newContent = prevContent + "\n" + content;

      // Écrire le nouveau contenu dans le fichier
      await fs.writeFile(formattedDateFilePath, newContent);
      return { success: true };
    } else {
      // Créer le fichier avec le nom formattedDateFilePath
      const header =
        "firstname,name,email,phone,formation,date de naissance,Connu,Cursus actuel";
      const content = Object.values(formData).join(",");
      // Écrire l'en-tête et les valeurs dans le fichier, en ajoutant une nouvelle ligne entre eux
      await fs.writeFile(formattedDateFilePath, header + "\n" + content + "\n");

      return { success: true };
    }
  } catch (error) {
    console.error("Error writing to file", error);
    return { success: false, error: "Failed to write file" };
  }
}
