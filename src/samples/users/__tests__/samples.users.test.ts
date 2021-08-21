import fetch from 'node-fetch'
import { bouchon } from '../../../libs'
import { endPoint as usersEndPoint } from '../../users'

describe('Users samples', () => {
  let bouchonHandler: ReturnType<typeof bouchon>

  const host = 'localhost'
  const port = 5001

  beforeAll(async () => {
    bouchonHandler = bouchon(host, port, [usersEndPoint])
    await bouchonHandler.start()
  })

  afterAll(() => {
    bouchonHandler.stop()
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
