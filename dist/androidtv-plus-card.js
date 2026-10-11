const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;let s=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=r.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&r.set(i,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const r=1===t.length?t[0]:e.reduce((e,i,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1],t[0]);return new s(r,t,i)},n=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:a,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:l,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,u=globalThis,m=u.trustedTypes,v=m?m.emptyScript:"",f=u.reactiveElementPolyfillSupport,g=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?v:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!a(t,e),$={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let _=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);void 0!==r&&c(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){const{get:r,set:s}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:r,set(e){const o=r?.call(this);s?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(g("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(g("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g("properties"))){const t=this.properties,e=[...l(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,r)=>{if(e)i.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of r){const r=document.createElement("style"),s=t.litNonce;void 0!==s&&r.setAttribute("nonce",s),r.textContent=e.cssText,i.appendChild(r)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(void 0!==r&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,r=i._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=i.getPropertyOptions(r),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=r;const o=s.fromAttribute(e,t.type);this[r]=o??this._$Ej?.get(r)??o,this._$Em=null}}requestUpdate(t,e,i,r=!1,s){if(void 0!==t){const o=this.constructor;if(!1===r&&(s=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??y)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:s},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==s||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===r&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,r=this[e];!0!==t||this._$AL.has(e)||void 0===r||this.C(e,void 0,i,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};_.elementStyles=[],_.shadowRootOptions={mode:"open"},_[g("elementProperties")]=new Map,_[g("finalized")]=new Map,f?.({ReactiveElement:_}),(u.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,x=t=>t,A=w.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,k="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+S,C=`<${P}>`,O=document,T=()=>O.createComment(""),D=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,U="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,j=/>/g,H=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),z=/'/g,I=/"/g,L=/^(?:script|style|textarea|title)$/i,V=(t,...e)=>({_$litType$:1,strings:t,values:e}),B=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),Y=new WeakMap,K=O.createTreeWalker(O,129);function X(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const q=(t,e)=>{const i=t.length-1,r=[];let s,o=2===e?"<svg>":3===e?"<math>":"",n=N;for(let e=0;e<i;e++){const i=t[e];let a,c,h=-1,l=0;for(;l<i.length&&(n.lastIndex=l,c=n.exec(i),null!==c);)l=n.lastIndex,n===N?"!--"===c[1]?n=R:void 0!==c[1]?n=j:void 0!==c[2]?(L.test(c[2])&&(s=RegExp("</"+c[2],"g")),n=H):void 0!==c[3]&&(n=H):n===H?">"===c[0]?(n=s??N,h=-1):void 0===c[1]?h=-2:(h=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?H:'"'===c[3]?I:z):n===I||n===z?n=H:n===R||n===j?n=N:(n=H,s=void 0);const d=n===H&&t[e+1].startsWith("/>")?" ":"";o+=n===N?i+C:h>=0?(r.push(a),i.slice(0,h)+k+i.slice(h)+S+d):i+S+(-2===h?e:d)}return[X(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]};class F{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let s=0,o=0;const n=t.length-1,a=this.parts,[c,h]=q(t,e);if(this.el=F.createElement(c,i),K.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=K.nextNode())&&a.length<n;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(k)){const e=h[o++],i=r.getAttribute(t).split(S),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:n[2],strings:i,ctor:"."===n[1]?tt:"?"===n[1]?et:"@"===n[1]?it:Q}),r.removeAttribute(t)}else t.startsWith(S)&&(a.push({type:6,index:s}),r.removeAttribute(t));if(L.test(r.tagName)){const t=r.textContent.split(S),e=t.length-1;if(e>0){r.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)r.append(t[i],T()),K.nextNode(),a.push({type:2,index:++s});r.append(t[e],T())}}}else if(8===r.nodeType)if(r.data===P)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=r.data.indexOf(S,t+1));)a.push({type:7,index:s}),t+=S.length-1}s++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,r){if(e===B)return e;let s=void 0!==r?i._$Co?.[r]:i._$Cl;const o=D(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),void 0===o?s=void 0:(s=new o(t),s._$AT(t,i,r)),void 0!==r?(i._$Co??=[])[r]=s:i._$Cl=s),void 0!==s&&(e=J(t,s._$AS(t,e.values),s,r)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??O).importNode(e,!0);K.currentNode=r;let s=K.nextNode(),o=0,n=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new G(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new rt(s,this,t)),this._$AV.push(e),a=i[++n]}o!==a?.index&&(s=K.nextNode(),o++)}return K.currentNode=O,r}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class G{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),D(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&D(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,r="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=F.createElement(X(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new Z(r,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Y.get(t.strings);return void 0===e&&Y.set(t.strings,e=new F(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const s of t)r===e.length?e.push(i=new G(this.O(T()),this.O(T()),this,this.options)):i=e[r],i._$AI(s),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,s){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,r){const s=this.strings;let o=!1;if(void 0===s)t=J(this,t,e,0),o=!D(t)||t!==this._$AH&&t!==B,o&&(this._$AH=t);else{const r=t;let n,a;for(t=s[0],n=0;n<s.length-1;n++)a=J(this,r[i+n],e,n),a===B&&(a=this._$AH[n]),o||=!D(a)||a!==this._$AH[n],a===W?t=W:t!==W&&(t+=(a??"")+s[n+1]),this._$AH[n]=a}o&&!r&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class et extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class it extends Q{constructor(t,e,i,r,s){super(t,e,i,r,s),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??W)===B)return;const i=this._$AH,r=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==W&&(i===W||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const st=w.litHtmlPolyfillSupport;st?.(F,G),(w.litHtmlVersions??=[]).push("3.3.3");const ot=globalThis;class nt extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const r=i?.renderBefore??e;let s=r._$litPart$;if(void 0===s){const t=i?.renderBefore??null;r._$litPart$=s=new G(e.insertBefore(T(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}nt._$litElement$=!0,nt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:nt});const at=ot.litElementPolyfillSupport;at?.({LitElement:nt}),(ot.litElementVersions??=[]).push("4.2.2");const ct=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:y},lt=(t=ht,e,i)=>{const{kind:r,metadata:s}=i;let o=globalThis.litPropertyMetadata.get(s);if(void 0===o&&globalThis.litPropertyMetadata.set(s,o=new Map),"setter"===r&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===r){const{name:r}=i;return{set(i){const s=e.get.call(this);e.set.call(this,i),this.requestUpdate(r,s,t,!0,i)},init(e){return void 0!==e&&this.C(r,void 0,t,e),e}}}if("setter"===r){const{name:r}=i;return function(i){const s=this[r];e.call(this,i),this.requestUpdate(r,s,t,!0,i)}}throw Error("Unsupported decorator location: "+r)};function dt(t){return(e,i)=>"object"==typeof i?lt(t,e,i):((t,e,i)=>{const r=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),r?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function pt(t){return dt({...t,state:!0,attribute:!1})}const ut="androidtv-plus-card",mt="androidtv-plus-card-editor",vt="DPAD_UP",ft="DPAD_DOWN",gt="DPAD_LEFT",bt="DPAD_RIGHT",yt="DPAD_CENTER";function $t(t,e,i){t.dispatchEvent(new CustomEvent(e,{detail:i,bubbles:!0,composed:!0}))}const _t=(t,e)=>$t(t,"atv-key",{key:e});class wt{constructor(t){this.onFire=t}start(){this.stop(),this.onFire(),this.timeout=window.setTimeout(()=>{this.interval=window.setInterval(()=>this.onFire(),150)},450)}stop(){void 0!==this.timeout&&(clearTimeout(this.timeout),this.timeout=void 0),void 0!==this.interval&&(clearInterval(this.interval),this.interval=void 0)}}Object.getOwnPropertyDescriptor;let xt=class extends nt{constructor(){super(...arguments),this.repeater=new wt(()=>{this.activeKey&&_t(this,this.activeKey)})}press(t){this.activeKey=t,this.repeater.start()}release(){this.activeKey=void 0,this.repeater.stop()}button(t,e,i){return V`
      <button
        class="btn"
        data-key=${t}
        aria-label=${i}
        @pointerdown=${e=>{e.preventDefault(),e.target.setPointerCapture?.(e.pointerId),this.press(t)}}
        @pointerup=${()=>this.release()}
        @pointercancel=${()=>this.release()}
        @pointerleave=${()=>this.release()}
        @contextmenu=${t=>t.preventDefault()}
      >
        <ha-icon icon=${e}></ha-icon>
      </button>
    `}render(){return V`
      <div class="pad">
        <span></span>
        ${this.button(vt,"mdi:chevron-up","Up")}
        <span></span>
        ${this.button(gt,"mdi:chevron-left","Left")}
        ${this.button(yt,"mdi:circle-medium","Select")}
        ${this.button(bt,"mdi:chevron-right","Right")}
        <span></span>
        ${this.button(ft,"mdi:chevron-down","Down")}
        <span></span>
      </div>
    `}};xt.styles=o`
    .pad {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
      gap: 6px;
      width: min(100%, 232px);
      aspect-ratio: 1;
      margin: 0 auto;
    }
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      color: var(--primary-text-color);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
      transition:
        background 120ms ease,
        transform 80ms ease;
      touch-action: none;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
    }
    .btn:hover {
      background: var(--divider-color, rgba(127, 127, 127, 0.3));
    }
    .btn:active {
      transform: scale(0.94);
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    .btn ha-icon {
      --mdc-icon-size: 30px;
    }
    .btn[data-key='DPAD_CENTER'] ha-icon {
      --mdc-icon-size: 44px;
    }
  `,xt=((t,e)=>{for(var i,r=e,s=t.length-1;s>=0;s--)(i=t[s])&&(r=i(r)||r);return r})([ct("atv-dpad")],xt);var At=Object.defineProperty,Et=Object.getOwnPropertyDescriptor,kt=(t,e,i,r)=>{for(var s,o=r>1?void 0:r?Et(e,i):e,n=t.length-1;n>=0;n--)(s=t[n])&&(o=(r?s(e,i,o):s(o))||o);return r&&o&&At(e,i,o),o};let St=class extends nt{constructor(){super(...arguments),this.pressed=!1,this.originX=0,this.originY=0,this.lastX=0,this.lastY=0,this.moved=!1}onDown(t){t.preventDefault(),this.pressed=!0,this.moved=!1,this.originX=this.lastX=t.clientX,this.originY=this.lastY=t.clientY,t.currentTarget.setPointerCapture(t.pointerId)}onMove(t){if(!this.pressed)return;const e=t.clientX-this.lastX,i=t.clientY-this.lastY;if(Math.hypot(t.clientX-this.originX,t.clientY-this.originY)>18&&(this.moved=!0),Math.hypot(e,i)<34)return;const r=Math.abs(e)>=Math.abs(i)?e>0?bt:gt:i>0?ft:vt;_t(this,r),this.lastX=t.clientX,this.lastY=t.clientY}onUp(){this.pressed&&!this.moved&&_t(this,yt),this.pressed=!1}render(){return V`
      <div
        class="pad ${this.pressed?"pressed":""}"
        role="button"
        aria-label="Touch remote"
        @pointerdown=${this.onDown}
        @pointermove=${this.onMove}
        @pointerup=${this.onUp}
        @pointercancel=${this.onUp}
        @contextmenu=${t=>t.preventDefault()}
      >
        <div class="ring"></div>
        <span class="hint">OK</span>
      </div>
    `}};St.styles=o`
    .pad {
      position: relative;
      width: min(100%, 232px);
      aspect-ratio: 1;
      margin: 0 auto;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      touch-action: none;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
      background: radial-gradient(
        circle at 50% 35%,
        var(--secondary-background-color, rgba(127, 127, 127, 0.18)),
        var(--card-background-color, rgba(0, 0, 0, 0.1)) 70%
      );
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.08),
        0 2px 8px rgba(0, 0, 0, 0.25);
      transition: transform 90ms ease;
    }
    .pad.pressed {
      transform: scale(0.985);
    }
    .ring {
      width: 68%;
      aspect-ratio: 1;
      border-radius: 50%;
      border: 2px dashed var(--divider-color, rgba(127, 127, 127, 0.4));
      opacity: 0.55;
    }
    .hint {
      position: absolute;
      font-size: 13px;
      letter-spacing: 0.08em;
      font-weight: 600;
      color: var(--secondary-text-color);
      pointer-events: none;
    }
  `,kt([pt()],St.prototype,"pressed",2),St=kt([ct("atv-touchpad")],St);var Pt=Object.defineProperty,Ct=Object.getOwnPropertyDescriptor,Ot=(t,e,i,r)=>{for(var s,o=r>1?void 0:r?Ct(e,i):e,n=t.length-1;n>=0;n--)(s=t[n])&&(o=(r?s(e,i,o):s(o))||o);return r&&o&&Pt(e,i,o),o};let Tt=class extends nt{constructor(){super(...arguments),this.key="",this.icon="",this.label="",this.repeater=new wt(()=>_t(this,this.key))}down(t){t.preventDefault(),t.currentTarget.setPointerCapture?.(t.pointerId),this.repeater.start()}render(){return V`
      <button
        class="btn"
        aria-label=${this.label}
        @pointerdown=${this.down}
        @pointerup=${()=>this.repeater.stop()}
        @pointercancel=${()=>this.repeater.stop()}
        @pointerleave=${()=>this.repeater.stop()}
        @contextmenu=${t=>t.preventDefault()}
      >
        <ha-icon icon=${this.icon}></ha-icon>
      </button>
    `}};Tt.styles=o`
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 46px;
      height: 46px;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      color: var(--primary-text-color);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
      transition:
        background 120ms ease,
        transform 80ms ease;
      touch-action: none;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
    }
    .btn:hover {
      background: var(--divider-color, rgba(127, 127, 127, 0.3));
    }
    .btn:active {
      transform: scale(0.92);
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    .btn ha-icon {
      --mdc-icon-size: 24px;
    }
  `,Ot([dt({type:String})],Tt.prototype,"key",2),Ot([dt({type:String})],Tt.prototype,"icon",2),Ot([dt({type:String})],Tt.prototype,"label",2),Tt=Ot([ct("atv-repeat-button")],Tt);var Dt=Object.defineProperty,Mt=Object.getOwnPropertyDescriptor,Ut=(t,e,i,r)=>{for(var s,o=r>1?void 0:r?Mt(e,i):e,n=t.length-1;n>=0;n--)(s=t[n])&&(o=(r?s(e,i,o):s(o))||o);return r&&o&&Dt(e,i,o),o};let Nt=class extends nt{constructor(){super(...arguments),this.value="",this.focused=!1}willUpdate(t){t.has("mirror")&&void 0!==this.mirror&&!this.focused&&(this.value=this.mirror)}submit(t){t.preventDefault();const e=this.value;e&&((t,e)=>{$t(this,"atv-text",{text:e})})(0,e)}render(){return V`
      <form class="bar" @submit=${this.submit}>
        <input
          class="field"
          type="text"
          placeholder="Type on TV…"
          .value=${this.value}
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false"
          @input=${t=>this.value=t.target.value}
          @focus=${()=>this.focused=!0}
          @blur=${()=>this.focused=!1}
        />
        <button type="button" class="iconbtn" aria-label="Backspace" @click=${()=>_t(this,"DEL")}>
          <ha-icon icon="mdi:backspace-outline"></ha-icon>
        </button>
        <button type="button" class="iconbtn" aria-label="Enter" @click=${()=>_t(this,"ENTER")}>
          <ha-icon icon="mdi:keyboard-return"></ha-icon>
        </button>
        <button type="submit" class="iconbtn primary" aria-label="Send text">
          <ha-icon icon="mdi:send"></ha-icon>
        </button>
      </form>
    `}};Nt.styles=o`
    .bar {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .field {
      flex: 1;
      min-width: 0;
      padding: 10px 12px;
      border-radius: 10px;
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.4));
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.1));
      color: var(--primary-text-color);
      font-size: 15px;
      outline: none;
    }
    .field:focus {
      border-color: var(--primary-color);
    }
    .iconbtn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 42px;
      height: 42px;
      flex: none;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      color: var(--primary-text-color);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
      transition: background 120ms ease;
    }
    .iconbtn:hover {
      background: var(--divider-color, rgba(127, 127, 127, 0.3));
    }
    .iconbtn.primary {
      color: var(--text-primary-color, #fff);
      background: var(--primary-color);
    }
  `,Ut([dt({type:String})],Nt.prototype,"mirror",2),Ut([pt()],Nt.prototype,"value",2),Nt=Ut([ct("atv-keyboard")],Nt);var Rt=Object.defineProperty,jt=Object.getOwnPropertyDescriptor,Ht=(t,e,i,r)=>{for(var s,o=r>1?void 0:r?jt(e,i):e,n=t.length-1;n>=0;n--)(s=t[n])&&(o=(r?s(e,i,o):s(o))||o);return r&&o&&Rt(e,i,o),o};let zt=class extends nt{constructor(){super(...arguments),this.apps=[]}render(){return V`
      <div class="grid">
        ${this.apps.map(t=>V`
            <button class="tile" title=${t.name??t.activity} @click=${()=>$t(this,"atv-activity",{activity:t.activity})}>
              <ha-icon icon=${t.icon??"mdi:application"}></ha-icon>
              ${t.name?V`<span class="label">${t.name}</span>`:""}
            </button>
          `)}
      </div>
    `}};zt.styles=o`
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(72px, 1fr));
      gap: 8px;
    }
    .tile {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      padding: 12px 4px;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      color: var(--primary-text-color);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
      transition:
        background 120ms ease,
        transform 80ms ease;
    }
    .tile:hover {
      background: var(--divider-color, rgba(127, 127, 127, 0.28));
    }
    .tile:active {
      transform: scale(0.96);
    }
    .tile ha-icon {
      --mdc-icon-size: 26px;
    }
    .label {
      font-size: 11px;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--secondary-text-color);
    }
  `,Ht([dt({attribute:!1})],zt.prototype,"apps",2),zt=Ht([ct("atv-app-grid")],zt);var It=Object.defineProperty,Lt=Object.getOwnPropertyDescriptor,Vt=(t,e,i,r)=>{for(var s,o=r>1?void 0:r?Lt(e,i):e,n=t.length-1;n>=0;n--)(s=t[n])&&(o=(r?s(e,i,o):s(o))||o);return r&&o&&It(e,i,o),o};console.info(`%c ${ut} %c 0.1.0 `,"color: white; background: #4285f4; font-weight: 700; border-radius: 3px 0 0 3px;","color: white; background: #34a853; font-weight: 700; border-radius: 0 3px 3px 0;");let Bt=class extends nt{constructor(){super(...arguments),this.mode="both",this.onKey=t=>this.sendKey(t.detail.key),this.onText=t=>this.sendText(t.detail.text),this.onActivity=t=>this.launchActivity(t.detail.activity)}static async getConfigElement(){return await Promise.resolve().then(function(){return qt}),document.createElement(mt)}static getStubConfig(t){const e=Object.keys(t.states).find(t=>t.startsWith("remote."));return{type:`custom:${ut}`,entity:e??"remote.living_room_tv",mode:"both",apps:[]}}setConfig(t){if(!t.entity||!t.entity.startsWith("remote."))throw new Error("You must specify a `remote.` entity from the androidtv_remote integration.");this.config={mode:"both",show_power:!0,show_volume:!0,show_media:!0,show_keyboard:!0,haptic_feedback:!0,...t},this.mode=this.config.mode??"both"}getCardSize(){let t=8;return this.config?.apps?.length&&(t+=2),this.config?.show_keyboard&&(t+=1),t}get remoteState(){return this.hass?.states[this.config.entity]}vibrate(){this.config.haptic_feedback&&navigator.vibrate?.(8)}sendKey(t){this.vibrate(),this.hass.callService("remote","send_command",{command:t},{entity_id:this.config.entity})}sendText(t){this.hass.callService("remote","send_command",{command:`text:${t}`},{entity_id:this.config.entity})}launchActivity(t){this.hass.callService("remote","turn_on",{activity:t},{entity_id:this.config.entity})}get cardTitle(){return this.config.name??this.remoteState?.attributes.friendly_name??"Android TV"}get activityLabel(){const t=this.remoteState?.attributes.current_activity;if(!t)return"Idle";const e=t.split(".").pop()??t;return e.charAt(0).toUpperCase()+e.slice(1)}renderNav(){const t="dpad"===this.mode||"both"===this.mode,e="touch"===this.mode||"both"===this.mode;return V`
      ${"both"===this.config.mode?V`
            <div class="segmented" role="tablist">
              <button
                role="tab"
                class=${"dpad"===this.mode?"active":""}
                @click=${()=>this.mode="dpad"}
              >
                <ha-icon icon="mdi:gamepad-variant-outline"></ha-icon> D-pad
              </button>
              <button
                role="tab"
                class=${"touch"===this.mode?"active":""}
                @click=${()=>this.mode="touch"}
              >
                <ha-icon icon="mdi:gesture-tap"></ha-icon> Touch
              </button>
            </div>
          `:W}
      <div class="surface">${t&&"touch"!==this.mode?V`<atv-dpad></atv-dpad>`:W}
        ${e&&"dpad"!==this.mode?V`<atv-touchpad></atv-touchpad>`:W}</div>
    `}renderMedia(){return V`
      <div class="row">
        <atv-repeat-button .key=${"MEDIA_PREVIOUS"} icon="mdi:skip-previous" label="Previous"></atv-repeat-button>
        <atv-repeat-button .key=${"MEDIA_REWIND"} icon="mdi:rewind" label="Rewind"></atv-repeat-button>
        <atv-repeat-button .key=${"MEDIA_PLAY_PAUSE"} icon="mdi:play-pause" label="Play/Pause"></atv-repeat-button>
        <atv-repeat-button .key=${"MEDIA_STOP"} icon="mdi:stop" label="Stop"></atv-repeat-button>
        <atv-repeat-button .key=${"MEDIA_FAST_FORWARD"} icon="mdi:fast-forward" label="Fast forward"></atv-repeat-button>
        <atv-repeat-button .key=${"MEDIA_NEXT"} icon="mdi:skip-next" label="Next"></atv-repeat-button>
      </div>
    `}renderVolume(){return V`
      <div class="row">
        <atv-repeat-button .key=${"VOLUME_DOWN"} icon="mdi:volume-medium" label="Volume down"></atv-repeat-button>
        <atv-repeat-button .key=${"MUTE"} icon="mdi:volume-off" label="Mute"></atv-repeat-button>
        <atv-repeat-button .key=${"VOLUME_UP"} icon="mdi:volume-high" label="Volume up"></atv-repeat-button>
      </div>
    `}render(){return this.config&&this.hass?V`
      <ha-card
        @atv-key=${this.onKey}
        @atv-text=${this.onText}
        @atv-activity=${this.onActivity}
      >
        <div class="content">
          <header>
            <div class="titles">
              <div class="title">${this.cardTitle}</div>
              <div class="activity">${this.activityLabel}</div>
            </div>
            ${this.config.show_power?V`<atv-repeat-button .key=${"POWER"} icon="mdi:power" label="Power"></atv-repeat-button>`:W}
          </header>

          ${this.renderNav()}

          <div class="row">
            <atv-repeat-button .key=${"BACK"} icon="mdi:arrow-left" label="Back"></atv-repeat-button>
            <atv-repeat-button .key=${"HOME"} icon="mdi:home-outline" label="Home"></atv-repeat-button>
            <atv-repeat-button .key=${"MENU"} icon="mdi:menu" label="Menu"></atv-repeat-button>
            <atv-repeat-button .key=${"SEARCH"} icon="mdi:magnify" label="Search"></atv-repeat-button>
          </div>

          ${this.config.show_media?this.renderMedia():W}
          ${this.config.show_volume?this.renderVolume():W}
          ${this.config.apps?.length?V`<atv-app-grid .apps=${this.config.apps}></atv-app-grid>`:W}
          ${this.config.show_keyboard?V`<atv-keyboard></atv-keyboard>`:W}
        </div>
      </ha-card>
    `:W}};Bt.styles=o`
    ha-card {
      overflow: hidden;
    }
    .content {
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: 16px;
    }
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .titles {
      min-width: 0;
    }
    .title {
      font-size: 18px;
      font-weight: 600;
      color: var(--primary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .activity {
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    .segmented {
      display: flex;
      gap: 4px;
      padding: 4px;
      border-radius: 12px;
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
    }
    .segmented button {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 8px;
      border: none;
      border-radius: 9px;
      cursor: pointer;
      font-size: 14px;
      color: var(--secondary-text-color);
      background: transparent;
      transition: background 120ms ease;
    }
    .segmented button.active {
      color: var(--primary-text-color);
      background: var(--card-background-color, #fff);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }
    .surface {
      display: flex;
      justify-content: center;
    }
    .row {
      display: flex;
      justify-content: center;
      gap: 10px;
      flex-wrap: wrap;
    }
  `,Vt([dt({attribute:!1})],Bt.prototype,"hass",2),Vt([pt()],Bt.prototype,"config",2),Vt([pt()],Bt.prototype,"mode",2),Bt=Vt([ct(ut)],Bt),window.customCards=window.customCards??[],window.customCards.push({type:ut,name:"Android TV Plus",description:"A d-pad and touch remote for Android TV, with app tiles and keyboard."});var Wt=Object.defineProperty,Yt=Object.getOwnPropertyDescriptor,Kt=(t,e,i,r)=>{for(var s,o=r>1?void 0:r?Yt(e,i):e,n=t.length-1;n>=0;n--)(s=t[n])&&(o=(r?s(e,i,o):s(o))||o);return r&&o&&Wt(e,i,o),o};let Xt=class extends nt{setConfig(t){this.config=t}patch(t){this.config={...this.config,...t},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}num(t){return!1!==this.config[t]}toggle(t,e){this.patch({[t]:e.target.checked})}render(){return this.hass&&this.config?V`
      <div class="form">
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this.config.entity}
          .includeDomains=${["remote"]}
          allow-custom-entity
          label="Remote entity"
          @value-changed=${t=>this.patch({entity:t.detail.value})}
        ></ha-entity-picker>

        <ha-entity-picker
          .hass=${this.hass}
          .value=${this.config.media_player??""}
          .includeDomains=${["media_player"]}
          allow-custom-entity
          label="Media player (optional)"
          @value-changed=${t=>this.patch({media_player:t.detail.value||void 0})}
        ></ha-entity-picker>

        <ha-textfield
          .value=${this.config.name??""}
          label="Title (optional)"
          @input=${t=>this.patch({name:t.target.value||void 0})}
        ></ha-textfield>

        <div class="segmented" role="radiogroup">
          ${["both","dpad","touch"].map(t=>V`
              <button
                role="radio"
                aria-checked=${this.config.mode===t}
                class=${(this.config.mode??"both")===t?"active":""}
                @click=${()=>this.patch({mode:t})}
              >
                ${t}
              </button>
            `)}
        </div>

        <ha-formfield label="Show power">
          <ha-switch .checked=${this.num("show_power")} @change=${t=>this.toggle("show_power",t)}></ha-switch>
        </ha-formfield>
        <ha-formfield label="Show volume">
          <ha-switch .checked=${this.num("show_volume")} @change=${t=>this.toggle("show_volume",t)}></ha-switch>
        </ha-formfield>
        <ha-formfield label="Show media controls">
          <ha-switch .checked=${this.num("show_media")} @change=${t=>this.toggle("show_media",t)}></ha-switch>
        </ha-formfield>
        <ha-formfield label="Show keyboard">
          <ha-switch .checked=${this.num("show_keyboard")} @change=${t=>this.toggle("show_keyboard",t)}></ha-switch>
        </ha-formfield>
        <ha-formfield label="Haptic feedback">
          <ha-switch .checked=${this.num("haptic_feedback")} @change=${t=>this.toggle("haptic_feedback",t)}></ha-switch>
        </ha-formfield>

        <p class="hint">App tiles are configured in the card's YAML (<code>apps:</code>).</p>
      </div>
    `:W}};Xt.styles=o`
    .form {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .segmented {
      display: flex;
      gap: 6px;
    }
    .segmented button {
      flex: 1;
      padding: 10px;
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.4));
      border-radius: 10px;
      background: transparent;
      color: var(--secondary-text-color);
      cursor: pointer;
      text-transform: capitalize;
    }
    .segmented button.active {
      border-color: var(--primary-color);
      color: var(--primary-color);
    }
    .hint {
      margin: 0;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
  `,Kt([dt({attribute:!1})],Xt.prototype,"hass",2),Kt([pt()],Xt.prototype,"config",2),Xt=Kt([ct(mt)],Xt);var qt=Object.freeze({__proto__:null,get AndroidTVPlusCardEditor(){return Xt}});export{Bt as AndroidTVPlusCard};
