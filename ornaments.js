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
  // Italianno N outline, centered by its ink bounds on the halo (240, 243).
  // The shared viewBox keeps the initial aligned at every size without font metrics.
  monogram: () => svg("0 0 480 680", `<path class="garden-initial" transform="translate(150.87190 297.80664) scale(0.1880159 -0.1880159)" d="M577 -30Q574 -30 571.5 -28.0Q569 -26 570 -25Q577 -16 581.5 -5.5Q586 5 590 16Q577 86 555.5 162.0Q534 238 509.5 314.5Q485 391 463 460Q456 455 448.5 436.0Q441 417 438 408Q425 374 407.5 328.5Q390 283 368.5 234.5Q347 186 320.5 139.5Q294 93 262 55Q247 36 221.0 21.5Q195 7 167.0 -1.5Q139 -10 116 -10Q85 -10 56.5 7.5Q28 25 14 61Q10 74 8.0 88.5Q6 103 6 117Q6 131 11 131Q16 131 16 123Q16 76 42.0 45.0Q68 14 104 14Q139 14 174.0 31.0Q209 48 237 78Q282 128 313.0 184.0Q344 240 368.0 300.0Q392 360 417 420Q432 458 459.0 486.0Q486 514 522 521H467Q432 521 393.0 518.0Q354 515 322.0 505.0Q290 495 276 475Q268 463 268 446Q268 428 277.0 412.0Q286 396 300 389Q302 387 302 387Q302 384 297.5 381.5Q293 379 288 380Q280 385 268.0 396.5Q256 408 246.5 421.0Q237 434 234 443Q230 455 230 467Q230 491 247.5 506.0Q265 521 293.0 529.0Q321 537 353.5 540.5Q386 544 416.0 544.5Q446 545 468 545H589Q594 546 589.5 538.0Q585 530 578.5 522.5Q572 515 568 515Q558 516 537.5 511.5Q517 507 509 501Q512 463 523.5 412.0Q535 361 551.0 304.5Q567 248 586.5 191.5Q606 135 625 86Q641 124 661.0 179.0Q681 234 703.5 296.0Q726 358 750.5 416.5Q775 475 799.5 521.0Q824 567 848 589Q860 600 877.0 606.5Q894 613 909 613Q923 613 933.0 606.5Q943 600 942 586L941 550Q941 549 936.0 548.0Q931 547 932 548Q933 561 922.0 566.5Q911 572 904 572Q883 573 859.5 546.0Q836 519 811.0 475.0Q786 431 762.0 378.5Q738 326 716.5 273.5Q695 221 678.0 177.0Q661 133 650 108Q640 87 640 67Q640 64 640.0 61.0Q640 58 641 55Q641 51 642.5 46.0Q644 41 645 36Q645 35 645.5 34.0Q646 33 646 31Q646 23 638 17Q628 10 616 5Q609 2 596.5 -10.5Q584 -23 581 -28Q579 -30 577 -30Z"/>`),
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
