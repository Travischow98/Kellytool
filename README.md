# Kellytool - Fractional Kelly Criterion Calculator

A professional-looking, GitHub Pages-ready Kelly Criterion learning project.

## Features
- Prompts for starting bankroll every page load.
- Inputs for Win Probability (%) and Decimal Odds.
- Full / Half / Quarter Kelly options.
- Real-time recommended bet amount in dollars.

## Kelly Formula Used
For decimal odds `O` and win probability `p` (0-1):

- `b = O - 1`
- `q = 1 - p`
- Full Kelly fraction: `f* = (b*p - q) / b`
- Fractional Kelly: `f = f* × k` where `k` is 1 (Full), 0.5 (Half), or 0.25 (Quarter)
- Stake amount: `stake = bankroll × max(0, f)`

## Run Locally
Open `index.html` in your browser.

## Deploy on GitHub Pages
1. Push these files to a GitHub repository.
2. In GitHub: **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Choose branch `main` and folder `/ (root)`.
5. Save and wait for deployment.
6. Your live site appears at:
   - `https://<your-username>.github.io/<repo-name>/`
