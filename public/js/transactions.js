const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
    transaction: []
};

document.getElementById("button-logout").addEventListener("click", logout);



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
    gettransaction();
    
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

function checklogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }
        if(!logged) {
            window.location.href = "index.html"
            return;
    }

    gettransaction();

}

function gettransaction() {
    const transaction = data.transaction;
    let transactionHTML = ``;

    if(transaction.length){
        transaction.forEach((item) => {
            let type = "entrada";

            if(item.type === "2") {
                type = "saida";
            }  

            transaction += `
         <tr>
            <th scope="row">${item.date}</th>
            <td>${item.value.toFixed(2)}</td>
            <td>${type}</td>
            <td>${item.descreption}</td>
        </tr>            
            ` 
        })
    }
    
}

document.getElementById("transactions-list").innerHTML = transactionHTML;


function saveDate(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
    
}