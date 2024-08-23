const bcrypt = require('bcrypt')
const pool = require('./db.js')
// const bcrypt = require('bcrypt');

const saludo = (req, res) => {
    res.send("<h1>hola</h1>");
}
const usuarios = (req, res) => {
    pool.query('SELECT idusuario, correo, nombre, apellido, estado, idrol FROM usuarios', (error, results) => {
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

const proveedores = (req, res) => {
    pool.query('SELECT idproveedores, nombre, direccion, encargado, numerodocumento, correoelectronico, iddocumento, numerotelefono FROM proveedores', (error, results) => {
        if (error) {
            console.error('Error al ejecutar la consulta:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.status(200).json(results.rows);
    });
};

const cuentas = (req, res) => {
    pool.query('SELECT idcuentas, codio, nombre, tipocuenta FROM cuentas', (error, results) => {
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
        const existingUser = await pool.query(
            'SELECT * FROM usuarios WHERE correo = $1',
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ success: false, message: 'El correo ya está registrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(
            'INSERT INTO usuarios (nombre, apellido, correo, estado, contrasena,idrol) VALUES ($1, $2, $3, $4, $5,$6)',
            [first_name, last_name, email, 'activo', hashedPassword, '2']
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
    const { nombre, numero_documento, tipo_documento, numero_telefono, correo_electronico, direccion, encargado, hora, fecha } = req.body;

    console.log('Datos recibidos:', req.body);

    try {
        // Verificar si el correo ya existe
        const correoExistente = await pool.query('SELECT * FROM proveedores WHERE correoElectronico = $1', [correo_electronico]);
        if (correoExistente.rows.length > 0) {
            return res.status(400).json({ success: false, message: 'El correo electrónico ya está en uso.' });
        }

        // Verificar si el nombre ya existe
        const nombreExistente = await pool.query('SELECT * FROM proveedores WHERE nombre = $1', [nombre]);
        if (nombreExistente.rows.length > 0) {
            return res.status(400).json({ success: false, message: 'El nombre ya está en uso.' });
        }

        // Verificar si el número de documento ya existe
        const documentoExistente = await pool.query('SELECT * FROM proveedores WHERE numeroDocumento = $1', [numero_documento]);
        if (documentoExistente.rows.length > 0) {
            return res.status(400).json({ success: false, message: 'El número de documento ya está en uso.' });
        }

        // Insertar el nuevo proveedor
        await pool.query(
            'INSERT INTO proveedores (nombre, numeroDocumento, idDocumento, numeroTelefono, correoElectronico, direccion, encargado, hora, fecha) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
            [nombre, numero_documento, tipo_documento, numero_telefono, correo_electronico, direccion, encargado, hora, fecha]
        );

        res.status(201).json({ success: true, message: 'Proveedor registrado exitosamente' });
        console.log('Proveedor registrado exitosamente');
    } catch (error) {
        console.error('Error al registrar proveedor:', error.message);
        res.status(500).json({ success: false, message: 'Error interno del servidor: ' + error.message });
    }
};


// Exporta las funciones necesarias
module.exports = {
    saludo,
    usuarios,
    roles,
    registerUser,
    inicioUser,
    registerProviders,
    proveedores,
    cuentas
};
