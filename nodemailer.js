const nodemailer = require("nodemailer");
const transport = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "blabla@gmail.com",
    pass: "kjkjkifrt",
  },
});
module.exports.sendConfirmationEmail = (email, activationcode) => {
  transport
    .sendMail({
      from: "blabla@gmail.com",
      to: email,
      subject: "Confirmer votre email",
      html: `<h1>Email de Confirmation</h1>
        <h2>Bonjour</h1>
        <p>Pour activer votre compte,veuiller cliquer pour ce lien </p>
        <a href=http://localhost:3000/confirm/${activationcode}>Cliquer ici !</a>
        </div>`,
    })
    .catch((err) => console.log(err));
};

module.exports.sendReservationAccept = (email) => {
  transport
    .sendMail({
      from: "blabla@gmail.com",
      to: email,
      subject: "Reservation Confirmation",
      html: `<h1>Reservation Accepted</h1>
        <h2>Bonjour</h1>
        <p>Thank you for your reservation.we have received the reservation in good order.</p>

        </div>`,
    })
    .catch((err) => console.log(err));
};
