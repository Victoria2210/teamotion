const Conexion = require('../Conexion/Conexion');
const dbconfig = require('../Conexion/Credenciales');
const sql = require('mssql');

class Tareas {
    constructor(ID_TAREA, TITULO, FECHA, ID_ESTADO, ID_PERSONA, DESCRIPCION) {
        this.ID_TAREA = ID_TAREA;
        this.TITULO = TITULO;
        this.ID_ESTADO = ID_ESTADO;
        this.ID_PERSONA = ID_PERSONA;
        this.FECHA = FECHA;
        this.DESCRIPCION=DESCRIPCION;
    }

    Crear(){
        const conexion = new sql.ConnectionPool(dbconfig);
        const parametros = new sql.Request(conexion);
        parametros.input('TITULO', sql.VarChar, this.TITULO);
        parametros.input('ID_PERSONA', sql.Int, this.ID_PERSONA);
        parametros.input('DESCRIPCION', sql.VarChar, this.DESCRIPCION);
        const Prodecimiento = 'INSERTAR_TAREA';

        return new Promise((resolve, reject) => {
            Conexion.ConsultaQuery(Prodecimiento, parametros, conexion, (err, tareaDB) => {
                if(err){
                    reject(err);
                }else{
                    resolve(tareaDB);
                }
            });
        });

    }

    Obtener_Por_Id_Persona(){
        const conexion = new sql.ConnectionPool(dbconfig);
        const parametros = new sql.Request(conexion);
        parametros.input('ID_PERSONA', sql.Int, this.ID_PERSONA);

        const Prodecimiento = 'CONSULTAR_TAREAS_DE_PERSONA';

        return new Promise((resolve, reject) => {
            Conexion.ConsultaQuery(Prodecimiento, parametros, conexion, (err, tareaDB) => {
                if(err){
                    reject(err);
                }else{
                    resolve(tareaDB);
                }
            });
        });
    }

    Consultar_Todos(){
        const conexion = new sql.ConnectionPool(dbconfig);
        const Parametros = new sql.Request(conexion);

        const Prodecimiento = 'CONSULTAR_TAREAS';

        return new Promise((resolve, reject) => {
            Conexion.ConsultaQuery(Prodecimiento, Parametros, conexion, (err, tareaDB) => {
                if(err){
                    reject(err);
                }else{
                    resolve(tareaDB);
                }
            });
        });
    }

    Actualizar_Estado(){
        const conexion = new sql.ConnectionPool(dbconfig);
        const Parametros = new sql.Request(conexion);

        Parametros.input('ID_TAREA', sql.Int, this.ID_TAREA);
        Parametros.input('ID_ESTADO', sql.Int, this.ID_ESTADO);
        const Prodecimiento = 'ACTUALIZAR_ESTADO_TAREA';

        return new Promise((resolve, reject) => {
            Conexion.ConsultaQuery(Prodecimiento, Parametros, conexion, (err, tareaDB) => {
                if(err){
                    reject(err);
                }else{
                    resolve(tareaDB);
                }
            });
        });
    }

    Consultar_Por_ID(){}

    Actualizar_Por_ID(){}

    Eliminar_Por_ID(){
        const conexion = new sql.ConnectionPool(dbconfig);
        const Parametros = new sql.Request(conexion);

        Parametros.input('ID_TAREA', sql.Int, this.ID_TAREA);

        const Prodecimiento = 'ELIMINAR_TAREA_POR_ID';

        return new Promise((resolve, reject) => {
            Conexion.ConsultaQuery(Prodecimiento, Parametros, conexion, (err, tareaDB) => {
                if(err){
                    reject(err);
                }else{
                    resolve(tareaDB);
                }
            });
        });
    }
}

module.exports = Tareas;