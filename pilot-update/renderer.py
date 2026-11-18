from pathlib import Path
import json,re,html,shutil
from pilot_ui import rtw_ui,mps_ui,evi_gallery
ROOT=Path(__file__).resolve().parent
DATA=json.loads((ROOT/'content.json').read_text(encoding='utf-8'))
PROFILE=json.loads((ROOT/'guillaume-profile.json').read_text(encoding='utf-8'))
e=lambda x:html.escape(str(x),quote=True)
arrow='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>'

def element_end(s,start,tag='div'):
    depth=0
    for m in re.finditer(r'</?'+tag+r'\b[^>]*>',s[start:]):
        depth+= -1 if m.group().startswith('</') else 1
        if depth==0:return start+m.end()
    raise ValueError('Unbalanced '+tag)

def research_ui(c,item):
    key=item['id'];tabs=''.join(f'<button type="button" role="tab" id="{key}-tab-{i}" aria-selected="{str(i==0).lower()}" aria-controls="{key}-panel-{i}" tabindex="{0 if i==0 else -1}" data-research-tab="{i}">{e(label)}</button>' for i,label in enumerate(c['researchTabs']))
    nodes=''.join(f'<div class="pui__node pui__node--{i}"><span class="pui__dot"></span><strong>{e(name)}</strong><small>{e(c["researchStep"][0])}</small></div>' for i,name in enumerate(item['domains']))
    steps=''.join(f'<li><span>0{i+1}</span>{e(label)}</li>' for i,label in enumerate(c['researchStep']))
    return f'''<div class="pui" data-research-ui><div class="pui__bar"><span class="pui__window"><i></i><i></i><i></i></span><span>{e(item['name'])} / {e(c['researchLabel'])}</span><span class="pui__study">{'Interface study' if c['lang']=='en' else 'Interface-Studie'}</span></div><div class="pui__tabs" role="tablist" aria-label="{e(item['name'])} {'research views' if c['lang']=='en' else 'Recherche-Ansichten'}">{tabs}</div><div class="pui__panel" role="tabpanel" id="{key}-panel-0" aria-labelledby="{key}-tab-0" tabindex="0"><p class="pui__question">{e(item['question'])}</p><div class="pui__map"><svg class="pui__edges" viewBox="0 0 600 280" preserveAspectRatio="none" aria-hidden="true"><path d="M125 70 Q300 155 475 70 M125 70 Q125 220 300 220 M475 70 Q475 220 300 220"/></svg>{nodes}<span class="pui__centre">{e(c['researchStep'][1])}</span></div><ol class="pui__steps">{steps}</ol></div><div class="pui__panel pui__evidence" role="tabpanel" id="{key}-panel-1" aria-labelledby="{key}-tab-1" tabindex="0" hidden><span class="pui__label">{e(c['researchTabs'][1])}</span><h4>{e(c['sourceTitle'])}</h4><p>{e(c['sourceBody'])}</p><div class="pui__source-lines" aria-hidden="true"><i></i><i></i><i></i></div><div class="pui__evidence-path"><span>{'Claim' if c['lang']=='en' else 'Aussage'}</span>↔<span>{'Source passage' if c['lang']=='en' else 'Quellenstelle'}</span>↔<span>{'Original document' if c['lang']=='en' else 'Originaldokument'}</span></div></div><div class="pui__panel pui__review" role="tabpanel" id="{key}-panel-2" aria-labelledby="{key}-tab-2" tabindex="0" hidden><span class="pui__label">{e(c['researchTabs'][2])}</span><h4>{e(c['reviewTitle'])}</h4><p>{e(c['reviewBody'])}</p><div class="pui__review-note"><span aria-hidden="true">↗</span>{'Context. Counterarguments. Open questions.' if c['lang']=='en' else 'Kontext. Gegenargumente. Offene Fragen.'}</div></div></div>'''

def board(c):
    rows=[]
    for item in c['items']:
        rows.append(f'''<div class="lab__row pilot-row"><div class="lab__rowhead"><div class="lab__name"><h3 class="lab__title"><button class="lab__trigger" type="button" data-case-open="{item['id']}" aria-haspopup="dialog" aria-expanded="false" aria-controls="case-overlay">{e(item['name'])}</button></h3><span class="lab__field">{e(item['field'])}</span></div><span class="lab__chip"><i class="lab__chip-dot" aria-hidden="true"></i><span>{e(item['status'])}</span></span><span class="lab__arrow">{arrow}</span></div></div>''')
    return f'<div class="pilot-board-label"><h3>{e(c["section"])}</h3><span>{e(c["phase"])}</span></div>'+''.join(rows)

def articles(c):
    result=[]
    for item in c['items']:
        body=''
        if not item.get('deferred'):
            support=''.join('<li>'+e(x)+'</li>' for x in item['supports'])
            if item['id']=='rtw':
                media=rtw_ui(c,item);caption=item['caption']
            elif item['id']=='mps':
                media=mps_ui(c,item)+'<div class="pilot-method-ui">'+research_ui(c,item)+'</div>';caption=item['caption']
            elif item['id']=='evi':
                media=evi_gallery(c,item)+'<div class="pilot-method-ui">'+research_ui(c,item)+'</div>';caption=item['caption']
            else:
                media=f'<img class="pilot-screen" data-src="/pilot-assets/{e(item["image"])}" alt="{e(item["alt"])}" width="1600" height="780" loading="lazy">';caption=item['caption']
            body=f'''<section class="sector__case" aria-labelledby="pilot-{item['id']}-question"><div class="sector__case-text"><span class="sector__cat">{e(item['field'])}</span><h3 class="sector__case-title" id="pilot-{item['id']}-question">{e(item['title'])}</h3><p>{e(item['body'])}</p><div class="sector__benefit"><span class="sector__benefit-label">{'What we are exploring' if c['lang']=='en' else 'Was wir erkunden'}</span><ul class="sector__benefit-list">{support}</ul></div></div><figure class="sector__viz pilot-viz">{media}<figcaption>{e(caption)}</figcaption></figure></section>'''
        else:
            body='<div class="pilot-pending" aria-hidden="true"><span>↗</span><i></i><i></i><i></i></div>'
        result.append(f'''<article class="sector pilot-sector" data-sector="{item['id']}" hidden><header class="sector__hero"><span class="eyebrow eyebrow--indent sector-rise">{e(c['section'])} / {e(item['name'])}</span><h2 class="sector__title" id="sector-title-{item['id']}">{e(item['headline'])}</h2><p class="sector__lede sector-rise">{e(item['summary'])}</p></header>{body}</article>''')
    return '\n'.join(result)

def team(c):
    name=PROFILE.get('fullName') or PROFILE['name'];bio=PROFILE.get('bioEn' if c['lang']=='en' else 'bioDe') or '';role=PROFILE.get('roleDe' if c['lang']=='de' else 'role') or ''
    link=f'<a class="team__link" href="{e(PROFILE["linkedin"])}" target="_blank" rel="noopener noreferrer">LinkedIn{arrow}</a>' if PROFILE.get('linkedin') else ''
    return f'''<div class="team__member" data-pilot-team="guillaume"><div class="team__photo team__photo--5"><img src="/pilot-assets/guillaume.png" alt="{e(name)}"></div><div class="team__info team__info--5"><div class="team__kicker">{e(role)}</div><h2 class="team__title">{e(name)}</h2><p class="team__desc">{e(bio)}</p><div class="team__links">{link}</div></div></div>'''

for lang,c in DATA.items(): c["lang"]=lang
