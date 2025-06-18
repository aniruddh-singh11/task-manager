const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'aniruddhs560@gmail.com',
        subject: 'Thanks for joining!',
        text: `Welcome to the new app, ${name}`
    }).then(() => {
        console.log('Sent')
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'aniruddhs560@gmail.com',
        subject: 'Thanks for joining!',
        text: `Why did u cancel, ${name}?`
    }).then(() => {
        console.log('Sent')
    })
}

module.exports ={
    sendWelcomeEmail, 
    sendCancelationEmail
}