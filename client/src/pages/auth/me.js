import AuthService from "/client/src/pages/auth/auth.js";
import HttpClient from "/client/src/utils/network/http.js";
import TokenStorage from "/client/src/utils/db/token.js";

const authService = new AuthService(
  new HttpClient("http://127.0.0.1:8080"),
  new TokenStorage()
);

const updateHeaderMenu = async () => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const user = await authService.me();
      if (user) {
        document.getElementById("login").style.display = "none";
        document.getElementById("logout").style.display = "block";
      }
    } catch (error) {
      console.error("사용자 정보를 가져오는 동안 오류가 발생했습니다:", error);
    }
  } else {
    document.getElementById("login").style.display = "block";
    document.getElementById("logout").style.display = "none";
  }
};

window.onload = async () => {
  await updateHeaderMenu();
};

document.getElementById("logout").addEventListener("click", async () => {
  try {
    await authService.logout();

    await updateHeaderMenu();
    console.log("로그아웃 성공");
    window.location.href = "/client/public/index.html";
  } catch (error) {
    console.error("로그아웃 실패:", error);
  }
});
