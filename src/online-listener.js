import { ReplaySubject } from 'rxjs'

const onlineSubject$ = new ReplaySubject(1)

onlineSubject$.next(true)

function updateOnlineStatus (evt) {
  if (navigator && navigator.online != undefined) {
    onlineSubject$.next(navigator.online)
  }
}

window.addEventListener('online', updateOnlineStatus)
window.addEventListener('offline', updateOnlineStatus)

export const online$ = onlineSubject$.asObservable()
