const seatsContainer = document.getElementById("seats");

const selectedSeats = [];

const ticketPrice = 180;


// Create seats A1 - A20

for (let i = 1; i <= 20; i++) {

    const seat = document.createElement("div");

    seat.classList.add("seat");

    seat.innerText = "A" + i;

    seat.onclick = function () {

        const seatNumber = "A" + i;

        if (selectedSeats.includes(seatNumber)) {

            selectedSeats.splice(
                selectedSeats.indexOf(seatNumber),
                1
            );

            seat.classList.remove("selected");

        } else {

            selectedSeats.push(seatNumber);

            seat.classList.add("selected");
        }

        updateTotal();
    };

    seatsContainer.appendChild(seat);
}


// Update total

function updateTotal() {

    document.getElementById("selectedSeats").innerText =
        selectedSeats.length > 0
        ? selectedSeats.join(", ")
        : "None";

    document.getElementById("total").innerText =
        selectedSeats.length * ticketPrice;
}


// Payment method

document.getElementById("paymentMethod").addEventListener(
    "change",
    function () {

        const method = this.value;

        document.getElementById("upiBox").style.display =
            method === "UPI" ? "block" : "none";

        document.getElementById("cardBox").style.display =
            method === "Card" ? "block" : "none";
    }
);


// Book ticket

function bookTicket() {

    const name =
        document.getElementById("customerName").value;

    const phone =
        document.getElementById("phone").value;

    const theatre =
        document.getElementById("theatre").value;

    const date =
        document.getElementById("date").value;

    const showTime =
        document.getElementById("showTime").value;

    const payment =
        document.getElementById("paymentMethod").value;

    const total =
        selectedSeats.length * ticketPrice;


    if (name === "" || phone === "") {

        alert("Please enter customer details.");

        return;
    }


    if (selectedSeats.length === 0) {

        alert("Please select at least one seat.");

        return;
    }


    if (date === "") {

        alert("Please select a date.");

        return;
    }


    if (payment === "UPI") {

        const upi =
            document.getElementById("upi").value;

        if (upi === "") {

            alert("Please enter your UPI ID.");

            return;
        }
    }


    if (payment === "Card") {

        const card =
            document.getElementById("cardNumber").value;

        const cardName =
            document.getElementById("cardName").value;

        const cvv =
            document.getElementById("cvv").value;

        if (
            card === "" ||
            cardName === "" ||
            cvv === ""
        ) {

            alert("Please enter card details.");

            return;
        }
    }


    const transactionId =
        "TXN" + Math.floor(Math.random() * 1000000);


    document.getElementById("confirmation").style.display =
        "block";


    document.getElementById("ticketDetails").innerHTML =

        `
        <strong>Booking ID:</strong> BK${Math.floor(Math.random() * 100000)}<br><br>

        <strong>Customer:</strong> ${name}<br>

        <strong>Phone:</strong> ${phone}<br>

        <strong>Movie:</strong> Leo<br>

        <strong>Theatre:</strong> ${theatre}<br>

        <strong>Date:</strong> ${date}<br>

        <strong>Show Time:</strong> ${showTime}<br>

        <strong>Seats:</strong> ${selectedSeats.join(", ")}<br>

        <strong>Total:</strong> ₹${total}<br>

        <strong>Payment:</strong> ${payment}<br>

        <strong>Transaction ID:</strong> ${transactionId}<br>

        <strong>Status:</strong> ✅ Successful
        `;


    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });
}