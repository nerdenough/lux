import { reset } from './helpers'
import { bitcoin } from './plugins'

reset()
setInterval(bitcoin, 60000)
bitcoin()
