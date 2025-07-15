import axios from 'axios';
import { OAUTH_CONFIG } from '../../../utils/oauthConfig';

export default async function handler(req, res) {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send("Missing code from Google");
  }

  try {
    const tokenRes = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: OAUTH_CONFIG.client_id,
      client_secret: OAUTH_CONFIG.client_secret,
      redirect_uri: OAUTH_CONFIG.redirect_uri,
      grant_type: 'authorization_code'
    });

    const { access_token, refresh_token, expires_in } = tokenRes.data;

    // For demo: store token in session or return it
    res.status(200).json({ access_token, refresh_token, expires_in });
  } catch (error) {
    res.status(500).json({ error: "Token exchange failed", details: error.message });
  }
}
