import { API_BASE_URL } from "../config.js";

const initLogin = () => {
    console.log(API_BASE_URL);
    
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    registerBtn.addEventListener('click', () => {
        container.classList.add("active");
    });

    loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
    });


    let signUp = document.getElementById("signup");
    signUp.onclick = function() {
        let emailSignUp = document.getElementById("email");
        let passwordSignUp = document.getElementById("password");
        let rePasswordSignUp = document.getElementById("re-password");
        let yourName = document.getElementById("name");

        if (passwordSignUp.value != rePasswordSignUp.value) {
            alert("Passwords do not match");
            return;
        }
        if (yourName == null) {
            alert("You have not entered your name")
        }
        if (!emailSignUp.checkValidity()) {
            alert("Email not validate");
            emailSignUp.focus();
            return;
        }
        axios.post(`${API_BASE_URL}auth/signup`, {
            name: yourName.value,
            username: emailSignUp.value,
            password: passwordSignUp.value
        })
            .then(response => {
                sessionStorage.setItem("notificationResponse", JSON.stringify({
                    message: response.data.info
                }));
                window.location.href = "notificationResponse.html";
            })
            .catch(error => {
                let message = "Can't connect to server";
                if (error.response) {
                    message = error.response.data.info;
                }
                sessionStorage.setItem("notificationResponse", JSON.stringify({ message }));
                window.location.href = "notificationResponse.html";
            });
    }

    let signin = document.getElementById("signin");
    signin.onclick = function(){
        let username = document.getElementsByClassName("EmailSigin")[0].value;
        let password = document.getElementsByClassName("PasswordSignin")[0].value;
        axios.post(`${API_BASE_URL}auth/token`, {
            username: username,
            password: password
        })
            .then(response => {
                console.log("response sign in" + response);
                const token = response.data.result;
                sessionStorage.setItem("accessToken", token); //luu token vao session

                // Giải mã token để lấy scope (role)
                const decoded = jwt_decode(token);  // cần thêm <script> jwt-decode
                const scope = decoded.scope;

                // Điều hướng theo scope
                if (scope === "ADMIN") {
                    window.location.href = "../manager/manager.html";
                } else {
                    alert("Chi co the dang nhap bang tai khoan Admin");
                }
            })
            .catch(error => {
                console.error("Login failed:", error);
                let message = "Đăng nhập thất bại";

                if (error.code === "ECONNABORTED") {
                    message = "Server không phản hồi, vui lòng thử lại sau";
                    console.log(`${API_BASE_URL}auth/token`);
                    
                } else if (error.response) {
                    // Server trả về lỗi (4xx, 5xx)
                    message = error.response.data.info || "Sai tên đăng nhập hoặc mật khẩu";
                } else if (error.request) {
                    // Yêu cầu được gửi nhưng không nhận được phản hồi
                    message = "Không thể kết nối đến server";
                }
                alert(message);
            });
    }
}
initLogin();