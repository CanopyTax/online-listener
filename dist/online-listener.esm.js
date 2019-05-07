var extendStatics=function(a,c){return extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var b in c)c.hasOwnProperty(b)&&(a[b]=c[b])},extendStatics(a,c)};function __extends(a,c){function b(){this.constructor=a}extendStatics(a,c),a.prototype=null===c?Object.create(c):(b.prototype=c.prototype,new b)}function isFunction(a){return"function"==typeof a}var _enable_super_gross_mode_that_will_cause_bad_things=!1,config={Promise:void 0,set useDeprecatedSynchronousErrorHandling(a){if(a){var b=new Error;console.warn("DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n"+b.stack)}_enable_super_gross_mode_that_will_cause_bad_things=a},get useDeprecatedSynchronousErrorHandling(){return _enable_super_gross_mode_that_will_cause_bad_things}};function hostReportError(a){setTimeout(function(){throw a},0)}var empty={closed:!0,next:function(){},error:function(a){if(config.useDeprecatedSynchronousErrorHandling)throw a;else hostReportError(a)},complete:function(){}},isArray=Array.isArray||function(a){return a&&"number"==typeof a.length};function isObject(a){return null!==a&&"object"==typeof a}function UnsubscriptionErrorImpl(a){return Error.call(this),this.message=a?a.length+" errors occurred during unsubscription:\n"+a.map(function(a,b){return b+1+") "+a.toString()}).join("\n  "):"",this.name="UnsubscriptionError",this.errors=a,this}UnsubscriptionErrorImpl.prototype=Object.create(Error.prototype);var UnsubscriptionError=UnsubscriptionErrorImpl,Subscription=function(){function a(a){this.closed=!1,this._parentOrParents=null,this._subscriptions=null,a&&(this._unsubscribe=a)}return a.prototype.unsubscribe=function(){var b;if(!this.closed){var c=this,d=c._parentOrParents,e=c._unsubscribe,f=c._subscriptions;if(this.closed=!0,this._parentOrParents=null,this._subscriptions=null,d instanceof a)d.remove(this);else if(null!==d)for(var g,h=0;h<d.length;++h)g=d[h],g.remove(this);if(isFunction(e))try{e.call(this)}catch(a){b=a instanceof UnsubscriptionError?flattenUnsubscriptionErrors(a.errors):[a]}if(isArray(f))for(var i,h=-1,j=f.length;++h<j;)if(i=f[h],isObject(i))try{i.unsubscribe()}catch(a){b=b||[],a instanceof UnsubscriptionError?b=b.concat(flattenUnsubscriptionErrors(a.errors)):b.push(a)}if(b)throw new UnsubscriptionError(b)}},a.prototype.add=function(b){var c=b;switch(typeof b){case"function":c=new a(b);case"object":if(c===this||c.closed||"function"!=typeof c.unsubscribe)return c;if(this.closed)return c.unsubscribe(),c;if(!(c instanceof a)){var d=c;c=new a,c._subscriptions=[d]}break;default:{if(!b)return a.EMPTY;throw new Error("unrecognized teardown "+b+" added to Subscription.")}}var e=c._parentOrParents;if(null===e)c._parentOrParents=this;else if(e instanceof a){if(e===this)return c;c._parentOrParents=[e,this]}else if(-1===e.indexOf(this))e.push(this);else return c;var f=this._subscriptions;return null===f?this._subscriptions=[c]:f.push(c),c},a.prototype.remove=function(a){var b=this._subscriptions;if(b){var c=b.indexOf(a);-1!==c&&b.splice(c,1)}},a.EMPTY=function(a){return a.closed=!0,a}(new a),a}();function flattenUnsubscriptionErrors(a){return a.reduce(function(a,b){return a.concat(b instanceof UnsubscriptionError?b.errors:b)},[])}var rxSubscriber="function"==typeof Symbol?Symbol("rxSubscriber"):"@@rxSubscriber_"+Math.random(),Subscriber=function(a){function b(c,d,e){var f=a.call(this)||this;switch(f.syncErrorValue=null,f.syncErrorThrown=!1,f.syncErrorThrowable=!1,f.isStopped=!1,arguments.length){case 0:f.destination=empty;break;case 1:if(!c){f.destination=empty;break}if("object"==typeof c){c instanceof b?(f.syncErrorThrowable=c.syncErrorThrowable,f.destination=c,c.add(f)):(f.syncErrorThrowable=!0,f.destination=new SafeSubscriber(f,c));break}default:f.syncErrorThrowable=!0,f.destination=new SafeSubscriber(f,c,d,e);}return f}return __extends(b,a),b.prototype[rxSubscriber]=function(){return this},b.create=function(a,c,d){var e=new b(a,c,d);return e.syncErrorThrowable=!1,e},b.prototype.next=function(a){this.isStopped||this._next(a)},b.prototype.error=function(a){this.isStopped||(this.isStopped=!0,this._error(a))},b.prototype.complete=function(){this.isStopped||(this.isStopped=!0,this._complete())},b.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,a.prototype.unsubscribe.call(this))},b.prototype._next=function(a){this.destination.next(a)},b.prototype._error=function(a){this.destination.error(a),this.unsubscribe()},b.prototype._complete=function(){this.destination.complete(),this.unsubscribe()},b.prototype._unsubscribeAndRecycle=function(){var a=this._parentOrParents;return this._parentOrParents=null,this.unsubscribe(),this.closed=!1,this.isStopped=!1,this._parentOrParents=a,this},b}(Subscription),SafeSubscriber=function(a){function b(b,c,d,e){var f=a.call(this)||this;f._parentSubscriber=b;var g,h=f;return isFunction(c)?g=c:c&&(g=c.next,d=c.error,e=c.complete,c!==empty&&(h=Object.create(c),isFunction(h.unsubscribe)&&f.add(h.unsubscribe.bind(h)),h.unsubscribe=f.unsubscribe.bind(f))),f._context=h,f._next=g,f._error=d,f._complete=e,f}return __extends(b,a),b.prototype.next=function(a){if(!this.isStopped&&this._next){var b=this._parentSubscriber;config.useDeprecatedSynchronousErrorHandling&&b.syncErrorThrowable?this.__tryOrSetError(b,this._next,a)&&this.unsubscribe():this.__tryOrUnsub(this._next,a)}},b.prototype.error=function(a){if(!this.isStopped){var b=this._parentSubscriber,c=config.useDeprecatedSynchronousErrorHandling;if(this._error)c&&b.syncErrorThrowable?(this.__tryOrSetError(b,this._error,a),this.unsubscribe()):(this.__tryOrUnsub(this._error,a),this.unsubscribe());else if(!b.syncErrorThrowable){if(this.unsubscribe(),c)throw a;hostReportError(a)}else c?(b.syncErrorValue=a,b.syncErrorThrown=!0):hostReportError(a),this.unsubscribe()}},b.prototype.complete=function(){var a=this;if(!this.isStopped){var b=this._parentSubscriber;if(this._complete){var c=function(){return a._complete.call(a._context)};config.useDeprecatedSynchronousErrorHandling&&b.syncErrorThrowable?(this.__tryOrSetError(b,c),this.unsubscribe()):(this.__tryOrUnsub(c),this.unsubscribe())}else this.unsubscribe()}},b.prototype.__tryOrUnsub=function(a,b){try{a.call(this._context,b)}catch(a){if(this.unsubscribe(),config.useDeprecatedSynchronousErrorHandling)throw a;else hostReportError(a)}},b.prototype.__tryOrSetError=function(a,b,c){if(!config.useDeprecatedSynchronousErrorHandling)throw new Error("bad call");try{b.call(this._context,c)}catch(b){return config.useDeprecatedSynchronousErrorHandling?(a.syncErrorValue=b,a.syncErrorThrown=!0,!0):(hostReportError(b),!0)}return!1},b.prototype._unsubscribe=function(){var a=this._parentSubscriber;this._context=null,this._parentSubscriber=null,a.unsubscribe()},b}(Subscriber);function canReportError(a){for(;a;){var b=a,c=b.closed,d=b.destination,e=b.isStopped;if(c||e)return!1;a=d&&d instanceof Subscriber?d:null}return!0}function toSubscriber(a,b,c){if(a){if(a instanceof Subscriber)return a;if(a[rxSubscriber])return a[rxSubscriber]()}return a||b||c?new Subscriber(a,b,c):new Subscriber(empty)}var observable="function"==typeof Symbol&&Symbol.observable||"@@observable";function noop(){}function pipeFromArray(a){return a?1===a.length?a[0]:function(b){return a.reduce(function(a,b){return b(a)},b)}:noop}var Observable=function(){function a(a){this._isScalar=!1,a&&(this._subscribe=a)}return a.prototype.lift=function(b){var c=new a;return c.source=this,c.operator=b,c},a.prototype.subscribe=function(a,b,c){var d=this.operator,e=toSubscriber(a,b,c);if(d?e.add(d.call(e,this.source)):e.add(this.source||config.useDeprecatedSynchronousErrorHandling&&!e.syncErrorThrowable?this._subscribe(e):this._trySubscribe(e)),config.useDeprecatedSynchronousErrorHandling&&e.syncErrorThrowable&&(e.syncErrorThrowable=!1,e.syncErrorThrown))throw e.syncErrorValue;return e},a.prototype._trySubscribe=function(a){try{return this._subscribe(a)}catch(b){config.useDeprecatedSynchronousErrorHandling&&(a.syncErrorThrown=!0,a.syncErrorValue=b),canReportError(a)?a.error(b):console.warn(b)}},a.prototype.forEach=function(a,b){var c=this;return b=getPromiseCtor(b),new b(function(b,d){var e=c.subscribe(function(b){try{a(b)}catch(a){d(a),e&&e.unsubscribe()}},d,b)})},a.prototype._subscribe=function(a){var b=this.source;return b&&b.subscribe(a)},a.prototype[observable]=function(){return this},a.prototype.pipe=function(){for(var a=[],b=0;b<arguments.length;b++)a[b]=arguments[b];return 0===a.length?this:pipeFromArray(a)(this)},a.prototype.toPromise=function(a){var b=this;return a=getPromiseCtor(a),new a(function(a,c){var d;b.subscribe(function(a){return d=a},function(a){return c(a)},function(){return a(d)})})},a.create=function(b){return new a(b)},a}();function getPromiseCtor(a){if(a||(a=Promise),!a)throw new Error("no Promise impl found");return a}function ObjectUnsubscribedErrorImpl(){return Error.call(this),this.message="object unsubscribed",this.name="ObjectUnsubscribedError",this}ObjectUnsubscribedErrorImpl.prototype=Object.create(Error.prototype);var ObjectUnsubscribedError=ObjectUnsubscribedErrorImpl,SubjectSubscription=function(a){function b(b,c){var d=a.call(this)||this;return d.subject=b,d.subscriber=c,d.closed=!1,d}return __extends(b,a),b.prototype.unsubscribe=function(){if(!this.closed){this.closed=!0;var a=this.subject,b=a.observers;if(this.subject=null,!(!b||0===b.length||a.isStopped||a.closed)){var c=b.indexOf(this.subscriber);-1!==c&&b.splice(c,1)}}},b}(Subscription),SubjectSubscriber=function(a){function b(b){var c=a.call(this,b)||this;return c.destination=b,c}return __extends(b,a),b}(Subscriber),Subject=function(a){function b(){var b=a.call(this)||this;return b.observers=[],b.closed=!1,b.isStopped=!1,b.hasError=!1,b.thrownError=null,b}return __extends(b,a),b.prototype[rxSubscriber]=function(){return new SubjectSubscriber(this)},b.prototype.lift=function(a){var b=new AnonymousSubject(this,this);return b.operator=a,b},b.prototype.next=function(a){if(this.closed)throw new ObjectUnsubscribedError;if(!this.isStopped)for(var b=this.observers,c=b.length,d=b.slice(),e=0;e<c;e++)d[e].next(a)},b.prototype.error=function(a){if(this.closed)throw new ObjectUnsubscribedError;this.hasError=!0,this.thrownError=a,this.isStopped=!0;for(var b=this.observers,c=b.length,d=b.slice(),e=0;e<c;e++)d[e].error(a);this.observers.length=0},b.prototype.complete=function(){if(this.closed)throw new ObjectUnsubscribedError;this.isStopped=!0;for(var a=this.observers,b=a.length,c=a.slice(),d=0;d<b;d++)c[d].complete();this.observers.length=0},b.prototype.unsubscribe=function(){this.isStopped=!0,this.closed=!0,this.observers=null},b.prototype._trySubscribe=function(b){if(this.closed)throw new ObjectUnsubscribedError;else return a.prototype._trySubscribe.call(this,b)},b.prototype._subscribe=function(a){if(this.closed)throw new ObjectUnsubscribedError;else return this.hasError?(a.error(this.thrownError),Subscription.EMPTY):this.isStopped?(a.complete(),Subscription.EMPTY):(this.observers.push(a),new SubjectSubscription(this,a))},b.prototype.asObservable=function(){var a=new Observable;return a.source=this,a},b.create=function(a,b){return new AnonymousSubject(a,b)},b}(Observable),AnonymousSubject=function(a){function b(b,c){var d=a.call(this)||this;return d.destination=b,d.source=c,d}return __extends(b,a),b.prototype.next=function(a){var b=this.destination;b&&b.next&&b.next(a)},b.prototype.error=function(a){var b=this.destination;b&&b.error&&this.destination.error(a)},b.prototype.complete=function(){var a=this.destination;a&&a.complete&&this.destination.complete()},b.prototype._subscribe=function(a){var b=this.source;return b?this.source.subscribe(a):Subscription.EMPTY},b}(Subject);function refCount(){return function(a){return a.lift(new RefCountOperator(a))}}var RefCountOperator=function(){function a(a){this.connectable=a}return a.prototype.call=function(a,b){var c=this.connectable;c._refCount++;var d=new RefCountSubscriber(a,c),e=b.subscribe(d);return d.closed||(d.connection=c.connect()),e},a}(),RefCountSubscriber=function(a){function b(b,c){var d=a.call(this,b)||this;return d.connectable=c,d}return __extends(b,a),b.prototype._unsubscribe=function(){var a=this.connectable;if(!a)return void(this.connection=null);this.connectable=null;var b=a._refCount;if(0>=b)return void(this.connection=null);if(a._refCount=b-1,1<b)return void(this.connection=null);var c=this.connection,d=a._connection;this.connection=null,d&&(!c||d===c)&&d.unsubscribe()},b}(Subscriber),ConnectableObservable=function(a){function b(b,c){var d=a.call(this)||this;return d.source=b,d.subjectFactory=c,d._refCount=0,d._isComplete=!1,d}return __extends(b,a),b.prototype._subscribe=function(a){return this.getSubject().subscribe(a)},b.prototype.getSubject=function(){var a=this._subject;return(!a||a.isStopped)&&(this._subject=this.subjectFactory()),this._subject},b.prototype.connect=function(){var a=this._connection;return a||(this._isComplete=!1,a=this._connection=new Subscription,a.add(this.source.subscribe(new ConnectableSubscriber(this.getSubject(),this))),a.closed&&(this._connection=null,a=Subscription.EMPTY)),a},b.prototype.refCount=function(){return refCount()(this)},b}(Observable),connectableProto=ConnectableObservable.prototype,connectableObservableDescriptor={operator:{value:null},_refCount:{value:0,writable:!0},_subject:{value:null,writable:!0},_connection:{value:null,writable:!0},_subscribe:{value:connectableProto._subscribe},_isComplete:{value:connectableProto._isComplete,writable:!0},getSubject:{value:connectableProto.getSubject},connect:{value:connectableProto.connect},refCount:{value:connectableProto.refCount}},ConnectableSubscriber=function(a){function b(b,c){var d=a.call(this,b)||this;return d.connectable=c,d}return __extends(b,a),b.prototype._error=function(b){this._unsubscribe(),a.prototype._error.call(this,b)},b.prototype._complete=function(){this.connectable._isComplete=!0,this._unsubscribe(),a.prototype._complete.call(this)},b.prototype._unsubscribe=function(){var a=this.connectable;if(a){this.connectable=null;var b=a._connection;a._refCount=0,a._subject=null,a._connection=null,b&&b.unsubscribe()}},b}(SubjectSubscriber),Action=function(a){function b(){return a.call(this)||this}return __extends(b,a),b.prototype.schedule=function(a,b){return void 0===b&&(b=0),this},b}(Subscription),AsyncAction=function(a){function b(b,c){var d=a.call(this,b,c)||this;return d.scheduler=b,d.work=c,d.pending=!1,d}return __extends(b,a),b.prototype.schedule=function(a,b){if(void 0===b&&(b=0),this.closed)return this;this.state=a;var c=this.id,d=this.scheduler;return null!=c&&(this.id=this.recycleAsyncId(d,c,b)),this.pending=!0,this.delay=b,this.id=this.id||this.requestAsyncId(d,this.id,b),this},b.prototype.requestAsyncId=function(a,b,c){return void 0===c&&(c=0),setInterval(a.flush.bind(a,this),c)},b.prototype.recycleAsyncId=function(a,b,c){return(void 0===c&&(c=0),null!==c&&this.delay===c&&!1===this.pending)?b:void clearInterval(b)},b.prototype.execute=function(a,b){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;var c=this._execute(a,b);return c?c:void(!1===this.pending&&null!=this.id&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null)))},b.prototype._execute=function(a){var b=!1,c=void 0;try{this.work(a)}catch(a){b=!0,c=!!a&&a||new Error(a)}if(b)return this.unsubscribe(),c},b.prototype._unsubscribe=function(){var a=this.id,b=this.scheduler,c=b.actions,d=c.indexOf(this);this.work=null,this.state=null,this.pending=!1,this.scheduler=null,-1!==d&&c.splice(d,1),null!=a&&(this.id=this.recycleAsyncId(b,a,null)),this.delay=null},b}(Action),QueueAction=function(a){function b(b,c){var d=a.call(this,b,c)||this;return d.scheduler=b,d.work=c,d}return __extends(b,a),b.prototype.schedule=function(b,c){return(void 0===c&&(c=0),0<c)?a.prototype.schedule.call(this,b,c):(this.delay=c,this.state=b,this.scheduler.flush(this),this)},b.prototype.execute=function(b,c){return 0<c||this.closed?a.prototype.execute.call(this,b,c):this._execute(b,c)},b.prototype.requestAsyncId=function(b,c,d){return void 0===d&&(d=0),null!==d&&0<d||null===d&&0<this.delay?a.prototype.requestAsyncId.call(this,b,c,d):b.flush(this)},b}(AsyncAction),Scheduler=function(){function a(b,c){void 0===c&&(c=a.now),this.SchedulerAction=b,this.now=c}return a.prototype.schedule=function(a,b,c){return void 0===b&&(b=0),new this.SchedulerAction(this,a).schedule(c,b)},a.now=function(){return Date.now()},a}(),AsyncScheduler=function(a){function b(c,d){void 0===d&&(d=Scheduler.now);var e=a.call(this,c,function(){return b.delegate&&b.delegate!==e?b.delegate.now():d()})||this;return e.actions=[],e.active=!1,e.scheduled=void 0,e}return __extends(b,a),b.prototype.schedule=function(c,d,e){return void 0===d&&(d=0),b.delegate&&b.delegate!==this?b.delegate.schedule(c,d,e):a.prototype.schedule.call(this,c,d,e)},b.prototype.flush=function(a){var b=this.actions;if(this.active)return void b.push(a);var c;this.active=!0;do if(c=a.execute(a.state,a.delay))break;while(a=b.shift());if(this.active=!1,c){for(;a=b.shift();)a.unsubscribe();throw c}},b}(Scheduler),QueueScheduler=function(a){function b(){return null!==a&&a.apply(this,arguments)||this}return __extends(b,a),b}(AsyncScheduler),queue=new QueueScheduler(QueueAction),EMPTY=new Observable(function(a){return a.complete()});function empty$1(a){return a?emptyScheduled(a):EMPTY}function emptyScheduled(a){return new Observable(function(b){return a.schedule(function(){return b.complete()})})}function isScheduler(a){return a&&"function"==typeof a.schedule}var subscribeToArray=function(a){return function(b){for(var c=0,d=a.length;c<d&&!b.closed;c++)b.next(a[c]);b.complete()}};function scheduleArray(a,b){return new Observable(function(c){var d=new Subscription,e=0;return d.add(b.schedule(function(){return e===a.length?void c.complete():void(c.next(a[e++]),!c.closed&&d.add(this.schedule()))})),d})}function fromArray(a,b){return b?scheduleArray(a,b):new Observable(subscribeToArray(a))}function of(){for(var a=[],b=0;b<arguments.length;b++)a[b]=arguments[b];var c=a[a.length-1];return isScheduler(c)?(a.pop(),scheduleArray(a,c)):fromArray(a)}function throwError(a,b){return b?new Observable(function(c){return b.schedule(dispatch,0,{error:a,subscriber:c})}):new Observable(function(b){return b.error(a)})}function dispatch(a){var b=a.error,c=a.subscriber;c.error(b)}var Notification=function(){function a(a,b,c){this.kind=a,this.value=b,this.error=c,this.hasValue="N"===a}return a.prototype.observe=function(a){switch(this.kind){case"N":return a.next&&a.next(this.value);case"E":return a.error&&a.error(this.error);case"C":return a.complete&&a.complete();}},a.prototype.do=function(a,b,c){var d=this.kind;return"N"===d?a&&a(this.value):"E"===d?b&&b(this.error):"C"===d?c&&c():void 0},a.prototype.accept=function(a,b,c){return a&&"function"==typeof a.next?this.observe(a):this.do(a,b,c)},a.prototype.toObservable=function(){var a=this.kind;switch(a){case"N":return of(this.value);case"E":return throwError(this.error);case"C":return empty$1();}throw new Error("unexpected notification kind value")},a.createNext=function(b){return"undefined"==typeof b?a.undefinedValueNotification:new a("N",b)},a.createError=function(b){return new a("E",void 0,b)},a.createComplete=function(){return a.completeNotification},a.completeNotification=new a("C"),a.undefinedValueNotification=new a("N",void 0),a}(),ObserveOnSubscriber=function(a){function b(b,c,d){void 0===d&&(d=0);var e=a.call(this,b)||this;return e.scheduler=c,e.delay=d,e}return __extends(b,a),b.dispatch=function(a){var b=a.notification,c=a.destination;b.observe(c),this.unsubscribe()},b.prototype.scheduleMessage=function(a){var c=this.destination;c.add(this.scheduler.schedule(b.dispatch,this.delay,new ObserveOnMessage(a,this.destination)))},b.prototype._next=function(a){this.scheduleMessage(Notification.createNext(a))},b.prototype._error=function(a){this.scheduleMessage(Notification.createError(a)),this.unsubscribe()},b.prototype._complete=function(){this.scheduleMessage(Notification.createComplete()),this.unsubscribe()},b}(Subscriber),ObserveOnMessage=function(){return function(a,b){this.notification=a,this.destination=b}}(),ReplaySubject=function(a){function b(b,c,d){var e=Number.POSITIVE_INFINITY;void 0===b&&(b=e),void 0===c&&(c=e);var f=a.call(this)||this;return f.scheduler=d,f._events=[],f._infiniteTimeWindow=!1,f._bufferSize=1>b?1:b,f._windowTime=1>c?1:c,c===e?(f._infiniteTimeWindow=!0,f.next=f.nextInfiniteTimeWindow):f.next=f.nextTimeWindow,f}return __extends(b,a),b.prototype.nextInfiniteTimeWindow=function(b){var c=this._events;c.push(b),c.length>this._bufferSize&&c.shift(),a.prototype.next.call(this,b)},b.prototype.nextTimeWindow=function(b){this._events.push(new ReplayEvent(this._getNow(),b)),this._trimBufferThenGetEvents(),a.prototype.next.call(this,b)},b.prototype._subscribe=function(a){var b,c=this._infiniteTimeWindow,d=c?this._events:this._trimBufferThenGetEvents(),e=this.scheduler,f=d.length;if(this.closed)throw new ObjectUnsubscribedError;else this.isStopped||this.hasError?b=Subscription.EMPTY:(this.observers.push(a),b=new SubjectSubscription(this,a));if(e&&a.add(a=new ObserveOnSubscriber(a,e)),c)for(var g=0;g<f&&!a.closed;g++)a.next(d[g]);else for(var g=0;g<f&&!a.closed;g++)a.next(d[g].value);return this.hasError?a.error(this.thrownError):this.isStopped&&a.complete(),b},b.prototype._getNow=function(){return(this.scheduler||queue).now()},b.prototype._trimBufferThenGetEvents=function(){for(var a=Math.max,b=this._getNow(),c=this._bufferSize,d=this._windowTime,e=this._events,f=e.length,g=0;g<f&&!(b-e[g].time<d);)g++;return f>c&&(g=a(g,f-c)),0<g&&e.splice(0,g),e},b}(Subject),ReplayEvent=function(){return function(a,b){this.time=a,this.value=b}}(),onlineSubject$=new ReplaySubject(1);onlineSubject$.next(!0);function updateOnlineStatus(){navigator&&navigator.online!=null&&onlineSubject$.next(navigator.online)}window.addEventListener("online",updateOnlineStatus),window.addEventListener("offline",updateOnlineStatus);var online$=onlineSubject$,onlineListener=online$;export{onlineListener};
//# sourceMappingURL=online-listener.esm.js.map
