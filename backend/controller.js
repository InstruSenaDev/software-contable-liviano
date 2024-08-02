const bcrypt = require('bcrypt')
const pool = require('./db.js')
// const bcrypt = require('bcrypt');

const saludo = (req, res) => {
    res.send("<h1>hola</h1>");
}
const usuarios = (req, res) => {
    pool.query('SELECT * FROM usuarios', (error, results) => {
        if (error) {
            console.error('Error al ejecutar la consulta:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.status(200).json(results.rows);
    });
};

const roles = (req, res) => {
    pool.query('SELECT * FROM roles', (error, results) => {
        if (error) {
            console.error('Error al ejecutar la consulta:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.status(200).json(results.rows);
    });
};


const registerUser = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    try {
        console.log('aaaaaaaaaaaaaaaa ', email);
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(
            'INSERT INTO usuarios (nombre, apellido, correo, estado, contrasena,idrol) VALUES ($1, $2, $3, $4, $5,$6)',
            [first_name, last_name, email, 'activo', hashedPassword, '1']
        );

        res.status(201).json({ success: true, message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' + error });
    }
};

const inicioUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log('Password provided: ', password);
        const result = await pool.query(
            "SELECT * FROM usuarios WHERE correo = $1",
            [email]
        );
        if (result.rows.length > 0) {
            const user = result.rows[0];
            // const isMatch = await bcrypt.compare(password, user.contrasena);

            const storedHash = user.contrasena.trim();
            console.log('Stored hashed password: ', storedHash);

            const isMatch = await bcrypt.compare(password, storedHash);

            if (isMatch) {
                res
                    .status(200)
                    .json({ message: "Inicio de sesión exitoso", user: user });
            } else {
                res.status(400).json({ message: "Contraseña incorrecta" });
            }



            // bcrypt.compare(password, storedHash, (err, result) => {
            //     if (err) throw err;
            //     console.log('Password match statusss:', result); // Debería ser true
            //     if (result) {
            //         res.status(200).json({ message: "Inicio de sesión exitoso", user: user.nombre });
            //     } else{
            //         res.status(400).json({ message: "Contraseña incorrecta" });
            //     }


            // });

        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        console.log("Error al iniciar sesión: ", error);
        res.status(500).json({ message: "Error interno al procesar la solicitud", error });
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