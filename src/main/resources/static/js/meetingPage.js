function ParseFloat(str,val) {
    str = str.toString();
    str = str.slice(0, (str.indexOf(".")) + val + 1);
    return Number(str);
}

function addMarketConditionTableErrorMessage() {
    let tbody = document.querySelector(".market-table");

    tbody.innerHTML = `<div class="market-table-error">
                            Server error :(<br><br>
                            Check your internet connection...
                        </div>`;
}

function addTopCMCCryptoCurrencyData(data) {
    document.querySelector(".live-market-table")
        .innerHTML = `<thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>24H change</th>
                                    </tr>
                                </thead>
                                <tbody id="market-table-tbody">
        
                                </tbody>`;

    for(let i = 0; i < data.length; ++i) {

        let tbody = document.getElementById("market-table-tbody");
        let priceChangeIsPositive = data[i].priceChange24h > 0;
        let changeDirection = (priceChangeIsPositive) ? "growth" : "fall";
        let triangleDirection = (priceChangeIsPositive) ? "▲": "▼";

        tbody.insertRow(tbody.rows.length).innerHTML = `<td>
                                                            ${data[i].rank}
                                                        </td>
                                                        <td>
                                                            <strong>${data[i].name}</strong><span class="symbol"> — ${data[i].symbol}</span>
                                                        </td>
                                                        <td>
                                                            $ ${ParseFloat(data[i].price, 2)}
                                                        </td>
                                                        <td>
                                                            <span class="price-change ${changeDirection}">${triangleDirection} ${ParseFloat(data[i].priceChange24h, 2)}%</span>
                                                        </td>`;
    }
}


async function fetchData() {
    let response;
    try {
        response = await fetch('/getTopFiveCMCCrypto');
    } catch (error) {
        console.error('There has been a problem with /getList fetch operation:', error);
        addMarketConditionTableErrorMessage();
        return;
    }

    if (!response.ok) {
        console.error('There has been a problem with /getList fetch operation:', response.statusText);
        addMarketConditionTableErrorMessage();
        return;
    }

    addTopCMCCryptoCurrencyData(await response.json());
}

function createPieChart(ctxPie) {
    // Создание круговой диаграммы
    new Chart(ctxPie, {
        type: 'pie',
        data: {
            labels: ['BTC', 'ETH', 'SOL', 'TON', 'Other'],
            datasets: [{
                data: [35.5, 27.2, 20.1, 14.2, 3],
                backgroundColor: ['#D4B95A', '#69AE6C', '#3599C4', '#BC6BE2', '#EF9C4F'],
                borderWidth: 0  // Убираем границы
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            interaction: {
                mode: 'none'
            }
        }
    });
}

function createLineChart(ctxLine) {
    // Создание линейного графика в стиле торговых бирж
    new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            datasets: [{
                label: 'Price',
                data: [38200, 38485.32, 38220.12, 38889, 38600.3, 38750, 38620, 38880, 39100, 38890, 38640, 38821, 38807, 38913, 39253, 39159, 39326, 39560, 39787, 39572, 39900, 39750, 39599.63],
                borderColor: '#4caf50',
                tension: 0.5,
                pointRadius: 0,
                pointHoverRadius: 0
            }]
        },
        options: {
            maintainAspectRatio: false, // Отключение сохранения соотношения сторон
            responsive: true,
            scales: {
                x: {
                    display: false,  // Отключить подписи и сетки по оси X
                    grid: {
                        display: false
                    },
                    ticks: {
                        display: false
                    }
                },
                y: {
                    display: false,  // Отключить подписи и сетки по оси Y
                    position: 'right',
                    grid: {
                        display: false
                    },
                    ticks: {
                        display: false,
                        beginAtZero: true
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            },
            interaction: {
                mode: 'nearest',
                intersect: false,
                axis: 'x'
            },
            elements: {
                line: {
                    borderWidth: 5
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // prevent using phone
    // MAKE PHONE STYLES (TIME>)
    if (screen.width <= 700) {
        document.location = "meetingPagePhone.html";
    }

    window.onload = function() {
        window.scrollTo(0, 0);
    };

    let responsePromise = fetchData();

    const ctxPie = document.getElementById('myPieChart').getContext('2d');
    const ctxLine = document.getElementById('myLineChart').getContext('2d');

    createPieChart(ctxPie);
    createLineChart(ctxLine);
});
