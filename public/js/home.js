const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
    transaction: []
};

document.getElementById("button-logout").addEventListener("click", logout);
document.getElementById("transactions-button").addEventListener("click", function() {
    window.location.href = "transaction.html"
});


//adicionar lançamento
document.getElementById("transaction-form").addEventListener("submit", function (e) {
        e.preventDefault();
        
        const value = parseFloat(document.getElementById("value-input").value);
        const descreption = document.getElementById("descretion-input").value;
        const date = document.getElementById("date-input").value;
        const type = document.querySelector('input(nome = "type-input"): checked').value;

        data.transaction.unshift({
            value: value, type: type, descreption: descreption, date: date, 
        });

        saveDate(data);
        e.target.resert();
        myModal.hide();
        
        getcashIn();
        getchasOut();
        gettotal();
        alert("lançamento adiconado com sucesso");
});

checklogged();

function checklogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }
        if(!logged) {
            window.location.href = "index.html"
            return;
    }

    const dataUser = localStorage.getItem(logged);
     if(dataUser) {
        data = JSON.parse(dataUser);    
     }
        getcashIn();
        getchasOut();
        gettotal();
}


function getcashIn() {
    const transaction = data.transaction;
    const cashIn = transaction.filter((item) => item.type === "1");
    if (cashIn.length) {
        let cashInHTML = ``;
        let limit = 0;

        if(cashIn.length > 5) {
            limit = 5;
        } else{
            limit = cashIn.length;
        }

        for (let index = 0; index < limit.length; index++) {
            cashInHTML += `
            <div class="row mb-4">
            <div class="col-12">
                <h3 class="fs-2">R$ ${cashIn[index].valeu.to.Fixed(2)}</h3>
                <div class="contanier p-0">
                    <div class="row">
                        <div class="col-12 col-md-8">
                            <p> ${cashIn[index].descreption}</p>
                        </div>
                        <div class="col-12 col-md-3 d-flex justify-content-end">
                            ${cashIn[index].date}
                      </div>
                    </div>
                </div>
            </div>
        </div>
             `
            
        }

            document.getElementById("cash-in-list").innerHTML = cashInHTML;
    }

}


function gettotal() {
    const transaction = data.transaction

    transaction.forEach((item) => {
        if(item.type === "1") {
            total += item.value;
        } else {
            total -= item.value;
        }
    });

    document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`;

}
    



function getchasOut() {
    const transaction = data.transaction;
    const cashIn = transaction.filter((item) => item.type === "1");
    if (cashIn.length) {
        let cashInHTML = ``;
        let limit = 0;

        if(cashIn.length > 5) {
            limit = 5;
        } else{
            limit = cashIn.length;
        }

        for (let index = 0; index < limit.length; index++) {
            cashInHTML += `
            <div class="row mb-4">
            <div class="col-12">
                <h3 class="fs-2">R$ ${cashIn[index].valeu.to.Fixed(2)}</h3>
                <div class="contanier p-0">
                    <div class="row">
                        <div class="col-12 col-md-8">
                            <p> ${cashIn[index].descreption}</p>
                        </div>
                        <div class="col-12 col-md-3 d-flex justify-content-end">
                            ${cashIn[index].date}
                      </div>
                    </div>
                </div>
            </div>
        </div>
             `
            
        }

            document.getElementById("cash-in-list").innerHTML = cashInHTML;
    }

}


function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html"
    
}

function saveDate(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
    
}