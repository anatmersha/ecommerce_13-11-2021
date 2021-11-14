const cart = document.getElementById('cart');
const cartTable = document.getElementsByClassName('cartTable');
const quantity = document.getElementsByClassName('quantity');
const total = document.getElementsByClassName('total');
const remove = document.getElementsByClassName('remove');
const cartTotal = document.getElementById('cartTotal');
const subTotal = document.getElementById('subTotal');
const couponInput = document.getElementById('couponInput');
const couponButton = document.getElementById('couponButton');
const discount = document.getElementById('discount');
const discountAmount = document.getElementById('discountAmount');
const emptyCartSection = document.getElementById('emptyCartSection');
const cartIcon = document.getElementById('cartIcon');
const emptyCartLink = document.getElementById('emptyCartLink');
const emptyCartHeader = document.getElementById('emptyCartHeader');

axios
    .get(`/cartDATA/618c11a42f2d818001ec25ff`)
    .then((data) => {
        cartList = data.data.Products;

        cartItemsDisplay(cartList, cart);
        isCoupon();
        getValue();
    })
    .catch((err) => { console.log(err); })



function deleteProduct(x) {
    console.log(x);
    const id = cartList[x]._id;
    console.log(id);
    axios.patch("/deleteProduct/618c11a42f2d818001ec25ff", { _id: id })
        .then((response) => {
            document.getElementById(`${id}`).innerHTML = '';
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
}

const cartItemsDisplay = (cartList, cart) => {
    let display = "";
    for (var i = 0; i < cartList.length; i++) {
        display += `
        <table id="${cartList[i].Id}" class="cartTable">
        <tr> 
        <th rowspan="4"><img class="cartImg" src="${cartList[i].Images[0]}"></th>    
        <td class="cartPrice">${cartList[i].Price} $</td>
        <td class="remove" onclick="deleteProduct(${i})">&times;</td>
        </tr>

        <tr>
        <td><h1 class="cartName">${cartList[i].Name}</h1></td>
        </tr>

        <tr>
        <td class="cartDesc">${cartList[i].Description}</td>  
        </tr>

        <tr>
        <td><input min="1" max="20" placeholder="Qty" class="quantity" oninput="getValue(${i})" type="number" value="1">
        <p class="total"></p></td>
        </tr>
        </table>
        `
    }
    cart.innerHTML += display;
}

function isCoupon() {
    if (couponInput.value == "#UhaveAVgood(I)") {
        coupon20P();
    }
}

function coupon20P() {
    var z = 0;
    for (var i = 0; i < cartList.length; i++) {
        if ((quantity[i].value) >= 1) {
            if (typeof(quantity[i].value) != typeof(3)) {
                var x = Number(quantity[i].value);
                var y = Number(cartList[i].Price);
                totalAmount = Number(x * y);
                total[i].innerHTML = totalAmount;
                z += totalAmount;
                subTotal.innerHTML = `<del>${Number(z)}$</del>`;
                discount.innerHTML = "20% OFF!";
                discountAmount.innerHTML = `${Number(z) * 0.9}$`;
            }
        }
    }
}

function getValue() {
    var z = 0;
    for (var i = 0; i < cartList.length; i++) {
        if ((quantity[i].value) >= 1) {
            if (typeof(quantity[i].value) != typeof(3)) {
                var x = Number(quantity[i].value);
                var y = Number(cartList[i].Price);
                totalAmount = Number(x * y);
                total[i].innerHTML = totalAmount;
                z += totalAmount;
                subTotal.innerHTML = Number(z);
            }
        }
    }
    if (cartList.length == 0) {
        emptyCartSection.style.display = "flex";
        subTotal.innerHTML = 0
    }
}