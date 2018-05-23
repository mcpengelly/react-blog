const protocol = 'http'
const HOSTNAME = process.env.REACT_APP_HOSTNAME
const PORT = process.env.REACT_APP_PORT

let baseURL
if (process.env.NODE_ENV === 'development') {
  baseURL = `${protocol}://${HOSTNAME}:${PORT}/`
} else {
  baseURL = `${protocol}://${HOSTNAME}/`
}

export { baseURL }
