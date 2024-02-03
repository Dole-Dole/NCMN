document.addEventListener("DOMContentLoaded", function () {
  var subitemList = document.querySelector(".subitemList");
  var allSubmenuItems = document.querySelectorAll(
    ".header__menu__item.subitemList"
  );

  // 클릭 이벤트를 설정
  document.addEventListener("click", function (event) {
    // 현재 클릭된 요소가 subitemList인 경우
    if (event.target.closest(".subitemList") === subitemList) {
      // active 클래스 토글
      subitemList.classList.toggle("active");
    } else {
      // 다른 곳을 클릭하면 모든 하위 목록을 숨김
      allSubmenuItems.forEach(function (item) {
        item.classList.remove("active");
      });
    }
  });
});
