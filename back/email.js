const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

let smtp;

if (process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
  if (process.env.SMTP_USER.endsWith('@gmail.com')) {
    smtp = nodemailer.createTransport(smtpTransport({
      service: 'gmail',
      logger: process.env.NODE_ENV !== 'production',
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    }));
  }
  else {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
    smtp = nodemailer.createTransport({
      host: 'owa.rufusz.hu',
      port: 587,
      requireTLS : true,
      logger: process.env.NODE_ENV !== 'production',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });
  }
}

exports.send = async function(email, name) {
  if (! smtp) return;
  await smtp.sendMail({
    from: 'groma.istvandr@sdadms.hu',
    to: email,
    bcc: 'groma.istvandr@sdadms.hu',
    subject: '💡 Innovációs ösztöndíj 2021 - Regisztráció',
    priority: 'high',
    html: `
<body style="background:rgb(42,50,61)">
  <h1 style="color:rgb(255,224,130)">
    Kedves ${name}!
  </h1>
  <table border="0">
     <tr>
       <td style="width:100px;color:rgb(255,224,130)"><pre style="font-size:8px">      _____
     /     \\
    /       \\
   /   WWW   \\
   \\\\   |    /
    \\\\  |   /
     \\\\ |  /
      |===|
      |===|
      |===|
       ###</pre>
        </td>
        <td style="vertical-align:top;color:white">
          <p>
            Gratulálunk, sikeresen regisztráltál az <b>Innovációs ösztöndíj 2021</b> pályázatra!
          </p>
          <p>
            Figyeld a <a href="http://innovacio21.rcinet.local" style="color:rgb(255,224,130)">weboldalon</a> a folyamatosan frissülő információkat!
        </td>
   </tr>
</table>
<p style="color:gray">
  Erre az e-mailre ne válaszolj!
</p>
`.trim(),
  });
};
