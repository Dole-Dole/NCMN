import AuthService from "/client/src/pages/auth/auth.js";
import HttpClient from "/client/src/utils/network/http.js";
import TokenStorage from "/client/src/utils/db/token.js";

const authService = new AuthService(
  new HttpClient("http://127.0.0.1:8080"),
  new TokenStorage()
);

const beginFrom = document.getElementById("begin_from");
beginFrom.addEventListener("submit", async (event) => {
  event.preventDefault(); // 기본 동작 방지

  const userID = document.getElementById("userID").value;
  const password = document.getElementById("password").value;
  const name = document.getElementById("userName").value;
  const birthday = document.getElementById("birthday").value;
  const university = document.getElementById("university").value;
  const phone = document.getElementById("phone").value;

  try {
    const data = await authService.signup(
      userID,
      password,
      userName,
      birthday,
      university,
      phone
    );
    console.log("가입 성공:", data);
    window.location.href = "/client/public/index.html";
  } catch (error) {
    console.error("가입 실패:", error.message);
  }
});
