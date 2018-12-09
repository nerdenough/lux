import fetch from 'node-fetch'
import * as luxafor from '@nerdenough/luxafor'
import { reset } from '../helpers'

const apiUrl = 'https://api.github.com'
const accessToken = ''

const githubNotificationsRequest = accessToken => {
  return fetch(`${apiUrl}/notifications?access_token=${accessToken}`)
    .then(res => res.json())
    .catch(err => err)
}

export const githubNotifications = async () => {
  const res = await githubNotificationsRequest(accessToken)

  if (!res.length) {
    return reset()
  }

  luxafor.strobe({
    led: luxafor.LUXAFOR_LED_BACK,
    red: 255,
    green: 255,
    blue: 255,
    repeat: 0,
    speed: 20
  })
}
