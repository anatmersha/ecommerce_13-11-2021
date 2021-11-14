const updates = document.getElementById('updates');
const inputEmail = document.getElementById('inputEmail');
const subscribe = document.getElementById('subscribe');
const coupon = document.getElementById('coupon');

function couponCode() {
    coupon.innerHTML = `<p id="innerCoupon">COUPON CODE: #UhaveAVgood(I)</p>`;
}

updates.onsubmit = (event) => {
    event.preventDefault();
    var str = inputEmail.value;
    if (str.indexOf("@") != -1) {
        alert("Thank you for joining us!");
    }
}