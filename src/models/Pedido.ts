import { Estado } from "./Estado.js";

export interface Pedido {
    id: number,
    clienteId: number,
    fecha: Date,
    total: number,
    cuponId?: number,
    descuento?: number,
    estado: Estado

}