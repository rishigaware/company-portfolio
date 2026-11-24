"use server";

export type ContactState = { ok: boolean; message: string; errors?: Record<string, string> };

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: bots fill hidden fields
  if (formData.get("company_website")) return { ok: true, message: "Thanks!" };

  const data = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim(),
    product: String(formData.get("product") ?? "").trim(),
    type: String(formData.get("type") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  const errors: Record<string, string> = {};
  if (data.name.length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Please enter a valid email.";
  if (data.message.length < 10) errors.message = "Tell us a bit more (10+ characters).";
  if (Object.keys(errors).length) return { ok: false, message: "Please fix the highlighted fields.", errors };

  // TODO: send the enquiry — e.g. with Resend:
  //   await resend.emails.send({ from: "...", to: siteConfig.contact.email, subject: `New ${data.type} enquiry`, text: ... })
  console.log("[contact] new enquiry", { ...data, message: data.message.slice(0, 200) });

  return { ok: true, message: "Thanks! Our team will get back to you within one business day." };
}
