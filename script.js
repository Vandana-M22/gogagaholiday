let depPrice = 0;
let retPrice = 0;
let depSelected = false;
let retSelected = false;

// SELECT FLIGHT
function selectCard(card, type) {
  const parent = card.parentElement;

  parent.querySelectorAll(".card").forEach(c => c.classList.remove("selected"));
  card.classList.add("selected");

  const price = parseInt(card.dataset.price);
  const time = card.dataset.time;

  if (type === "dep") {
    depPrice = price;
    depSelected = true;
    document.getElementById("dep-time").innerText = time;
  } else {
    retPrice = price;
    retSelected = true;
    document.getElementById("ret-time").innerText = time;
  }

  document.getElementById("total").innerText = "₹" + (depPrice + retPrice);

  // SHOW FORM ONLY AFTER BOTH SELECTED
  if (depSelected && retSelected) {
    document.getElementById("booking-form").classList.remove("hidden");
  }
}

// WAIT FOR DOM
document.addEventListener("DOMContentLoaded", function () {

  const modal = document.getElementById("confirmation-modal");
  modal.classList.add("hidden"); // FORCE HIDE ON LOAD ✅

  const btn = document.querySelector(".book-btn");

  btn.addEventListener("click", function () {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    if (!name || !email || !phone) {
      alert("Please fill all details");
      return;
    }

    // SET CONFIRM DATA
    document.getElementById("confirm-name").innerText = "Passenger: " + name;
    document.getElementById("confirm-dep").innerText =
      "Departure: " + document.getElementById("dep-time").innerText;
    document.getElementById("confirm-ret").innerText =
      "Return: " + document.getElementById("ret-time").innerText;
    document.getElementById("confirm-total").innerText =
      "Total Paid: ₹" + (depPrice + retPrice);

    // SHOW MODAL ONLY HERE ✅
    modal.classList.remove("hidden");
  });

});

// CLOSE MODAL
function closeModal() {
  document.getElementById("confirmation-modal").classList.add("hidden");
}