# Career Development Resume Tailor

A simple web app prototype that helps job seekers adapt a resume to a target role.

## What it does

- Provides **two side-by-side slides/panels**:
  - **Resume panel**: paste your current resume.
  - **Job Description panel**: paste a job description.
- Analyzes the job description to extract high-value keywords.
- Scores keyword coverage in the resume.
- Generates a tailored resume draft by emphasizing missing/high-priority terms.

## Run locally

Because this is a static app, you can open `index.html` directly in a browser.

Or run a local server:

```bash
python3 -m http.server 8000
```

Then open: `http://localhost:8000`

## Notes

This prototype is intentionally lightweight and transparent. It uses browser-side JavaScript only and avoids external APIs.
