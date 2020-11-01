const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const smtp = process.env.GMAIL_ADDRESS && process.env.GMAIL_PASSWORD
  ? nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.GMAIL_ADDRESS,
      pass: process.env.GMAIL_PASSWORD
    }
  }))
  : null;

exports.send = async function(email, name) {
  if (! smtp) {
    return;
  }
  await smtp.sendMail({
    from: smtp.transporter.options.auth.user,
    to: email,
    subject: '💡 Innovációs ösztöndíj 2020 - Regisztráció',
    priority: 'high',
    html: `
<h1>
  Kedves ${name}!
</h1>
<p>
  Gratulálunk, sikeresen regisztráltál az <a href="http://innovacio20.rcinet.local">Innovációs ösztöndíj 2020</a> pályázatra!
</p>
<pre>

          _____
         /     \\
        /       \\
       /   WWW   \\
       \\\\   |    /
        \\\\  |   /
         \\\\ |  /
          |===|
          |===|
           ###

</pre>
<hr>
<p>
  <em>Erre az e-mailre ne válaszolj!</em>
</p>
`.trim(),
  });
};
