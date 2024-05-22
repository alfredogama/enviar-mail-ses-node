require('dotenv').config();
const nodemailer = require('nodemailer');

// Crear el transportador SMTP usando nodemailer
const transporter = nodemailer.createTransport({
  host: `email-smtp.${process.env.AWS_REGION}.amazonaws.com`,
  port: 587,  // Puerto 587 para TLS
  secure: false,  // false para TLS
  auth: {
    user: process.env.AWS_SMTP_USERNAME,
    pass: process.env.AWS_SMTP_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Configurar los parámetros del correo electrónico
const mailOptions = {
  from: process.env.EMAIL_FROM,
  to: process.env.EMAIL_TO,
  subject: 'hola Contigo',
  text: 'Cuerpo del correo en texto plano',
  html: '<h1>Cuerpo del correo en HTML</h1>'
};

// Enviar el correo
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.error('Error al enviar el correo:', error);
  }
  console.log('Correo enviado con éxito:', info.response);
});
