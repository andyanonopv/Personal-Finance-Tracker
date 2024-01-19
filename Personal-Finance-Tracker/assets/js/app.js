$(document).ready(function() {
    loadBudgetItems();
    $("#navbar-placeholder").load("navbar.html", function() {
        $('.nav-item').removeClass('active');
        var currentPage = window.location.pathname;
        $('.nav-item a').each(function() {
            var linkPage = $(this).attr('href');
            
            if(currentPage.endsWith(linkPage)) {
                $(this).parent().addClass('active');
            }
        });
    });

    function initializeChart(canvasId, data) {
        setTimeout(() => {
            var canvas = document.getElementById(canvasId);
            if (canvas) {
                // Destroy existing chart if it exists
                if (Chart.getChart(canvasId)) {
                    Chart.getChart(canvasId).destroy();
                }
    
                var ctx = canvas.getContext('2d');
                var newChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        datasets: [{
                            data: data,
                            backgroundColor: randomColor(),
                        }]
                    },
                });
            } else {
                console.error('Canvas element not found:', canvasId);
            }
        }, 0);
    }

    function randomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
    
        const color = `rgb(${r}, ${g}, ${b})`;
        const lighterColor = `rgb(${Math.floor(r + (255 - r) * 0.5)}, ${Math.floor(g + (255 - g) * 0.5)}, ${Math.floor(b + (255 - b) * 0.5)})`;
    
        return [color, lighterColor];
    }
    
    function createSummaryChart() {
        const budgetItems = JSON.parse(localStorage.getItem('budgetItems')) || [];
        const spentData = budgetItems.map(item => item.spentMoney);
        const remainingData = budgetItems.map(item => item.totalMoney - item.spentMoney);
    
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar', // Example: bar chart
            data: {
                labels: budgetItems.map(item => item.titleBudget), // Budget categories as labels
                datasets: [{
                    label: 'Spent',
                    data: spentData,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }, {
                    label: 'Remaining',
                    data: remainingData,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Overall Budget Summary',
                        position: 'top'
                    }
                },
            }
        });
    }
    
    

    // var ctx = document.getElementById('myChart').getContext('2d');
    // var myChart = new Chart(ctx, {
    // type: 'bar', // The type of chart: bar, line, pie, etc.
    // data: {
    //     labels: ['Su', 'Ma', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    //     datasets: [{
    //         label: 'Spendings',
    //         data: [12000,5000,6000,20000], // Example data
    //         backgroundColor: [
    //             'rgba(255, 99, 132, 0.2)',
    //             // ... other colors for each bar
    //         ],
    //         borderColor: [
    //             'rgba(255, 99, 132, 1)',
    //             // ... other border colors for each bar
    //         ],
    //         borderWidth: 1
    //     }]
    // },
    // options: {
    //     scales: {
    //         y: {
    //             beginAtZero: true,
    //             ticks: {
    //                 // Custom formatting for Y-axis labels
    //                 callback: function(value, index, values) {
    //                     return value / 1000 + 'k'; // Convert to 'k' for thousands
    //                     }
    //                 }
    //             }
    //         }
    //     },
    //     plugins: {
    //         title: {
    //             display: true,
    //             text: 'Money Status',
    //             position: 'top',
    //             align: 'start' // Aligns the title to the left
    //         }
    //     },
    // });


    function loadBudgetItems() {
        const budgetItems = JSON.parse(localStorage.getItem('budgetItems')) || [];
        console.log(budgetItems);
        budgetItems.forEach(item => {
            const createBudgetItem = $(`
                <div class="budget-item">
                    <div class="flex-left">
                        <canvas id="${item.canvasId}"></canvas>
                        <div class="text-wrapper">
                            <h3>${item.titleBudget}</h3>
                            <p>${item.totalMoney - item.spentMoney} Left</p>
                        </div>
                    </div>
                    <div class="money-wrapper">
                        <h3>${item.totalMoney}</h3>
                        <p>${item.spentMoney} of ${item.totalMoney}</p>
                    </div>
                </div>
            `);
            $('.budgets-items').append(createBudgetItem);
            initializeChart(item.canvasId, [item.spentMoney, item.totalMoney - item.spentMoney]);
        });
    }


    $(document).on('submit', '#budget-form', function(event) {
        event.preventDefault();
        
        const canvasId = 'canvas' + Math.random().toString(36).substr(2, 9); // Generate unique ID
        const titleBudget = $('#budget-category').val();
        const totalMoney = parseInt($('#budget-amount').val(), 10);
        const spentMoney = parseInt($('#spent-amount').val(), 10);

        const budgetItem = {
            canvasId,
            titleBudget,
            totalMoney,
            spentMoney
        };
        console.log(budgetItem);

        // Save the new budget item in localStorage
        const budgetItems = JSON.parse(localStorage.getItem('budgetItems')) || [];
        budgetItems.push(budgetItem);
        localStorage.setItem('budgetItems', JSON.stringify(budgetItems));

        console.log("form submitted");
        // Add the new budget item to the page
        loadBudgetItems();
    });

    

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

    function resetLocalStorage() {
        localStorage.clear();
        console.log("Local storage has been cleared.");
    }
    createSummaryChart();

    // resetLocalStorage();
    //updateChartTimePeriod();
    
});
