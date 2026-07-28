import { Estado } from "../models/Estado";
import { Pedido } from "../models/Pedido";
import { CarritoRepository } from "../repository/CarritoRepository";
import { PedidoRepository } from "../repository/PedidoRepository";
import { CarritoService } from "./CarritoService";
import { EnvioService } from "./EnvioService";
import { ProductService } from "./ProductoService";

export class PedidoService {
    private repository = new PedidoRepository;
    private productoService = new ProductService;
    private carritoRepository = new CarritoRepository;
    private carritoService = new CarritoService;
    private envioService = new EnvioService;

    async listar():Promise <Pedido[]> {
        return await this.repository.obtenerPedidos();
    }

    async hacerPedido(pedido:Pedido):Promise<void>{
        const pedidos = await this.repository.obtenerPedidos();
        const existeId = pedidos.some(p => p.id === pedido.id);
        if(existeId){
            throw new Error("El ID ingresado ya está en uso.")
        }
        const items = await this.carritoService.obtener(pedido.clienteId);
        for(let i = 0; i<items.length; i++){
            await this.productoService.verificarStock(items[i].productoId, items[i].cantidad);
        }
        for(let i = 0; i<items.length; i++){
            await this.productoService.reducirStock(items[i].productoId, items[i].cantidad);
        }
        pedidos.push(pedido);
        await this.repository.guardarPedidos(pedidos);
        console.log("Pedido agregado correctamente.");
        this.envioService.crearEnvio({id: pedido.id, pedidoId: pedido.id, fechaEnvio: new Date(), estado: Estado.ENVIADO });

    }

    async buscar(id:number): Promise<Pedido>{
        const pedidos = await this.repository.obtenerPedidos();
        const pedido = pedidos.find(p => p.id === id);
        if(!pedido){
            throw new Error("Pedido no encontrado.")
        }
        return pedido;
    }

    async cancelarPedido(id:number, idCliente:number):Promise<void>{
        const pedidos = await this.repository.obtenerPedidos();
        const nuevos = pedidos.filter(p => p.id !==id);
        if(nuevos.length === pedidos.length){
            throw new Error("Pedido no encontrado.");
        }
        const items = await this.carritoService.obtener(idCliente);
        for(let i = 0; i<items.length; i++){
            await this.productoService.aumentarStock(items[i].productoId, items[i].cantidad);
        }
        await this.repository.guardarPedidos(nuevos);
        console.log("Pedido cancelado correctamente.");
        await this.envioService.eliminar(id);
    }
}