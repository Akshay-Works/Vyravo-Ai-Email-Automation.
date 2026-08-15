// Vercel serverless function — sends emails via the Resend API.
// The Resend key lives ONLY here (server-side env var), never in the client bundle.
//
// Env vars required: RESEND_API_KEY, RESEND_FROM_EMAIL

const RESEND_API = "https://api.resend.com";

type EmailType =
  | "new-lead-confirmation"
  | "discovery-call-confirmation"
  | "follow-up"
  | "proposal-follow-up"
  | "internal-lead-notification"
  | "custom";

const VALID_TYPES: EmailType[] = [
  "new-lead-confirmation",
  "discovery-call-confirmation",
  "follow-up",
  "proposal-follow-up",
  "internal-lead-notification",
  "custom",
];

interface TemplateContext {
  name?: string;
  company?: string;
  meetingDate?: string;
  meetingLink?: string;
  proposalTitle?: string;
  leadDetails?: string;
}

function wrapHtml(title: string, bodyHtml: string): string {
  return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background-color:#0A0A0F;font-family:Inter,Arial,sans-serif;">
    <div style="max-width:600px;margin:0 auto;padding:32px 16px;">
      <div style="background-color:#12121A;border:1px solid #26263A;border-radius:16px;padding:32px;">
        <div style="margin-bottom:24px;">
          <span style="font-size:20px;font-weight:700;color:#FFFFFF;">Vyravo</span>
          <span style="font-size:16px;color:#9CA3AF;"> AI</span>
        </div>
        <h1 style="font-size:20px;color:#FFFFFF;margin:0 0 16px;">${title}</h1>
        <div style="font-size:14px;line-height:1.7;color:#C4C4CC;">${bodyHtml}</div>
        <div style="margin-top:32px;padding-top:24px;border-top:1px solid #26263A;font-size:12px;color:#6B7280;">
          Vyravo AI — Intelligent Automation for Modern Businesses
        </div>
      </div>
    </div>
  </body>
</html>`;
}

function p(text: string): string {
  return `<p style="margin:0 0 14px;">${text}</p>`;
}

function buildTemplate(type: EmailType, ctx: TemplateContext): { subject: string; html: string; text: string } {
  const name = ctx.name || "there";
  const firstName = name.split(" ")[0];

  switch (type) {
    case "new-lead-confirmation":
      return {
        subject: `We received your request, ${firstName} — here's what happens next`,
        html: wrapHtml(
          "Thanks for reaching out",
          p(`Hi ${firstName},`) +
            p("Thank you for contacting Vyravo AI! We've received your details and our team is already reviewing them.") +
            p("Within the next 24 hours we'll reach out to schedule your free discovery call, where we'll map your automation opportunities and recommend the right solutions for your business.") +
            p("If you have any questions in the meantime, just reply to this email.") +
            p("Talk soon,<br/>The Vyravo AI Team")
        ),
        text: `Hi ${firstName},\n\nThank you for contacting Vyravo AI! We've received your details and will reach out within 24 hours to schedule your free discovery call.\n\nThe Vyravo AI Team`,
      };

    case "discovery-call-confirmation":
      return {
        subject: "✅ Your Discovery Call with Vyravo AI is Confirmed",
        html: wrapHtml(
          "Your discovery call is confirmed",
          p(`Hi ${firstName},`) +
            p("Your discovery call is locked in — we're looking forward to it!") +
            (ctx.meetingDate ? p(`<strong>When:</strong> ${ctx.meetingDate}`) : "") +
            (ctx.meetingLink ? p(`<strong>Where:</strong> ${ctx.meetingLink}`) : "") +
            p("Before the call, think about your biggest operational bottlenecks and the outcomes you'd love to see — it helps us make the session as useful as possible.") +
            p("If you need to reschedule, use your Calendly link or reply to this email.") +
            p("See you soon,<br/>The Vyravo AI Team")
        ),
        text: `Hi ${firstName},\n\nYour discovery call is confirmed.${ctx.meetingDate ? `\nWhen: ${ctx.meetingDate}` : ""}${ctx.meetingLink ? `\nWhere: ${ctx.meetingLink}` : ""}\n\nSee you soon,\nThe Vyravo AI Team`,
      };

    case "follow-up":
      return {
        subject: `Following up — your AI automation plans, ${firstName}`,
        html: wrapHtml(
          "Just following up",
          p(`Hi ${firstName},`) +
            p("I wanted to follow up on our recent conversation about AI automation for your business.") +
            p("If you're still exploring options, I'd be happy to answer any questions or walk you through a quick demo tailored to your workflows.") +
            p("Would a short call this week work for you?") +
            p("Best regards,<br/>Akshay Navale<br/>Founder, Vyravo AI")
        ),
        text: `Hi ${firstName},\n\nFollowing up on our conversation about AI automation. Happy to answer questions or walk you through a tailored demo.\n\nBest regards,\nAkshay Navale — Vyravo AI`,
      };

    case "proposal-follow-up":
      return {
        subject: `Re: Your AI automation proposal${ctx.proposalTitle ? ` — ${ctx.proposalTitle}` : ""}`,
        html: wrapHtml(
          "Your proposal — any questions?",
          p(`Hi ${firstName},`) +
            p("I recently shared our AI automation proposal with you and wanted to check whether you had any questions.") +
            p("We can adjust scope, timeline, or phasing to fit your priorities — the proposal is a starting point for discussion, not a fixed box.") +
            p("Would you like to schedule a quick call to walk through it together?") +
            p("Best regards,<br/>Akshay Navale<br/>Founder, Vyravo AI")
        ),
        text: `Hi ${firstName},\n\nFollowing up on the proposal we shared. Happy to adjust scope or walk through it on a quick call.\n\nBest regards,\nAkshay Navale — Vyravo AI`,
      };

    case "internal-lead-notification":
      return {
        subject: "🆕 New lead received — Vyravo AI",
        html: wrapHtml(
          "New lead received",
          p("<strong>A new lead came in via the website.</strong>") +
            (ctx.leadDetails
              ? `<pre style="white-space:pre-wrap;background:#0A0A0F;border:1px solid #26263A;border-radius:8px;padding:12px;font-size:12px;color:#C4C4CC;">${ctx.leadDetails}</pre>`
              : p("Open the CRM to review and follow up promptly."))
        ),
        text: `New lead received.\n\n${ctx.leadDetails || "Open the CRM to review and follow up promptly."}`,
      };

    default:
      return {
        subject: ctx.proposalTitle || "Message from Vyravo AI",
        html: wrapHtml(ctx.proposalTitle || "Message from Vyravo AI", p(name)),
        text: name,
      };
  }
}

