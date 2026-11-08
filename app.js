import { copy } from './content.js';
import { memories } from './memories.js';
import { decorate } from './ornaments.js';

const $ = id => document.getElementById(id);
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
let language = 'fr';
let turning = false;
let coverOpening = false;
let activeMemory = null;
let hideTimer;
let previewHideTimer;
let suppressFocusPreview = false;
let imageRequest = 0;
let player;
let playerReady = false;
let wantMusic = false;
let musicState = 'musicLoading';
let musicTimer;
let apiRequested = false;

decorate();

function applyLanguage() {
  const c = copy[language];
  document.documentElement.lang = language;
  document.documentElement.dataset.world = language === 'fr' ? 'day' : 'night';
  document.title = language === 'fr' ? 'À toi, Noémie.' : 'To you, Noémie.';
  document.querySelector('meta[name="theme-color"]').content = language === 'fr' ? '#eee5d2' : '#263e35';
  document.querySelectorAll('[data-copy]').forEach(el => { el.innerHTML = c[el.dataset.copy]; });
  c.paragraphs.forEach((text,i) => { $(`paragraph${i+1}`).innerHTML = text; });
  $('noemie').setAttribute('aria-label', c.turnLabel);
  $('language-mark').textContent = c.language;
  $('music-label').textContent = c.musicLabel;
  $('music-status').textContent = c[musicState];
  $('memory-close').setAttribute('aria-label',c.closeMemory);
  $('music-close').setAttribute('aria-label',c.closeMusic);
  document.querySelector('.skip-link').textContent = c.skip;
  document.querySelector('.monogram').setAttribute('aria-label',language === 'fr' ? 'Début de la lettre' : 'Beginning of the letter');
  $('music-room').setAttribute('aria-label',language === 'fr' ? 'Musique' : 'Music');
  $('memory-preview').setAttribute('aria-label',language === 'fr' ? 'Un souvenir' : 'A memory');
}
applyLanguage();

// The letter is readable even without JavaScript. Only an active script seals it.
$('cover').hidden = false;
document.body.classList.add('sealed');
$('page').inert = true;
requestAnimationFrame(() => $('open-letter').focus({preventScroll:true}));

function openLetter() {
  if (coverOpening) return;
  coverOpening = true;
  $('cover').classList.add('is-opening');
  $('page').inert = false;
  document.body.classList.remove('sealed');
  window.scrollTo({top:0,behavior:'instant'});
  $('page').classList.add('just-opened');
  // Start the supplied track on the opening gesture, with a visible player.
  startMusic();
  setTimeout(() => {
    $('cover').hidden = true;
    $('cover').classList.remove('is-opening');
    $('letter').focus({preventScroll:true});
    coverOpening = false;
  }, reducedMotion.matches ? 0 : 1450);
}
$('open-letter').addEventListener('click',openLetter);
$('close-letter').addEventListener('click',() => {
  hideMemory();
  stopMusic();
  $('cover').hidden = false;
  document.body.classList.add('sealed');
  $('page').inert = true;
  $('page').classList.remove('just-opened');
  $('open-letter').focus({preventScroll:true});
});

$('noemie').addEventListener('click',() => {
  if (turning) return;
  turning = true;
  hideMemory();
  $('noemie').setAttribute('aria-busy','true');
  const veil = $('world-turn');
  veil.classList.add('turning');
  const change = () => {
    language = language === 'fr' ? 'en' : 'fr';
    applyLanguage();
    // Return to the new composition so the whole transformation is visible.
    window.scrollTo({top:0,behavior:'instant'});
    $('letter').focus({preventScroll:true});
    $('language-announcement').textContent = copy[language].announcement;
  };
  const finish = () => {
    veil.classList.remove('turning');
    turning = false;
    $('noemie').removeAttribute('aria-busy');
  };
  if (reducedMotion.matches) { change(); finish(); }
  else { setTimeout(change,700); setTimeout(finish,1550); }
});

