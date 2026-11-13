const NS='http://www.w3.org/2000/svg';
const svgEl=(name,attrs={},content='')=>{
  const node=document.createElementNS(NS,name);
  for(const [key,value] of Object.entries(attrs))node.setAttribute(key,String(value));
  if(content)node.textContent=content;
  return node;
};
const put=(parent,name,attrs={},content='')=>{const node=svgEl(name,attrs,content);parent.appendChild(node);return node;};
const formatNumber=value=>Math.round(value).toLocaleString('it-IT');
const formatPercent=value=>value>0&&value<.001?'<0,1%':(value*100).toLocaleString('it-IT',{minimumFractionDigits:1,maximumFractionDigits:1})+'%';
const shortNumber=value=>value>=1000000?(value/1000000).toLocaleString('it-IT',{maximumFractionDigits:1})+'M':value>=1000?Math.round(value/1000)+'k':formatNumber(value);
const percentile=(values,p)=>{const sorted=values.slice().sort((a,b)=>a-b),position=(sorted.length-1)*p,base=Math.floor(position),fraction=position-base;return sorted[base]+(sorted[base+1]===undefined?0:fraction*(sorted[base+1]-sorted[base]));};
const normalizedValues=values=>{const total=values.reduce((sum,value)=>sum+value,0)||1;return values.map(value=>value/total*100);};
const niceStep=value=>{const power=10**Math.floor(Math.log10(Math.max(value,1e-9))),fraction=value/power;return (fraction<=1?1:fraction<=2?2:fraction<=5?5:10)*power;};
const axisScale=(series,normalized)=>{
  const maximum=Math.max(...series.flat(),normalized ? .1 : 1),step=niceStep(maximum/4),top=Math.max(step,Math.ceil(maximum/step)*step);
  return {top,ticks:Array.from({length:Math.round(top/step)+1},(_,index)=>index*step)};
};
function drawDistributionAxes(svg,{L,R,T,B,X,Y,xmax,axis,normalized}){
  for(const tick of axis.ticks){
    const y=Y(tick);
    put(svg,'line',{x1:L,y1:y,x2:R,y2:y,stroke:'#95A4AB','stroke-opacity':tick?'.18':'.48'});
    put(svg,'text',{x:L-8,y:y+4,'text-anchor':'end','font-size':10.5,fill:'#6c777d'},normalized?tick.toLocaleString('it-IT',{maximumFractionDigits:1})+'%':formatNumber(tick));
  }
  for(let index=0;index<=6;index++){
    const tick=xmax*index/6;
    put(svg,'text',{x:X(tick),y:B+19,'text-anchor':'middle','font-size':11,fill:'#6c777d'},index?shortNumber(tick):'0');
  }
  put(svg,'text',{x:(L+R)/2,y:B+37,'text-anchor':'middle','font-size':11.5,fill:'#63727a'},'Prezzo richiesto (€)');
  put(svg,'text',{x:14,y:(T+B)/2,transform:`rotate(-90 14 ${(T+B)/2})`,'text-anchor':'middle','font-size':10.5,fill:'#63727a'},normalized?'Quota per fascia':'Numero di annunci');
}

export function renderDistributionSVG(target,legend,{series,normalized=false}){
  target.classList.remove('is-empty');
  const W=730,H=292,L=62,R=700,T=18,B=245,xmax=Math.max(series.cap,1),xs=series.centers;
  const overall=normalized?normalizedValues(series.overall):series.overall,filtered=normalized?normalizedValues(series.filtered):series.filtered,axis=axisScale([overall,filtered],normalized);
  const X=value=>L+value/xmax*(R-L),Y=value=>B-value/axis.top*(B-T);
  const curve=values=>values.map((value,index)=>`${index?'L':'M'}${X(xs[index]).toFixed(2)},${Y(value).toFixed(2)}`).join(' ');
  const area=values=>`${curve(values)} L${R},${B} L${L},${B} Z`;
  const svg=svgEl('svg',{viewBox:`0 0 ${W} ${H}`,role:'img','aria-label':`Distribuzione complessiva e selezione corrente, ${normalized?'quote normalizzate':'numero di annunci'}`});
  drawDistributionAxes(svg,{L,R,T,B,X,Y,xmax,axis,normalized});
  const overallCurve=curve(overall),filteredCurve=curve(filtered);
  put(svg,'path',{d:area(overall),fill:'#a8b0b7','fill-opacity':'.16'});
  put(svg,'path',{d:overallCurve,fill:'none',stroke:'#89949c','stroke-width':2.4,'stroke-dasharray':'6 5','stroke-linecap':'round','stroke-linejoin':'round'});
  put(svg,'path',{d:area(filtered),fill:'#269D83','fill-opacity':'.13'});
  put(svg,'path',{d:filteredCurve,fill:'none',stroke:'#269D83','stroke-width':3,'stroke-linecap':'round','stroke-linejoin':'round'});
  target.replaceChildren(svg);legend.replaceChildren();
  for(const [label,color,count] of [['Distribuzione complessiva','#89949c',series.validCount],['Distribuzione filtrata','#269D83',series.filteredValidCount]]){
    const item=document.createElement('span');item.className='housing-legend-item';
    const dot=document.createElement('span');dot.className='housing-legend-dot';dot.style.background=color;
    const text=document.createElement('span');text.textContent=`${label} · ${formatNumber(count)} annunci`;item.append(dot,text);legend.appendChild(item);
  }
}

