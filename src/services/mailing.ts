import nodemailer from 'nodemailer';
import logger from './logger';
import env from '../config/index';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: env.MAIL_ACCOUNT,
    pass: env.MAIL_PASSWORD,
  },
});

transporter.verify(function (error, _success) {
  if (error) {
    logger.error(error.message);
  } else {
    logger.info('Server is ready to take our messages');
  }
});

export const notifNewUser = (mail: string, name: string) => {
  transporter.sendMail(
    {
      to: env.MAIL_ACCOUNT,
      subject: 'New user registrated',
      html: `<h2>New user registrated</h2>
              <p>Name: ${name}</p>  
              <p>Mail: ${mail}</p>      
      `,
    },
    (err, _info) => {
          if (err) {
              logger.error(err.message);
          }
      }
  );
};

export const notifNewOrder = (mail: string, name: string, products: any) => {
  transporter.sendMail(
    {
      to: env.MAIL_ACCOUNT,
      subject: `New order`,
      html: `<h2>Order #</h2>
        <h2>User : ${name} <${mail}></h2>
         <div>${products}</div>
      `,
    },
    (err, _info) => {
      if (err) {
        logger.error(err.message);
      }
    }
  );
};


