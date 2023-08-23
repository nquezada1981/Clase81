import { pool } from "../Conexion/db.js";
//punto 8
export class Libro{
    constructor(){
        this.id;
        this.titulo;
        this.autor;
        this.stock;
    }
    //punto 15
    async listarTodo(){
        // punto 1 
        const resultado = await pool.query('SELECT id, titulo, autor, stock FROM libros order by titulo');
        return resultado.rows;
    }
}