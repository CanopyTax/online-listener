(function(a,b){"object"==typeof exports&&"undefined"!=typeof module?b(exports,require("rxjs"),require("rxjs/operators")):"function"==typeof define&&define.amd?define(["exports","rxjs","rxjs/operators"],b):(a=a||self,b(a["online-listener"]={},a.rxjs,a.operators))})(this,function(a,b,c){'use strict';function d(){return i?fetch(i).catch(a=>(console.warn("polling failed",a),{})):(console.warn("polling url needs to be set"),Promise.resolve({}))}function e(){f(),j=b.interval(1e3).pipe(c.filter(a=>{if(0===a)return!0;return 15>=a?0==a%5:20<=a?0==a%10:void 0}),c.switchMap(()=>b.from(d()))).subscribe(a=>{200===a.status&&(g.next(!0),f())})}function f(){j&&j.unsubscribe&&j.unsubscribe()}const g=new b.ReplaySubject(1),h=g.asObservable();let i;g.next(!0),window.addEventListener("offline",function(){navigator&&navigator.onLine!=null&&g.next(navigator.onLine)}),window.addEventListener("online",()=>e());let j;a.onlineListener=h,a.setPollingUrl=function(a){i=a},Object.defineProperty(a,"__esModule",{value:!0})});
//# sourceMappingURL=online-listener.umd.js.map