export default async function handler(req: any, res: any) {
  // CORS not needed (same-origin), but keep the surface small: POST only.
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();

  if (!apiKey || !from) {
    return res.status(503).json({
      ok: false,
      configured: false,
      error: !apiKey
        ? "RESEND_API_KEY is not configured in Vercel environment variables"
        : "RESEND_FROM_EMAIL is not configured in Vercel environment variables",
    });
  }

  const body = typeof req.body === "object" && req.body !== null ? req.body : {};
  const type: EmailType = VALID_TYPES.includes(body.type) ? body.type : "custom";
  const to = typeof body.to === "string" ? body.to.trim().toLowerCase() : "";
  const ctx: TemplateContext = {
    name: typeof body.name === "string" ? body.name.slice(0, 200) : undefined,
    company: typeof body.company === "string" ? body.company.slice(0, 200) : undefined,
    meetingDate: typeof body.meetingDate === "string" ? body.meetingDate.slice(0, 200) : undefined,
    meetingLink: typeof body.meetingLink === "string" ? body.meetingLink.slice(0, 500) : undefined,
    proposalTitle: typeof body.subject === "string" ? body.subject.slice(0, 200) : undefined,
    leadDetails: typeof body.leadDetails === "string" ? body.leadDetails.slice(0, 2000) : undefined,
  };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    return res.status(400).json({ ok: false, error: "A valid recipient email ('to') is required" });
  }

  let subject: string;
  let html: string;
  let text: string;

  if (type === "custom") {
    subject = typeof body.subject === "string" ? body.subject.trim().slice(0, 200) : "";
    const rawBody = typeof body.body === "string" ? body.body.slice(0, 20000) : "";
    if (!subject || !rawBody) {
      return res.status(400).json({ ok: false, error: "Custom emails require 'subject' and 'body'" });
    }
    const escaped = rawBody
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    html = wrapHtml(subject, escaped.split(/\n\n+/).map((b: string) => p(b.replace(/\n/g, "<br/>"))).join(""));
    text = rawBody;
  } else {
    ({ subject, html, text } = buildTemplate(type, ctx));
  }

  try {
    const response = await fetch(`${RESEND_API}/emails`, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], subject, html, text }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const message = data?.message || data?.error || `Resend API error (${response.status})`;
      return res.status(502).json({ ok: false, configured: true, error: String(message) });
    }

    return res.status(200).json({ ok: true, configured: true, id: data?.id, to, subject });
  } catch (error: any) {
    return res.status(502).json({
      ok: false,
      configured: true,
      error: String(error?.message || "Failed to reach the Resend API"),
    });
  }
}
