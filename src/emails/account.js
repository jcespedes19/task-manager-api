const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY) //setting up api key with send grid 

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to:email,
        from: 'jcespedesm@soin.co.cr',
        subject: 'Welcome to the app',
        text: `Welcome to the app, ${name}. How do you plan to use the app` 
    })
}
const cancellAccountEmail = (email, name) =>{
    sgMail.send({
        to: email,
        from: 'jcespedesm@soin.co.cr',
        subject: 'Account Cancelation',
        text: `We are very sad to say goodbye ${name}. We hope to see you soon`
    })
}
module.exports = {
    sendWelcomeEmail,
    cancellAccountEmail
}