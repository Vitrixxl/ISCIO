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
  cursus: number | string | null;
  formation: number | string | null;
  alternance: boolean | string;
  email: string | null;
  phone: string | null;
  firstname: string | null;
  name: string | null;
  birthdate: string;
}) {
  try {
    if (formData.cursus == 1) {
      formData.cursus = "BTS";
      formData.formation = btss[formData.formation as number].sigle;
    } else {
      formData.cursus = "Bachelor";
      formData.formation = bachelors[formData.formation as number].sigle;
    }
    formData.alternance
      ? (formData.alternance = "Alternance")
      : (formData.alternance = "Initial");
    const filePath = join(process.cwd(), "public", "test.csv");

    // Lire le contenu précédent
    const prevContent = await fs.readFile(filePath, "utf-8");

    // Créer le nouveau contenu
    const content = Object.values(formData).join(",");

    // Joindre le nouveau contenu avec le précédent, en ajoutant une nouvelle ligne entre eux
    const newContent = prevContent + "\n" + content;

    // Écrire le nouveau contenu dans le fichier
    await fs.writeFile(filePath, newContent);
    return { success: true };
  } catch (error) {
    console.error("Error writing to file", error);
    return { success: false, error: "Failed to write file" };
  }
}
