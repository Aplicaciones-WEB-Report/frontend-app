<script>
import Chart from 'primevue/chart';

export default {
  name: 'Analiticas',
  components: { Chart },
  data() {
    return {
      chartData1: {
        labels: ['Publicación 1', 'Publicación 2', 'Publicación 3', 'Publicación 4'],
        datasets: [
          {
            label: 'Aplicaciones',
            backgroundColor: ['#c4e4af', '#d7f0cb', '#b0eaa0', '#a0d08f'],
            data: [32, 15, 18, 28]
          }
        ]
      },
      chartData2: {
        labels: ['Publicación 1', 'Publicación 2', 'Publicación 3', 'Publicación 4'],
        datasets: [
          {
            label: 'Visualizaciones',
            backgroundColor: ['#6a93b3', '#296597', '#6996bd', '#226397'],
            data: [55, 30, 45, 35]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };
  }
};
</script>

<template>
  <div class="analiticas">

    <div class="chart-box">
      <h3 class="chart-title">Aplicaciones por Publicación</h3>
      <Chart type="bar" :data="chartData1" :options="chartOptions" />
    </div>

    <div class="chart-box">
      <h3 class="chart-title blue">Visualizaciones por Publicación</h3>
      <Chart type="bar" :data="chartData2" :options="chartOptions" />
    </div>
  </div>
</template>


<style scoped>
.analiticas {
  margin-top:-30px;
  padding: 20px;
  font-family: 'Segoe UI', sans-serif;
}
.analiticas{
  background: linear-gradient(to right, #c3ec87, #85C872);
}
.chart-box {
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 25px;
}
.chart-title {
  color: #2e7d32;
  margin-bottom: 10px;
  font-size: 18px;
}
.chart-title.blue {
  color: #114477;
}
  
</style>
