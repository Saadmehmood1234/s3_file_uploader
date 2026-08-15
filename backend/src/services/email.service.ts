import { resend } from "../config/resend.js";
import { env } from "../config/env.js";

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationUrl = `${env.FRONTEND_URL}/verify?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: env.EMAIL_FROM,
    to: email,
    subject: "Verify Your Email",
    html: `
    <h2>Verify your email</h2>
     <p>Click the link below to verify your account:</p>
     <a href="${verificationUrl}">
     Verify Email
     </a>
     <p>This link will expire shortly.</p>
    `,
  });

  if (error) {
    const err: any = new Error(
      `Failed to send verification email: ${error.message}`,
    );
    err.statusCode = 500;
    throw err;
  }
  return data
};
