import fetch from 'node-fetch'
import * as luxafor from '@nerdenough/luxafor'
import { reset } from '../helpers'

let previousBitcoinUSD = 0

const bitcoinRequest = () => {
  return fetch('https://blockchain.info/ticker')
    .then(res => res.json())
    .catch(err => err)
}

export const bitcoin = async () => {
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
