import {createLogger, format, transports} from "winston"

const httpTransportOptions = {
  host: "http-intake.logs.datadoghq.com",
  path: "/api/v2/logs?dd-api-key=9d7873bd4ccc253de1a76dd499d0e3a189cbecba&ddsource=nodejs&service=enjoy",
  ssl: true,
}

const logger = createLogger({
  level: "info",
  exitOnError: false,
  format: format.json(),
  transports: [new transports.Http(httpTransportOptions)],
})

export default logger
