async function loadNews() {
  const apiUrl = 'https://premier-dl8h.onrender.com/api/news';
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    if (data.code !== 200) throw new Error('Failed to fetch news');

    let newsList = data.result;

    // 3 bài có views cao nhất cho phần news-header
    const top3News = [...newsList]
      .sort((a, b) => b.views - a.views)
      .slice(0, 3);

    // Bài mới nhất đến cũ nhất cho phần latest-news
    const latestNews = [...newsList]
      .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

    // Lấy DOM container
    const newsHeaderTopBig = document.querySelector('.news-header-top-bignews');
    const newsHeaderSmallContainer = document.querySelector('.news-headertop_smallNews');

    if (top3News.length > 0) {
      const big = top3News[0];
      newsHeaderTopBig.innerHTML = `
        <div class="news-img" data-id="${big.newsId}">
          <img src="${big.imageURL || 'https://via.placeholder.com/642x362?text=No+Image'}" alt="">
        </div>
        <div class="news-header-content" data-id="${big.newsId}">
          <h2 style="font-weight: 800;">${big.title}</h2>
          <a>${big.content.length > 150 ? big.content.slice(0, 150) + '...' : big.content}</a>
        </div>
      `;
    }

    if (top3News.length > 1) {
      newsHeaderSmallContainer.innerHTML = '';
      for (let i = 1; i < top3News.length; i++) {
        const item = top3News[i];
        const smallNewsHTML = `
          <div class="news_he-ader-top-smallNews-news news-hover" data-id="${item.newsId}">
            <div class="news-img">
              <img src="${item.imageURL || 'https://via.placeholder.com/451x268?text=No+Image'}" alt="">
            </div>
            <div class="news-header-content">
              <p>${item.title}</p>
            </div>
          </div>
        `;
        newsHeaderSmallContainer.insertAdjacentHTML('beforeend', smallNewsHTML);
      }
    }

    // Xử lý phần latest-news
    const latestNewsContainer = document.querySelector('.latest-news-content');
    latestNewsContainer.innerHTML = ''; 

    latestNews.forEach(item => {
      const newsHTML = `
        <div class="news-content news-hover" data-id="${item.newsId}">
          <div class="news-img">
            <img src="${item.imageURL || 'https://via.placeholder.com/451x268?text=No+Image'}" alt="">
          </div>
          <div class="news-text-content">
            <p>${item.title}</p>
          </div>
        </div>
      `;
      latestNewsContainer.insertAdjacentHTML('beforeend', newsHTML);
    });

    // Gắn click cho tất cả phần tử
    document.querySelectorAll('[data-id]').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.getAttribute('data-id');
        if (id) {
          window.location.href = `../News/news-detail.html?id=${id}`;
        }
      });
    });

  } catch (error) {
    console.error('Error loading news:', error);
  }
}

loadNews();
