import { reset } from './helpers'
import { bitcoin, githubNotifications } from './plugins'

reset()
setInterval(bitcoin, 60000)
setInterval(githubNotifications, 60000)
bitcoin()
githubNotifications()
