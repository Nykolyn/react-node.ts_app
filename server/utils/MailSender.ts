import nodemailer from 'nodemailer';

interface ISendEmail {
  (emailConfig: { to: string; subject: string; html: string; onSuccess: () => void; onError: () => void }): Promise<
    void
  >;
}

class MailSender {
  private GMAIL_ADMIN = process.env.GMAIL_EMAIL;
  public transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(
      `smtps://${process.env.GMAIL_USER}%40gmail.com:${process.env.GMAIL_PASSWORD}@smtp.gmail.com`
    );
  }

  public sendEmail: ISendEmail = async (emailConfig) => {
    console.log('gmail', this.GMAIL_ADMIN, process.env.GMAIL_PASSWORD);
    const { to, subject, html, onSuccess, onError } = emailConfig;
    try {
      this.transporter.sendMail(
        {
          to,
          from: this.GMAIL_ADMIN,
          subject,
          html,
        },
        (err) => {
          if (err) {
            onError();
          }
          onSuccess();
        }
      );
    } catch (e) {
      console.log('Error while sending email');
    }
  };
}

export default MailSender;
