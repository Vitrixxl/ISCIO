"use server";
import { promises as fs } from "fs";
import { join } from "path";

export async function formHandler(formData : {
    cursus: number | null;
    formation: number | null;
    alternance: boolean;
    email: string | null;
    phone: string | null;
    firstname: string | null;
    name: string | null;
    birthdate: string;
    }) {
    try {
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