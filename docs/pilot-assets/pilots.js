// The current website's native case-overlay controller opens every pilot.
// This small enhancement only switches the illustrative research views.
document.querySelectorAll('[data-research-ui]').forEach(ui=>{
  const tabs=[...ui.querySelectorAll('[data-research-tab]')];
  const panels=[...ui.querySelectorAll('[role="tabpanel"]')];
  const select=index=>{
    tabs.forEach((tab,i)=>{
      tab.setAttribute('aria-selected',String(i===index));
      tab.tabIndex=i===index?0:-1;
      panels[i].hidden=i!==index;
    });
  };
  tabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>select(index));
    tab.addEventListener('keydown',event=>{
      let next=index;
      if(event.key==='ArrowRight')next=(index+1)%tabs.length;
      else if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;
      else if(event.key==='Home')next=0;
      else if(event.key==='End')next=tabs.length-1;
      else return;
      event.preventDefault();event.stopPropagation();select(next);tabs[next].focus();
    });
  });
});
document.querySelectorAll('[data-variable-demo]').forEach(ui=>{
  const nodes=[...ui.querySelectorAll('[data-demo-variable]')];
  const title=ui.querySelector('[data-variable-name]');
  nodes.forEach(node=>node.addEventListener('click',()=>{
    nodes.forEach(n=>n.setAttribute('aria-pressed',String(n===node)));
    title.textContent=node.dataset.demoVariable;
  }));
});
document.querySelectorAll('[data-screen-gallery]').forEach(gallery=>{
  const tabs=[...gallery.querySelectorAll('[data-gallery-tab]')];
  const panels=[...gallery.querySelectorAll('[role=tabpanel]')];
  const select=index=>tabs.forEach((tab,i)=>{
    tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;panels[i].hidden=i!==index;
  });
  tabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>select(index));
    tab.addEventListener('keydown',event=>{
      let next=index;
      if(event.key==='ArrowRight')next=(index+1)%tabs.length;
      else if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;
      else if(event.key==='Home')next=0;
      else if(event.key==='End')next=tabs.length-1;
      else return;
      event.preventDefault();event.stopPropagation();select(next);tabs[next].focus();
    });
  });
});
