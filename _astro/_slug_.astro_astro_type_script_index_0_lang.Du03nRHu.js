const c=document.querySelector("[data-sealed-entry]"),I=document.querySelector("[data-sealed-seal]"),w=document.querySelector("[data-sealed-entry-id]"),b=document.querySelector("[data-sealed-title]"),$=document.querySelector("[data-sealed-excerpt]"),f=document.querySelector("[data-sealed-meta]"),v=document.querySelector("[data-sealed-tags]"),M=document.querySelector("[data-sealed-cipher]"),n=document.querySelector("[data-sealed-decrypt]"),P=document.querySelector("[data-sealed-reset]"),o=document.querySelector("[data-sealed-status]"),d=document.querySelector("[data-sealed-plain]"),E=document.querySelector("[data-sealed-key-slots]"),S=document.querySelector("[data-sealed-slot-count]"),A=c?.dataset.sealedSlug??"",F=JSON.parse(c?.dataset.sealedColors??"[]"),se=JSON.parse(c?.dataset.sealedRotations??"[]"),j={id:w?.textContent??"",title:b?.textContent??"",excerpt:$?.textContent??""},H=`sealed-key:${A}`,G=`sealed-revealed:${A}`;let l=null,r=[],m=[],k=0,B,y=null,q="",i=null;const D=e=>Uint8Array.from(atob(e),t=>t.charCodeAt(0)),g=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),V=e=>g(e).replace(/`([^`]+)`/g,"<code>$1</code>"),oe=e=>e.trim().split(/\n{2,}/).map(t=>`<p>${V(t.replace(/\n/g," "))}</p>`).join(""),_=e=>(e%360+360)%360,N=e=>({colors:[0,1,2,3].map(t=>(e.colors[t]??F[t]??"#000000").toLowerCase()),rotation:_(e.rotation)}),ne=e=>e.map(t=>{const a=N(t);return`${a.rotation}:${a.colors.join(",")}`}).join("|"),re=()=>({colors:F.slice(0,4),rotation:se[0]??0}),x=e=>`${e} glyphe${e>1?"s":""} attendu${e>1?"s":""}`,le=(e,t)=>Array.from({length:e},()=>[t,t,t,t]),ce=e=>m[e]?.every(Boolean)??!1,de=()=>r.length>0&&r.every((e,t)=>ce(t)),ie=async e=>{if(!l)throw new Error("missing payload");const t=await crypto.subtle.importKey("raw",new TextEncoder().encode(e),"PBKDF2",!1,["deriveKey"]),a=await crypto.subtle.deriveKey({name:"PBKDF2",salt:D(l.salt),iterations:l.iterations,hash:"SHA-256"},t,{name:"AES-GCM",length:256},!1,["decrypt"]),s=await crypto.subtle.decrypt({name:"AES-GCM",iv:D(l.iv)},a,D(l.ciphertext));return JSON.parse(new TextDecoder().decode(s))},pe=()=>{try{const e=window.localStorage.getItem(G);return e?JSON.parse(e):null}catch{return null}},ue=e=>{try{window.localStorage.setItem(G,JSON.stringify(e))}catch{}},ye=()=>{try{const e=window.localStorage.getItem(H);if(!e)return null;const t=JSON.parse(e);return Array.isArray(t.glyphs)?t:null}catch{return null}},U=(e,t)=>{try{window.localStorage.setItem(H,JSON.stringify({glyphs:e,passphrase:t}))}catch{}},he=()=>{try{window.localStorage.removeItem(H)}catch{}},ge=()=>{try{window.localStorage.removeItem(G)}catch{}},J=e=>new Promise(t=>window.setTimeout(t,e)),R=()=>{c?.classList.remove("is-decrypting","is-reading","is-condensing")},me=async()=>{c?.classList.add("is-decrypting","is-reading"),o&&(o.textContent="Lecture du fragment."),await J(420),c?.classList.remove("is-reading"),c?.classList.add("is-condensing"),o&&(o.textContent="Le texte se stabilise."),await J(620)},Q=(e,t={})=>{if(!d||!n||!o)return;const a=new Date(e.date).toLocaleDateString("fr-FR");w&&(w.textContent=e.id),b&&(b.textContent=e.title),$&&($.innerHTML=V(e.excerpt)),f&&(f.innerHTML=`
              <time datetime="${g(e.date)}">${g(a)}</time>
              <span>${g(e.type)}</span>
              <span>${g(e.medium.join(" / "))}</span>
            `,f.hidden=!1),v&&(v.innerHTML=e.tags.map(s=>`<span>${g(s)}</span>`).join(""),v.hidden=!1),d.classList.remove("has-just-revealed"),d.innerHTML=`
            <div class="secret-fragment-body">${oe(e.body)}</div>
          `,d.hidden=!1,n.hidden=!0,n.disabled=!0,P?.removeAttribute("hidden"),I&&(I.hidden=!0),c?.classList.add("is-revealed"),o.textContent="Fragment déchiffré.",t.animate&&(d.classList.add("has-just-revealed"),window.setTimeout(()=>d.classList.remove("has-just-revealed"),1300))},fe=()=>{w&&(w.textContent=j.id),b&&(b.textContent=j.title),$&&($.textContent=j.excerpt),f&&(f.hidden=!0,f.innerHTML=""),v&&(v.hidden=!0,v.innerHTML=""),d&&(d.hidden=!0,d.innerHTML="",d.classList.remove("has-just-revealed")),I&&(I.hidden=!1),P?.setAttribute("hidden",""),c?.classList.remove("is-revealed","is-decrypt-error","is-decrypting","is-reading","is-condensing")},K=e=>{n&&(n.hidden=!e,n.disabled=!e,n.textContent="Déchiffrer")},ve=()=>{if(i){if(r.length===0){i=null;return}i={glyphIndex:Math.min(i.glyphIndex,r.length-1),colorIndex:Math.min(Math.max(i.colorIndex,0),3)}}},L=()=>{E&&(ve(),E.innerHTML=r.map((e,t)=>{const a=N(e),s=m[t]??[!1,!1,!1,!1],u=s.every(p=>!p),h=s.every(Boolean),X=[`--glyph-rotation: ${a.rotation}deg`,`--glyph-a: ${a.colors[0]}`,`--glyph-b: ${a.colors[1]}`,`--glyph-c: ${a.colors[2]}`,`--glyph-d: ${a.colors[3]}`].join(";"),C=i?.glyphIndex===t?i:null,Y=C?.colorIndex??0,Z=[0,1,2,3].map(p=>{const T=C?.colorIndex===p;return`
                    <button
                      class="sealed-glyph-segment"
                      type="button"
                      data-glyph-segment="${p}"
                      aria-pressed="${T}"
                      aria-label="Modifier la couleur ${p+1} du glyphe ${t+1}"
                    ></button>
                  `}).join(""),ee=F.map(p=>{const T=a.colors[Y]===p.toLowerCase();return`
                    <button
                      class="sealed-color-swatch"
                      type="button"
                      data-glyph-swatch="${p}"
                      aria-pressed="${T}"
                      aria-label="Appliquer ${p}"
                      style="--swatch-color: ${p}"
                    ></button>
                  `}).join(""),te=C?`
                  <div class="sealed-color-popover" aria-label="Palette du glyphe ${t+1}">
                    <div class="sealed-palette">${ee}</div>
                  </div>
                `:'<div class="sealed-color-placeholder" aria-hidden="true"></div>',ae=C?`
                  <div class="sealed-glyph-control-row">
                    <button
                      class="sealed-rotate-button"
                      type="button"
                      data-glyph-rotate="-45"
                      aria-label="Tourner le glyphe ${t+1} vers la gauche"
                    >↩</button>
                    <button
                      class="sealed-rotate-button"
                      type="button"
                      data-glyph-rotate="45"
                      aria-label="Tourner le glyphe ${t+1} vers la droite"
                    >↪</button>
                  </div>
                `:"";return`
                <div class="${["sealed-glyph-slot",C?"is-picker-open":"",u?"is-empty":"",!u&&!h?"is-partial":"",h?"is-complete":""].filter(Boolean).join(" ")}" data-glyph-index="${t}">
                  <div class="sealed-glyph-instrument">
                    <div class="sealed-glyph-orb" style="${X}">
                      <span class="glyph sealed-glyph-preview" aria-hidden="true"></span>
                      ${Z}
                    </div>
                    ${ae}
                  </div>
                  ${te}
                </div>
              `}).join(""),E.querySelectorAll("[data-glyph-index]").forEach(e=>{const t=Number.parseInt(e.dataset.glyphIndex??"0",10);e.querySelectorAll("[data-glyph-segment]").forEach(a=>{a.addEventListener("click",()=>{i={glyphIndex:t,colorIndex:Number.parseInt(a.dataset.glyphSegment??"0",10)||0},L()})}),e.querySelectorAll("[data-glyph-swatch]").forEach(a=>{a.addEventListener("click",()=>{const s=i?.glyphIndex===t?i.colorIndex:0;i={glyphIndex:t,colorIndex:s},r[t].colors[s]=a.dataset.glyphSwatch??r[t].colors[s],m[t]=m[t]??[!1,!1,!1,!1],m[t][s]=!0,L(),z()})}),e.querySelectorAll("[data-glyph-rotate]").forEach(a=>{a.addEventListener("click",()=>{const s=Number.parseInt(a.dataset.glyphRotate??"0",10)||0;r[t].rotation=_(r[t].rotation+s),L(),z()})})}))},W=(e,{filled:t=!0,slots:a=e.length}={})=>{const s=Math.max(1,a);r=Array.from({length:s},(u,h)=>N(e[h]??re())),m=le(s,t),i=null,L()},O=async({silent:e=!1}={})=>{if(!l||!o)return!1;const t=++k;if(y=null,q="",K(!1),S&&(S.textContent=x(l.slots)),r.length!==l.slots)return e||(o.textContent=x(l.slots)),!1;if(!de())return e||(o.textContent="Complétez les glyphes."),!1;e||(o.textContent="Lecture de la combinaison.");const a=ne(r);try{const s=await ie(a);return t!==k?!1:(y=s,q=a,U(r,a),K(!0),c?.classList.remove("is-decrypt-error"),o.textContent="Combinaison prête.",!0)}catch{return t!==k||e||(c?.classList.add("is-decrypt-error"),o.textContent="Aucune ouverture pour cette combinaison."),!1}},z=()=>{window.clearTimeout(B),B=window.setTimeout(()=>{O()},260)},Se=async()=>{if(!A||!M||!o||!n)return;const e=await fetch(`/sealed/${A}.json`);if(!e.ok){M.textContent="Payload introuvable.",o.textContent="Le fragment scellé manque dans l'archive.";return}l=await e.json(),M.textContent=l?.ciphertext??"";const t=pe();if(t){Q(t);return}const a=ye(),s=Math.max(1,l?.slots??1),u=a?.glyphs?.length===s,h=u&&a?.glyphs?a.glyphs:[];W(h,{filled:u,slots:s}),S&&(S.textContent=x(s)),o.textContent=u?"Clé locale retrouvée.":x(s),await O({silent:!u})};n?.addEventListener("click",async()=>{if(!(!n||!o||!d)&&(y||await O(),!!y)){n.disabled=!0,n.textContent="Déchiffrement...",c?.classList.remove("is-decrypt-error");try{await me(),U(r,q),ue(y),R(),Q(y,{animate:!0})}catch{R(),c?.classList.add("is-decrypt-error"),o.textContent="La clé ne correspond pas à ce fragment.",n.disabled=!1,n.textContent="Réessayer"}}});P?.addEventListener("click",()=>{if(!d||!n||!o)return;ge(),he(),y=null,q="",fe(),K(!1);const e=Math.max(1,l?.slots??1);W([],{filled:!1,slots:e}),S&&(S.textContent=x(e)),o.textContent=x(e)});Se();
