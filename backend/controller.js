const bcrypt = require('bcryptjs');
const pool = require("./db.js");
// const bcrypt = require('bcrypt');

const saludo = (req, res) => {
  res.send("<h1>hola</h1>");
};
const usuarios = (req, res) => {
  pool.query(
    "SELECT idusuario, correo, nombre, apellido, estado, idrol FROM usuarios WHERE estado = $1",
    ["activo"],
    (error, results) => {
      if (error) {
        console.error("Error al ejecutar la consulta:", error);
        res.status(500).json({ error: "Error interno del servidor" });
        return;
      }
      res.status(200).json(results.rows);
    }
  );
};

function usuariosLog(req, res) {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ error: "Se requiere el email para la operación." });
  }

  console.log("Email recibido para guardar:", email);

  res.status(200).json({ message: "Email procesado correctamente" });
}

function obtenerUsuarioPorCorreo(req, res) {
  const email = req.query.email;

  if (!email) {
    return res
      .status(400)
      .json({ error: "Se requiere el email para la consulta" });
  }

  pool.query(
    "SELECT idusuario, correo, nombre, apellido, estado, idrol FROM usuarios WHERE correo = $1",
    [email],
    (error, results) => {
      if (error) {
        console.error("Error al ejecutar la consulta:", error);
        res.status(500).json({ error: "Error interno del servidor" });
        return;
      }

      if (results.rows.length === 0) {
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
      }

      res.status(200).json(results.rows);
    }
  );
}

const roles = (req, res) => {
  pool.query("SELECT * FROM roles", (error, results) => {
    if (error) {
      console.error("Error al ejecutar la consulta:", error);
      res.status(500).json({ error: "Error interno del servidor" });
      return;
    }
    res.status(200).json(results.rows);
  });
};

const proveedores = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM proveedores WHERE estado = $1",
      ["activo"]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al obtener proveedores:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const cuentas = (req, res) => {
  pool.query(
    "SELECT idcuentas, codigo, nombre, tipocuenta FROM cuentas",
    (error, results) => {
      if (error) {
        console.error("Error al ejecutar la consulta:", error);
        res.status(500).json({ error: "Error interno del servidor" });
        return;
      }
      res.status(200).json(results.rows);
    }
  );
};

const registerUser = async (req, res) => {
  const { first_name, last_name, email, password, userId } = req.body;
  try {
    const existingUser = await pool.query(
      "SELECT * FROM usuarios WHERE correo = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "El correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO usuarios (nombre, apellido, correo, estado, contrasena,idrol, idusuarios) VALUES ($1, $2, $3, $4, $5,$6,$7)",
      [first_name, last_name, email, "activo", hashedPassword, "2", userId]
    );

    res
      .status(201)
      .json({ success: true, message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" + error });
  }
};

const inicioUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Email proporcionado: ", email);
    console.log("Password proporcionada: ", password);

    // Consulta para obtener el usuario por correo electrónico
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE correo = $1",
      [email]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];

      if (user.estado === "inactivo") {
        return res.status(403).json({ message: "Cuenta inactiva." });
      }

      const storedHash = user.contrasena.trim();
      console.log("Stored hashed password: ", storedHash);

      const isMatch = await bcrypt.compare(password, storedHash);

      if (isMatch) {
        res
          .status(200)
          .json({ message: "Inicio de sesión exitoso", user: user });
      } else {
        res.status(400).json({ message: "Contraseña incorrecta" });
      }
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.log("Error al iniciar sesión: ", error);
    res
      .status(500)
      .json({ message: "Error interno al procesar la solicitud", error });
  }
};

const registerProviders = async (req, res) => {
  const {
    nombre,
    numero_documento,
    tipo_documento,
    numero_telefono,
    correo_electronico,
    direccion,
    encargado,
    hora,
    fecha,
    userId
  } = req.body;

  console.log("Datos recibidos:", req.body);

  try {
    // Verificar si el correo ya existe
    const correoExistente = await pool.query(
      "SELECT * FROM proveedores WHERE correoElectronico = $1",
      [correo_electronico]
    );
    if (correoExistente.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "El correo electrónico ya está en uso.",
      });
    }

    // Verificar si el nombre ya existe
    const nombreExistente = await pool.query(
      "SELECT * FROM proveedores WHERE nombre = $1",
      [nombre]
    );
    if (nombreExistente.rows.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "El nombre ya está en uso." });
    }

    // Verificar si el número de documento ya existe
    const documentoExistente = await pool.query(
      "SELECT * FROM proveedores WHERE numeroDocumento = $1",
      [numero_documento]
    );
    if (documentoExistente.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "El número de documento ya está en uso.",
      });
    }

    // Insertar el nuevo proveedor
    await pool.query(
      "INSERT INTO proveedores (nombre, numeroDocumento, idDocumento, numeroTelefono, correoElectronico, direccion, encargado, hora, fecha, estado, idusuario) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
      [
        nombre,
        numero_documento,
        tipo_documento,
        numero_telefono,
        correo_electronico,
        direccion,
        encargado,
        hora,
        fecha,
        "activo",
        userId
      ]
    );

    res
      .status(201)
      .json({ success: true, message: "Proveedor registrado exitosamente" });
    console.log("Proveedor registrado exitosamente");
  } catch (error) {
    console.error("Error al registrar proveedor:", error.message);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor: " + error.message,
    });
  }
};

