export default async function handler(req, res) {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: "URL cannot be empty" });
    }

    const utoUrl = `https://u.to/?url=${encodeURIComponent(url)}&from=&a=add&callback=handleResponse`;
    const response = await fetch(utoUrl);  // fetch bawaan Node.js
    const html = await response.text();

    const match = html.match(/\$\('#shurlout'\)\.val\('(.*?)'\)/);
    const shortUrl = match ? match[1] : null;

    return res.status(200).json({ shortURL: shortUrl });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
