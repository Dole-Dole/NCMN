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
    // 로그인 성공 시 리다이렉트 또는 다른 작업 수행
  } catch (error) {
    console.error("로그인 실패:", error.message);
    // 에러 처리
  }
});
