// Shared JS for CHS Strength Club

function openModal(e){e.preventDefault();document.getElementById("modal").classList.add("open");document.body.style.overflow="hidden"}
function closeModal(){document.getElementById("modal").classList.remove("open");document.body.style.overflow=""}
function closeModalOutside(e){if(e.target===document.getElementById("modal"))closeModal()}
function toggleMenu(){const m=document.getElementById("mobMenu");m.classList.toggle("open");document.body.style.overflow=m.classList.contains("open")?"hidden":""}

// IntersectionObserver for reveal animations
const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");obs.unobserve(e.target)}})},{threshold:0.08});
document.querySelectorAll(".reveal").forEach(el=>obs.observe(el));

// Contact form handler (index.html only)
const cf=document.getElementById('contactForm');
if(cf){
  cf.addEventListener('submit',function(e){
    e.preventDefault();
    const btn=this.querySelector('.form-sub');
    btn.textContent='Sending...';
    btn.disabled=true;
    fetch(this.action,{method:'POST',body:new FormData(this)})
      .then(()=>{closeModal();alert("Thanks! Adam will be in touch within 24 hours.\n\nOr call/text: (978) 604-5920");this.reset()})
      .catch(()=>{alert("Something went wrong. Please email chsstrengthclub@gmail.com directly.")})
      .finally(()=>{btn.textContent='Send to Adam';btn.disabled=false});
  });
}
