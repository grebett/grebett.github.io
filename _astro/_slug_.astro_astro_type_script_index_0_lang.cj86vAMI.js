const p=document.querySelector("[data-sealed-entry]"),M=document.querySelector("[data-sealed-seal]"),C=document.querySelector("[data-sealed-entry-id]"),$=document.querySelector("[data-sealed-title]"),b=document.querySelector("[data-sealed-excerpt]"),w=document.querySelector("[data-sealed-meta]"),S=document.querySelector("[data-sealed-tags]"),E=document.querySelector("[data-sealed-cipher]"),i=document.querySelector("[data-sealed-decrypt]"),K=document.querySelector("[data-sealed-reset]"),l=document.querySelector("[data-sealed-status]"),u=document.querySelector("[data-sealed-plain]"),I=document.querySelector("[data-sealed-key-slots]"),q=p?.dataset.sealedSlug??"",k=JSON.parse(p?.dataset.sealedColors??"[]"),P={id:C?.textContent??"",title:$?.textContent??"",excerpt:b?.textContent??""},B=`sealed-key:${q}`,N=`sealed-revealed:${q}`;let g=null,d=[],m=[],F=0,V,f=null,j="",o=null,v=null,L,D=!1;const H=e=>Uint8Array.from(atob(e),t=>t.charCodeAt(0)),x=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Q=e=>x(e).replace(/`([^`]+)`/g,"<code>$1</code>"),ue=e=>e.trim().split(/\n{2,}/).map(t=>`<p>${Q(t.replace(/\n/g," "))}</p>`).join(""),z=e=>({colors:[0,1,2,3].map(t=>(e.colors[t]??k[t]??"#000000").toLowerCase())}),pe=e=>e.map(t=>z(t).colors.join(",")).join("|"),ye=()=>({colors:k.slice(0,4)}),ge=(e,t)=>Array.from({length:e},()=>[t,t,t,t]),he=e=>m[e]?.some(Boolean)??!1,me=e=>m[e]?.every(Boolean)??!1,fe=()=>d.length>0&&d.every((e,t)=>me(t)),ve=async e=>{if(!g)throw new Error("missing payload");const t=await crypto.subtle.importKey("raw",new TextEncoder().encode(e),"PBKDF2",!1,["deriveKey"]),s=await crypto.subtle.deriveKey({name:"PBKDF2",salt:H(g.salt),iterations:g.iterations,hash:"SHA-256"},t,{name:"AES-GCM",length:256},!1,["decrypt"]),a=await crypto.subtle.decrypt({name:"AES-GCM",iv:H(g.iv)},s,H(g.ciphertext));return JSON.parse(new TextDecoder().decode(a))},xe=()=>{try{const e=window.localStorage.getItem(N);return e?JSON.parse(e):null}catch{return null}},we=e=>{try{window.localStorage.setItem(N,JSON.stringify(e))}catch{}},Se=()=>{try{const e=window.localStorage.getItem(B);if(!e)return null;const t=JSON.parse(e);return Array.isArray(t.glyphs)?t:null}catch{return null}},W=(e,t)=>{try{window.localStorage.setItem(B,JSON.stringify({glyphs:e,passphrase:t}))}catch{}},Ce=()=>{try{window.localStorage.removeItem(B)}catch{}},$e=()=>{try{window.localStorage.removeItem(N)}catch{}},U=e=>new Promise(t=>window.setTimeout(t,e)),Y=()=>{p?.classList.remove("is-decrypting","is-reading","is-condensing")},be=async()=>{p?.classList.add("is-decrypting","is-reading"),l&&(l.textContent="Lecture du fragment."),await U(420),p?.classList.remove("is-reading"),p?.classList.add("is-condensing"),l&&(l.textContent="Le texte se stabilise."),await U(620)},X=(e,t={})=>{if(!u||!i||!l)return;const s=new Date(e.date).toLocaleDateString("fr-FR"),a=document.querySelector(".entry-header > .glyph"),c=I?.querySelector(".sealed-glyph-preview")?.outerHTML;a&&c&&(a.outerHTML=c),C&&(C.textContent=e.id),$&&($.textContent=e.title),b&&(b.innerHTML=Q(e.excerpt)),w&&(w.innerHTML=`
              <time datetime="${x(e.date)}">${x(s)}</time>
              <span>${x(e.type)}</span>
              <span>${x(e.medium.join(" / "))}</span>
            `,w.hidden=!1),S&&(S.innerHTML=e.tags.map(y=>`<span>${x(y)}</span>`).join(""),S.hidden=!1),u.classList.remove("has-just-revealed"),u.innerHTML=`
            <div class="secret-fragment-body">${ue(e.body)}</div>
          `,u.hidden=!1,i.hidden=!0,i.disabled=!0,K?.removeAttribute("hidden"),M&&(M.hidden=!0),p?.classList.add("is-revealed"),l.textContent="Fragment déchiffré.",t.animate&&(u.classList.add("has-just-revealed"),window.setTimeout(()=>u.classList.remove("has-just-revealed"),1300))},Le=()=>{C&&(C.textContent=P.id),$&&($.textContent=P.title),b&&(b.textContent=P.excerpt),w&&(w.hidden=!0,w.innerHTML=""),S&&(S.hidden=!0,S.innerHTML=""),u&&(u.hidden=!0,u.innerHTML="",u.classList.remove("has-just-revealed")),M&&(M.hidden=!1),K?.setAttribute("hidden",""),p?.classList.remove("is-revealed","is-decrypt-error","is-decrypting","is-reading","is-condensing")},G=e=>{i&&(i.hidden=!e,i.disabled=!e,i.textContent="Déchiffrer")},Te=()=>{o&&(window.clearTimeout(L),v=o,o=null,T(),L=window.setTimeout(()=>{v=null,T()},180))},Ae=()=>{if(o){if(d.length===0){o=null,v=null,window.clearTimeout(L);return}o={glyphIndex:Math.min(o.glyphIndex,d.length-1),colorIndex:Math.min(Math.max(o.colorIndex,0),3)}}},T=()=>{I&&(Ae(),I.innerHTML=d.map((e,t)=>{const s=z(e),a=m[t]??[!1,!1,!1,!1],c=!he(t),y=a.every(Boolean),te=[`--glyph-a: ${s.colors[0]}`,`--glyph-b: ${s.colors[1]}`,`--glyph-c: ${s.colors[2]}`,`--glyph-d: ${s.colors[3]}`].join(";"),R={"#d95f43":"/textures/orange-rouge.png","#f2b84b":"/textures/jaune.png","#e07a5f":"/textures/saumon.png","#b94e5e":"/textures/rose-brique.png","#2aa198":"/textures/cyan-vert.png","#256d85":"/textures/bleu-petrole.png","#3d7c68":"/textures/vert-froid.png","#4f8fa8":"/textures/bleu-gris.png","#455a7f":"/textures/bleu-ardoise.png","#8f5b3e":"/textures/brun-rouille.png","#5d4b7a":"/textures/violet-sourd.png","#7b5ea7":"/textures/mauve.png","#234f68":"/textures/bleu-profond.png","#2f5f9b":"/textures/bleu-vif-profond.png","#35675f":"/textures/vert-sombre.png","#3f4a7a":"/textures/indigo-gris.png"},se="/textures/gris.png",J=["M150 150 L150 22 A128 128 0 0 1 278 150Z","M150 150 L278 150 A128 128 0 0 1 150 278Z","M150 150 L150 278 A128 128 0 0 1 22 150Z","M150 150 L22 150 A128 128 0 0 1 150 22Z"],Z=J.map((r,n)=>`sealed-${t}-${n}`),ae=[180,0,0,0].map((r,n)=>{const h=[{x:1.8,y:-1.2},{x:-1.5,y:2.1},{x:1.2,y:1.5},{x:-.9,y:-1.8}];return`rotate(${r} 150 150) translate(${h[n].x} ${h[n].y})`}),le=`
                <svg viewBox="0 0 300 300" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
                  <defs>${J.map((r,n)=>`<clipPath id="${Z[n]}"><path d="${r}"></path></clipPath>`).join("")}</defs>
                  ${s.colors.map((r,n)=>{const h=a[n]??!1,ce=h?R[r]??R["#d95f43"]:se,de=h?"":`filter: brightness(${1.45+n*.12}) contrast(${.62+n*.05});`;return`
                        <g clip-path="url(#${Z[n]})" style="mix-blend-mode: multiply; opacity: 0.82; ${de}">
                          <image href="${ce}" width="300" height="300" x="0" y="0" preserveAspectRatio="none" transform="${ae[n]}"></image>
                        </g>
                      `}).join("")}
                </svg>
              `,A=o?.glyphIndex===t?o:null,re=A?.colorIndex??0,ne=[0,1,2,3].map(r=>{const n=A?.colorIndex===r;return`
                    <button
                      class="sealed-glyph-segment"
                      type="button"
                      data-glyph-segment="${r}"
                      data-glyph-id="${t}:${r}"
                      aria-pressed="${n}"
                      aria-label="Modifier la couleur ${r+1} du glyphe ${t+1}"
                    ></button>
                  `}).join(""),oe=k.map((r,n)=>{const h=s.colors[re]===r.toLowerCase();return`
                    <button
                      class="sealed-color-swatch"
                      type="button"
                      data-glyph-swatch="${r}"
                      aria-pressed="${h}"
                      aria-label="Appliquer ${r}"
                      style="--swatch-color: ${r}; --swatch-angle: ${360/k.length*n}deg"
                    ></button>
                  `}).join(""),_=v?.glyphIndex===t?v:null,ie=A??_?`
                  <div class="sealed-radial-picker ${_?"is-closing":D?"is-opening":""}" aria-label="Réglages du glyphe ${t+1}">
                    ${oe}
                    <div class="sealed-glyph-control-row">
                      <button
                        class="sealed-picker-close"
                        type="button"
                        data-glyph-close
                        aria-label="Fermer le réglage du glyphe ${t+1}"
                      >×</button>
                    </div>
                  </div>
                `:'<div class="sealed-color-placeholder" aria-hidden="true"></div>';return`
                <div class="${["sealed-glyph-slot",`sealed-slot-count-${d.length}`,A?"is-picker-open":"",c?"is-empty":"",!c&&!y?"is-partial":"",y?"is-complete":""].filter(Boolean).join(" ")}" data-glyph-index="${t}">
                  <div class="sealed-glyph-instrument">
                    <div class="sealed-glyph-orb" style="${te}">
                      <span class="glyph sealed-glyph-preview" aria-hidden="true">${le}</span>
                      ${ne}
                    </div>
                  </div>
                  ${ie}
                </div>
              `}).join(""),I.querySelectorAll("[data-glyph-index]").forEach(e=>{const t=Number.parseInt(e.dataset.glyphIndex??"0",10);e.querySelectorAll("[data-glyph-segment]").forEach(s=>{s.addEventListener("click",()=>{window.clearTimeout(L),v=null;const[a,c]=(s.dataset.glyphId??`${t}:0`).split(":"),y={glyphIndex:Number.parseInt(a,10)||0,colorIndex:Number.parseInt(c,10)||0};D=o?.glyphIndex!==y.glyphIndex,o=y,T(),D=!1})}),e.querySelectorAll("[data-glyph-swatch]").forEach(s=>{s.addEventListener("click",()=>{const a=o?.glyphIndex===t?o.colorIndex:0;o={glyphIndex:t,colorIndex:a},d[t].colors[a]=s.dataset.glyphSwatch??d[t].colors[a],m[t]=m[t]??[!1,!1,!1,!1],m[t][a]=!0,T(),Ie()})}),e.querySelector("[data-glyph-close]")?.addEventListener("click",Te)}))},ee=(e,{filled:t=!0,slots:s=e.length}={})=>{const a=Math.max(1,s);d=Array.from({length:a},(c,y)=>z(e[y]??ye())),m=ge(a,t),o=null,v=null,window.clearTimeout(L),T()},O=async({silent:e=!1}={})=>{if(!g||!l)return!1;const t=++F;if(f=null,j="",G(!1),d.length!==1)return e||(l.textContent="Composez la clé visuelle du fragment."),!1;if(!fe())return e||(l.textContent="Complétez les glyphes."),!1;e||(l.textContent="Lecture de la combinaison.");const s=pe(d);try{const a=await ve(s);return t!==F?!1:(f=a,j=s,W(d,s),G(!0),p?.classList.remove("is-decrypt-error"),l.textContent="Combinaison prête.",!0)}catch{return t!==F||e||(p?.classList.add("is-decrypt-error"),l.textContent="Aucune ouverture pour cette combinaison."),!1}},Ie=()=>{window.clearTimeout(V),V=window.setTimeout(()=>{O()},260)},Me=async()=>{if(!q||!E||!l||!i)return;const e=await fetch(`/sealed/${q}.json`);if(!e.ok){E.textContent="Payload introuvable.",l.textContent="Le fragment scellé manque dans l'archive.";return}g=await e.json(),E.textContent=g?.ciphertext??"";const t=xe();if(t){X(t);return}const s=Se(),a=1,c=s?.glyphs?.length===a,y=c&&s?.glyphs?s.glyphs:[];ee(y,{filled:c,slots:a}),l.textContent=c?"Clé locale retrouvée.":"Composez la clé visuelle du fragment.",await O({silent:!c})};i?.addEventListener("click",async()=>{if(!(!i||!l||!u)&&(f||await O(),!!f)){i.disabled=!0,i.textContent="Déchiffrement...",p?.classList.remove("is-decrypt-error");try{await be(),W(d,j),we(f),Y(),X(f,{animate:!0})}catch{Y(),p?.classList.add("is-decrypt-error"),l.textContent="La clé ne correspond pas à ce fragment.",i.disabled=!1,i.textContent="Réessayer"}}});K?.addEventListener("click",()=>{if(!u||!i||!l)return;$e(),Ce(),f=null,j="",Le(),G(!1),ee([],{filled:!1,slots:1}),l.textContent="Composez la clé visuelle du fragment."});Me();
