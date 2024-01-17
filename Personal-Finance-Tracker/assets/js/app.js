$(document).ready(function() {
    const cardContainer = document.querySelector('.cards-container');

    $('.addCard').click(function() {
        const overlay = $('<div class="overlay"></div>');

        // Create form container
        const formContainer = $('<div class="form-container"></div>');
        formContainer.html(`
            <form>
                <label for="title">Title:</label>
                <input type="text" id="title" name="title"><br><br>
                <label for="money">Money:</label>
                <input type="number" id="money" name="money"><br><br>
                <label for="serial">Money:</label>
                <input type="number" id="serial" name="serial"><br><br>
                <label for="cardType">Card Type:</label>
                <select id="cardType" name="cardType">
                    <option value="visa">Visa</option>
                    <option value="mastercard">MasterCard</option>
                </select><br><br>
                <button class="submit" type="submit">Submit</button>
            </form>
        `);

        // Append form container to overlay
        overlay.append(formContainer);

        // Append overlay to body
        $('body').append(overlay);
        overlay.click(function(event) {
            if ($(event.target).closest('.form-container').length === 0) {
                overlay.remove();
                }
        });
        
        $(document).on('submit', 'form', function(event) {
            event.preventDefault(); // Prevent the default form submission

            // Get input values
            const titleCard = $('#title').val();
            const moneyCard = $('#money').val();
            const selectCard = $('#cardType').val();
            const serial = $('#serial').val();

            // Determine the card image based on the selected card type
            const cardImage = selectCard === 'visa' ? 'visa-logo-png-transparent.png' : 'Mastercard-logo.png';
            const lastFourDigits = serial.substr(-4); // Get last 4 digits of the credit card number

            // Create the new card item
            const createCardItem = $(`
                <div class="card-item">
                    <div class="cards-wrapper">
                        <div class="circle"><p>&euro;</p></div>
                        <div class="card-details">
                            <p>${titleCard + ' wallet'}</p>
                            <h3>&euro; ${moneyCard}</h3>
                        </div>
                    </div>
                    <div class="square">
                        <img src="assets/img/${cardImage}" alt="">
                        <p>${lastFourDigits}</p>
                    </div>
                </div>
            `);

            // Append the new card item to the cards container
            $('.cards-container').append(createCardItem);

            // Optionally, remove the overlay
            $('.overlay').remove();
        });
    });

    var cty = document.getElementById('transportChart').getContext('2d');
    var transportChart = new Chart(cty, {
        type: 'pie',
        data: {
            datasets: [{
                data: [1200,700],
                backgroundColor: [
                    '#5673fb','#d1d5f8'
                ],
            }]
        },
    });

    var cta = document.getElementById('foodChart').getContext('2d');
    var foodChart = new Chart(cta, {
        type: 'pie',
        data: {
            datasets: [{
                data: [3700,2100],
                backgroundColor: [
                    '#e45188','#fcd3e3'
                ],
            }]
        },
    });

    var ctb = document.getElementById('sportChart').getContext('2d');
    var sportChart = new Chart(ctb, {
        type: 'pie',
        data: {
            datasets: [{
                data: [350,950],
                backgroundColor: [
                    '#5a00de','#d4b8f2'
                ],
            }]
        },
    });


    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'bar', // The type of chart: bar, line, pie, etc.
    data: {
        labels: ['Su', 'Ma', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        datasets: [{
            label: 'Spendings',
            data: [12000,5000,6000,20000], // Example data
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                // ... other colors for each bar
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                // ... other border colors for each bar
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    // Custom formatting for Y-axis labels
                    callback: function(value, index, values) {
                        return value / 1000 + 'k'; // Convert to 'k' for thousands
                        }
                    }
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Money Status',
                position: 'top',
                align: 'start' // Aligns the title to the left
            }
        },
    });

    function updateChartTimePeriod() {
        var selectedTimePeriod = document.getElementById('timePeriodSelect').value;
    
        // Update the chart data based on the selected time period
        // This might involve fetching new data or filtering your existing dataset
        // For example:
        if (selectedTimePeriod === 'week') {
            // Update chart data for the week
            myChart.data.datasets[0].data = [];
        } else if (selectedTimePeriod === 'month') {
            // Update chart data for the month
            myChart.data.datasets[0].data = [];
        } else if (selectedTimePeriod === 'year') {
            // Update chart data for the year
            myChart.data.datasets[0].data = [/* year data */];
        }
    
        myChart.update(); // Update the chart to reflect new data
    }

    //updateChartTimePeriod();
    
});