import { Estado } from "./Estado";

export interface Envio {
    id:number,
    idPedido:number,
    fechaEnvio:Date,
    estado: Estado
}