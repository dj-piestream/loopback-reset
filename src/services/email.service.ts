import * as nodemailer from 'nodemailer';
import { inject } from '@loopback/core';
import { MailerServiceBinding } from '../key';

interface EmailManager<T = string>{
    sendMail( to:string , subject:string, body:string): Promise<boolean>;
}


export class MyNodeMailer implements EmailManager<string>{

    constructor(
      @inject(MailerServiceBinding.CONFIG_TEXT)
      public readonly configObj : object
  
    ){}
    async sendMail(to: string, subject: string, body: string): Promise<boolean> {
        let transporter = await nodemailer.createTransport(this.configObj);
        let mailObj ={
            from: "chitranshdhananjai1995@gmail.com",
            to: to,
            subject: subject,
            html: body
          };
        let data = await transporter.sendMail(mailObj);
        return data;
    }
}