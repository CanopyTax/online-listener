import { ReplaySubject, interval, from } from 'rxjs'
import {
  switchMap,
  tap,
  filter,
} from 'rxjs/operators'

const onlineSubject$ = new ReplaySubject(1)
const online$ = onlineSubject$.asObservable()
let urlToHit

onlineSubject$.next(true)

function updateOnlineStatus (evt) {
  if (navigator && navigator.online != undefined) {
    onlineSubject$.next(navigator.online)
  }
}

window.addEventListener('offline', updateOnlineStatus)
window.addEventListener('online', () => createPoll())

function checkIfOnline () {
  if (urlToHit) {
    return fetch(urlToHit).catch(e => {
      console.warn(`polling failed`, e)
      return {}
    })
  } else {
    console.warn(`polling url needs to be set`)
    return Promise.resolve({})
  }
}

let pollingSubscription

function createPoll() {
  clearPoll()
  pollingSubscription = interval(1000).pipe(
    filter((i) => {
      if (pollCount === 0) {
        return true
      } else if (i <= 15) {
        return i % 5 === 0
      } else if (i >= 20) {
        return i % 10 === 0
      }
    }),
    switchMap(() => from(checkIfOnline()))
  ).subscribe(
    (results) => {
      if (results.status === 200) {
        onlineSubject$.next(true)
        clearPoll()
      }
    }
  )
}

function clearPoll() {
  if (pollingSubscription && pollingSubscription.unsubscribe) {
    pollingSubscription.unsubscribe()
  }
}

function setPollingUrl (url) {
  urlToHit = url
}

export {
  online$,
  setPollingUrl,
}
