const topsCategory = document.getElementById('topsCategory');
const preBtn = document.getElementsByClassName('preBtn');
const nextBtn = document.getElementsByClassName('nextBtn');
const topImg = document.getElementsByClassName('topImg');
const sortList = document.getElementById('sortList');
const topsPrice = document.getElementsByClassName('topsPrice');
const quickView = document.getElementsByClassName('quickView');
const quickViewBtn = document.getElementsByClassName('quickViewBtn');
const exit = document.getElementsByClassName('exit');
const quickViewContent = document.getElementsByClassName('quickViewContent');
const quickViewSection = document.getElementById('quickViewSection');
const QVPrice = document.getElementsByClassName('QVPrice');
const pushToCart = document.getElementsByClassName('pushToCart');
const updateDisplaySection = document.getElementById('updateDisplaySection');
const updateBtn = document.getElementsByClassName('updateBtn');
const sendUpdate = document.getElementsByClassName('sendUpdate');
const updateForm = document.getElementsByClassName('updateForm');
const formHeader = document.getElementById('formHeader');
const exitForm = document.getElementsByClassName('exitForm');

axios
    .get(`/categories/top`)
    .then((data) => {
        console.log(data);
        tops = data.data;
        itemsDisplay(tops);
        next();
        pre();
        sortTopsList();
        boldSalePrice();
        QVDisplay();
        updateDisplay();
    })
    .catch((err) => { console.error(err); })



