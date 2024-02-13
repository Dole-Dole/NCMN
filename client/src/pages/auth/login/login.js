import AuthService from "../auth.js";
import HttpClient from "../../../utils/network/http.js";
import TokenStorage from "../../../utils/db/token.js";

const authService = new AuthService(
  new HttpClient("http://127.0.0.1:8080"),
  new TokenStorage()
);

const loginForm = document.getElementById("login_form");
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // 기본 동작 방지

  const userID = document.getElementById("userID").value;
  const password = document.getElementById("password").value;

  try {
    const data = await authService.login(userID, password);
    console.log("로그인 성공:", data);
    window.location.href = "/client/public/index.html";
  } catch (error) {
    console.error("로그인 실패:", error.message);
    alert("아이디 또는 비밀번호를 확인해주세요");
  }
});
