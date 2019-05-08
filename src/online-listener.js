import { ReplaySubject, interval, from } from 'rxjs'
import { switchMap, tap, filter } from 'rxjs/operators'

const onlineSubject$ = new ReplaySubject(1)
let urlToHit = 'https://google.com'

onlineSubject$.next(true)

function updateOnlineStatus (evt) {
  if (navigator && navigator.online != undefined) {
    onlineSubject$.next(navigator.online)
  }
}

window.addEventListener('offline', updateOnlineStatus)

export const online$ = onlineSubject$.asObservable()
export function setPollingUrl (url) {
  urlToHit = url
}

function checkIfOnline () {
  return fetch(urlToHit)
}

let pollingSubscription

const isOfflineSub = online$.pipe(
  tap((v) => console.log('v', v)),
  filter(onlineBool => onlineBool === false),
  tap(() => createPoll())
).subscribe()

function createPoll() {
  clearPoll()
  pollingSubscription = interval(5000).pipe(
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
  console.log('clearPoll')
  if (pollingSubscription && pollingSubscription.unsubscribe) {
    pollingSubscription.unsubscribe()
  }
}
