const form = document.querySelector(".begin_from");
const inputs = form.querySelectorAll("input");
const button = form.querySelector(".begin__contact");

function validateInputs() {
  let isValid = true;
  inputs.forEach((input) => {
    if (!input.value.trim()) {
      isValid = false;
    }
  });
  button.disabled = !isValid;
}

inputs.forEach((input) => {
  input.addEventListener("input", validateInputs);
});
