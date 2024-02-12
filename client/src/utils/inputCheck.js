document.addEventListener("DOMContentLoaded", function () {
  const ElementsdInputs = document.querySelectorAll("input");

  ElementsdInputs.forEach((input) => {
    input.addEventListener("input", function () {
      const allInputsFilled = [...ElementsdInputs].every(
        (input) => input.value.trim() !== ""
      );

      const submitButton = document.querySelector(".contact");
      if (allInputsFilled) {
        submitButton.removeAttribute("disabled");
      } else {
        submitButton.setAttribute("disabled", "disabled");
      }
    });
  });
});
