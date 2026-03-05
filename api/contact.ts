import type { VercelRequest, VercelResponse } from '@vercel/node';
import twilio from 'twilio';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const emailContent = `
    New Contact Form Submission:
    Name: ${name}
    Email: ${email}
    Message: ${message}
  `;

    const smsContent = `New message from ${name} (${email}): ${message}`;

    const results = { email: false, sms: false, errors: [] as string[] };

    // 1. Send Email
    try {
        const recipientEmail = process.env.RECIPIENT_EMAIL || "businesskazoka@gmail.com";
        if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: parseInt(process.env.SMTP_PORT || "587"),
                secure: process.env.SMTP_PORT === "465",
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            });

            await transporter.sendMail({
                from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
                to: recipientEmail,
                subject: `New Portfolio Message from ${name}`,
                text: emailContent,
            });
            results.email = true;
        } else {
            results.errors.push("Email configuration missing (SMTP_HOST, SMTP_USER, SMTP_PASS)");
        }
    } catch (error: any) {
        console.error("Email error:", error);
        results.errors.push(`Email failed: ${error.message}`);
    }

    // 2. Send SMS via Twilio
    try {
        if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER) {
            const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

            // Get recipient numbers from environment variable or use defaults
            const smsRecipientsRaw = process.env.SMS_RECIPIENTS || "+260770263178,+260967387552";
            const numbers = smsRecipientsRaw.split(",").map(num => num.trim());

            for (const number of numbers) {
                if (number) {
                    await client.messages.create({
                        body: smsContent,
                        from: process.env.TWILIO_PHONE_NUMBER,
                        to: number,
                    });
                }
            }
            results.sms = true;
        } else {
            results.errors.push("Twilio configuration missing (TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER)");
        }
    } catch (error: any) {
        console.error("SMS error:", error);
        results.errors.push(`SMS failed: ${error.message}`);
    }

    if (results.email || results.sms) {
        res.json({ success: true, results });
    } else {
        res.status(500).json({ error: "Failed to send both email and SMS", details: results.errors });
    }
}
