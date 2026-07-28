import { Envio } from "../models/Envío";
import { EnvioRepository } from "../repository/EnvioRepository";

export class EnvioService {
    private repository = new EnvioRepository;

    async agregar(envio:Envio):Promise<void>{
        const envios = await this.repository.obtenerEnvios();
        const existeId = envios.some(c => c.id === envio.id);
        if(existeId){
            throw new Error("El ID ingresado ya está en uso.")
        }
        envios.push(envio);
        await this.repository.guardarEnvios(envios);
        console.log("Envio agregado correctamente.");
    }
}