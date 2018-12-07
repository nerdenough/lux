import fetch from 'node-fetch'
import * as luxafor from '@nerdenough/luxafor'
import { setInterval, setTimeout } from 'timers'

const reset = () => {
  luxafor.color({
    led: luxafor.LUXAFOR_LED_FRONT,
    blue: 255,
    green: 255,
    speed: 10
  })
  luxafor.color({
    led: luxafor.LUXAFOR_LED_BACK,
    red: 255,
    green: 255,
    speed: 10
  })
}

const bitcoinRequest = () => {
  return fetch('https://blockchain.info/ticker')
    .then(res => res.json())
    .catch(err => null)
}

let previousBitcoinUSD = 0
const bitcoin = async () => {
  const res = await bitcoinRequest()
  const latestBitcoinUSD = res.USD.last

  if (previousBitcoinUSD) {
    if (previousBitcoinUSD > latestBitcoinUSD) {
      luxafor.strobe({ led: luxafor.LUXAFOR_LED_4, red: 255, green: 255 })
    } else if (previousBitcoinUSD < latestBitcoinUSD) {
      luxafor.strobe({ led: luxafor.LUXAFOR_LED_6, red: 255, green: 255 })
    }
  }

  previousBitcoinUSD = latestBitcoinUSD
  setTimeout(reset, 3000)
}

reset()
setInterval(bitcoin, 60000)
bitcoin()
