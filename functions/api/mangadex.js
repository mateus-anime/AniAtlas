export async function onRequest(context) {

  const url = new URL(context.request.url);

  const target =
    "https://api.mangadex.org" +
    url.pathname.replace("/api/mangadex", "") +
    url.search;

  const response = await fetch(target, {
    headers: {
      "Accept": "application/json"
    }
  });

  const headers = new Headers(response.headers);
  headers.set("Access-Control-Allow-Origin", "*");

  return new Response(response.body, {
    status: response.status,
    headers
  });
      }
