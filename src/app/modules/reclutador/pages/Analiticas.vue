<script>
import Chart from 'primevue/chart';
import { getAllPublications } from '../services/Publication.service.js';

export default {
  name: 'Analiticas',
  components: { Chart },
  data() {
    return {
      chartData1: {
        labels: [],
        datasets: [
          {
            label: 'Aplicaciones simuladas',
            backgroundColor: ['#c4e4af', '#d7f0cb', '#b0eaa0', '#a0d08f', '#99d199'],
            data: []
          }
        ]
      },
      chartData2: {
        labels: [],
        datasets: [
          {
            label: 'Visualizaciones simuladas',
            backgroundColor: ['#6a93b3', '#296597', '#6996bd', '#226397', '#5d7fa3'],
            data: []
          }
        ]
      },
      chartOptions: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    };
  },
  methods: {
    async cargarAnaliticas() {
      try {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        if (!currentUser || currentUser.role !== 1) {
          console.warn("❌ Usuario inválido o sin rol correcto.");
          return;
        }

        const response = await getAllPublications(currentUser.id);
        const misPublicaciones = response.data;

        const titles = misPublicaciones.map(p => p.title);
        const simulatedApps = misPublicaciones.map(() => Math.floor(Math.random() * 20) + 1);
        const simulatedViews = misPublicaciones.map(() => Math.floor(Math.random() * 150) + 50);

        this.chartData1 = {
          ...this.chartData1,
          labels: titles,
          datasets: [{ ...this.chartData1.datasets[0], data: simulatedApps }]
        };

        this.chartData2 = {
          ...this.chartData2,
          labels: titles,
          datasets: [{ ...this.chartData2.datasets[0], data: simulatedViews }]
        };

      } catch (error) {
        console.error("❌ Error al cargar analíticas:", error);
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
      <h3 class="chart-title">{{ $t("aplicaciones_por_publicacion") }}</h3>
      <Chart type="bar" :data="chartData1" :options="chartOptions" />
    </div>

    <div class="chart-box">
      <h3 class="chart-title blue">{{ $t("visualizaciones_por_publicacion") }}</h3>
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
