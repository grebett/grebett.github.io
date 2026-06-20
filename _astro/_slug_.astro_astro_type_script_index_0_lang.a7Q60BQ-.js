const u=document.querySelector("[data-sealed-entry]"),q=document.querySelector("[data-sealed-seal]"),w=document.querySelector("[data-sealed-entry-id]"),C=document.querySelector("[data-sealed-title]"),$=document.querySelector("[data-sealed-excerpt]"),x=document.querySelector("[data-sealed-meta]"),S=document.querySelector("[data-sealed-tags]"),D=document.querySelector("[data-sealed-cipher]"),l=document.querySelector("[data-sealed-decrypt]"),z=document.querySelector("[data-sealed-reset]"),r=document.querySelector("[data-sealed-status]"),d=document.querySelector("[data-sealed-plain]"),I=document.querySelector("[data-sealed-key-slots]"),M=u?.dataset.sealedSlug??"",k=JSON.parse(u?.dataset.sealedColors??"[]"),H={id:w?.textContent??"",title:C?.textContent??"",excerpt:$?.textContent??""},N=`sealed-key:${M}`,O=`sealed-revealed:${M}`;let g=null,c=[],h=[],P=0,Q,m=null,j="",n=null,f=null,b,G=!1;const K=e=>Uint8Array.from(atob(e),t=>t.charCodeAt(0)),v=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Z=e=>v(e).replace(/`([^`]+)`/g,"<code>$1</code>"),pe=e=>e.trim().split(/\n{2,}/).map(t=>`<p>${Z(t.replace(/\n/g," "))}</p>`).join(""),R=e=>({colors:[0,1,2,3].map(t=>(e.colors[t]??k[t]??"#000000").toLowerCase())}),ye=e=>e.map(t=>R(t).colors.join(",")).join("|"),ge=()=>({colors:k.slice(0,4)}),he=(e,t)=>Array.from({length:e},()=>[t,t,t,t]),me=e=>h[e]?.some(Boolean)??!1,fe=e=>h[e]?.every(Boolean)??!1,ve=()=>c.length>0&&c.every((e,t)=>fe(t)),xe=async e=>{if(!g)throw new Error("missing payload");const t=await crypto.subtle.importKey("raw",new TextEncoder().encode(e),"PBKDF2",!1,["deriveKey"]),s=await crypto.subtle.deriveKey({name:"PBKDF2",salt:K(g.salt),iterations:g.iterations,hash:"SHA-256"},t,{name:"AES-GCM",length:256},!1,["decrypt"]),a=await crypto.subtle.decrypt({name:"AES-GCM",iv:K(g.iv)},s,K(g.ciphertext));return JSON.parse(new TextDecoder().decode(a))},Se=()=>{try{const e=window.localStorage.getItem(O);return e?JSON.parse(e):null}catch{return null}},we=e=>{try{window.localStorage.setItem(O,JSON.stringify(e))}catch{}},Ce=()=>{try{const e=window.localStorage.getItem(N);if(!e)return null;const t=JSON.parse(e);return Array.isArray(t.glyphs)?t:null}catch{return null}},ee=(e,t)=>{try{window.localStorage.setItem(N,JSON.stringify({glyphs:e,passphrase:t}))}catch{}},$e=()=>{try{window.localStorage.removeItem(N)}catch{}},be=()=>{try{window.localStorage.removeItem(O)}catch{}},W=e=>new Promise(t=>window.setTimeout(t,e)),X=()=>{u?.classList.remove("is-decrypting","is-reading","is-condensing")},Le=async()=>{u?.classList.add("is-decrypting","is-reading"),r&&(r.textContent="Lecture du fragment."),await W(420),u?.classList.remove("is-reading"),u?.classList.add("is-condensing"),r&&(r.textContent="Le texte se stabilise."),await W(620)},te=(e,t={})=>{if(!d||!l||!r)return;const s=new Date(e.date).toLocaleDateString("fr-FR"),a=document.querySelector(".entry-header > .glyph"),o=I?.querySelector(".sealed-glyph-preview")?.outerHTML;a&&o&&(a.outerHTML=o),w&&(w.textContent=e.id),C&&(C.textContent=e.title),$&&($.innerHTML=Z(e.excerpt)),x&&(x.innerHTML=`
              <time datetime="${v(e.date)}">${v(s)}</time>
              <span>${v(e.type)}</span>
              <span>${v(e.medium.join(" / "))}</span>
            `,x.hidden=!1),S&&(S.innerHTML=e.tags.map(p=>`<span>${v(p)}</span>`).join(""),S.hidden=!1),d.classList.remove("has-just-revealed"),d.innerHTML=`
            <div class="secret-fragment-body">${pe(e.body)}</div>
          `,d.hidden=!1,l.hidden=!0,l.disabled=!0,z?.removeAttribute("hidden"),q&&(q.hidden=!0),u?.classList.add("is-revealed"),r.textContent="Fragment déchiffré.",t.animate&&(d.classList.add("has-just-revealed"),window.setTimeout(()=>d.classList.remove("has-just-revealed"),1300))},Te=()=>{w&&(w.textContent=H.id),C&&(C.textContent=H.title),$&&($.textContent=H.excerpt),x&&(x.hidden=!0,x.innerHTML=""),S&&(S.hidden=!0,S.innerHTML=""),d&&(d.hidden=!0,d.innerHTML="",d.classList.remove("has-just-revealed")),q&&(q.hidden=!1),z?.setAttribute("hidden",""),u?.classList.remove("is-revealed","is-decrypt-error","is-decrypting","is-reading","is-condensing")},B=e=>{l&&(l.hidden=!e,l.disabled=!e,l.textContent="Déchiffrer")},Ae=()=>{n&&(window.clearTimeout(b),f=n,n=null,L(),b=window.setTimeout(()=>{f=null,L()},180))},Ie=()=>{if(n){if(c.length===0){n=null,f=null,window.clearTimeout(b);return}n={glyphIndex:Math.min(n.glyphIndex,c.length-1),colorIndex:Math.min(Math.max(n.colorIndex,0),3)}}},L=()=>{I&&(Ie(),I.innerHTML=c.map((e,t)=>{const s=R(e),a=h[t]??[!1,!1,!1,!1],o=!me(t),p=a.every(Boolean),ae=[`--glyph-a: ${s.colors[0]}`,`--glyph-b: ${s.colors[1]}`,`--glyph-c: ${s.colors[2]}`,`--glyph-d: ${s.colors[3]}`].join(";"),V={"#d95f43":"/textures/orange-rouge.png","#f2b84b":"/textures/jaune.png","#e07a5f":"/textures/saumon.png","#b94e5e":"/textures/rose-brique.png","#2aa198":"/textures/cyan-vert.png","#256d85":"/textures/bleu-petrole.png","#3d7c68":"/textures/vert-froid.png","#4f8fa8":"/textures/bleu-gris.png","#455a7f":"/textures/bleu-ardoise.png","#8f5b3e":"/textures/brun-rouille.png","#5d4b7a":"/textures/violet-sourd.png","#7b5ea7":"/textures/mauve.png","#234f68":"/textures/bleu-profond.png","#2f5f9b":"/textures/bleu-vif-profond.png","#35675f":"/textures/vert-sombre.png","#3f4a7a":"/textures/indigo-gris.png"},re="/textures/gris.png",_=600,E=300,F=E,U=[{x:1.8,y:-1.2},{x:-1.5,y:2.1},{x:1.2,y:1.5},{x:-.9,y:-1.8}],ne=[0,90,180,270].map((i,y)=>`rotate(${i} ${F} ${F}) translate(${U[y].x} ${U[y].y})`),le=`
                <svg viewBox="0 0 ${_} ${_}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
                  <g>
                    ${s.colors.map((i,y)=>{const A=a[y]??!1,ue=A?V[i]??V["#d95f43"]:re;return`
                          <g style="mix-blend-mode: multiply; opacity: 0.82; ${A?"":`filter: brightness(${1.45+y*.12}) contrast(${.62+y*.05});`}">
                            <image href="${ue}" width="${E}" height="${E}" x="${F}" y="0" preserveAspectRatio="none" transform="${ne[y]}"></image>
                          </g>
                        `}).join("")}
                  </g>
                </svg>
              `,T=n?.glyphIndex===t?n:null,oe=T?.colorIndex??0,ie=[0,1,2,3].map(i=>{const y=T?.colorIndex===i;return`
                    <button
                      class="sealed-glyph-segment"
                      type="button"
                      data-glyph-segment="${i}"
                      data-glyph-id="${t}:${i}"
                      aria-pressed="${y}"
                      aria-label="Modifier la couleur ${i+1} du glyphe ${t+1}"
                    ></button>
                  `}).join(""),ce=k.map((i,y)=>{const A=s.colors[oe]===i.toLowerCase();return`
                    <button
                      class="sealed-color-swatch"
                      type="button"
                      data-glyph-swatch="${i}"
                      aria-pressed="${A}"
                      aria-label="Appliquer ${i}"
                      style="--swatch-color: ${i}; --swatch-angle: ${360/k.length*y}deg"
                    ></button>
                  `}).join(""),Y=f?.glyphIndex===t?f:null,de=T??Y?`
                  <div class="sealed-radial-picker ${Y?"is-closing":G?"is-opening":""}" aria-label="Réglages du glyphe ${t+1}">
                    ${ce}
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
                <div class="${["sealed-glyph-slot",`sealed-slot-count-${c.length}`,T?"is-picker-open":"",o?"is-empty":"",!o&&!p?"is-partial":"",p?"is-complete":""].filter(Boolean).join(" ")}" data-glyph-index="${t}">
                  <div class="sealed-glyph-instrument">
                    <div class="sealed-glyph-orb" style="${ae}">
                      <span class="glyph sealed-glyph-preview" aria-hidden="true">${le}</span>
                      ${ie}
                    </div>
                  </div>
                  ${de}
                </div>
              `}).join(""),I.querySelectorAll("[data-glyph-index]").forEach(e=>{const t=Number.parseInt(e.dataset.glyphIndex??"0",10);e.querySelectorAll("[data-glyph-segment]").forEach(s=>{s.addEventListener("click",()=>{window.clearTimeout(b),f=null;const[a,o]=(s.dataset.glyphId??`${t}:0`).split(":"),p={glyphIndex:Number.parseInt(a,10)||0,colorIndex:Number.parseInt(o,10)||0};G=n?.glyphIndex!==p.glyphIndex,n=p,L(),G=!1})}),e.querySelectorAll("[data-glyph-swatch]").forEach(s=>{s.addEventListener("click",()=>{const a=n?.glyphIndex===t?n.colorIndex:0;n={glyphIndex:t,colorIndex:a},c[t].colors[a]=s.dataset.glyphSwatch??c[t].colors[a],h[t]=h[t]??[!1,!1,!1,!1],h[t][a]=!0,L(),qe()})}),e.querySelector("[data-glyph-close]")?.addEventListener("click",Ae)}))},se=(e,{filled:t=!0,slots:s=e.length}={})=>{const a=Math.max(1,s);c=Array.from({length:a},(o,p)=>R(e[p]??ge())),h=he(a,t),n=null,f=null,window.clearTimeout(b),L()},J=async({silent:e=!1}={})=>{if(!g||!r)return!1;const t=++P;if(m=null,j="",B(!1),c.length!==1)return e||(r.textContent="Composez la clé visuelle du fragment."),!1;if(!ve())return e||(r.textContent="Complétez les glyphes."),!1;e||(r.textContent="Lecture de la combinaison.");const s=ye(c);try{const a=await xe(s);return t!==P?!1:(m=a,j=s,ee(c,s),B(!0),u?.classList.remove("is-decrypt-error"),r.textContent="Combinaison prête.",!0)}catch{return t!==P||e||(u?.classList.add("is-decrypt-error"),r.textContent="Aucune ouverture pour cette combinaison."),!1}},qe=()=>{window.clearTimeout(Q),Q=window.setTimeout(()=>{J()},260)},Me=async()=>{if(!M||!D||!r||!l)return;const e=await fetch(`/sealed/${M}.json`);if(!e.ok){D.textContent="Payload introuvable.",r.textContent="Le fragment scellé manque dans l'archive.";return}g=await e.json(),D.textContent=g?.ciphertext??"";const t=Se();if(t){te(t);return}const s=Ce(),a=1,o=s?.glyphs?.length===a,p=o&&s?.glyphs?s.glyphs:[];se(p,{filled:o,slots:a}),r.textContent=o?"Clé locale retrouvée.":"Composez la clé visuelle du fragment.",await J({silent:!o})};l?.addEventListener("click",async()=>{if(!(!l||!r||!d)&&(m||await J(),!!m)){l.disabled=!0,l.textContent="Déchiffrement...",u?.classList.remove("is-decrypt-error");try{await Le(),ee(c,j),we(m),X(),te(m,{animate:!0})}catch{X(),u?.classList.add("is-decrypt-error"),r.textContent="La clé ne correspond pas à ce fragment.",l.disabled=!1,l.textContent="Réessayer"}}});z?.addEventListener("click",()=>{if(!d||!l||!r)return;be(),$e(),m=null,j="",Te(),B(!1),se([],{filled:!1,slots:1}),r.textContent="Composez la clé visuelle du fragment."});Me();
