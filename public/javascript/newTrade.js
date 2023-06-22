function readImage1(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("sampleImage1").src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function readImage2(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("sampleImage2").src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
}
