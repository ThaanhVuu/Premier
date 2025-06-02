document.addEventListener("DOMContentLoaded", function() {
  const apiUrl = "https://premier-dl8h.onrender.com/api/news";
  let allNews = [];

  const containerSection = document.querySelector(".container-section");
  const filterByView = document.querySelectorAll('[data-filter]');
  const resetBtn = document.getElementById('reset-filter');

  // Fetch dữ liệu từ API
  async function fetchNews() {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.code === 200) {
        allNews = data.result;
        sortByDate("newest"); // Mặc định sắp xếp theo ngày mới nhất
        renderNews(allNews);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  }

  // Render news vào HTML
  function renderNews(newsList) {
    containerSection.innerHTML = "";
    newsList.forEach(news => {
      const newsHTML = `
        <div class="container">
          <img src="${news.imageURL}" alt="">
          <div class="title">
            <p>${news.title}</p>
            <a>${news.publishDate}</a>
          </div>
        </div>
      `;
      containerSection.insertAdjacentHTML("beforeend", newsHTML);
    });
    // Gắn sự kiện click vào từng bài viết
  document.querySelectorAll('.container').forEach(item => {
    item.addEventListener('click', function() {
      const newsId = this.getAttribute('data-id');
      window.location.href = `news-detail.html?id=${newsId}`;
    });
  });

  }

  // Sort theo ngày
  function sortByDate(order) {
    if (order === "newest") {
      allNews.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
    } else if (order === "oldest") {
      allNews.sort((a, b) => new Date(a.publishDate) - new Date(b.publishDate));
    }
  }

  // Sort theo views
  function sortByViews() {
    allNews.sort((a, b) => b.views - a.views);
  }

  // Xử lý lọc khi click
  document.querySelectorAll('.dropdown-content2 a').forEach(item => {
    item.addEventListener("click", function(e) {
      e.preventDefault();
      const filter = this.getAttribute("data-filter");
      const parent = this.closest(".dropdown2").querySelector(".filters-select");
      parent.textContent = this.textContent;

      if (filter === "home") { 
        sortByViews();
      } else if (filter === "away") {
        sortByDate("oldest");
      } else {
        sortByDate("newest");
      }
      renderNews(allNews);
    });
  });

  // Reset filters
  resetBtn.addEventListener("click", function() {
    document.querySelectorAll(".filters-select").forEach(el => el.textContent = "All News");
    sortByDate("newest");
    renderNews(allNews);
  });
  fetchNews();
});