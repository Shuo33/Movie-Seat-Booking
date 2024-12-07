const container = document.querySelector('.container');

// grab all the seats in the rows that are not occupied
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

// save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}



// update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount; 
    total.innerText = selectedSeatsCount * ticketPrice;

    // document.querySelectorAll() gives a nodelist, we convert the nodelist into a regular array so we can map through it, since map() gives an array. and here we got the array with the index of the selected seats
    const seatsIndex = [...selectedSeats].map(function (seat) {
        return [...seats].indexOf(seat);
    });

    //save the selected seats to localStorage
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
}
    

// movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value; 

    // save the selected one to localStorage
    setMovieData(e.target.selectedIndex, e.target.value);

    updateSelectedCount();
});



// seat click event
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
            e.target.classList.toggle('selected');
            updateSelectedCount();
    }
});