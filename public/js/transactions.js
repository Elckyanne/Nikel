const myModal = new bootstrap.Modal("#transaction-modal");
let Logged = sessionStorage.getItem("Logged");
const session = localStorage.getItem("session");

let data = {
    transactions: []
};

document.getElementById("button-logout").addEventListener("click", logout);

//ADICIONAR LANÇAMENTO
document.getElementById("transaction-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    data.transactions.unshift({
        value: value, type: type, description: description, date: date
    });

    saveData(data);
    e.target.reset();
    myModal.hide();

    getTransactions();

    alert("Lançamento adicionado com sucesso.");

});

checkLogged();

function checkLogged() {
    if(session) {
        sessionStorage.setItem("Logged", session);
        Logged = session;
    }

    if(!Logged) {
        window.location.href = "index.html";
        return;
    }

    const dataUser = localStorage.getItem(Logged);
    if(dataUser) {
        data = JSON.parse(dataUser);
    }

    getTransactions();

}

function logout() {
    sessionStorage.removeItem("Logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

function getTransactions() {
    const transactions = data.transactions;
    let transactionsHtml = ``;

    if(transactions.length) {
        transactions.forEach((item) => {
            let type = "Entrada";

            if(item.type === "2") {
                type = "Saida";
            }

            transactionsHtml += `
            <tr>
                <th scope="row">${item.date}1</th>
                <td>${item.value.toFixed(2)}</td>
                <td>${type}</td>
                <td>${item.description}a</td>
            </tr>
            `
        })
    }

    document.getElementById("transactions-list").innerHTML = transactionsHtml;
}

function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

document.getElementById("inlineRadio2").addEventListener("click", function() {
    if (confirm("Atençao. seu saldo apos cadastrar essa despesa sera negativo. Deseja continuar?")) {
        // Se o usuário clicar em "OK" no prompt de confirmação, execute a ação desejada
        // Por exemplo, você pode abrir o modal de transação de despesa aqui
        // Por favor, substitua o código abaixo com a ação desejada
    }
});