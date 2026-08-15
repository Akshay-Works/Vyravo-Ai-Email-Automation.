// Reports which integrations are configured on the server.
// Never returns secrets — only booleans.

export default async function handler(req: any, res: any) {
  res.status(200).json({
    resend: {
      configured: Boolean(
        process.env.RESEND_API_KEY?.trim() && process.env.RESEND_FROM_EMAIL?.trim()
      ),
    },
  });
}
