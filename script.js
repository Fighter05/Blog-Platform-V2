const searchBlogs = () => {
  const searchBox = document.getElementById("search-box").value.toUpperCase();
  const storeBlogs = document.getElementsById("blog-list");
  const blog = document.querySelectorAll(".col");
  const pname = storeBlogs.getElementsByTagName("h3");

  for (let i = 0; i < pname.length; i++) {
    let match = blog[i].getElementsByTagName("h3")[0];

    if (match) {
      let textValue = match.textContent || match.innerHTML;

      if (textValue.toUpperCase().indexOf(searchBox) > -1) {
        blog[i].style.display = "";
      } else {
        blog[i].style.display = "none";
      }
    }
  }
};

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
