import nodemailer from 'nodemailer'

let nodeMail = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: 'erousell2022@gmail.com',
        pass: 'jivozdypqiakjewa'        
    }
});

export default nodeMail