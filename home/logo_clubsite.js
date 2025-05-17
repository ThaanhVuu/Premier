document.addEventListener("DOMContentLoaded", function() {
    var template = document.getElementById("logo-template");
    var parent = document.querySelector(".nav-links"); // Lấy <ul> với class là "nav-links"

    // Kiểm tra nếu template không tồn tại
    if (!template || !parent) {
        console.error("Không tìm thấy template hoặc parent element.");
        return;
    }
    axios.get(`http://localhost:8080/api/team`) 
        .then(response => {
                response.data.result.forEach((team) => {
                    var clone = template.cloneNode(true);
                    var img = clone.querySelector("img");
                    img.src = team.logoUrl;
                    img.alt = "Team " + team.teamId; // Đặt alt text (có thể thay đổi nếu có tên đội bóng thực tế)
                    
                    // Xóa ID của phần tử clone để tránh trùng ID
                    clone.id = "";  
                    // Thêm phần tử đã nhân bản vào <ul>
                    parent.appendChild(clone);
                });

                // Ẩn phần tử gốc (template) sau khi đã sử dụng
                template.style.display = 'none'; 
        })
        .catch(error => {
            console.log(error);
        });
});
