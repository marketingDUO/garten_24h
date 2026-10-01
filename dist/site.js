const menu=document.querySelector('.menubtn');
const nav=document.querySelector('#nav');

menu?.addEventListener('click',()=>{
  const open=menu.getAttribute('aria-expanded')==='true';
  menu.setAttribute('aria-expanded',String(!open));
  nav.classList.toggle('open',!open);
});

document.querySelectorAll('.navgroup>button').forEach(button=>button.addEventListener('click',()=>{
  const group=button.parentElement;
  const open=button.getAttribute('aria-expanded')==='true';
  button.setAttribute('aria-expanded',String(!open));
  group.classList.toggle('open',!open);
}));

const params=new URLSearchParams(location.search);
document.querySelectorAll('[data-mail-form],#contact-form').forEach(form=>{
  const place=params.get('ort')||params.get('region');
  const service=params.get('leistung');
  const placeField=form.querySelector('[name="ort"]');
  const serviceField=form.querySelector('[name="leistung"]');
  if(place&&placeField)placeField.value=place;
  if(service&&serviceField)serviceField.value=service;

  form.addEventListener('submit',event=>{
    event.preventDefault();
    const data=new FormData(form);
    const project=data.get('projekt');
    const subject=`Garten24h Anfrage – ${data.get('leistung')||'Gartenprojekt'} – ${data.get('ort')||''}`;
    const body=[
      `Name: ${data.get('vorname')||''} ${data.get('nachname')||''}`,
      `E-Mail: ${data.get('email')||''}`,
      `Telefon: ${data.get('telefon')||''}`,
      `Ort: ${data.get('plz')||''} ${data.get('ort')||''}`,
      `Leistung: ${data.get('leistung')||''}`,
      project?`Projekt: ${project}`:'',
      '',
      'Nachricht:',
      String(data.get('nachricht')||'')
    ].filter(Boolean).join('\n');
    location.href=`mailto:info@garten24h.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
});
