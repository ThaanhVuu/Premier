let dashboardBtn = document.getElementById("Dashboard");
let newsBtn = document.getElementById("News");
let playerBtn = document.getElementById("Player");
let matchBtn = document.getElementById("Match");
let stadiumBtn = document.getElementById("Stadium");
let clubBtn = document.getElementById("Club");
let resultBtn = document.getElementById("Result");

let oldBtn = null;

let token = sessionStorage.getItem("accessToken");
if (token == null) {
    window.location.href = "../login/index.html";
}

function loadComponent(htmlPath, jsPath, cssPath) {
    fetch(htmlPath)
        .then(response => response.text())
        .then(html => {
            document.getElementById("content").innerHTML = html;

            // Load JS
            if (jsPath) {
                let oldJs = document.getElementById("dynamic-js");
                if (oldJs) oldJs.remove();
                let script = document.createElement("script");
                script.src = jsPath + "?v=" + Date.now(); 
                script.type = "module"
                script.id = "dynamic-js";
                script.defer = true;
                document.body.appendChild(script);
            }

            // Load CSS
            if (cssPath) {
                let oldCss = document.getElementById("dynamic-css");
                if (oldCss) oldCss.remove();
                let link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = cssPath;
                link.id = "dynamic-css";
                document.head.appendChild(link);
            }
        })
        .catch(error => {
            console.error("Failed to load component:", error);
            document.getElementById("content").innerHTML = "<h3>⚠️ Failed to load content.</h3>";
        });
}

function handleNavClick(button, htmlPath, jsPath, cssPath) {
    loadComponent(htmlPath, jsPath, cssPath);
    if (oldBtn) oldBtn.classList.remove("active");
    button.classList.add("active");
    oldBtn = button;
    sessionStorage.setItem("activeTab", button.id);  // 👉 Lưu lại tab hiện tại
}

// Gán sự kiện click cho từng button
dashboardBtn.onclick = () => handleNavClick(dashboardBtn, "components/dashboard.html", "components/dashboard.js", "components/dashboard.css");
newsBtn.onclick = () => handleNavClick(newsBtn, "components/news.html", "components/news.js", "components/news.css");
playerBtn.onclick = () => handleNavClick(playerBtn, "components/player.html", "components/player.js", "components/player.css");
matchBtn.onclick = () => handleNavClick(matchBtn, "components/match.html", "components/match.js", "components/match.css");
stadiumBtn.onclick = () => handleNavClick(stadiumBtn, "components/stadium.html", "components/stadium.js", "components/stadium.css");
clubBtn.onclick = () => handleNavClick(clubBtn, "components/club.html", "components/club.js", "components/club.css");
resultBtn.onclick = () => handleNavClick(resultBtn, "components/result.html", "components/result.js", "components/result.css");

// 👉 Khi tải lại trang: tự động mở tab đang được lưu (mặc định là News)
const savedTab = sessionStorage.getItem("activeTab");
switch (savedTab) {
    case "Dashboard": dashboardBtn.onclick(); break;
    case "News": newsBtn.onclick(); break;
    case "Player": playerBtn.onclick(); break;
    case "Match": matchBtn.onclick(); break;
    case "Stadium": stadiumBtn.onclick(); break;
    case "Club": clubBtn.onclick(); break;
    case "Result": resultBtn.onclick(); break;
    default: matchBtn.onclick(); break;  // Mặc định mở .. nếu không có gì
}
