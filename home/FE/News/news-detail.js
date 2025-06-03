document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://premier-dl8h.onrender.com/api/news";
  const params = new URLSearchParams(window.location.search);
  const newsId = params.get("id");

  async function fetchNews() {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.code === 200) {
        const newsList = data.result;

        // Hiển thị chi tiết bài viết theo ID
        const newsItem = newsList.find(item => item.newsId == newsId);
        if (newsItem) {
          const newsImg = document.querySelector(".news img");
          const newsTitle = document.querySelector(".news .news-title");
          const newsContent = document.querySelector(".news .news-description");
          const newsDate = document.querySelector(".news .news-date");

          if (newsImg) newsImg.src = newsItem.imageURL;
          if (newsTitle) newsTitle.textContent = newsItem.title;
          if (newsContent) newsContent.textContent = newsItem.content;
          if (newsDate) newsDate.textContent = newsItem.publishDate;
        }

        // Hiển thị 5 bài mới nhất trong More News
        const moreNewsContainer = document.querySelector(".more-news");
        if (moreNewsContainer) {
          const latestFive = newsList
            .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
            .slice(0, 5);

          const newsHTML = latestFive.map(item => `
            <div class="container" data-id="${item.newsId}">
              <img src="${item.imageURL}" alt="">
              <div class="title">
                <p>${item.title}</p>
                <a>${item.publishDate}</a>
              </div>
            </div>
          `).join("");

          moreNewsContainer.innerHTML = `<h2>More news</h2>${newsHTML}`;

          // Gắn sự kiện click cho mỗi bài trong More News
          document.querySelectorAll(".more-news .container").forEach(item => {
            item.addEventListener("click", function() {
              const id = this.getAttribute("data-id");
              window.location.href = `news-detail.html?id=${id}`;
            });
          });
        }
      }
    } catch (err) {
      console.error("Error fetching news:", err);
    }
  }

  fetchNews();
});
