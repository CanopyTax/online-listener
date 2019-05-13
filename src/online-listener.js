import { ReplaySubject, interval, from } from 'rxjs'
import {
  switchMap,
  tap,
  filter,
} from 'rxjs/operators'

const onlineSubject$ = new ReplaySubject(1)
const online$ = onlineSubject$.asObservable()
let urlToHit = 'https://google.com'

onlineSubject$.next(true)

function updateOnlineStatus (evt) {
  if (navigator && navigator.online != undefined) {
    onlineSubject$.next(navigator.online)
  }
}

window.addEventListener('offline', updateOnlineStatus)

function checkIfOnline () {
  return fetch(urlToHit)
}

let pollingSubscription
let pollCount = 0

const isOfflineSub = online$.pipe(
  filter(onlineBool => onlineBool === false),
  tap(() => createPoll())
).subscribe()

function createPoll() {
  clearPoll()
  pollingSubscription = interval(1000).pipe(
    tap(() => pollCount++),
    filter(() => {
      if (pollCount === 1) {
        return true
      } else if (pollCount <= 15) {
        return pollCount % 5 === 0
      } else if (pollCount >= 20) {
        return pollCount % 10 === 0
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
    pollCount = 0
  }
}

function setPollingUrl (url) {
  urlToHit = url
}

export {
  online$,
  setPollingUrl,
}
