import * as bunyan from 'bunyan'

const logLevel = (process.env.LOG_LEVEL as bunyan.LogLevel) || 'info'

export const logger = bunyan.createLogger({
  name: 'Bouchon',
  stream: process.stdout,
  level: logLevel
})

export function newLogger(namespace: string) {
  return logger.child({ component: namespace })
}
