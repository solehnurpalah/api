export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const fetchRes = await fetch("https://u.to/?url=" + encodeURIComponent(url) + "&from=&a=add");
    const text = await fetchRes.text();

    const match = text.match(/\$\('#shurlout'\)\.val\('(.*?)'\)/);
    const shortURL = match ? match[1] : null;

    res.status(200).json({ shortURL });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
