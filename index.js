import fetch from 'node-fetch'
import { Luxafor, LUXAFOR_MODE_STROBE } from '@nerdenough/luxafor'

const luxafor = new Luxafor()

let currentBitcoinUSDExchangeRate = 0

const bitcoinRequest = () => {
  return fetch('https://blockchain.info/ticker')
    .then(res => res.json())
    .catch(err => null)
}

const bitcoinIntegration = async () => {
  const res = await bitcoinRequest()
  if (!res) {
    // TODO: handle error
  }

  if (currentBitcoinUSDExchangeRate > res.USD.last) {
    luxafor
      .setColor(255, 0, 0)
      .setMode(LUXAFOR_MODE_STROBE)
      .setSpeed(10)
      .setRepeat(10)
      .execute()
  } else if (currentBitcoinUSDExchangeRate < res.USD.last) {
    luxafor
      .setColor(0, 255, 0)
      .setMode(LUXAFOR_MODE_STROBE)
      .setSpeed(10)
      .setRepeat(10)
      .execute()
  }

  console.log(currentBitcoinUSDExchangeRate, res.USD.last)
  currentBitcoinUSDExchangeRate = res.USD.last
}

setInterval(bitcoinIntegration, 60000)
bitcoinIntegration()
