const heartsContainer = document.querySelector("#hearts-container");
const controlsContainer = document.querySelector("#controls-container");
const hitButton = controlsContainer.querySelector("#hit-button");
const hitDamageInput = controlsContainer.querySelector("#hit-damage-input");
const healButton = controlsContainer.querySelector("#heal-button");
const healAmountInput = controlsContainer.querySelector("#heal-amount-input");
const addHeartsButton = controlsContainer.querySelector('#add-heart-container-button');
const overhealButton = controlsContainer.querySelector("#overheal-button");
const overhealAmountInput = controlsContainer.querySelector("#overheal-amount-input");
let health = 35;
let maxHealth = 40;
let overHealth = 0;


function randint(lo, hi) {
  return Math.floor(Math.random() * (hi - lo) + lo);
}

function updateHeartsDisplay() {
  let quartersToFill = health;
  for (const heart of heartsContainer.querySelectorAll(".heart")) {
    if (quartersToFill) {
      let quarters = Math.min(quartersToFill, 4);
      heart.dataset.quarters = quarters;
      quartersToFill -= quarters;
    } else {
      heart.dataset.quarters = 0;
    }
  }
  quartersToFill = overHealth;
  for (const heart of heartsContainer.querySelectorAll(".heart.extra")) {
    if (quartersToFill) {
      let quarters = Math.min(quartersToFill, 4);
      heart.dataset.quarters = quarters;
      quartersToFill -= quarters;
    } else {
      heart.dataset.quarters = 0;
    }
  }
  heartsContainer.innerHTML = heartsContainer.innerHTML.replaceAll(
`<div class="heart extra" data-quarters="0">
  <div class="top-left"></div>
  <div class="top-right"></div>
  <div class="bottom-left"></div>
  <div class="bottom-right"></div>
</div>`, "")
}

hitButton.addEventListener("click", function () {
  let damage = Number(hitDamageInput.value);
  if (overHealth > 0) {
    overHealth = overHealth - damage;
    if (overHealth < 0) {
      health = Math.max(0, health + overHealth);
      overHealth = 0;
    };
  } else {
    health = Math.max(0, health - damage);
  };
  updateHeartsDisplay();
});

healButton.addEventListener("click", function () {
  let medical = Number(healAmountInput.value) * 4;
  health = Math.min(maxHealth, health + medical);
  updateHeartsDisplay();
});

addHeartsButton.addEventListener("click", function() {
  heartsContainer.children[(maxHealth / 4) - 1].insertAdjacentHTML('afterend', 
`<div class="heart" data-quarters="0">
  <div class="top-left"></div>
  <div class="top-right"></div>
  <div class="bottom-left"></div>
  <div class="bottom-right"></div>
</div>`);
  maxHealth += 4;
  updateHeartsDisplay();
});

overhealButton.addEventListener("click", function () {
  overHealth = Math.max(Number(overhealAmountInput.value) * 4, overHealth);
  health = maxHealth;
  for (let i = 0; i < Math.floor(overHealth/4); i++) {
    heartsContainer.innerHTML = heartsContainer.innerHTML + 
`<div class="heart extra" data-quarters="4">
  <div class="top-left"></div>
  <div class="top-right"></div>
  <div class="bottom-left"></div>
  <div class="bottom-right"></div>
</div>`;
  }
  updateHeartsDisplay();
});