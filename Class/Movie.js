import { pool } from "../Conexion/db.js";

export class Movie{
    constructor(){
        this.id;
        this.name;
        this.created_at;
        this.updated_at;
    }
    async crear(name){
        //punto 19
        const resultado = await pool.query("insert into movies (name,created_at, updated_at) values ($1, now(), now()) RETURNING id",[name]); 
        pool.release;
        return resultado.rows;   
    }

    async listarTodo(){
        //punto 4
        const resultado = await pool.query("select id, name, created_at, updated_at from movies order by name ");
        pool.release;
        return resultado.rows;
    }

    async listarId(id){
        //punto 3
        const resultado = await pool.query("select id, name, created_at, updated_at from Movies where id = $1", [id]);
        pool.release;
        return resultado.rows;
    }
}