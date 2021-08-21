import fetch from 'node-fetch'
import { bouchonServer } from '@libs/bouchon/server'
import { endPoint as usersEndPoint } from '../../users'

describe('Users samples', () => {
  let server: ReturnType<typeof bouchonServer>

  const host = 'localhost'
  const port = 5001

  beforeAll(async () => {
    server = bouchonServer(host, port, [usersEndPoint])
    await server.start()
  })

  afterAll(() => {
    server.stop()
  })

  it('should retrieve users', async () => {
    const users = await fetch(`http://${host}:${port}/api/users`)
    const json = await users.json()

    expect(json).toEqual([
      { id: 1, name: 'John' },
      { id: 2, name: 'Alice' }
    ])
  })
})
