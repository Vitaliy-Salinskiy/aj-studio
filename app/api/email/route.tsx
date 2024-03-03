import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const POST = async (req: Request): Promise<Response> => {
  const { SMTP_PASSWORD, SMTP_EMAIL } = process.env;

  const body = await req.json();
  const { email } = body;

  if (!email) {
    return new NextResponse("Invalid request", { status: 400 });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: SMTP_EMAIL,
      to: email,
      subject: "Subscription Confirmation",
      text: "Thank you for subscribing to our messages!",
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You for Subscribing!</title>
      </head>
      <body style="background-color: #f7fafc; font-family: Arial, sans-serif; margin: 0; padding: 10px 0;">
          <div style="max-width: 400px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 16px 10px rgba(0, 0, 0, 1); border: 1px solid #444;">
              <h1 style="font-size: 24px; font-weight: bold; color: #333; margin-bottom: 16px;">Thank You for Subscribing!</h1>
              <p style="font-size: 16px; color: #666; margin-bottom: 16px;">
                  We appreciate your interest in our Gmail service. You're now part of our community!
              </p>
              <p style="font-size: 16px; color: #666; margin-bottom: 16px;">
                  Expect exciting updates, tips, and exclusive offers delivered straight to your inbox.
              </p>
              <p style="font-size: 16px; color: #666; margin-bottom: 16px;">
                  If you have any questions or need assistance, feel free to reply to this email.
              </p>
              <p style="font-size: 16px; color: #666;">
                  Cheers,
                  <br>
                  <span style="font-weight: bold;">The Gmail Team</span>
              </p>
          </div>
      </body>
      </html>      
      `,
    };

    const mail = await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent", mail }, { status: 200 });
  } catch (error) {
    return new NextResponse((error as Error).message, { status: 500 });
  }
};
