module.exports = async (req, res) => {
  const queryString = req.url.includes("?")
    ? req.url.slice(req.url.indexOf("?"))
    : "";

  const targetUrl = `https://api.mangadex.org/manga${queryString}`;

  try {
    const apiResponse = await fetch(targetUrl, {
      headers: {
        Accept: "application/json"
      }
    });

    const text = await apiResponse.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    return res.status(apiResponse.status).send(text);
  } catch (error) {
    return res.status(500).json({
      error: "proxy_error",
      message: error.message || "Erro ao buscar MangaDex"
    });
  }
};
