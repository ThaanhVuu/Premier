document.addEventListener("DOMContentLoaded", function () {
    var template = document.getElementById("logo-template");
    var parent = document.querySelector(".nav-links");

    // Kiểm tra nếu template không tồn tại
    if (!template || !parent) {
        console.error("Không tìm thấy template hoặc parent element.");
        return;
    }

    axios.get(`https://premier-dl8h.onrender.com/api/team`)
        .then(response => {
            response.data.result.forEach((team) => {
                var clone = template.cloneNode(true);
                var img = clone.querySelector("img");
                var anchor = clone.querySelector("a");

                // Gán logo và website
                img.src = team.logoUrl;
                img.alt = team.name + " logo";

                if (anchor) {
                    anchor.href = team.website;
                    anchor.target = "_blank"; // Mở trong tab mới
                    anchor.rel = "noopener noreferrer"; 
                }

                clone.id = "";
                parent.appendChild(clone);
            });

            template.style.display = 'none';
        })
        .catch(error => {
            console.log(error);
        });
});
