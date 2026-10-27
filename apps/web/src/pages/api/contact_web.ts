import type { APIRoute } from "astro";
import { env } from "@portfolio/env/server";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request, redirect }) => {
  const data = await request.formData();
  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");
  const honeypot = data.get("website");

  // Bots fill every field; humans never see this one. Pretend it worked.
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return redirect("/thanks", 303);
  }

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !message.trim()
  ) {
    return new Response(
      JSON.stringify({ message: "Missing required fields" }),
      { status: 400 },
    );
  }

  if (
    name.length > MAX_NAME ||
    email.length > MAX_EMAIL ||
    message.replaceAll("\r\n", "\n").length > MAX_MESSAGE
  ) {
    return new Response(JSON.stringify({ message: "Field too long" }), {
      status: 400,
    });
  }

  if (!EMAIL_PATTERN.test(email.trim())) {
    return new Response(JSON.stringify({ message: "Invalid email address" }), {
      status: 400,
    });
  }

  const { error } = await resend.emails.send({
    from: "Portfolio contact form <portfolio@tarjousgeneraattori.pionblanc.fi>",
    to: "jan.harkonen@gmail.com",
    replyTo: email.trim(),
    subject: `Portfolio contact form submission from ${name.trim().replace(/\s+/g, " ")}`,
    html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Source:</strong> web</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replaceAll("\n", "<br>")}</p>`,
  });

  if (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }

  return redirect("/thanks", 303);
};
