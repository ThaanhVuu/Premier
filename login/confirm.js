import { API_BASE_URL } from "../config.js";

      const resultEl = document.getElementById("confirm-result");
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        resultEl.innerText = "Không tìm thấy token xác nhận.";
      } else {
        axios.get(`${API_BASE_URL}auth/confirm?token=${encodeURIComponent(token)}`)          
          .then((data) => {
            console.log(data);
            resultEl.innerText = data.info || "Xác nhận thành công.";
          })
          .catch((err) => {
            resultEl.innerText = err.data.info || "Lỗi khi xác nhận tài khoản.";
            console.error(err);
          });
      }