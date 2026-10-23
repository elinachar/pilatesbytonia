const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
const servicesGroup = document.querySelector('.nav-services');
const servicesToggle = document.querySelector('.services-toggle');
const servicesDropdown = document.querySelector('#services-dropdown');
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)');
let servicesCloseTimer;
function setServicesOpen(open) {
 clearTimeout(servicesCloseTimer);
 servicesToggle.setAttribute('aria-expanded', String(open));
 servicesToggle.setAttribute('aria-label', open ? 'Απόκρυψη υπηρεσιών' : 'Εμφάνιση υπηρεσιών');
 servicesDropdown.hidden = !open;
}
function closeMenu() {
 toggle.setAttribute('aria-expanded', 'false');
 toggle.setAttribute('aria-label', 'Άνοιγμα μενού');
 nav.classList.remove('open');
 setServicesOpen(false);
}
toggle.addEventListener('click', () => {
 const open = toggle.getAttribute('aria-expanded') !== 'true';
 toggle.setAttribute('aria-expanded', String(open));
 toggle.setAttribute('aria-label', open ? 'Κλείσιμο μενού' : 'Άνοιγμα μενού');
 nav.classList.toggle('open', open);
 if (!open) setServicesOpen(false);
});
servicesToggle.addEventListener('click', () => setServicesOpen(servicesDropdown.hidden));
servicesGroup.addEventListener('pointerenter', () => { if (canHover.matches) setServicesOpen(true); });
servicesGroup.addEventListener('pointerleave', () => {
 if (canHover.matches && !servicesGroup.contains(document.activeElement)) {
  servicesCloseTimer = setTimeout(() => setServicesOpen(false), 200);
 }
});
servicesGroup.addEventListener('focusout', event => {
 if (!servicesGroup.contains(event.relatedTarget)) setServicesOpen(false);
});
servicesGroup.addEventListener('keydown', event => {
 const links = [...servicesDropdown.querySelectorAll('a')];
 if (event.target === servicesToggle && ['ArrowDown', 'ArrowUp'].includes(event.key)) {
  event.preventDefault(); setServicesOpen(true);
  links[event.key === 'ArrowDown' ? 0 : links.length - 1].focus();
 }
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', event => { if (!servicesGroup.contains(event.target)) setServicesOpen(false); });
document.addEventListener('keydown', event => {
 if (event.key !== 'Escape') return;
 if (!servicesDropdown.hidden) {
  setServicesOpen(false); servicesToggle.focus(); event.preventDefault();
 } else if (nav.classList.contains('open')) {
  closeMenu(); toggle.focus(); event.preventDefault();
 }
});
window.matchMedia('(max-width: 760px)').addEventListener('change', closeMenu);
const equipment = {
 reformer: { image: 'reformer', alt: 'Ξύλινο Reformer και εξοπλισμός Pilates στον χώρο του studio', kicker: 'ΔΥΝΑΜΗ ΜΕ ΕΛΕΓΧΟ', title: ['Μικρές κινήσεις.', 'Ουσιαστική δουλειά.'], description: 'Στο Reformer, η αντίσταση των ελατηρίων γίνεται εργαλείο για δύναμη, σταθερότητα και ρευστή κίνηση. Κάθε άσκηση και κάθε αντίσταση επιλέγεται σύμφωνα με τις δικές σου ανάγκες.', benefits: ['Ενδυνάμωση σε βάθος', 'Έλεγχος & συγκέντρωση', 'Ισορροπία & κινητικότητα'] },
 cadillac: { image: 'cadillac-focus-v2', alt: 'Το Cadillac και τα υπόλοιπα όργανα στον χώρο του studio', kicker: 'ΣΤΑΘΕΡΟΤΗΤΑ ΚΑΙ ΕΛΕΥΘΕΡΙΑ', title: ['Η δύναμη συναντά', 'την ακρίβεια.'], description: 'Στο Cadillac, κάθε κίνηση συνδυάζει σταθερότητα, ακρίβεια και σύνδεση σώματος και νου. Η καθοδήγηση και η προσαρμογή των ασκήσεων σε βοηθούν να εξερευνήσεις τις δυνατότητες της κίνησής σου.', benefits: ['Σύνδεση σώματος & νου', 'Έλεγχος της κίνησης', 'Δύναμη & ευλυγισία'] },
 chair: { image: 'pilates-chair', alt: 'Pilates Chair στον φωτεινό χώρο του studio', kicker: 'ΠΟΙΟΤΗΤΑ ΣΕ ΚΑΘΕ ΚΙΝΗΣΗ', title: ['Μικρό όργανο.', 'Μεγάλη πρόκληση.'], description: 'Η Pilates Chair φέρνει τη δύναμη και την ισορροπία μαζί. Δουλεύουμε με συγκέντρωση, αναπνοή και έλεγχο, δίνοντας αξία στην ποιότητα κάθε κίνησης και όχι απλώς στον αριθμό των επαναλήψεων.', benefits: ['Ισορροπία & σταθερότητα', 'Ενεργοποίηση του κορμού', 'Συγκέντρωση & ακρίβεια'] },
 barrel: { image: 'ladder-barrel', alt: 'Το ξύλινο Ladder Barrel του studio με μαύρη καμπύλη επιφάνεια και σκάλα', kicker: 'ΣΤΗΡΙΞΗ ΚΑΙ ΚΙΝΗΤΙΚΟΤΗΤΑ', title: ['Χώρος για διάταση.', 'Βάση για έλεγχο.'], description: 'Η καμπύλη επιφάνεια και η ξύλινη σκάλα του Ladder Barrel προσφέρουν στήριξη για διατάσεις, κινητικότητα και ελεγχόμενη ενεργοποίηση του κορμού. Κάθε άσκηση προσαρμόζεται στο δικό σου εύρος κίνησης.', benefits: ['Κινητικότητα & ευλυγισία', 'Έλεγχος του κορμού', 'Στήριξη & ακρίβεια'] },
 spring: {"image": "spring-wall", "alt": "Το ξύλινο Spring Wall του studio με ελατήρια, λαβές και σημεία ανάρτησης σε διαφορετικά ύψη", "kicker": "ΤΟ ΕΠΙΤΟΙΧΙΟ ΣΥΣΤΗΜΑ ΕΛΑΤΗΡΙΩΝ", "title": ["Spring Wall"], "lead": "Πολλά σημεία στήριξης. Πολλές δυνατότητες.", "description": ["Το Spring Wall είναι το ξύλινο όργανο που στερεώνεται στον τοίχο και διαθέτει σημεία ανάρτησης σε διαφορετικά ύψη. Εκεί συνδέονται ελατήρια, λαβές και μπάρες για διαφορετικές κατευθύνσεις κίνησης.", "Το ύψος της σύνδεσης και η επιλογή του ελατηρίου αλλάζουν τον τρόπο που δουλεύει η άσκηση. Με προσωπική καθοδήγηση, εξερευνούμε κινήσεις για τα χέρια, τα πόδια και τον κορμό, με έμφαση στη σταθερότητα και στον έλεγχο."], "benefits": ["Προσαρμογή της αντίστασης", "Ποικιλία στην κατεύθυνση της κίνησης", "Έλεγχος και συντονισμός"]},
 mat: {"image": "mat-accessories", "alt": "Ενδεικτική σύνθεση με στρώμα Pilates, Μαγικό Κύκλο, μικρή μπάλα, βαράκια και Spine Corrector", "kicker": "Η ΟΥΣΙΑ ΣΤΙΣ ΜΙΚΡΕΣ ΛΕΠΤΟΜΕΡΕΙΕΣ", "title": ["Mat & μικρός", "εξοπλισμός"], "lead": "Απλά εργαλεία. Πολλές επιλογές.", "description": ["Στο στρώμα, η προσοχή στρέφεται στην αναπνοή, στη θέση του σώματος και στον έλεγχο της κίνησης. Ο μικρός εξοπλισμός προσθέτει διαφορετικά ερεθίσματα και τρόπους στήριξης.", "Ο Μαγικός Κύκλος προσθέτει αντίσταση, οι μπάλες και τα βαράκια εμπλουτίζουν το ασκησιολόγιο, ενώ το Spine Corrector προσφέρει μια καμπύλη επιφάνεια στήριξης. Κάθε εργαλείο επιλέγεται σύμφωνα με τον σκοπό της άσκησης."], "benefits": ["Αναπνοή και συγκέντρωση", "Συντονισμός της κίνησης", "Ποικιλία με προσωπική καθοδήγηση"]}
};
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectEquipment(tab) {
 const item = equipment[tab.dataset.equipment];
 tabs.forEach(button => { const active = button === tab; button.setAttribute('aria-selected', String(active)); button.tabIndex = active ? 0 : -1; });
 const image = document.querySelector('#equipment-image'); image.src = `assets/${item.image}.webp`; image.alt = item.alt; image.dataset.equipment = tab.dataset.equipment;
 document.querySelector('#equipment-kicker').textContent = item.kicker;
 const title = document.querySelector('#equipment-title'); title.replaceChildren(...item.title.flatMap((line, index) => index ? [document.createElement('br'), document.createTextNode(line)] : [document.createTextNode(line)]));
 const lead = document.querySelector('#equipment-lead'); lead.hidden = !item.lead; lead.textContent = item.lead || '';
 const paragraphs = Array.isArray(item.description) ? item.description : [item.description];
 document.querySelector('#equipment-description').replaceChildren(...paragraphs.map(text => { const p = document.createElement('p'); p.textContent = text; return p; }));
 document.querySelector('#equipment-benefits').replaceChildren(...item.benefits.map(text => { const li = document.createElement('li'); li.textContent = text; return li; }));
 document.querySelector('#equipment-panel').setAttribute('aria-labelledby', tab.id);
}
tabs.forEach((tab, index) => { tab.addEventListener('click', () => selectEquipment(tab)); tab.addEventListener('keydown', event => { let next; if (event.key === 'ArrowRight') next = (index + 1) % tabs.length; if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length; if (event.key === 'Home') next = 0; if (event.key === 'End') next = tabs.length - 1; if (next !== undefined) { event.preventDefault(); tabs[next].focus(); selectEquipment(tabs[next]); } }); });
document.querySelector('#year').textContent = new Date().getFullYear();

// Match the homepage preview to the service under the pointer or keyboard focus.
const servicePreviewImage = document.querySelector('#home-service-image');
if (servicePreviewImage) {
 const servicePreviewCaption = document.querySelector('#home-service-caption');
 const servicePreviewLinks = [...document.querySelectorAll('.home-service-links > a[data-service-image]')];
 function previewService(link) {
  const service = link.dataset;
  servicePreviewImage.src = service.serviceImage;
  servicePreviewImage.alt = service.serviceAlt;
  servicePreviewImage.width = Number(service.serviceWidth);
  servicePreviewImage.height = Number(service.serviceHeight);
  servicePreviewImage.dataset.service = service.serviceKey;
  servicePreviewCaption.textContent = service.serviceCaption;
  servicePreviewLinks.forEach(item => item.classList.toggle('is-previewed', item === link));
 }
 servicePreviewLinks.forEach(link => {
  link.addEventListener('pointerenter', event => { if (event.pointerType !== 'touch') previewService(link); });
  link.addEventListener('focus', () => previewService(link));
 });
}

// Load one responsive studio film and pause it when it leaves the viewport.
const studioFilm = document.querySelector('#studio-hero-video');
if (studioFilm) {
 const smallScreen = window.matchMedia('(max-width: 760px)');
 const quietMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
 let filmVisible = false;
 function syncFilmPlayback() {
  if (filmVisible && !document.hidden && !quietMotion.matches) studioFilm.play().catch(() => {});
  else if (!filmVisible || document.hidden || quietMotion.matches) studioFilm.pause();
 }
 function selectFilm() {
  const variant = smallScreen.matches ? 'mobile' : 'desktop';
  studioFilm.poster = `assets/pilates_hero_${variant}-poster.jpg`;
  studioFilm.src = `assets/pilates_hero_${variant}.mp4`;
  studioFilm.muted = true;
  studioFilm.load();
  syncFilmPlayback();
 }
 smallScreen.addEventListener('change', selectFilm);
 quietMotion.addEventListener('change', syncFilmPlayback);
 document.addEventListener('visibilitychange', syncFilmPlayback);
 selectFilm();
 if ('IntersectionObserver' in window) {
  new IntersectionObserver(entries => {
   filmVisible = entries[0].isIntersecting;
   syncFilmPlayback();
  }, {threshold:0.1}).observe(studioFilm);
 } else { filmVisible = true; syncFilmPlayback(); }
}

// Silent illustrative loops respect motion preferences and page visibility.
document.querySelectorAll('[data-loop-film]').forEach(film => {
 const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
 let visible = false;
 const sync = () => {
  if (visible && !document.hidden && !reduced.matches) { film.muted = true; film.play().catch(() => {}); }
  else film.pause();
 };
 reduced.addEventListener('change', sync);
 document.addEventListener('visibilitychange', sync);
 if ('IntersectionObserver' in window) {
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }, {threshold:0.1}).observe(film);
 } else { visible = true; sync(); }
});

// A bounded scroll offset keeps the divider image inside its frame.
const divider = document.querySelector('[data-scroll-divider]');
if (divider) {
 const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
 let queued = false;
 const update = () => {
  queued = false;
  const rect = divider.getBoundingClientRect();
  const progress = Math.max(-1, Math.min(1, (window.innerHeight / 2 - rect.top - rect.height / 2) / window.innerHeight));
  divider.style.setProperty('--scroll-offset', reduced.matches ? '0px' : `${progress * 55}px`);
 };
 const schedule = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
 window.addEventListener('scroll', schedule, {passive:true});
 window.addEventListener('resize', schedule);
 reduced.addEventListener('change', schedule);
 update();
}
