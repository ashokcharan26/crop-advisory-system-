# Backend (optional future extension)

GitHub Pages serves static HTML/CSS/JavaScript and does not run a Python, Node.js, or PHP backend.

This prototype intentionally has no backend and no API keys. If you later add live AI or weather data:
1. Create a separate backend service (such as a serverless function or hosted Node/Python API).
2. Store API keys in that service's environment variables/secrets.
3. Have the frontend call your backend endpoint.
4. Never commit `.env` files or secret keys to GitHub.
5. Add input validation, rate limits, and clear error handling before public release.

Do not place secret API keys in `script.js`; anyone can read browser JavaScript.
