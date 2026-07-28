import { readFile, writeFile } from "fs/promises";
import { Categorias } from "../models/Categorias";

export class CategoriaRepository {
    private ruta = "./src/data/categorias.json";
    async obtenerCategorias(): Promise<Categorias[]>{
        try {
            const datos = await readFile(this.ruta, "utf-8");
            return JSON.parse(datos);
        } catch (error) {
            return []
        }
    }

    async guardarCategorias(categorias:Categorias[]): Promise<void>{
        try {
            await writeFile(this.ruta, JSON.stringify(categorias, null, 4))
        } catch (error) {
            throw new Error("Error al guardar la categoría.");
        }
    }
}