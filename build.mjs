import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const content=JSON.parse(fs.readFileSync(path.join(root,'content.json'),'utf8'));
const e=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const base=process.argv.find(arg=>arg.startsWith('--base='))?.slice(7).replace(/\/$/,'')||'';
if(!/^(?:\/[a-zA-Z0-9-]+)*$/.test(base))throw new Error('Invalid base path');
const withBase=html=>html.replace(/\b(src|href|poster|data-zoom)="(\/[^"]*)"/g,(_,attr,url)=>`${attr}="${base}${url}"`);
const reviewBuild=!process.argv.includes('--production');
const lines=value=>value.split('<br>').map(e).join('<br>');
for(const c of Object.values(content)) {
  const figure=(item,second=false)=>{
    const file=second?item.secondImage:item.image;
    return `<figure class="evidence${second?' evidence--secondary':''}"><button class="image-button" type="button" data-zoom="/case-assets/${e(file)}" data-caption="${e(second?item.secondCaption:item.caption)}" aria-label="${e(c.viewImage)}: ${e(item.name)}"><img src="/case-assets/${e(file)}" alt="${e(second?item.secondAlt:item.alt)}" width="1440" height="900" loading="lazy"><span class="enlarge" aria-hidden="true">↗</span></button><figcaption>${e(second?item.secondCaption:item.caption)}</figcaption></figure>`;
  };
  const video=(file,poster,title,caption,description,vertical=false)=>`<figure class="evidence${vertical?' evidence--reel':''}"><video controls playsinline preload="none" poster="/case-assets/${e(poster)}" aria-label="${e(title)}"><source src="/case-assets/${e(file)}" type="video/mp4"></video><figcaption>${e(caption)} <a href="/case-assets/${e(file)}" target="_blank" rel="noopener noreferrer">${e(c.fullRecording)} ↗</a></figcaption>${description?`<details class="clip-description"><summary>${e(c.clipDescription)}</summary><p>${e(description)}</p></details>`:''}</figure>`;
  const media=item=>item.reels?`<div class="reel-grid">${item.reels.map(reel=>video(reel.file,reel.poster,reel.title,reel.caption,reel.description,true)).join('')}</div>`:item.video?video(item.video,item.image,`${c.playLabel}: ${item.name}`,item.videoCaption,item.videoDescription):figure(item);
  const html=`<!doctype html><html lang="${c.lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${e(c.title)}</title><meta name="description" content="${e(c.description)}"><link rel="icon" href="/favicon-32.png"><link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/fonts/fraunces-latin.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/fonts/fonts.css"><link rel="stylesheet" href="/case-assets/case.css"><script src="/case-assets/case.js" defer></script></head><body id="top">
  <a class="skip" href="#main">${c.lang==='en'?'Skip to content':'Zum Inhalt'}</a>
  <header class="chrome"><a class="brand" href="https://followtherabbit.studio/" aria-label="Follow the Rabbit"><img src="/ftr_logo.svg" alt="Follow the Rabbit" width="130" height="47"></a><nav aria-label="${c.lang==='en'?'Page navigation':'Seitennavigation'}"><a class="back" href="https://followtherabbit.studio/" aria-label="${e(c.back)}">← <span>${e(c.back)}</span></a><a class="language" lang="${c.lang==='en'?'de':'en'}" hreflang="${c.lang==='en'?'de':'en'}" href="${c.otherUrl}">${c.otherLabel}</a></nav></header>
  <main id="main"><section class="hero wrap" aria-labelledby="page-title"><div class="hero-copy"><span class="eyebrow">${e(c.eyebrow)}</span><h1 id="page-title">${lines(c.headline)}</h1><p class="lede">${e(c.intro)}</p></div><figure class="hero-media"><img src="/case-assets/led-forest-current.jpg" alt="${e(c.heroAlt)}" width="1440" height="900" fetchpriority="high"><figcaption>${e(c.heroCaption)}</figcaption></figure></section>
  <section class="context wrap" aria-labelledby="context-title"><h2 id="context-title">${e(c.contextTitle)}</h2><div><p>${e(c.context)}</p><p>${e(c.contextEnd)}</p></div></section>
  <section class="directory wrap" aria-labelledby="directory-title"><div><span class="eyebrow">${e(c.indexLabel)}</span><h2 id="directory-title">${e(c.indexIntro)}</h2></div><ol>${c.cases.map((item,i)=>`<li><a href="#${item.id}"><span class="index">0${i+1}</span><span>${e(item.name)}<small>${e(item.short)}</small></span><span aria-hidden="true">↘</span></a></li>`).join('')}</ol></section>
  <div class="case-list wrap">${c.cases.map(item=>`<article class="case" id="${item.id}" aria-labelledby="title-${item.id}"><div class="case-copy"><span class="eyebrow">${e(item.category)}</span><h2 id="title-${item.id}">${e(item.headline)}</h2><div class="product"><span class="product-name">${e(item.name)}</span><span class="status"><i aria-hidden="true"></i>${e(item.status)}</span></div><h3 class="micro">${e(c.needLabel)}</h3><p>${e(item.need)}</p><h3 class="micro">${e(c.responseLabel)}</h3><p>${e(item.response)}</p><div class="purpose"><h3 class="micro">${e(c.purposeLabel)}</h3><ul>${item.purpose.map(p=>`<li>${e(p)}</li>`).join('')}</ul></div>${item.link?`<a class="text-link" href="${e(item.link)}" target="_blank" rel="noopener noreferrer">${e(item.linkLabel)} ↗</a>`:''}</div><div class="case-media">${media(item)}${item.secondImage?figure(item,true):''}</div></article>`).join('')}</div>
  <section class="closing wrap" aria-labelledby="closing-title"><span class="eyebrow">${e(c.closingEyebrow)}</span><h2 id="closing-title">${lines(c.closingTitle)}</h2><p class="lede">${e(c.closingText)}</p><p class="closing-note">${e(c.closingSmall)}</p><a class="cta" href="mailto:hello@followtherabbit.studio">${e(c.cta)} <span aria-hidden="true">↗</span></a></section></main>
  <footer class="footer wrap"><span>${e(c.footer)}</span><a href="#top">${e(c.top)} ↑</a>${reviewBuild?`<a href="/handoff/">${e(c.reviewFiles)} ↗</a>`:''}<span>© 2026 Follow the Rabbit</span></footer>
  <dialog id="image-dialog" aria-label="${e(c.viewImage)}"><form method="dialog"><button class="dialog-close" aria-label="${e(c.closeImage)}">${c.lang==='en'?'Close':'Schliessen'} <span aria-hidden="true">×</span></button></form><figure><img id="dialog-image" src="/case-assets/led-forest-current.jpg" alt=""><figcaption id="dialog-caption"></figcaption></figure></dialog></body></html>`;
  const output=path.join(root,'docs',c.url,'index.html');
  fs.mkdirSync(path.dirname(output),{recursive:true});
  fs.writeFileSync(output,withBase(html));
  console.log(path.relative(root,output));
}

fs.copyFileSync(path.join(root,'docs/case-studies/bildspur/index.html'),path.join(root,'docs/index.html'));

fs.mkdirSync(path.join(root,'docs/handoff'),{recursive:true});
fs.writeFileSync(path.join(root,'docs/handoff/index.html'),withBase(fs.readFileSync(path.join(root,'handoff.template.html'),'utf8')));
