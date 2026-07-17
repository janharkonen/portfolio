import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");

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

  console.log(name, email, message);

  return new Response(JSON.stringify({ message: "Success!" }), {
    status: 200,
  });
};
