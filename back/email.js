const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

let smtp;

if (process.env.RCI_USER && process.env.RCI_PASSWORD) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
  smtp = nodemailer.createTransport({
    host: 'owa.rufusz.hu',
    port: 587,
    requireTLS : true,
    logger: true,
    auth: {
      user: process.env.RCI_USER,
      pass: process.env.RCI_PASSWORD
    }
  });
}
else if (process.env.GMAIL_USER && process.env.GMAIL_PASSWORD) {
  smtp = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD
    }
  }));
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

//exports.send('groma.istvan@sdadms.hu', 'NAGY csapat!');
