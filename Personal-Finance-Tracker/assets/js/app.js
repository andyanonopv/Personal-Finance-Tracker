$(document).ready(function() {
    $("#navbar-placeholder").load("navbar.html");
    
    const cardContainer = document.querySelector('.cards-container');
    const budgetsContainer = document.querySelector('.budgets-container');

    $('#addBudget').click(function() {
        const overlay = $('<div class="overlay"></div>');

        const formContainer = $('<div class="form-container"></div>');
        formContainer.html(`
            <form>
                <label for="canvasId">Canvas id:</label>
                <input type="text" id="canvasId" name="canvasId"><br><br>
                <label for="titleBudget">Title:</label>
                <input type="text" id="titleBudget" name="title"><br><br>
                <label for="total">Money Total:</label>
                <input type="number" id="total" name="total"><br><br>
                <label for="spent">Money Spent:</label>
                <input type="number" id="spent" name="spent"><br><br>
                <button class="submitData" type="submit">Submit</button>
            </form>
        `);
        overlay.append(formContainer);

        // Append overlay to body
        $('body').append(overlay);

        overlay.click(function(event) {
            if ($(event.target).closest('.form-container').length === 0) {
                overlay.remove();
                }
        });
        
        $(document).on('submit', 'form', function(event) {
            event.preventDefault();
            const canvasId = $('#canvasId').val();
            const titleBudget = $('#titleBudget').val();
            const totalMoney = $('#total').val();
            const spentMoney = $('#spent').val();

            const createBudgetItem = $(`
            <div class="budget-item">
                    <div class="flex-left">
                            <canvas id="${canvasId}"></canvas>
                            <div class="text-wrapper">
                            <h3>${titleBudget}</h3>
                            <p>${totalMoney-spentMoney} Left</p>
                            </div>
                    </div>
                        <div class="money-wrapper">
                            <h3>${totalMoney}</h3>
                            <p>${spentMoney} of ${totalMoney}</p>
                    </div>
            </div>
        `);

        
        $('.budgets-items').append(createBudgetItem);
        initializeChart(canvasId, [spentMoney, totalMoney - spentMoney]);
        $('.overlay').remove();
        });
    });

    function initializeChart(canvasId, data) {
        // Delay chart initialization to ensure canvas is in the DOM
        setTimeout(() => {
            var canvas = document.getElementById(canvasId);
            if (canvas) {
                var ctx = canvas.getContext('2d');
                var newChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        datasets: [{
                            data: data,
                            backgroundColor: ['#5673fb', '#d1d5f8'],
                        }]
                    },
                });
            } else {
                console.error('Canvas element not found:', canvasId);
            }
        }, 0);
    }

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
