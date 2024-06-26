const pool = require('./db.js')

const saludo = (req, res) => {
    res.send("<h1>hola</h1>");
}
const usuarios =(req, res) => {
    pool.query('SELECT * FROM usuarios',(error, results) =>
    {
        if (error){
            console.error('Error al ejecutar la consulta:', error);
            res.status(500).json({ error: 'Error interno del servidor'});
            return;
        }
        res.status(200).json(results.rows);
    });
};

const rol =(req, res) => {
    pool.query('SELECT * FROM rol',(error, results) =>
    {
        if (error){
            console.error('Error al ejecutar la consulta:',error);
            res.status(500).json({error:'Error interno del servidor'});
            return;
        }
        res.status(200).json(results.rows);
    });
};
module.exports = {
    saludo, usuarios, rol
};
