export async function homeHandler(req: Request): Promise<Response> {
  let html = await Bun.file('./src/index.html').text()
  html = html.replace(
    '<p id="server-time"></p>',
    `<p id="server-time">Server time: ${new Date().toLocaleString()}</p>`
  )
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  })
}
