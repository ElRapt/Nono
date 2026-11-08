// Decorative geometry drawn in SVG: no raster art, generated imagery or icon library.
const petal = '<path d="M0-7C-17-20-9-45 0-54C9-45 17-20 0-7Z"/>';
function flower(x, y, scale = 1, count = 10) {
  return `<g class="flower" transform="translate(${x} ${y}) scale(${scale})">${Array.from({length:count}, (_,i)=>`<g transform="rotate(${i*360/count})">${petal}</g>`).join("")}<circle class="flower-heart" r="9"/><circle class="flower-ring" r="4"/></g>`;
}
const leaf = '<path class="leaf" d="M0 0C-2-28 17-48 26-55C32-29 16-5 0 0Z"/><path class="leaf-vein" d="M0 0Q10-26 24-51"/>';
const svg = (box, body, cls="") => `<svg viewBox="${box}" class="ornament ${cls}" xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true" focusable="false">${body}</svg>`;
const vineBody = `<path class="stem" d="M90 620C-14 482 170 417 81 299S122 98 77 15M80 300C25 252 11 176 60 139M83 407C138 356 174 275 141 227M62 502C17 442 10 390 39 354"/>
  <g transform="translate(73 459) rotate(-70)">${leaf}</g><g transform="translate(90 393) rotate(5)">${leaf}</g><g transform="translate(84 298) rotate(-70)">${leaf}</g><g transform="translate(67 236) rotate(20)">${leaf}</g><g transform="translate(79 137) rotate(-70)">${leaf}</g>
  ${flower(61,139,.55)}${flower(141,227,.68)}${flower(39,354,.42)}${flower(77,36,.55)}`;

const designs = {
  garden: () => {
    const rays = Array.from({length:32},(_,i)=>`<g transform="rotate(${i*11.25} 240 243)"><path class="halo-ray" d="M240 69C224 88 223 111 240 125C257 111 256 88 240 69Z"/><circle class="halo-dot" cx="240" cy="83" r="2.5"/></g>`).join("");
    return svg("0 0 480 680", `<rect class="garden-ground" x="1" y="1" width="478" height="678" rx="232"/>
      <path class="garden-arch" d="M18 661V243a222 222 0 0 1 444 0v418Z"/><path class="arch-inner" d="M29 650V243a211 211 0 0 1 422 0v407Z"/>
      <circle class="halo-field" cx="240" cy="243" r="183"/><circle class="halo-outline" cx="240" cy="243" r="176"/>${rays}<circle class="halo-centre" cx="240" cy="243" r="116"/><circle class="halo-outline" cx="240" cy="243" r="108"/>
      <path class="garden-floor" d="M30 592C115 553 99 416 26 402V650H450V402C381 420 361 553 450 592"/>
      <g class="garden-stems"><path class="stem" d="M238 650C159 566 212 467 133 440S27 524 75 556C132 592 156 515 112 499M243 650C316 556 263 478 345 419S454 484 408 523C363 561 338 505 365 477M111 497C88 441 118 384 87 338M366 477C421 418 393 349 406 319"/>
      <g transform="translate(169 544) rotate(-80) scale(1.3)">${leaf}</g><g transform="translate(199 597) rotate(-40) scale(1.2)">${leaf}</g><g transform="translate(291 559) rotate(25) scale(1.2)">${leaf}</g><g transform="translate(308 466) rotate(-30)">${leaf}</g><g transform="translate(116 417) rotate(-65)">${leaf}</g><g transform="translate(384 415) rotate(20)">${leaf}</g>
      ${flower(133,440,.9)}${flower(345,419,1.02)}${flower(87,338,.46)}${flower(406,319,.42)}${flower(73,555,.55)}${flower(409,525,.52)}
      <path class="stem fine-stem" d="M237 649Q177 614 147 563M243 649Q298 615 337 568"/>${flower(147,563,.34)}${flower(337,568,.34)}</g>
      <path class="garden-lozenge" d="M240 596l22 29-22 29-22-29Z"/><path class="fine-stem" d="M232 625h16M240 617v16"/>`, "garden-svg");
  },
  sprig: () => svg("0 0 220 240", `<path class="stem" d="M105 228C153 153 58 124 113 50M116 197C69 163 54 112 65 81M120 163C171 146 183 112 171 99"/><g transform="translate(120 188) rotate(18)">${leaf}</g><g transform="translate(107 143) rotate(-65) scale(.8)">${leaf}</g>${flower(113,50,.73)}${flower(65,81,.4)}${flower(171,99,.48)}`),
  divider: () => svg("0 0 1000 65", `<path class="divider-line" d="M0 32H400Q455 32 472 17M1000 32H600Q545 32 528 17M35 40H396M965 40H604"/><path class="stem" d="M441 32Q471 62 500 32Q529 62 559 32M456 30Q477 7 500 32Q523 7 544 30"/>${flower(500,30,.39,8)}`),
  rosette: () => svg("0 0 340 340", `<circle class="rosette-field" cx="170" cy="170" r="142"/><circle class="halo-outline" cx="170" cy="170" r="151"/><circle class="halo-outline" cx="170" cy="170" r="131"/><g class="rosette-petals">${Array.from({length:12},(_,i)=>`<g transform="rotate(${i*30} 170 170)"><path class="rosette-leaf" d="M170 170C119 119 137 49 170 29C203 49 221 119 170 170Z"/><path class="leaf-vein" d="M170 60V170"/></g>`).join("")}</g>${flower(170,170,.95,12)}<circle class="flower-heart" cx="170" cy="170" r="12"/>`, "rosette-svg"),
  vine: () => svg("0 0 180 650", vineBody),
};
export function decorate() {
  document.querySelectorAll('[data-ornament]').forEach(el => {
    const draw = designs[el.dataset.ornament];
    if (draw) el.innerHTML = draw();
  });
}
