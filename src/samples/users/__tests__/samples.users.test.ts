import { bouchonServer } from '../../..'
import fetch from 'node-fetch'

/* eslint-disable @typescript-eslint/no-var-requires */

describe('Users samples', () => {
  let server: ReturnType<typeof bouchonServer>

  const host = 'localhost'
  const port = 5001

  beforeEach(async () => {
    // isolate modules in order to reparse JSON data for each test
    jest.resetModules()

    const { endPoint: usersEndPoint } = await import('../../users')

    server = bouchonServer(host, port, [usersEndPoint])
    await server.start()
  })

  afterEach(() => {
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

  it('should add a user', async () => {
    await fetch(`http://${host}:${port}/api/users`, {
      method: 'post',
      body: JSON.stringify({
        id: 3,
        name: 'Bob'
      }),
      headers: { 'Content-Type': 'application/json' }
    })

    const users = await fetch(`http://${host}:${port}/api/users`)
    const json = await users.json()

    expect(json).toEqual([
      { id: 1, name: 'John' },
      { id: 2, name: 'Alice' },
      { id: 3, name: 'Bob' }
    ])
  })

  it('should remove a user and returns an empty response', async () => {
    const deleteResponse = await fetch(`http://${host}:${port}/api/users/2`, {
      method: 'delete'
    })

    // expect an empty response
    expect(deleteResponse.headers.get('content-length')).toBeNull()

    // expect a 204 status code because delete/empty response
    expect(deleteResponse.status).toBe(204)

    const users = await fetch(`http://${host}:${port}/api/users`)
    const json = await users.json()

    expect(json).toEqual([{ id: 1, name: 'John' }])
  })
})
