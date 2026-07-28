import { Categorias } from "../models/Categorias";
import { Producto } from "../models/Producto";
import { ProductoRepository } from "../data/ProductoRepository";

export class ProductService {
    private repository = new ProductoRepository;

    async listar(): Promise<Producto[]> {
        return await this.repository.obtenerProductos();
    }

    async agregar(producto: Producto): Promise<void> {
        const productos = await this.repository.obtenerProductos();
        const existeId = productos.some(p => p.id === producto.id);
        if (existeId) {
            throw new Error("El ID ingresado ya está en uso.")
        }
        productos.push(producto);
        await this.repository.guardarProducto(productos);
        console.log("Producto agregado correctamente.");
    }

    async buscar(id: number): Promise<Producto> {
        const productos = await this.repository.obtenerProductos();

        const producto = productos.find(p => p.id === id);
        if (!producto) {
            throw new Error("Producto no encontrado.");
        }
        return producto;
    }

    async actualizar(producto: Producto): Promise<void> {
        const productos = await this.repository.obtenerProductos();
        const indice = productos.findIndex(p => p.id === producto.id);
        if (indice === -1) {
            throw new Error("Producto no encontrado");
        }
        productos[indice] = producto;
        await this.repository.guardarProducto(productos);
        console.log("Producto actualizado correctamente.");
    }

    async eliminar(id: number): Promise<void> {
        const productos = await this.repository.obtenerProductos();
        const nuevos = productos.filter(p => p.id !== id);
        if (nuevos.length === productos.length) {
            throw new Error("Producto no encontrado.");
        }
        await this.repository.guardarProducto(nuevos);
        console.log("Producto eliminado correctamente.");
    }

    async verificarStock(idProducto: number, cantidad: number): Promise<boolean> {
        const productos = await this.repository.obtenerProductos();
        const producto = productos.find(p => p.id === idProducto);
        if (!producto) throw new Error("Producto no encontrado.");
        if (producto.stock > cantidad) {
            return true;
        } else { 
            throw new Error(`Stock insuficiente para ${producto.nombre}.`) ;
        }
    }

    async reducirStock(id: number, cantidad: number): Promise<void> {
        const productos = await this.repository.obtenerProductos();
        const indice = productos.findIndex(p => p.id === id);
        if (indice === -1) {
            throw new Error("Producto no encontrado");
        };
        if (await this.verificarStock(id, cantidad)) {
            productos[indice].stock -= cantidad;
            await this.repository.guardarProducto(productos);
            console.log("Stock actualizado correctamente.");
        }
    }

    async aumentarStock(id: number, cantidad: number): Promise<void> {
        const productos = await this.repository.obtenerProductos();
        const indice = productos.findIndex(p => p.id === id);
        if (indice === -1) {
            throw new Error("Producto no encontrado");
        };
        if (await this.verificarStock(id, cantidad)) {
            productos[indice].stock += cantidad;
            await this.repository.guardarProducto(productos);
            console.log("Stock actualizado correctamente.");
        }
    }

    async buscarPorCategoria(categoria: Categorias): Promise<Producto[]> {
        const productos = await this.repository.obtenerProductos();
        return productos.filter(p => p.categoria === categoria);
    }
}