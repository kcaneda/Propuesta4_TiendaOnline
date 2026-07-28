import { createServer } from "http";
import { Routes } from "../routes/Routes";

const servidor = createServer(async (req, res) => {
    const url = req.url??"";
    await Routes
})

servidor.listen(3000, () => {
    console.log("\n============================");
    console.log("      Servidor Iniciado       ");
    console.log("    http://localhost:3000     ")
    console.log("\n============================");
})