const eliminarProveedor = async (req, res) => {
  const { numerodocumento } = req.body;

  // Validación del número de documento
  if (!numerodocumento) {
    return res.status(400).json({ error: "Número de documento es requerido" });
  }

  try {
    // Verificar si el proveedor existe
    const result = await pool.query(
      "SELECT * FROM proveedores WHERE numerodocumento = $1",
      [numerodocumento]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Proveedor no encontrado." });
    }

    // Asegúrate de que este valor está definido correctamente como 'inactivo'
    const nuevoEstado = "inactivo"; // Definimos explícitamente la variable nuevoEstado

    // Actualizar el estado del proveedor a "inactivo"
    await pool.query(
      "UPDATE proveedores SET estado = $1 WHERE numerodocumento = $2",
      [nuevoEstado, numerodocumento] // Usamos nuevoEstado en lugar de una referencia incorrecta
    );

    // Proveedor eliminado exitosamente
    res.status(200).json({
      message: `Proveedor con número de documento ${numerodocumento} eliminado exitosamente.`,
    });
  } catch (error) {
    console.error("Error al eliminar proveedor:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

const eliminarUsuario = async (req, res) => {
  const { correo } = req.body;

  if (!correo) {
    return res.status(400).json({ error: "Correo electrónico es requerido" });
  }

  try {
    // Consulta para actualizar el estado del usuario a 'inactivo'
    const result = await pool.query(
      "UPDATE usuarios SET estado = $1 WHERE correo = $2 RETURNING *",
      ["inactivo", correo]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Administrador no encontrado" });
    }

    res
      .status(200)
      .json({ message: "Administrador marcado como inactivo exitosamente" });
  } catch (error) {
    console.error("Error al actualizar el estado del usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const insertComprasDet = async (data) => {
  const { montoDescuento, montoImpuesto, monto, totalCalculado, idProveedorSeleccionado, cuentasSeleccionadas, fecha, hora, userId, codeFactura } = data.body;

  try {
    console.log("Datos recibidos para insertar:", userId);

    // Primero inserta la compra en la tabla 'comprasdet'
    const result = await pool.query(
      "INSERT INTO comprasdet (descuento, iva, montototal, totalpagar, idproveedores, idusuarios, estado, fecha, hora, codigofactura) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING idcompra",
      [montoDescuento, montoImpuesto, monto, totalCalculado, idProveedorSeleccionado, userId, 'activo', fecha, hora, codeFactura]
    );

    const idCompra = result.rows[0].idcompra; // Obtenemos el ID de la compra recién insertada
    console.log("ID de la compra registrada:", idCompra);

    // Luego inserta las cuentas contables seleccionadas en 'registrocuentas'
    for (const cuenta of cuentasSeleccionadas) {
      await pool.query(
        "INSERT INTO registrocuentas (tipocuenta, codigocuenta, valor, idcompra) VALUES ($1, $2, $3, $4)",
        [cuenta.tipo, cuenta.cuenta.codigo, cuenta.valor, idCompra]
      );
    }

    console.log("Datos insertados correctamente en la base de datos.");
  } catch (error) {
    console.error("Error al insertar datos en la base de datos:", error);
    throw error;
  }
};


const actualizarPerfil = (req, res) => {
  const { email, nombres, apellidos, correo } = req.body;

  if (!email || (!nombres && !apellidos && !correo)) {
    return res
      .status(400)
      .json({ error: "Datos incompletos para actualizar el perfil." });
  }

  // Construir la consulta de actualización
  let query = "UPDATE usuarios SET ";
  const fields = [];
  const values = [];

  if (nombres) {
    fields.push("nombre = $" + (fields.length + 1));
    values.push(nombres);
  }

  if (apellidos) {
    fields.push("apellido = $" + (fields.length + 1));
    values.push(apellidos);
  }

  if (correo) {
    fields.push("correo = $" + (fields.length + 1));
    values.push(correo);
  }

  query += fields.join(", ") + " WHERE correo = $" + (fields.length + 1);
  values.push(email);

  pool.query(query, values, (error, result) => {
    if (error) {
      console.error("Error al actualizar el perfil:", error);
      return res.status(500).json({ error: "Error al actualizar el perfil." });
    }

    res.status(200).json({ message: "Perfil actualizado correctamente." });
  });
};

const obtenerDatosInforme = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT c.codigofactura, c.montototal, c.descuento, c.totalpagar, c.iva, c.fecha, c.hora, p.nombre as proveedor, u.nombre as encargado FROM comprasdet c JOIN proveedores p ON c.idproveedores = p.idproveedores JOIN usuarios u ON c.idusuarios = u.idusuario WHERE c.estado = $1",
      ["activo"]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al obtener datos para el informe:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const compras = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM comprasdet WHERE estado = $1",
      ["activo"]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al obtener proveedores:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
  

module.exports = {
  saludo,
  usuarios,
  roles,
  registerUser,
  inicioUser,
  registerProviders,
  proveedores,
  cuentas,
  usuariosLog,
  obtenerUsuarioPorCorreo,
  eliminarProveedor,
  eliminarUsuario,
  actualizarPerfil,
  insertComprasDet,
  obtenerDatosInforme,
  compras
};
