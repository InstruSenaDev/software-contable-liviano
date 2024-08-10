
export function generateToken() {
  return crypto.randomBytes(20).toString('hex');
}


export function sendPasswordResetEmail(userEmail, token) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tu-email@gmail.com',
        pass: 'tu-contraseña'
    }
  });
  
  const resetUrl = `http://tu-dominio.com/reset-password?token=${token}`;
  const mailOptions = {
      from: 'tu-email@gmail.com',
      to: userEmail,
      subject: 'Restauración de Contraseña',
      text: `Puedes restaurar tu contraseña usando el siguiente enlace: ${resetUrl}`,
      html: `<p>Puedes restaurar tu contraseña usando el siguiente enlace: <a href="${resetUrl}">Restaurar Contraseña</a></p>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Correo enviado: ' + info.response);
  });
}n

app.post('/reset-password', (req, res) => {
  const { email } = req.body;
  const token = generateToken();
  sendPasswordResetEmail(email, token);
  res.send('Correo de restauración de contraseña enviado.');
});

app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`);
});
 
document.getElementById('log-in').addEventListener('submit', function (event) {
    let isValid = true;
    document.getElementById('email_error').textContent = '';
    document.getElementById('password_error').textContent = '';
  
    const email = (document.getElementById('email')).value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (email.trim() === '') {
      document.getElementById('email_error').textContent = 'El correo es obligatorio';
      isValid = false;
    } else if (!emailPattern.test(email)) {
      document.getElementById('email_error').textContent = 'El correo debe contener un arroba (@)';
      isValid = false; 
    }
    const password = (document.getElementById('password')).value;
    if (password.trim() === '') {
      document.getElementById('password_error').textContent = 'La contraseña es obligatoria';
      isValid = false;
    } else if (password.length < 8) {
      document.getElementById('password_error').textContent = 'La contraseña debe tener al menos 8 caracteres.';
      isValid = false;
    }
  
    if (!isValid) {
      event.preventDefault();
    }
  });