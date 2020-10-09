import * as nodemailer from "nodemailer";
import { UserEntity } from "src/entities/user.entity";

const mailTransportert = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    service: "gmail",
    auth: {
        user: 'morgenshtern1988',
        pass: '25012005'
    }
})

export const sendingEmail = (user: UserEntity): any => {
    let mailOptions = {
        from: 'morgenshtern1988@gmail.com',
        to: user.email,
        subject: "// Subject line",
        text: `Confirm registration by clicking on the link: http://localhost:3000/confirmedEmail?user=${user.id}`
    };
      mailTransportert.sendMail(mailOptions, (error, info) => {
        if (error) {
            return error
        }
        return true;
    })
};

export const sendingPassword = (user: UserEntity, password: string) => {
    let mailOptions = {
        from: 'morgenshtern1988@gmail.com',
        to: user.email,
        subject: "// Subject line",
        text: `Your new Password: ${password}`
    };
      mailTransportert.sendMail(mailOptions, (error, info) => {
        if (error) {
            
            return false
        }
    })
    return true;
}

