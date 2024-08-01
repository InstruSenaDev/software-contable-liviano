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
            [first_name, last_name, email, 'activo', hashedPassword,'1']
        );

        res.status(201).json({ success: true, message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor'+error });
    }
};

const inicioUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        await pool.query(
            'SELECT * FROM usuarios WHERE correo = $1 AND contrasena = $2', [email, password]
        );

        res.status(201).json({ success: true, message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor'+error });
    }
};
const registerProviders = async (req, res) => {
    const { nombre, numero_documento, tipo_documento, numero_telefono, correo_electronico, direccion, encargado } = req.body;
  
    console.log('Datos recibidos:', req.body);
  
    try {
      await pool.query(
        'INSERT INTO proveedores (nombre, numeroDocumento, idDocumento, numeroTelefono, correoElectronico, direccion, encargado) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [nombre, numero_documento, tipo_documento, numero_telefono, correo_electronico, direccion, encargado]
      );
  
      res.status(201).json({ success: true, message: 'Proveedor registrado exitosamente' });
    } catch (error) {
      console.error('Error al registrar proveedor:', error.message);
      res.status(500).json({ success: false, message: 'Error interno del servidor: ' + error.message });
    }
  };
  


module.exports = {
    saludo, 
    usuarios, 
    roles,
    registerUser,
    inicioUser,
    registerProviders
};