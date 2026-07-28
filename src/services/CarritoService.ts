import { Carrito } from "../models/Carrito";
import { CarritoRepository } from "../data/CarritoRepository";

export class CarritoService {
    private repository = new CarritoRepository;


    async obtener(idCliente:number):Promise <Carrito[]> {
        const carritos = await this.repository.obtenerCarrito();
        const carrito = carritos.filter(c => c.id === idCliente);
        if(carritos.length === 0){
            throw new Error("Carrito no encontrado.")
        }
        return carrito;
    }

    async agregar(carrito:Carrito):Promise<void>{
        const carritos = await this.repository.obtenerCarrito();
        const existeId = carritos.some(c => c.id === carrito.id);
        if(existeId){
            throw new Error("El ID ingresado ya está en uso.")
        }
        
        carritos.push(carrito);
        await this.repository.guardarCarrito(carritos);
        console.log("Carrito agregado correctamente.");
    }

    async buscar(id:number): Promise<Carrito>{
        const carritos = await this.repository.obtenerCarrito();

        const carrito = carritos.find(c => c.id === id);
        if(!carrito){
            throw new Error("Carrito no encontrado.")
        }
        return carrito;
    }

    async actualizar(carrito:Carrito):Promise<void>{
        const carritos = await this.repository.obtenerCarrito();
        const indice = carritos.findIndex(c => c.id === carrito.id);
        if(indice === -1){
            throw new Error("Carrito no encontrado.");
        }
  
        carritos[indice] = carrito;
        await this.repository.guardarCarrito(carritos);
        console.log("Carrito actualizado correctamente.");
    }

    async eliminar(id:number):Promise<void>{
        const carritos = await this.repository.obtenerCarrito();
    
        const nuevos = carritos.filter(c => c.id !==id);
        if(nuevos.length === carritos.length){
            throw new Error("Carrito no encontrado.");
        }
        await this.repository.guardarCarrito(nuevos);
        console.log("Carrito eliminado correctamente.");
    }

    async calcularSubtotal(clienteId:number):Promise<number>{
        const items = await this.obtener(clienteId);
        let subtotal = 0;
        for(const item of items){     
            subtotal += item.cantidad * item.precioUnitario;
        }
        return subtotal;
    }

    async calcularTotal(clienteId:number):Promise<number>{
        const subtotal = await this.calcularSubtotal(clienteId);
        return subtotal;

    }
}