document.addEventListener("DOMContentLoaded", function () {

    document.body.addEventListener("click", function (e) {

        // Check if delete button was clicked
        if (!e.target.classList.contains("delete-btn")) return;

        const index = e.target.getAttribute("data-index");

        if (index === null) {
            alert("Delete error: Invalid item.");
            return;
        }

        const confirmDelete = confirm("Are you sure you want to delete this book?");
        if (!confirmDelete) return;

        // Fetch tickets
        let tickets = JSON.parse(localStorage.getItem("tickets")) || [];

        if (index < 0 || index >= tickets.length) {
            alert("Delete error: Item not found.");
            return;
        }

        // Remove ticket
        tickets.splice(index, 1);

        // Save updated list
        localStorage.setItem("tickets", JSON.stringify(tickets));

        // Reload page to reflect change
        window.location.reload();
    });

});
