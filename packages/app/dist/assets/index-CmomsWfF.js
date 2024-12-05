(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=e(r);fetch(r.href,n)}})();var W,Ne;class ht extends Error{}ht.prototype.name="InvalidTokenError";function er(i){return decodeURIComponent(atob(i).replace(/(.)/g,(t,e)=>{let s=e.charCodeAt(0).toString(16).toUpperCase();return s.length<2&&(s="0"+s),"%"+s}))}function sr(i){let t=i.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw new Error("base64 string is not of the correct length")}try{return er(t)}catch{return atob(t)}}function hs(i,t){if(typeof i!="string")throw new ht("Invalid token specified: must be a string");t||(t={});const e=t.header===!0?0:1,s=i.split(".")[e];if(typeof s!="string")throw new ht(`Invalid token specified: missing part #${e+1}`);let r;try{r=sr(s)}catch(n){throw new ht(`Invalid token specified: invalid base64 for part #${e+1} (${n.message})`)}try{return JSON.parse(r)}catch(n){throw new ht(`Invalid token specified: invalid json for part #${e+1} (${n.message})`)}}const rr="mu:context",ie=`${rr}:change`;class ir{constructor(t,e){this._proxy=nr(t,e)}get value(){return this._proxy}set value(t){Object.assign(this._proxy,t)}apply(t){this.value=t(this.value)}}class de extends HTMLElement{constructor(t){super(),console.log("Constructing context provider",this),this.context=new ir(t,this),this.style.display="contents"}attach(t){return this.addEventListener(ie,t),t}detach(t){this.removeEventListener(ie,t)}}function nr(i,t){return new Proxy(i,{get:(s,r,n)=>{if(r==="then")return;const o=Reflect.get(s,r,n);return console.log(`Context['${r}'] => `,o),o},set:(s,r,n,o)=>{const l=i[r];console.log(`Context['${r.toString()}'] <= `,n);const a=Reflect.set(s,r,n,o);if(a){let d=new CustomEvent(ie,{bubbles:!0,cancelable:!0,composed:!0});Object.assign(d,{property:r,oldValue:l,value:n}),t.dispatchEvent(d)}else console.log(`Context['${r}] was not set to ${n}`);return a}})}function or(i,t){const e=us(t,i);return new Promise((s,r)=>{if(e){const n=e.localName;customElements.whenDefined(n).then(()=>s(e))}else r({context:t,reason:`No provider for this context "${t}:`})})}function us(i,t){const e=`[provides="${i}"]`;if(!t||t===document.getRootNode())return;const s=t.closest(e);if(s)return s;const r=t.getRootNode();if(r instanceof ShadowRoot)return us(i,r.host)}class ar extends CustomEvent{constructor(t,e="mu:message"){super(e,{bubbles:!0,composed:!0,detail:t})}}function ds(i="mu:message"){return(t,...e)=>t.dispatchEvent(new ar(e,i))}class pe{constructor(t,e,s="service:message",r=!0){this._pending=[],this._context=e,this._update=t,this._eventType=s,this._running=r}attach(t){t.addEventListener(this._eventType,e=>{e.stopPropagation();const s=e.detail;this.consume(s)})}start(){this._running||(console.log(`Starting ${this._eventType} service`),this._running=!0,this._pending.forEach(t=>this.process(t)))}apply(t){this._context.apply(t)}consume(t){this._running?this.process(t):(console.log(`Queueing ${this._eventType} message`,t),this._pending.push(t))}process(t){console.log(`Processing ${this._eventType} message`,t);const e=this._update(t,this.apply.bind(this));e&&e(this._context.value)}}function lr(i){return t=>({...t,...i})}const ne="mu:auth:jwt",ps=class fs extends pe{constructor(t,e){super((s,r)=>this.update(s,r),t,fs.EVENT_TYPE),this._redirectForLogin=e}update(t,e){switch(t[0]){case"auth/signin":const{token:s,redirect:r}=t[1];return e(hr(s)),Qt(r);case"auth/signout":return e(ur()),Qt(this._redirectForLogin);case"auth/redirect":return Qt(this._redirectForLogin,{next:window.location.href});default:const n=t[0];throw new Error(`Unhandled Auth message "${n}"`)}}};ps.EVENT_TYPE="auth:message";let ms=ps;const gs=ds(ms.EVENT_TYPE);function Qt(i,t={}){if(!i)return;const e=window.location.href,s=new URL(i,e);return Object.entries(t).forEach(([r,n])=>s.searchParams.set(r,n)),()=>{console.log("Redirecting to ",i),window.location.assign(s)}}class cr extends de{get redirect(){return this.getAttribute("redirect")||void 0}constructor(){const t=Q.authenticateFromLocalStorage();super({user:t,token:t.authenticated?t.token:void 0})}connectedCallback(){new ms(this.context,this.redirect).attach(this)}}class Z{constructor(){this.authenticated=!1,this.username="anonymous"}static deauthenticate(t){return t.authenticated=!1,t.username="anonymous",localStorage.removeItem(ne),t}}class Q extends Z{constructor(t){super();const e=hs(t);console.log("Token payload",e),this.token=t,this.authenticated=!0,this.username=e.username}static authenticate(t){const e=new Q(t);return localStorage.setItem(ne,t),e}static authenticateFromLocalStorage(){const t=localStorage.getItem(ne);return t?Q.authenticate(t):new Z}}function hr(i){return lr({user:Q.authenticate(i),token:i})}function ur(){return i=>{const t=i.user;return{user:t&&t.authenticated?Z.deauthenticate(t):t,token:""}}}function dr(i){return i.authenticated?{Authorization:`Bearer ${i.token||"NO_TOKEN"}`}:{}}function pr(i){return i.authenticated?hs(i.token||""):{}}const D=Object.freeze(Object.defineProperty({__proto__:null,AuthenticatedUser:Q,Provider:cr,User:Z,dispatch:gs,headers:dr,payload:pr},Symbol.toStringTag,{value:"Module"}));function Ot(i,t,e){const s=i.target,r=new CustomEvent(t,{bubbles:!0,composed:!0,detail:e});console.log(`Relaying event from ${i.type}:`,r),s.dispatchEvent(r),i.stopPropagation()}function oe(i,t="*"){return i.composedPath().find(s=>{const r=s;return r.tagName&&r.matches(t)})}const $t=Object.freeze(Object.defineProperty({__proto__:null,originalTarget:oe,relay:Ot},Symbol.toStringTag,{value:"Module"}));function vs(i,...t){const e=i.map((r,n)=>n?[t[n-1],r]:[r]).flat().join("");let s=new CSSStyleSheet;return s.replaceSync(e),s}const fr=new DOMParser;function I(i,...t){const e=t.map(l),s=i.map((a,d)=>{if(d===0)return[a];const f=e[d-1];return f instanceof Node?[`<ins id="mu-html-${d-1}"></ins>`,a]:[f,a]}).flat().join(""),r=fr.parseFromString(s,"text/html"),n=r.head.childElementCount?r.head.children:r.body.children,o=new DocumentFragment;return o.replaceChildren(...n),e.forEach((a,d)=>{if(a instanceof Node){const f=o.querySelector(`ins#mu-html-${d}`);if(f){const u=f.parentNode;u==null||u.replaceChild(a,f)}else console.log("Missing insertion point:",`ins#mu-html-${d}`)}}),o;function l(a,d){if(a===null)return"";switch(typeof a){case"string":return Le(a);case"bigint":case"boolean":case"number":case"symbol":return Le(a.toString());case"object":if(a instanceof Node||a instanceof DocumentFragment)return a;if(Array.isArray(a)){const f=new DocumentFragment,u=a.map(l);return f.replaceChildren(...u),f}return new Text(a.toString());default:return new Comment(`[invalid parameter of type "${typeof a}"]`)}}}function Le(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function qt(i,t={mode:"open"}){const e=i.attachShadow(t),s={template:r,styles:n};return s;function r(o){const l=o.firstElementChild,a=l&&l.tagName==="TEMPLATE"?l:void 0;return a&&e.appendChild(a.content.cloneNode(!0)),s}function n(...o){e.adoptedStyleSheets=o}}let mr=(W=class extends HTMLElement{constructor(){super(),this._state={},qt(this).template(W.template).styles(W.styles),this.addEventListener("change",i=>{const t=i.target;if(t){const e=t.name,s=t.value;e&&(this._state[e]=s)}}),this.form&&this.form.addEventListener("submit",i=>{i.preventDefault(),Ot(i,"mu-form:submit",this._state)})}set init(i){this._state=i||{},gr(this._state,this)}get form(){var i;return(i=this.shadowRoot)==null?void 0:i.querySelector("form")}},W.template=I`
    <template>
      <form autocomplete="off">
        <slot></slot>
        <slot name="submit">
          <button type="submit">Submit</button>
        </slot>
      </form>
      <slot name="delete"></slot>
      <style></style>
    </template>
  `,W.styles=vs`
    form {
      display: grid;
      gap: var(--size-spacing-medium);
      grid-column: 1/-1;
      grid-template-columns:
        subgrid
        [start] [label] [input] [col2] [col3] [end];
    }
    ::slotted(label) {
      display: grid;
      grid-column: label / end;
      grid-template-columns: subgrid;
      gap: var(--size-spacing-medium);
    }
    ::slotted(fieldset) {
      display: contents;
    }
    button[type="submit"] {
      grid-column: input;
      justify-self: start;
    }
  `,W);function gr(i,t){const e=Object.entries(i);for(const[s,r]of e){const n=t.querySelector(`[name="${s}"]`);if(n){const o=n;switch(o.type){case"checkbox":const l=o;l.checked=!!r;break;case"date":o.value=r.toISOString().substr(0,10);break;default:o.value=r;break}}}return i}const vr=Object.freeze(Object.defineProperty({__proto__:null,Element:mr},Symbol.toStringTag,{value:"Module"})),ys=class _s extends pe{constructor(t){super((e,s)=>this.update(e,s),t,_s.EVENT_TYPE)}update(t,e){switch(t[0]){case"history/navigate":{const{href:s,state:r}=t[1];e(_r(s,r));break}case"history/redirect":{const{href:s,state:r}=t[1];e($r(s,r));break}}}};ys.EVENT_TYPE="history:message";let fe=ys;class Me extends de{constructor(){super({location:document.location,state:{}}),this.addEventListener("click",t=>{const e=yr(t);if(e){const s=new URL(e.href);s.origin===this.context.value.location.origin&&(console.log("Preventing Click Event on <A>",t),t.preventDefault(),me(e,"history/navigate",{href:s.pathname+s.search}))}}),window.addEventListener("popstate",t=>{console.log("Popstate",t.state),this.context.value={location:document.location,state:t.state}})}connectedCallback(){new fe(this.context).attach(this)}}function yr(i){const t=i.currentTarget,e=s=>s.tagName=="A"&&s.href;if(i.button===0)if(i.composed){const r=i.composedPath().find(e);return r||void 0}else{for(let s=i.target;s;s===t?null:s.parentElement)if(e(s))return s;return}}function _r(i,t={}){return history.pushState(t,"",i),()=>({location:document.location,state:history.state})}function $r(i,t={}){return history.replaceState(t,"",i),()=>({location:document.location,state:history.state})}const me=ds(fe.EVENT_TYPE),$s=Object.freeze(Object.defineProperty({__proto__:null,HistoryProvider:Me,Provider:Me,Service:fe,dispatch:me},Symbol.toStringTag,{value:"Module"}));class O{constructor(t,e){this._effects=[],this._target=t,this._contextLabel=e}observe(t=void 0){return new Promise((e,s)=>{if(this._provider){const r=new He(this._provider,t);this._effects.push(r),e(r)}else or(this._target,this._contextLabel).then(r=>{const n=new He(r,t);this._provider=r,this._effects.push(n),r.attach(o=>this._handleChange(o)),e(n)}).catch(r=>console.log(`Observer ${this._contextLabel}: ${r}`,r))})}_handleChange(t){console.log("Received change event for observers",t,this._effects),t.stopPropagation(),this._effects.forEach(e=>e.runEffect())}}class He{constructor(t,e){this._provider=t,e&&this.setEffect(e)}get context(){return this._provider.context}get value(){return this.context.value}setEffect(t){this._effectFn=t,this.runEffect()}runEffect(){this._effectFn&&this._effectFn(this.context.value)}}const ge=class bs extends HTMLElement{constructor(){super(),this._state={},this._user=new Z,this._authObserver=new O(this,"blazing:auth"),qt(this).template(bs.template),this.form&&this.form.addEventListener("submit",t=>{if(t.preventDefault(),this.src||this.action){if(console.log("Submitting form",this._state),this.action)this.action(this._state);else if(this.src){const e=this.isNew?"POST":"PUT",s=this.isNew?"created":"updated",r=this.isNew?this.src.replace(/[/][$]new$/,""):this.src;wr(r,this._state,e,this.authorization).then(n=>ot(n,this)).then(n=>{const o=`mu-rest-form:${s}`,l=new CustomEvent(o,{bubbles:!0,composed:!0,detail:{method:e,[s]:n,url:r}});this.dispatchEvent(l)}).catch(n=>{const o="mu-rest-form:error",l=new CustomEvent(o,{bubbles:!0,composed:!0,detail:{method:e,error:n,url:r,request:this._state}});this.dispatchEvent(l)})}}}),this.addEventListener("change",t=>{const e=t.target;if(e){const s=e.name,r=e.value;s&&(this._state[s]=r)}})}get src(){return this.getAttribute("src")}get isNew(){return this.hasAttribute("new")}set init(t){this._state=t||{},ot(this._state,this)}get form(){var t;return(t=this.shadowRoot)==null?void 0:t.querySelector("form")}get authorization(){var t;return(t=this._user)!=null&&t.authenticated?{Authorization:`Bearer ${this._user.token}`}:{}}connectedCallback(){this._authObserver.observe(({user:t})=>{t&&(this._user=t,this.src&&!this.isNew&&ae(this.src,this.authorization).then(e=>{this._state=e,ot(e,this)}))})}attributeChangedCallback(t,e,s){switch(t){case"src":this.src&&s&&s!==e&&!this.isNew&&ae(this.src,this.authorization).then(r=>{this._state=r,ot(r,this)});break;case"new":s&&(this._state={},ot({},this));break}}};ge.observedAttributes=["src","new","action"];ge.template=I`
    <template>
      <form autocomplete="off">
        <slot></slot>
        <slot name="submit">
          <button type="submit">Submit</button>
        </slot>
      </form>
      <slot name="delete"></slot>
      <style>
        form {
          display: grid;
          gap: var(--size-spacing-medium);
          grid-template-columns: [start] 1fr [label] 1fr [input] 3fr 1fr [end];
        }
        ::slotted(label) {
          display: grid;
          grid-column: label / end;
          grid-template-columns: subgrid;
          gap: var(--size-spacing-medium);
        }
        button[type="submit"] {
          grid-column: input;
          justify-self: start;
        }
      </style>
    </template>
  `;let br=ge;function ae(i,t){return fetch(i,{headers:t}).then(e=>{if(e.status!==200)throw`Status: ${e.status}`;return e.json()}).catch(e=>console.log(`Failed to load form from ${i}:`,e))}function ot(i,t){const e=Object.entries(i);for(const[s,r]of e){const n=t.querySelector(`[name="${s}"]`);if(n){const o=n;switch(o.type){case"checkbox":const l=o;l.checked=!!r;break;default:o.value=r;break}}}return i}function wr(i,t,e="PUT",s={}){return fetch(i,{method:e,headers:{"Content-Type":"application/json",...s},body:JSON.stringify(t)}).then(r=>{if(r.status!=200&&r.status!=201)throw`Form submission failed: Status ${r.status}`;return r.json()})}const ws=Object.freeze(Object.defineProperty({__proto__:null,FormElement:br,fetchData:ae},Symbol.toStringTag,{value:"Module"})),As=class Es extends pe{constructor(t,e){super(e,t,Es.EVENT_TYPE,!1)}};As.EVENT_TYPE="mu:message";let Ss=As;class Ar extends de{constructor(t,e,s){super(e),this._user=new Z,this._updateFn=t,this._authObserver=new O(this,s)}connectedCallback(){const t=new Ss(this.context,(e,s)=>this._updateFn(e,s,this._user));t.attach(this),this._authObserver.observe(({user:e})=>{console.log("Store got auth",e),e&&(this._user=e),t.start()})}}const Er=Object.freeze(Object.defineProperty({__proto__:null,Provider:Ar,Service:Ss},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const kt=globalThis,ve=kt.ShadowRoot&&(kt.ShadyCSS===void 0||kt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ye=Symbol(),ze=new WeakMap;let xs=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==ye)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(ve&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=ze.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&ze.set(e,t))}return t}toString(){return this.cssText}};const Sr=i=>new xs(typeof i=="string"?i:i+"",void 0,ye),xr=(i,...t)=>{const e=i.length===1?i[0]:t.reduce((s,r,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[n+1],i[0]);return new xs(e,i,ye)},Pr=(i,t)=>{if(ve)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),r=kt.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}},Ie=ve?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return Sr(e)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:kr,defineProperty:Cr,getOwnPropertyDescriptor:Or,getOwnPropertyNames:Tr,getOwnPropertySymbols:jr,getPrototypeOf:Rr}=Object,X=globalThis,De=X.trustedTypes,Ur=De?De.emptyScript:"",Fe=X.reactiveElementPolyfillSupport,ut=(i,t)=>i,Tt={toAttribute(i,t){switch(t){case Boolean:i=i?Ur:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},_e=(i,t)=>!kr(i,t),qe={attribute:!0,type:String,converter:Tt,reflect:!1,hasChanged:_e};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),X.litPropertyMetadata??(X.litPropertyMetadata=new WeakMap);let K=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=qe){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),r=this.getPropertyDescriptor(t,s,e);r!==void 0&&Cr(this.prototype,t,r)}}static getPropertyDescriptor(t,e,s){const{get:r,set:n}=Or(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return r==null?void 0:r.call(this)},set(o){const l=r==null?void 0:r.call(this);n.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??qe}static _$Ei(){if(this.hasOwnProperty(ut("elementProperties")))return;const t=Rr(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(ut("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ut("properties"))){const e=this.properties,s=[...Tr(e),...jr(e)];for(const r of s)this.createProperty(r,e[r])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,r]of e)this.elementProperties.set(s,r)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const r=this._$Eu(e,s);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const r of s)e.unshift(Ie(r))}else t!==void 0&&e.push(Ie(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Pr(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EC(t,e){var s;const r=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,r);if(n!==void 0&&r.reflect===!0){const o=(((s=r.converter)==null?void 0:s.toAttribute)!==void 0?r.converter:Tt).toAttribute(e,r.type);this._$Em=t,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,e){var s;const r=this.constructor,n=r._$Eh.get(t);if(n!==void 0&&this._$Em!==n){const o=r.getPropertyOptions(n),l=typeof o.converter=="function"?{fromAttribute:o.converter}:((s=o.converter)==null?void 0:s.fromAttribute)!==void 0?o.converter:Tt;this._$Em=n,this[n]=l.fromAttribute(e,o.type),this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){if(s??(s=this.constructor.getPropertyOptions(t)),!(s.hasChanged??_e)(this[t],e))return;this.P(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[n,o]of r)o.wrapped!==!0||this._$AL.has(n)||this[n]===void 0||this.P(n,this[n],o)}let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$EO)==null||t.forEach(r=>{var n;return(n=r.hostUpdate)==null?void 0:n.call(r)}),this.update(s)):this._$EU()}catch(r){throw e=!1,this._$EU(),r}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var r;return(r=s.hostUpdated)==null?void 0:r.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}};K.elementStyles=[],K.shadowRootOptions={mode:"open"},K[ut("elementProperties")]=new Map,K[ut("finalized")]=new Map,Fe==null||Fe({ReactiveElement:K}),(X.reactiveElementVersions??(X.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const jt=globalThis,Rt=jt.trustedTypes,Be=Rt?Rt.createPolicy("lit-html",{createHTML:i=>i}):void 0,Ps="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,ks="?"+P,Nr=`<${ks}>`,F=document,ft=()=>F.createComment(""),mt=i=>i===null||typeof i!="object"&&typeof i!="function",$e=Array.isArray,Lr=i=>$e(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",Xt=`[ 	
\f\r]`,at=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ve=/-->/g,We=/>/g,L=RegExp(`>|${Xt}(?:([^\\s"'>=/]+)(${Xt}*=${Xt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ye=/'/g,Ke=/"/g,Cs=/^(?:script|style|textarea|title)$/i,Mr=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),lt=Mr(1),tt=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),Ge=new WeakMap,H=F.createTreeWalker(F,129);function Os(i,t){if(!$e(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return Be!==void 0?Be.createHTML(t):t}const Hr=(i,t)=>{const e=i.length-1,s=[];let r,n=t===2?"<svg>":t===3?"<math>":"",o=at;for(let l=0;l<e;l++){const a=i[l];let d,f,u=-1,c=0;for(;c<a.length&&(o.lastIndex=c,f=o.exec(a),f!==null);)c=o.lastIndex,o===at?f[1]==="!--"?o=Ve:f[1]!==void 0?o=We:f[2]!==void 0?(Cs.test(f[2])&&(r=RegExp("</"+f[2],"g")),o=L):f[3]!==void 0&&(o=L):o===L?f[0]===">"?(o=r??at,u=-1):f[1]===void 0?u=-2:(u=o.lastIndex-f[2].length,d=f[1],o=f[3]===void 0?L:f[3]==='"'?Ke:Ye):o===Ke||o===Ye?o=L:o===Ve||o===We?o=at:(o=L,r=void 0);const h=o===L&&i[l+1].startsWith("/>")?" ":"";n+=o===at?a+Nr:u>=0?(s.push(d),a.slice(0,u)+Ps+a.slice(u)+P+h):a+P+(u===-2?l:h)}return[Os(i,n+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};let le=class Ts{constructor({strings:t,_$litType$:e},s){let r;this.parts=[];let n=0,o=0;const l=t.length-1,a=this.parts,[d,f]=Hr(t,e);if(this.el=Ts.createElement(d,s),H.currentNode=this.el.content,e===2||e===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(r=H.nextNode())!==null&&a.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(const u of r.getAttributeNames())if(u.endsWith(Ps)){const c=f[o++],h=r.getAttribute(u).split(P),p=/([.?@])?(.*)/.exec(c);a.push({type:1,index:n,name:p[2],strings:h,ctor:p[1]==="."?Ir:p[1]==="?"?Dr:p[1]==="@"?Fr:Bt}),r.removeAttribute(u)}else u.startsWith(P)&&(a.push({type:6,index:n}),r.removeAttribute(u));if(Cs.test(r.tagName)){const u=r.textContent.split(P),c=u.length-1;if(c>0){r.textContent=Rt?Rt.emptyScript:"";for(let h=0;h<c;h++)r.append(u[h],ft()),H.nextNode(),a.push({type:2,index:++n});r.append(u[c],ft())}}}else if(r.nodeType===8)if(r.data===ks)a.push({type:2,index:n});else{let u=-1;for(;(u=r.data.indexOf(P,u+1))!==-1;)a.push({type:7,index:n}),u+=P.length-1}n++}}static createElement(t,e){const s=F.createElement("template");return s.innerHTML=t,s}};function et(i,t,e=i,s){var r,n;if(t===tt)return t;let o=s!==void 0?(r=e.o)==null?void 0:r[s]:e.l;const l=mt(t)?void 0:t._$litDirective$;return(o==null?void 0:o.constructor)!==l&&((n=o==null?void 0:o._$AO)==null||n.call(o,!1),l===void 0?o=void 0:(o=new l(i),o._$AT(i,e,s)),s!==void 0?(e.o??(e.o=[]))[s]=o:e.l=o),o!==void 0&&(t=et(i,o._$AS(i,t.values),o,s)),t}class zr{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,r=((t==null?void 0:t.creationScope)??F).importNode(e,!0);H.currentNode=r;let n=H.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let d;a.type===2?d=new bt(n,n.nextSibling,this,t):a.type===1?d=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(d=new qr(n,this,t)),this._$AV.push(d),a=s[++l]}o!==(a==null?void 0:a.index)&&(n=H.nextNode(),o++)}return H.currentNode=F,r}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class bt{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this.v}constructor(t,e,s,r){this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=r,this.v=(r==null?void 0:r.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=et(this,t,e),mt(t)?t===$||t==null||t===""?(this._$AH!==$&&this._$AR(),this._$AH=$):t!==this._$AH&&t!==tt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Lr(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==$&&mt(this._$AH)?this._$AA.nextSibling.data=t:this.T(F.createTextNode(t)),this._$AH=t}$(t){var e;const{values:s,_$litType$:r}=t,n=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=le.createElement(Os(r.h,r.h[0]),this.options)),r);if(((e=this._$AH)==null?void 0:e._$AD)===n)this._$AH.p(s);else{const o=new zr(n,this),l=o.u(this.options);o.p(s),this.T(l),this._$AH=o}}_$AC(t){let e=Ge.get(t.strings);return e===void 0&&Ge.set(t.strings,e=new le(t)),e}k(t){$e(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,r=0;for(const n of t)r===e.length?e.push(s=new bt(this.O(ft()),this.O(ft()),this,this.options)):s=e[r],s._$AI(n),r++;r<e.length&&(this._$AR(s&&s._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const r=t.nextSibling;t.remove(),t=r}}setConnected(t){var e;this._$AM===void 0&&(this.v=t,(e=this._$AP)==null||e.call(this,t))}}class Bt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,r,n){this.type=1,this._$AH=$,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=$}_$AI(t,e=this,s,r){const n=this.strings;let o=!1;if(n===void 0)t=et(this,t,e,0),o=!mt(t)||t!==this._$AH&&t!==tt,o&&(this._$AH=t);else{const l=t;let a,d;for(t=n[0],a=0;a<n.length-1;a++)d=et(this,l[s+a],e,a),d===tt&&(d=this._$AH[a]),o||(o=!mt(d)||d!==this._$AH[a]),d===$?t=$:t!==$&&(t+=(d??"")+n[a+1]),this._$AH[a]=d}o&&!r&&this.j(t)}j(t){t===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Ir extends Bt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===$?void 0:t}}class Dr extends Bt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==$)}}class Fr extends Bt{constructor(t,e,s,r,n){super(t,e,s,r,n),this.type=5}_$AI(t,e=this){if((t=et(this,t,e,0)??$)===tt)return;const s=this._$AH,r=t===$&&s!==$||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==$&&(s===$||r);r&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class qr{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){et(this,t)}}const Je=jt.litHtmlPolyfillSupport;Je==null||Je(le,bt),(jt.litHtmlVersions??(jt.litHtmlVersions=[])).push("3.2.0");const Br=(i,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let r=s._$litPart$;if(r===void 0){const n=(e==null?void 0:e.renderBefore)??null;s._$litPart$=r=new bt(t.insertBefore(ft(),n),n,void 0,e??{})}return r._$AI(i),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let J=class extends K{constructor(){super(...arguments),this.renderOptions={host:this},this.o=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.o=Br(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this.o)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.o)==null||t.setConnected(!1)}render(){return tt}};J._$litElement$=!0,J.finalized=!0,(Ne=globalThis.litElementHydrateSupport)==null||Ne.call(globalThis,{LitElement:J});const Ze=globalThis.litElementPolyfillSupport;Ze==null||Ze({LitElement:J});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Vr={attribute:!0,type:String,converter:Tt,reflect:!1,hasChanged:_e},Wr=(i=Vr,t,e)=>{const{kind:s,metadata:r}=e;let n=globalThis.litPropertyMetadata.get(r);if(n===void 0&&globalThis.litPropertyMetadata.set(r,n=new Map),n.set(e.name,i),s==="accessor"){const{name:o}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,i)},init(l){return l!==void 0&&this.P(o,void 0,i),l}}}if(s==="setter"){const{name:o}=e;return function(l){const a=this[o];t.call(this,l),this.requestUpdate(o,a,i)}}throw Error("Unsupported decorator location: "+s)};function js(i){return(t,e)=>typeof e=="object"?Wr(i,t,e):((s,r,n)=>{const o=r.hasOwnProperty(n);return r.constructor.createProperty(n,o?{...s,wrapped:!0}:s),o?Object.getOwnPropertyDescriptor(r,n):void 0})(i,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Rs(i){return js({...i,state:!0,attribute:!1})}function Yr(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}function Kr(i){throw new Error('Could not dynamically require "'+i+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Us={};(function(i){var t=function(){var e=function(u,c,h,p){for(h=h||{},p=u.length;p--;h[u[p]]=c);return h},s=[1,9],r=[1,10],n=[1,11],o=[1,12],l=[5,11,12,13,14,15],a={trace:function(){},yy:{},symbols_:{error:2,root:3,expressions:4,EOF:5,expression:6,optional:7,literal:8,splat:9,param:10,"(":11,")":12,LITERAL:13,SPLAT:14,PARAM:15,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",11:"(",12:")",13:"LITERAL",14:"SPLAT",15:"PARAM"},productions_:[0,[3,2],[3,1],[4,2],[4,1],[6,1],[6,1],[6,1],[6,1],[7,3],[8,1],[9,1],[10,1]],performAction:function(c,h,p,g,m,v,Yt){var A=v.length-1;switch(m){case 1:return new g.Root({},[v[A-1]]);case 2:return new g.Root({},[new g.Literal({value:""})]);case 3:this.$=new g.Concat({},[v[A-1],v[A]]);break;case 4:case 5:this.$=v[A];break;case 6:this.$=new g.Literal({value:v[A]});break;case 7:this.$=new g.Splat({name:v[A]});break;case 8:this.$=new g.Param({name:v[A]});break;case 9:this.$=new g.Optional({},[v[A-1]]);break;case 10:this.$=c;break;case 11:case 12:this.$=c.slice(1);break}},table:[{3:1,4:2,5:[1,3],6:4,7:5,8:6,9:7,10:8,11:s,13:r,14:n,15:o},{1:[3]},{5:[1,13],6:14,7:5,8:6,9:7,10:8,11:s,13:r,14:n,15:o},{1:[2,2]},e(l,[2,4]),e(l,[2,5]),e(l,[2,6]),e(l,[2,7]),e(l,[2,8]),{4:15,6:4,7:5,8:6,9:7,10:8,11:s,13:r,14:n,15:o},e(l,[2,10]),e(l,[2,11]),e(l,[2,12]),{1:[2,1]},e(l,[2,3]),{6:14,7:5,8:6,9:7,10:8,11:s,12:[1,16],13:r,14:n,15:o},e(l,[2,9])],defaultActions:{3:[2,2],13:[2,1]},parseError:function(c,h){if(h.recoverable)this.trace(c);else{let p=function(g,m){this.message=g,this.hash=m};throw p.prototype=Error,new p(c,h)}},parse:function(c){var h=this,p=[0],g=[null],m=[],v=this.table,Yt="",A=0,je=0,Zs=2,Re=1,Qs=m.slice.call(arguments,1),_=Object.create(this.lexer),U={yy:{}};for(var Kt in this.yy)Object.prototype.hasOwnProperty.call(this.yy,Kt)&&(U.yy[Kt]=this.yy[Kt]);_.setInput(c,U.yy),U.yy.lexer=_,U.yy.parser=this,typeof _.yylloc>"u"&&(_.yylloc={});var Gt=_.yylloc;m.push(Gt);var Xs=_.options&&_.options.ranges;typeof U.yy.parseError=="function"?this.parseError=U.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;for(var tr=function(){var V;return V=_.lex()||Re,typeof V!="number"&&(V=h.symbols_[V]||V),V},w,N,E,Jt,B={},xt,x,Ue,Pt;;){if(N=p[p.length-1],this.defaultActions[N]?E=this.defaultActions[N]:((w===null||typeof w>"u")&&(w=tr()),E=v[N]&&v[N][w]),typeof E>"u"||!E.length||!E[0]){var Zt="";Pt=[];for(xt in v[N])this.terminals_[xt]&&xt>Zs&&Pt.push("'"+this.terminals_[xt]+"'");_.showPosition?Zt="Parse error on line "+(A+1)+`:
`+_.showPosition()+`
Expecting `+Pt.join(", ")+", got '"+(this.terminals_[w]||w)+"'":Zt="Parse error on line "+(A+1)+": Unexpected "+(w==Re?"end of input":"'"+(this.terminals_[w]||w)+"'"),this.parseError(Zt,{text:_.match,token:this.terminals_[w]||w,line:_.yylineno,loc:Gt,expected:Pt})}if(E[0]instanceof Array&&E.length>1)throw new Error("Parse Error: multiple actions possible at state: "+N+", token: "+w);switch(E[0]){case 1:p.push(w),g.push(_.yytext),m.push(_.yylloc),p.push(E[1]),w=null,je=_.yyleng,Yt=_.yytext,A=_.yylineno,Gt=_.yylloc;break;case 2:if(x=this.productions_[E[1]][1],B.$=g[g.length-x],B._$={first_line:m[m.length-(x||1)].first_line,last_line:m[m.length-1].last_line,first_column:m[m.length-(x||1)].first_column,last_column:m[m.length-1].last_column},Xs&&(B._$.range=[m[m.length-(x||1)].range[0],m[m.length-1].range[1]]),Jt=this.performAction.apply(B,[Yt,je,A,U.yy,E[1],g,m].concat(Qs)),typeof Jt<"u")return Jt;x&&(p=p.slice(0,-1*x*2),g=g.slice(0,-1*x),m=m.slice(0,-1*x)),p.push(this.productions_[E[1]][0]),g.push(B.$),m.push(B._$),Ue=v[p[p.length-2]][p[p.length-1]],p.push(Ue);break;case 3:return!0}}return!0}},d=function(){var u={EOF:1,parseError:function(h,p){if(this.yy.parser)this.yy.parser.parseError(h,p);else throw new Error(h)},setInput:function(c,h){return this.yy=h||this.yy||{},this._input=c,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var c=this._input[0];this.yytext+=c,this.yyleng++,this.offset++,this.match+=c,this.matched+=c;var h=c.match(/(?:\r\n?|\n).*/g);return h?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),c},unput:function(c){var h=c.length,p=c.split(/(?:\r\n?|\n)/g);this._input=c+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-h),this.offset-=h;var g=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),p.length-1&&(this.yylineno-=p.length-1);var m=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:p?(p.length===g.length?this.yylloc.first_column:0)+g[g.length-p.length].length-p[0].length:this.yylloc.first_column-h},this.options.ranges&&(this.yylloc.range=[m[0],m[0]+this.yyleng-h]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(c){this.unput(this.match.slice(c))},pastInput:function(){var c=this.matched.substr(0,this.matched.length-this.match.length);return(c.length>20?"...":"")+c.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var c=this.match;return c.length<20&&(c+=this._input.substr(0,20-c.length)),(c.substr(0,20)+(c.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var c=this.pastInput(),h=new Array(c.length+1).join("-");return c+this.upcomingInput()+`
`+h+"^"},test_match:function(c,h){var p,g,m;if(this.options.backtrack_lexer&&(m={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(m.yylloc.range=this.yylloc.range.slice(0))),g=c[0].match(/(?:\r\n?|\n).*/g),g&&(this.yylineno+=g.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:g?g[g.length-1].length-g[g.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+c[0].length},this.yytext+=c[0],this.match+=c[0],this.matches=c,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(c[0].length),this.matched+=c[0],p=this.performAction.call(this,this.yy,this,h,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),p)return p;if(this._backtrack){for(var v in m)this[v]=m[v];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var c,h,p,g;this._more||(this.yytext="",this.match="");for(var m=this._currentRules(),v=0;v<m.length;v++)if(p=this._input.match(this.rules[m[v]]),p&&(!h||p[0].length>h[0].length)){if(h=p,g=v,this.options.backtrack_lexer){if(c=this.test_match(p,m[v]),c!==!1)return c;if(this._backtrack){h=!1;continue}else return!1}else if(!this.options.flex)break}return h?(c=this.test_match(h,m[g]),c!==!1?c:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var h=this.next();return h||this.lex()},begin:function(h){this.conditionStack.push(h)},popState:function(){var h=this.conditionStack.length-1;return h>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(h){return h=this.conditionStack.length-1-Math.abs(h||0),h>=0?this.conditionStack[h]:"INITIAL"},pushState:function(h){this.begin(h)},stateStackSize:function(){return this.conditionStack.length},options:{},performAction:function(h,p,g,m){switch(g){case 0:return"(";case 1:return")";case 2:return"SPLAT";case 3:return"PARAM";case 4:return"LITERAL";case 5:return"LITERAL";case 6:return"EOF"}},rules:[/^(?:\()/,/^(?:\))/,/^(?:\*+\w+)/,/^(?::+\w+)/,/^(?:[\w%\-~\n]+)/,/^(?:.)/,/^(?:$)/],conditions:{INITIAL:{rules:[0,1,2,3,4,5,6],inclusive:!0}}};return u}();a.lexer=d;function f(){this.yy={}}return f.prototype=a,a.Parser=f,new f}();typeof Kr<"u"&&(i.parser=t,i.Parser=t.Parser,i.parse=function(){return t.parse.apply(t,arguments)})})(Us);function Y(i){return function(t,e){return{displayName:i,props:t,children:e||[]}}}var Ns={Root:Y("Root"),Concat:Y("Concat"),Literal:Y("Literal"),Splat:Y("Splat"),Param:Y("Param"),Optional:Y("Optional")},Ls=Us.parser;Ls.yy=Ns;var Gr=Ls,Jr=Object.keys(Ns);function Zr(i){return Jr.forEach(function(t){if(typeof i[t]>"u")throw new Error("No handler defined for "+t.displayName)}),{visit:function(t,e){return this.handlers[t.displayName].call(this,t,e)},handlers:i}}var Ms=Zr,Qr=Ms,Xr=/[\-{}\[\]+?.,\\\^$|#\s]/g;function Hs(i){this.captures=i.captures,this.re=i.re}Hs.prototype.match=function(i){var t=this.re.exec(i),e={};if(t)return this.captures.forEach(function(s,r){typeof t[r+1]>"u"?e[s]=void 0:e[s]=decodeURIComponent(t[r+1])}),e};var ti=Qr({Concat:function(i){return i.children.reduce((function(t,e){var s=this.visit(e);return{re:t.re+s.re,captures:t.captures.concat(s.captures)}}).bind(this),{re:"",captures:[]})},Literal:function(i){return{re:i.props.value.replace(Xr,"\\$&"),captures:[]}},Splat:function(i){return{re:"([^?]*?)",captures:[i.props.name]}},Param:function(i){return{re:"([^\\/\\?]+)",captures:[i.props.name]}},Optional:function(i){var t=this.visit(i.children[0]);return{re:"(?:"+t.re+")?",captures:t.captures}},Root:function(i){var t=this.visit(i.children[0]);return new Hs({re:new RegExp("^"+t.re+"(?=\\?|$)"),captures:t.captures})}}),ei=ti,si=Ms,ri=si({Concat:function(i,t){var e=i.children.map((function(s){return this.visit(s,t)}).bind(this));return e.some(function(s){return s===!1})?!1:e.join("")},Literal:function(i){return decodeURI(i.props.value)},Splat:function(i,t){return t[i.props.name]?t[i.props.name]:!1},Param:function(i,t){return t[i.props.name]?t[i.props.name]:!1},Optional:function(i,t){var e=this.visit(i.children[0],t);return e||""},Root:function(i,t){t=t||{};var e=this.visit(i.children[0],t);return e?encodeURI(e):!1}}),ii=ri,ni=Gr,oi=ei,ai=ii;wt.prototype=Object.create(null);wt.prototype.match=function(i){var t=oi.visit(this.ast),e=t.match(i);return e||!1};wt.prototype.reverse=function(i){return ai.visit(this.ast,i)};function wt(i){var t;if(this?t=this:t=Object.create(wt.prototype),typeof i>"u")throw new Error("A route spec is required");return t.spec=i,t.ast=ni.parse(i),t}var li=wt,ci=li,hi=ci;const ui=Yr(hi);var di=Object.defineProperty,zs=(i,t,e,s)=>{for(var r=void 0,n=i.length-1,o;n>=0;n--)(o=i[n])&&(r=o(t,e,r)||r);return r&&di(t,e,r),r};const Is=class extends J{constructor(t,e,s=""){super(),this._cases=[],this._fallback=()=>lt` <h1>Not Found</h1> `,this._cases=t.map(r=>({...r,route:new ui(r.path)})),this._historyObserver=new O(this,e),this._authObserver=new O(this,s)}connectedCallback(){this._historyObserver.observe(({location:t})=>{console.log("New location",t),t&&(this._match=this.matchRoute(t))}),this._authObserver.observe(({user:t})=>{this._user=t}),super.connectedCallback()}render(){return console.log("Rendering for match",this._match,this._user),lt` <main>${(()=>{const e=this._match;if(e){if("view"in e)return this._user?e.auth&&e.auth!=="public"&&this._user&&!this._user.authenticated?(gs(this,"auth/redirect"),lt` <h1>Redirecting for Login</h1> `):(console.log("Loading view, ",e.params,e.query),e.view(e.params||{},e.query)):lt` <h1>Authenticating</h1> `;if("redirect"in e){const s=e.redirect;if(typeof s=="string")return this.redirect(s),lt` <h1>Redirecting to ${s}…</h1> `}}return this._fallback({})})()}</main> `}updated(t){t.has("_match")&&this.requestUpdate()}matchRoute(t){const{search:e,pathname:s}=t,r=new URLSearchParams(e),n=s+e;for(const o of this._cases){const l=o.route.match(n);if(l)return{...o,path:s,params:l,query:r}}}redirect(t){me(this,"history/redirect",{href:t})}};Is.styles=xr`
    :host,
    main {
      display: contents;
    }
  `;let Ut=Is;zs([Rs()],Ut.prototype,"_user");zs([Rs()],Ut.prototype,"_match");const pi=Object.freeze(Object.defineProperty({__proto__:null,Element:Ut,Switch:Ut},Symbol.toStringTag,{value:"Module"})),Ds=class Fs extends HTMLElement{constructor(){if(super(),qt(this).template(Fs.template),this.shadowRoot){const t=this.shadowRoot.querySelector("slot[name='actuator']");t&&t.addEventListener("click",()=>this.toggle())}}toggle(){this.hasAttribute("open")?this.removeAttribute("open"):this.setAttribute("open","open")}};Ds.template=I`
    <template>
      <slot name="actuator"><button>Menu</button></slot>
      <div id="panel">
        <slot></slot>
      </div>

      <style>
        :host {
          position: relative;
        }
        #is-shown {
          display: none;
        }
        #panel {
          display: none;

          position: absolute;
          right: 0;
          margin-top: var(--size-spacing-small);
          width: max-content;
          padding: var(--size-spacing-small);
          border-radius: var(--size-radius-small);
          background: var(--color-background-card);
          color: var(--color-text);
          box-shadow: var(--shadow-popover);
        }
        :host([open]) #panel {
          display: block;
        }
      </style>
    </template>
  `;let fi=Ds;const mi=Object.freeze(Object.defineProperty({__proto__:null,Element:fi},Symbol.toStringTag,{value:"Module"})),be=class ce extends HTMLElement{constructor(){super(),this._array=[],qt(this).template(ce.template).styles(ce.styles),this.addEventListener("input-array:add",t=>{t.stopPropagation(),this.append(qs("",this._array.length))}),this.addEventListener("input-array:remove",t=>{t.stopPropagation(),this.removeClosestItem(t.target)}),this.addEventListener("change",t=>{t.stopPropagation();const e=t.target;if(e&&e!==this){const s=new Event("change",{bubbles:!0}),r=e.value,n=e.closest("label");if(n){const o=Array.from(this.children).indexOf(n);this._array[o]=r,this.dispatchEvent(s)}}}),this.addEventListener("click",t=>{oe(t,"button.add")?Ot(t,"input-array:add"):oe(t,"button.remove")&&Ot(t,"input-array:remove")})}get name(){return this.getAttribute("name")}get value(){return this._array}set value(t){this._array=Array.isArray(t)?t:[t],vi(this._array,this)}removeClosestItem(t){const e=t.closest("label");if(console.log("Removing closest item:",e,t),e){const s=Array.from(this.children).indexOf(e);this._array.splice(s,1),e.remove()}}};be.template=I`
    <template>
      <ul>
        <slot></slot>
      </ul>
      <button class="add">
        <slot name="label-add">Add one</slot>
        <style></style>
      </button>
    </template>
  `;be.styles=vs`
    :host {
      display: grid;
      grid-template-columns: subgrid;
      grid-column: input / end;
    }
    ul {
      display: contents;
    }
    button.add {
      grid-column: input / input-end;
    }
    ::slotted(label) {
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns: subgrid;
    }
  `;let gi=be;function vi(i,t){t.replaceChildren(),i.forEach((e,s)=>t.append(qs(e)))}function qs(i,t){const e=i===void 0?I`<input />`:I`<input value="${i}" />`;return I`
    <label>
      ${e}
      <button class="remove" type="button">Remove</button>
    </label>
  `}const yi=Object.freeze(Object.defineProperty({__proto__:null,Element:gi},Symbol.toStringTag,{value:"Module"}));function T(i){return Object.entries(i).map(([t,e])=>{customElements.get(t)||customElements.define(t,e)}),customElements}var _i=Object.defineProperty,$i=Object.getOwnPropertyDescriptor,bi=(i,t,e,s)=>{for(var r=$i(t,e),n=i.length-1,o;n>=0;n--)(o=i[n])&&(r=o(t,e,r)||r);return r&&_i(t,e,r),r};class At extends J{constructor(t){super(),this._pending=[],this._observer=new O(this,t)}get model(){return this._lastModel=this._context?this._context.value:{},this._lastModel}connectedCallback(){var t;super.connectedCallback(),(t=this._observer)==null||t.observe().then(e=>{console.log("View effect (initial)",this,e),this._context=e.context,this._pending.length&&this._pending.forEach(([s,r])=>{console.log("Dispatching queued event",r,s),s.dispatchEvent(r)}),e.setEffect(()=>{var s;if(console.log("View effect",this,e,(s=this._context)==null?void 0:s.value),this._context)console.log("requesting update"),this.requestUpdate();else throw"View context not ready for effect"})})}dispatchMessage(t,e=this){const s=new CustomEvent("mu:message",{bubbles:!0,composed:!0,detail:t});this._context?(console.log("Dispatching message event",s),e.dispatchEvent(s)):(console.log("Queueing message event",s),this._pending.push([e,s]))}ref(t){return this.model?this.model[t]:void 0}}bi([js()],At.prototype,"model");/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ct=globalThis,we=Ct.ShadowRoot&&(Ct.ShadyCSS===void 0||Ct.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ae=Symbol(),Qe=new WeakMap;let Bs=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Ae)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(we&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=Qe.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Qe.set(e,t))}return t}toString(){return this.cssText}};const wi=i=>new Bs(typeof i=="string"?i:i+"",void 0,Ae),j=(i,...t)=>{const e=i.length===1?i[0]:t.reduce((s,r,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[n+1],i[0]);return new Bs(e,i,Ae)},Ai=(i,t)=>{if(we)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),r=Ct.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}},Xe=we?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return wi(e)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ei,defineProperty:Si,getOwnPropertyDescriptor:xi,getOwnPropertyNames:Pi,getOwnPropertySymbols:ki,getPrototypeOf:Ci}=Object,C=globalThis,ts=C.trustedTypes,Oi=ts?ts.emptyScript:"",te=C.reactiveElementPolyfillSupport,dt=(i,t)=>i,Nt={toAttribute(i,t){switch(t){case Boolean:i=i?Oi:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},Ee=(i,t)=>!Ei(i,t),es={attribute:!0,type:String,converter:Nt,reflect:!1,hasChanged:Ee};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),C.litPropertyMetadata??(C.litPropertyMetadata=new WeakMap);class G extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=es){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),r=this.getPropertyDescriptor(t,s,e);r!==void 0&&Si(this.prototype,t,r)}}static getPropertyDescriptor(t,e,s){const{get:r,set:n}=xi(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return r==null?void 0:r.call(this)},set(o){const l=r==null?void 0:r.call(this);n.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??es}static _$Ei(){if(this.hasOwnProperty(dt("elementProperties")))return;const t=Ci(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(dt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(dt("properties"))){const e=this.properties,s=[...Pi(e),...ki(e)];for(const r of s)this.createProperty(r,e[r])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,r]of e)this.elementProperties.set(s,r)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const r=this._$Eu(e,s);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const r of s)e.unshift(Xe(r))}else t!==void 0&&e.push(Xe(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ai(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EC(t,e){var n;const s=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,s);if(r!==void 0&&s.reflect===!0){const o=(((n=s.converter)==null?void 0:n.toAttribute)!==void 0?s.converter:Nt).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(t,e){var n;const s=this.constructor,r=s._$Eh.get(t);if(r!==void 0&&this._$Em!==r){const o=s.getPropertyOptions(r),l=typeof o.converter=="function"?{fromAttribute:o.converter}:((n=o.converter)==null?void 0:n.fromAttribute)!==void 0?o.converter:Nt;this._$Em=r,this[r]=l.fromAttribute(e,o.type),this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){if(s??(s=this.constructor.getPropertyOptions(t)),!(s.hasChanged??Ee)(this[t],e))return;this.P(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[n,o]of r)o.wrapped!==!0||this._$AL.has(n)||this[n]===void 0||this.P(n,this[n],o)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(r=>{var n;return(n=r.hostUpdate)==null?void 0:n.call(r)}),this.update(e)):this._$EU()}catch(r){throw t=!1,this._$EU(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var r;return(r=s.hostUpdated)==null?void 0:r.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}}G.elementStyles=[],G.shadowRootOptions={mode:"open"},G[dt("elementProperties")]=new Map,G[dt("finalized")]=new Map,te==null||te({ReactiveElement:G}),(C.reactiveElementVersions??(C.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pt=globalThis,Lt=pt.trustedTypes,ss=Lt?Lt.createPolicy("lit-html",{createHTML:i=>i}):void 0,Vs="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,Ws="?"+k,Ti=`<${Ws}>`,q=document,gt=()=>q.createComment(""),vt=i=>i===null||typeof i!="object"&&typeof i!="function",Se=Array.isArray,ji=i=>Se(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",ee=`[ 	
\f\r]`,ct=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,rs=/-->/g,is=/>/g,M=RegExp(`>|${ee}(?:([^\\s"'>=/]+)(${ee}*=${ee}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ns=/'/g,os=/"/g,Ys=/^(?:script|style|textarea|title)$/i,Ri=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),y=Ri(1),st=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),as=new WeakMap,z=q.createTreeWalker(q,129);function Ks(i,t){if(!Se(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return ss!==void 0?ss.createHTML(t):t}const Ui=(i,t)=>{const e=i.length-1,s=[];let r,n=t===2?"<svg>":t===3?"<math>":"",o=ct;for(let l=0;l<e;l++){const a=i[l];let d,f,u=-1,c=0;for(;c<a.length&&(o.lastIndex=c,f=o.exec(a),f!==null);)c=o.lastIndex,o===ct?f[1]==="!--"?o=rs:f[1]!==void 0?o=is:f[2]!==void 0?(Ys.test(f[2])&&(r=RegExp("</"+f[2],"g")),o=M):f[3]!==void 0&&(o=M):o===M?f[0]===">"?(o=r??ct,u=-1):f[1]===void 0?u=-2:(u=o.lastIndex-f[2].length,d=f[1],o=f[3]===void 0?M:f[3]==='"'?os:ns):o===os||o===ns?o=M:o===rs||o===is?o=ct:(o=M,r=void 0);const h=o===M&&i[l+1].startsWith("/>")?" ":"";n+=o===ct?a+Ti:u>=0?(s.push(d),a.slice(0,u)+Vs+a.slice(u)+k+h):a+k+(u===-2?l:h)}return[Ks(i,n+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class yt{constructor({strings:t,_$litType$:e},s){let r;this.parts=[];let n=0,o=0;const l=t.length-1,a=this.parts,[d,f]=Ui(t,e);if(this.el=yt.createElement(d,s),z.currentNode=this.el.content,e===2||e===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(r=z.nextNode())!==null&&a.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(const u of r.getAttributeNames())if(u.endsWith(Vs)){const c=f[o++],h=r.getAttribute(u).split(k),p=/([.?@])?(.*)/.exec(c);a.push({type:1,index:n,name:p[2],strings:h,ctor:p[1]==="."?Li:p[1]==="?"?Mi:p[1]==="@"?Hi:Vt}),r.removeAttribute(u)}else u.startsWith(k)&&(a.push({type:6,index:n}),r.removeAttribute(u));if(Ys.test(r.tagName)){const u=r.textContent.split(k),c=u.length-1;if(c>0){r.textContent=Lt?Lt.emptyScript:"";for(let h=0;h<c;h++)r.append(u[h],gt()),z.nextNode(),a.push({type:2,index:++n});r.append(u[c],gt())}}}else if(r.nodeType===8)if(r.data===Ws)a.push({type:2,index:n});else{let u=-1;for(;(u=r.data.indexOf(k,u+1))!==-1;)a.push({type:7,index:n}),u+=k.length-1}n++}}static createElement(t,e){const s=q.createElement("template");return s.innerHTML=t,s}}function rt(i,t,e=i,s){var o,l;if(t===st)return t;let r=s!==void 0?(o=e._$Co)==null?void 0:o[s]:e._$Cl;const n=vt(t)?void 0:t._$litDirective$;return(r==null?void 0:r.constructor)!==n&&((l=r==null?void 0:r._$AO)==null||l.call(r,!1),n===void 0?r=void 0:(r=new n(i),r._$AT(i,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=r:e._$Cl=r),r!==void 0&&(t=rt(i,r._$AS(i,t.values),r,s)),t}class Ni{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,r=((t==null?void 0:t.creationScope)??q).importNode(e,!0);z.currentNode=r;let n=z.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let d;a.type===2?d=new Et(n,n.nextSibling,this,t):a.type===1?d=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(d=new zi(n,this,t)),this._$AV.push(d),a=s[++l]}o!==(a==null?void 0:a.index)&&(n=z.nextNode(),o++)}return z.currentNode=q,r}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Et{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,r){this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=rt(this,t,e),vt(t)?t===b||t==null||t===""?(this._$AH!==b&&this._$AR(),this._$AH=b):t!==this._$AH&&t!==st&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ji(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==b&&vt(this._$AH)?this._$AA.nextSibling.data=t:this.T(q.createTextNode(t)),this._$AH=t}$(t){var n;const{values:e,_$litType$:s}=t,r=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=yt.createElement(Ks(s.h,s.h[0]),this.options)),s);if(((n=this._$AH)==null?void 0:n._$AD)===r)this._$AH.p(e);else{const o=new Ni(r,this),l=o.u(this.options);o.p(e),this.T(l),this._$AH=o}}_$AC(t){let e=as.get(t.strings);return e===void 0&&as.set(t.strings,e=new yt(t)),e}k(t){Se(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,r=0;for(const n of t)r===e.length?e.push(s=new Et(this.O(gt()),this.O(gt()),this,this.options)):s=e[r],s._$AI(n),r++;r<e.length&&(this._$AR(s&&s._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const r=t.nextSibling;t.remove(),t=r}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class Vt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,r,n){this.type=1,this._$AH=b,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=b}_$AI(t,e=this,s,r){const n=this.strings;let o=!1;if(n===void 0)t=rt(this,t,e,0),o=!vt(t)||t!==this._$AH&&t!==st,o&&(this._$AH=t);else{const l=t;let a,d;for(t=n[0],a=0;a<n.length-1;a++)d=rt(this,l[s+a],e,a),d===st&&(d=this._$AH[a]),o||(o=!vt(d)||d!==this._$AH[a]),d===b?t=b:t!==b&&(t+=(d??"")+n[a+1]),this._$AH[a]=d}o&&!r&&this.j(t)}j(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Li extends Vt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===b?void 0:t}}class Mi extends Vt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==b)}}class Hi extends Vt{constructor(t,e,s,r,n){super(t,e,s,r,n),this.type=5}_$AI(t,e=this){if((t=rt(this,t,e,0)??b)===st)return;const s=this._$AH,r=t===b&&s!==b||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==b&&(s===b||r);r&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class zi{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){rt(this,t)}}const se=pt.litHtmlPolyfillSupport;se==null||se(yt,Et),(pt.litHtmlVersions??(pt.litHtmlVersions=[])).push("3.2.1");const Ii=(i,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let r=s._$litPart$;if(r===void 0){const n=(e==null?void 0:e.renderBefore)??null;s._$litPart$=r=new Et(t.insertBefore(gt(),n),n,void 0,e??{})}return r._$AI(i),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let S=class extends G{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ii(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return st}};var cs;S._$litElement$=!0,S.finalized=!0,(cs=globalThis.litElementHydrateSupport)==null||cs.call(globalThis,{LitElement:S});const re=globalThis.litElementPolyfillSupport;re==null||re({LitElement:S});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Di={attribute:!0,type:String,converter:Nt,reflect:!1,hasChanged:Ee},Fi=(i=Di,t,e)=>{const{kind:s,metadata:r}=e;let n=globalThis.litPropertyMetadata.get(r);if(n===void 0&&globalThis.litPropertyMetadata.set(r,n=new Map),n.set(e.name,i),s==="accessor"){const{name:o}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,i)},init(l){return l!==void 0&&this.P(o,void 0,i),l}}}if(s==="setter"){const{name:o}=e;return function(l){const a=this[o];t.call(this,l),this.requestUpdate(o,a,i)}}throw Error("Unsupported decorator location: "+s)};function R(i){return(t,e)=>typeof e=="object"?Fi(i,t,e):((s,r,n)=>{const o=r.hasOwnProperty(n);return r.constructor.createProperty(n,o?{...s,wrapped:!0}:s),o?Object.getOwnPropertyDescriptor(r,n):void 0})(i,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function xe(i){return R({...i,state:!0,attribute:!1})}const Wt=j`
    * {
        margin: 0;

        box-sizing: border-box;
        user-select: none;
        -webkit-user-select: none;
        text-decoration: none;
    }
    

    body {
        line-height: 1.5;
    }
    img {
        max-width: 100%;
    }

    li {
        list-style: none;
    }
    a
    {
        color: var(--color-text-default);
        font-weight: bold;
    }

    div.animated
    {
        transition: scale var(--transition-regular);
    }
    div.animated:hover
    {
        scale: var(--animated-scale-small);
    }

    a
    {
        text-decoration: none;
        color: var(--color-text-default);
    }
`;var qi=Object.defineProperty,Bi=Object.getOwnPropertyDescriptor,Gs=(i,t,e,s)=>{for(var r=s>1?void 0:s?Bi(t,e):t,n=i.length-1,o;n>=0;n--)(o=i[n])&&(r=(s?o(t,e,r):o(r))||r);return s&&r&&qi(t,e,r),r};function Vi(i){console.log("toggleDarkMode");const e=i.target.checked;$t.relay(i,"dark-mode",{checked:e})}const It=class It extends At{constructor(){super("blazing:model"),this.username="anonymous",this._authObserver=new O(this,"blazing:auth")}get profile(){return this.model.profile}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:t})=>{t&&t.username!==this.username&&(this.username=t.username,this.dispatchMessage(["profile/select",{userid:this.username}]))})}render(){const{username:t}=this.profile||{},e=`/app/profile/${t}`;return y`
            <header>
                <a href="/app">
                    <svg class="icon" >
                        <use href="/icons/misc.svg#home"/>
                    </svg>
                </a>

                <div class="right-section">

                        <svg class="icon" @click=${Vi}>
                            <use href="/icons/misc.svg#moon"></use>
                        </svg>

                    <a href="${e}" class="nameButt">
                        <span id="userid">Your Profile</span>
                    </a>



                </div>


            </header>
        `}};It.uses=T({"drop-down":mi.Element}),It.styles=[Wt,j`
            :host {
                display: contents;
            }

            svg.icon {
                display: inline;
                height: var(--font-size-xlarge);
                width: var(--font-size-xlarge);
                vertical-align: top;
                fill: currentColor;
                transition: scale var(--transition-regular);
                cursor: pointer;
            }

            svg.icon:hover {
                scale: 1.3;
            }

            svg.icon:active {
                transition: scale 0.1s;
                scale: 1.15;
            }
            

            header {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                width: 100%;
                margin-bottom: var(--margin-standard);
                align-items: center;
                gap: var(--gap-large);
             
            }

            .right-section {
                display: flex;
                align-items: center; /* Ensures profile link and moon icon are aligned vertically */
                gap: inherit;
            }

            header ~ * {

            }

            header p {

            }

            .nameButt {
                background-color: var(--body-foreground-color);
                padding: var(--padding-medium);
                border-radius: 50px;
                width: max-content;
                transition: var(--transition-regular);
                
            }

            .nameButt:hover {
                scale: 1.1;
               
                //padding: var(--padding-standard);
            }

            nav {
                display: flex;
                flex-direction: column;
                flex-basis: max-content;
                align-items: end;
                background-color: var(--button-color);
                padding: var(--padding-standard);
                border-radius: var(--rounded-corners-regular);
            }


            menu a {

                cursor: pointer;
                text-decoration: underline;
            }

        `];let it=It;Gs([R()],it.prototype,"username",2);Gs([xe()],it.prototype,"profile",1);T({"mu-auth":D.Provider,"blazing-header":it});window.relayEvent=$t.relay;const Wi={};function Yi(i,t,e){switch(i[0]){case"profile/select":Ji(i[1],e).then(r=>t(n=>({...n,profile:r})));break;case"journal/select":Gi(i[1],e).then(r=>t(n=>({...n,journal:r})));break;case"journal/save":console.log("saving journal"),Ki(i[1],e).then(r=>t(n=>({...n,journal:r}))).then(()=>{const{onSuccess:r}=i[1];r&&r()}).catch(r=>{const{onFailure:n}=i[1];n&&n(r)});break;default:const s=i[0];throw new Error(`Unhandled Auth message "${s}"`)}}function Ki(i,t){return console.log("CONTENT: ",i.content),fetch(`/api/journals/${i.journalid}`,{method:"PUT",headers:{"Content-Type":"application/json",...D.headers(t)},body:JSON.stringify(i.content)}).then(e=>{if(e.status===200)return e.json();throw new Error(`Failed to save journal for ${i.journalid}`)}).then(e=>{if(e)return e})}function Gi(i,t){return fetch(`/api/journals/${i.journalid}`,{headers:D.headers(t)}).then(e=>{if(e.status===200)return e.json()}).then(e=>{if(e)return console.log("Journal FOUNDDAWSDS:",e),e})}function Ji(i,t){return console.log("SELECTING PROFILE"),fetch(`/api/friends/${i.userid}`,{headers:D.headers(t)}).then(e=>{if(e.status===200)return e.json()}).then(e=>{if(e)return console.log("Profile:",e),e})}const Zi=j`

    h1,
    h2,
    h3,
    h4 {
        font-family: var(--font-family-display);
    }

    svg.icon {
        display: inline;
        height: var(--font-size-large);
        width: var(--font-size-large);
        vertical-align: top;
        fill: currentColor;
    }
`,Pe=class Pe extends S{constructor(){super(...arguments),this.src="",this._authObserver=new O(this,"blazing:auth"),this._user=new D.User}render(){return y`

          <div class="wrapper">

              <div class="pages-container animated">
                  <ol class="entry-tab">
                      <h1>Personal Wellness!</h1>
                      <li>
                          <a href="/app/journals/">
                              Journal
                              <svg class="icon">
                                  <use href="/icons/misc.svg#book" />
                              </svg>
                          </a>
                      </li>
                      <li>
                          <a href="/app/goals/">
                              Goals
                              <svg class="icon">
                                  <use href="/icons/misc.svg#goal" />
                              </svg>
                          </a>
                      </li>
                      <li>
                          <a href="/app/habits/">
                              Habits
                              <svg class="icon">
                                  <use href="/icons/misc.svg#habit" />
                              </svg>
                          </a>
                      </li>
                      <li>
                          <a href="/app/physical/">
                              Physical
                              <svg class="icon">
                                  <use href="/icons/misc.svg#physical" />
                              </svg>
                          </a>
                      </li>
                      <li>
                          <a href="/app/metrics/">
                              Metrics
                              <svg class="icon">
                                  <use href="/icons/misc.svg#metric" />
                              </svg>
                          </a>
                      </li>
                  </ol>
              </div>
              <div class="info-container animated">
                  <h1>Welcome back</h1>
                  
              </div>
              <div class="misc-container animated" style="flex-direction: column">
                  <h1>Friend Activity</h1>
              </div>
          </div>


    `}hydrate(t){fetch(t,{headers:D.headers(this._user)}).then(e=>{if(e.status===200)return e.json();throw`Server responded with status ${e.status}`}).then(e=>{}).catch(e=>console.log("Failed to tour data:",e))}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:t})=>{t&&(this._user=t),this.hydrate(this.src)})}};Pe.styles=[Wt,Zi,j`
        
        body.light-mode div.wrapper > div
        {
            background-color: red;
        }


        div.wrapper > div {
            background-color: var(--body-foreground-color);
            border-radius: 3rem;
            padding: 40px;
        }

        ol {
            display: flex;
            flex-direction: column;
            gap: var(--gap-regular);
            padding-left: 0;
        }

        ol li {
            cursor: pointer;
        }

        ol li a {
            background-color: var(--interactive-element-color);
            color: var(--color-text-default);
            padding: var(--padding-standard);
            border-radius: var(--rounded-corners-regular);
            display: flex;
            width: 100%;
            transition: all var(--transition-regular);
            gap: var(--gap-regular);
        }

        ol li a:hover {
            scale: var(--animated-scale);
        }
        
        div.wrapper {
            display: grid;
            grid-template-columns: repeat(12, 1fr); /* 12 equal-width columns */
            gap: var(--gap-large);
            grid-template-rows: repeat(2, 1fr);
            grid-auto-rows: minmax(100px, auto);
            width: 100vw; /* Ensure the wrapper takes up the full width of the screen */
            padding-left: var(--margin-standard);
            padding-right: var(--margin-standard);
        }
        
        div.wrapper .pages-container {
            grid-column: 1 / span 6;
            grid-row: 1 / span 2;
        }

        div.wrapper .info-container {
            grid-column: 7 / span 6;
            grid-row: 1;
        }

        div.wrapper .misc-container {
            grid-column: 7 / span 6;
            grid-row: 2;
        }

    `];let he=Pe;var Qi=Object.defineProperty,Xi=Object.getOwnPropertyDescriptor,Js=(i,t,e,s)=>{for(var r=s>1?void 0:s?Xi(t,e):t,n=i.length-1,o;n>=0;n--)(o=i[n])&&(r=(s?o(t,e,r):o(r))||r);return s&&r&&Qi(t,e,r),r};const ke=class ke extends At{get profile(){return this.model.profile}constructor(){super("blazing:model")}render(){const{username:t}=this.profile||{};if(this.profile==null)return y`<h3>No profile found.</h3>
            <a href="#" @click=${ls}>Login here.</a>`;const e=`wmwoodwa.csse.dev/app/profile/${t}`;return y`
            <h3>Username: ${t}</h3>

            <h3>Profile Link: ${e}</h3>
            <br />
            <a href="#" @click=${ls}>Sign out</a>
    `}attributeChangedCallback(t,e,s){super.attributeChangedCallback(t,e,s),t==="userid"&&e!==s&&s&&this.dispatchMessage(["profile/select",{userid:s}])}};ke.styles=[Wt];let _t=ke;Js([R()],_t.prototype,"userid",2);Js([xe()],_t.prototype,"profile",1);function ls(i){$t.relay(i,"auth:message",["auth/signout"])}var tn=Object.defineProperty,en=(i,t,e,s)=>{for(var r=void 0,n=i.length-1,o;n>=0;n--)(o=i[n])&&(r=o(t,e,r)||r);return r&&tn(t,e,r),r};T({"restful-form":ws.FormElement});const Ce=class Ce extends S{constructor(){super(...arguments),this.message=""}render(){return y`
            
            <h2>Login</h2>
            
      <restful-form
          
        new
        .init=${{username:"",password:""}}
        src="/auth/login"
        @mu-rest-form:created=${this._handleSuccess}
        @mu-rest-form:error=${this._handleError}>
          <label>
              <input name="username" autocomplete="off" placeholder="Username" />
          </label>
          <label>
              <input type="password" name="password" placeholder="Password"/>
          </label>
      </restful-form>
      <p class="error">
        ${this.message?"Invalid Username or Password":""}
      </p>
      <pre>${this.message}</pre>
      <a href="/app/register">No account? Sign up here.</a>
    `}get next(){return new URLSearchParams(document.location.search).get("next")}_handleSuccess(t){const e=t.detail,{token:s}=e.created,r=this.next||"/";console.log("Login successful",e,r),$t.relay(t,"auth:message",["auth/signin",{token:s,redirect:r}])}_handleError(t){const{error:e}=t.detail;console.log("Login failed",t.detail),this.message=e.toString()}};Ce.styles=[Wt,j`
    .error {
      color: firebrick;
    }
        
    *
    {
        justify-content: center;
        display: flex;
        align-items: center;

    }
        
    input
    {
        height: 40px;
        font-size: var(--font-size-medium);
        font-weight: normal;
        background-color: var(--interactive-element-color);
        border-radius: var(--rounded-corners-small);
        margin-bottom: 10px;
        padding: 3px;
        padding-inline: 10px;
        border-width: 0;
        color: var(--color-text-default);
    }
  `];let Mt=Ce;en([R()],Mt.prototype,"message");class sn extends At{constructor(){super("blazing:model")}render(){return y`
            <h2>We're under construction. Come back later!</h2>
    `}}var rn=Object.defineProperty,nn=Object.getOwnPropertyDescriptor,St=(i,t,e,s)=>{for(var r=s>1?void 0:s?nn(t,e):t,n=i.length-1,o;n>=0;n--)(o=i[n])&&(r=(s?o(t,e,r):o(r))||r);return s&&r&&rn(t,e,r),r};const Oe=class Oe extends S{render(){return y`
<!--      <section>-->

        <div class="textContent">
          <slot name="content"></slot>

          </textarea>
   
        </div>

        <nav>
          <a href="${this.journalid}/edit" class="edit">Edit Content</a>
        </nav>
<!--      </section>-->
    `}};Oe.styles=[j`
        :host {
          display: flex;
          flex-direction: column;
          justify-content: center; /* Center vertically */
          align-items: center;    /* Center horizontally */
          width: 100%;            /* Take full width of the parent */
          height: 100%;           /* Take full height of the parent */
          box-sizing: border-box; /* Include padding and border in width/height */
        }

        .textContent {
          min-width: 50vw;/* Fixed width relative to the parent */
          max-width: 50vw;        
          min-height: 50vh;
          max-height: 50vh;
          background-color: var(--body-foreground-color);
          border-radius: var(--rounded-corners-regular);
          margin-bottom: var(--margin-standard);
          padding: var(--padding-standard);

          transition: var(--transition-regular);
          white-space: preserve-breaks;
          
        }
        
        .textContent:hover
        {
          scale: var(--animated-scale-small);
        }



        .edit {
          color: var(--color-text-default);
          font-weight: bold;
          text-decoration: none;
          padding: var(--padding-standard);
          border-radius: var(--rounded-corners-regular);
          background-color: var(--interactive-element-color);
          
        }
        
        nav
        {
          transition: var(--transition-regular);
        }
        
        nav:hover {
          scale: var(--animated-scale);
        }
      `];let Ht=Oe;St([R()],Ht.prototype,"journalid",2);const Dt=class Dt extends S{render(){return y`
      <section>
        <mu-form .init=${this.init}>
          <label>
            <textarea name="content" class="textContent" placeholder="Sample text">

              </textarea>
          </label>
          
        </mu-form>
      </section>
    `}};Dt.uses=T({"mu-form":vr.Element,"input-array":yi.Element}),Dt.styles=[j`
        :host {
          display: flex;
          flex-direction: column;
          justify-content: center; /* Center vertically */
          align-items: center;    /* Center horizontally */
          width: 100%;            /* Take full width of the parent */
          height: 100%;           /* Take full height of the parent */
          box-sizing: border-box; /* Include padding and border in width/height */
        }

        .textContent {
          min-width: 50vw;/* Fixed width relative to the parent */
          max-width: 50vw;        
          min-height: 50vh;
          max-height: 50vh;
          background-color: var(--body-foreground-color);
          border-radius: var(--rounded-corners-regular);
          margin-bottom: var(--margin-standard);
          padding: var(--padding-standard);
          transition: var(--transition-regular);
          font-size: medium;
          color: var(--color-text-default);
          border-width: 0;

          
        }
        
        .textContent:hover
        {
          scale: var(--animated-scale-small);
        }



        .edit {
          color: var(--color-text-default);
          font-weight: bold;
          text-decoration: none;
          padding: var(--padding-standard);
          border-radius: var(--rounded-corners-regular);
          background-color: var(--interactive-element-color);
          
        }
        
        nav
        {
          transition: var(--transition-regular);
        }
        
        nav:hover {
          scale: var(--animated-scale);
        }
      `];let zt=Dt;St([R({attribute:!1})],zt.prototype,"init",2);const Ft=class Ft extends At{constructor(){super("blazing:model"),this.edit=!1,this.journalid=""}get journal(){return this.model.journal}attributeChangedCallback(t,e,s){super.attributeChangedCallback(t,e,s),t==="journal-id"&&e!==s&&s&&this.dispatchMessage(["journal/select",{journalid:s}])}render(){const{_id:t,content:e}=this.journal||{};return console.log("Journal has ID: ",t),console.log("Journal has structure: ",this.journal),this.edit?y`
          <journal-editor

            .init=${this.journal}
            @mu-form:submit=${s=>this._handleSubmit(s)}>

          </journal-editor>
        `:y`
          <journal-viewer class="journalView" journalid=${t}>
            <span slot="content">${e}</span>
          </journal-viewer>
        `}_handleSubmit(t){console.log("Handling submit of mu-form"),this.dispatchMessage(["journal/save",{journalid:"674e171fcdfafa1eeb94c694",content:t.detail,onSuccess:()=>$s.dispatch(this,"history/navigate",{href:"/app/journals/"}),onFailure:s=>console.log("ERROR:",s)}])}};Ft.uses=T({"journal-viewer":Ht,"journal-editor":zt}),Ft.styles=j`
  :host {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 100%; /* Fills the entire viewport height */
    margin-bottom: 10%;


  }

`;let nt=Ft;St([R({type:Boolean,reflect:!0})],nt.prototype,"edit",2);St([R({attribute:"journal-id",reflect:!0})],nt.prototype,"journalid",2);St([xe()],nt.prototype,"journal",1);T({"restful-form":ws.FormElement});class on extends S{render(){return y`
        <h2>Create a user here.</h2>
      <restful-form new src="/auth/register">
        <slot></slot>
          <label>
              <span>Username:</span>
              <input name="username" autocomplete="off" />
          </label>
          <label>
              <span>Password:</span>
              <input type="password" name="password" />
          </label>
      </restful-form>
    `}get next(){return new URLSearchParams(document.location.search).get("next")}constructor(){super(),this.addEventListener("mu-rest-form:created",t=>{const e=t.detail,{token:s}=e.created,r=this.next||"/";console.log("Signup successful",e,r),$t.relay(t,"auth:message",["auth/signin",{token:s,redirect:r}])})}}const an=[{auth:"protected",path:"/app",view:()=>y`
            <home-view></home-view>
    `},{auth:"protected",path:"/app/profile/:id",view:i=>y`
      <profile-view userid=${i.id}></profile-view>
    `},{path:"/",redirect:"/app"},{auth:"protected",path:"/app/journals/",view:()=>y`<journal-view class="journalView" journal-id="674e171fcdfafa1eeb94c694"></journal-view>`},{auth:"protected",path:"/app/journals/:id/edit",view:i=>y`
        <journal-view edit journal-id=${i.id}></journal-view>`},{auth:"protected",path:"/app/goals/",view:()=>y`<unknown-view />`},{auth:"protected",path:"/app/habits/",view:()=>y`<unknown-view></unknown-view>`},{auth:"protected",path:"/app/physical/",view:()=>y`<unknown-view />`},{auth:"protected",path:"/app/metrics/",view:()=>y`<unknown-view />`},{path:"/app/login/",view:()=>y`<login-form></login-form>`},{path:"/app/register",view:()=>y`<signup-form></signup-form>`}],Te=class Te extends S{constructor(){super(...arguments),this._authObserver=new O(this,"blazing:auth")}render(){return y`
            <home-view></home-view>

        `}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:t})=>{})}};Te.uses=T({"home-view":he,"profile-view":_t,"journal-view":nt,"login-form":Mt,"mu-history":$s.Provider,"signup-form":on,"unknown-view":sn,"mu-switch":class extends pi.Element{constructor(){super(an,"blazing:history","blazing:auth")}},"mu-store":class extends Er.Provider{constructor(){super(Yi,Wi,"blazing:auth")}}});let ue=Te;T({"mu-auth":D.Provider,"blazing-app":ue,"blazing-header":it});function ln(i,t){console.log("surf week"),i.classList.toggle("light-mode",t)}document.body.addEventListener("dark-mode",i=>ln(i.currentTarget,i.detail.checked));
