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

export function renderDistributionSVG(target,legend,{series}){
  target.classList.remove('is-empty');
  const W=730,H=280,L=43,R=700,T=22,B=238,xmax=Math.max(series.cap,1),xs=series.centers;
  const maxY=Math.max(...series.overall,...series.filtered,1)*1.08;
  const X=value=>L+value/xmax*(R-L),Y=value=>B-value/maxY*(B-T);
  const curve=values=>values.map((value,index)=>`${index?'L':'M'}${X(xs[index]).toFixed(2)},${Y(value).toFixed(2)}`).join(' ');
  const area=values=>`${curve(values)} L${R},${B} L${L},${B} Z`;
  const svg=svgEl('svg',{viewBox:`0 0 ${W} ${H}`,role:'img','aria-label':'Distribuzione complessiva e distribuzione della selezione corrente'});
  [75,129,183,238].forEach(y=>put(svg,'line',{x1:L,y1:y,x2:R,y2:y,stroke:'#95A4AB','stroke-opacity':'.16'}));
  const overallCurve=curve(series.overall),filteredCurve=curve(series.filtered);
  put(svg,'path',{d:area(series.overall),fill:'#a8b0b7','fill-opacity':'.16'});
  put(svg,'path',{d:overallCurve,fill:'none',stroke:'#89949c','stroke-width':2.4,'stroke-dasharray':'6 5','stroke-linecap':'round','stroke-linejoin':'round'});
  put(svg,'path',{d:area(series.filtered),fill:'#269D83','fill-opacity':'.13'});
  put(svg,'path',{d:filteredCurve,fill:'none',stroke:'#269D83','stroke-width':3,'stroke-linecap':'round','stroke-linejoin':'round'});
  put(svg,'line',{x1:L,y1:B,x2:R,y2:B,stroke:'#7c888d','stroke-opacity':'.55'});
  for(let index=0;index<=6;index++){
    const tick=xmax*index/6;
    put(svg,'text',{x:X(tick),y:257,'text-anchor':'middle','font-size':12,fill:'#6c777d'},index?shortNumber(tick):'0');
  }
  put(svg,'text',{x:370,y:274,'text-anchor':'middle','font-size':12,fill:'#63727a'},'Prezzo richiesto (€)');
  target.replaceChildren(svg);legend.replaceChildren();
  for(const [label,color] of [['Distribuzione complessiva','#89949c'],['Distribuzione filtrata','#269D83']]){
    const item=document.createElement('span');item.className='housing-legend-item';
    const dot=document.createElement('span');dot.className='housing-legend-dot';dot.style.background=color;
    const text=document.createElement('span');text.textContent=label;item.append(dot,text);legend.appendChild(item);
  }
}

export function renderCategoryDistributionsSVG(target,legend,{series,categoryKeys,colorFor,labelFor}){
  target.classList.remove('is-empty');
  const W=730,H=280,L=43,R=700,T=22,B=238,xmax=Math.max(series.cap,1),xs=series.centers;
  const visible=categoryKeys.filter(key=>series.byCategory.get(key)?.some(value=>value>0));
  const maxY=Math.max(...visible.flatMap(key=>series.byCategory.get(key)),1)*1.08;
  const X=value=>L+value/xmax*(R-L),Y=value=>B-value/maxY*(B-T);
  const curve=values=>values.map((value,index)=>`${index?'L':'M'}${X(xs[index]).toFixed(2)},${Y(value).toFixed(2)}`).join(' ');
  const svg=svgEl('svg',{viewBox:`0 0 ${W} ${H}`,role:'img','aria-label':'Confronto delle distribuzioni dei prezzi per categoria'});
  [75,129,183,238].forEach(y=>put(svg,'line',{x1:L,y1:y,x2:R,y2:y,stroke:'#95A4AB','stroke-opacity':'.16'}));
  for(const key of visible){
    const path=put(svg,'path',{d:curve(series.byCategory.get(key)),fill:'none',stroke:colorFor(key),'stroke-width':3,'stroke-linecap':'round','stroke-linejoin':'round'});
    put(path,'title',{},`${labelFor(key)} · distribuzione nella selezione filtrata`);
  }
  put(svg,'line',{x1:L,y1:B,x2:R,y2:B,stroke:'#7c888d','stroke-opacity':'.55'});
  for(let index=0;index<=6;index++){
    const tick=xmax*index/6;
    put(svg,'text',{x:X(tick),y:257,'text-anchor':'middle','font-size':12,fill:'#6c777d'},index?shortNumber(tick):'0');
  }
  put(svg,'text',{x:370,y:274,'text-anchor':'middle','font-size':12,fill:'#63727a'},'Prezzo richiesto (€)');
  target.replaceChildren(svg);legend.replaceChildren();
  for(const key of visible){
    const item=document.createElement('span');item.className='housing-legend-item';
    const dot=document.createElement('span');dot.className='housing-legend-dot';dot.style.background=colorFor(key);
    const text=document.createElement('span');text.textContent=labelFor(key);item.append(dot,text);legend.appendChild(item);
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
  if(!rows.length){target.textContent='Nessuna categoria con valori validi.';target.classList.add('is-empty');return{outlierIds:[],clippedCount:0};}
  target.classList.remove('is-empty');
  const W=820,L=155,R=650,allValues=rows.flatMap(row=>row.observations.map(item=>item.value)),xmax=Math.max(percentile(allValues,.99),1),rowHeight=58,B=34+rows.length*rowHeight,H=B+45;
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
    const y=43+index*rowHeight,color=colorFor(row.key),active=selectedKeys.has(row.key),group=put(svg,'g',{'data-category-key':row.key,class:`housing-box-row${active?' is-selected':''}`,tabindex:0,role:'button','aria-pressed':active});
    put(group,'title',{},`${row.label}: N=${formatNumber(row.count)}; ${formatPercent(row.filteredShare)} del filtrato; ${formatPercent(row.totalShare)} del totale; min ${formatNumber(row.min)}; Q1 ${formatNumber(row.q1)}; mediana ${formatNumber(row.median)}; media ${formatNumber(row.mean)}; Q3 ${formatNumber(row.q3)}; max ${formatNumber(row.max)}; outlier ${row.outliers.length}`);
    put(group,'text',{x:5,y:y+5,'font-size':13,'font-weight':500,fill:'#27363e'},row.label);
    put(group,'line',{x1:L,y1:y+13,x2:R,y2:y+13,stroke:'#b0bac0','stroke-opacity':'.14'});
    if(row.count>=10){
      const points=samples.map((x,sampleIndex)=>`${sampleIndex?'L':'M'}${X(x).toFixed(2)},${(y-23*densities[index][sampleIndex]/densityMaximum).toFixed(2)}`).join(' ');
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
    put(group,'text',{x:808,y:y-2,'text-anchor':'end','font-size':11,'font-weight':600,fill:'#42545d'},row.count===1?'1 annuncio':`${formatNumber(row.count)} annunci`);
    put(group,'text',{x:808,y:y+11,'text-anchor':'end','font-size':9.5,fill:'#697981'},`${formatPercent(row.filteredShare)} filtrato · ${formatPercent(row.totalShare)} totale`);
  });
  put(svg,'text',{x:(L+R)/2,y:H-4,'text-anchor':'middle','font-size':12,fill:'#64737a'},metricLabel);
  target.replaceChildren(svg);return{outlierIds,clippedCount,smallCount,bandwidth:commonBandwidth,cap:xmax};
}
