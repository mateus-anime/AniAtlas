export default async function handler(req, res) {
  const query = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
  const target = `https://api.mangadex.org/manga${query}`;

  try {
    const response = await fetch(target, {
      headers: {
        Accept: "application/json"
      }
    });

    const data = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.status(response.status).send(data);

  } catch (error) {
    res.status(500).json({
      error: "proxy_error",
      message: error.message
    });
  }
}
