import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;
  private readonly logger = new Logger(EmailService.name);
  private readonly mailFrom: string;

  constructor(private configService: ConfigService) {
    const nodeEnv = this.configService.get<string>('NODE_ENV') || 'development';
    this.mailFrom = this.configService.get<string>('MAIL_FROM') || 'gilrick1234567890@gmail.com';
    
    this.setupTransporter();
  }

  private setupTransporter() {
    try {
     
      const apiKey = this.configService.get<string>('MAILER_API_KEY');
      
      if (apiKey) {
        this.logger.log('Configuring Resend email transport');
        this.transporter = nodemailer.createTransport({
          host: 'smtp.resend.com',
          port: 465,
          secure: true,
          auth: {
            user: 'resend',  
            pass: apiKey,   
          }
        });
        this.logger.log('Resend email transport configured successfully');
      } else {
       
        this.logger.log('No API key found, setting up Ethereal fake email service for testing');
        this.setupEtherealTransport();
      }
    } catch (error) {
      this.logger.error(`Failed to set up email transport: ${error.message}`);
     
      this.setupEtherealTransport();
    }
  }

  private async setupEtherealTransport() {
    try {
     
      const testAccount = await nodemailer.createTestAccount();
      
      this.transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      this.logger.log('Ethereal test account created for email testing');
      this.logger.log(`Ethereal username: ${testAccount.user}`);
      this.logger.log(`Ethereal password: ${testAccount.pass}`);
      this.logger.log(`View test emails at: https://ethereal.email/login`);
    } catch (error) {
      this.logger.error(`Failed to create Ethereal test account: ${error.message}`);
      this.logger.error('Email functionality will not work properly');
    }
  }

  private async verifyConnection() {
    if (!this.transporter) {
      this.logger.error('No email transporter configured');
      return false;
    }
    
    try {
      const verification = await this.transporter.verify();
      this.logger.log(`SMTP connection verified: ${verification}`);
      return true;
    } catch (error) {
      this.logger.error(`SMTP connection verification failed: ${error.message}`);
      this.logger.error('Please check your email configuration');
      return false;
    }
  }

  async sendMail(to: string, subject: string, html: string) {
    try {
      if (!this.transporter) {
        throw new Error('Email transporter not configured');
      }


      await this.verifyConnection();

      const replyTo = this.configService.get<string>('MAIL_REPLY_TO') || this.mailFrom;
      
      const mailOptions = {
        from: this.mailFrom,
        to,
        subject,
        html,
        replyTo,
      };

      this.logger.log(`Attempting to send email to: ${to}`);
      const info = await this.transporter.sendMail(mailOptions);
      this.logger.log(`Message sent: ${info.messageId}`);
      
   
      if (info.messageId && info.messageId.includes('ethereal')) {
        this.logger.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
      }
      
      return info;
    } catch (error) {
      this.logger.error(`Error sending email: ${error.message}`);
      throw error;
    }
  }

  async sendContactNotification(name: string, email: string, subject: string, message: string) {
    const html = `
      <h1>New Contact Message</h1>
      <p><strong>From:</strong> ${name} (${email})</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    return this.sendMail(
      this.mailFrom,
      `Portfolio Contact: ${subject}`,
      html,
    );
  }

  async sendContactConfirmation(name: string, email: string) {
    const html = `
      <h1>Thank you for your message</h1>
      <p>Hello ${name},</p>
      <p>Thank you for reaching out. I have received your message and will get back to you as soon as possible.</p>
      <p>Best regards,</p>
      <p>Gilbert Mugabe</p>
    `;

    return this.sendMail(
      email,
      'Thank you for your message',
      html,
    );
  }

  async sendJobProposalNotification(company: string, email: string, jobTitle: string) {
    const html = `
      <h1>New Job Proposal</h1>
      <p>You have received a new job proposal from ${company} for the position of ${jobTitle}.</p>
      <p>Please check your admin dashboard for more details.</p>
    `;

    return this.sendMail(
      this.mailFrom,
      `New Job Proposal: ${jobTitle}`,
      html,
    );
  }
}