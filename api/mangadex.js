export default async function handler(request, response) {
  const query = request.url.split("?")[1] || "";
  const url = `https://api.mangadex.org/manga?${query}`;

  try {
    const api = await fetch(url);
    const data = await api.json();

    response.setHeader("Access-Control-Allow-Origin", "*");
    response.status(200).json(data);

  } catch (err) {
    response.status(500).json({
      error: "proxy_error",
      message: err.message
    });
  }
}
