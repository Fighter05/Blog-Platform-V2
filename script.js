fetch("blog_statistic.json")
  .then(function (res) {
    return res.json();
  })
  .then(function (datas) {
    console.log(datas.statistics.totalBlogs);
    let placeholder = document.querySelector("#static-data");
    let output = "";

    output += `
      <div
        class="d-flex justify-content-between border p-4 mb-4"
      >
        <h3>Statistics</h3>
        <h3>totalBlogs: ${datas.statistics.totalBlogs}</h3>
        <h3>totalViews: ${datas.statistics.totalViews}</h3>
      </div>
      `;

    placeholder.innerHTML = output;
  });

fetch("blog.json")
  .then(function (res) {
    return res.json();
  })
  .then(function (datas) {
    let placeholder = document.querySelector("#blog-data");
    datas.sort((a, b) => {
      return b.views - a.views;
    });
    let output = "";
    for (let i = 0; i < 10; i++) {
      output += `
      <div class="col" id="blog-data">
          <div
            class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
          >
            <div class="col p-4 d-flex flex-column position-static">
              <div class="d-flex justify-content-between">
                <strong class="d-inline-block mb-2 text-primary-emphasis"
                  >${datas[i].category}</strong
                >
                <p>${datas[i].views} views</p>
              </div>
              <h3 class="mb-0">${datas[i].title}</h3>
              <div class="mb-1 text-body-secondary">${datas[i].author}</div>
              <p class="card-text mb-auto">${datas[i].content}</p>
              <a
                href="blog.html"
                class="icon-link gap-1 icon-link-hover stretched-link"
              >
                Continue reading
                <svg class="bi"><use xlink:href="#chevron-right"></use></svg>
              </a>
            </div>
            <div class="col-auto d-none d-lg-block">
              <svg
                class="bd-placeholder-img"
                width="200"
                height="250"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: Thumbnail"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <rect width="100%" height="100%" fill="#55595c"></rect>
              </svg>
            </div>
          </div>
        </div>
      `;
    }

    placeholder.innerHTML = output;
  });

// Select relevant HTML elements
const filterButtons = document.querySelectorAll("#filter-buttons button");
const filterableCards = document.querySelectorAll("#filterable-cards .col");

// Function to filter cards based on filter buttons
const filterCards = (e) => {
  document.querySelector("#filter-buttons .active").classList.remove("active");
  e.target.classList.add("active");

  filterableCards.forEach((card) => {
    // show the card if it matches the clicked filter or show all cards if "all" filter is clicked
    if (
      card.dataset.name === e.target.dataset.filter ||
      e.target.dataset.filter === "all"
    ) {
      return card.classList.replace("hide", "show");
    }
    card.classList.add("hide");
  });
};

filterButtons.forEach((button) =>
  button.addEventListener("click", filterCards)
);

fetch("blog.json")
  .then(function (res) {
    return res.json();
  })
  .then(function (datas) {
    console.log(datas[0].category);
    let placeholder = document.querySelector("#data");
    let output = "";
    for (let i = 0; i < 10; i++) {
      output += `
      <div data-name="${datas[i].category}">
          <div
            class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
          >
            <div class="col p-4 d-flex flex-column position-static">
              <div class="d-flex justify-content-between">
                <strong class="d-inline-block mb-2 text-primary-emphasis"
                  >${datas[i].category}</strong
                >
                <p>${datas[i].views} views</p>
              </div>
              <h3 class="mb-0">${datas[i].title}</h3>
              <div class="mb-1 text-body-secondary">${datas[i].author}</div>
              <p class="card-text mb-auto">${datas[i].content}</p>
              <a
                href="blog.html"
                class="icon-link gap-1 icon-link-hover stretched-link"
              >
                Continue reading
                <svg class="bi"><use xlink:href="#chevron-right"></use></svg>
              </a>
            </div>
            <div class="col-auto d-none d-lg-block">
              <svg
                class="bd-placeholder-img"
                width="200"
                height="250"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: Thumbnail"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <rect width="100%" height="100%" fill="#55595c"></rect>
              </svg>
            </div>
          </div>
        </div>
      `;
    }

    placeholder.innerHTML = output;
  });

const userCardTemplate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[data-user-cards-container]");
const searchInput = document.querySelector("[data-search]");

let users = [];

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  users.forEach((user) => {
    const isVisible =
      user.title.toLowerCase().includes(value) ||
      user.category.toLowerCase().includes(value);
    user.element.classList.toggle("hide", !isVisible);
  });
});

fetch("blog.json")
  .then((res) => res.json())
  .then((data) => {
    users = data.map((user) => {
      const card = userCardTemplate.content.cloneNode(true).children[0];
      const title = card.querySelector("#title");
      const category = card.querySelector("#category");
      const views = card.querySelector("#views");
      const author = card.querySelector("#author");
      const content = card.querySelector("#content");
      title.textContent = user.title;
      category.textContent = user.category;
      views.textContent = user.views;
      author.textContent = user.author;
      content.textContent = user.content;
      userCardContainer.append(card);
      return {
        title: user.title,
        category: user.category,
        views: user.views,
        author: user.author,
        content: user.content,
        element: card,
      };
    });
  });