// One shared photo, positioned against the active word and clamped to the viewport.
function placeMemory(button) {
  const rect = button.getBoundingClientRect();
  const preview = $('memory-preview');
  const width = preview.offsetWidth;
  const height = preview.offsetHeight;
  const edge = 14;
  const left = Math.max(edge,Math.min(window.innerWidth - width - edge, rect.left + rect.width/2 - width/2));
  let top = rect.bottom + 15;
  if (top + height > window.innerHeight - edge) top = rect.top - height - 15;
  top = Math.max(edge,Math.min(top,window.innerHeight-height-edge));
  preview.style.left = `${left}px`;
  preview.style.top = `${top}px`;
}
function showMemory(button) {
  if (suppressFocusPreview || turning) return;
  clearTimeout(hideTimer);
  clearTimeout(previewHideTimer);
  if (activeMemory && activeMemory !== button) activeMemory.setAttribute('aria-expanded','false');
  activeMemory = button;
  button.setAttribute('aria-expanded','true');
  const memory = memories[button.dataset.memory];
  if (!memory) return;
  const preview = $('memory-preview');
  const img = $('memory-image');
  const request = ++imageRequest;
  const isPlaceholder = !memory.src;
  $('memory-caption').textContent = memory[language];
  $('memory-subtitle').textContent = isPlaceholder ? copy[language].placeholder : '';
  img.alt = isPlaceholder ? '' : memory[language];
  img.style.objectPosition = memory.position || '50% 50%';
  img.src = 'assets/memory-placeholder.svg';
  if (memory.src) {
    const photo = new Image();
    photo.onload = () => { if (request === imageRequest && activeMemory === button) img.src = photo.src; };
    photo.onerror = () => { if (request === imageRequest) $('memory-subtitle').textContent = copy[language].placeholder; };
    photo.src = memory.src;
  }
  preview.hidden = false;
  placeMemory(button);
  requestAnimationFrame(() => { if (activeMemory === button) preview.classList.add('is-visible'); });
}
function hideMemory() {
  clearTimeout(hideTimer);
  if (activeMemory) activeMemory.setAttribute('aria-expanded','false');
  activeMemory = null;
  imageRequest++;
  $('memory-preview').classList.remove('is-visible');
  previewHideTimer = setTimeout(() => { if (!activeMemory) $('memory-preview').hidden = true; },reducedMotion.matches ? 0 : 300);
}
document.addEventListener('pointerover',e => {
  const button = e.target.closest('.memory-word');
  if (button && finePointer.matches && e.pointerType !== 'touch') showMemory(button);
});
document.addEventListener('pointerout',e => {
  if (e.target.closest('.memory-word') && finePointer.matches) hideTimer = setTimeout(hideMemory,160);
});
document.addEventListener('focusin',e => {
  if (e.target.matches('.memory-word')) showMemory(e.target);
  else if (!$('memory-preview').contains(e.target)) hideMemory();
});
document.addEventListener('click',e => {
  const button = e.target.closest('.memory-word');
  if (button) {
    // Pointerdown snapshots expansion before click-induced focus opens it.
    if (button.dataset.wasOpen === 'true') hideMemory(); else showMemory(button);
    delete button.dataset.wasOpen;
  } else if (!$('memory-preview').contains(e.target)) hideMemory();
});
document.addEventListener('pointerdown',e => {
  const button = e.target.closest('.memory-word');
  if (button) button.dataset.wasOpen = String((e.pointerType === 'touch' || !finePointer.matches) && activeMemory === button);
});
$('memory-preview').addEventListener('pointerenter',() => clearTimeout(hideTimer));
$('memory-preview').addEventListener('pointerleave',() => { if(finePointer.matches) hideTimer = setTimeout(hideMemory,160); });
function closeMemoryAndFocus() {
  const button = activeMemory;
  hideMemory();
  if (button) { suppressFocusPreview = true; button.focus({preventScroll:true}); suppressFocusPreview = false; }
}
$('memory-close').addEventListener('click',closeMemoryAndFocus);
document.addEventListener('keydown',e => {
  if (e.key === 'Escape') {
    if (activeMemory) closeMemoryAndFocus();
    else if (!$('music-room').hidden) { stopMusic(); $('music-toggle').focus(); }
  }
});
window.addEventListener('scroll',() => {
  if (!activeMemory) return;
  const rect = activeMemory.getBoundingClientRect();
  if (rect.bottom < 12 || rect.top > window.innerHeight - 12) hideMemory();
  else placeMemory(activeMemory);
},{passive:true});
window.addEventListener('resize',() => { if(activeMemory) placeMemory(activeMemory); });

// YouTube stays an official, visible embed. No audio extraction or hidden iframe.
function setMusicState(state) {
  musicState = state;
  $('music-status').textContent = copy[language][state];
}
function createPlayer() {
  if (player || !window.YT?.Player) return;
  player = new window.YT.Player('youtube-player',{
    width:218,height:200,videoId:'_Utq0ce_YU4',
    host:'https://www.youtube-nocookie.com',
    playerVars:{playsinline:1,controls:1,rel:0,loop:1,playlist:'_Utq0ce_YU4',origin:window.location.origin},
    events:{
      onReady:() => {
        clearTimeout(musicTimer);
        playerReady = true;
        player.setVolume(35);
        if (wantMusic) player.playVideo();
        setMusicState('musicPaused');
      },
      onStateChange:event => {
        const playing = event.data === window.YT.PlayerState.PLAYING;
        document.body.classList.toggle('is-playing',playing);
        if (playing) setMusicState('musicPlaying');
        else if(event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.CUED) setMusicState('musicPaused');
      },
      onAutoplayBlocked:() => setMusicState('musicPaused'),
      onError:() => { clearTimeout(musicTimer); document.body.classList.remove('is-playing'); setMusicState('musicError'); }
    }
  });
}
function startMusic() {
  wantMusic = true;
  $('music-room').hidden = false;
  $('music-toggle').setAttribute('aria-expanded','true');
  if (playerReady) { player.playVideo(); return; }
  if (window.YT?.Player) { createPlayer(); return; }
  if (!apiRequested) {
    apiRequested = true;
    window.onYouTubeIframeAPIReady = createPlayer;
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.onerror = () => setMusicState('musicError');
    document.head.append(script);
    musicTimer = setTimeout(() => { if(!playerReady) setMusicState('musicError'); },12000);
  }
}
function stopMusic() {
  wantMusic = false;
  if(playerReady) player.pauseVideo();
  $('music-room').hidden = true;
  $('music-toggle').setAttribute('aria-expanded','false');
  document.body.classList.remove('is-playing');
}
$('music-toggle').addEventListener('click',() => { if($('music-room').hidden) startMusic(); else stopMusic(); });
$('music-close').addEventListener('click',stopMusic);

if ('IntersectionObserver' in window && !reducedMotion.matches) {
  document.body.classList.add('motion-ready');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if(entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); } });
  },{threshold:.1});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
