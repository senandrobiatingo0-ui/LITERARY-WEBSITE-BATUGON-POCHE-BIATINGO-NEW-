// --- SAMPLE LITERARY WORKS ---
const works = {
  poetry: [
    {
      title: "Echoes of the Soul",
      author: "Luna Rivera",
      content: "In the quiet of the night, the soul whispers untold dreams that float like fireflies in the dark...",
      image: "https://www.pixelstalk.net/wp-content/uploads/2016/07/Download-Free-Pictures-3840x2160.jpg"
    },
    {
      title: "Moonlight Soliloquy",
      author: "Aria Domingo",
      content: "The moon listens to the heart’s quiet songs, unspoken yet heard by the stars above...",
      image: "https://www.pixelstalk.net/wp-content/uploads/2016/07/Download-Free-Pictures-3840x2160.jpg"
    }
  ],
  fiction: [
    {
      title: "The Clockmaker's Secret",
      author: "J. N. De Luna",
      content: "In a small town where time stood still, a clockmaker hides a secret that could change eternity itself...",
      image: "https://images.unsplash.com/photo-1473186505569-9c61870c11f9?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "The Mirror Town",
      author: "Rico Alonzo",
      content: "A young woman discovers a world inside mirrors, where her reflection has a life of its own...",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80"
    }
  ],
  "non-fiction": [
    {
      title: "Letters from the Mountains",
      author: "Carlos Marquez",
      content: "Reflections on solitude, resilience, and the enduring beauty of the mountains that shaped my youth...",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80"
    }
  ],
  essays: [
    {
      title: "The Art of Being Still",
      author: "E. Santos",
      content: "Modern life praises motion, yet stillness teaches us what true presence means...",
      image: "https://images.unsplash.com/photo-1526481280691-3d71e36a6979?auto=format&fit=crop&w=600&q=80"
    }
  ],
  "short-story": [
    {
      title: "The Last Train Home",
      author: "B. Castillo",
      content: "He missed the train — or perhaps, the train missed him. In that moment, fate rewrote itself...",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80"
    }
  ],
  fable: [
    {
      title: "The Sparrow and the Storm",
      author: "F. Dela Cruz",
      content: "A small sparrow learns that even the fiercest storm bows to persistence and courage...",
      image: "https://images.unsplash.com/photo-1496497243327-4f4ee9c6d408?auto=format&fit=crop&w=600&q=80"
    }
  ]
};

// --- SELECTORS ---
const tabButtons = document.querySelectorAll(".tab-button");
const categorySections = document.querySelectorAll(".category-content");
const modal = document.getElementById("work-modal");
const modalDetails = document.getElementById("modal-details");
const closeModal = modal.querySelector(".close");
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const loginModal = document.getElementById("login-modal");
const registerModal = document.getElementById("register-modal");



// --- LOAD WORKS INTO CATEGORIES ---
function loadWorks(category) {
  const container = document.getElementById(category);
  container.innerHTML = "";
  works[category].forEach((work, index) => {
    const div = document.createElement("div");
    div.classList.add("work-card");
    div.innerHTML = `
      <img src="${work.image}" alt="${work.title}">
      <h3>${work.title}</h3>
      <p><em>by ${work.author}</em></p>
      <div class="rating" data-category="${category}" data-index="${index}">
        ${renderStars(category, index)}
      </div>
    `;
    div.addEventListener("click", () => openModal(category, index));
    container.appendChild(div);
  });
}

// --- INIT: Load all categories ---
Object.keys(works).forEach(cat => loadWorks(cat));

// --- CATEGORY TAB SWITCH ---
tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    tabButtons.forEach(btn => btn.classList.remove("active"));
    categorySections.forEach(sec => sec.classList.remove("active"));

    button.classList.add("active");
    const category = button.getAttribute("data-category");
    document.getElementById(category).classList.add("active");
  });
});

// --- MODAL ---
function openModal(category, index) {
  const work = works[category][index];
  modal.style.display = "flex";
  modalDetails.innerHTML = `
    <h2>${work.title}</h2>
    <p><em>by ${work.author}</em></p>
    <p>${work.content}</p>
    <h3>Your Rating:</h3>
    <div class="rating" data-category="${category}" data-index="${index}">
      ${renderStars(category, index)}
    </div>
    <div class="comment-section">
      <h3>Comments:</h3>
      <div id="comments-${category}-${index}" class="comments-list">
        ${renderComments(category, index)}
      </div>
      <textarea id="comment-input-${category}-${index}" rows="2" placeholder="Write a comment..."></textarea>
      <button onclick="addComment('${category}', ${index})">Post Comment</button>
    </div>
  `;
}
closeModal.onclick = () => modal.style.display = "none";
window.onclick = e => { if (e.target === modal) modal.style.display = "none"; };

// --- RATING ---
function renderStars(category, index) {
  const key = `${category}-${index}`;
  const rating = localStorage.getItem(`rating-${key}`) || 0;
  let stars = "";
  for (let i=1; i<=5; i++){
    stars += `<span class="star" data-value="${i}" onclick="setRating('${category}', ${index}, ${i})">${i<=rating?'★':'☆'}</span>`;
  }
  return stars;
}
function setRating(category, index, value) {
  const key = `${category}-${index}`;
  localStorage.setItem(`rating-${key}`, value);
  openModal(category, index);
}

// --- COMMENTS ---
function renderComments(category, index) {
  const key = `${category}-${index}`;
  const comments = JSON.parse(localStorage.getItem(`comments-${key}`) || "[]");
  return comments.map(c=>`<p>💬 ${c}</p>`).join("");
}
function addComment(category, index) {
  const key = `${category}-${index}`;
  const input = document.getElementById(`comment-input-${category}-${index}`);
  if (!input.value.trim()) return;
  const comments = JSON.parse(localStorage.getItem(`comments-${key}`) || "[]");
  comments.push(input.value.trim());
  localStorage.setItem(`comments-${key}`, JSON.stringify(comments));
  openModal(category, index);
}

// Navbar welcome message element
const navContainer = document.querySelector(".nav-links");

// LOGIN FORM
document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  
  const email = document.getElementById("login-email").value;
  alert("Login successful! (Demo only)");
  loginModal.style.display = "none";

  // Hide login/register buttons
  loginBtn.style.display = "none";
  registerBtn.style.display = "none";

  // Show welcome message
  const welcomeMsg = document.createElement("span");
  welcomeMsg.id = "welcome-msg";
  welcomeMsg.textContent = `Welcome, ${email}`;
  welcomeMsg.style.color = "white";
  welcomeMsg.style.marginLeft = "12px";
  navContainer.appendChild(welcomeMsg);
});

// REGISTER FORM
document.getElementById("register-form").addEventListener("submit", (e) => {
  e.preventDefault();
  
  const name = document.getElementById("register-name").value;
  alert("Registration complete! (Demo only)");
  registerModal.style.display = "none";

  // Hide login/register buttons
  loginBtn.style.display = "none";
  registerBtn.style.display = "none";

  // Show welcome message
  const welcomeMsg = document.createElement("span");
  welcomeMsg.id = "welcome-msg";
  welcomeMsg.textContent = `Welcome, ${name}`;
  welcomeMsg.style.color = "white";
  welcomeMsg.style.marginLeft = "12px";
  navContainer.appendChild(welcomeMsg);
});





