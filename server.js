
//punto 13
import express from "express";
import fs from "fs";
import cors from "cors"
import morgan from "morgan";

//punto 14 uso de estructura de carpetas
import { Movie } from "./Class/Movie.js"
import { Libro } from "./Class/Libro.js";


const app = express();
const movie = new Movie();
const libro = new Libro();


app.use(express.json());
app.use(cors());
//app.use(morgan("combined"));

app.param('id',(req,res,next,id)=>{
    if(id <0){  
        console.log(`id fuera de rango`);
        res.sendStatus(404);
      
    }else{
        console.log(`id dentro de rango`);
        next();
    }
    
})

//punto 20
app.get("/v1/movies", async (req, res) => {
    try{
        res.json(await movie.listarTodo());
    }catch(e){
        //punto 10
        fs.appendFileSync("./logs/logs.txt", `${Date.now()}: ${e} \n`);
        res.status(500).send("Error al listar");
    }
        
});

app.get("/v1/movies/:id", async (req, res) =>{
    //punto 16
    res.json(await movie.listarId(req.params.id));
});

app.post("/v1/movies", async (req, res)=>{
    //punto 16
     res.status(201).json(await movie.crear(req.body.name));
})

app.delete("/v1/movies/:id", async(req,res)=>{
    const resultado = await movie.eliminar(req.params.id);
    //punto 6
    if(!resultado ){ // resultado==0 // !(resultado==1) //resultado==0?res.sendStatus(404):res.sendStatus(200)
        res.sendStatus(404);
    }else{
        res.sendStatus(200);
    }    
})

app.get("/v1/libros", async (req,res)=>{
    res.json(await libro.listarTodo());
})

app.put("/v1/movies/:id", async(req, res)=>{
    
    if(req.body.name){
         const resultado =  await movie.actualizar(req.body, req.params.id)
        if(!resultado ){ // resultado==0 // !(resultado==1) //resultado==0?res.sendStatus(404):res.sendStatus(200)
            res.sendStatus(202);
        }else{
            res.sendStatus(200);
        }
    }else{
        res.sendStatus(400);
    }
   
})

app.get("/apagar", (req,res)=>{
    movie.destroy();
    res.send("Conexion terminado")
})

app.use('*',(req,res)=>{
    res.send("ruta no existe")
})

app.listen(3000, ()=>{console.log("Levantado puerto 3000")});


//punto 17 Funciona