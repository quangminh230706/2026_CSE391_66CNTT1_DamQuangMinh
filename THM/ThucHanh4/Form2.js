$(document).ready(function () {
  // Giá sản phẩm
  const prices = {
    ao: 150000,
    quan: 200000,
    giay: 500000,
  };

  // --------------------
  // TÍNH TỔNG TIỀN
  // --------------------

  function updateTotal() {
    let product = $("#product").val();
    let quantity = Number($("#quantity").val());

    if (prices[product] && quantity) {
      let total = prices[product] * quantity;
      $("#total").text(total.toLocaleString("vi-VN"));
    } else {
      $("#total").text("0");
    }
  }

  $("#product").change(updateTotal);
  $("#quantity").on("input", updateTotal);

  // --------------------
  // ĐẾM KÝ TỰ GHI CHÚ
  // --------------------

  $("#note").on("input", function () {
    let length = $(this).val().length;

    $("#charCount").text(length + "/200");

    if (length > 200) {
      $("#charCount").css("color", "red");
      $("#noteError").text("Ghi chú tối đa 200 ký tự");
    } else {
      $("#charCount").css("color", "black");
      $("#noteError").text("");
    }
  });

  // --------------------
  // VALIDATE FORM
  // --------------------

  function validateForm() {
    let valid = true;

    // sản phẩm
    if ($("#product").val() === "") {
      $("#productError").text("Vui lòng chọn sản phẩm");
      valid = false;
    } else {
      $("#productError").text("");
    }

    // số lượng
    let quantity = Number($("#quantity").val());

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      $("#quantityError").text("Số lượng từ 1 - 99");
      valid = false;
    } else {
      $("#quantityError").text("");
    }

    // ngày giao
    let today = new Date();
    let maxDate = new Date();

    maxDate.setDate(today.getDate() + 30);

    let inputDate = new Date($("#deliveryDate").val());

    if (!$("#deliveryDate").val() || inputDate < today || inputDate > maxDate) {
      $("#dateError").text("Ngày giao không hợp lệ");
      valid = false;
    } else {
      $("#dateError").text("");
    }

    // địa chỉ
    let address = $("#address").val().trim();

    if (address.length < 10) {
      $("#addressError").text("Địa chỉ tối thiểu 10 ký tự");
      valid = false;
    } else {
      $("#addressError").text("");
    }

    // phương thức thanh toán
    if (!$("input[name='payment']:checked").val()) {
      $("#paymentError").text("Chọn phương thức thanh toán");
      valid = false;
    } else {
      $("#paymentError").text("");
    }

    return valid;
  }

  // --------------------
  // SUBMIT FORM
  // --------------------

  $("#orderForm").submit(function (e) {
    e.preventDefault();

    if (!validateForm()) return;

    let productName = $("#product option:selected").text();
    let quantity = $("#quantity").val();
    let total = prices[$("#product").val()] * quantity;
    let date = $("#deliveryDate").val();

    $("#sumProduct").text("Sản phẩm: " + productName);
    $("#sumQuantity").text("Số lượng: " + quantity);
    $("#sumTotal").text("Tổng tiền: " + total.toLocaleString("vi-VN") + " VNĐ");
    $("#sumDate").text("Ngày giao: " + date);

    $("#summary").show();
  });

  // --------------------
  // XÁC NHẬN ĐẶT HÀNG
  // --------------------

  $("#confirmBtn").click(function () {
    $("#successMsg").text("Đặt hàng thành công!");

    $("#summary").hide();

    $("#orderForm")[0].reset();

    $("#total").text("0");

    $("#charCount").text("0/200");
  });

  // --------------------
  // HỦY ĐƠN
  // --------------------

  $("#cancelBtn").click(function () {
    $("#summary").hide();
  });
});
