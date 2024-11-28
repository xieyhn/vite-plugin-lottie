import Lottie from 'lottie-web'
import data from './assets/lottie/switch/data.json?lottie'

Lottie.loadAnimation({
  container: document.getElementById('app')!,
  renderer: 'svg',
  loop: true,
  autoplay: true,
  animationData: data,
})
