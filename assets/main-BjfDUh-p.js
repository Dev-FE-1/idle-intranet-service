var hn=Object.defineProperty;var mn=(t,e,n)=>e in t?hn(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var T=(t,e,n)=>mn(t,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const Y={PRIMARY:"var(--color-primary)",BLACK:"var(--color-black)",DARKEST_GRAY:"var(--color-darkest-gray)",DARK_GRAY:"var(--color-dark-gray)",LIGHT_GRAY:"var(--color-light-gray)",LIGHTEST_GRAY:"var(--color-lightest-gray)"},ne="/idle-intranet-service",I={SIGNIN:`${ne}/signin`,HOME:`${ne}/`,ANNOUNCEMENT:`${ne}/announcements/:id`,ANNOUNCEMENTS:`${ne}/announcements`,MEMBER:`${ne}/members/:id`,MEMBERS:`${ne}/members`,PROFILE:`${ne}/profile`,WORK_MANAGE:`${ne}/work-manage`},U={SIGNIN:"로그인",HOME:"홈",MEMBERS:"구성원",PROFILE:"프로필",WORK_MANAGE:"근무/휴가",ANNOUNCEMENT:"공지사항"};var pn={VITE_SERVER_URL:"https://equal-rosemarie-deun-b63b6790.koyeb.app",VITE_BASE_URL:"/idle-intranet-service",BASE_URL:"/idle-intranet-service/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_SERVER_URL:fn}=pn,Mt=fn,gn=async(t,e,n)=>{try{const s=await fetch(`${Mt}/api/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,password:e})});if(!s.ok){const i=await s.json();s.status===400?n(`잘못된 요청입니다. ${i.error}`):s.status===401?n("로그인에 실패하였습니다. 이메일과 비밀번호를 다시 확인해 주시기 바랍니다"):n(`오류: ${i.message||"알 수 없는 오류가 발생했습니다."}`);return}const r=await s.json();r.status==="OK"?(localStorage.setItem("token",r.token),window.location.href=I.HOME):n(`로그인에 실패하였습니다: ${r.message||"알 수 없는 오류가 발생했습니다."}`)}catch{n("알 수 없는 오류가 발생했습니다.")}},Ct=()=>{localStorage.removeItem("token"),window.location.href=I.SIGNIN},he=async()=>{const t=localStorage.getItem("token");if(!t)return!1;try{const e=await fetch(`${Mt}/api/verify-token`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}});if(!e.ok)throw new Error("Token is not valid");return(await e.json()).valid}catch(e){return console.error("Token verification failed:",e),!1}};function Lt(t,e){return function(){return t.apply(e,arguments)}}const{toString:wn}=Object.prototype,{getPrototypeOf:nt}=Object,Ne=(t=>e=>{const n=wn.call(e);return t[n]||(t[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),J=t=>(t=t.toLowerCase(),e=>Ne(e)===t),_e=t=>e=>typeof e===t,{isArray:fe}=Array,ve=_e("undefined");function yn(t){return t!==null&&!ve(t)&&t.constructor!==null&&!ve(t.constructor)&&W(t.constructor.isBuffer)&&t.constructor.isBuffer(t)}const Dt=J("ArrayBuffer");function bn(t){let e;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?e=ArrayBuffer.isView(t):e=t&&t.buffer&&Dt(t.buffer),e}const vn=_e("string"),W=_e("function"),Ot=_e("number"),Be=t=>t!==null&&typeof t=="object",En=t=>t===!0||t===!1,Ce=t=>{if(Ne(t)!=="object")return!1;const e=nt(t);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in t)&&!(Symbol.iterator in t)},Sn=J("Date"),$n=J("File"),Tn=J("Blob"),kn=J("FileList"),An=t=>Be(t)&&W(t.pipe),Rn=t=>{let e;return t&&(typeof FormData=="function"&&t instanceof FormData||W(t.append)&&((e=Ne(t))==="formdata"||e==="object"&&W(t.toString)&&t.toString()==="[object FormData]"))},In=J("URLSearchParams"),[Mn,Cn,Ln,Dn]=["ReadableStream","Request","Response","Headers"].map(J),On=t=>t.trim?t.trim():t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Ee(t,e,{allOwnKeys:n=!1}={}){if(t===null||typeof t>"u")return;let s,r;if(typeof t!="object"&&(t=[t]),fe(t))for(s=0,r=t.length;s<r;s++)e.call(null,t[s],s,t);else{const i=n?Object.getOwnPropertyNames(t):Object.keys(t),o=i.length;let a;for(s=0;s<o;s++)a=i[s],e.call(null,t[a],a,t)}}function Pt(t,e){e=e.toLowerCase();const n=Object.keys(t);let s=n.length,r;for(;s-- >0;)if(r=n[s],e===r.toLowerCase())return r;return null}const xt=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,Nt=t=>!ve(t)&&t!==xt;function Ge(){const{caseless:t}=Nt(this)&&this||{},e={},n=(s,r)=>{const i=t&&Pt(e,r)||r;Ce(e[i])&&Ce(s)?e[i]=Ge(e[i],s):Ce(s)?e[i]=Ge({},s):fe(s)?e[i]=s.slice():e[i]=s};for(let s=0,r=arguments.length;s<r;s++)arguments[s]&&Ee(arguments[s],n);return e}const Pn=(t,e,n,{allOwnKeys:s}={})=>(Ee(e,(r,i)=>{n&&W(r)?t[i]=Lt(r,n):t[i]=r},{allOwnKeys:s}),t),xn=t=>(t.charCodeAt(0)===65279&&(t=t.slice(1)),t),Nn=(t,e,n,s)=>{t.prototype=Object.create(e.prototype,s),t.prototype.constructor=t,Object.defineProperty(t,"super",{value:e.prototype}),n&&Object.assign(t.prototype,n)},_n=(t,e,n,s)=>{let r,i,o;const a={};if(e=e||{},t==null)return e;do{for(r=Object.getOwnPropertyNames(t),i=r.length;i-- >0;)o=r[i],(!s||s(o,t,e))&&!a[o]&&(e[o]=t[o],a[o]=!0);t=n!==!1&&nt(t)}while(t&&(!n||n(t,e))&&t!==Object.prototype);return e},Bn=(t,e,n)=>{t=String(t),(n===void 0||n>t.length)&&(n=t.length),n-=e.length;const s=t.indexOf(e,n);return s!==-1&&s===n},Un=t=>{if(!t)return null;if(fe(t))return t;let e=t.length;if(!Ot(e))return null;const n=new Array(e);for(;e-- >0;)n[e]=t[e];return n},Hn=(t=>e=>t&&e instanceof t)(typeof Uint8Array<"u"&&nt(Uint8Array)),Fn=(t,e)=>{const s=(t&&t[Symbol.iterator]).call(t);let r;for(;(r=s.next())&&!r.done;){const i=r.value;e.call(t,i[0],i[1])}},qn=(t,e)=>{let n;const s=[];for(;(n=t.exec(e))!==null;)s.push(n);return s},Vn=J("HTMLFormElement"),jn=t=>t.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,s,r){return s.toUpperCase()+r}),ht=(({hasOwnProperty:t})=>(e,n)=>t.call(e,n))(Object.prototype),Wn=J("RegExp"),_t=(t,e)=>{const n=Object.getOwnPropertyDescriptors(t),s={};Ee(n,(r,i)=>{let o;(o=e(r,i,t))!==!1&&(s[i]=o||r)}),Object.defineProperties(t,s)},zn=t=>{_t(t,(e,n)=>{if(W(t)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const s=t[n];if(W(s)){if(e.enumerable=!1,"writable"in e){e.writable=!1;return}e.set||(e.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},Gn=(t,e)=>{const n={},s=r=>{r.forEach(i=>{n[i]=!0})};return fe(t)?s(t):s(String(t).split(e)),n},Kn=()=>{},Jn=(t,e)=>t!=null&&Number.isFinite(t=+t)?t:e,qe="abcdefghijklmnopqrstuvwxyz",mt="0123456789",Bt={DIGIT:mt,ALPHA:qe,ALPHA_DIGIT:qe+qe.toUpperCase()+mt},Yn=(t=16,e=Bt.ALPHA_DIGIT)=>{let n="";const{length:s}=e;for(;t--;)n+=e[Math.random()*s|0];return n};function Zn(t){return!!(t&&W(t.append)&&t[Symbol.toStringTag]==="FormData"&&t[Symbol.iterator])}const Xn=t=>{const e=new Array(10),n=(s,r)=>{if(Be(s)){if(e.indexOf(s)>=0)return;if(!("toJSON"in s)){e[r]=s;const i=fe(s)?[]:{};return Ee(s,(o,a)=>{const d=n(o,r+1);!ve(d)&&(i[a]=d)}),e[r]=void 0,i}}return s};return n(t,0)},Qn=J("AsyncFunction"),es=t=>t&&(Be(t)||W(t))&&W(t.then)&&W(t.catch),c={isArray:fe,isArrayBuffer:Dt,isBuffer:yn,isFormData:Rn,isArrayBufferView:bn,isString:vn,isNumber:Ot,isBoolean:En,isObject:Be,isPlainObject:Ce,isReadableStream:Mn,isRequest:Cn,isResponse:Ln,isHeaders:Dn,isUndefined:ve,isDate:Sn,isFile:$n,isBlob:Tn,isRegExp:Wn,isFunction:W,isStream:An,isURLSearchParams:In,isTypedArray:Hn,isFileList:kn,forEach:Ee,merge:Ge,extend:Pn,trim:On,stripBOM:xn,inherits:Nn,toFlatObject:_n,kindOf:Ne,kindOfTest:J,endsWith:Bn,toArray:Un,forEachEntry:Fn,matchAll:qn,isHTMLForm:Vn,hasOwnProperty:ht,hasOwnProp:ht,reduceDescriptors:_t,freezeMethods:zn,toObjectSet:Gn,toCamelCase:jn,noop:Kn,toFiniteNumber:Jn,findKey:Pt,global:xt,isContextDefined:Nt,ALPHABET:Bt,generateString:Yn,isSpecCompliantForm:Zn,toJSONObject:Xn,isAsyncFn:Qn,isThenable:es};function b(t,e,n,s,r){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=t,this.name="AxiosError",e&&(this.code=e),n&&(this.config=n),s&&(this.request=s),r&&(this.response=r)}c.inherits(b,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:c.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});const Ut=b.prototype,Ht={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(t=>{Ht[t]={value:t}});Object.defineProperties(b,Ht);Object.defineProperty(Ut,"isAxiosError",{value:!0});b.from=(t,e,n,s,r,i)=>{const o=Object.create(Ut);return c.toFlatObject(t,o,function(d){return d!==Error.prototype},a=>a!=="isAxiosError"),b.call(o,t.message,e,n,s,r),o.cause=t,o.name=t.name,i&&Object.assign(o,i),o};const ts=null;function Ke(t){return c.isPlainObject(t)||c.isArray(t)}function Ft(t){return c.endsWith(t,"[]")?t.slice(0,-2):t}function pt(t,e,n){return t?t.concat(e).map(function(r,i){return r=Ft(r),!n&&i?"["+r+"]":r}).join(n?".":""):e}function ns(t){return c.isArray(t)&&!t.some(Ke)}const ss=c.toFlatObject(c,{},null,function(e){return/^is[A-Z]/.test(e)});function Ue(t,e,n){if(!c.isObject(t))throw new TypeError("target must be an object");e=e||new FormData,n=c.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(v,P){return!c.isUndefined(P[v])});const s=n.metaTokens,r=n.visitor||l,i=n.dots,o=n.indexes,d=(n.Blob||typeof Blob<"u"&&Blob)&&c.isSpecCompliantForm(e);if(!c.isFunction(r))throw new TypeError("visitor must be a function");function u(g){if(g===null)return"";if(c.isDate(g))return g.toISOString();if(!d&&c.isBlob(g))throw new b("Blob is not supported. Use a Buffer instead.");return c.isArrayBuffer(g)||c.isTypedArray(g)?d&&typeof Blob=="function"?new Blob([g]):Buffer.from(g):g}function l(g,v,P){let x=g;if(g&&!P&&typeof g=="object"){if(c.endsWith(v,"{}"))v=s?v:v.slice(0,-2),g=JSON.stringify(g);else if(c.isArray(g)&&ns(g)||(c.isFileList(g)||c.endsWith(v,"[]"))&&(x=c.toArray(g)))return v=Ft(v),x.forEach(function(A,ie){!(c.isUndefined(A)||A===null)&&e.append(o===!0?pt([v],ie,i):o===null?v:v+"[]",u(A))}),!1}return Ke(g)?!0:(e.append(pt(P,v,i),u(g)),!1)}const m=[],M=Object.assign(ss,{defaultVisitor:l,convertValue:u,isVisitable:Ke});function $(g,v){if(!c.isUndefined(g)){if(m.indexOf(g)!==-1)throw Error("Circular reference detected in "+v.join("."));m.push(g),c.forEach(g,function(x,G){(!(c.isUndefined(x)||x===null)&&r.call(e,x,c.isString(G)?G.trim():G,v,M))===!0&&$(x,v?v.concat(G):[G])}),m.pop()}}if(!c.isObject(t))throw new TypeError("data must be an object");return $(t),e}function ft(t){const e={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(t).replace(/[!'()~]|%20|%00/g,function(s){return e[s]})}function st(t,e){this._pairs=[],t&&Ue(t,this,e)}const qt=st.prototype;qt.append=function(e,n){this._pairs.push([e,n])};qt.toString=function(e){const n=e?function(s){return e.call(this,s,ft)}:ft;return this._pairs.map(function(r){return n(r[0])+"="+n(r[1])},"").join("&")};function rs(t){return encodeURIComponent(t).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function Vt(t,e,n){if(!e)return t;const s=n&&n.encode||rs,r=n&&n.serialize;let i;if(r?i=r(e,n):i=c.isURLSearchParams(e)?e.toString():new st(e,n).toString(s),i){const o=t.indexOf("#");o!==-1&&(t=t.slice(0,o)),t+=(t.indexOf("?")===-1?"?":"&")+i}return t}class gt{constructor(){this.handlers=[]}use(e,n,s){return this.handlers.push({fulfilled:e,rejected:n,synchronous:s?s.synchronous:!1,runWhen:s?s.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(e){c.forEach(this.handlers,function(s){s!==null&&e(s)})}}const jt={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},is=typeof URLSearchParams<"u"?URLSearchParams:st,os=typeof FormData<"u"?FormData:null,as=typeof Blob<"u"?Blob:null,cs={isBrowser:!0,classes:{URLSearchParams:is,FormData:os,Blob:as},protocols:["http","https","file","blob","url","data"]},rt=typeof window<"u"&&typeof document<"u",ls=(t=>rt&&["ReactNative","NativeScript","NS"].indexOf(t)<0)(typeof navigator<"u"&&navigator.product),us=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",ds=rt&&window.location.href||"http://localhost",hs=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:rt,hasStandardBrowserEnv:ls,hasStandardBrowserWebWorkerEnv:us,origin:ds},Symbol.toStringTag,{value:"Module"})),K={...hs,...cs};function ms(t,e){return Ue(t,new K.classes.URLSearchParams,Object.assign({visitor:function(n,s,r,i){return K.isNode&&c.isBuffer(n)?(this.append(s,n.toString("base64")),!1):i.defaultVisitor.apply(this,arguments)}},e))}function ps(t){return c.matchAll(/\w+|\[(\w*)]/g,t).map(e=>e[0]==="[]"?"":e[1]||e[0])}function fs(t){const e={},n=Object.keys(t);let s;const r=n.length;let i;for(s=0;s<r;s++)i=n[s],e[i]=t[i];return e}function Wt(t){function e(n,s,r,i){let o=n[i++];if(o==="__proto__")return!0;const a=Number.isFinite(+o),d=i>=n.length;return o=!o&&c.isArray(r)?r.length:o,d?(c.hasOwnProp(r,o)?r[o]=[r[o],s]:r[o]=s,!a):((!r[o]||!c.isObject(r[o]))&&(r[o]=[]),e(n,s,r[o],i)&&c.isArray(r[o])&&(r[o]=fs(r[o])),!a)}if(c.isFormData(t)&&c.isFunction(t.entries)){const n={};return c.forEachEntry(t,(s,r)=>{e(ps(s),r,n,0)}),n}return null}function gs(t,e,n){if(c.isString(t))try{return(e||JSON.parse)(t),c.trim(t)}catch(s){if(s.name!=="SyntaxError")throw s}return(n||JSON.stringify)(t)}const Se={transitional:jt,adapter:["xhr","http","fetch"],transformRequest:[function(e,n){const s=n.getContentType()||"",r=s.indexOf("application/json")>-1,i=c.isObject(e);if(i&&c.isHTMLForm(e)&&(e=new FormData(e)),c.isFormData(e))return r?JSON.stringify(Wt(e)):e;if(c.isArrayBuffer(e)||c.isBuffer(e)||c.isStream(e)||c.isFile(e)||c.isBlob(e)||c.isReadableStream(e))return e;if(c.isArrayBufferView(e))return e.buffer;if(c.isURLSearchParams(e))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),e.toString();let a;if(i){if(s.indexOf("application/x-www-form-urlencoded")>-1)return ms(e,this.formSerializer).toString();if((a=c.isFileList(e))||s.indexOf("multipart/form-data")>-1){const d=this.env&&this.env.FormData;return Ue(a?{"files[]":e}:e,d&&new d,this.formSerializer)}}return i||r?(n.setContentType("application/json",!1),gs(e)):e}],transformResponse:[function(e){const n=this.transitional||Se.transitional,s=n&&n.forcedJSONParsing,r=this.responseType==="json";if(c.isResponse(e)||c.isReadableStream(e))return e;if(e&&c.isString(e)&&(s&&!this.responseType||r)){const o=!(n&&n.silentJSONParsing)&&r;try{return JSON.parse(e)}catch(a){if(o)throw a.name==="SyntaxError"?b.from(a,b.ERR_BAD_RESPONSE,this,null,this.response):a}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:K.classes.FormData,Blob:K.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};c.forEach(["delete","get","head","post","put","patch"],t=>{Se.headers[t]={}});const ws=c.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),ys=t=>{const e={};let n,s,r;return t&&t.split(`
`).forEach(function(o){r=o.indexOf(":"),n=o.substring(0,r).trim().toLowerCase(),s=o.substring(r+1).trim(),!(!n||e[n]&&ws[n])&&(n==="set-cookie"?e[n]?e[n].push(s):e[n]=[s]:e[n]=e[n]?e[n]+", "+s:s)}),e},wt=Symbol("internals");function be(t){return t&&String(t).trim().toLowerCase()}function Le(t){return t===!1||t==null?t:c.isArray(t)?t.map(Le):String(t)}function bs(t){const e=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let s;for(;s=n.exec(t);)e[s[1]]=s[2];return e}const vs=t=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim());function Ve(t,e,n,s,r){if(c.isFunction(s))return s.call(this,e,n);if(r&&(e=n),!!c.isString(e)){if(c.isString(s))return e.indexOf(s)!==-1;if(c.isRegExp(s))return s.test(e)}}function Es(t){return t.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(e,n,s)=>n.toUpperCase()+s)}function Ss(t,e){const n=c.toCamelCase(" "+e);["get","set","has"].forEach(s=>{Object.defineProperty(t,s+n,{value:function(r,i,o){return this[s].call(this,e,r,i,o)},configurable:!0})})}class q{constructor(e){e&&this.set(e)}set(e,n,s){const r=this;function i(a,d,u){const l=be(d);if(!l)throw new Error("header name must be a non-empty string");const m=c.findKey(r,l);(!m||r[m]===void 0||u===!0||u===void 0&&r[m]!==!1)&&(r[m||d]=Le(a))}const o=(a,d)=>c.forEach(a,(u,l)=>i(u,l,d));if(c.isPlainObject(e)||e instanceof this.constructor)o(e,n);else if(c.isString(e)&&(e=e.trim())&&!vs(e))o(ys(e),n);else if(c.isHeaders(e))for(const[a,d]of e.entries())i(d,a,s);else e!=null&&i(n,e,s);return this}get(e,n){if(e=be(e),e){const s=c.findKey(this,e);if(s){const r=this[s];if(!n)return r;if(n===!0)return bs(r);if(c.isFunction(n))return n.call(this,r,s);if(c.isRegExp(n))return n.exec(r);throw new TypeError("parser must be boolean|regexp|function")}}}has(e,n){if(e=be(e),e){const s=c.findKey(this,e);return!!(s&&this[s]!==void 0&&(!n||Ve(this,this[s],s,n)))}return!1}delete(e,n){const s=this;let r=!1;function i(o){if(o=be(o),o){const a=c.findKey(s,o);a&&(!n||Ve(s,s[a],a,n))&&(delete s[a],r=!0)}}return c.isArray(e)?e.forEach(i):i(e),r}clear(e){const n=Object.keys(this);let s=n.length,r=!1;for(;s--;){const i=n[s];(!e||Ve(this,this[i],i,e,!0))&&(delete this[i],r=!0)}return r}normalize(e){const n=this,s={};return c.forEach(this,(r,i)=>{const o=c.findKey(s,i);if(o){n[o]=Le(r),delete n[i];return}const a=e?Es(i):String(i).trim();a!==i&&delete n[i],n[a]=Le(r),s[a]=!0}),this}concat(...e){return this.constructor.concat(this,...e)}toJSON(e){const n=Object.create(null);return c.forEach(this,(s,r)=>{s!=null&&s!==!1&&(n[r]=e&&c.isArray(s)?s.join(", "):s)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([e,n])=>e+": "+n).join(`
`)}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(e){return e instanceof this?e:new this(e)}static concat(e,...n){const s=new this(e);return n.forEach(r=>s.set(r)),s}static accessor(e){const s=(this[wt]=this[wt]={accessors:{}}).accessors,r=this.prototype;function i(o){const a=be(o);s[a]||(Ss(r,o),s[a]=!0)}return c.isArray(e)?e.forEach(i):i(e),this}}q.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);c.reduceDescriptors(q.prototype,({value:t},e)=>{let n=e[0].toUpperCase()+e.slice(1);return{get:()=>t,set(s){this[n]=s}}});c.freezeMethods(q);function je(t,e){const n=this||Se,s=e||n,r=q.from(s.headers);let i=s.data;return c.forEach(t,function(a){i=a.call(n,i,r.normalize(),e?e.status:void 0)}),r.normalize(),i}function zt(t){return!!(t&&t.__CANCEL__)}function ge(t,e,n){b.call(this,t??"canceled",b.ERR_CANCELED,e,n),this.name="CanceledError"}c.inherits(ge,b,{__CANCEL__:!0});function Gt(t,e,n){const s=n.config.validateStatus;!n.status||!s||s(n.status)?t(n):e(new b("Request failed with status code "+n.status,[b.ERR_BAD_REQUEST,b.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}function $s(t){const e=/^([-+\w]{1,25})(:?\/\/|:)/.exec(t);return e&&e[1]||""}function Ts(t,e){t=t||10;const n=new Array(t),s=new Array(t);let r=0,i=0,o;return e=e!==void 0?e:1e3,function(d){const u=Date.now(),l=s[i];o||(o=u),n[r]=d,s[r]=u;let m=i,M=0;for(;m!==r;)M+=n[m++],m=m%t;if(r=(r+1)%t,r===i&&(i=(i+1)%t),u-o<e)return;const $=l&&u-l;return $?Math.round(M*1e3/$):void 0}}function ks(t,e){let n=0;const s=1e3/e;let r=null;return function(){const o=this===!0,a=Date.now();if(o||a-n>s)return r&&(clearTimeout(r),r=null),n=a,t.apply(null,arguments);r||(r=setTimeout(()=>(r=null,n=Date.now(),t.apply(null,arguments)),s-(a-n)))}}const Oe=(t,e,n=3)=>{let s=0;const r=Ts(50,250);return ks(i=>{const o=i.loaded,a=i.lengthComputable?i.total:void 0,d=o-s,u=r(d),l=o<=a;s=o;const m={loaded:o,total:a,progress:a?o/a:void 0,bytes:d,rate:u||void 0,estimated:u&&a&&l?(a-o)/u:void 0,event:i,lengthComputable:a!=null};m[e?"download":"upload"]=!0,t(m)},n)},As=K.hasStandardBrowserEnv?function(){const e=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");let s;function r(i){let o=i;return e&&(n.setAttribute("href",o),o=n.href),n.setAttribute("href",o),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:n.pathname.charAt(0)==="/"?n.pathname:"/"+n.pathname}}return s=r(window.location.href),function(o){const a=c.isString(o)?r(o):o;return a.protocol===s.protocol&&a.host===s.host}}():function(){return function(){return!0}}(),Rs=K.hasStandardBrowserEnv?{write(t,e,n,s,r,i){const o=[t+"="+encodeURIComponent(e)];c.isNumber(n)&&o.push("expires="+new Date(n).toGMTString()),c.isString(s)&&o.push("path="+s),c.isString(r)&&o.push("domain="+r),i===!0&&o.push("secure"),document.cookie=o.join("; ")},read(t){const e=document.cookie.match(new RegExp("(^|;\\s*)("+t+")=([^;]*)"));return e?decodeURIComponent(e[3]):null},remove(t){this.write(t,"",Date.now()-864e5)}}:{write(){},read(){return null},remove(){}};function Is(t){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)}function Ms(t,e){return e?t.replace(/\/?\/$/,"")+"/"+e.replace(/^\/+/,""):t}function Kt(t,e){return t&&!Is(e)?Ms(t,e):e}const yt=t=>t instanceof q?{...t}:t;function de(t,e){e=e||{};const n={};function s(u,l,m){return c.isPlainObject(u)&&c.isPlainObject(l)?c.merge.call({caseless:m},u,l):c.isPlainObject(l)?c.merge({},l):c.isArray(l)?l.slice():l}function r(u,l,m){if(c.isUndefined(l)){if(!c.isUndefined(u))return s(void 0,u,m)}else return s(u,l,m)}function i(u,l){if(!c.isUndefined(l))return s(void 0,l)}function o(u,l){if(c.isUndefined(l)){if(!c.isUndefined(u))return s(void 0,u)}else return s(void 0,l)}function a(u,l,m){if(m in e)return s(u,l);if(m in t)return s(void 0,u)}const d={url:i,method:i,data:i,baseURL:o,transformRequest:o,transformResponse:o,paramsSerializer:o,timeout:o,timeoutMessage:o,withCredentials:o,withXSRFToken:o,adapter:o,responseType:o,xsrfCookieName:o,xsrfHeaderName:o,onUploadProgress:o,onDownloadProgress:o,decompress:o,maxContentLength:o,maxBodyLength:o,beforeRedirect:o,transport:o,httpAgent:o,httpsAgent:o,cancelToken:o,socketPath:o,responseEncoding:o,validateStatus:a,headers:(u,l)=>r(yt(u),yt(l),!0)};return c.forEach(Object.keys(Object.assign({},t,e)),function(l){const m=d[l]||r,M=m(t[l],e[l],l);c.isUndefined(M)&&m!==a||(n[l]=M)}),n}const Jt=t=>{const e=de({},t);let{data:n,withXSRFToken:s,xsrfHeaderName:r,xsrfCookieName:i,headers:o,auth:a}=e;e.headers=o=q.from(o),e.url=Vt(Kt(e.baseURL,e.url),t.params,t.paramsSerializer),a&&o.set("Authorization","Basic "+btoa((a.username||"")+":"+(a.password?unescape(encodeURIComponent(a.password)):"")));let d;if(c.isFormData(n)){if(K.hasStandardBrowserEnv||K.hasStandardBrowserWebWorkerEnv)o.setContentType(void 0);else if((d=o.getContentType())!==!1){const[u,...l]=d?d.split(";").map(m=>m.trim()).filter(Boolean):[];o.setContentType([u||"multipart/form-data",...l].join("; "))}}if(K.hasStandardBrowserEnv&&(s&&c.isFunction(s)&&(s=s(e)),s||s!==!1&&As(e.url))){const u=r&&i&&Rs.read(i);u&&o.set(r,u)}return e},Cs=typeof XMLHttpRequest<"u",Ls=Cs&&function(t){return new Promise(function(n,s){const r=Jt(t);let i=r.data;const o=q.from(r.headers).normalize();let{responseType:a}=r,d;function u(){r.cancelToken&&r.cancelToken.unsubscribe(d),r.signal&&r.signal.removeEventListener("abort",d)}let l=new XMLHttpRequest;l.open(r.method.toUpperCase(),r.url,!0),l.timeout=r.timeout;function m(){if(!l)return;const $=q.from("getAllResponseHeaders"in l&&l.getAllResponseHeaders()),v={data:!a||a==="text"||a==="json"?l.responseText:l.response,status:l.status,statusText:l.statusText,headers:$,config:t,request:l};Gt(function(x){n(x),u()},function(x){s(x),u()},v),l=null}"onloadend"in l?l.onloadend=m:l.onreadystatechange=function(){!l||l.readyState!==4||l.status===0&&!(l.responseURL&&l.responseURL.indexOf("file:")===0)||setTimeout(m)},l.onabort=function(){l&&(s(new b("Request aborted",b.ECONNABORTED,r,l)),l=null)},l.onerror=function(){s(new b("Network Error",b.ERR_NETWORK,r,l)),l=null},l.ontimeout=function(){let g=r.timeout?"timeout of "+r.timeout+"ms exceeded":"timeout exceeded";const v=r.transitional||jt;r.timeoutErrorMessage&&(g=r.timeoutErrorMessage),s(new b(g,v.clarifyTimeoutError?b.ETIMEDOUT:b.ECONNABORTED,r,l)),l=null},i===void 0&&o.setContentType(null),"setRequestHeader"in l&&c.forEach(o.toJSON(),function(g,v){l.setRequestHeader(v,g)}),c.isUndefined(r.withCredentials)||(l.withCredentials=!!r.withCredentials),a&&a!=="json"&&(l.responseType=r.responseType),typeof r.onDownloadProgress=="function"&&l.addEventListener("progress",Oe(r.onDownloadProgress,!0)),typeof r.onUploadProgress=="function"&&l.upload&&l.upload.addEventListener("progress",Oe(r.onUploadProgress)),(r.cancelToken||r.signal)&&(d=$=>{l&&(s(!$||$.type?new ge(null,t,l):$),l.abort(),l=null)},r.cancelToken&&r.cancelToken.subscribe(d),r.signal&&(r.signal.aborted?d():r.signal.addEventListener("abort",d)));const M=$s(r.url);if(M&&K.protocols.indexOf(M)===-1){s(new b("Unsupported protocol "+M+":",b.ERR_BAD_REQUEST,t));return}l.send(i||null)})},Ds=(t,e)=>{let n=new AbortController,s;const r=function(d){if(!s){s=!0,o();const u=d instanceof Error?d:this.reason;n.abort(u instanceof b?u:new ge(u instanceof Error?u.message:u))}};let i=e&&setTimeout(()=>{r(new b(`timeout ${e} of ms exceeded`,b.ETIMEDOUT))},e);const o=()=>{t&&(i&&clearTimeout(i),i=null,t.forEach(d=>{d&&(d.removeEventListener?d.removeEventListener("abort",r):d.unsubscribe(r))}),t=null)};t.forEach(d=>d&&d.addEventListener&&d.addEventListener("abort",r));const{signal:a}=n;return a.unsubscribe=o,[a,()=>{i&&clearTimeout(i),i=null}]},Os=function*(t,e){let n=t.byteLength;if(!e||n<e){yield t;return}let s=0,r;for(;s<n;)r=s+e,yield t.slice(s,r),s=r},Ps=async function*(t,e,n){for await(const s of t)yield*Os(ArrayBuffer.isView(s)?s:await n(String(s)),e)},bt=(t,e,n,s,r)=>{const i=Ps(t,e,r);let o=0;return new ReadableStream({type:"bytes",async pull(a){const{done:d,value:u}=await i.next();if(d){a.close(),s();return}let l=u.byteLength;n&&n(o+=l),a.enqueue(new Uint8Array(u))},cancel(a){return s(a),i.return()}},{highWaterMark:2})},vt=(t,e)=>{const n=t!=null;return s=>setTimeout(()=>e({lengthComputable:n,total:t,loaded:s}))},He=typeof fetch=="function"&&typeof Request=="function"&&typeof Response=="function",Yt=He&&typeof ReadableStream=="function",Je=He&&(typeof TextEncoder=="function"?(t=>e=>t.encode(e))(new TextEncoder):async t=>new Uint8Array(await new Response(t).arrayBuffer())),xs=Yt&&(()=>{let t=!1;const e=new Request(K.origin,{body:new ReadableStream,method:"POST",get duplex(){return t=!0,"half"}}).headers.has("Content-Type");return t&&!e})(),Et=64*1024,Ye=Yt&&!!(()=>{try{return c.isReadableStream(new Response("").body)}catch{}})(),Pe={stream:Ye&&(t=>t.body)};He&&(t=>{["text","arrayBuffer","blob","formData","stream"].forEach(e=>{!Pe[e]&&(Pe[e]=c.isFunction(t[e])?n=>n[e]():(n,s)=>{throw new b(`Response type '${e}' is not supported`,b.ERR_NOT_SUPPORT,s)})})})(new Response);const Ns=async t=>{if(t==null)return 0;if(c.isBlob(t))return t.size;if(c.isSpecCompliantForm(t))return(await new Request(t).arrayBuffer()).byteLength;if(c.isArrayBufferView(t))return t.byteLength;if(c.isURLSearchParams(t)&&(t=t+""),c.isString(t))return(await Je(t)).byteLength},_s=async(t,e)=>{const n=c.toFiniteNumber(t.getContentLength());return n??Ns(e)},Bs=He&&(async t=>{let{url:e,method:n,data:s,signal:r,cancelToken:i,timeout:o,onDownloadProgress:a,onUploadProgress:d,responseType:u,headers:l,withCredentials:m="same-origin",fetchOptions:M}=Jt(t);u=u?(u+"").toLowerCase():"text";let[$,g]=r||i||o?Ds([r,i],o):[],v,P;const x=()=>{!v&&setTimeout(()=>{$&&$.unsubscribe()}),v=!0};let G;try{if(d&&xs&&n!=="get"&&n!=="head"&&(G=await _s(l,s))!==0){let N=new Request(e,{method:"POST",body:s,duplex:"half"}),Z;c.isFormData(s)&&(Z=N.headers.get("content-type"))&&l.setContentType(Z),N.body&&(s=bt(N.body,Et,vt(G,Oe(d)),null,Je))}c.isString(m)||(m=m?"cors":"omit"),P=new Request(e,{...M,signal:$,method:n.toUpperCase(),headers:l.normalize().toJSON(),body:s,duplex:"half",withCredentials:m});let A=await fetch(P);const ie=Ye&&(u==="stream"||u==="response");if(Ye&&(a||ie)){const N={};["status","statusText","headers"].forEach(me=>{N[me]=A[me]});const Z=c.toFiniteNumber(A.headers.get("content-length"));A=new Response(bt(A.body,Et,a&&vt(Z,Oe(a,!0)),ie&&x,Je),N)}u=u||"text";let oe=await Pe[c.findKey(Pe,u)||"text"](A,t);return!ie&&x(),g&&g(),await new Promise((N,Z)=>{Gt(N,Z,{data:oe,headers:q.from(A.headers),status:A.status,statusText:A.statusText,config:t,request:P})})}catch(A){throw x(),A&&A.name==="TypeError"&&/fetch/i.test(A.message)?Object.assign(new b("Network Error",b.ERR_NETWORK,t,P),{cause:A.cause||A}):b.from(A,A&&A.code,t,P)}}),Ze={http:ts,xhr:Ls,fetch:Bs};c.forEach(Ze,(t,e)=>{if(t){try{Object.defineProperty(t,"name",{value:e})}catch{}Object.defineProperty(t,"adapterName",{value:e})}});const St=t=>`- ${t}`,Us=t=>c.isFunction(t)||t===null||t===!1,Zt={getAdapter:t=>{t=c.isArray(t)?t:[t];const{length:e}=t;let n,s;const r={};for(let i=0;i<e;i++){n=t[i];let o;if(s=n,!Us(n)&&(s=Ze[(o=String(n)).toLowerCase()],s===void 0))throw new b(`Unknown adapter '${o}'`);if(s)break;r[o||"#"+i]=s}if(!s){const i=Object.entries(r).map(([a,d])=>`adapter ${a} `+(d===!1?"is not supported by the environment":"is not available in the build"));let o=e?i.length>1?`since :
`+i.map(St).join(`
`):" "+St(i[0]):"as no adapter specified";throw new b("There is no suitable adapter to dispatch the request "+o,"ERR_NOT_SUPPORT")}return s},adapters:Ze};function We(t){if(t.cancelToken&&t.cancelToken.throwIfRequested(),t.signal&&t.signal.aborted)throw new ge(null,t)}function $t(t){return We(t),t.headers=q.from(t.headers),t.data=je.call(t,t.transformRequest),["post","put","patch"].indexOf(t.method)!==-1&&t.headers.setContentType("application/x-www-form-urlencoded",!1),Zt.getAdapter(t.adapter||Se.adapter)(t).then(function(s){return We(t),s.data=je.call(t,t.transformResponse,s),s.headers=q.from(s.headers),s},function(s){return zt(s)||(We(t),s&&s.response&&(s.response.data=je.call(t,t.transformResponse,s.response),s.response.headers=q.from(s.response.headers))),Promise.reject(s)})}const Xt="1.7.2",it={};["object","boolean","number","function","string","symbol"].forEach((t,e)=>{it[t]=function(s){return typeof s===t||"a"+(e<1?"n ":" ")+t}});const Tt={};it.transitional=function(e,n,s){function r(i,o){return"[Axios v"+Xt+"] Transitional option '"+i+"'"+o+(s?". "+s:"")}return(i,o,a)=>{if(e===!1)throw new b(r(o," has been removed"+(n?" in "+n:"")),b.ERR_DEPRECATED);return n&&!Tt[o]&&(Tt[o]=!0,console.warn(r(o," has been deprecated since v"+n+" and will be removed in the near future"))),e?e(i,o,a):!0}};function Hs(t,e,n){if(typeof t!="object")throw new b("options must be an object",b.ERR_BAD_OPTION_VALUE);const s=Object.keys(t);let r=s.length;for(;r-- >0;){const i=s[r],o=e[i];if(o){const a=t[i],d=a===void 0||o(a,i,t);if(d!==!0)throw new b("option "+i+" must be "+d,b.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new b("Unknown option "+i,b.ERR_BAD_OPTION)}}const Xe={assertOptions:Hs,validators:it},se=Xe.validators;class le{constructor(e){this.defaults=e,this.interceptors={request:new gt,response:new gt}}async request(e,n){try{return await this._request(e,n)}catch(s){if(s instanceof Error){let r;Error.captureStackTrace?Error.captureStackTrace(r={}):r=new Error;const i=r.stack?r.stack.replace(/^.+\n/,""):"";try{s.stack?i&&!String(s.stack).endsWith(i.replace(/^.+\n.+\n/,""))&&(s.stack+=`
`+i):s.stack=i}catch{}}throw s}}_request(e,n){typeof e=="string"?(n=n||{},n.url=e):n=e||{},n=de(this.defaults,n);const{transitional:s,paramsSerializer:r,headers:i}=n;s!==void 0&&Xe.assertOptions(s,{silentJSONParsing:se.transitional(se.boolean),forcedJSONParsing:se.transitional(se.boolean),clarifyTimeoutError:se.transitional(se.boolean)},!1),r!=null&&(c.isFunction(r)?n.paramsSerializer={serialize:r}:Xe.assertOptions(r,{encode:se.function,serialize:se.function},!0)),n.method=(n.method||this.defaults.method||"get").toLowerCase();let o=i&&c.merge(i.common,i[n.method]);i&&c.forEach(["delete","get","head","post","put","patch","common"],g=>{delete i[g]}),n.headers=q.concat(o,i);const a=[];let d=!0;this.interceptors.request.forEach(function(v){typeof v.runWhen=="function"&&v.runWhen(n)===!1||(d=d&&v.synchronous,a.unshift(v.fulfilled,v.rejected))});const u=[];this.interceptors.response.forEach(function(v){u.push(v.fulfilled,v.rejected)});let l,m=0,M;if(!d){const g=[$t.bind(this),void 0];for(g.unshift.apply(g,a),g.push.apply(g,u),M=g.length,l=Promise.resolve(n);m<M;)l=l.then(g[m++],g[m++]);return l}M=a.length;let $=n;for(m=0;m<M;){const g=a[m++],v=a[m++];try{$=g($)}catch(P){v.call(this,P);break}}try{l=$t.call(this,$)}catch(g){return Promise.reject(g)}for(m=0,M=u.length;m<M;)l=l.then(u[m++],u[m++]);return l}getUri(e){e=de(this.defaults,e);const n=Kt(e.baseURL,e.url);return Vt(n,e.params,e.paramsSerializer)}}c.forEach(["delete","get","head","options"],function(e){le.prototype[e]=function(n,s){return this.request(de(s||{},{method:e,url:n,data:(s||{}).data}))}});c.forEach(["post","put","patch"],function(e){function n(s){return function(i,o,a){return this.request(de(a||{},{method:e,headers:s?{"Content-Type":"multipart/form-data"}:{},url:i,data:o}))}}le.prototype[e]=n(),le.prototype[e+"Form"]=n(!0)});class ot{constructor(e){if(typeof e!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(i){n=i});const s=this;this.promise.then(r=>{if(!s._listeners)return;let i=s._listeners.length;for(;i-- >0;)s._listeners[i](r);s._listeners=null}),this.promise.then=r=>{let i;const o=new Promise(a=>{s.subscribe(a),i=a}).then(r);return o.cancel=function(){s.unsubscribe(i)},o},e(function(i,o,a){s.reason||(s.reason=new ge(i,o,a),n(s.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){if(this.reason){e(this.reason);return}this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;const n=this._listeners.indexOf(e);n!==-1&&this._listeners.splice(n,1)}static source(){let e;return{token:new ot(function(r){e=r}),cancel:e}}}function Fs(t){return function(n){return t.apply(null,n)}}function qs(t){return c.isObject(t)&&t.isAxiosError===!0}const Qe={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(Qe).forEach(([t,e])=>{Qe[e]=t});function Qt(t){const e=new le(t),n=Lt(le.prototype.request,e);return c.extend(n,le.prototype,e,{allOwnKeys:!0}),c.extend(n,e,null,{allOwnKeys:!0}),n.create=function(r){return Qt(de(t,r))},n}const L=Qt(Se);L.Axios=le;L.CanceledError=ge;L.CancelToken=ot;L.isCancel=zt;L.VERSION=Xt;L.toFormData=Ue;L.AxiosError=b;L.Cancel=L.CanceledError;L.all=function(e){return Promise.all(e)};L.spread=Fs;L.isAxiosError=qs;L.mergeConfig=de;L.AxiosHeaders=q;L.formToJSON=t=>Wt(c.isHTMLForm(t)?new FormData(t):t);L.getAdapter=Zt.getAdapter;L.HttpStatusCode=Qe;L.default=L;var Vs={VITE_SERVER_URL:"https://equal-rosemarie-deun-b63b6790.koyeb.app",VITE_BASE_URL:"/idle-intranet-service",BASE_URL:"/idle-intranet-service/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_SERVER_URL:en}=Vs;en||console.log("server url이 존재하지 않습니다. 기본 url(localhost:8080)을 사용합니다.");const De=en||"http://localhost:8080",X=t=>`${De.endsWith("/")?De.slice(0,-1):De}/${t.startsWith("/")?t.slice(1):t}`,Q={MEMBERS:X("api/members"),MEMBER:X("api/member"),ATTENDANCE:X("api/attendance"),ATTENDANCE_WEEKLY:X("api/attendance/weekly"),VACATION_REQUESTS:X("api/vacationRequests"),DEPARTMENTS:X("api/departments"),ANNOUNCEMENTS:X("api/announcements"),USER:X("api/user"),UPDATE_PROFILE:X("api/updateProfile")};class ze extends Error{constructor(e,n){super(e),this.name="APIError",this.status=n}}function js(t){throw t.response?new ze(t.response.data.message||"서버 에러가 발생했습니다.",t.response.status):t.request?new ze("서버로부터 응답을 받지 못했습니다.",0):new ze("요청 설정 중 오류가 발생했습니다.",0)}const Ws=L.create({baseURL:De,headers:{"Content-Type":"application/json"}});async function ee({endpoint:t,method:e="get",params:n={},data:s=null,auth:r=!1}){try{const i={url:t,method:e,params:n,data:s};if(r){const a=localStorage.getItem("token");a&&(i.headers={...i.headers,Authorization:`Bearer ${a}`})}return(await Ws(i)).data}catch(i){throw js(i)}}async function zs(){try{return(await ee({endpoint:Q.USER,method:"get",auth:!0})).data}catch(t){throw console.error("Failed to fetch user:",t),t}}async function Gs(){try{return(await ee({endpoint:Q.ATTENDANCE_WEEKLY,method:"get",auth:!0})).data}catch(t){throw console.error("Failed to fetch user weekly attendances:",t),t}}async function Ks({employeeNumber:t,profileData:e}){try{return await ee({endpoint:Q.UPDATE_PROFILE,method:"put",data:{employeeNumber:t,profileData:e},auth:!0})}catch(n){throw console.error("Failed to update profile:",n),n}}function kt(t){const[e,n]=t.split(":").map(Number);return e*60+n/60}function Js({startTime:t,endTime:e}){const s=t?kt(t):0,r=e?kt(e):0,i=r-s<0?0:Math.floor((r-s)/60);return i>=9?8:i}function Ys(t){return t.reduce((e,n)=>e+Js(n),0)}function tn(t){return{date:t,startTime:null,endTime:null,status:null}}function Zs(t){if(!t.startTime||!t.endTime)return 0;const e=t.startTime.split(":"),n=t.endTime.split(":"),s=parseInt(e[0],10),r=parseInt(e[1],10),i=parseInt(n[0],10),o=parseInt(n[1],10),a=s*60+r;return(i*60+o-a)/60-1}function Xs(t){const e=new Date(t);return["일","월","화","수","목","금","토"][e.getDay()]}function Qs(t){t.sort((s,r)=>new Date(s.date)-new Date(r.date));const e=[];let n=0;return t.forEach((s,r)=>{new Date(s.date).getDay()===1&&r!==0&&(n=0);const a=Zs(s);n+=a,e.push({date:s.date,cumulativeHours:Math.round(n*10)/10})}),e}class er{constructor(){this.Menu=null,this.user=null,this.weeklyAttendances=null,this.isWorking=!1}setMenu(e){this.Menu=e}async getUser(){return this.user?this.user:(this.user=await zs(),this.user)}async getUserIsWorking(){const e=await this.getWeeklyAttendances(),n=new Date().toISOString().split("T")[0],{startTime:s,endTime:r}=e.filter(i=>i.date===n)[0]||tn(n);return this.isWorking=!!(s&&!r),this.isWorking}async getWeeklyAttendances(){return this.weeklyAttendances?this.weeklyAttendances:(this.weeklyAttendances=await Gs(),this.weeklyAttendances)}}const B=new er;class z{constructor(e){this.$container=document.querySelector(e)}}async function tr(){try{return(await ee({endpoint:Q.ANNOUNCEMENTS,method:"get"})).data}catch(t){throw console.error("Failed to fetch announcements:",t),t}}async function nr(t){try{return(await ee({endpoint:`${Q.ANNOUNCEMENTS}/${t}`,method:"get"})).data}catch(e){throw console.error("Failed to fetch announcement:",e),e}}async function nn(t,e=!1){try{return(await ee({endpoint:`${Q.MEMBER}/${t}`,method:"get",params:{isAdmin:e}})).data}catch(n){throw console.error("Failed to fetch user:",n),n}}class H{constructor({svg:e,options:n={}}){this.svg=e,this.color=n.color||Y.BLACK,this.size=n.size||"1rem"}html(){let e=this.svg;return e=e.replace(/width="\d+"/,`width="${this.size}"`),e=e.replace(/height="\d+"/,`height="${this.size}"`),e=e.replace(/stroke="[^"]*"/g,`stroke="${this.color}"`),e}}const sn=`
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_99_61115)">
  <path d="M7.9987 14.6668C11.6806 14.6668 14.6654 11.6821 14.6654 8.00016C14.6654 4.31826 11.6806 1.3335 7.9987 1.3335C4.3168 1.3335 1.33203 4.31826 1.33203 8.00016C1.33203 11.6821 4.3168 14.6668 7.9987 14.6668Z" stroke="#121212" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8 4V8L10.6667 9.33333" stroke="#121212" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <defs>
  <clipPath id="clip0_99_61115">
  <rect width="16" height="16" fill="white"/>
  </clipPath>
  </defs>
  </svg>  
`,sr=`
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 5.99992L8 1.33325L14 5.99992V13.3333C14 13.6869 13.8595 14.026 13.6095 14.2761C13.3594 14.5261 13.0203 14.6666 12.6667 14.6666H3.33333C2.97971 14.6666 2.64057 14.5261 2.39052 14.2761C2.14048 14.026 2 13.6869 2 13.3333V5.99992Z" stroke="#121212" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M6 14.6667V8H10V14.6667" stroke="#121212" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`,rr=`
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_99_61090)">
  <g clip-path="url(#clip1_99_61090)">
  <path d="M7.9987 14.6666C11.6806 14.6666 14.6654 11.6818 14.6654 7.99992C14.6654 4.31802 11.6806 1.33325 7.9987 1.33325C4.3168 1.33325 1.33203 4.31802 1.33203 7.99992C1.33203 11.6818 4.3168 14.6666 7.9987 14.6666Z" stroke="#121212" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M5.33203 9.33325C5.33203 9.33325 6.33203 10.6666 7.9987 10.6666C9.66536 10.6666 10.6654 9.33325 10.6654 9.33325" stroke="#121212" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M6 6H6.00667" stroke="#121212" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10 6H10.0067" stroke="#121212" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  </g>
  <defs>
  <clipPath id="clip0_99_61090">
  <rect width="16" height="16" fill="white"/>
  </clipPath>
  <clipPath id="clip1_99_61090">
  <rect width="16" height="16" fill="white"/>
  </clipPath>
  </defs>
  </svg>
`,ir=`
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M13.3346 14V12.6667C13.3346 11.9594 13.0537 11.2811 12.5536 10.781C12.0535 10.281 11.3752 10 10.668 10H5.33464C4.62739 10 3.94911 10.281 3.44902 10.781C2.94892 11.2811 2.66797 11.9594 2.66797 12.6667V14" stroke="#121212" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M7.9987 7.33333C9.47146 7.33333 10.6654 6.13943 10.6654 4.66667C10.6654 3.19391 9.47146 2 7.9987 2C6.52594 2 5.33203 3.19391 5.33203 4.66667C5.33203 6.13943 6.52594 7.33333 7.9987 7.33333Z" stroke="#121212" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`,or=`
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevrons-left"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>
`,rn=`
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
`,on=`
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
`,ar=`
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevrons-right"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
`,cr=`
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#8B95A1" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M14.0001 14.0001L11.1001 11.1001" stroke="#8B95A1" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`,lr=`
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g id="icon/chevron-down">
  <path id="Vector" d="M4 6L8 10L12 6" stroke="#8B95A1" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  </svg> 
`,ur=`
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3">
  <path d="M12 20h9" fill="#8B95A1"></path>
  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
  </svg>
`,dr=`
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-camera">
  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
  <circle cx="12" cy="13" r="4"></circle>
  </svg>
`,hr=`
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out">
  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
  <polyline points="16 17 21 12 16 7"></polyline>
  <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
`,mr=`
  <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
  <path fill="#fff" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
    <animateTransform attributeType="xml"
      attributeName="transform"
      type="rotate"
      from="0 25 25"
      to="360 25 25"
      dur="0.6s"
      repeatCount="indefinite"/>
    </path>
  </svg>
`,pr=`
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar">
  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
  <line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line>
  <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
`;class fr extends z{constructor(){super("#main"),this.announcement=null,this.Icon=new H({svg:rn,options:{color:Y.DARKEST_GRAY,size:"1.4rem"}})}async setAnnouncement(){const e=window.location.pathname.split("/"),n=e[e.length-1];this.announcement=await nr(n)}async setMember(){this.member=await nn(this.announcement.employeeNumber)}async render(){await this.setAnnouncement(),await this.setMember(),this.$container.innerHTML=`
      <div class="announcement-page-container">
        <header class="announcement-mobile-header">
          <button>${this.Icon.html()}</button>
        </header>
        <div class="wrapper">
          <h1 class="announcement-title">${this.announcement.title}</h1>
          <div class="announcement-department">
            ${this.member.name} | ${this.announcement.postedDate}
          </div>
        </div>
        <img
          class="announcement-image"
          src="..${this.announcement.imageUrl}"
          alt="Announcement Image"
        />
        <div class="wrapper">
          <p class="announcement-content">
            ${this.announcement.content.replaceAll(`
`,"<br />")}
          </p>
        </div>
      </div>
    `,document.querySelector(".announcement-mobile-header button").addEventListener("click",()=>{window.history.back()})}}const gr="/idle-intranet-service/assets/404-5M1Xnl0d.png";class wr extends z{constructor(){super("#main")}render(){this.$container.innerHTML=`
      <div class="not-found-container">
        <div class="wrapper">
          <img class="not-found-image" src=${gr} alt="404" />
          <h1 class="not-found-title">페이지를 찾을 수 없습니다</h1>
          <p>페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.</p>
          <p>입력하신 주소가 정확한지 다시 한 번 확인해주세요.</p>
          <a class="home-link" href="${I.HOME}">홈으로 이동</a>
        </div>
      </div>
    `}}class $e{constructor({title:e,subtitle:n,description:s,contents:r,desktopOnly:i}){this.title=e,this.subtitle=n||"",this.description=s||"",this.contents=r||"",this.desktopOnly=i||""}html(){return`
      <div class="page-title-container${this.desktopOnly&&" desktop-only"}">
        <div class="wrapper">
            ${this.subtitle&&`<div class="page-subtitle">${this.subtitle}</div>`}
            <h1 class="page-title">${this.title}</h1>
            ${this.description&&`<p class="page-title-description">${this.description}</p>`}
        </div>
      </div>
    `}}class Fe{constructor({url:e,size:n,border:s}){this.url=e,this.size=n||"default",this.border=s||"default"}html(){return`
      <div class='profile-img-container img-${this.size} img-bd-${this.border}'>
        <img src=${this.url} alt="프로필 사진" class="profile-img img-${this.size}"/>
      </div>
    `}}class an{constructor({icon:e}){this.icon=e}html(){return`
      <button class="icon-button">${this.icon.html()}</button>
    `}}class ue{constructor({type:e,variant:n,size:s,content:r,disabled:i}){this.type=e||"button",this.variant=n||"primary",this.size=s||"default",this.content=r||"",this.disabled=i||""}html(){return`
      <button class='button btn-${this.size} btn-${this.variant}' type='${this.type}' ${this.disabled?"disabled":""}>${this.content}</button>
    `}}class at{constructor({title:e,mainContent:n,buttonContent:s,onSubmit:r,id:i}){this.title=e||"",this.mainContent=n||"메인 컨텐츠",this.buttonContent=s||"Click me",this.submitButton=new ue({content:this.buttonContent}),this.closeButton=new ue({variant:"text",content:"취소"}),this.onSubmit=r,this.id=i}open(){this.$container.classList.add("active")}close(){this.$container.classList.remove("active")}updateButton(){this.submitButton=new ue({content:this.buttonContent})}setEventListeners(){const e=this.$container.querySelector(".submit-button button"),n=this.$container.querySelector(".close-button button"),s=this.$container.querySelector(".modal-bg");e.addEventListener("click",()=>this.onSubmit()),n.addEventListener("click",()=>this.close()),s.addEventListener("click",()=>this.close())}render(){this.$container=document.querySelector(`#${this.id}`),this.setEventListeners()}html(){return`
      <div class="modal-container" id=${this.id}>
        <div class="modal-bg"></div>
        <div class="modal-content">
          <div class="modal-header">
            <h2>${this.title}</h2>
          </div>
          <div class="modal-body">
            <div class="modal-main-content">${this.mainContent}</div>
            <div class="modal-footer">
              <div class="submit-button">${this.submitButton.html()}</div>
              <div class="close-button">${this.closeButton.html()}</div>
            </div>
          </div>
        </div>
      </div>
    `}}class re{constructor({placeholder:e,type:n,id:s,readOnly:r,name:i,value:o}){this.placeholder=e||"",this.type=n||"text",this.id=s,this.readOnly=r?"read-only":"default",this.name=i||this.id,this.value=o||""}html(){return`
      <input type='${this.type}' class='input input-${this.readOnly}' id='${this.id}' value='${this.value}' ${this.readOnly==="read-only"?"readOnly":""} placeholder='${this.placeholder}'>
    `}}const At=["Peanut","Callie","Abby","Lucy","Angel","Bella","Salem","Gizmo","Leo","Sasha","Cali","Boo","Smokey","Jasper","Coco","Annie","Max","Boots","Bear","Kiki"],yr=24,br=48,vr=13,Er=5,Sr="https://api.dicebear.com/9.x/lorelei/svg";function Re(t){return Math.floor(Math.random()*t)+1}function $r(){const t=At[Math.floor(Math.random()*At.length)],e=`${String(Re(yr)).padStart(2,"0")}`,n=`${String(Re(br)).padStart(2,"0")}`,s=`${String(Re(vr)).padStart(2,"0")}`;let r="";return Math.random()<.3&&(r=`&glasses=variant${String(Re(Er)).padStart(2,"0")}`),`${Sr}?seed=${t}&eyes=variant${e}&hair=variant${n}&eyebrows=variant${s}${r}`}class Tr{constructor({member:e}){T(this,"onFileInputChange",e=>{const n=e.target.files[0];if(n){const s=new FileReader;s.onload=r=>{this.$image.src=r.target.result},s.readAsDataURL(n)}});this.member=e,this.CameraIcon=new H({svg:dr,options:{color:"#fff"}}),this.Button=new an({icon:this.CameraIcon}),this.phoneNumberInput=new re({placeholder:"010-0000-0000",id:"phone_number_input",name:"phoneNumber"}),this.addressInput=new re({placeholder:"주소를 입력하세요",id:"address_input",name:"address"})}showAlertMessage(e,n){const s=document.body.querySelector(".alert-invalid-phonenumber"),r=document.body.querySelector(".alert-invalid-address");e?s.classList.add("show"):s.classList.remove("show"),n?r.classList.add("show"):r.classList.remove("show")}getFormData(){return{profileImage:this.$image.src,phoneNumber:this.$phoneNumberInput.value,address:this.$addressInput.value}}setRandomImage(){this.newImage=$r(),this.$image.src=this.newImage}setUserImage(){this.setFileInput(),this.$fileInput.click()}setFileInput(){this.$fileInput=document.createElement("input"),this.$fileInput.type="file",this.$fileInput.accept="image/*",this.$fileInput.addEventListener("change",e=>this.onFileInputChange(e))}setEventListeners(){this.$randomImageButton.addEventListener("click",()=>this.setRandomImage()),this.$selectImageButton.addEventListener("click",()=>{this.setUserImage()})}renderInitialData(){this.$image.src=this.member.profileImage,this.$phoneNumberInput.value=this.member.phoneNumber,this.$addressInput.value=this.member.address,this.showAlertMessage(!1,!1)}render(){this.$image=document.querySelector(".edit-profile-form .profile-image"),this.$randomImageButton=document.querySelector(".edit-profile-form .random-profile-image-button"),this.$phoneNumberInput=document.querySelector("input#phone_number_input"),this.$addressInput=document.querySelector("input#address_input"),this.$selectImageButton=document.querySelector(".edit-image-button-container button"),this.renderInitialData(),this.setFileInput(),this.setEventListeners()}html(){return`<form class="edit-profile-form">
      <div class="edit-profile-image-container">
        <div class="profile-image-container">
          <img
            src="${this.member.profileImage}"
            alt="${this.member.name}"
            class="profile-image"
          />
        </div>
        <div class="edit-image-button-container">${this.Button.html()}</div>
      </div>
      <button class="random-profile-image-button">기본 이미지 설정</button>
      <div class="input-container">
        <label for="phone_number_input">전화번호</label>
        ${this.phoneNumberInput.html()}
        <p class="alert-invalid-phonenumber">
          입력하신 전화번호의 형식이 올바르지 않습니다.
        </p>
      </div>
      <div class="input-container">
        <label for="address_input">주소</label>
        ${this.addressInput.html()}
        <p class="alert-invalid-address">
          입력하신 주소의 형식이 올바르지 않습니다. <br />
          시, 구, 동/로/길 까지 표기해주세요.
        </p>
      </div>
    </form>`}}class kr{constructor({container:e,member:n}){T(this,"onClickEditButton",()=>{this.EditProfileForm.renderInitialData(),this.Modal.open()});this.$container=e,this.store=B,this.member=n,this.icon=new H({svg:ur,options:{color:Y.DARKEST_GRAY}}),this.EditButton=new an({icon:this.icon}),this.EditProfileForm=new Tr({member:this.member}),this.loader=new H({svg:mr,options:{color:"#fff"}})}updateMember({profileImage:e,phoneNumber:n,address:s}){this.member.profileImage=e,this.member.phoneNumber=n,this.member.address=s}async updateProfilePage({profileImage:e,phoneNumber:n,address:s}){const r=await this.store.getUser();if(this.member.employeeNumber===r.employeeNumber){const a=document.querySelector(".header-container .profile-img");a.src=e}const i=document.querySelector(".personal-info-section .profile-img");i.src=e,document.querySelectorAll(".personal-detail-subtitle").forEach(a=>{a.textContent==="전화번호"?a.nextElementSibling.innerText=n:a.textContent==="자택 주소"&&(a.nextElementSibling.innerText=s)})}verifyFormData(e,n){const s=/^\+?(\d{1,3})?[-. ]?(\d{1,4})[-. ]?(\d{3,4})[-. ]?(\d{4})$/,r=/^[가-힣]{1,5}시$/,i=/^[가-힣]{1,5}구$/,o=/^[가-힣0-9]{1,10}(동|로|길)$/,a=s.test(e),d=n.split(" ");if(d.length<3)return[a,!1];const u=d.some($=>r.test($)),l=d.some($=>i.test($)),m=d.some($=>o.test($));return[a,u&&l&&m]}async onSubmit(){const e=this.EditProfileForm.getFormData(),[n,s]=this.verifyFormData(e.phoneNumber,e.address);if(this.EditProfileForm.showAlertMessage(!n,!s),n&&s){const r=document.querySelector("#edit-profile-modal .btn-primary");if(r.innerHTML=this.loader.html(),(await Ks({employeeNumber:this.member.employeeNumber,profileData:e})).status!=="OK"){console.log("프로필 수정을 실패했습니다.");return}this.updateProfilePage(e),this.updateMember(e),this.Modal.close(),r.innerHTML="수정"}}setModal(){this.Modal=new at({title:"프로필 수정",mainContent:this.EditProfileForm.html(),buttonContent:"수정",onSubmit:this.onSubmit.bind(this),id:"edit-profile-modal"})}setEventListener(){this.$button=this.$container.querySelector(".edit-button-container button"),this.$button.addEventListener("click",this.onClickEditButton)}render(){this.setModal(),this.$container.innerHTML=`
      <div class="edit-button-container">${this.EditButton.html()}</div>
      <div class="edit-profile-modal-container">${this.Modal.html()}</div>
    `,this.EditProfileForm.render(),this.Modal.render(),this.setEventListener()}}class et{constructor({member:e,isWorking:n}){this.store=B,this.member=e,this.isWorking=n,this.user=null}async renderEditButton(){if(!await he())return;this.user||(this.user=await this.store.getUser());const{isAdmin:n}=this.user,s=this.user.employeeNumber===this.member.employeeNumber;if(!n&&!s)return;const r=document.querySelector(".profile-info .edit-profile-button-container");this.editButton=new kr({container:r,member:this.member}),this.editButton.render()}renderAvatar(){const e=document.querySelector(".profile-info .avatar-container");e.innerHTML=this.Avatar.html()}renderUserInfo(){const e=document.querySelector(".personal-profile .profile-name"),n=document.querySelector(".personal-profile .profile-position");e.innerText=this.member.name,n.innerText=this.member.position}render(){this.Avatar=new Fe({url:this.member.profileImage,size:"large"}),this.renderAvatar(),this.renderUserInfo(),this.renderEditButton()}html(){return`
      <div class="profile-info">
        <div class="edit-profile-button-container"></div>
        <div class="avatar-container"></div>
        <div class="personal-profile">
          <div class="work-status-label${this.isWorking?" active":""}">
            ${this.isWorking?"근무중":"근무전"}
          </div>
          <h2 class="profile-name"></h2>
          <span class="profile-position"></span>
        </div>
      </div>
    `}}class Ar{constructor({percent:e}){this.dashoffset=100-e}html(){return`
      <div class="progress-ring">
        <svg width="40" height="40" viewBox="0 0 40 40">
          <circle
            class="progress-bg"
            cx="20"
            cy="20"
            r="16"
            stroke-width="6"
          />
          <circle
            class="progress-ing"
            cx="20"
            cy="20"
            r="16"
            stroke-width="6"
            stroke-dashoffset="${this.dashoffset}"
          />
        </svg>
      </div>
    `}}var Rr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Ir(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var cn={exports:{}};(function(t,e){(function(n,s){t.exports=s()})(Rr,function(){var n=1e3,s=6e4,r=36e5,i="millisecond",o="second",a="minute",d="hour",u="day",l="week",m="month",M="quarter",$="year",g="date",v="Invalid Date",P=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,x=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,G={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(y){var f=["th","st","nd","rd"],h=y%100;return"["+y+(f[(h-20)%10]||f[h]||f[0])+"]"}},A=function(y,f,h){var w=String(y);return!w||w.length>=f?y:""+Array(f+1-w.length).join(h)+y},ie={s:A,z:function(y){var f=-y.utcOffset(),h=Math.abs(f),w=Math.floor(h/60),p=h%60;return(f<=0?"+":"-")+A(w,2,"0")+":"+A(p,2,"0")},m:function y(f,h){if(f.date()<h.date())return-y(h,f);var w=12*(h.year()-f.year())+(h.month()-f.month()),p=f.clone().add(w,m),E=h-p<0,S=f.clone().add(w+(E?-1:1),m);return+(-(w+(h-p)/(E?p-S:S-p))||0)},a:function(y){return y<0?Math.ceil(y)||0:Math.floor(y)},p:function(y){return{M:m,y:$,w:l,d:u,D:g,h:d,m:a,s:o,ms:i,Q:M}[y]||String(y||"").toLowerCase().replace(/s$/,"")},u:function(y){return y===void 0}},oe="en",N={};N[oe]=G;var Z="$isDayjsObject",me=function(y){return y instanceof ke||!(!y||!y[Z])},Te=function y(f,h,w){var p;if(!f)return oe;if(typeof f=="string"){var E=f.toLowerCase();N[E]&&(p=E),h&&(N[E]=h,p=E);var S=f.split("-");if(!p&&S.length>1)return y(S[0])}else{var R=f.name;N[R]=f,p=R}return!w&&p&&(oe=p),p||!w&&oe},D=function(y,f){if(me(y))return y.clone();var h=typeof f=="object"?f:{};return h.date=y,h.args=arguments,new ke(h)},k=ie;k.l=Te,k.i=me,k.w=function(y,f){return D(y,{locale:f.$L,utc:f.$u,x:f.$x,$offset:f.$offset})};var ke=function(){function y(h){this.$L=Te(h.locale,null,!0),this.parse(h),this.$x=this.$x||h.x||{},this[Z]=!0}var f=y.prototype;return f.parse=function(h){this.$d=function(w){var p=w.date,E=w.utc;if(p===null)return new Date(NaN);if(k.u(p))return new Date;if(p instanceof Date)return new Date(p);if(typeof p=="string"&&!/Z$/i.test(p)){var S=p.match(P);if(S){var R=S[2]-1||0,C=(S[7]||"0").substring(0,3);return E?new Date(Date.UTC(S[1],R,S[3]||1,S[4]||0,S[5]||0,S[6]||0,C)):new Date(S[1],R,S[3]||1,S[4]||0,S[5]||0,S[6]||0,C)}}return new Date(p)}(h),this.init()},f.init=function(){var h=this.$d;this.$y=h.getFullYear(),this.$M=h.getMonth(),this.$D=h.getDate(),this.$W=h.getDay(),this.$H=h.getHours(),this.$m=h.getMinutes(),this.$s=h.getSeconds(),this.$ms=h.getMilliseconds()},f.$utils=function(){return k},f.isValid=function(){return this.$d.toString()!==v},f.isSame=function(h,w){var p=D(h);return this.startOf(w)<=p&&p<=this.endOf(w)},f.isAfter=function(h,w){return D(h)<this.startOf(w)},f.isBefore=function(h,w){return this.endOf(w)<D(h)},f.$g=function(h,w,p){return k.u(h)?this[w]:this.set(p,h)},f.unix=function(){return Math.floor(this.valueOf()/1e3)},f.valueOf=function(){return this.$d.getTime()},f.startOf=function(h,w){var p=this,E=!!k.u(w)||w,S=k.p(h),R=function(ce,F){var te=k.w(p.$u?Date.UTC(p.$y,F,ce):new Date(p.$y,F,ce),p);return E?te:te.endOf(u)},C=function(ce,F){return k.w(p.toDate()[ce].apply(p.toDate("s"),(E?[0,0,0,0]:[23,59,59,999]).slice(F)),p)},O=this.$W,_=this.$M,V=this.$D,pe="set"+(this.$u?"UTC":"");switch(S){case $:return E?R(1,0):R(31,11);case m:return E?R(1,_):R(0,_+1);case l:var ae=this.$locale().weekStart||0,we=(O<ae?O+7:O)-ae;return R(E?V-we:V+(6-we),_);case u:case g:return C(pe+"Hours",0);case d:return C(pe+"Minutes",1);case a:return C(pe+"Seconds",2);case o:return C(pe+"Milliseconds",3);default:return this.clone()}},f.endOf=function(h){return this.startOf(h,!1)},f.$set=function(h,w){var p,E=k.p(h),S="set"+(this.$u?"UTC":""),R=(p={},p[u]=S+"Date",p[g]=S+"Date",p[m]=S+"Month",p[$]=S+"FullYear",p[d]=S+"Hours",p[a]=S+"Minutes",p[o]=S+"Seconds",p[i]=S+"Milliseconds",p)[E],C=E===u?this.$D+(w-this.$W):w;if(E===m||E===$){var O=this.clone().set(g,1);O.$d[R](C),O.init(),this.$d=O.set(g,Math.min(this.$D,O.daysInMonth())).$d}else R&&this.$d[R](C);return this.init(),this},f.set=function(h,w){return this.clone().$set(h,w)},f.get=function(h){return this[k.p(h)]()},f.add=function(h,w){var p,E=this;h=Number(h);var S=k.p(w),R=function(_){var V=D(E);return k.w(V.date(V.date()+Math.round(_*h)),E)};if(S===m)return this.set(m,this.$M+h);if(S===$)return this.set($,this.$y+h);if(S===u)return R(1);if(S===l)return R(7);var C=(p={},p[a]=s,p[d]=r,p[o]=n,p)[S]||1,O=this.$d.getTime()+h*C;return k.w(O,this)},f.subtract=function(h,w){return this.add(-1*h,w)},f.format=function(h){var w=this,p=this.$locale();if(!this.isValid())return p.invalidDate||v;var E=h||"YYYY-MM-DDTHH:mm:ssZ",S=k.z(this),R=this.$H,C=this.$m,O=this.$M,_=p.weekdays,V=p.months,pe=p.meridiem,ae=function(F,te,ye,Ae){return F&&(F[te]||F(w,E))||ye[te].slice(0,Ae)},we=function(F){return k.s(R%12||12,F,"0")},ce=pe||function(F,te,ye){var Ae=F<12?"AM":"PM";return ye?Ae.toLowerCase():Ae};return E.replace(x,function(F,te){return te||function(ye){switch(ye){case"YY":return String(w.$y).slice(-2);case"YYYY":return k.s(w.$y,4,"0");case"M":return O+1;case"MM":return k.s(O+1,2,"0");case"MMM":return ae(p.monthsShort,O,V,3);case"MMMM":return ae(V,O);case"D":return w.$D;case"DD":return k.s(w.$D,2,"0");case"d":return String(w.$W);case"dd":return ae(p.weekdaysMin,w.$W,_,2);case"ddd":return ae(p.weekdaysShort,w.$W,_,3);case"dddd":return _[w.$W];case"H":return String(R);case"HH":return k.s(R,2,"0");case"h":return we(1);case"hh":return we(2);case"a":return ce(R,C,!0);case"A":return ce(R,C,!1);case"m":return String(C);case"mm":return k.s(C,2,"0");case"s":return String(w.$s);case"ss":return k.s(w.$s,2,"0");case"SSS":return k.s(w.$ms,3,"0");case"Z":return S}return null}(F)||S.replace(":","")})},f.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},f.diff=function(h,w,p){var E,S=this,R=k.p(w),C=D(h),O=(C.utcOffset()-this.utcOffset())*s,_=this-C,V=function(){return k.m(S,C)};switch(R){case $:E=V()/12;break;case m:E=V();break;case M:E=V()/3;break;case l:E=(_-O)/6048e5;break;case u:E=(_-O)/864e5;break;case d:E=_/r;break;case a:E=_/s;break;case o:E=_/n;break;default:E=_}return p?E:k.a(E)},f.daysInMonth=function(){return this.endOf(m).$D},f.$locale=function(){return N[this.$L]},f.locale=function(h,w){if(!h)return this.$L;var p=this.clone(),E=Te(h,w,!0);return E&&(p.$L=E),p},f.clone=function(){return k.w(this.$d,this)},f.toDate=function(){return new Date(this.valueOf())},f.toJSON=function(){return this.isValid()?this.toISOString():null},f.toISOString=function(){return this.$d.toISOString()},f.toString=function(){return this.$d.toUTCString()},y}(),dt=ke.prototype;return D.prototype=dt,[["$ms",i],["$s",o],["$m",a],["$H",d],["$W",u],["$M",m],["$y",$],["$D",g]].forEach(function(y){dt[y[1]]=function(f){return this.$g(f,y[0],y[1])}}),D.extend=function(y,f){return y.$i||(y(f,ke,D),y.$i=!0),D},D.locale=Te,D.isDayjs=me,D.unix=function(y){return D(1e3*y)},D.en=N[oe],D.Ls=N,D.p={},D})})(cn);var Mr=cn.exports;const Rt=Ir(Mr);class Cr{constructor(){this.$time=document.querySelector(".work-hour-time.current"),this.timeout=null,this.timer=null}updateTime(){const e=Rt().format("HH:mm");this.$time&&(this.$time.setAttribute("datetime",e),this.$time.innerText=e)}getNextUpdateDelay(){const e=Rt();return e.add(1,"minute").startOf("minute").diff(e)}cleanUp(){this.timeout&&(clearTimeout(this.timeout),this.timeout=null),this.timer&&(clearTimeout(this.timer),this.timer=null)}render(){if(this.updateTime(),!this.timer){const e=this.getNextUpdateDelay(),n=()=>{this.updateTime();const s=this.getNextUpdateDelay();this.timer=setTimeout(n,s)};this.timeout=setTimeout(n,e)}}}var Lr={VITE_SERVER_URL:"https://equal-rosemarie-deun-b63b6790.koyeb.app",VITE_BASE_URL:"/idle-intranet-service",BASE_URL:"/idle-intranet-service/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_SERVER_URL:Dr}=Lr,ln=Dr,Or=async t=>{try{const e=await fetch(`${ln}/api/addAttendance`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!e.ok)throw new Error(`Failed to add attendance data: ${e.statusText}`);return await e.json()}catch(e){throw console.error("Error adding attendance data:",e),e}},Pr=async t=>{try{const e=await fetch(`${ln}/api/updateAttendance`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!e.ok)throw new Error(`Failed to update attendance data: ${e.statusText}`);return await e.json()}catch(e){throw console.error("Error updating attendance data:",e),e}};class xr{constructor({personalInfo:e}){this.store=B,this.weeklyAttendances=null,this.weeklyWorkHours=null,this.Icon=new H({svg:sn,options:{color:Y.DARK_GRAY}}),this.personalInfo=e,this.modal=new at({onSubmit:()=>{},id:"work-toggle-modal"})}renderWeeklyWorkHours(){const e=document.querySelector(".weekly-work-hours-time");e&&(e.innerHTML=`${this.weeklyWorkHours}시간`)}renderProgressRing(){const e=document.querySelector(".progress-ring-container"),n=this.weeklyWorkHours/40*100;this.ProgressRing=new Ar({percent:n}),e&&(e.innerHTML=this.ProgressRing.html())}setModal({title:e,mainContent:n,buttonContent:s,onSubmit:r}){const i=document.body.querySelector(".work-modal-wrapper");this.modal.title=e,this.modal.mainContent=n,this.modal.buttonContent=s,this.modal.updateButton(),this.modal.onSubmit=r,i.innerHTML=this.modal.html()}async renderDailyWork(){const e=new Date().toISOString().split("T")[0];let n=this.weeklyAttendances.find(d=>d.date===e);n||(n=tn(e),this.weeklyAttendances.push(n));let{startTime:s,endTime:r}=n;this.Button=new ue({variant:s&&!r?"primary":"secondary",size:"large",content:s&&!r?"근무 종료":"근무 시작",disabled:!!r});const i=document.querySelector(".work-hours-button-container"),o=document.querySelector(".work-hour-time.start"),a=document.querySelector(".work-hour-time.end");i&&(i.innerHTML=this.Button.html()),this.CurrentTime=new Cr,this.CurrentTime.cleanUp(),this.CurrentTime.render(),s&&(o.innerText=s,o.setAttribute("datetime",s)),r&&(a.innerText=r,a.setAttribute("datetime",r)),i.querySelector("button").addEventListener("click",async()=>{const d=document.body.querySelector(".work-hour-time.current").innerHTML;s&&!r?this.setModal({title:`현재 시각: ${d}`,mainContent:"근무를 종료하시겠습니까?",buttonContent:"근무 종료",onSubmit:async()=>{r=d,a.innerText=r||"-",a.setAttribute("datetime",r);const u={employeeNumber:this.user.employeeNumber,date:e,startTime:s,endTime:r,status:"정상 근무"};await Pr(u),n.endTime=r,await this.renderDailyWork(),this.personalInfo.updateIsWorking()}}):s||this.setModal({title:`현재 시각: ${d}`,mainContent:"근무를 시작하시겠습니까?",buttonContent:"근무 시작",onSubmit:async()=>{s=d,o.innerText=s||"-",o.setAttribute("datetime",s);const u={employeeNumber:this.user.employeeNumber,date:e,startTime:s,endTime:null,status:"정상 근무"};await Or(u),n.startTime=s,await this.renderDailyWork(),this.personalInfo.updateIsWorking()}}),this.modal.render(),this.modal.open()})}async render(){this.weeklyAttendances||(this.user=await this.store.getUser(),this.weeklyAttendances=await this.store.getWeeklyAttendances(),this.weeklyWorkHours=Ys(this.weeklyAttendances)),this.renderWeeklyWorkHours(),this.renderProgressRing(),this.renderDailyWork()}html(){return`
      <div class="work-info-container">
        <div class="work-info weekly-work-hours">
          ${this.Icon.html()}
          <div class="weekly-work-hours-title">이번 주 근무 시간</div>
          <strong class="weekly-work-hours-time"></strong>
          <div class="progress-ring-container"></div>
        </div>
        <div class="work-info daily-work-hours">
          <div class="work-modal-wrapper"></div>
          <ul class="work-hours-list">
            <li>
              <div class="work-hour-title">현재 시각</div>
              <time class="work-hour-time current" datetime=""></time>
            </li>
            <li>
              <div class="work-hour-title">근무 시작</div>
              <time class="work-hour-time start" datetime="">-</time>
            </li>
            <li>
              <div class="work-hour-title">근무 종료</div>
              <time class="work-hour-time end" datetime="">-</time>
            </li>
          </ul>
          <div class="work-hours-button-container" type="button"></div>
        </div>
      </div>
    `}}class un{constructor({member:e}){this.isWorking=!1,this.member=e,this.store=B,this.updateIsWorking(),this.ProfileInfo=new et({member:e,isWorking:this.isWorking}),this.WorkInfo=new xr({personalInfo:this})}async updateIsWorking(){this.isWorking=await this.store.getUserIsWorking(),this.ProfileInfo=new et({member:this.member,isWorking:this.isWorking}),document.body.querySelector(".wrapper.personal-infos").innerHTML=`${this.ProfileInfo.html()}${this.WorkInfo.html()}`,this.render()}render(){this.ProfileInfo.render(),this.WorkInfo.render()}html(){return`
    <section class="personal-info-section">
      <div class="wrapper personal-infos">
        ${this.ProfileInfo.html()}${this.WorkInfo.html()}
      </div>
    </section>`}}const ct="data:image/svg+xml,%3csvg%20width='30'%20height='30'%20viewBox='0%200%2030%2030'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M9.23182%2010.5105C8.80394%2010.3271%208.3084%2010.5253%208.12501%2010.9532C7.94163%2011.3811%208.13985%2011.8767%208.56773%2012.0601L13.9573%2014.3699V19.7145C13.9573%2020.18%2014.3347%2020.5574%2014.8003%2020.5574C15.2658%2020.5574%2015.6432%2020.18%2015.6432%2019.7145V14.3699L21.0327%2012.0601C21.4607%2011.8767%2021.6588%2011.3811%2021.4756%2010.9532C21.2922%2010.5253%2020.7965%2010.3271%2020.3687%2010.5105L14.8003%2012.897L9.23182%2010.5105Z'%20fill='url(%23paint0_linear_174_41458)'/%3e%3cpath%20d='M16.6165%204.33711C15.4479%203.88763%2014.154%203.88763%2012.9854%204.33711L4.621%207.55419C3.6444%207.92981%203%208.86807%203%209.91441V21.0856C3%2022.1319%203.6444%2023.0702%204.621%2023.4458L12.9854%2026.6629C14.154%2027.1124%2015.4479%2027.1124%2016.6165%2026.6629L24.981%2023.4458C25.9576%2023.0702%2026.6019%2022.1319%2026.6019%2021.0856V9.91441C26.6019%208.86807%2025.9576%207.92981%2024.981%207.55419L16.6165%204.33711ZM13.5906%205.9106C14.3697%205.61094%2015.2322%205.61094%2016.0113%205.9106L24.3757%209.12767C24.7013%209.25288%2024.9161%209.56564%2024.9161%209.91441V21.0856C24.9161%2021.4342%2024.7013%2021.7471%2024.3757%2021.8722L16.0113%2025.0893C15.2322%2025.3891%2014.3697%2025.3891%2013.5906%2025.0893L5.22618%2021.8722C4.90064%2021.7471%204.68585%2021.4342%204.68585%2021.0856V9.91441C4.68585%209.56564%204.90064%209.25288%205.22618%209.12767L13.5906%205.9106Z'%20fill='url(%23paint1_linear_174_41458)'/%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_174_41458'%20x1='14.8003'%20y1='10.4421'%20x2='14.8003'%20y2='20.5574'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23499BF5'/%3e%3cstop%20offset='1'%20stop-color='%232B5A8F'/%3e%3c/linearGradient%3e%3clinearGradient%20id='paint1_linear_174_41458'%20x1='14.801'%20y1='4'%20x2='14.801'%20y2='27'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23499BF5'/%3e%3cstop%20offset='1'%20stop-color='%232B5A8F'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";class Nr{constructor(e){this.item=e}html(){return`
      <li class="gallery-item">
        <a href="${I.ANNOUNCEMENTS}/${this.item.announcementId}">
          <div class="gallery-image-box">
            <img src="./${this.item.imageUrl}" alt="${this.item.title}" />
          </div>
          <div class="gallery-content-box">
            <h2>${this.item.title}</h2>
            <p class="gallery-content">${this.item.content}</p>
          </div>
        </a>
      </li>
    `}}class _r{constructor(e){this.item=e,this.author=null}async renderAuthor(){this.author||(this.author=await nn(this.item.employeeNumber));const e=document.querySelector(`#announcement-${this.item.announcementId}`),n=e.querySelector(".author-image-container"),s=e.querySelector(".announcement-author-name");n.innerHTML=new Fe({url:this.author.profileImage}).html(),s.innerText=this.author.name}render(){this.renderAuthor()}html(){const e=this.item.postedDate.split("-").slice(1).join("/");return`
      <li id="announcement-${this.item.announcementId}">
        <div class="announcement-author">
          <div class="author-image-container"></div>
          <div class="announcement-info">
            <div class="announcement-author-name"></div>
            <div class="announcement-time">${e}</div>
          </div>
        </div>
        <div class="announcement-content">
          <p>${this.item.content.replaceAll(`
`,"<br />")}</p>
        </div>
      </li>
    `}}class Br extends z{constructor(){super("#main"),this.Title=new $e({title:"작은 큐브가 만드는 큰 변화, Cube.IT",subtitle:"VISION & MISSION",description:"Cube.IT은 작은 아이디어로 큰 변화를 만들어갑니다. 혁신적인 큐브의 힘을 경험해 보세요."}),this.store=B}async setAnnouncements(){this.announcements=await tr(),this.galleryAnnouncements=this.announcements.filter(e=>e.imageUrl),this.textAnnouncements=this.announcements.filter(e=>!e.imageUrl)}async renderGalleryAnnouncements(){const e=document.querySelector(".home-container .gallery");this.announcements||await this.setAnnouncements(),e.innerHTML=this.galleryAnnouncements.map(n=>new Nr(n).html()).join("")}async renderTextAnnouncements(){const e=document.querySelector(".home-container .announcement-contents");this.announcements||await this.setAnnouncements();const n=[];e.innerHTML=this.textAnnouncements.map(s=>{const r=new _r(s);return n.push(r),r.html()}).join(""),n.forEach(s=>s.render())}async renderPersonalInfo(){if(!await he())return;this.user||(this.user=await this.store.getUser()),this.PersonalInfo=new un({member:this.user});const n=document.querySelector(".home-container .personal-info-container");n.innerHTML=this.PersonalInfo.html(),this.PersonalInfo.render()}render(){this.$container.innerHTML=`
      <div class="home-container">
        <header class="home-mobile-header mobile-only">
          <div class="logo-container">
            <div class="logo">
              <img src=${ct} alt="" />
            </div>
            <strong class="logo-title">Cube.IT</strong>
          </div>
          <ul class="menu-list"></ul>
        </header>

        ${this.Title.html()}

        <div class="my-info desktop-only">
          <div class="wrapper">
            <h2 class="home-subtitle">내 정보</h2>
          </div>
          <div class="personal-info-container"></div>
        </div>

        <section class="gallery-section">
          <div class="wrapper">
            <h2 class="home-subtitle">공지사항 갤러리</h2>
            <ul class="gallery"></ul>
          </div>
        </section>

        <section class="announcement-container">
          <div class="wrapper">
            <h2 class="home-subtitle">주요 소식</h2>
            <ul class="announcement-contents"></ul>
          </div>
        </section>
      </div>
    `,this.renderPersonalInfo(),this.renderTextAnnouncements(),this.renderGalleryAnnouncements(),this.renderTextAnnouncements()}}class lt{constructor({headers:e,contents:n}){this.headers=e,this.contents=n,this.width=Math.floor(100/e.length)}html(){return`
      <div class="table-wrapper">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                ${this.headers.map(e=>`<th style="width: ${this.width}%;">${e}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${this.contents.map(e=>`<tr>${e.map(n=>`<td>${n}</td>`).join("")}</tr>`).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `}}class Ur{constructor({currentPage:e,maxPage:n,onPageChange:s}){T(this,"handleFastLeft",()=>this.updatePage(1));T(this,"handleFastRight",()=>this.updatePage(this.maxPage));T(this,"handleLeft",()=>this.updatePage(this.currentPage===1?1:this.currentPage-1));T(this,"handleRight",()=>this.updatePage(this.currentPage===this.maxPage?this.maxPage:this.currentPage+1));T(this,"handlePageClick",e=>this.updatePage(e));T(this,"getCurrentPage",()=>this.currentPage);this.currentPage=e,this.maxPage=n,this.onPageChange=s,this.pages=[],this.chevrons_left=new H({svg:or,options:{size:"18px"}}),this.chevron_left=new H({svg:rn,options:{size:"18px"}}),this.chevron_right=new H({svg:on,options:{size:"18px"}}),this.chevrons_right=new H({svg:ar,options:{size:"18px"}}),this.calculatePages()}calculatePages(){this.pages=[],((n,s,r)=>{s<=7?r.push(...Array.from({length:s},(i,o)=>o+1)):n<5?r.push(...Array.from({length:5},(i,o)=>o+1),"...",s):n>=5&&n<=s-4?r.push(1,"...",n-1,n,n+1,"...",s):r.push(1,"...",...Array.from({length:5},(i,o)=>o+s-4))})(this.currentPage,this.maxPage,this.pages)}updatePage(e){this.currentPage=e,this.calculatePages(),this.onPageChange(this.currentPage),this.updateButtonStates(),this.render()}updateButtonStates(){document.querySelector(".fast-left").disabled=this.currentPage===1,document.querySelector(".left").disabled=this.currentPage===1,document.querySelector(".fast-right").disabled=this.currentPage===this.maxPage,document.querySelector(".right").disabled=this.currentPage===this.maxPage}render(){document.querySelector(".pagination-container").innerHTML=this.html(),this.addEventListeners(),this.updateButtonStates()}addEventListeners(){document.querySelectorAll(".pagination-container button").forEach((e,n)=>{n===0?e.addEventListener("click",this.handleFastLeft):n===1?e.addEventListener("click",this.handleLeft):n===this.pages.length+2?e.addEventListener("click",this.handleRight):n===this.pages.length+3?e.addEventListener("click",this.handleFastRight):e.addEventListener("click",()=>this.handlePageClick(this.pages[n-2]))})}html(){return`
      <div class='pagination-container'>
        <button class='fast-left'>${this.chevrons_left.html()}</button>
        <button class='left'>${this.chevron_left.html()}</button>
        ${this.pages.map(e=>e==="..."?`<button class='omit' disabled>${e}</button>`:`<button class='page ${e===this.currentPage?"active":""}'>${e}</button>`).join("")}
        <button class='right'>${this.chevron_right.html()}</button>
        <button class='fast-right'>${this.chevrons_right.html()}</button>
      </div>
    `}}var Hr={VITE_SERVER_URL:"https://equal-rosemarie-deun-b63b6790.koyeb.app",VITE_BASE_URL:"/idle-intranet-service",BASE_URL:"/idle-intranet-service/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_SERVER_URL:Fr}=Hr,ut=Fr,qr=async(t,e)=>{try{const n=await fetch(`${ut}/api/members/${t}?max=${e}`,{method:"GET"});if(!n.ok)throw new Error(`Failed to load data: ${n.statusText}`);const s=await n.json();return[s.data,s.total]}catch(n){throw console.error("Error loading page:",n),n}},Vr=async(t,e,n)=>{try{const s=encodeURIComponent(t),r=await fetch(`${ut}/api/members/search/${s}?max=${e}&page=${n}`,{method:"GET"});if(!r.ok){const o=await r.json();throw new Error(`Failed to search members: ${o.error}`)}const i=await r.json();return[i.data,i.total]}catch(s){throw console.error("Error searching members:",s.message),s}},jr=async(t,e=!1,n=!1)=>{try{const s=await fetch(`${ut}/api/member/${t}?isAdmin=${e}&isOwner=${n}`,{method:"GET"});if(!s.ok)throw new Error(`Failed to load data: ${s.statusText}`);return(await s.json()).data}catch(s){throw console.error("Error loading member data:",s),s}},Wr="/idle-intranet-service/assets/no-result-CZkYnNXR.png";class zr extends z{constructor(){super("#main");T(this,"handlePageChange",n=>{this.currentPage=n;const s=document.getElementById("search-input").value;s?this.searchMember(s):this.getMember()});T(this,"handleFormSubmit",n=>{n.preventDefault(),this.currentPage=1;const s=document.getElementById("search-input").value;this.searchMember(s)});T(this,"searchMember",n=>{n===""?this.getMember():Vr(n,this.maxProfile,this.currentPage).then(([s,r])=>{this.contents=s,this.total=r,this.renderPagination(),this.renderTable(),this.updateTotalCount()}).catch(s=>{console.error("Failed to search members:",s.message)})});T(this,"getMember",()=>{qr(this.currentPage,this.maxProfile).then(([n,s])=>{this.contents=n,this.total=s,this.renderPagination(),this.renderTable(),this.updateTotalCount()}).catch(n=>{console.error("Failed to load page data:",n)})});T(this,"resetSearch",()=>{this.currentPage=1,document.getElementById("search-input").value="",this.getMember()});T(this,"updateTotalCount",()=>{document.querySelectorAll(".members-container em").forEach(n=>{n.innerText=this.total})});T(this,"renderPagination",()=>{this.pagination=new Ur({currentPage:this.currentPage,maxPage:Math.ceil(this.total/this.maxProfile),onPageChange:this.handlePageChange}),window.location.pathname===I.MEMBERS&&(document.body.querySelector(".pagination-container").innerHTML=this.pagination.html(),this.pagination.render())});T(this,"renderTable",()=>{const n=this.contents.map(s=>(this.Avatar=new Fe({url:s.profileImage}),[this.createMemberLink(`${this.Avatar.html()}<div>${s.name}</div>`,s.employeeNumber),this.createMemberLink(s.position,s.employeeNumber),this.createMemberLink(s.departmentName,s.employeeNumber),this.createMemberLink(s.email,s.employeeNumber),this.createMemberLink(s.phoneNumber,s.employeeNumber)]));if(this.ids=this.contents.map(s=>[s.employeeNumber]),this.table=new lt({headers:["이름","직무","조직","이메일","연락처"],contents:n}),this.total===0){const s=document.getElementById("search-input").value;document.getElementById("table-container").innerHTML=`
        <div class="no-result-container">
          <img
            src="${Wr}"
            alt="검색 결과 없음"
            class="no-result-image"
          />
          <p><strong>'${s}'</strong>에 대한 검색 결과가 없습니다.</p>
          <p>다른 검색어를 입력해 주세요.</p>
        </div>
      `}else if(window.location.pathname===I.MEMBERS){const s=document.getElementById("table-container");s.innerHTML=this.table.html()}});this.Title=new $e({title:U.MEMBERS}),this.magnifyGlass=new H({svg:cr,options:{size:"18px",color:Y.DARK_GRAY}}),this.input=new re({placeholder:"이름을 입력하세요",id:"search-input"}),this.currentPage=1,this.maxProfile=7,this.contents=[],this.total=0,this.ids=[],he().then(n=>{n&&this.getMember()})}createMemberLink(n,s){return`<a href="${I.MEMBERS}/${s}">${n}</a>`}render(){this.$container.innerHTML=`
      <div class='members-container'>
        <div class='members-mobile-only'>
          ${this.Title.html()}
          <span>총 <em>${this.total}</em> 명</span>
        </div>
        <div class='members-content-container'>
          <div class='members-search-header'>
            <span>총 <em>${this.total}</em> 명</span>
            <form id="search-form" class='members-input-container'>
              ${this.input.html()}
              <button type="submit" class='submit-button'>
                ${this.magnifyGlass.html()}
              </button>
            </form>
          </div>
          <div id='table-container'>
            ${this.table?this.table.html():""}
          </div>
        </div>
        <div class='pagination-container'>
          ${this.pagination?this.pagination.html():""}
        </div>
      </div>
    `,this.pagination&&this.pagination.render(),document.querySelector(".submit-button").addEventListener("click",this.handleFormSubmit),this.resetSearch()}}class Ie{constructor({title:e,info:n}){this.title=e,this.info=n}html(){return`
      <li>
        <div class="wrapper">
          <h2 class="personal-detail-title">${this.title}</h2>
          <ul class="personal-detail-list">
            ${this.info.length?this.info.map(e=>`
                        <li>
                          <h3 class="personal-detail-subtitle">${e.subtitle}</h3>
                          <span class="personal-detail-info">${e.contents}</span>
                        </li>
                      `).join(""):'<li class="admin-owner-only">본인 혹은 관리자만 열람할 수 있습니다.</li>'}
          </ul>
        </div>
      </li>
    `}}const Gr=(t,e)=>{const n=i=>{const o=i.split(" ~ ")[1];return o==="현재"?new Date:new Date(o)},s=n(t.period);return n(e.period)-s};class dn{constructor(){this.store=B,this.personalInfo=[],this.privateInfo=[],this.employmentInfo=[],this.educationAndCareerInfo=[]}setInfoArray(){if(this.personalInfo=[{subtitle:"조직",contents:this.member.departmentName},{subtitle:"직책",contents:this.member.role}],this.privateInfo=[{subtitle:"이메일",contents:this.member.email},{subtitle:"전화번호",contents:this.member.phoneNumber}],this.isAdmin||this.isOwner){this.privateInfo.unshift({subtitle:"생년월일",contents:this.member.birthDate}),this.privateInfo.push({subtitle:"자택 주소",contents:this.member.address}),this.employmentInfo=[{subtitle:"입사일",contents:this.member.hireDate},{subtitle:"근무유형",contents:this.member.employmentType}];const e=JSON.parse(this.member.career);e.sort(Gr),this.educationAndCareerInfo=[{subtitle:"학력",contents:this.member.education},{subtitle:"경력",contents:`<ul class="career-list">
            ${e.length?e.map(n=>`
                        <li>
                          <strong class="career-company">${n.companyName}</strong>
                          <div class="career-period">(${n.period})</div>
                          <div class="career-role">${n.role}</div>
                        </li>
                      `).join(""):"<li>없음</li>"}
          </ul>`}]}this.isAdmin&&this.member.salary&&this.employmentInfo.push({subtitle:"연봉",contents:this.member.salary.toLocaleString("en-US")})}renderPersonalDetails(){const e=document.querySelector(".personal-details-list");e.innerHTML=`
      ${new Ie({title:"인사정보",info:this.personalInfo}).html()}
      ${new Ie({title:"개인정보",info:this.privateInfo}).html()}
      ${new Ie({title:"고용정보",info:this.employmentInfo}).html()}
      ${new Ie({title:"학력/경력",info:this.educationAndCareerInfo}).html()}
    `}async render(e){this.user=await this.store.getUser(),this.member=e,this.isAdmin=!!this.user.isAdmin,this.isOwner=this.member.employeeNumber===this.user.employeeNumber,this.setInfoArray(),this.renderPersonalDetails()}html(){return`
      <section class="personal-details-section">
        <ul class="personal-details-list"></ul>
      </section>
    `}}class Kr extends z{constructor(){super("#main"),this.store=B,this.Title=new $e({title:U.PROFILE,desktopOnly:!0}),this.Button=new ue({variant:"tertiary",content:"로그아웃"})}async setUserInfo(){await he()&&(this.user||(this.user=await this.store.getUser()),this.PersonalDetails=new dn,this.PersonalInfo=new un({member:this.user}))}async render(){await this.setUserInfo(),this.$container.innerHTML=`
      ${this.Title.html()}
      ${this.PersonalInfo.html()}
      ${this.PersonalDetails.html()}
      <div class='logout-btn-wrapper-inprofile'>
        ${this.Button.html()}
      </div>`,this.PersonalDetails.render(this.user),this.PersonalInfo.render(),document.querySelector(".logout-btn-wrapper-inprofile button").addEventListener("click",Ct)}}class Jr{constructor(e){this.vacationData=e,this.chevronRight=new H({svg:on,options:{size:"24px",color:Y.DARK_GRAY}})}html(){return`
      <li class="vacation-card">
        <div class="vacation-card-type-box">
          <div class="vacation-card-icon">${this.vacationData.icon}</div>
          <p class="vacation-card-type">${this.vacationData.type}</p>
        </div>
        <div class="vacation-card-info-box">
          <p class="vacation-card-days">${this.vacationData.days}</p>
          <div class="next-arrow-icon">${this.chevronRight.html()}</div>
        </div>
      </li>
    `}}const tt=[{icon:"🌴",type:"연차",days:"17일"},{icon:"💼",type:"반차",days:"3시간"},{icon:"🤰🏻",type:"출산 휴가",days:"90일"},{icon:"🫃🏻",type:"배우자 출산 휴가",days:"30일"},{icon:"🎀",type:"여성 휴가",days:"1일"},{icon:"👥",type:"가족 돌봄 휴가",days:"1일"},{icon:"👤",type:"기타 휴가",days:"1일"}],Yr=["전체 휴가","연차","반차","출산 휴가","배우자 출산 휴가","여성 휴가","가족 돌봄 휴가","기타 휴가"],j=class j{constructor({contents:e,onSelect:n,excludeFirst:s=!1,roundedBorder:r=!1,small:i=!1}){T(this,"toggleDropdown",()=>{j.openDropdown&&j.openDropdown!==this&&j.openDropdown.closeDropdown(),this.dropdownVisible=!this.dropdownVisible;const e=this.dropdownButton.nextElementSibling;e.style.display=this.dropdownVisible?"block":"none",this.dropdownButton.classList.toggle("dropdown-open",this.dropdownVisible),this.dropdownVisible?j.openDropdown=this:j.openDropdown=null});T(this,"closeDropdown",()=>{this.dropdownVisible=!1;const e=this.dropdownButton.nextElementSibling;e.style.display="none",this.dropdownButton.classList.remove("dropdown-open"),j.openDropdown=null});T(this,"updateSelection",e=>{this.onSelect(e),this.selectedItem=e,this.dropdownButton.innerHTML=`${e} ${this.chevronDown.html()}`,this.closeDropdown()});if(typeof n!="function")throw new Error("onSelect callback must be provided and must be a function");this.id=`select-${j.instanceCounter}`,j.instanceCounter+=1,this.contents=e||[],this.onSelect=n,this.dropdownVisible=!1,this.roundedBorder=r,this.small=i,this.chevronDown=new H({svg:lr,options:{size:"18px",color:Y.DARK_GRAY}}),this.filteredContents=s?e.slice(1):e,this.selectedItem=this.contents[0]||""}getSelectedItem(){return this.selectedItem}html(){const e=this.roundedBorder?"dropdown-btn rounded-border":"dropdown-btn underlined";return`
      <div class="${this.small?"dropdown-menu small":"dropdown-menu"}" id="${this.id}">
        <button class="${e}">
          ${this.selectedItem} ${this.chevronDown.html()}
        </button>
        <ul class="dropdown-list">
          ${this.filteredContents.map(s=>`<li class="dropdown-item">${s}</li>`).join("")}
        </ul>
      </div>
    `}setEventListeners(){const e=document.getElementById(this.id),n=e.querySelector(".dropdown-btn"),s=e.querySelectorAll(".dropdown-item");this.dropdownButton=n,n.addEventListener("click",this.toggleDropdown),s.forEach(r=>{r.addEventListener("click",()=>{const i=r.textContent;this.updateSelection(i)})})}};T(j,"instanceCounter",0),T(j,"openDropdown",null);let xe=j;function Zr(t){const e=[];for(let n=1;n<=t;n+=1)e.push(`${n}일`);return e}function Xr(t,e){const n=new Date(t);n.setDate(n.getDate()+e-1);const s=n.getFullYear(),r=String(n.getMonth()+1).padStart(2,"0"),i=String(n.getDate()).padStart(2,"0");return`${s}-${r}-${i}`}class It{constructor(e){this.store=B,this.vacationDataType=e,this.CalendarIcon=new H({svg:pr,options:{size:"1.2rem"}})}async updateVacationList(){return this.user||(this.user=await this.store.getUser()),Zr(this.user.remainingVacationDays)}getIcon(e){const n=tt.find(s=>s.type===e);return n?n.icon:""}async initFormInputs(){this.VacationTypeInput=new re({id:"vacationType",type:"text",value:`${this.getIcon(this.vacationDataType)} ${this.vacationDataType}`,readOnly:!0}),this.StartDateInput=new re({id:"startDate",type:"text",value:new Date().toISOString().split("T")[0],readOnly:!0});const e=await this.updateVacationList();this.DaySelect=new xe({contents:e,onSelect:n=>this.calculateAndDisplayEndDate(n),small:!0}),this.EndDateInput=new re({id:"endDate",type:"text",value:"",readOnly:!0})}calculateAndDisplayEndDate(e){let n=e;if(n||(n=1),this.StartDateInput){const s=new Date(this.StartDateInput.value),r=parseInt(n,10),i=Xr(s,r);this.EndDateInput.value=i,this.$endDateInput.innerHTML=this.EndDateInput.html()}}async render(){this.$vacationTypeInput=document.querySelector(".vacation-type-input"),this.$daySelect=document.querySelector(".day-select"),this.$startDateInput=document.querySelector(".start-date-input"),this.$endDateInput=document.querySelector(".end-date-input"),await this.initFormInputs(),this.$vacationTypeInput.innerHTML=this.VacationTypeInput.html(),this.$daySelect.innerHTML=this.DaySelect.html(),this.$startDateInput.innerHTML=`${this.StartDateInput.html()} ${this.CalendarIcon.html()}`,this.$endDateInput.innerHTML=this.EndDateInput.html(),this.DaySelect.setEventListeners(),this.$startDateInput.querySelector("input").addEventListener("click",()=>{}),this.calculateAndDisplayEndDate()}getSelectedVacationData(){return{vacationType:this.vacationDataType,vacationStartDate:this.StartDateInput.value,vacationEndDate:this.EndDateInput.value,vacationReason:document.querySelector("#vacationReason").value}}html(){return`
      <div class="vacation-form" id="vacationForm">
        <div class="input-field input-readonly">
          <label>휴가 종류</label>
          <div class="vacation-type-input"></div>
        </div>
        <div class="input-field border input-readonly">
          <label>시작일</label>
          <div class="start-date-input"></div>
        </div>
        <div class="input-field border">
          <label>사용기간</label>
          <div class="day-select"></div>
        </div>
        <div class="input-field input-readonly">
          <label>종료일</label>
          <div class="end-date-input"></div>
        </div>
        <div class="input-field">
          <textarea
            class="vacation-reason"
            name="vacationReason"
            id="vacationReason"
            placeholder="휴가 사유를 입력해주세요."
          ></textarea>
        </div>
      </div>
    `}}async function Qr(t,e=1,n=10){try{return(await ee({endpoint:`${Q.VACATION_REQUESTS}/${e}`,method:"get",params:{employeeNumber:t,max:n}})).data}catch(s){throw console.error(`Failed to fetch vacation requests for employee ${t}:`,s),s}}async function ei({employeeNumber:t,departmentNumber:e=10,vacationStartDate:n,vacationEndDate:s,approvalStatus:r="미승인",vacationType:i,vacationStartTime:o="18:15",vacationEndTime:a="18:15",vacationReason:d,vacationRequestDate:u="2024-07-12",usageStatus:l="미사용"}){try{return await ee({endpoint:Q.VACATION_REQUESTS,method:"post",data:{employeeNumber:t,departmentNumber:e,vacationStartDate:n,vacationEndDate:s,approvalStatus:r,vacationType:i,vacationStartTime:o,vacationEndTime:a,vacationReason:d,vacationRequestDate:u,usageStatus:l},auth:!1})}catch(m){throw console.error("Failed to update profile:",m),m}}class ti{constructor(){T(this,"handleVacationCardClick",async e=>{this.vacationForm=new It(e),this.setModal({mainContent:this.vacationForm.html(),onSubmit:async()=>{const s={...this.vacationForm.getSelectedVacationData(),employeeNumber:await this.getEmployeeNumber()};console.log("신청한 휴가 데이터:",{...s}),(await ei(s)).status==="OK"?console.log("휴가 신청이 완료되었습니다."):console.log("휴가 신청에 실패했습니다."),this.modal.close()}}),this.modal.open(),this.vacationForm.render()});this.modal=new at({title:"휴가 신청",buttonContent:"휴가 신청하기"}),this.vacationForm=new It,this.store=B}setModal({mainContent:e,onSubmit:n}){const s=document.body.querySelector(".vacation-modal-wrapper");this.modal.mainContent=e,this.modal.onSubmit=n,s.innerHTML=this.modal.html(),this.modal.render()}renderVacationCard(){const e=this.$vacationCardContainer.querySelector(".vacation-cards-list");e&&(e.innerHTML=tt.map(n=>new Jr(n).html()).join(""),e.querySelectorAll(".vacation-card").forEach((n,s)=>{n.addEventListener("click",()=>{const r=tt[s];this.handleVacationCardClick(r.type,r.days)})}))}async render(){this.$vacationCardContainer=document.querySelector("#main .vacation-cards-container"),this.$vacationCardContainer.innerHTML=`
      <div class="wrapper">
        <h3 class="vacation-cards-title">휴가 신청하기</h3>
        <ul class="vacation-cards-list"></ul>
        <div class="vacation-modal-wrapper"></div>
      </div>
    `,this.renderVacationCard()}async getEmployeeNumber(){return(await this.store.getUser()).employeeNumber}}class ni{constructor(){this.store=B,this.isLoading=!0,this.VacationSelect=new xe({contents:Yr,onSelect:e=>this.onSelectType(e),roundedBorder:!0})}onSelectType(e){let n=this.vacations.filter(s=>s.vacationType===e);e==="전체 휴가"&&(n=this.vacations),this.renderTable(n,e)}setTableContents(e){return e.map(({vacationStartDate:n,vacationEndDate:s,vacationType:r,approvalStatus:i,vacationRequestDate:o})=>[r,`<span class="vacation-status">${i}</span>`,n,s,o])}renderTable(e,n=null){const s=this.setTableContents(e);this.Table=new lt({headers:["휴가 종류","승인 상태","휴가 시작일","휴가 종료일","신청일"],contents:s});const r=this.$vacationHistoriesContainer.querySelector(".vacation-table-container");!e.length&&n?r.innerHTML=`
        <p class="no-vacations-result">
          <strong>'${n}'</strong> 사용 기록이 없습니다.
        </p>
      `:r.innerHTML=this.Table.html()}async setVacation(){this.user||(this.user=await this.store.getUser()),this.vacations=await Qr(this.user.employeeNumber)}async render(){this.$vacationHistoriesContainer=document.querySelector("#main .vacation-histories-container"),this.$vacationHistoriesContainer.innerHTML=`
      <div class="wrapper">
        <div class="vacation-histories-header">
          <h3 class="vacation-histories-title">사용 기록</h3>
          ${this.VacationSelect.html()}
        </div>
      </div>
      <div class="vacation-table-container"></div>
    `,await this.setVacation(),this.renderTable(this.vacations),this.VacationSelect.setEventListeners()}}async function si(t,e=1,n=10){try{return(await ee({endpoint:`${Q.ATTENDANCE}/${e}`,method:"get",params:{employeeNumber:t,max:n}})).data}catch(s){throw console.error("Failed to fetch user weekly attendances:",s),s}}function Me(t){return t??"-"}class ri{constructor(){T(this,"renderTable",()=>{const e=Qs(this.attendances),n=this.attendances.map(s=>{const r=Xs(s.date),{cumulativeHours:i}=e.find(o=>o.date===s.date);return[`${Me(s.date)} (${r})`,Me(s.startTime),Me(s.endTime),Me(i)]});return n.reverse(),this.table=new lt({headers:["날짜 (요일)","출근 시각","퇴근 시각","주간 근무 시간"],contents:n,width:25}),this.table.html()});this.store=B,this.attendances=[],this.cumulativeWeeklyHours=0}async setWeeklyAttendances(){this.user||(this.user=await this.store.getUser()),this.attendances=await si(this.user.employeeNumber)}async renderWorkingHistory(){this.$workingHistoryContainer=document.querySelector(".working-history-container"),this.attendances.length||await this.setWeeklyAttendances(),this.$workingHistoryContainer&&(this.$workingHistoryContainer.innerHTML=this.renderTable())}async render(){this.$workingTabContainer=document.querySelector("#main .working-tab-container"),this.$workingTabContainer.innerHTML=`
      <h3 class="working-tab-title">근무내역</h3>
      <div class="working-history-container"></div>
    `,await this.setWeeklyAttendances(),this.renderWorkingHistory()}}class ii extends z{constructor(){super("#main"),this.Title=new $e({title:U.WORK_MANAGE}),this.vacationCards=new ti,this.vacationHistories=new ni,this.workingTab=new ri}setupMenuInteraction(){const e=this.$container.querySelectorAll(".work-manage-menu-item");e.forEach(n=>n.addEventListener("click",s=>{e.forEach(r=>r.classList.remove("active")),s.currentTarget.classList.add("active"),this.renderContent(s.currentTarget.id)}))}async renderContent(e){const n={"work-management":[this.$container.querySelector(".working-tab-container")],"vacation-management":[this.$container.querySelector(".vacation-cards-container"),this.$container.querySelector(".vacation-histories-container")]};Object.values(n).forEach(r=>r.forEach(i=>{i&&i.classList.add("hidden")}));const s=n[e];switch(s&&s.forEach(r=>{r&&r.classList.remove("hidden")}),e){case"work-management":this.workingTab.render();break;case"vacation-management":await this.renderVacationTab();break;default:await this.workingTab.render()}}renderVacationTab(){this.vacationCards.render(),this.vacationHistories.render()}async render(){this.$container.innerHTML=`
      <div class="work-manage-header-container">
        ${this.Title.html()}
        <ul class="work-manage-menu-list wrapper">
          <li class="work-manage-menu-item active" id="work-management">
            근무 관리
          </li>
          <li class="work-manage-menu-item" id="vacation-management">
            휴가 관리
          </li>
        </ul>
      </div>
      <div id="work-manage-content" class="work-manage-content">
        <section class="vacation-cards-container hidden"></section>
        <section class="vacation-histories-container hidden"></section>
        <section class="working-tab-container"></section>
      </div>
    `,await this.workingTab.render(),this.setupMenuInteraction()}}class oi{constructor(){T(this,"handleForm",e=>{e.preventDefault(),this.email=document.getElementById("signin_email").value,this.password=document.getElementById("signin_password").value,this.isValidEmail=this.validateEmail(),this.isValidPassword=this.validatePassword(),this.isValidEmail?this.isValidPassword?gn(this.email,this.password,this.showErrorMessage):this.showErrorMessage("비밀번호는 8자 이상, 30자 이하로 작성해 주시기 바랍니다."):this.showErrorMessage("이메일 형식이 올바른지 확인해 주시기 바랍니다."),document.querySelector(".button.btn-primary").removeAttribute("disabled")});T(this,"handleInput",()=>{const e=document.getElementById("signin_email").value,n=document.getElementById("signin_password").value,s=document.querySelector(".button.btn-primary");e.length>0&&n.length>0?s.removeAttribute("disabled"):s.setAttribute("disabled",!0)});T(this,"showErrorMessage",e=>{const n=document.querySelector(".alert-message");n.textContent=e,n.classList.add("show"),this.clearInputs()});T(this,"clearInputs",()=>{document.getElementById("signin_email").value="",document.getElementById("signin_password").value=""});this.EmailInput=new re({id:"signin_email",type:"email",placeholder:"이메일",required:!0}),this.PasswordInput=new re({id:"signin_password",type:"password",placeholder:"비밀번호",required:!0}),this.Button=new ue({type:"submit",variant:"primary",content:"로그인",disabled:!0}),this.isValidEmail=!1,this.isValidPassword=!1}validateEmail(){return/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(String(this.email).toLowerCase())}validatePassword(){return this.password.length>=8&&this.password.length<=30}html(){return`
      <form id="signin_form" class="signin-form">
        ${this.EmailInput.html()}
        ${this.PasswordInput.html()}
        <p class="alert-message"></p>
        ${this.Button.html()}
      </form>
    `}setEventListeners(){const e=document.getElementById("signin_email"),n=document.getElementById("signin_password"),s=document.querySelector(".button.btn-primary");e.addEventListener("input",this.handleInput),n.addEventListener("input",this.handleInput),s.addEventListener("click",this.handleForm)}}const ai="/idle-intranet-service/assets/dashboard-CkOnVST7.png";class ci extends z{constructor(){super("#app"),this.Form=new oi}render(){this.$container.innerHTML=`
      <div class="signin-container">
        <header>
          <div class="logo-container">
            <div class="logo">
              <img src="${ct}" alt="" />
            </div>
            <h1 class="logo-title">Cube.IT</h1>
          </div>
        </header>
        <div class="desktop-only signin-bg">
          <img src="${ai}" alt="로그인 페이지 대시보드" />
        </div>
        <section class="signin-section">
          <div class="signin-wrapper">
            <h2 class="signin-title">
              <div class="hand-icon">👋</div>
              <p class="title-message">큐브잇 인트라넷에 오신 걸 환영합니다!</p>
            </h2>
            <div class='form-wrapper'>
              ${this.Form.html()}
            </div>
            <p class="password-help-message">비밀번호를 잊어버리셨다면, IT 지원팀으로 문의해 주세요.</p>
            <p class="password-help-message">IT 지원팀 연락처: cubeit.it@cubeit.com</p>
          </div>
        </section>
      </div>
    `,this.Form.setEventListeners()}}class li extends z{constructor(){super("#main"),this.store=B,this.Title=new $e({title:U.MEMBERS,desktopOnly:!0}),this.store=B}async setUserInfo(){if(!await he())return;this.user||(this.user=await this.store.getUser());const n=window.location.pathname.split("/");this.employeeNumber=n[n.length-1];const s=this.user.employeeNumber===this.employeeNumber;try{this.member=await jr(this.employeeNumber,this.user.isAdmin,s)}catch(r){console.error("Failed to fetch user data:",r)}this.PersonalDetails=new dn,this.ProfileInfo=new et({member:this.member,isWorking:this.user.employeeNumber===this.member.employeeNumber?await this.store.getUserIsWorking():!0})}async render(){await this.setUserInfo(),this.$container.innerHTML=`
      ${this.Title.html()}
      <section class="personal-info-section">
        <div class="wrapper">
          ${this.ProfileInfo.html()}
        </div>
      </section>
      ${this.PersonalDetails.html()}
    `,this.PersonalDetails.render(this.member),this.ProfileInfo.render()}}const ui=(t,e)=>{if(!e)return null;let n=null;return Object.keys(e).forEach(s=>{if(n)return;const r=e[s],i=[],o=s.replace(/:[^\s/]+/g,u=>(i.push(u.slice(1)),"([^\\/]+)")),a=new RegExp(`^${o}$`);t.match(a)&&(n=r)}),n};class di{constructor(){T(this,"handleNavigatePage",e=>{e.preventDefault();const n=e.target.closest("a");n&&n.href&&(window.history.pushState(null,null,n.href),this.route(),this.activeNavBar())});this.title="CubeIT ",this.currentPage=null}setRoutes(){this.routes={[I.HOME]:{title:U.HOME,page:new Br},[I.ANNOUNCEMENT]:{title:U.ANNOUNCEMENT,page:new fr},[I.MEMBER]:{title:U.MEMBERS,page:new li},[I.MEMBERS]:{title:U.MEMBERS,page:new zr},[I.PROFILE]:{title:U.PROFILE,page:new Kr},[I.WORK_MANAGE]:{title:U.WORK_MANAGE,page:new ii},[I.SIGNIN]:{title:U.SIGNIN,page:new ci}}}activeNavBar(){const e=window.location.pathname;this.Menu.active=e}route(){const e=window.location.pathname;he().then(s=>{!s&&e!==I.SIGNIN&&(window.history.pushState(null,null,I.SIGNIN),this.routes[I.SIGNIN].page.render())});const n=ui(e,this.routes);this.currentPage&&this.currentPage.cleanUp&&this.currentPage.cleanUp(),n&&n.page?(this.currentPage=n.page,document.title=this.title+n.title,this.currentPage.render()):this.notFoundPage.render(),this.activeNavBar()}init(){window.addEventListener("popstate",()=>this.route()),document.body.addEventListener("click",this.handleNavigatePage),this.Menu=B.Menu,this.notFoundPage=new wr,this.setRoutes(),this.route()}}class hi extends z{constructor(){super(".header-container"),this.store=B,this.icon=new H({svg:hr,options:{color:Y.DARKEST_GRAY,size:"14px"}}),this.Button=new ue({variant:"ghost",content:`${this.icon.html()} 로그아웃`,size:"small"})}async renderAvatar(){if(!await he())return;this.user||(this.user=await this.store.getUser(),this.Avatar=new Fe({url:this.user.profileImage}));const n=document.querySelector("header .avatar-container");n.innerHTML=this.Avatar.html()}render(){this.$container.innerHTML=`
      <div class="wrapper header-items">
        <div class="avatar-container"></div>
        <div class="logout-btn-wrapper">${this.Button.html()}</div>
      </div>
    `,document.querySelector(".logout-btn-wrapper button").addEventListener("click",Ct),this.renderAvatar()}}class mi extends z{constructor(){super(".navbar")}render(){this.$container.innerHTML=`
      <div class="logo-container desktop-only">
        <div class="logo">
          <img src=${ct} alt="" />
        </div>
        <strong class="logo-title">Cube.IT</strong>
      </div>
      <ul class="menu-list"></ul>
    `}}const pi=[{path:I.HOME,title:U.HOME,icon:sr},{path:I.MEMBERS,title:U.MEMBERS,icon:rr},{path:I.PROFILE,title:U.PROFILE,icon:ir},{path:I.WORK_MANAGE,title:U.WORK_MANAGE,icon:sn}];class fi extends z{constructor(){super(".menu-list"),this.menus=pi,this._active=I.HOME}set active(e){this._active=e,this.render()}isActiveMenu(e){return e===I.HOME&&this._active===I.HOME?!0:e===I.HOME?!1:this._active.startsWith(e)}render(){this.$container.innerHTML=this.menus.map(e=>{const n=this.isActiveMenu(e.path),s=new H({svg:e.icon,options:{color:n?Y.PRIMARY:Y.BLACK}});return`
          <li>
            <a href="${e.path}" class="${n?"active":""}">
              ${s.html()}
              <span class="nav-menu">${e.title}</span>
            </a>
          </li>
        `}).join("")}}class gi extends z{constructor(){super("#app"),this.store=B}renderHeader(){this.Header=new hi,this.Header.render()}renderNavbar(){this.NavBar=new mi,this.NavBar.render(),this.Menu=new fi,this.Menu.render(),this.store.setMenu(this.Menu)}render(){this.$container.innerHTML=`
      <header class="header-container desktop-only"></header>
      <nav class="navbar"></nav>
      <main id="main" class="main-container"></main>
    `,this.renderHeader(),this.renderNavbar()}}class wi{constructor(){this.Layout=new gi,this.Route=new di,this.init()}init(){this.Layout.render(),this.Route.init()}}document.addEventListener("DOMContentLoaded",new wi);
