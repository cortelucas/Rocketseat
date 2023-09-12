import { createServer } from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes/users/routes.js'
import { extractQueryParams } from './ultils/extract-query-params.js'

const server = createServer(async (request, response) => {
  const { method, url } = request

  await json(request, response)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = request.url.match(route.path)

    const { query, ...params } = routeParams.groups

    request.params = params
    request.query = query ? extractQueryParams(query) : {}

    return route.handler(request, response)
  } else {
    return response
      .writeHead(404)
      .end('Not Found!')
  }
})

server.listen(3333, () => console.log('🚀 Server is running on http://localhost:3333'))
