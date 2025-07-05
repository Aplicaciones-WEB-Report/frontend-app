<script>
import Chart from 'primevue/chart';
// ¡Importante! Usaremos el servicio de publicaciones, no el de job_offers_summary que era para datos falsos
import { getAllPublications } from '../services/Publication.service.js';

export default {
  name: 'Analiticas',
  components: { Chart },
  data() {
    return {
      chartData1: {
        labels: [],
        datasets: [{ label: 'Aplicaciones', backgroundColor: ['#c4e4af', '#d7f0cb', '#b0eaa0', '#a0d08f', '#99d199'], data: [] }]
      },
      chartData2: { // Gráfico para visualizaciones (datos simulados por ahora)
        labels: [],
        datasets: [{ label: 'Visualizaciones', backgroundColor: ['#6a93b3', '#296597', '#6996bd', '#226397', '#5d7fa3'], data: [] }]
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
        if (!currentUser || currentUser.role !== 'employer') return;

        // 1. Obtener las publicaciones y postulaciones del reclutador
        const [publicationsResponse, applicationsResponse] = await getAllPublications(currentUser.id);
        const misOfertas = publicationsResponse.data;
        const todasLasPostulaciones = applicationsResponse.data;

        // 2. Mapear los datos para los gráficos
        const analyticsData = misOfertas.map(offer => {
          const applicationCount = todasLasPostulaciones.filter(app => app.job_offer_id === offer.id).length;
          return {
            title: offer.title,
            applications: applicationCount,
            // Las visualizaciones no están en tu db.json, así que las simulamos con un número aleatorio
            views: Math.floor(Math.random() * (200 - 50 + 1)) + 50
          };
        });

        const titles = analyticsData.map(item => item.title);
        const apps = analyticsData.map(item => item.applications);
        const views = analyticsData.map(item => item.views);

        // 3. Actualizar datos de los gráficos
        this.chartData1 = { ...this.chartData1, labels: titles, datasets: [{...this.chartData1.datasets[0], data: apps}] };
        this.chartData2 = { ...this.chartData2, labels: titles, datasets: [{...this.chartData2.datasets[0], data: views}] };

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
