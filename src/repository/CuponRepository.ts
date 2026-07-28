import { readFile, writeFile } from "fs/promises";
import { Cupon } from "../models/Cupon";

export class CuponRepository {
    private ruta = "./src/data/cupones.json";
    async obtenerCupones(): Promise<Cupon[]>{
        try {
            const datos = await readFile(this.ruta, "utf-8");
            return JSON.parse(datos);
        } catch (error) {
            return []
        }
    }

    async guardarCupones(cupones:Cupon[]): Promise<void>{
        try {
            await writeFile(this.ruta, JSON.stringify(cupones, null, 4))
        } catch (error) {
            throw new Error("Error al guardar el cupón.");
        }
    }
}