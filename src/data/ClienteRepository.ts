import { readFile, writeFile } from "fs/promises";
import { Cliente } from "../models/Clientes";

export class ClientRepository {
    private ruta = "./src/data/clientes.json";
    async obtenerCliente(): Promise<Cliente[]>{
        try {
            const datos = await readFile(this.ruta, "utf-8");
            return JSON.parse(datos);
        } catch (error) {
            return []
        }
    }

    async guardarCliente(clientes:Cliente[]): Promise<void>{
        try {
            await writeFile(this.ruta, JSON.stringify(clientes, null, 4))
        } catch (error) {
            throw new Error("Error al guardar el cliente.");
        }
    }
}