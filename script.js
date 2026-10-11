/* =========================================================
   DISCOVER LESOTHO - JAVASCRIPT
   ---------------------------------------------------------
   I tried to keep this code simple. Each section does one
   main job, so it is easier for me to explain in class.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  // -------------------------------------------------------
  // 1. Put the current year in every footer automatically.
  // -------------------------------------------------------
  document.querySelectorAll(".current-year").forEach(function (year) {
    year.textContent = new Date().getFullYear();
  });

  // -------------------------------------------------------
  // 2. DARK / LIGHT MODE
  // localStorage remembers the user's choice after refresh.
  // This lets the website remember the visitor’s choice.
  // -------------------------------------------------------
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("lesothoTheme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (themeToggle) themeToggle.textContent = "light mode";
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");

      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("lesothoTheme", isDark ? "dark" : "light");

      themeToggle.textContent = isDark ? "light mode" : "dark mode";
    });
  }

  // -------------------------------------------------------
  // 3. DESTINATION SEARCH + FILTER
  // The destination cards are made from this simple array.
  // JavaScript then puts them into the HTML.
  // -------------------------------------------------------
  const destinationGrid = document.getElementById("destinationGrid");

  const destinations = [
    {
      name: "Maloti Mountains",
      category: "nature",
      label: "Nature",
      activity: "Hiking and photography",
      description: "High mountain scenery, valleys and peaceful outdoor views.",
      image: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Maletsunyanefalls.JPG"
    },
    {
      name: "Katse Dam",
      category: "sightseeing",
      label: "Sightseeing",
      activity: "Scenery and sightseeing",
      description: "A famous highland dam surrounded by dramatic mountain landscapes.",
      image: "https://upload.wikimedia.org/wikipedia/commons/4/47/Katse_Dam.jpg"
    },
    {
      name: "Thaba-Bosiu",
      category: "culture",
      label: "Culture",
      activity: "Heritage and history",
      description: "A heritage destination connected with the history of the Basotho nation.",
      image: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Thaba_Bosiu.jpg"
    },
    {
      name: "Semonkong",
      category: "adventure",
      label: "Adventure",
      activity: "Waterfall and adventure",
      description: "A highland area known for dramatic scenery and outdoor experiences.",
      image: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Maletsunyanefalls.JPG"
    },
    {
      name: "Maseru",
      category: "culture",
      label: "Culture",
      activity: "City and culture",
      description: "The capital city and a useful starting point for exploring Lesotho.",
      image: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Thaba_Bosiu.jpg"
    },
    {
      name: "Afriski",
      category: "adventure",
      label: "Adventure",
      activity: "Winter activities",
      description: "A high-altitude destination associated with winter sports and mountain fun.",
      image: "https://upload.wikimedia.org/wikipedia/commons/4/47/Katse_Dam.jpg"
    }
  ];

  function showDestinations(filter = "all", searchText = "") {
    if (!destinationGrid) return;

    const cleanSearch = searchText.toLowerCase().trim();

    const filtered = destinations.filter(function (place) {
      const matchesFilter = filter === "all" || place.category === filter;
      const searchableText = (place.name + " " + place.category + " " + place.activity + " " + place.description).toLowerCase();
      const matchesSearch = searchableText.includes(cleanSearch);

      return matchesFilter && matchesSearch;
    });

    destinationGrid.innerHTML = "";

    filtered.forEach(function (place) {
      const column = document.createElement("div");
      column.className = "col-md-6 col-lg-4";

      column.innerHTML = `
        <article class="destination-card h-100">
          <img src="${place.image}" class="card-img-top" alt="${place.name} destination" loading="lazy">
          <div class="card-body">
            <span class="badge text-bg-light mb-2">${place.label}</span>
            <h2 class="h4">${place.name}</h2>
            <p class="text-muted">${place.description}</p>
            <p class="mb-0"><strong>Activity:</strong> ${place.activity}</p>
          </div>
        </article>
      `;

      destinationGrid.appendChild(column);
    });

    const noResults = document.getElementById("noResults");
    if (noResults) {
      noResults.classList.toggle("d-none", filtered.length !== 0);
    }
  }

  const searchInput = document.getElementById("destinationSearch");
  let currentFilter = "all";

  if (destinationGrid) {
    showDestinations();
  }

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      showDestinations(currentFilter, searchInput.value);
    });
  }

  document.querySelectorAll(".filter-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      currentFilter = button.dataset.filter;

      document.querySelectorAll(".filter-btn").forEach(function (btn) {
        btn.classList.remove("active", "btn-primary");
        btn.classList.add("btn-outline-primary");
      });

      button.classList.add("active", "btn-primary");
      button.classList.remove("btn-outline-primary");

      showDestinations(currentFilter, searchInput ? searchInput.value : "");
    });
  });

  // -------------------------------------------------------
  // 4. GALLERY LIGHTBOX / NEXT / PREVIOUS
  // Bootstrap provides the modal window. JavaScript changes
  // the picture inside it.
  // -------------------------------------------------------
  const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
  const galleryModalElement = document.getElementById("galleryModal");

  if (galleryItems.length && galleryModalElement) {
    const galleryModal = new bootstrap.Modal(galleryModalElement);
    const modalImage = document.getElementById("galleryModalImage");
    const modalTitle = document.getElementById("galleryModalTitle");
    let currentImage = 0;

    function showGalleryImage(index) {
      currentImage = (index + galleryItems.length) % galleryItems.length;

      const item = galleryItems[currentImage];
      modalImage.src = item.dataset.image;
      modalImage.alt = item.dataset.title;
      modalTitle.textContent = item.dataset.title;
    }

    galleryItems.forEach(function (item, index) {
      item.addEventListener("click", function () {
        showGalleryImage(index);
        galleryModal.show();
      });
    });

    document.getElementById("galleryPrev").addEventListener("click", function () {
      showGalleryImage(currentImage - 1);
    });

    document.getElementById("galleryNext").addEventListener("click", function () {
      showGalleryImage(currentImage + 1);
    });
  }

  // -------------------------------------------------------
  // 5. CONTACT FORM VALIDATION
  // HTML already has required fields, but I also check them
  // with JavaScript to meet the assignment requirement.
  // -------------------------------------------------------
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.classList.add("was-validated");
        showToast("Please check the highlighted fields.", "warning");
        return;
      }

      // In a real website this is where data would be sent to a server.
      showToast("Thank you! Your message has been received.", "success");
      contactForm.reset();
      contactForm.classList.remove("was-validated");
    });
  }

  // -------------------------------------------------------
  // 6. BOOKING COST CALCULATOR
  // This calculates an estimated price.
  // Formula: visitors x accommodation + visitors x activities.
  // -------------------------------------------------------
  const bookingForm = document.getElementById("bookingForm");
  const travellers = document.getElementById("travellers");
  const stay = document.getElementById("stay");
  const totalCost = document.getElementById("totalCost");

  function calculateBooking() {
    if (!travellers || !stay || !totalCost) return;

    const people = Math.max(1, Number(travellers.value) || 1);
    const accommodationPrice = Number(stay.value) || 0;

    let activitiesPrice = 0;

    document.querySelectorAll(".activity-price:checked").forEach(function (activity) {
      activitiesPrice += Number(activity.value);
    });

    const total = people * (accommodationPrice + activitiesPrice);
    totalCost.textContent = "M" + total.toLocaleString();
  }

  if (bookingForm) {
    calculateBooking();

    travellers.addEventListener("input", calculateBooking);
    stay.addEventListener("change", calculateBooking);

    document.querySelectorAll(".activity-price").forEach(function (checkbox) {
      checkbox.addEventListener("change", calculateBooking);
    });

    bookingForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!bookingForm.checkValidity()) {
        bookingForm.classList.add("was-validated");
        showToast("Please complete the required booking fields.", "warning");
        return;
      }

      // Save a few details in localStorage.
      // This means the browser remembers the booking after refresh.
      const booking = {
        name: document.getElementById("bookingName").value,
        email: document.getElementById("bookingEmail").value,
        date: document.getElementById("travelDate").value,
        visitors: travellers.value,
        total: totalCost.textContent
      };

      localStorage.setItem("lastLesothoBooking", JSON.stringify(booking));

      showToast("Booking estimate saved successfully. Your estimated cost is " + totalCost.textContent + ".", "success");
      bookingForm.reset();
      travellers.value = 2;
      calculateBooking();
      bookingForm.classList.remove("was-validated");
    });
  }

  // -------------------------------------------------------
  // 7. SMALL TOAST MESSAGE
  // This makes feedback look more professional than using
  // a normal browser alert().
  // -------------------------------------------------------
  function showToast(message, type) {
    const toastArea = document.getElementById("toastArea");
    if (!toastArea) return;

    const wrapper = document.createElement("div");
    wrapper.className = "toast align-items-center border-0";
    wrapper.setAttribute("role", "alert");
    wrapper.setAttribute("aria-live", "assertive");
    wrapper.setAttribute("aria-atomic", "true");

    const bgClass = type === "success" ? "text-bg-success" : "text-bg-warning";
    wrapper.classList.add(bgClass);

    wrapper.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;

    toastArea.appendChild(wrapper);

    const toast = new bootstrap.Toast(wrapper, { delay: 4000 });
    toast.show();

    wrapper.addEventListener("hidden.bs.toast", function () {
      wrapper.remove();
    });
  }

});
