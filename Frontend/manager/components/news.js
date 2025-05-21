import { API_BASE_URL } from '../../config.js';

if(sessionStorage.getItem("accessToken") == null){
    window.location.href="../../login/index.html";
}

function initNews() {
    loadNews();
    let token = sessionStorage.getItem("accessToken");
    let idNews = 0;
    let saveMode = true;
    let createBtn = document.getElementById("createBtn");
    let formNews = document.getElementById("popup-form");
    let submitBtn = document.getElementById("submit-btn");
    let cancelBtn = document.getElementById("cancel-btn");
    let searchInput = document.getElementById("searchInput");

    const decoded = jwt_decode(token);  // cần thêm <script> jwt-decode
    const userId = decoded.userId; //id user dang dang nhap hien tai(de them author tu dong)


    function loadNews() {
        axios.get(`${API_BASE_URL}news`)
            .then(response => {
                const newsList = response.data.result;
                const container = document.getElementById('news-container');
                container.innerHTML = "";

                newsList.forEach(news => {
                    const div = document.createElement('div');


                    // Xử lý ảnh: dùng ảnh mặc định nếu imageURL là null
                    const imgURL = news.imageURL || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk3UgM3iwgnkhNoQm3NuarG41NsSprg7iSAg&s';

                    // Format ngày xuất bản
                    const publishDate = new Date(news.publishDate).toLocaleString('vi-VN');

                    // Tên tác giả (nếu có)
                    const authorName = news.author?.name || 'Admin';

                    div.innerHTML = `
                <div class="image-wrapper">
                    <img src="${imgURL}" alt="Img" />
                </div>
                <h3 id="card-title">${news.title}</h3>
                <div>
                    <span>Id : ${news.newsId} | </span>
                    <span id="card-time" data-original-date="${news.publishDate}">${publishDate}</span>
                    <span class="status">👁️${news.views}</span> <br> 
                    <span class="author">👤${authorName}</span>
                </div>
                <div>
                    <hr />
                    <div class="action">
                    <button type="button" class="updateBtn">📝 Update</button>
                    <button type="button" class="deleteBtn">🗑️ Delete</button>
                    </div>
                </div>
                `;
                    container.appendChild(div);
                    // Gán sự kiện sau khi thêm vào DOM
                    //sua, nhung chi bat form
                    let updateButtons = div.querySelectorAll(".updateBtn");
                    updateButtons.forEach(btn => {
                        btn.onclick = function () {
                            idNews = news.newsId;
                            saveMode = false;
                            formNews.style.display = "block";
                            loadNewsToForm(news.title, news.content, news.publishDate, imgURL)
                        };
                    });
                    //xoa
                    let deleteBtns = div.querySelectorAll(".deleteBtn");
                    deleteBtns.forEach(btn => {
                        btn.onclick = function () {
                            let isConfirmed = confirm("Bạn có chắc chắn muốn xoá bài viết này không? : " + news.newsId);
                            if (isConfirmed) {
                                axios.delete(`${API_BASE_URL}news/${news.newsId}`, {
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    }
                                })
                                    .then(response => {
                                        alert(response.data.info);
                                        loadNews();
                                    })
                                    .catch(error => {
                                        console.log(news);

                                        alert(error.response.data.info);
                                    });
                            }
                        }
                    })
                    let titleElement = div.querySelector("#card-title");
                    titleElement.onclick = function () {
                        showNewsDetail(news);
                    };
                });
            })
            .catch(error => {
                console.error("Failed to fetch news:", error);
            });
    }


    //an form
    cancelBtn.onclick = function () {
        formNews.style.display = "none";
        loadNews();
        cleanForm();
    }

    //hien form
    createBtn.onclick = function () {
        formNews.style.display = "block";
        saveMode = true;
    }

    submitBtn.onclick = function () {
        let newsObj = {
            title: document.getElementById("title").value,
            content: document.getElementById("contentNews").value,
            publishDate: document.getElementById("timePost").value,
            imageURL: document.getElementById("imgURL").value,
            views: 1,
            authorId: userId
        };

        const request = saveMode
            ? axios.post(`${API_BASE_URL}news`, newsObj, {
                headers: { Authorization: `Bearer ${token}` }
            })
            : axios.put(`${API_BASE_URL}news/${idNews}`, newsObj, {
                headers: { Authorization: `Bearer ${token}` }
            });

        request
            .then(response => {
                alert(response.data.info);
                formNews.style.display = "none";
                loadNews();
                cleanForm();
            })
            .catch(error => {
                alert(error.response?.data?.message || error.message);
            });
    };

    function loadNewsToForm(title, content, timePost, imgUrl) {
        document.getElementById("title").value = title;
        document.getElementById("contentNews").value = content;
        document.getElementById("timePost").value = timePost;
        document.getElementById("imgURL").value = imgUrl;
    }

    function cleanForm() {
        document.getElementById("title").value = "";
        document.getElementById("contentNews").value = "";
        document.getElementById("timePost").value = "";
        document.getElementById("imgURL").value = "";
    }


    searchInput.addEventListener('input', function (e) {
        const searchTerm = normalizeString(e.target.value);
        filterNews(searchTerm);
    });

    function filterNews(searchTerm) {
        const newsCards = document.querySelectorAll('#news-container > div');

        newsCards.forEach(card => {
            // Lấy các thành phần dữ liệu
            const title = extractData(card, '#card-title');
            const content = extractData(card, '#contentNews', true);
            const newsId = extractId(card);
            const author = extractAuthor(card);
            const publishDate = extractDate(card);

            // Kiểm tra điều kiện
            const isMatch = [
                title,
                content,
                newsId,
                author,
                publishDate.formatted,
                publishDate.original
            ].some(value => value.includes(searchTerm));

            card.style.display = isMatch ? 'block' : 'none';
        });
    }

    // ========== Hàm hỗ trợ ==========
    function normalizeString(str) {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim();
    }

    function extractData(card, selector, isValue = false) {
        const element = card.querySelector(selector);
        if (!element) return '';
        const text = isValue ? element.value : element.textContent;
        return normalizeString(text);
    }

    function extractId(card) {
        const idElement = card.querySelector('span:first-child');
        if (!idElement) return '';
        const match = idElement.textContent.match(/Id : (\d+)/);
        return match ? match[1] : '';
    }

    function extractAuthor(card) {
        const authorElement = card.querySelector('.author');
        if (!authorElement) return '';
        return normalizeString(authorElement.textContent.replace('👤', ''));
    }

    function extractDate(card) {
        const dateElement = card.querySelector('#card-time');
        if (!dateElement) return { formatted: '', original: '' };

        return {
            formatted: normalizeString(dateElement.textContent),
            original: normalizeString(dateElement.dataset.originalDate || '')
        };
    }

    function count() {
        axios.get(`${API_BASE_URL}news/newsStats`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                let stats = response.data.result;
                console.log("Total News:", stats.totalNews);
                console.log("Total Views:", stats.totalViews);
                console.log("News In Day:", stats.newsInDay);

                // Ví dụ: cập nhật HTML
                document.getElementById("totalNews").innerText = stats.totalNews;
                document.getElementById("totalViews").innerText = stats.totalViews;
                document.getElementById("newsInDay").innerText = stats.newsInDay;
                document.getElementById("viewsInDay").innerText = 1261;
            })
    }

    count();

    function showNewsDetail(news) {
        document.getElementById("detail-title").innerText = news.title;
        document.getElementById("detail-img").src = news.imageURL || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk3UgM3iwgnkhNoQm3NuarG41NsSprg7iSAg&s';
        document.getElementById("detail-date").innerText = new Date(news.publishDate).toLocaleString('vi-VN');
        document.getElementById("detail-views").innerText = news.views;
        document.getElementById("detail-author").innerText = news.author?.name || "Admin";
        document.getElementById("detail-content").innerText = news.content;

        document.getElementById("detail-popup").style.display = "flex";
    }

    document.getElementById("close-detail").onclick = function () {
        document.getElementById("detail-popup").style.display = "none";
    };
    

}
initNews();
