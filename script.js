chartIt();


async function chartIt() {
    const data = await getData();
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.years,
            datasets: [
                {
                label: 'Global-mean temperature in C°',
                fill: false,
                data: data.temps,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'Northern Hemisphere-mean temperature in C°',
                fill: false,
                data: data.northern,
                borderColor: 'rgba(99, 132, 255, 1)',
                backgroundColor: 'rgba(99, 132, 255, 0.5)',
                borderWidth: 1
            },
            {
                label: 'Southern Hemisphere-mean temperature in C°',
                fill: false,
                data: data.southern,
                borderColor: 'rgba(99, 255, 132, 1)',
                backgroundColor: 'rgba(99, 255, 132, 0.5)',
                borderWidth: 1
            }
        ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        callback: function(value, index, values) {
                            return value + '°';
                        }
                    }
                }]
            }
        }
    });
}




async function getData() {
    const response = await fetch('ZonAnn.Ts+dSST.csv');
    const data = await response.text();
    const years = [];
    const temps = [];
    const northern = [];
    const southern = [];
    
    
    const table = data.split(/\n/).slice(1);
    table.forEach(row => {
        const column = row.split(',');
        years.push(column[0]);
        temps.push(parseFloat(column[1])+14);
        northern.push(parseFloat(column[2])+14);
        southern.push(parseFloat(column[3])+14);
    })
    return {years, temps, northern, southern}
}