export function renderCategoryDistributionsSVG(target,legend,{series,categoryKeys,colorFor,labelFor,normalized=false}){
  target.classList.remove('is-empty');
  const W=730,H=292,L=62,R=700,T=18,B=245,xmax=Math.max(series.cap,1),xs=series.centers;
  const visible=categoryKeys.filter(key=>series.byCategory.get(key)?.some(value=>value>0));
  const valuesByKey=new Map(visible.map(key=>[key,normalized?normalizedValues(series.byCategory.get(key)):series.byCategory.get(key)])),axis=axisScale([...valuesByKey.values()],normalized);
  const X=value=>L+value/xmax*(R-L),Y=value=>B-value/axis.top*(B-T);
  const curve=values=>values.map((value,index)=>`${index?'L':'M'}${X(xs[index]).toFixed(2)},${Y(value).toFixed(2)}`).join(' ');
  const svg=svgEl('svg',{viewBox:`0 0 ${W} ${H}`,role:'img','aria-label':`Confronto delle distribuzioni per categoria, ${normalized?'quote normalizzate':'numero di annunci'}`});
  drawDistributionAxes(svg,{L,R,T,B,X,Y,xmax,axis,normalized});
  for(const key of visible){
    const path=put(svg,'path',{d:curve(valuesByKey.get(key)),fill:'none',stroke:colorFor(key),'stroke-width':3,'stroke-linecap':'round','stroke-linejoin':'round'});
    put(path,'title',{},`${labelFor(key)} · distribuzione nella selezione filtrata`);
  }
  target.replaceChildren(svg);legend.replaceChildren();
  for(const key of visible){
    const count=series.categoryCounts.get(key)??0,share=count/(series.validCount||1);
    const item=document.createElement('span');item.className='housing-legend-item';
    const dot=document.createElement('span');dot.className='housing-legend-dot';dot.style.background=colorFor(key);
    const text=document.createElement('span');text.textContent=`${labelFor(key)} · ${formatNumber(count)} · ${formatPercent(share)}`;item.append(dot,text);
    if(count<30){const warning=document.createElement('small');warning.textContent='campione ridotto';item.appendChild(warning);}
    legend.appendChild(item);
  }
}

function bandwidth(values,maximum){
  if(values.length<2)return Math.max(1,maximum/80);
  const mean=values.reduce((sum,value)=>sum+value,0)/values.length;
  const deviation=Math.sqrt(values.reduce((sum,value)=>sum+(value-mean)**2,0)/(values.length-1));
  const sorted=values.slice().sort((a,b)=>a-b),at=p=>sorted[Math.min(sorted.length-1,Math.floor((sorted.length-1)*p))],robust=Math.min(deviation,(at(.75)-at(.25))/1.34||deviation);
  return Math.max(maximum/180,.9*robust*values.length**(-.2),1);
}
const kernel=(distance,width)=>Math.exp(-.5*(distance/width)**2)/(width*2.506628);

