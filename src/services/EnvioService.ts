import { Envio } from "../models/Envío";
import { EnvioRepository } from "../data/EnvioRepository";

export class EnvioService {
    private repository = new EnvioRepository;

    async crearEnvio(envio:Envio):Promise<void>{
        const envios = await this.repository.obtenerEnvios();
        const existeId = envios.some(c => c.id === envio.id);
        if(existeId){
            throw new Error("El ID ingresado ya está en uso.")
        }
        envios.push(envio);
        await this.repository.guardarEnvios(envios);
        console.log("Envio agregado correctamente.");
    }

    async eliminar(id:number):Promise<void>{
        const envios = await this.repository.obtenerEnvios();
        const nuevos = envios.filter(c => c.id !==id);
        if(nuevos.length === envios.length){
            throw new Error("Envio no encontrado.");
        }
        await this.repository.guardarEnvios(nuevos);
        console.log("Envio eliminado correctamente.");
    }
}