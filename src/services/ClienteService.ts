import { Cliente } from "../models/Clientes";
import { ClientRepository } from "../repository/ClienteRepository";

export class ClientService {
    private repository = new ClientRepository;

    async listar():Promise <Cliente[]> {
        return await this.repository.obtenerCliente();
    }

    async agregar(cliente:Cliente):Promise<void>{
        const clientes = await this.repository.obtenerCliente();
        const existeId = clientes.some(c => c.id === cliente.id);
        if(existeId){
            throw new Error("El ID ingresado ya está en uso.")
        }
        clientes.push(cliente);
        await this.repository.guardarCliente(clientes);
        console.log("Cliente agregado correctamente.");
    }

    async buscar(id:number): Promise<Cliente>{
        const clientes = await this.repository.obtenerCliente();
        const cliente = clientes.find(c => c.id === id);
        if(!cliente){
            throw new Error("Cliente no encontrado.")
        }
        return cliente;
    }

    async actualizar(cliente:Cliente):Promise<void>{
        const clientes = await this.repository.obtenerCliente();
        const indice = clientes.findIndex(c => c.id === cliente.id);
        if(indice === -1){
            throw new Error("Cliente no encontrado.");
        }
        clientes[indice] = cliente;
        await this.repository.guardarCliente(clientes);
        console.log("Cliente actualizado correctamente.");
    }

    async eliminar(id:number):Promise<void>{
        const clientes = await this.repository.obtenerCliente();
        const nuevos = clientes.filter(c => c.id !==id);
        if(nuevos.length === clientes.length){
            throw new Error("Cliente no encontrado.");
        }
        await this.repository.guardarCliente(nuevos);
        console.log("Cliente eliminado correctamente.");
    }
}