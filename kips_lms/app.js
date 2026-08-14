const courses = [
  {id:1,title:'Freelancing',icon:'💼',instructor:'Sarah Khan',lectures:4,progress:75,desc:'Learn profile creation, proposals and client management.'},
  {id:2,title:'Graphic Design',icon:'🎨',instructor:'Usman Ali',lectures:4,progress:40,desc:'Design fundamentals, branding and social media creatives.'},
  {id:3,title:'Digital Marketing',icon:'📈',instructor:'Ayesha Noor',lectures:4,progress:20,desc:'SEO, social media marketing and campaign planning.'},
  {id:4,title:'WordPress',icon:'🌐',instructor:'Hamza Raza',lectures:4,progress:0,desc:'Build professional websites without advanced coding.'},
  {id:5,title:'E-Commerce',icon:'🛒',instructor:'Mariam Shah',lectures:4,progress:0,desc:'Launch and manage an online store.'},
  {id:6,title:'Communication Skills',icon:'🗣️',instructor:'Bilal Ahmed',lectures:4,progress:0,desc:'Professional communication for jobs and freelancing.'}
];

const lessons = [
  'Introduction and course roadmap',
  'Tools, setup and practical workflow',
  'Hands-on project lesson',
  'Assessment and next steps'
];

const app = document.querySelector('#app');
const modal = document.querySelector('#modal');
const modalContent = document.querySelector('#modal-content');

function courseCard(c){
  return `<article class="course-card">
    <div class="course-cover">${c.icon}</div>
    <div class="course-body">
      <h3>${c.title}</h3>
      <p>${c.desc}</p>
      <div class="meta"><span>${c.instructor}</span><span>${c.lectures} lectures</span></div>
      <div class="progress"><span style="width:${c.progress}%"></span></div>
      <p class="small">${c.progress}% complete</p>
      <button class="primary" data-course="${c.id}">${c.progress ? 'Continue Course' : 'View Course'}</button>
    </div>
  </article>`;
}

function renderHome(){
  app.innerHTML = document.querySelector('#home-template').innerHTML;
  document.querySelector('#featured-courses').innerHTML = courses.slice(0,3).map(courseCard).join('');
  bindCourseButtons();
}

function renderCourses(){
  app.innerHTML = document.querySelector('#courses-template').innerHTML;
  const grid = document.querySelector('#courses-grid');
  const draw = items => {grid.innerHTML = items.map(courseCard).join(''); bindCourseButtons();};
  draw(courses);
  document.querySelector('#course-search').addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    draw(courses.filter(c => c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)));
  });
}

function renderDashboard(){
  app.innerHTML = document.querySelector('#dashboard-template').innerHTML;
  const active = courses.filter(c => c.progress > 0);
  document.querySelector('#my-courses').innerHTML = active.map(c => `
    <div class="my-course">
      <strong>${c.icon} ${c.title}</strong>
      <p class="small">${c.instructor} · ${c.progress}% completed</p>
      <div class="progress"><span style="width:${c.progress}%"></span></div>
      <br><button class="primary" data-course="${c.id}">Continue</button>
    </div>`).join('');
  bindCourseButtons();
}

function renderAdmin(){
  app.innerHTML = document.querySelector('#admin-template').innerHTML;
}

function showCourse(id){
  const c = courses.find(x => x.id === Number(id));
  modalContent.innerHTML = `
    <h1>${c.icon} ${c.title}</h1>
    <p>${c.desc}</p>
    <p><strong>Instructor:</strong> ${c.instructor}</p>
    <div class="lesson-list">
      ${lessons.map((l,i)=>`<div class="lesson"><span>${i+1}. ${l}</span><button class="primary" data-lesson="${i+1}">Open</button></div>`).join('')}
    </div>
    <br><button class="primary" data-action="quiz">Take Quiz</button>`;
  modal.classList.remove('hidden');
  modalContent.querySelectorAll('[data-lesson]').forEach(btn => btn.addEventListener('click', () => {
    alert('Demo lecture opened. In production, a secure video player will appear here.');
  }));
  modalContent.querySelector('[data-action="quiz"]').addEventListener('click', showQuiz);
}

function showQuiz(){
  modalContent.innerHTML = `
    <div class="quiz">
      <h2>Course Quiz</h2>
      <p>Which feature helps students see completed lessons?</p>
      <label><input type="radio" name="q" value="a"> Payment gateway</label>
      <label><input type="radio" name="q" value="b"> Progress tracking</label>
      <label><input type="radio" name="q" value="c"> Contact form</label>
      <br><button class="primary" id="submit-quiz">Submit Quiz</button>
      <p id="quiz-result"></p>
    </div>`;
  document.querySelector('#submit-quiz').onclick = () => {
    const val = document.querySelector('input[name="q"]:checked')?.value;
    document.querySelector('#quiz-result').textContent =
      val === 'b' ? 'Correct! Score: 100%' : 'Please select the correct answer and try again.';
  };
}

function showCertificate(){
  modalContent.innerHTML = `<div class="certificate">
    <p>SkillRise Learning Platform</p>
    <h1>Certificate of Completion</h1>
    <p>This certificate is proudly presented to</p>
    <h2>Ali Student</h2>
    <p>for successfully completing the course</p>
    <h2>Freelancing Fundamentals</h2>
    <p>Certificate ID: SR-2026-0001</p>
    <p class="small">Verification: yourdomain.com/verify/SR-2026-0001</p>
  </div>`;
  modal.classList.remove('hidden');
}

function bindCourseButtons(){
  document.querySelectorAll('[data-course]').forEach(btn => btn.addEventListener('click', () => showCourse(btn.dataset.course)));
}

document.addEventListener('click', e => {
  const view = e.target.dataset.view;
  if(view === 'home') renderHome();
  if(view === 'courses') renderCourses();
  if(view === 'dashboard') renderDashboard();
  if(view === 'admin') renderAdmin();
  if(e.target.dataset.action === 'browse') renderCourses();
  if(e.target.dataset.action === 'certificate') showCertificate();
  if(e.target.dataset.action === 'close-modal') modal.classList.add('hidden');
  if(e.target.dataset.action === 'add-course') alert('Demo: Course creation form will be connected to the Laravel admin panel.');
});
modal.addEventListener('click', e => { if(e.target === modal) modal.classList.add('hidden'); });
renderHome();
