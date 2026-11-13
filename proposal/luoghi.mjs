import { places, mapPoint } from './data.mjs';

const chips = tags => `<div class="chips">${tags.map(tag => `<span>${tag}</span>`).join('')}</div>`;
let selectedPlace = 'milano';

function europeMap() {
  const entries = Object.entries(places);
  return `<div class="europe-map" aria-label="Mappa interattiva delle tappe in Europa"><img src="europe.svg" alt="" class="europe-base"><svg viewBox="0 0 600 650" aria-hidden="true" class="europe-overlay">${entries.map(([id, place]) => {
    const [x, y] = mapPoint(place.coordinates);
    const [labelX, labelY] = place.mapLabel;
    return `<g data-map-place="${id}"><path d="M${x},${y} L${labelX},${labelY}"/><circle cx="${x}" cy="${y}" r="5"/></g>`;
  }).join('')}</svg><span class="europe-caption">QUATTRO TAPPE, UN PERCORSO</span>${entries.map(([id, place]) => {
    const [x, y] = mapPoint(place.coordinates);
    return `<button class="map-point" data-place="${id}" aria-label="Seleziona ${place.name}" aria-controls="place-info" aria-pressed="${id === selectedPlace}" style="left:${x / 6}%;top:${y / 6.5}%"></button><button class="map-label" data-place="${id}" aria-controls="place-info" aria-pressed="${id === selectedPlace}" style="left:${place.mapLabel[0] / 6}%;top:${place.mapLabel[1] / 6.5}%">${place.name}</button>`;
  }).join('')}</div>`;
}

function setPlace(key) {
  selectedPlace = key;
  const place = places[key];
  document.querySelectorAll('[data-place]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.place === key)));
  document.querySelector('#place-info').innerHTML = `<p class="eyebrow">${place.label}</p><h2>${place.name}</h2><p class="place-dates">${place.dates.replaceAll('\n', '<br>')}</p><p>${place.text}</p>${chips(place.skills)}`;
  document.querySelectorAll('[data-map-place]').forEach(group => group.classList.toggle('is-selected', group.dataset.mapPlace === key));
}

document.querySelector('.place-picker').innerHTML = Object.entries(places).map(([id, place]) => `<button data-place="${id}" aria-pressed="${id === selectedPlace}">${place.name}</button>`).join('');
document.querySelector('#places-map').innerHTML = europeMap();
document.querySelectorAll('[data-place]').forEach(button => button.addEventListener('click', () => setPlace(button.dataset.place)));
setPlace(selectedPlace);
