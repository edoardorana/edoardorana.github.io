let plotlyPromise;

export function loadPlotly() {
  if (window.Plotly) return Promise.resolve(window.Plotly);
  if (!plotlyPromise) {
    plotlyPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = new URL('./vendor/plotly-basic-4.1.2.min.js', import.meta.url).href;
      script.async = true;
      script.onload = () => window.Plotly ? resolve(window.Plotly) : reject(new Error('Plotly non disponibile.'));
      script.onerror = () => { script.remove(); reject(new Error('Impossibile caricare i grafici.')); };
      document.head.append(script);
    }).catch(error => { plotlyPromise = undefined; throw error; });
  }
  return plotlyPromise;
}
