import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const result = contactSchema.safeParse(json);

    if (!result.success) {
      const errorMsg = result.error.issues.map((i) => i.message).join(", ");
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const { name, email, message } = result.data;
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.warn(
        "⚠️ [Contact API] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing from environment variables."
      );
      return NextResponse.json(
        {
          error:
            "Telegram bot notification is not configured yet. Please configure TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in .env.local.",
        },
        { status: 503 }
      );
    }

    const formattedMessage =
      `📬 <b>New Portfolio Inquiry</b>\n\n` +
      `👤 <b>Name:</b> ${escapeHtml(name)}\n` +
      `📧 <b>Email:</b> ${escapeHtml(email)}\n\n` +
      `💬 <b>Message:</b>\n${escapeHtml(message)}\n\n` +
      `🌐 <b>Source:</b> Portfolio Contact Form\n` +
      `⏱️ <b>Time:</b> ${new Date().toLocaleString("en-US", {
        timeZone: "Africa/Addis_Ababa",
        dateStyle: "medium",
        timeStyle: "short",
      })} EAT`;

    const telegramRes = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: formattedMessage,
          parse_mode: "HTML",
        }),
      }
    );

    if (!telegramRes.ok) {
      const errorData = await telegramRes.json().catch(() => ({}));
      console.error("❌ [Contact API] Telegram API error:", errorData);
      return NextResponse.json(
        {
          error:
            "Failed to deliver message via Telegram bot. Please verify your bot token and chat ID.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Message dispatched to Telegram successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ [Contact API] Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