export function renderBoxPlotSVG(target,{rows,colorFor,selectedKeys=new Set(),metricLabel='Valore'}){
  if(!rows.length){target.textContent='Nessuna categoria con valori validi.';target.classList.add('is-empty');return{outlierIds:[],clippedCount:0,smallCount:0};}
  target.classList.remove('is-empty');
  const W=820,L=155,R=650,allValues=rows.flatMap(row=>row.observations.map(item=>item.value)),xmax=Math.max(percentile(allValues,.99),1),rowHeight=108,B=38+rows.length*rowHeight,H=B+45;
  const X=value=>L+Math.min(Math.max(value,0),xmax)/xmax*(R-L);
  const commonBandwidth=bandwidth(allValues,xmax),samples=Array.from({length:126},(_,index)=>index*xmax/125);
  const filteredValidCount=Math.max(rows[0]?.filteredValidCount??0,1);
  const densities=rows.map(row=>samples.map(x=>row.values.reduce((sum,value)=>sum+kernel(x-value,commonBandwidth),0)/filteredValidCount));
  const densityMaximum=Math.max(...densities.flat(),1e-12);
  const svg=svgEl('svg',{viewBox:`0 0 ${W} ${H}`,role:'img','aria-label':`Box plot: ${metricLabel} per categoria`});
  for(let index=0;index<=5;index++){
    const tick=xmax*index/5;
    put(svg,'line',{x1:X(tick),y1:15,x2:X(tick),y2:B,stroke:'#96A4AD','stroke-opacity':'.18','stroke-dasharray':'3 4'});
    put(svg,'text',{x:X(tick),y:B+17,'text-anchor':'middle','font-size':11,fill:'#677780'},index?shortNumber(tick):'0');
  }
  let clippedCount=0,smallCount=0;
  const outlierIds=[];
  rows.forEach((row,index)=>{
    const y=88+index*rowHeight,color=colorFor(row.key),active=selectedKeys.has(row.key),group=put(svg,'g',{'data-category-key':row.key,class:`housing-box-row${active?' is-selected':''}`,tabindex:0,role:'button','aria-pressed':active});
    put(group,'title',{},`${row.label}: N=${formatNumber(row.count)}; ${formatPercent(row.filteredShare)} del filtrato; ${formatPercent(row.totalShare)} del totale; min ${formatNumber(row.min)}; Q1 ${formatNumber(row.q1)}; mediana ${formatNumber(row.median)}; media ${formatNumber(row.mean)}; Q3 ${formatNumber(row.q3)}; max ${formatNumber(row.max)}; outlier ${row.outliers.length}`);
    put(group,'text',{x:5,y:y-34,'font-size':13,'font-weight':600,fill:'#27363e'},row.label);
    put(group,'line',{x1:5,y1:y+42,x2:808,y2:y+42,stroke:'#b0bac0','stroke-opacity':'.18'});
    if(row.count>=10){
      const points=samples.map((x,sampleIndex)=>`${sampleIndex?'L':'M'}${X(x).toFixed(2)},${(y-44*densities[index][sampleIndex]/densityMaximum).toFixed(2)}`).join(' ');
      put(group,'path',{d:`${points} L${R},${y} L${L},${y} Z`,fill:color,'fill-opacity':'.42'});
    }else smallCount++;
    if(row.max>xmax)clippedCount++;
    put(group,'line',{x1:X(row.whiskerLow),y1:y,x2:X(row.whiskerHigh),y2:y,stroke:color,'stroke-width':2});
    for(const point of [row.whiskerLow,row.whiskerHigh])put(group,'line',{x1:X(point),y1:y-6,x2:X(point),y2:y+6,stroke:color,'stroke-width':1.5});
    put(group,'rect',{x:X(row.q1),y:y-7,width:Math.max(1,X(row.q3)-X(row.q1)),height:14,rx:3,fill:color,'fill-opacity':'.92'});
    put(group,'line',{x1:X(row.median),y1:y-9,x2:X(row.median),y2:y+9,stroke:'#fff','stroke-width':2});
    put(group,'circle',{cx:X(row.mean),cy:y,r:3.5,fill:'#17232d',stroke:'#fff','stroke-width':1.2});
    row.outliers.forEach((item,outlierIndex)=>{
      outlierIds.push(item.id);
      const point=put(group,'circle',{cx:X(item.value),cy:y+(outlierIndex%3-1)*3,r:4,fill:'#fff',stroke:color,'stroke-width':2,'data-outlier-id':item.id,tabindex:0,role:'button','aria-label':`Escludi outlier ${item.id}: ${formatNumber(item.value)}`});
      put(point,'title',{},`${item.id}: ${formatNumber(item.value)}. Clicca per escludere.`);
    });
    put(group,'text',{x:808,y:y-34,'text-anchor':'end','font-size':11,'font-weight':600,fill:'#42545d'},row.count===1?'1 annuncio':`${formatNumber(row.count)} annunci`);
    put(group,'text',{x:808,y:y-20,'text-anchor':'end','font-size':9.5,fill:'#697981'},`${formatPercent(row.filteredShare)} filtrato · ${formatPercent(row.totalShare)} totale${row.count<30?' · campione ridotto':''}`);
  });
  put(svg,'text',{x:(L+R)/2,y:H-4,'text-anchor':'middle','font-size':12,fill:'#64737a'},metricLabel);
  target.replaceChildren(svg);return{outlierIds,clippedCount,smallCount,bandwidth:commonBandwidth,cap:xmax};
}
