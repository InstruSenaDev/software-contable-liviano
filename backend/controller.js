const bcrypt = require('bcrypt')
const pool = require('./db.js')
// const bcrypt = require('bcrypt');

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

const roles =(req, res) => {
    pool.query('SELECT * FROM roles',(error, results) =>
    {
        if (error){
            console.error('Error al ejecutar la consulta:',error);
            res.status(500).json({error:'Error interno del servidor'});
            return;
        }
        res.status(200).json(results.rows);
    });
};


const registerUser = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        await pool.query(
            'INSERT INTO usuarios (nombre, apellido, correo, estado, contrasena,idrol) VALUES ($1, $2, $3, $4, $5,$6)',
            [first_name, last_name, email, '1', hashedPassword,'2']
        );

        res.status(201).json({ success: true, message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor'+error });
    }
};

module.exports = {
    saludo, 
    usuarios, 
    roles,
    registerUser
};