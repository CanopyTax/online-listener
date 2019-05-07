(function(a,b){"object"==typeof exports&&"undefined"!=typeof module?b(exports):"function"==typeof define&&define.amd?define(["exports"],b):(a=a||self,b(a["online-listener"]={}))})(this,function(a){'use strict';function b(a,c){function b(){this.constructor=a}x(a,c),a.prototype=null===c?Object.create(c):(b.prototype=c.prototype,new b)}function c(a){return"function"==typeof a}function d(a){setTimeout(function(){throw a},0)}function e(a){return null!==a&&"object"==typeof a}function f(a){return Error.call(this),this.message=a?a.length+" errors occurred during unsubscription:\n"+a.map(function(a,b){return b+1+") "+a.toString()}).join("\n  "):"",this.name="UnsubscriptionError",this.errors=a,this}function g(a){return a.reduce(function(a,b){return a.concat(b instanceof C?b.errors:b)},[])}function h(a){for(;a;){var b=a,c=b.closed,d=b.destination,e=b.isStopped;if(c||e)return!1;a=d&&d instanceof F?d:null}return!0}function i(a,b,c){if(a){if(a instanceof F)return a;if(a[E])return a[E]()}return a||b||c?new F(a,b,c):new F(A)}function j(){}function k(a){return a?1===a.length?a[0]:function(b){return a.reduce(function(a,b){return b(a)},b)}:j}function l(a){if(a||(a=Promise),!a)throw new Error("no Promise impl found");return a}function m(){return Error.call(this),this.message="object unsubscribed",this.name="ObjectUnsubscribedError",this}function n(){return function(a){return a.lift(new O(a))}}function o(a){return a?p(a):_}function p(a){return new I(function(b){return a.schedule(function(){return b.complete()})})}function q(a){return a&&"function"==typeof a.schedule}function r(a,b){return new I(function(c){var d=new D,e=0;return d.add(b.schedule(function(){return e===a.length?void c.complete():void(c.next(a[e++]),!c.closed&&d.add(this.schedule()))})),d})}function s(a,b){return b?r(a,b):new I(aa(a))}function t(){for(var a=[],b=0;b<arguments.length;b++)a[b]=arguments[b];var c=a[a.length-1];return q(c)?(a.pop(),r(a,c)):s(a)}function u(a,b){return b?new I(function(c){return b.schedule(v,0,{error:a,subscriber:c})}):new I(function(b){return b.error(a)})}function v(a){var b=a.error,c=a.subscriber;c.error(b)}function w(){navigator&&navigator.online!=null&&ga.next(navigator.online)}var x=function(a,c){return x=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var b in c)c.hasOwnProperty(b)&&(a[b]=c[b])},x(a,c)},y=!1,z={Promise:void 0,set useDeprecatedSynchronousErrorHandling(a){if(a){var b=new Error;console.warn("DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n"+b.stack)}y=a},get useDeprecatedSynchronousErrorHandling(){return y}},A={closed:!0,next:function(){},error:function(a){if(z.useDeprecatedSynchronousErrorHandling)throw a;else d(a)},complete:function(){}},B=Array.isArray||function(a){return a&&"number"==typeof a.length};f.prototype=Object.create(Error.prototype);var C=f,D=function(){function a(a){this.closed=!1,this._parentOrParents=null,this._subscriptions=null,a&&(this._unsubscribe=a)}return a.prototype.unsubscribe=function(){var b;if(!this.closed){var d=this,f=d._parentOrParents,h=d._unsubscribe,i=d._subscriptions;if(this.closed=!0,this._parentOrParents=null,this._subscriptions=null,f instanceof a)f.remove(this);else if(null!==f)for(var j,k=0;k<f.length;++k)j=f[k],j.remove(this);if(c(h))try{h.call(this)}catch(a){b=a instanceof C?g(a.errors):[a]}if(B(i))for(var l,k=-1,m=i.length;++k<m;)if(l=i[k],e(l))try{l.unsubscribe()}catch(a){b=b||[],a instanceof C?b=b.concat(g(a.errors)):b.push(a)}if(b)throw new C(b)}},a.prototype.add=function(b){var c=b;switch(typeof b){case"function":c=new a(b);case"object":if(c===this||c.closed||"function"!=typeof c.unsubscribe)return c;if(this.closed)return c.unsubscribe(),c;if(!(c instanceof a)){var d=c;c=new a,c._subscriptions=[d]}break;default:{if(!b)return a.EMPTY;throw new Error("unrecognized teardown "+b+" added to Subscription.")}}var e=c._parentOrParents;if(null===e)c._parentOrParents=this;else if(e instanceof a){if(e===this)return c;c._parentOrParents=[e,this]}else if(-1===e.indexOf(this))e.push(this);else return c;var f=this._subscriptions;return null===f?this._subscriptions=[c]:f.push(c),c},a.prototype.remove=function(a){var b=this._subscriptions;if(b){var c=b.indexOf(a);-1!==c&&b.splice(c,1)}},a.EMPTY=function(a){return a.closed=!0,a}(new a),a}(),E="function"==typeof Symbol?Symbol("rxSubscriber"):"@@rxSubscriber_"+Math.random(),F=function(a){function c(b,d,e){var f=a.call(this)||this;switch(f.syncErrorValue=null,f.syncErrorThrown=!1,f.syncErrorThrowable=!1,f.isStopped=!1,arguments.length){case 0:f.destination=A;break;case 1:if(!b){f.destination=A;break}if("object"==typeof b){b instanceof c?(f.syncErrorThrowable=b.syncErrorThrowable,f.destination=b,b.add(f)):(f.syncErrorThrowable=!0,f.destination=new G(f,b));break}default:f.syncErrorThrowable=!0,f.destination=new G(f,b,d,e);}return f}return b(c,a),c.prototype[E]=function(){return this},c.create=function(a,b,d){var e=new c(a,b,d);return e.syncErrorThrowable=!1,e},c.prototype.next=function(a){this.isStopped||this._next(a)},c.prototype.error=function(a){this.isStopped||(this.isStopped=!0,this._error(a))},c.prototype.complete=function(){this.isStopped||(this.isStopped=!0,this._complete())},c.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,a.prototype.unsubscribe.call(this))},c.prototype._next=function(a){this.destination.next(a)},c.prototype._error=function(a){this.destination.error(a),this.unsubscribe()},c.prototype._complete=function(){this.destination.complete(),this.unsubscribe()},c.prototype._unsubscribeAndRecycle=function(){var a=this._parentOrParents;return this._parentOrParents=null,this.unsubscribe(),this.closed=!1,this.isStopped=!1,this._parentOrParents=a,this},c}(D),G=function(a){function e(b,d,e,f){var g=a.call(this)||this;g._parentSubscriber=b;var h,i=g;return c(d)?h=d:d&&(h=d.next,e=d.error,f=d.complete,d!==A&&(i=Object.create(d),c(i.unsubscribe)&&g.add(i.unsubscribe.bind(i)),i.unsubscribe=g.unsubscribe.bind(g))),g._context=i,g._next=h,g._error=e,g._complete=f,g}return b(e,a),e.prototype.next=function(a){if(!this.isStopped&&this._next){var b=this._parentSubscriber;z.useDeprecatedSynchronousErrorHandling&&b.syncErrorThrowable?this.__tryOrSetError(b,this._next,a)&&this.unsubscribe():this.__tryOrUnsub(this._next,a)}},e.prototype.error=function(a){if(!this.isStopped){var b=this._parentSubscriber,c=z.useDeprecatedSynchronousErrorHandling;if(this._error)c&&b.syncErrorThrowable?(this.__tryOrSetError(b,this._error,a),this.unsubscribe()):(this.__tryOrUnsub(this._error,a),this.unsubscribe());else if(!b.syncErrorThrowable){if(this.unsubscribe(),c)throw a;d(a)}else c?(b.syncErrorValue=a,b.syncErrorThrown=!0):d(a),this.unsubscribe()}},e.prototype.complete=function(){var a=this;if(!this.isStopped){var b=this._parentSubscriber;if(this._complete){var c=function(){return a._complete.call(a._context)};z.useDeprecatedSynchronousErrorHandling&&b.syncErrorThrowable?(this.__tryOrSetError(b,c),this.unsubscribe()):(this.__tryOrUnsub(c),this.unsubscribe())}else this.unsubscribe()}},e.prototype.__tryOrUnsub=function(a,b){try{a.call(this._context,b)}catch(a){if(this.unsubscribe(),z.useDeprecatedSynchronousErrorHandling)throw a;else d(a)}},e.prototype.__tryOrSetError=function(a,b,c){if(!z.useDeprecatedSynchronousErrorHandling)throw new Error("bad call");try{b.call(this._context,c)}catch(b){return z.useDeprecatedSynchronousErrorHandling?(a.syncErrorValue=b,a.syncErrorThrown=!0,!0):(d(b),!0)}return!1},e.prototype._unsubscribe=function(){var a=this._parentSubscriber;this._context=null,this._parentSubscriber=null,a.unsubscribe()},e}(F),H="function"==typeof Symbol&&Symbol.observable||"@@observable",I=function(){function a(a){this._isScalar=!1,a&&(this._subscribe=a)}return a.prototype.lift=function(b){var c=new a;return c.source=this,c.operator=b,c},a.prototype.subscribe=function(a,b,c){var d=this.operator,e=i(a,b,c);if(d?e.add(d.call(e,this.source)):e.add(this.source||z.useDeprecatedSynchronousErrorHandling&&!e.syncErrorThrowable?this._subscribe(e):this._trySubscribe(e)),z.useDeprecatedSynchronousErrorHandling&&e.syncErrorThrowable&&(e.syncErrorThrowable=!1,e.syncErrorThrown))throw e.syncErrorValue;return e},a.prototype._trySubscribe=function(a){try{return this._subscribe(a)}catch(b){z.useDeprecatedSynchronousErrorHandling&&(a.syncErrorThrown=!0,a.syncErrorValue=b),h(a)?a.error(b):console.warn(b)}},a.prototype.forEach=function(a,b){var c=this;return b=l(b),new b(function(b,d){var e=c.subscribe(function(b){try{a(b)}catch(a){d(a),e&&e.unsubscribe()}},d,b)})},a.prototype._subscribe=function(a){var b=this.source;return b&&b.subscribe(a)},a.prototype[H]=function(){return this},a.prototype.pipe=function(){for(var a=[],b=0;b<arguments.length;b++)a[b]=arguments[b];return 0===a.length?this:k(a)(this)},a.prototype.toPromise=function(a){var b=this;return a=l(a),new a(function(a,c){var d;b.subscribe(function(a){return d=a},function(a){return c(a)},function(){return a(d)})})},a.create=function(b){return new a(b)},a}();m.prototype=Object.create(Error.prototype);var J=m,K=function(a){function c(b,c){var d=a.call(this)||this;return d.subject=b,d.subscriber=c,d.closed=!1,d}return b(c,a),c.prototype.unsubscribe=function(){if(!this.closed){this.closed=!0;var a=this.subject,b=a.observers;if(this.subject=null,!(!b||0===b.length||a.isStopped||a.closed)){var c=b.indexOf(this.subscriber);-1!==c&&b.splice(c,1)}}},c}(D),L=function(a){function c(b){var c=a.call(this,b)||this;return c.destination=b,c}return b(c,a),c}(F),M=function(a){function c(){var b=a.call(this)||this;return b.observers=[],b.closed=!1,b.isStopped=!1,b.hasError=!1,b.thrownError=null,b}return b(c,a),c.prototype[E]=function(){return new L(this)},c.prototype.lift=function(a){var b=new N(this,this);return b.operator=a,b},c.prototype.next=function(a){if(this.closed)throw new J;if(!this.isStopped)for(var b=this.observers,c=b.length,d=b.slice(),e=0;e<c;e++)d[e].next(a)},c.prototype.error=function(a){if(this.closed)throw new J;this.hasError=!0,this.thrownError=a,this.isStopped=!0;for(var b=this.observers,c=b.length,d=b.slice(),e=0;e<c;e++)d[e].error(a);this.observers.length=0},c.prototype.complete=function(){if(this.closed)throw new J;this.isStopped=!0;for(var a=this.observers,b=a.length,c=a.slice(),d=0;d<b;d++)c[d].complete();this.observers.length=0},c.prototype.unsubscribe=function(){this.isStopped=!0,this.closed=!0,this.observers=null},c.prototype._trySubscribe=function(b){if(this.closed)throw new J;else return a.prototype._trySubscribe.call(this,b)},c.prototype._subscribe=function(a){if(this.closed)throw new J;else return this.hasError?(a.error(this.thrownError),D.EMPTY):this.isStopped?(a.complete(),D.EMPTY):(this.observers.push(a),new K(this,a))},c.prototype.asObservable=function(){var a=new I;return a.source=this,a},c.create=function(a,b){return new N(a,b)},c}(I),N=function(a){function c(b,c){var d=a.call(this)||this;return d.destination=b,d.source=c,d}return b(c,a),c.prototype.next=function(a){var b=this.destination;b&&b.next&&b.next(a)},c.prototype.error=function(a){var b=this.destination;b&&b.error&&this.destination.error(a)},c.prototype.complete=function(){var a=this.destination;a&&a.complete&&this.destination.complete()},c.prototype._subscribe=function(a){var b=this.source;return b?this.source.subscribe(a):D.EMPTY},c}(M),O=function(){function a(a){this.connectable=a}return a.prototype.call=function(a,b){var c=this.connectable;c._refCount++;var d=new P(a,c),e=b.subscribe(d);return d.closed||(d.connection=c.connect()),e},a}(),P=function(a){function c(b,c){var d=a.call(this,b)||this;return d.connectable=c,d}return b(c,a),c.prototype._unsubscribe=function(){var a=this.connectable;if(!a)return void(this.connection=null);this.connectable=null;var b=a._refCount;if(0>=b)return void(this.connection=null);if(a._refCount=b-1,1<b)return void(this.connection=null);var c=this.connection,d=a._connection;this.connection=null,d&&(!c||d===c)&&d.unsubscribe()},c}(F),Q=function(a){function c(b,c){var d=a.call(this)||this;return d.source=b,d.subjectFactory=c,d._refCount=0,d._isComplete=!1,d}return b(c,a),c.prototype._subscribe=function(a){return this.getSubject().subscribe(a)},c.prototype.getSubject=function(){var a=this._subject;return(!a||a.isStopped)&&(this._subject=this.subjectFactory()),this._subject},c.prototype.connect=function(){var a=this._connection;return a||(this._isComplete=!1,a=this._connection=new D,a.add(this.source.subscribe(new T(this.getSubject(),this))),a.closed&&(this._connection=null,a=D.EMPTY)),a},c.prototype.refCount=function(){return n()(this)},c}(I),R=Q.prototype,S={operator:{value:null},_refCount:{value:0,writable:!0},_subject:{value:null,writable:!0},_connection:{value:null,writable:!0},_subscribe:{value:R._subscribe},_isComplete:{value:R._isComplete,writable:!0},getSubject:{value:R.getSubject},connect:{value:R.connect},refCount:{value:R.refCount}},T=function(a){function c(b,c){var d=a.call(this,b)||this;return d.connectable=c,d}return b(c,a),c.prototype._error=function(b){this._unsubscribe(),a.prototype._error.call(this,b)},c.prototype._complete=function(){this.connectable._isComplete=!0,this._unsubscribe(),a.prototype._complete.call(this)},c.prototype._unsubscribe=function(){var a=this.connectable;if(a){this.connectable=null;var b=a._connection;a._refCount=0,a._subject=null,a._connection=null,b&&b.unsubscribe()}},c}(L),U=function(a){function c(){return a.call(this)||this}return b(c,a),c.prototype.schedule=function(a,b){return void 0===b&&(b=0),this},c}(D),V=function(a){function c(b,c){var d=a.call(this,b,c)||this;return d.scheduler=b,d.work=c,d.pending=!1,d}return b(c,a),c.prototype.schedule=function(a,b){if(void 0===b&&(b=0),this.closed)return this;this.state=a;var c=this.id,d=this.scheduler;return null!=c&&(this.id=this.recycleAsyncId(d,c,b)),this.pending=!0,this.delay=b,this.id=this.id||this.requestAsyncId(d,this.id,b),this},c.prototype.requestAsyncId=function(a,b,c){return void 0===c&&(c=0),setInterval(a.flush.bind(a,this),c)},c.prototype.recycleAsyncId=function(a,b,c){return(void 0===c&&(c=0),null!==c&&this.delay===c&&!1===this.pending)?b:void clearInterval(b)},c.prototype.execute=function(a,b){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;var c=this._execute(a,b);return c?c:void(!1===this.pending&&null!=this.id&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null)))},c.prototype._execute=function(a){var b=!1,c=void 0;try{this.work(a)}catch(a){b=!0,c=!!a&&a||new Error(a)}if(b)return this.unsubscribe(),c},c.prototype._unsubscribe=function(){var a=this.id,b=this.scheduler,c=b.actions,d=c.indexOf(this);this.work=null,this.state=null,this.pending=!1,this.scheduler=null,-1!==d&&c.splice(d,1),null!=a&&(this.id=this.recycleAsyncId(b,a,null)),this.delay=null},c}(U),W=function(a){function c(b,c){var d=a.call(this,b,c)||this;return d.scheduler=b,d.work=c,d}return b(c,a),c.prototype.schedule=function(b,c){return(void 0===c&&(c=0),0<c)?a.prototype.schedule.call(this,b,c):(this.delay=c,this.state=b,this.scheduler.flush(this),this)},c.prototype.execute=function(b,c){return 0<c||this.closed?a.prototype.execute.call(this,b,c):this._execute(b,c)},c.prototype.requestAsyncId=function(b,c,d){return void 0===d&&(d=0),null!==d&&0<d||null===d&&0<this.delay?a.prototype.requestAsyncId.call(this,b,c,d):b.flush(this)},c}(V),X=function(){function a(b,c){void 0===c&&(c=a.now),this.SchedulerAction=b,this.now=c}return a.prototype.schedule=function(a,b,c){return void 0===b&&(b=0),new this.SchedulerAction(this,a).schedule(c,b)},a.now=function(){return Date.now()},a}(),Y=function(a){function c(b,d){void 0===d&&(d=X.now);var e=a.call(this,b,function(){return c.delegate&&c.delegate!==e?c.delegate.now():d()})||this;return e.actions=[],e.active=!1,e.scheduled=void 0,e}return b(c,a),c.prototype.schedule=function(b,d,e){return void 0===d&&(d=0),c.delegate&&c.delegate!==this?c.delegate.schedule(b,d,e):a.prototype.schedule.call(this,b,d,e)},c.prototype.flush=function(a){var b=this.actions;if(this.active)return void b.push(a);var c;this.active=!0;do if(c=a.execute(a.state,a.delay))break;while(a=b.shift());if(this.active=!1,c){for(;a=b.shift();)a.unsubscribe();throw c}},c}(X),Z=function(a){function c(){return null!==a&&a.apply(this,arguments)||this}return b(c,a),c}(Y),$=new Z(W),_=new I(function(a){return a.complete()}),aa=function(a){return function(b){for(var c=0,d=a.length;c<d&&!b.closed;c++)b.next(a[c]);b.complete()}},ba=function(){function a(a,b,c){this.kind=a,this.value=b,this.error=c,this.hasValue="N"===a}return a.prototype.observe=function(a){switch(this.kind){case"N":return a.next&&a.next(this.value);case"E":return a.error&&a.error(this.error);case"C":return a.complete&&a.complete();}},a.prototype.do=function(a,b,c){var d=this.kind;return"N"===d?a&&a(this.value):"E"===d?b&&b(this.error):"C"===d?c&&c():void 0},a.prototype.accept=function(a,b,c){return a&&"function"==typeof a.next?this.observe(a):this.do(a,b,c)},a.prototype.toObservable=function(){var a=this.kind;switch(a){case"N":return t(this.value);case"E":return u(this.error);case"C":return o();}throw new Error("unexpected notification kind value")},a.createNext=function(b){return"undefined"==typeof b?a.undefinedValueNotification:new a("N",b)},a.createError=function(b){return new a("E",void 0,b)},a.createComplete=function(){return a.completeNotification},a.completeNotification=new a("C"),a.undefinedValueNotification=new a("N",void 0),a}(),ca=function(a){function c(b,c,d){void 0===d&&(d=0);var e=a.call(this,b)||this;return e.scheduler=c,e.delay=d,e}return b(c,a),c.dispatch=function(a){var b=a.notification,c=a.destination;b.observe(c),this.unsubscribe()},c.prototype.scheduleMessage=function(a){var b=this.destination;b.add(this.scheduler.schedule(c.dispatch,this.delay,new da(a,this.destination)))},c.prototype._next=function(a){this.scheduleMessage(ba.createNext(a))},c.prototype._error=function(a){this.scheduleMessage(ba.createError(a)),this.unsubscribe()},c.prototype._complete=function(){this.scheduleMessage(ba.createComplete()),this.unsubscribe()},c}(F),da=function(){return function(a,b){this.notification=a,this.destination=b}}(),ea=function(a){function c(b,c,d){var e=Number.POSITIVE_INFINITY;void 0===b&&(b=e),void 0===c&&(c=e);var f=a.call(this)||this;return f.scheduler=d,f._events=[],f._infiniteTimeWindow=!1,f._bufferSize=1>b?1:b,f._windowTime=1>c?1:c,c===e?(f._infiniteTimeWindow=!0,f.next=f.nextInfiniteTimeWindow):f.next=f.nextTimeWindow,f}return b(c,a),c.prototype.nextInfiniteTimeWindow=function(b){var c=this._events;c.push(b),c.length>this._bufferSize&&c.shift(),a.prototype.next.call(this,b)},c.prototype.nextTimeWindow=function(b){this._events.push(new fa(this._getNow(),b)),this._trimBufferThenGetEvents(),a.prototype.next.call(this,b)},c.prototype._subscribe=function(a){var b,c=this._infiniteTimeWindow,d=c?this._events:this._trimBufferThenGetEvents(),e=this.scheduler,f=d.length;if(this.closed)throw new J;else this.isStopped||this.hasError?b=D.EMPTY:(this.observers.push(a),b=new K(this,a));if(e&&a.add(a=new ca(a,e)),c)for(var g=0;g<f&&!a.closed;g++)a.next(d[g]);else for(var g=0;g<f&&!a.closed;g++)a.next(d[g].value);return this.hasError?a.error(this.thrownError):this.isStopped&&a.complete(),b},c.prototype._getNow=function(){return(this.scheduler||$).now()},c.prototype._trimBufferThenGetEvents=function(){for(var a=Math.max,b=this._getNow(),c=this._bufferSize,d=this._windowTime,e=this._events,f=e.length,g=0;g<f&&!(b-e[g].time<d);)g++;return f>c&&(g=a(g,f-c)),0<g&&e.splice(0,g),e},c}(M),fa=function(){return function(a,b){this.time=a,this.value=b}}(),ga=new ea(1);ga.next(!0),window.addEventListener("online",w),window.addEventListener("offline",w);var ha=ga.asObservable();a.onlineListener=ha,Object.defineProperty(a,"__esModule",{value:!0})});
//# sourceMappingURL=online-listener.umd.js.map
