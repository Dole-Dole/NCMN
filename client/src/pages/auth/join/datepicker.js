$(function () {
  $("#birthday").datepicker({
    changeMonth: true,
    changeYear: true,
    yearRange: "-60:-20", // 최근 100년까지 표시
    monthNamesShort: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    dateFormat: "yy-mm-dd",
    defaultDate: "2000-01-01",
  });
});
