import { readFile, writeFile } from "fs/promises";
import { Envio } from "../models/Envío";

export class EnvioRepository {
    private ruta = "./src/data/envios.json";
    async obtenerEnvios(): Promise<Envio[]>{
        try {
            const datos = await readFile(this.ruta, "utf-8");
            return JSON.parse(datos);
        } catch (error) {
            return []
        }
    }

    async guardarEnvios(envios:Envio[]): Promise<void>{
        try {
            await writeFile(this.ruta, JSON.stringify(envios, null, 4))
        } catch (error) {
            throw new Error("Error al guardar el envío.");
        }
    }
}