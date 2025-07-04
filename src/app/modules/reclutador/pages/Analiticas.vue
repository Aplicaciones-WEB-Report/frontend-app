<script>
import Chart from 'primevue/chart';
import { getJobOffersData } from '../services/JobOffers.service'; // <- Correcto

export default {
  name: 'Analiticas',
  components: { Chart },
  data() {
    return {
      chartData1: {
        labels: [],
        datasets: [
          {
            label: 'Aplicaciones',
            backgroundColor: ['#c4e4af', '#d7f0cb', '#b0eaa0', '#a0d08f', '#99d199'],
            data: []
          }
        ]
      },
      chartData2: {
        labels: [],
        datasets: [
          {
            label: 'Visualizaciones',
            backgroundColor: ['#6a93b3', '#296597', '#6996bd', '#226397', '#5d7fa3'],
            data: []
          }
        ]
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    };
  },
  methods: {
    async cargarAnaliticas() {
      try {
        const response = await getJobOffersData(); // <- Usa el nombre correcto
        const analytics = response.data;

        const titles = analytics.map(item => item.title);
        const apps = analytics.map(item => item.applications);
        const views = analytics.map(item => item.views);

        this.chartData1.labels = titles;
        this.chartData1.datasets[0].data = apps;

        this.chartData2.labels = titles;
        this.chartData2.datasets[0].data = views;
      } catch (error) {
        console.error("Error al cargar analíticas:", error);
      }
    }
  },
  mounted() {
    this.cargarAnaliticas();
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
