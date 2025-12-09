// LOAD TICKETS
document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById("book-list");
    if (!list) return;

    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];

    list.innerHTML = "";

    tickets.forEach((ticket, index) => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${ticket.image}">
            <h3>${ticket.book}</h3>
            <p><strong>Seller:</strong> ${ticket.name}</p>
            <p class="price">₹ ${ticket.price}</p>
            <p><strong>Address:</strong> ${ticket.address}</p>
            <p><strong>Contact:</strong> ${ticket.contact}</p>

            <div class="actions">
                <button class="edit-btn" onclick="editTicket(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteTicket(${index})">Delete</button>
            </div>
        `;

        list.appendChild(card);
    });
});

// DELETE TICKET
function deleteTicket(index) {
    const confirmDelete = confirm("Are you sure you want to delete this ticket?");
    if (!confirmDelete) return;

    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    tickets.splice(index, 1);
    localStorage.setItem("tickets", JSON.stringify(tickets));
    location.reload();
}

// EDIT TICKET
function editTicket(index) {
    localStorage.setItem("editIndex", index);
    window.location.href = "sell.html";
}

// HANDLE FORM
const sellForm = document.getElementById("sellForm");

if (sellForm) {
    const editIndex = localStorage.getItem("editIndex");
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];

    // IF EDIT MODE → PREFILL DATA
    if (editIndex !== null) {
        const ticket = tickets[editIndex];

        document.getElementById("name").value = ticket.name;
        document.getElementById("book").value = ticket.book;
        document.getElementById("price").value = ticket.price;
        document.getElementById("address").value = ticket.address;
        document.getElementById("contact").value = ticket.contact;
    }

    sellForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const imageFile = document.getElementById("image").files[0];

        if (editIndex !== null && !imageFile) {
            // KEEP OLD IMAGE IF NOT RE-UPLOADED
            tickets[editIndex] = {
                ...tickets[editIndex],
                name: name.value,
                book: book.value,
                price: price.value,
                address: address.value,
                contact: contact.value
            };
        } else {
            const reader = new FileReader();
            reader.onload = function () {
                const ticketData = {
                    name: name.value,
                    book: book.value,
                    price: price.value,
                    address: address.value,
                    contact: contact.value,
                    image: reader.result
                };

                if (editIndex !== null) {
                    tickets[editIndex] = ticketData;
                } else {
                    tickets.push(ticketData);
                }

                localStorage.setItem("tickets", JSON.stringify(tickets));
                localStorage.removeItem("editIndex");
                window.location.href = "index.html";
            };
            reader.readAsDataURL(imageFile);
            return;
        }

        localStorage.setItem("tickets", JSON.stringify(tickets));
        localStorage.removeItem("editIndex");
        window.location.href = "index.html";
    });
}
