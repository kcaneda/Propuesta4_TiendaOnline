import { readFile, writeFile } from "fs/promises";
import { Carrito } from "../models/Carrito.js";

export class CarritoRepository {
    private ruta = "./src/data/carritos.json";
    async obtenerCarrito(): Promise<Carrito[]>{
        try {
            const datos = await readFile(this.ruta, "utf-8");
            return JSON.parse(datos);
        } catch (error) {
            return []
        }
    }

    async guardarCarrito(carritos:Carrito[]): Promise<void>{
        try {
            await writeFile(this.ruta, JSON.stringify(carritos, null, 4))
        } catch (error) {
            throw new Error("Error al guardar el carrito.");
        }
    }
}