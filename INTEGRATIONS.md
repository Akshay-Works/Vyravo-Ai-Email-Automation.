# Integration — Resend

Emails are sent by serverless functions in `/api` — the Resend API key is **never** in the client bundle.

## Environment variables (Vercel project: `vyravo-ai-email-automation-yf54`)

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | Yes | Resend → API Keys |
| `RESEND_FROM_EMAIL` | Yes | Verified sender, e.g. `Akshay from Vyravo AI <hello@yourdomain.com>` (verify the domain in Resend → Domains first) |

## Endpoints

### `POST /api/send-email`
Body:
```json
{
  "type": "new-lead-confirmation | discovery-call-confirmation | follow-up | proposal-follow-up | internal-lead-notification | custom",
  "to": "recipient@example.com",
  "name": "Optional recipient name",
  "meetingDate": "optional, for booking confirmations",
  "meetingLink": "optional",
  "subject": "required only for type=custom",
  "body": "required only for type=custom",
  "leadDetails": "optional, for internal notifications"
}
```
Responses: `200 {ok:true,id}` on success · `503` when env vars are missing (message names the exact variable) · `400` invalid input · `502` Resend error (real message surfaced).

### `GET /api/status`
Returns `{ "resend": { "configured": boolean } }` — used by the Integrations page to show the live connection state.

## UI wiring

- **Templates → template preview → "Send Test Email (Resend)"**: sends the template's real subject/body to any address, with accurate success/error feedback.
- **Integrations page**: Resend card reflects actual configuration state.

## Note

The dashboard's historical stats remain demo data; sending is real wherever the UI exposes a send action.
