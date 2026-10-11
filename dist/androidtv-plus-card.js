const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),a=new WeakMap;let s=class{constructor(t,e,a){if(this._$cssResult$=!0,a!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=a.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&a.set(i,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const a=1===t.length?t[0]:e.reduce((e,i,a)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[a+1],t[0]);return new s(a,t,i)},o=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:n,defineProperty:c,getOwnPropertyDescriptor:p,getOwnPropertyNames:l,getOwnPropertySymbols:d,getPrototypeOf:h}=Object,u=globalThis,v=u.trustedTypes,m=v?v.emptyScript:"",f=u.reactiveElementPolyfillSupport,g=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},x=(t,e)=>!n(t,e),y={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:x};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(t,i,e);void 0!==a&&c(this.prototype,t,a)}}static getPropertyDescriptor(t,e,i){const{get:a,set:s}=p(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:a,set(e){const r=a?.call(this);s?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(g("elementProperties")))return;const t=h(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(g("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g("properties"))){const t=this.properties,e=[...l(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,a)=>{if(e)i.adoptedStyleSheets=a.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of a){const a=document.createElement("style"),s=t.litNonce;void 0!==s&&a.setAttribute("nonce",s),a.textContent=e.cssText,i.appendChild(a)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),a=this.constructor._$Eu(t,i);if(void 0!==a&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(a):this.setAttribute(a,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,a=i._$Eh.get(t);if(void 0!==a&&this._$Em!==a){const t=i.getPropertyOptions(a),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=a;const r=s.fromAttribute(e,t.type);this[a]=r??this._$Ej?.get(a)??r,this._$Em=null}}requestUpdate(t,e,i,a=!1,s){if(void 0!==t){const r=this.constructor;if(!1===a&&(s=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??x)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:a,wrapped:s},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==s||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===a&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,a=this[e];!0!==t||this._$AL.has(e)||void 0===a||this.C(e,void 0,i,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[g("elementProperties")]=new Map,$[g("finalized")]=new Map,f?.({ReactiveElement:$}),(u.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,k=t=>t,_=w.trustedTypes,A=_?_.createPolicy("lit-html",{createHTML:t=>t}):void 0,T="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,S="?"+E,O=`<${S}>`,P=document,C=()=>P.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,D=Array.isArray,R="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,z=/>/g,j=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,H=/"/g,Y=/^(?:script|style|textarea|title)$/i,F=(t,...e)=>({_$litType$:1,strings:t,values:e}),I=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),V=new WeakMap,X=P.createTreeWalker(P,129);function W(t,e){if(!D(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const B=(t,e)=>{const i=t.length-1,a=[];let s,r=2===e?"<svg>":3===e?"<math>":"",o=N;for(let e=0;e<i;e++){const i=t[e];let n,c,p=-1,l=0;for(;l<i.length&&(o.lastIndex=l,c=o.exec(i),null!==c);)l=o.lastIndex,o===N?"!--"===c[1]?o=U:void 0!==c[1]?o=z:void 0!==c[2]?(Y.test(c[2])&&(s=RegExp("</"+c[2],"g")),o=j):void 0!==c[3]&&(o=j):o===j?">"===c[0]?(o=s??N,p=-1):void 0===c[1]?p=-2:(p=o.lastIndex-c[2].length,n=c[1],o=void 0===c[3]?j:'"'===c[3]?H:L):o===H||o===L?o=j:o===U||o===z?o=N:(o=j,s=void 0);const d=o===j&&t[e+1].startsWith("/>")?" ":"";r+=o===N?i+O:p>=0?(a.push(n),i.slice(0,p)+T+i.slice(p)+E+d):i+E+(-2===p?e:d)}return[W(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),a]};class q{constructor({strings:t,_$litType$:e},i){let a;this.parts=[];let s=0,r=0;const o=t.length-1,n=this.parts,[c,p]=B(t,e);if(this.el=q.createElement(c,i),X.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(a=X.nextNode())&&n.length<o;){if(1===a.nodeType){if(a.hasAttributes())for(const t of a.getAttributeNames())if(t.endsWith(T)){const e=p[r++],i=a.getAttribute(t).split(E),o=/([.?@])?(.*)/.exec(e);n.push({type:1,index:s,name:o[2],strings:i,ctor:"."===o[1]?tt:"?"===o[1]?et:"@"===o[1]?it:Z}),a.removeAttribute(t)}else t.startsWith(E)&&(n.push({type:6,index:s}),a.removeAttribute(t));if(Y.test(a.tagName)){const t=a.textContent.split(E),e=t.length-1;if(e>0){a.textContent=_?_.emptyScript:"";for(let i=0;i<e;i++)a.append(t[i],C()),X.nextNode(),n.push({type:2,index:++s});a.append(t[e],C())}}}else if(8===a.nodeType)if(a.data===S)n.push({type:2,index:s});else{let t=-1;for(;-1!==(t=a.data.indexOf(E,t+1));)n.push({type:7,index:s}),t+=E.length-1}s++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,a){if(e===I)return e;let s=void 0!==a?i._$Co?.[a]:i._$Cl;const r=M(e)?void 0:e._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),void 0===r?s=void 0:(s=new r(t),s._$AT(t,i,a)),void 0!==a?(i._$Co??=[])[a]=s:i._$Cl=s),void 0!==s&&(e=Q(t,s._$AS(t,e.values),s,a)),e}class J{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,a=(t?.creationScope??P).importNode(e,!0);X.currentNode=a;let s=X.nextNode(),r=0,o=0,n=i[0];for(;void 0!==n;){if(r===n.index){let e;2===n.type?e=new G(s,s.nextSibling,this,t):1===n.type?e=new n.ctor(s,n.name,n.strings,this,t):6===n.type&&(e=new at(s,this,t)),this._$AV.push(e),n=i[++o]}r!==n?.index&&(s=X.nextNode(),r++)}return X.currentNode=P,a}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class G{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,a){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),M(t)?t===K||null==t||""===t?(this._$AH!==K&&this._$AR(),this._$AH=K):t!==this._$AH&&t!==I&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>D(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==K&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,a="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=q.createElement(W(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(e);else{const t=new J(a,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new q(t)),e}k(t){D(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,a=0;for(const s of t)a===e.length?e.push(i=new G(this.O(C()),this.O(C()),this,this.options)):i=e[a],i._$AI(s),a++;a<e.length&&(this._$AR(i&&i._$AB.nextSibling,a),e.length=a)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Z{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,a,s){this.type=1,this._$AH=K,this._$AN=void 0,this.element=t,this.name=e,this._$AM=a,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=K}_$AI(t,e=this,i,a){const s=this.strings;let r=!1;if(void 0===s)t=Q(this,t,e,0),r=!M(t)||t!==this._$AH&&t!==I,r&&(this._$AH=t);else{const a=t;let o,n;for(t=s[0],o=0;o<s.length-1;o++)n=Q(this,a[i+o],e,o),n===I&&(n=this._$AH[o]),r||=!M(n)||n!==this._$AH[o],n===K?t=K:t!==K&&(t+=(n??"")+s[o+1]),this._$AH[o]=n}r&&!a&&this.j(t)}j(t){t===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Z{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===K?void 0:t}}class et extends Z{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==K)}}class it extends Z{constructor(t,e,i,a,s){super(t,e,i,a,s),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??K)===I)return;const i=this._$AH,a=t===K&&i!==K||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==K&&(i===K||a);a&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class at{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const st=w.litHtmlPolyfillSupport;st?.(q,G),(w.litHtmlVersions??=[]).push("3.3.3");const rt=globalThis;class ot extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const a=i?.renderBefore??e;let s=a._$litPart$;if(void 0===s){const t=i?.renderBefore??null;a._$litPart$=s=new G(e.insertBefore(C(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return I}}ot._$litElement$=!0,ot.finalized=!0,rt.litElementHydrateSupport?.({LitElement:ot});const nt=rt.litElementPolyfillSupport;nt?.({LitElement:ot}),(rt.litElementVersions??=[]).push("4.2.2");const ct=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:x},lt=(t=pt,e,i)=>{const{kind:a,metadata:s}=i;let r=globalThis.litPropertyMetadata.get(s);if(void 0===r&&globalThis.litPropertyMetadata.set(s,r=new Map),"setter"===a&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===a){const{name:a}=i;return{set(i){const s=e.get.call(this);e.set.call(this,i),this.requestUpdate(a,s,t,!0,i)},init(e){return void 0!==e&&this.C(a,void 0,t,e),e}}}if("setter"===a){const{name:a}=i;return function(i){const s=this[a];e.call(this,i),this.requestUpdate(a,s,t,!0,i)}}throw Error("Unsupported decorator location: "+a)};function dt(t){return(e,i)=>"object"==typeof i?lt(t,e,i):((t,e,i)=>{const a=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),a?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ht(t){return dt({...t,state:!0,attribute:!1})}function ut(t,e){return(e,i,a)=>((t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i))(e,i,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}const vt="androidtv-plus-card",mt="androidtv-plus-card-editor",ft="DPAD_UP",gt="DPAD_DOWN",bt="DPAD_LEFT",xt="DPAD_RIGHT",yt="DPAD_CENTER",$t="atv-key",wt="atv-text",kt="atv-activity";function _t(t,e,i){t.dispatchEvent(new CustomEvent(e,{detail:i,bubbles:!0,composed:!0}))}const At=(t,e)=>_t(t,$t,{key:e}),Tt=(t,e)=>_t(t,wt,{text:e});class Et{constructor(t){this.onFire=t}start(){this.stop(),this.onFire(),this.timeout=window.setTimeout(()=>{this.interval=window.setInterval(()=>this.onFire(),150)},450)}stop(){void 0!==this.timeout&&(clearTimeout(this.timeout),this.timeout=void 0),void 0!==this.interval&&(clearInterval(this.interval),this.interval=void 0)}}Object.getOwnPropertyDescriptor;let St=class extends ot{constructor(){super(...arguments),this.repeater=new Et(()=>{this.activeKey&&At(this,this.activeKey)})}press(t){this.activeKey=t,this.repeater.start()}release(){this.activeKey=void 0,this.repeater.stop()}button(t,e,i){return F`
      <button
        class="btn"
        data-key=${t}
        aria-label=${i}
        @pointerdown=${e=>{e.preventDefault();try{e.target.setPointerCapture(e.pointerId)}catch{}this.press(t)}}
        @pointerup=${()=>this.release()}
        @pointercancel=${()=>this.release()}
        @pointerleave=${()=>this.release()}
        @contextmenu=${t=>t.preventDefault()}
      >
        <ha-icon icon=${e}></ha-icon>
      </button>
    `}render(){return F`
      <div class="pad">
        <span></span>
        ${this.button(ft,"mdi:chevron-up","Up")}
        <span></span>
        ${this.button(bt,"mdi:chevron-left","Left")}
        ${this.button(yt,"mdi:circle-medium","Select")}
        ${this.button(xt,"mdi:chevron-right","Right")}
        <span></span>
        ${this.button(gt,"mdi:chevron-down","Down")}
        <span></span>
      </div>
    `}};St.styles=r`
    :host {
      display: block;
    }
    .pad {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
      gap: 4px;
      width: 244px;
      max-width: 100%;
      aspect-ratio: 1;
      margin: 0 auto;
      padding: 10px;
      border-radius: 50%;
      background: radial-gradient(circle at 50% 28%, var(--atv-surface-2), var(--atv-surface) 74%);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.07),
        inset 0 -10px 26px -14px rgba(0, 0, 0, 0.5),
        0 12px 26px -18px rgba(0, 0, 0, 0.7);
    }
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      color: var(--atv-text-dim);
      background: transparent;
      transition:
        background 120ms ease,
        color 120ms ease,
        transform 90ms ease;
      touch-action: none;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
    }
    .btn:hover {
      background: var(--atv-surface-2);
      color: var(--atv-text);
    }
    .btn:active {
      background: var(--atv-accent);
      color: var(--atv-on-accent);
      transform: scale(0.9);
    }
    .btn ha-icon {
      --mdc-icon-size: 30px;
    }
    .btn[data-key='DPAD_CENTER'] {
      margin: 6px;
      color: var(--atv-on-accent);
      background: linear-gradient(
        145deg,
        color-mix(in srgb, var(--atv-accent) 78%, #ffffff 22%),
        var(--atv-accent)
      );
      box-shadow:
        0 8px 18px -10px var(--atv-accent),
        inset 0 1px 0 rgba(255, 255, 255, 0.25);
    }
    .btn[data-key='DPAD_CENTER']:hover {
      background: linear-gradient(
        145deg,
        color-mix(in srgb, var(--atv-accent) 70%, #ffffff 30%),
        var(--atv-accent)
      );
      filter: brightness(1.04);
    }
    .btn[data-key='DPAD_CENTER']:active {
      transform: scale(0.92);
    }
    .btn[data-key='DPAD_CENTER'] ha-icon {
      --mdc-icon-size: 40px;
    }
  `,St=((t,e)=>{for(var i,a=e,s=t.length-1;s>=0;s--)(i=t[s])&&(a=i(a)||a);return a})([ct("atv-dpad")],St);var Ot=Object.defineProperty,Pt=Object.getOwnPropertyDescriptor,Ct=(t,e,i,a)=>{for(var s,r=a>1?void 0:a?Pt(e,i):e,o=t.length-1;o>=0;o--)(s=t[o])&&(r=(a?s(e,i,r):s(r))||r);return a&&r&&Ot(e,i,r),r};let Mt=class extends ot{constructor(){super(...arguments),this.pressed=!1,this.padDir=null,this.okFlash=!1,this.tap=null,this.tapId=0,this.originX=0,this.originY=0,this.lastX=0,this.lastY=0,this.originLX=0,this.originLY=0,this.moved=!1,this.centerX=0,this.centerY=0,this.maxR=0,this.pos={x:0,y:0},this.vel={x:0,y:0},this.target={x:0,y:0},this.lastT=0,this.raf=0,this.step=t=>{this.lastT||(this.lastT=t);let e=(t-this.lastT)/1e3;this.lastT=t,e=Math.min(e,.05);const i=-600*(this.pos.x-this.target.x)-34*this.vel.x,a=-600*(this.pos.y-this.target.y)-34*this.vel.y;if(this.vel.x+=i*e,this.vel.y+=a*e,this.pos.x+=this.vel.x*e,this.pos.y+=this.vel.y*e,this.applyKnob(),Math.abs(this.vel.x)<1.5&&Math.abs(this.vel.y)<1.5&&Math.abs(this.pos.x-this.target.x)<.3&&Math.abs(this.pos.y-this.target.y)<.3&&!this.pressed)return this.pos.x=this.target.x,this.pos.y=this.target.y,this.vel.x=0,this.vel.y=0,this.applyKnob(),void(this.raf=0);this.raf=requestAnimationFrame(this.step)},this.onClick=t=>{this.pressed=!0,this.moved=!1,this.originX=this.lastX=t.clientX,this.originY=this.lastY=t.clientY;const e=t.currentTarget.getBoundingClientRect();this.centerX=e.left+e.width/2,this.centerY=e.top+e.height/2,this.maxR=e.width/2*.66,this.originLX=t.clientX-e.left,this.originLY=t.clientY-e.top,this.setTarget(t.clientX,t.clientY),this.reduceMotion||this.startLoop();try{t.currentTarget.setPointerCapture(t.pointerId)}catch{}}}get reduceMotion(){return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1}disconnectedCallback(){super.disconnectedCallback(),cancelAnimationFrame(this.raf),clearTimeout(this.okTimer),clearTimeout(this.tapTimer)}clampToRadius(t,e){const i=Math.hypot(t,e);return i>this.maxR&&i>0?{x:t/i*this.maxR,y:e/i*this.maxR}:{x:t,y:e}}setTarget(t,e){const{x:i,y:a}=this.clampToRadius(t-this.centerX,e-this.centerY);this.target.x=i,this.target.y=a;const s=Math.hypot(i,a);this.padDir=this.pressed&&s>.5*this.maxR?Math.abs(i)>=Math.abs(a)?i>0?"right":"left":a>0?"down":"up":null,this.reduceMotion&&(this.pos.x=i,this.pos.y=a,this.vel.x=0,this.vel.y=0,this.applyKnob())}startLoop(){this.lastT=0,this.raf||(this.raf=requestAnimationFrame(this.step))}applyKnob(){const t=this.knobEl;if(!t)return;const e=Math.hypot(this.vel.x,this.vel.y),i=Math.max(-14,Math.min(14,.05*-this.vel.x)),a=1+Math.min(.12,9e-4*e);if(t.style.transform=`translate(${Math.round(this.pos.x)}px, ${Math.round(this.pos.y)}px) rotate(${i.toFixed(2)}deg) scale(${a.toFixed(3)})`,this.trailEl){const t=Math.max(-10,Math.min(10,.012*-this.vel.x)),i=Math.max(-10,Math.min(10,.012*-this.vel.y));this.trailEl.style.transform=`translate(${t.toFixed(1)}px, ${i.toFixed(1)}px)`,this.trailEl.style.opacity=String(Math.min(.5,e/2600))}}onMove(t){if(!this.pressed)return;this.setTarget(t.clientX,t.clientY);const e=t.clientX-this.lastX,i=t.clientY-this.lastY;if(Math.hypot(t.clientX-this.originX,t.clientY-this.originY)>18&&(this.moved=!0),Math.hypot(e,i)<34)return;const a=Math.abs(e)>=Math.abs(i)?e>0?xt:bt:i>0?gt:ft;At(this,a),this.lastX=t.clientX,this.lastY=t.clientY}flashOk(){this.okFlash=!1,requestAnimationFrame(()=>{this.okFlash=!0}),clearTimeout(this.okTimer),this.okTimer=setTimeout(()=>{this.okFlash=!1},460)}fireTap(){this.tap={x:this.originLX,y:this.originLY,id:++this.tapId},clearTimeout(this.tapTimer),this.tapTimer=setTimeout(()=>{this.tap=null},520)}onUp(){this.pressed&&!this.moved&&(At(this,yt),this.flashOk(),this.fireTap()),this.pressed=!1,this.padDir=null,this.target.x=0,this.target.y=0,this.reduceMotion?(this.pos.x=0,this.pos.y=0,this.vel.x=0,this.vel.y=0,this.applyKnob()):this.startLoop()}updated(){this.applyKnob()}render(){return F`
      <div
        class="pad ${this.pressed?"pressed":""}"
        role="button"
        aria-label="Touch remote"
        @pointerdown=${this.onClick}
        @pointermove=${this.onMove}
        @pointerup=${this.onUp}
        @pointercancel=${this.onUp}
        @contextmenu=${t=>t.preventDefault()}
      >
        <span class="dir up ${"up"===this.padDir?"active":""}"><ha-icon icon="mdi:chevron-up"></ha-icon></span>
        <span class="dir down ${"down"===this.padDir?"active":""}"><ha-icon icon="mdi:chevron-down"></ha-icon></span>
        <span class="dir left ${"left"===this.padDir?"active":""}"><ha-icon icon="mdi:chevron-left"></ha-icon></span>
        <span class="dir right ${"right"===this.padDir?"active":""}"><ha-icon icon="mdi:chevron-right"></ha-icon></span>

        <div class="knob ${this.okFlash?"ok":""}">
          <div class="trail"></div>
          <div class="ripple"></div>
          <div class="ball"><ha-icon icon="mdi:circle-medium"></ha-icon></div>
        </div>

        ${this.tap?F`<span
              class="tap"
              style="left:${this.tap.x}px; top:${this.tap.y}px"
              data-tap=${this.tap.id}
            ></span>`:K}
      </div>
    `}};Mt.styles=r`
    :host {
      display: block;
    }
    .pad {
      position: relative;
      width: 244px;
      max-width: 100%;
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
      background:
        radial-gradient(circle at 50% 12%, rgba(255, 255, 255, 0.35), transparent 42%),
        radial-gradient(circle at 50% 28%, var(--atv-surface-2), var(--atv-surface) 74%);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.5),
        inset 0 0 0 1px color-mix(in srgb, var(--atv-line) 60%, transparent),
        inset 0 -10px 26px -14px rgba(0, 0, 0, 0.5),
        0 12px 26px -18px rgba(0, 0, 0, 0.7);
      transition:
        transform 90ms ease,
        box-shadow 150ms ease;
    }
    /* Slow sheen that keeps the surface feeling alive at rest. */
    .pad::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 50%;
      pointer-events: none;
      background: conic-gradient(
        from 0deg,
        transparent 0deg,
        color-mix(in srgb, var(--atv-accent) 14%, transparent) 55deg,
        transparent 130deg,
        transparent 360deg
      );
      opacity: 0.5;
      animation: pad-sheen 26s linear infinite;
    }
    .pad::before {
      content: '';
      position: absolute;
      inset: 15%;
      border-radius: 50%;
      border: 1px solid var(--atv-line);
      opacity: 0.7;
    }
    .pad.pressed {
      transform: scale(0.985);
      box-shadow:
        inset 0 0 0 2px color-mix(in srgb, var(--atv-accent) 45%, transparent),
        inset 0 -10px 26px -14px rgba(0, 0, 0, 0.5),
        0 12px 26px -18px rgba(0, 0, 0, 0.7);
    }
    .dir {
      position: absolute;
      display: flex;
      color: var(--atv-text-dim);
      opacity: 0.18;
      pointer-events: none;
      transition:
        opacity 150ms ease,
        color 150ms ease,
        transform 150ms ease,
        filter 150ms ease;
    }
    .dir ha-icon {
      --mdc-icon-size: 20px;
    }
    .dir.active {
      opacity: 1;
      color: var(--atv-accent);
      filter: drop-shadow(0 0 6px color-mix(in srgb, var(--atv-accent) 60%, transparent));
    }
    .dir.up {
      top: 9px;
      left: 50%;
      transform: translateX(-50%);
    }
    .dir.down {
      bottom: 9px;
      left: 50%;
      transform: translateX(-50%);
    }
    .dir.left {
      left: 9px;
      top: 50%;
      transform: translateY(-50%);
    }
    .dir.right {
      right: 9px;
      top: 50%;
      transform: translateY(-50%);
    }
    .dir.up.active {
      transform: translateX(-50%) translateY(-2px);
    }
    .dir.down.active {
      transform: translateX(-50%) translateY(2px);
    }
    .dir.left.active {
      transform: translateY(-50%) translateX(-2px);
    }
    .dir.right.active {
      transform: translateY(-50%) translateX(2px);
    }
    .knob {
      position: relative;
      width: 34%;
      aspect-ratio: 1;
      pointer-events: none;
      will-change: transform;
    }
    .trail {
      position: absolute;
      inset: 0;
      z-index: 0;
      border-radius: 50%;
      opacity: 0;
      background: var(--atv-accent);
      filter: blur(8px);
      transition:
        opacity 140ms ease,
        transform 140ms ease;
    }
    .ball {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      --mdc-icon-size: 34px;
      color: var(--atv-on-accent);
      background: linear-gradient(
        145deg,
        color-mix(in srgb, var(--atv-accent) 78%, #ffffff 22%),
        var(--atv-accent)
      );
      box-shadow:
        0 8px 18px -10px var(--atv-accent),
        inset 0 1px 0 rgba(255, 255, 255, 0.4),
        inset 0 -3px 6px -2px rgba(0, 0, 0, 0.35);
    }
    .ripple {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 2px solid var(--atv-accent);
      opacity: 0;
    }
    .tap {
      position: absolute;
      width: 56px;
      height: 56px;
      margin: -28px 0 0 -28px;
      border-radius: 50%;
      border: 2px solid var(--atv-accent);
      pointer-events: none;
      animation: tap-out 500ms ease-out forwards;
    }
    .knob.ok .ball {
      animation: ball-pop 300ms ease-out;
    }
    .knob.ok .ripple {
      animation: ripple-out 420ms ease-out;
    }
    @keyframes ball-pop {
      0% {
        transform: scale(1);
      }
      35% {
        transform: scale(0.82);
      }
      70% {
        transform: scale(1.16);
      }
      100% {
        transform: scale(1);
      }
    }
    @keyframes ripple-out {
      0% {
        transform: scale(0.8);
        opacity: 0.9;
      }
      100% {
        transform: scale(2.4);
        opacity: 0;
      }
    }
    @keyframes tap-out {
      0% {
        transform: scale(0.3);
        opacity: 0.85;
      }
      100% {
        transform: scale(1.5);
        opacity: 0;
      }
    }
    @keyframes pad-sheen {
      to {
        transform: rotate(360deg);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .pad::after,
      .trail {
        animation: none;
        opacity: 0;
      }
      .knob.ok .ball,
      .knob.ok .ripple,
      .tap {
        animation-duration: 1ms;
      }
      .dir,
      .pad {
        transition: none;
      }
    }
  `,Ct([ht()],Mt.prototype,"pressed",2),Ct([ht()],Mt.prototype,"padDir",2),Ct([ht()],Mt.prototype,"okFlash",2),Ct([ht()],Mt.prototype,"tap",2),Ct([ut(".knob")],Mt.prototype,"knobEl",2),Ct([ut(".trail")],Mt.prototype,"trailEl",2),Mt=Ct([ct("atv-touchpad")],Mt);var Dt=Object.defineProperty,Rt=Object.getOwnPropertyDescriptor,Nt=(t,e,i,a)=>{for(var s,r=a>1?void 0:a?Rt(e,i):e,o=t.length-1;o>=0;o--)(s=t[o])&&(r=(a?s(e,i,r):s(r))||r);return a&&r&&Dt(e,i,r),r};let Ut=class extends ot{constructor(){super(...arguments),this.key="",this.icon="",this.label="",this.accent=!1,this.small=!1,this.stretch=!1,this.repeater=new Et(()=>At(this,this.key))}down(t){t.preventDefault();try{t.currentTarget.setPointerCapture(t.pointerId)}catch{}this.repeater.start()}render(){return F`
      <button
        class="btn ${this.accent?"accent":""} ${this.small?"small":""}"
        aria-label=${this.label}
        @pointerdown=${this.down}
        @pointerup=${()=>this.repeater.stop()}
        @pointercancel=${()=>this.repeater.stop()}
        @pointerleave=${()=>this.repeater.stop()}
        @contextmenu=${t=>t.preventDefault()}
      >
        <ha-icon icon=${this.icon}></ha-icon>
      </button>
    `}};Ut.styles=r`
    :host {
      display: block;
    }
    :host([stretch]) {
      flex: 1 1 0;
      min-width: 0;
    }
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 54px;
      height: 54px;
      border: 1px solid var(--atv-line);
      border-radius: 50%;
      cursor: pointer;
      color: var(--atv-text);
      background: var(--atv-surface-2);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.4),
        inset 0 -2px 3px -1px rgba(0, 0, 0, 0.28),
        0 2px 4px -1px rgba(0, 0, 0, 0.45),
        0 8px 16px -12px rgba(0, 0, 0, 0.6);
      transition:
        background 120ms ease,
        color 120ms ease,
        border-color 120ms ease,
        transform 90ms ease,
        box-shadow 120ms ease;
      touch-action: none;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
    }
    .btn:hover {
      background: var(--atv-line);
      transform: translateY(-1px);
    }
    .btn:active {
      transform: translateY(1px) scale(0.98);
      color: var(--atv-on-accent);
      border-color: transparent;
      background: var(--atv-accent);
      box-shadow:
        inset 0 2px 5px rgba(0, 0, 0, 0.45),
        inset 0 -1px 0 rgba(255, 255, 255, 0.15),
        0 0 0 5px color-mix(in srgb, var(--atv-accent) 16%, transparent);
    }
    .btn ha-icon {
      --mdc-icon-size: 22px;
    }
    .btn.small {
      width: 42px;
      height: 42px;
    }
    .btn.small ha-icon {
      --mdc-icon-size: 20px;
    }
    :host([stretch]) .btn {
      width: 100%;
      border-radius: 999px;
    }
    .btn.accent {
      color: var(--atv-on-accent);
      border-color: transparent;
      background: linear-gradient(
        145deg,
        color-mix(in srgb, var(--atv-accent) 78%, #ffffff 22%),
        var(--atv-accent)
      );
      box-shadow:
        0 8px 18px -10px var(--atv-accent),
        inset 0 1px 0 rgba(255, 255, 255, 0.35),
        inset 0 -2px 3px -1px rgba(0, 0, 0, 0.25);
    }
    .btn.accent:hover {
      background: linear-gradient(
        145deg,
        color-mix(in srgb, var(--atv-accent) 70%, #ffffff 30%),
        var(--atv-accent)
      );
      filter: brightness(1.04);
    }
  `,Nt([dt({type:String})],Ut.prototype,"key",2),Nt([dt({type:String})],Ut.prototype,"icon",2),Nt([dt({type:String})],Ut.prototype,"label",2),Nt([dt({type:Boolean})],Ut.prototype,"accent",2),Nt([dt({type:Boolean})],Ut.prototype,"small",2),Nt([dt({type:Boolean,reflect:!0})],Ut.prototype,"stretch",2),Ut=Nt([ct("atv-repeat-button")],Ut);var zt=Object.defineProperty,jt=Object.getOwnPropertyDescriptor,Lt=(t,e,i,a)=>{for(var s,r=a>1?void 0:a?jt(e,i):e,o=t.length-1;o>=0;o--)(s=t[o])&&(r=(a?s(e,i,r):s(r))||r);return a&&r&&zt(e,i,r),r};let Ht=class extends ot{constructor(){super(...arguments),this.mode="append",this.value="",this.sent=""}onInput(t){const e=t.target.value;for(const t of function(t,e,i){if("replace"===i)return 0===e.length?t.length?[{type:"del",count:t.length}]:[]:[{type:"text",text:e}];if(e.length>t.length&&e.startsWith(t))return[{type:"text",text:e.slice(t.length)}];if(t.startsWith(e)){const i=t.length-e.length;return i?[{type:"del",count:i}]:[]}const a=t.length?[{type:"del",count:t.length}]:[];return e&&a.push({type:"text",text:e}),a}(this.sent,e,this.mode))"text"===t.type?Tt(this,t.text):this.deleteChars(t.count);this.sent=e,this.value=e}deleteChars(t){for(let e=0;e<t;e++)At(this,"DEL")}clearField(){this.deleteChars(this.sent.length),this.sent="",this.value="";const t=this.renderRoot.querySelector("input.field");t&&(t.value="")}render(){return F`
      <div class="bar">
        <input
          class="field"
          type="text"
          placeholder="Type on TV…"
          .value=${this.value}
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false"
          @input=${this.onInput}
        />
        <div class="keys">
          <button type="button" class="iconbtn" aria-label="Clear" @click=${()=>this.clearField()}>
            <ha-icon icon="mdi:close-circle-outline"></ha-icon>
          </button>
          <button type="button" class="iconbtn" aria-label="Backspace" @click=${()=>At(this,"DEL")}>
            <ha-icon icon="mdi:backspace-outline"></ha-icon>
          </button>
          <button type="button" class="iconbtn" aria-label="Enter" @click=${()=>At(this,"ENTER")}>
            <ha-icon icon="mdi:keyboard-return"></ha-icon>
          </button>
        </div>
      </div>
    `}};function Yt(t,e){const i=e?.toLowerCase();if(!i)return!1;if(t.package)return t.package.toLowerCase()===i;const a=[t.name,t.activity,t.service].filter(t=>!!t).join(" ").toLowerCase().replace(/[a-z][a-z0-9+.-]*:\/\//g," ").split(/[^a-z0-9]+/).filter(t=>t.length>=4);return a.some(t=>i.includes(t))}Ht.styles=r`
    :host {
      display: block;
    }
    .bar {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .keys {
      display: flex;
      gap: 8px;
    }
    .field {
      width: 100%;
      box-sizing: border-box;
      min-width: 0;
      padding: 12px 14px;
      border-radius: 14px;
      border: 1px solid var(--atv-line);
      background: var(--atv-surface-2);
      color: var(--atv-text);
      font-size: 15px;
      outline: none;
      transition:
        border-color 140ms ease,
        box-shadow 140ms ease;
    }
    .field::placeholder {
      color: var(--atv-text-dim);
    }
    .field:focus {
      border-color: var(--atv-accent);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--atv-accent) 22%, transparent);
    }
    .iconbtn {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1 1 0;
      width: auto;
      min-width: 0;
      height: 46px;
      border: 1px solid var(--atv-line);
      border-radius: 14px;
      cursor: pointer;
      color: var(--atv-text);
      background: var(--atv-surface-2);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.4),
        inset 0 -2px 3px -1px rgba(0, 0, 0, 0.28),
        0 2px 4px -1px rgba(0, 0, 0, 0.45);
      transition:
        background 120ms ease,
        border-color 120ms ease,
        transform 90ms ease,
        box-shadow 120ms ease;
    }
    .iconbtn ha-icon {
      --mdc-icon-size: 22px;
    }
    .iconbtn:hover {
      background: var(--atv-line);
    }
    .iconbtn:active {
      transform: translateY(1px) scale(0.97);
      box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.45);
    }
  `,Lt([dt({type:String})],Ht.prototype,"mode",2),Lt([ht()],Ht.prototype,"value",2),Ht=Lt([ct("atv-keyboard")],Ht);var Ft=Object.defineProperty,It=Object.getOwnPropertyDescriptor,Kt=(t,e,i,a)=>{for(var s,r=a>1?void 0:a?It(e,i):e,o=t.length-1;o>=0;o--)(s=t[o])&&(r=(a?s(e,i,r):s(r))||r);return a&&r&&Ft(e,i,r),r};let Vt=class extends ot{constructor(){super(...arguments),this.apps=[]}render(){const t=!!this.foreground&&this.apps.some(t=>Yt(t,this.foreground));return F`
      <div class="grid">
        ${this.apps.map(e=>{const i=Yt(e,this.foreground);return F`
            <button
              class="tile ${i?"active":""} ${t&&!i?"dim":""}"
              aria-pressed=${i}
              title=${e.name??e.activity??e.service??"App"}
              @click=${()=>((t,e)=>_t(this,kt,{activity:e.activity,service:e.service,data:e.data}))(0,e)}
            >
              <span class="chip"><ha-icon icon=${e.icon??"mdi:application"}></ha-icon></span>
              ${e.name?F`<span class="label">${e.name}</span>`:""}
            </button>
          `})}
      </div>
    `}};Vt.styles=r`
    :host {
      display: block;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(54px, 1fr));
      gap: 8px;
    }
    .tile {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      padding: 10px 4px;
      border: 1px solid var(--atv-line);
      border-radius: 16px;
      cursor: pointer;
      color: var(--atv-text);
      background: var(--atv-surface-2);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.4),
        inset 0 -2px 3px -1px rgba(0, 0, 0, 0.22),
        0 2px 4px -1px rgba(0, 0, 0, 0.4);
      transition:
        background 120ms ease,
        transform 90ms ease,
        box-shadow 120ms ease;
    }
    .tile:hover {
      background: var(--atv-line);
      transform: translateY(-2px);
      box-shadow: 0 8px 18px -12px rgba(0, 0, 0, 0.6);
    }
    .tile:active {
      transform: translateY(1px) scale(0.98);
      box-shadow:
        inset 0 2px 5px rgba(0, 0, 0, 0.4),
        inset 0 -1px 0 rgba(255, 255, 255, 0.12);
    }
    .tile.dim {
      opacity: 0.5;
    }
    .tile.active {
      border-color: var(--atv-accent);
      box-shadow:
        0 0 0 2px color-mix(in srgb, var(--atv-accent) 45%, transparent),
        0 8px 18px -12px rgba(0, 0, 0, 0.6);
    }
    .tile.active .label {
      color: var(--atv-accent);
    }
    .chip {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      border-radius: 12px;
      color: var(--atv-on-accent);
      background: linear-gradient(
        145deg,
        color-mix(in srgb, var(--atv-accent) 78%, #ffffff 22%),
        var(--atv-accent)
      );
      box-shadow: 0 6px 14px -8px var(--atv-accent);
    }
    .chip ha-icon {
      --mdc-icon-size: 22px;
    }
    .label {
      font-size: 10.5px;
      font-weight: 500;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--atv-text-dim);
    }
  `,Kt([dt({attribute:!1})],Vt.prototype,"apps",2),Kt([dt({attribute:!1})],Vt.prototype,"foreground",2),Vt=Kt([ct("atv-app-grid")],Vt);var Xt=Object.defineProperty,Wt=Object.getOwnPropertyDescriptor,Bt=(t,e,i,a)=>{for(var s,r=a>1?void 0:a?Wt(e,i):e,o=t.length-1;o>=0;o--)(s=t[o])&&(r=(a?s(e,i,r):s(r))||r);return a&&r&&Xt(e,i,r),r};console.info(`%c ${vt} %c 0.2.0 `,"color: white; background: #4285f4; font-weight: 700; border-radius: 3px 0 0 3px;","color: white; background: #34a853; font-weight: 700; border-radius: 0 3px 3px 0;");let qt=class extends ot{constructor(){super(),this.mode="both",this.surface="touch",this.keyboardOpen=!1,this.appsOpen=!1,this.volumeOpen=!1,this.pickerOpen=!1,this.tick=0,this.sendQueue=[],this.sending=!1,this.onKey=t=>this.sendKey(t.detail.key),this.onText=t=>this.sendText(t.detail.text),this.onActivity=t=>{const{activity:e,service:i,data:a}=t.detail;if(i){const[t,...e]=i.split(".");return void this.callService(t,e.join("."),a??{},{entity_id:this.target?.entity??this.config.entity})}e&&this.launchActivity(e)},this.addEventListener($t,this.onKey),this.addEventListener(wt,this.onText),this.addEventListener(kt,this.onActivity)}updated(){this.hasProgress&&void 0===this.progressTimer?this.progressTimer=window.setInterval(()=>{this.tick++},1e3):this.hasProgress||void 0===this.progressTimer||(window.clearInterval(this.progressTimer),this.progressTimer=void 0)}disconnectedCallback(){super.disconnectedCallback(),void 0!==this.progressTimer&&(window.clearInterval(this.progressTimer),this.progressTimer=void 0)}static async getConfigElement(){return await Promise.resolve().then(function(){return te}),document.createElement(mt)}static getStubConfig(t){const e=Object.keys(t.states).find(t=>t.startsWith("remote."));return{type:`custom:${vt}`,entity:e??"remote.living_room_tv",mode:"both",apps:[]}}setConfig(t){if(!t.entity||!t.entity.startsWith("remote."))throw new Error("You must specify a `remote.` entity from the androidtv_remote integration.");this.config={mode:"both",show_power:!0,show_volume:!0,show_media:!0,show_keyboard:!0,haptic_feedback:!0,...t},this.mode=this.config.mode??"both",this.surface="dpad"===this.mode?"dpad":"touch";const e=this.targets,i=this.activeEntity??this.readStoredTarget();this.activeEntity=i&&e.some(t=>t.entity===i)?i:e[0]?.entity}readStoredTarget(){try{return localStorage.getItem(qt.STORAGE_KEY)??void 0}catch{return}}storeTarget(t){try{localStorage.setItem(qt.STORAGE_KEY,t)}catch{}}getCardSize(){let t=9;return this.apps?.length&&(t+=2),this.config?.show_keyboard&&(t+=1),t}onDrawerClick(t){t.target===t.currentTarget&&(this.appsOpen=!1,this.volumeOpen=!1)}get remoteState(){const t=this.target?.entity;return t?this.hass?.states[t]:void 0}get targets(){return this.config?function(t){const e=new Set,i=[],a=[t.entity,...t.entities??[]];for(const s of a){const a="string"==typeof s?{entity:s}:{...s};a.entity?.startsWith("remote.")&&!e.has(a.entity)&&(e.add(a.entity),a.entity===t.entity&&(a.media_player??=t.media_player,a.text_mode??=t.text_mode,a.apps??=t.apps),i.push(a))}return i}(this.config):[]}get target(){const t=this.targets;return t.find(t=>t.entity===this.activeEntity)??t[0]}get apps(){return this.target?.apps??this.config?.apps??[]}get textMode(){return this.target?.text_mode??this.config?.text_mode??"append"}nameFor(t){return t.name??this.hass?.states[t.entity]?.attributes.friendly_name??t.entity}selectTarget(t){this.activeEntity=t,this.storeTarget(t),this.pickerOpen=!1,this.keyboardOpen=!1,this.vibrate()}get isOn(){return"on"===this.remoteState?.state}get companionMediaPlayer(){const t=this.target;if(!t)return;if(t.media_player)return t.media_player;const e=`media_player.${t.entity.replace(/^remote\./,"")}`;return this.hass?.states[e]?e:void 0}get mediaState(){const t=this.companionMediaPlayer;return t?this.hass?.states[t]:void 0}get offline(){return"offline"===this.statusKind}get controlsDisabled(){return!this.isOn}get foregroundPackage(){const t=this.mediaState?.attributes?.app_id,e=this.remoteState?.attributes?.current_activity;return"string"==typeof t&&t||"string"==typeof e&&e||void 0}get activeAppName(){const t=this.foregroundPackage;if(t)return this.apps.find(e=>Yt(e,t))?.name||void 0}prettyApp(t){if(!t)return;let e=t;for(const t of["com.google.android.apps.tv.","com.google.android.","com.android.","android."])if(e.toLowerCase().startsWith(t)){e=e.slice(t.length)||e;break}return{launcherx:"Home",launcher:"Home",leanback:"Home",tvlauncher:"Home",dreamx:"Screensaver"}[e.toLowerCase()]||e.charAt(0).toUpperCase()+e.slice(1)}get nowPlaying(){const t=this.mediaState;if(!t||"off"===t.state||"unavailable"===t.state)return null;const e="string"==typeof t.attributes.media_title?t.attributes.media_title:"",i="string"==typeof t.attributes.media_artist?t.attributes.media_artist:"",a="string"==typeof t.attributes.app_name?t.attributes.app_name:"",s=this.activeAppName||this.prettyApp(a)||(this.isOn?this.activityLabel:""),r=e||s;return r?{primary:r,secondary:(e?i||s:"")||void 0,progress:this.mediaProgress(t)}:null}mediaProgress(t){this.tick;const e=t.attributes.media_duration;let i=t.attributes.media_position;if(!("number"!=typeof e||e<=0||"number"!=typeof i)){if("playing"===t.state){const e=t.attributes.media_position_updated_at,a="string"==typeof e?Date.parse(e):NaN;Number.isNaN(a)||(i+=Math.max(0,(Date.now()-a)/1e3))}return Math.min(1,Math.max(0,i/e))}}get hasProgress(){const t=this.mediaState;return"playing"===t?.state&&"number"==typeof t.attributes.media_duration&&"number"==typeof t.attributes.media_position}get statusKind(){const t=this.remoteState?.state;return t&&"unavailable"!==t&&"unknown"!==t?this.isOn?"on":"off":"offline"}get keyboardVisible(){return!!this.config?.show_keyboard&&this.keyboardOpen}vibrate(){this.config.haptic_feedback&&navigator.vibrate?.(8)}callService(t,e,i,a){this.sendQueue.push({domain:t,service:e,data:i,entity_id:a?.entity_id??this.target?.entity??this.config.entity}),this.pumpQueue()}async pumpQueue(){if(!this.sending){this.sending=!0;try{let t=this.sendQueue.shift();for(;t;){try{await this.hass.callService(t.domain,t.service,t.data,{entity_id:t.entity_id})}catch(e){console.warn(`[androidtv-plus] ${t.domain}.${t.service} failed`,e)}t=this.sendQueue.shift()}}finally{this.sending=!1}}}sendKey(t){this.vibrate(),this.callService("remote","send_command",{command:t})}sendText(t){this.callService("remote","send_command",{command:`text:${t}`})}launchActivity(t){this.callService("remote","turn_on",{activity:t})}get cardTitle(){return this.targets.length>1&&this.target?this.nameFor(this.target):this.config.name??(this.target?this.nameFor(this.target):"Android TV")}get activityLabel(){const t=this.remoteState?.attributes.current_activity;if(!t)return"Idle";const e=t.split(".").pop()??t;return e.charAt(0).toUpperCase()+e.slice(1)}get statusText(){return"offline"===this.statusKind?"on"===this.mediaState?.state?"Reconnecting…":"Unavailable":this.isOn?this.activeAppName||this.prettyApp(this.foregroundPackage)||this.activityLabel:"Off"}get statusTitle(){const t=this.remoteState;if(!t)return`${this.target?.entity??""} — not found`;const e=t.last_updated?new Date(t.last_updated).toLocaleString():"unknown";return`${this.target?.entity??""}\nstate: ${t.state}\nupdated: ${e}`}renderSegmented(){return"both"!==this.config.mode?K:F`
      <div class="segmented" role="tablist">
        <button
          role="tab"
          aria-label="Touch"
          title="Touch"
          class=${"touch"===this.surface?"active":""}
          @click=${()=>this.surface="touch"}
        >
          <ha-icon icon="mdi:gesture-tap"></ha-icon>
        </button>
        <button
          role="tab"
          aria-label="D-pad"
          title="D-pad"
          class=${"dpad"===this.surface?"active":""}
          @click=${()=>this.surface="dpad"}
        >
          <ha-icon icon="mdi:gamepad-variant-outline"></ha-icon>
        </button>
      </div>
    `}renderSurface(){const t="dpad"===this.surface&&"touch"!==this.config.mode,e="touch"===this.surface&&"dpad"!==this.config.mode;return F`
      ${t?F`<atv-dpad></atv-dpad>`:K}
      ${e?F`<atv-touchpad></atv-touchpad>`:K}
    `}renderTransport(){return F`
      <div class="transport">
        <atv-repeat-button stretch .key=${"MEDIA_REWIND"} icon="mdi:rewind" label="Rewind"></atv-repeat-button>
        <atv-repeat-button stretch .key=${"MEDIA_PLAY_PAUSE"} icon="mdi:play-pause" label="Play/Pause" accent></atv-repeat-button>
        <atv-repeat-button stretch .key=${"MEDIA_FAST_FORWARD"} icon="mdi:fast-forward" label="Fast forward"></atv-repeat-button>
      </div>
    `}renderSecondary(){return F`
      <div class="secondary">
        <atv-repeat-button stretch .key=${"MENU"} icon="mdi:menu" label="Menu" small></atv-repeat-button>
        <atv-repeat-button stretch .key=${"SEARCH"} icon="mdi:magnify" label="Search" small></atv-repeat-button>
        ${this.apps.length?F`<button
              class="round small grow ${this.appsOpen?"on":""}"
              aria-label="Apps"
              title="Apps"
              @click=${()=>{this.appsOpen=!this.appsOpen,this.appsOpen&&(this.keyboardOpen=!1,this.volumeOpen=!1)}}
            >
              <ha-icon icon="mdi:apps"></ha-icon>
            </button>`:K}
      </div>
    `}render(){return this.config&&this.hass?F`
      <ha-card>
        <div class="remote ${this.controlsDisabled?"controls-off":""} ${this.offline?"offline":""}">
          ${this.pickerOpen?F`<div class="picker-backdrop" @click=${()=>this.pickerOpen=!1}></div>`:K}
          <header class="hero">
            <div class="device">
              <div class="device-icon"><ha-icon icon="mdi:television"></ha-icon></div>
              <div class="meta">
                ${this.targets.length>1?F`<div class="picker">
                      <button
                        class="title pick"
                        aria-haspopup="listbox"
                        aria-expanded=${this.pickerOpen?"true":"false"}
                        title="Choose TV"
                        @click=${()=>this.pickerOpen=!this.pickerOpen}
                      >
                        <span>${this.cardTitle}</span>
                        <ha-icon icon="mdi:chevron-down"></ha-icon>
                      </button>
                      ${this.pickerOpen?F`<div class="picker-list" role="listbox" aria-label="TV">
                            ${this.targets.map(t=>F`<button
                                role="option"
                                aria-selected=${t.entity===this.target.entity?"true":"false"}
                                class=${t.entity===this.target.entity?"sel":""}
                                @click=${()=>this.selectTarget(t.entity)}
                              >
                                <ha-icon
                                  icon=${t.entity===this.target.entity?"mdi:check":"mdi:television"}
                                ></ha-icon>
                                <span>${this.nameFor(t)}</span>
                              </button>`)}
                          </div>`:K}
                    </div>`:F`<div class="title">${this.cardTitle}</div>`}
                <div class="status ${this.statusKind}" title=${this.statusTitle}>
                  <span class="dot"></span>
                  <span>${this.statusText}</span>
                </div>
              </div>
            </div>
            ${this.config.show_power?F`<atv-repeat-button .key=${"POWER"} icon="mdi:power" label="Power" accent></atv-repeat-button>`:K}
          </header>

          <div class="navrow">
            ${this.config.show_keyboard?F`<button
                  class="round lead ${this.keyboardOpen?"on":"dim"}"
                  aria-label="Keyboard"
                  title="Keyboard"
                  @click=${()=>{this.keyboardOpen=!this.keyboardOpen,this.keyboardOpen&&(this.appsOpen=!1,this.volumeOpen=!1)}}
                >
                  <ha-icon icon="mdi:keyboard"></ha-icon>
                </button>`:F`<span></span>`}
            ${this.renderSegmented()}
            ${!1!==this.config.show_volume?F`<button
                  class="round ${this.volumeOpen?"on":""}"
                  aria-label="Volume"
                  title="Volume"
                  @click=${()=>{this.volumeOpen=!this.volumeOpen,this.volumeOpen&&(this.keyboardOpen=!1,this.appsOpen=!1)}}
                >
                  <ha-icon icon="mdi:volume-high"></ha-icon>
                </button>`:F`<span></span>`}
          </div>

          ${this.keyboardVisible?F`<div class="kbd-inline">
                <atv-keyboard .mode=${this.textMode}></atv-keyboard>
              </div>`:K}

          <div class="surface">${this.renderSurface()}</div>

          ${this.nowPlaying?F`<div class="nowplaying">
                <div class="np-main">
                  <ha-icon icon="mdi:play-circle-outline"></ha-icon>
                  <div class="np-meta">
                    <span class="np-title">${this.nowPlaying.primary}</span>
                    ${this.nowPlaying.secondary?F`<span class="np-sub">${this.nowPlaying.secondary}</span>`:K}
                  </div>
                </div>
                ${"number"==typeof this.nowPlaying.progress?F`<div class="np-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow=${Math.round(100*this.nowPlaying.progress)}>
                      <div
                        class="np-bar-fill"
                        style="width: ${(100*this.nowPlaying.progress).toFixed(1)}%"
                      ></div>
                    </div>`:K}
              </div>`:K}

          ${this.config.show_media?this.renderTransport():K}

          <div class="navbtns">
            <atv-repeat-button stretch .key=${"BACK"} icon="mdi:arrow-left" label="Back"></atv-repeat-button>
            <atv-repeat-button stretch .key=${"HOME"} icon="mdi:home-outline" label="Home"></atv-repeat-button>
          </div>

          ${this.renderSecondary()}
        </div>
      </ha-card>
      ${this.volumeOpen&&!1!==this.config.show_volume?F`<div class="drawer" @click=${this.onDrawerClick}>
            <div class="sheet" role="dialog" aria-label="Volume">
              <div class="handle"></div>
              <div class="transport">
                <atv-repeat-button .key=${"VOLUME_DOWN"} icon="mdi:volume-medium" label="Volume down"></atv-repeat-button>
                <atv-repeat-button .key=${"MUTE"} icon="mdi:volume-off" label="Mute"></atv-repeat-button>
                <atv-repeat-button .key=${"VOLUME_UP"} icon="mdi:volume-high" label="Volume up"></atv-repeat-button>
              </div>
            </div>
          </div>`:K}
      ${this.appsOpen&&this.apps.length?F`<div class="drawer" @click=${this.onDrawerClick}>
            <div class="sheet" role="dialog" aria-label="Apps">
              <div class="handle"></div>
              <atv-app-grid .apps=${this.apps} .foreground=${this.foregroundPackage}></atv-app-grid>
            </div>
          </div>`:K}
    `:K}};qt.STORAGE_KEY="androidtv-plus:active",qt.styles=r`
    :host {
      display: block;
      position: relative;
      --atv-radius: 20px;
      --atv-gap: 14px;
      --atv-surface: var(--card-background-color, #ffffff);
      --atv-surface-2: var(--secondary-background-color, rgba(127, 127, 127, 0.1));
      --atv-text: var(--primary-text-color, #1c1c1e);
      --atv-text-dim: var(--secondary-text-color, #6b7280);
      --atv-line: var(--divider-color, rgba(127, 127, 127, 0.2));
      --atv-accent: var(--primary-color, #4285f4);
      --atv-on-accent: var(--text-primary-color, #ffffff);
      --atv-shadow: 0 1px 2px rgba(0, 0, 0, 0.08), 0 10px 26px -14px rgba(0, 0, 0, 0.4);
    }
    ha-card {
      overflow: hidden;
      border-radius: var(--atv-radius);
    }
    .drawer {
      position: absolute;
      inset: 0;
      z-index: 6;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      box-sizing: border-box;
      border-radius: var(--atv-radius);
      background: color-mix(in srgb, #000 58%, transparent);
      backdrop-filter: blur(3px);
      -webkit-backdrop-filter: blur(3px);
      overflow: hidden;
    }
    .drawer.top {
      justify-content: flex-start;
      background: transparent;
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
    }
    .drawer .sheet {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 10px 14px 16px;
      border-radius: var(--atv-radius) var(--atv-radius) 0 0;
      background: var(--atv-surface);
      box-shadow: 0 -12px 30px -14px rgba(0, 0, 0, 0.55);
      animation: drawer-up 220ms cubic-bezier(0.22, 1, 0.36, 1);
    }
    .drawer .handle {
      width: 40px;
      height: 4px;
      flex: none;
      margin: 0 auto;
      border-radius: 999px;
      background: var(--atv-line);
    }
    .drawer.top .sheet {
      border-radius: 0 0 var(--atv-radius) var(--atv-radius);
      box-shadow: 0 12px 30px -14px rgba(0, 0, 0, 0.4);
      animation: drawer-down 220ms cubic-bezier(0.22, 1, 0.36, 1);
    }
    @keyframes drawer-up {
      from {
        transform: translateY(100%);
      }
      to {
        transform: translateY(0);
      }
    }
    @keyframes drawer-down {
      from {
        transform: translateY(-100%);
      }
      to {
        transform: translateY(0);
      }
    }
    .remote {
      display: flex;
      flex-direction: column;
      gap: var(--atv-gap);
      padding: 16px;
    }
    .remote .surface,
    .remote .transport,
    .remote .navbtns,
    .remote .secondary,
    .remote .navrow,
    .remote .kbd-inline,
    .remote .hero atv-repeat-button {
      transition: opacity 200ms ease, filter 200ms ease;
    }
    .remote.controls-off .surface,
    .remote.controls-off .transport,
    .remote.controls-off .navbtns,
    .remote.controls-off .secondary,
    .remote.controls-off .navrow,
    .remote.controls-off .kbd-inline {
      opacity: 0.4;
      filter: grayscale(0.55);
      pointer-events: none;
    }
    .remote.offline .hero atv-repeat-button {
      opacity: 0.4;
      filter: grayscale(0.55);
      pointer-events: none;
    }
    .hero {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .device {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
    }
    .device-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      flex: none;
      border-radius: 14px;
      color: var(--atv-on-accent);
      background: linear-gradient(
        145deg,
        color-mix(in srgb, var(--atv-accent) 78%, #ffffff 22%),
        var(--atv-accent)
      );
      box-shadow:
        0 8px 18px -10px var(--atv-accent),
        inset 0 1px 0 rgba(255, 255, 255, 0.35),
        inset 0 -2px 3px -1px rgba(0, 0, 0, 0.25);
    }
    .device-icon ha-icon {
      --mdc-icon-size: 24px;
    }
    .meta {
      min-width: 0;
    }
    .picker {
      position: relative;
    }
    .title.pick {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      max-width: 100%;
      padding: 0;
      border: none;
      background: transparent;
      cursor: pointer;
      color: var(--atv-text);
      font-size: 17px;
      font-weight: 700;
      letter-spacing: 0.2px;
    }
    .title.pick span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .title.pick ha-icon {
      --mdc-icon-size: 20px;
      flex: none;
      color: var(--atv-text-dim);
    }
    .picker-backdrop {
      position: absolute;
      inset: 0;
      z-index: 5;
      border-radius: var(--atv-radius);
    }
    .picker-list {
      position: absolute;
      top: calc(100% + 6px);
      left: 0;
      z-index: 6;
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 180px;
      max-width: 260px;
      padding: 5px;
      border: 1px solid var(--atv-line);
      border-radius: 14px;
      background: var(--atv-surface);
      box-shadow: 0 10px 26px -10px rgba(0, 0, 0, 0.5);
      animation: kbd-in 140ms cubic-bezier(0.22, 1, 0.36, 1);
    }
    .picker-list button {
      display: flex;
      align-items: center;
      gap: 9px;
      padding: 9px 10px;
      border: none;
      border-radius: 10px;
      background: transparent;
      cursor: pointer;
      text-align: left;
      font-size: 14px;
      font-weight: 600;
      color: var(--atv-text);
    }
    .picker-list button:hover {
      background: var(--atv-surface-2);
    }
    .picker-list button.sel {
      color: var(--atv-accent);
    }
    .picker-list button ha-icon {
      --mdc-icon-size: 20px;
      flex: none;
    }
    .picker-list button span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .title {
      font-size: 17px;
      font-weight: 700;
      letter-spacing: 0.2px;
      color: var(--atv-text);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .status {
      display: flex;
      align-items: center;
      gap: 7px;
      margin-top: 3px;
      font-size: 12.5px;
      color: var(--atv-text-dim);
    }
    .dot {
      width: 7px;
      height: 7px;
      flex: none;
      border-radius: 50%;
      background: var(--atv-text-dim);
      transition: background 200ms ease, box-shadow 200ms ease;
    }
    .status.on .dot {
      background: #34a853;
      box-shadow: 0 0 0 3px rgba(52, 168, 83, 0.18);
    }
    .status.offline .dot {
      background: var(--error-color, #db4437);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--error-color, #db4437) 18%, transparent);
    }
    .nowplaying {
      display: flex;
      flex-direction: column;
      gap: 7px;
      min-width: 0;
      padding: 8px 12px;
      border-radius: 12px;
      color: var(--atv-text-dim);
      background: var(--atv-surface-2);
    }
    .np-main {
      display: flex;
      align-items: center;
      gap: 9px;
      min-width: 0;
    }
    .nowplaying ha-icon {
      --mdc-icon-size: 18px;
      flex: none;
    }
    .np-meta {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .np-bar {
      height: 3px;
      border-radius: 2px;
      overflow: hidden;
      background: color-mix(in srgb, var(--atv-text-dim) 25%, transparent);
    }
    .np-bar-fill {
      height: 100%;
      border-radius: 2px;
      background: var(--atv-accent);
      transition: width 1s linear;
    }
    .np-title {
      font-size: 12.5px;
      font-weight: 600;
      color: var(--atv-text);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .np-sub {
      font-size: 11px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .navrow {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
    }
    .navrow > .round {
      justify-self: end;
    }
    .navrow > .round.lead {
      justify-self: start;
    }
    .navbtns {
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: 1fr;
      gap: 12px;
    }
    .segmented {
      display: flex;
      gap: 4px;
      padding: 4px;
      width: 96px;
      flex: none;
      border-radius: 14px;
      background: var(--atv-surface-2);
      box-shadow:
        inset 0 2px 4px rgba(0, 0, 0, 0.35),
        inset 0 -1px 0 rgba(255, 255, 255, 0.08);
    }
    .segmented button {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 9px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      font-size: 13.5px;
      font-weight: 600;
      color: var(--atv-text-dim);
      background: transparent;
      transition: background 140ms ease, color 140ms ease, box-shadow 140ms ease;
    }
    .segmented button ha-icon {
      --mdc-icon-size: 18px;
    }
    .segmented button.active {
      color: var(--atv-text);
      background: var(--atv-surface);
      box-shadow:
        0 1px 2px rgba(0, 0, 0, 0.35),
        inset 0 1px 0 rgba(255, 255, 255, 0.5);
    }
    .kbd-inline {
      display: flex;
      animation: kbd-in 180ms cubic-bezier(0.22, 1, 0.36, 1);
    }
    .kbd-inline > * {
      flex: 1 1 0;
      min-width: 0;
    }
    @keyframes kbd-in {
      from {
        opacity: 0;
        transform: translateY(-6px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .surface {
      display: flex;
      justify-content: center;
      padding: 2px 0;
    }    .surface > * {
      flex: 1 1 0;
      min-width: 0;
      max-width: 100%;
    }
    .transport {
      display: flex;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .remote .transport {
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: 1fr;
      flex-wrap: nowrap;
    }
    .secondary {
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: 1fr;
      align-items: center;
      gap: 6px;
      opacity: 0.85;
    }
    .round {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      flex: none;
      border: 1px solid var(--atv-line);
      border-radius: 50%;
      cursor: pointer;
      color: var(--atv-text);
      background: var(--atv-surface-2);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.4),
        inset 0 -2px 3px -1px rgba(0, 0, 0, 0.28),
        0 2px 4px -1px rgba(0, 0, 0, 0.45),
        0 8px 16px -12px rgba(0, 0, 0, 0.6);
      transition:
        background 120ms ease,
        color 120ms ease,
        border-color 120ms ease,
        transform 90ms ease,
        box-shadow 120ms ease;
    }
    .round:hover {
      background: var(--atv-line);
      transform: translateY(-1px);
    }
    .round:active {
      transform: translateY(1px) scale(0.96);
      box-shadow:
        inset 0 2px 5px rgba(0, 0, 0, 0.45),
        inset 0 -1px 0 rgba(255, 255, 255, 0.15);
    }
    .round.on {
      color: var(--atv-on-accent);
      border-color: transparent;
      background: var(--atv-accent);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.35),
        inset 0 -2px 3px -1px rgba(0, 0, 0, 0.25),
        0 0 0 6px color-mix(in srgb, var(--atv-accent) 18%, transparent);
    }
    .round.dim {
      opacity: 0.45;
    }
    .round.dim:hover {
      opacity: 0.75;
    }
    .round ha-icon {
      --mdc-icon-size: 22px;
    }
    .round.small {
      width: 42px;
      height: 42px;
    }
    .round.small ha-icon {
      --mdc-icon-size: 20px;
    }
    .round.grow {
      flex: 1 1 0;
      width: auto;
      min-width: 0;
      border-radius: 999px;
    }
  `,Bt([dt({attribute:!1})],qt.prototype,"hass",2),Bt([ht()],qt.prototype,"config",2),Bt([ht()],qt.prototype,"mode",2),Bt([ht()],qt.prototype,"surface",2),Bt([ht()],qt.prototype,"keyboardOpen",2),Bt([ht()],qt.prototype,"appsOpen",2),Bt([ht()],qt.prototype,"volumeOpen",2),Bt([ht()],qt.prototype,"pickerOpen",2),Bt([ht()],qt.prototype,"activeEntity",2),Bt([ht()],qt.prototype,"tick",2),qt=Bt([ct(vt)],qt),window.customCards=window.customCards??[],window.customCards.push({type:vt,name:"Android TV Plus",description:"A d-pad and touch remote for Android TV, with app tiles and keyboard."});var Qt=Object.defineProperty,Jt=Object.getOwnPropertyDescriptor,Gt=(t,e,i,a)=>{for(var s,r=a>1?void 0:a?Jt(e,i):e,o=t.length-1;o>=0;o--)(s=t[o])&&(r=(a?s(e,i,r):s(r))||r);return a&&r&&Qt(e,i,r),r};let Zt=class extends ot{setConfig(t){this.config=t}patch(t){this.config={...this.config,...t},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}num(t){return!1!==this.config[t]}toggle(t,e){this.patch({[t]:e.target.checked})}get apps(){return this.config.apps??[]}get tvs(){return(this.config.entities??[]).map(t=>"string"==typeof t?{entity:t}:t)}setTvs(t){this.patch({entities:t.length?t:void 0})}get otherTvs(){return function(t,e,i){const a=new Set([t]),s=[];for(const t of[...e,...i])t.startsWith("remote.")&&!a.has(t)&&(a.add(t),s.push(t));return s}(this.config.entity,this.tvs.map(t=>t.entity),Object.keys(this.hass?.states??{})).sort((t,e)=>this.friendlyName(t).localeCompare(this.friendlyName(e)))}friendlyName(t){return this.hass?.states[t]?.attributes.friendly_name??t}tvIncluded(t){return this.tvs.some(e=>e.entity===t)}toggleTv(t,e){e?this.tvIncluded(t)||this.setTvs([...this.tvs,{entity:t}]):this.setTvs(this.tvs.filter(e=>e.entity!==t))}setTvName(t,e){this.patchTv(t,{name:e||void 0})}patchTv(t,e){this.setTvs(this.tvs.map(i=>i.entity===t?{...i,...e}:i))}tvTextMode(t){return this.tvs.find(e=>e.entity===t)?.text_mode??this.config.text_mode??"append"}setTvTextMode(t,e){this.patchTv(t,{text_mode:e})}appsFor(t){return null===t?this.apps:this.tvs.find(e=>e.entity===t)?.apps??[]}setAppsFor(t,e){null!==t?this.patchTv(t,{apps:e.length?e:void 0}):this.patch({apps:e})}updateApp(t,e,i){const a=this.appsFor(t).map((t,a)=>a===e?{...t,...i}:t);this.setAppsFor(t,a)}addApp(t){this.setAppsFor(t,[...this.appsFor(t),{name:"",icon:"mdi:apps",activity:""}])}removeApp(t,e){this.setAppsFor(t,this.appsFor(t).filter((t,i)=>i!==e))}moveApp(t,e,i){const a=[...this.appsFor(t)],s=e+i;s<0||s>=a.length||([a[e],a[s]]=[a[s],a[e]],this.setAppsFor(t,a))}setKind(t,e,i){const a=this.appsFor(t)[e];a&&("service"===i&&void 0!==a.service||"activity"===i&&void 0===a.service||this.updateApp(t,e,"service"===i?{service:"",activity:void 0,data:void 0}:{activity:"",service:void 0,data:void 0}))}renderApp(t,e,i){const a=void 0!==e.service;return F`
      <div class="app">
        <div class="app-head">
          <ha-icon icon=${e.icon||"mdi:apps"}></ha-icon>
          <span class="app-name">${e.name||"Untitled"}</span>
          <button class="icon-btn" title="Move up" ?disabled=${0===i} @click=${()=>this.moveApp(t,i,-1)}>
            <ha-icon icon="mdi:arrow-up"></ha-icon>
          </button>
          <button
            class="icon-btn"
            title="Move down"
            ?disabled=${i===this.appsFor(t).length-1}
            @click=${()=>this.moveApp(t,i,1)}
          >
            <ha-icon icon="mdi:arrow-down"></ha-icon>
          </button>
          <button class="icon-btn danger" title="Remove" @click=${()=>this.removeApp(t,i)}>
            <ha-icon icon="mdi:delete-outline"></ha-icon>
          </button>
        </div>

        <ha-textfield
          label="Name"
          .value=${e.name??""}
          @change=${e=>this.updateApp(t,i,{name:e.target.value})}
        ></ha-textfield>

        <ha-icon-picker
          .hass=${this.hass}
          .value=${e.icon??""}
          label="Icon"
          @value-changed=${e=>this.updateApp(t,i,{icon:e.detail.value})}
        ></ha-icon-picker>

        <div class="segmented small" role="radiogroup">
          <button
            role="radio"
            aria-checked=${!a}
            class=${a?"":"active"}
            @click=${()=>this.setKind(t,i,"activity")}
          >
            Activity / URL
          </button>
          <button
            role="radio"
            aria-checked=${a}
            class=${a?"active":""}
            @click=${()=>this.setKind(t,i,"service")}
          >
            Service
          </button>
        </div>

        ${a?F`
              <ha-textfield
                label="Service (e.g. script.tv_open_jellyfin)"
                .value=${e.service??""}
                @change=${e=>this.updateApp(t,i,{service:e.target.value})}
              ></ha-textfield>
              <ha-textfield
                label="Data (JSON, optional)"
                .value=${e.data?JSON.stringify(e.data):""}
                @change=${e=>this.updateData(t,i,e.target.value)}
              ></ha-textfield>
            `:F`
              <ha-textfield
                label="Activity / URL (e.g. netflix:// or https://…)"
                .value=${e.activity??""}
                @change=${e=>this.updateApp(t,i,{activity:e.target.value})}
              ></ha-textfield>
            `}

        <ha-textfield
          label="Package / app id (optional, for highlight)"
          .value=${e.package??""}
          @change=${e=>this.updateApp(t,i,{package:e.target.value||void 0})}
        ></ha-textfield>
      </div>
    `}renderAppsSection(t,e,i){const a=this.appsFor(t);return F`
      <div class=${null===t?"section":"apps-group"}>
        <div class="section-head">
          <span class="section-title">${e}</span>
          <button class="add" @click=${()=>this.addApp(t)}>
            <ha-icon icon="mdi:plus"></ha-icon>Add app
          </button>
        </div>
        ${i?F`<p class="hint">${i}</p>`:K}
        ${a.length?a.map((e,i)=>this.renderApp(t,e,i)):F`<p class="hint">No app tiles yet — add one to fill the app drawer.</p>`}
      </div>
    `}updateData(t,e,i){const a=i.trim();if(a)try{const i=JSON.parse(a);if(!i||"object"!=typeof i||Array.isArray(i))throw new Error("expected an object");this.updateApp(t,e,{data:i})}catch{}else this.updateApp(t,e,{data:void 0})}render(){return this.hass&&this.config?F`
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

        <div class="section">
          <div class="section-head">
            <span class="section-title">Other TVs</span>
          </div>
          <p class="hint">
            Tick any other <code>remote.*</code> entity to offer it in a selector in the card header. The remote
            entity above stays the default.
          </p>
          ${this.otherTvs.length?this.otherTvs.map(t=>{const e=this.tvIncluded(t),i=this.tvs.find(e=>e.entity===t);return F`
                  <div class="app">
                    <ha-formfield label=${this.friendlyName(t)} class="tvrow">
                      <ha-switch
                        .checked=${e}
                        @change=${e=>this.toggleTv(t,e.target.checked)}
                      ></ha-switch>
                    </ha-formfield>
                    ${e?F`
                          <ha-textfield
                            label="Name (optional)"
                            .value=${i?.name??""}
                            @input=${e=>this.setTvName(t,e.target.value)}
                          ></ha-textfield>
                          <div class="field-group">
                            <span class="group-label">Text input mode</span>
                            <div class="segmented small" role="radiogroup">
                              ${["append","replace"].map(e=>F`
                                  <button
                                    role="radio"
                                    aria-checked=${this.tvTextMode(t)===e}
                                    class=${this.tvTextMode(t)===e?"active":""}
                                    @click=${()=>this.setTvTextMode(t,e)}
                                  >
                                    ${"append"===e?"Insert":"Replace field"}
                                  </button>
                                `)}
                            </div>
                          </div>
                          ${this.renderAppsSection(t,"Apps","Overrides the default app list for this TV.")}
                        `:K}
                  </div>
                `}):F`<p class="hint">No other <code>remote.*</code> entities found.</p>`}
        </div>

        <div class="segmented" role="radiogroup">
          ${["both","dpad","touch"].map(t=>F`
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

        <div class="field-group">
          <span class="group-label">Text input mode</span>
          <div class="segmented small" role="radiogroup">
            ${["append","replace"].map(t=>F`
                <button
                  role="radio"
                  aria-checked=${(this.config.text_mode??"append")===t}
                  class=${(this.config.text_mode??"append")===t?"active":""}
                  @click=${()=>this.patch({text_mode:t})}
                >
                  ${"append"===t?"Insert (default)":"Replace field"}
                </button>
              `)}
          </div>
          <p class="hint">
            Most TVs insert each character at the cursor — keep “Insert”. Choose “Replace field” only if an app
            replaces the whole field on every keystroke (usually apps with their own on-screen keyboard).
          </p>
        </div>

        ${this.renderAppsSection(null,"Apps")}
      </div>
    `:K}};Zt.styles=r`
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
    .segmented.small button {
      padding: 7px;
      font-size: 13px;
      text-transform: none;
    }
    .hint {
      margin: 0;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .field-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .group-label {
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    .section {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding-top: 6px;
      border-top: 1px solid var(--divider-color, rgba(127, 127, 127, 0.4));
    }
    .apps-group {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .section-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .section-title {
      font-weight: 600;
    }
    .add {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border: 1px solid var(--primary-color);
      border-radius: 999px;
      background: transparent;
      color: var(--primary-color);
      cursor: pointer;
      font: inherit;
    }
    .app {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 12px;
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.4));
      border-radius: 12px;
    }
    .app-head {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .app-name {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 600;
    }
    .icon-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: none;
      border-radius: 8px;
      background: transparent;
      color: var(--secondary-text-color);
      cursor: pointer;
    }
    .icon-btn:hover {
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
    }
    .icon-btn[disabled] {
      opacity: 0.35;
      cursor: default;
    }
    .icon-btn.danger:hover {
      color: var(--error-color, #b00020);
    }
  `,Gt([dt({attribute:!1})],Zt.prototype,"hass",2),Gt([ht()],Zt.prototype,"config",2),Zt=Gt([ct(mt)],Zt);var te=Object.freeze({__proto__:null,get AndroidTVPlusCardEditor(){return Zt}});export{qt as AndroidTVPlusCard};
