
       window.addEventListener("load", function() {
        getData()
        .then(function(data) {
            showData(data.data);
        })
        .catch(function(e) {
            console.log(e);
            window.alert("Sorry!. Something went wrong.");
        })
       })
 
       function showData(data) {
       
        document.getElementById("cases").textContent = data.local_new_cases;
        document.getElementById("acases").textContent = data.local_active_cases;
        document.getElementById("recovered").textContent = data.local_recovered;
        document.getElementById("deaths").textContent = data.local_deaths;
        document.getElementById("update").textContent = data.update_date_time;
 
        var labels = [];
        var counts = [];
 
        data.daily_pcr_testing_data.forEach(function(d) {
            labels.push(d.date);
            counts.push(d.count);
        });
 
        labels.reverse()
        counts.reverse()
 
        var chartPcr = document.getElementById("chartPcr").getContext("2d");
 
        var chart = new Chart(chartPcr, {
            type: "horizontalBar",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "No of PCR Tests",
                        data: counts,
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ]
                }
            }
        })
        
       }
 
       async function getData() {
           var response = await fetch("https://hpb.health.gov.lk/api/get-current-statistical");
           var data = response.json();
           return data;
       }
   