function addToCart(i) {
    console.log(i);
    const id = tops[i]._id;
    const Name = tops[i].Name;
    const Price = tops[i].Price;
    const Description = tops[i].Description;
    const isSale = tops[i].isSale;
    const Category = tops[i].Category;
    const img1 = tops[i].Images[0];
    const img2 = tops[i].Images[1];
    const Images = [img1, img2];

    const newProduct = {
        _id: id,
        Name,
        Price,
        Description,
        isSale,
        Category,
        Images: Images,
    }

    axios.patch(`/cartPush/618c11a42f2d818001ec25ff`, newProduct)
        .then((response) => {
            alert("Product sent to cart!")
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
}

function deleteProduct(i) {
    console.log(i);
    const id = tops[i]._id;
    axios.delete(`/product/${id}`)
        .then((response) => {
            document.getElementById(`${id}`).innerHTML = '';
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
}

function updateProduct(e, i) {
    e.preventDefault();

    const Name = document.getElementById('productName').value;
    const Price = document.getElementById('productPrice').value;
    const Description = document.getElementById('productDescription').value;
    const isSale = document.getElementById('productIsSale').value;
    const Category = document.getElementById('productCategory').value;
    const img1 = document.getElementById('productImg1').value;
    const img2 = document.getElementById('productImg2').value;
    const Images = [img1, img2];

    console.log(Name);
    const id = tops[i]._id;
    console.log(id);
    axios.patch(`/product/${id}`, {
            Name: Name,
            Price: Price,
            Description: Description,
            isSale: isSale,
            Category: Category,
            Images: Images,
        })
        .then((response) => {
            alert("Product has been updated!")
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
}

const itemsDisplay = (tops) => {
    let show = "";
    for (let i = 0; i < tops.length; i++) {
        show += `
    <article class="top" id="${tops[i]._id}">
    <h3>${tops[i].Name}</h3>
    <span onclick="deleteProduct(${i})" class="delete">&times;</span>
    <button class="preBtn" type="button"><a>&#10094;</a></button>
    <img class="topImg" src="${tops[i].Images[0]}">
    <button class="nextBtn" type="button"><a>&#10095;</a></button>
    <h5>${tops[i].Description}</h5>
    <p class="topsPrice">${tops[i].Price} $</p>
    <span onclick="QVDisplay()" class="quickViewBtn">Quick View</span>
    <span onclick="updateDisplay()" class="updateBtn">update</span>
    </article>`
    }
    topsCategory.innerHTML += show;
};

function updateDisplay() {
    for (let i = 0; i < updateBtn.length; i++) {
        updateBtn[i].addEventListener("click", () => {
            updateDisplaySection.innerHTML += `
    <form class="updateForm" onsubmit="updateProduct(event,${i})">
            <h1 id="formHeader">Product update</h1>
            <input id="productName" class="productName" required type="text" placeholder="Enter product name" autofocus></br>
            <input id="productPrice" class="productPrice" required type="number" placeholder="Enter product price"></br>
            <input id="productDescription" class="productDescription" required type="text" placeholder="Enter product description"></br>
        <select id="productIsSale" class="productIsSale" required placeholder="Enter if product in sale">
            <option value="true">true</option>
            <option value="false">false</option>
        </select>

    <select id="productCategory" class="productCategory" required placeholder="Enter product category">
        <option value="top">top</option>
        <option value="buttom">buttom</option>
        <option value="shoes">shoes</option>
        <option value="dresses">dresses</option>
    </select>
                        
            <input id="productImg1" class="productImg1" required type="text" placeholder="Enter product first image"></br>
            <input id="productImg2" class="productImg2" required type="text" placeholder="Enter product second image"></br>
            <button class="sendUpdate"  type="submit">Send</button>
            <span onclick="exitUpdateForm()" class="exitForm">&times;</span>
        </form>`
        })
    }
}

function next() {
    for (let i = 0; i < nextBtn.length; i++) {
        let counter = 0;
        nextBtn[i].addEventListener("click", () => {
            switch (counter) {
                case 0:
                    topImg[i].src = tops[i].Images[1]
                    counter = 1
                    break;
                case 1:
                    topImg[i].src = tops[i].Images[0]
                    counter = 0
                    break;
            }
        });
    }
}

function pre() {
    for (let i = 0; i < preBtn.length; i++) {
        let counter = 0;
        preBtn[i].addEventListener("click", () => {
            switch (counter) {
                case 0:
                    topImg[i].src = tops[i].Images[1]
                    counter = 1
                    break;
                case 1:
                    topImg[i].src = tops[i].Images[0]
                    counter = 0
                    break;
            }
        });
    }
}

function sortTopsList() {
    sortList.addEventListener("change", function() {
        if (sortList.value == "Low to high") {
            tops.sort(function(a, b) {
                return a.Price - b.Price;
            });
            itemsDisplay(tops);
            next();
            pre();
        } else if (sortList.value == "High to low") {
            tops.sort(function(a, b) {
                return b.Price - a.Price;
            });
            itemsDisplay(tops);
            next();
            pre();
        }
    })
}
sortTopsList();

function boldSalePrice() {
    for (let i = 0; i < tops.length; i++) {
        if (tops[i].isSale == true) {
            var PercentOff = Math.round(tops[i].Price * 0.7);
            topsPrice[i].innerHTML = `<del>${tops[i].Price} $</del> <b>${PercentOff}$</b>`;
        }
    }
}

function QVDisplay() {
    for (let i = 0; i < quickViewBtn.length; i++) {
        quickViewBtn[i].addEventListener("click", () => {
            quickViewSection.innerHTML += `
        <section class="quickView">
        <section class="quickViewContent">
            <article class="leftQuickView">
                <img class="QVImg1" src="${tops[i].Images[0]}">
                <img class="QVImg2" src="${tops[i].Images[1]}">
                <h3>About me</h3>
                <p> Main Material: Cotton.<br> Lorem, ipsum dolor sit amet consectetur neque.<br> Minus vel sunt asperiores doloremque perspiciatis<br> voluptatibus enim, explicabo dolorum ab.</p>              
                <h3 id="sizeInfo">Size&Fit</h3>
                <p id="sizeInfoP">Model's size: UK8 / EU36 / US4.<br> Model's height: 170 cm / 5'7.</p>
            </article>
            <article class="rightQuickView">
            <span onclick="exitQV()" class="exit">&times;</span>
                <h1>${tops[i].Name}</h1>
                <h3>${tops[i].Description}</h3>
                <h4 class="QVPrice">${tops[i].Price} $</h4>
                <button class="pushToCart" type="button" onclick="addToCart(${i})">Add to cart</button>
                <div id="deliveryInfo">Free Delivery !<br>Free Returns !</div>                    
            </article>
        </section>
        </section>
            `
        })
    }
}

function exitQV() {
    for (let i = 0; i < exit.length; i++) {
        quickView[i].style.display = "none";
    }
}

function exitUpdateForm() {
    for (let i = 0; i < exitForm.length; i++) {
        updateForm[i].style.display = "none";
    }
}