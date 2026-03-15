$(document).ready(function () {
  function showError(field, message) {
    $("#" + field + "Error").text(message);
  }

  function clearError(field) {
    $("#" + field + "Error").text("");
  }

  /* Toggle password */

  $("#togglePassword").click(function () {
    const pass = $("#password");

    if (pass.attr("type") === "password") {
      pass.attr("type", "text");
      $(this).text("🙈");
    } else {
      pass.attr("type", "password");
      $(this).text("👁");
    }
  });

  /* Counter fullname */

  $("#username").on("input", function () {
    const length = $(this).val().length;

    $("#nameCount").text(length + "/50");
  });

  /* Password strength */

  $("#password").on("input", function () {
    const value = $(this).val();

    let score = 0;

    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[a-z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;

    if (score <= 2) {
      $("#strengthFill").css("width", "33%").attr("class", "weak");
      $("#strengthText").text("Yếu");
    } else if (score == 3) {
      $("#strengthFill").css("width", "66%").attr("class", "medium");
      $("#strengthText").text("Trung bình");
    } else {
      $("#strengthFill").css("width", "100%").attr("class", "strong");
      $("#strengthText").text("Mạnh");
    }
  });

  /* Validation */

  function validateFullName() {
    const value = $("#username").val().trim();
    const regex = /^[a-zA-Z\s]{3,}$/;

    if (value === "") {
      showError("username", "Vui lòng nhập họ tên");
      return false;
    }

    if (!regex.test(value)) {
      showError("username", "Ít nhất 3 ký tự và chỉ chữ");
      return false;
    }

    clearError("username");
    return true;
  }

  function validateEmail() {
    const value = $("#email").val().trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === "") {
      showError("email", "Email không được trống");
      return false;
    }

    if (!regex.test(value)) {
      showError("email", "Email không hợp lệ");
      return false;
    }

    clearError("email");
    return true;
  }

  function validatePhone() {
    const value = $("#phone").val().trim();
    const regex = /^0\d{9}$/;

    if (!regex.test(value)) {
      showError("phone", "SĐT phải 10 số bắt đầu 0");
      return false;
    }

    clearError("phone");
    return true;
  }

  function validatePassword() {
    const value = $("#password").val();
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!regex.test(value)) {
      showError("password", "≥8 ký tự có hoa thường số");
      return false;
    }

    clearError("password");
    return true;
  }

  function validateConfirm() {
    const pass = $("#password").val();
    const confirm = $("#confirmPassword").val();

    if (confirm !== pass) {
      showError("confirmPassword", "Mật khẩu không khớp");
      return false;
    }

    clearError("confirmPassword");
    return true;
  }

  function validateGender() {
    if (!$("input[name='gender']:checked").val()) {
      showError("gender", "Chọn giới tính");
      return false;
    }

    clearError("gender");
    return true;
  }

  function validateTerms() {
    if (!$("#terms").is(":checked")) {
      showError("terms", "Phải đồng ý điều khoản");
      return false;
    }

    clearError("terms");
    return true;
  }

  $("#registerForm").submit(function (e) {
    e.preventDefault();

    const valid =
      validateFullName() &
      validateEmail() &
      validatePhone() &
      validatePassword() &
      validateConfirm() &
      validateGender() &
      validateTerms();

    if (valid) {
      alert("Đăng ký thành công 🎉");
    }
  });

  $("#username").blur(validateFullName);
  $("#email").blur(validateEmail);
  $("#phone").blur(validatePhone);
  $("#password").blur(validatePassword);
  $("#confirmPassword").blur(validateConfirm);

  $("input").on("input", function () {
    const id = $(this).attr("id");

    if (id) clearError(id);
  });
});
