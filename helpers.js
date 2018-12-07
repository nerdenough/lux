import * as luxafor from '@nerdenough/luxafor'

export const reset = () => {
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
