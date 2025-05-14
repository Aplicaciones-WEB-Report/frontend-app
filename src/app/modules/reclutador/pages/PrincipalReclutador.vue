<script>
import Card from 'primevue/card';
import Chart from 'primevue/chart';

export default {
  name: "PrincipalReclutador",
  components: { Card, Chart },
  data() {
    return {
      publicaciones: [
        { titulo: "Publicación 1", solicitudes: 32 },
        { titulo: "Publicación 2", solicitudes: 15 },
        { titulo: "Publicación 3", solicitudes: 19 },
      ],
      chartData1: {
        labels: ['Publicación 1', 'Publicación 2', 'Publicación 3', 'Publicación 4'],
        datasets: [
          {
            label: 'Aplicaciones',
            backgroundColor: ['#b2e4b2', '#a2d4a2', '#91c291', '#80b180'],
            data: [32, 15, 10, 20]
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
  <div class="dashboard">
    <div class="header">
      <h2>Publicaciones Recientes</h2>
    </div>
    <div class="cards">
      <div v-for="(pub, index) in publicaciones" :key="index" class="card-container">
        <Card class="card">
          <template #title>
            <p class="subtitle">Titulo</p>
            <span class="titulo">{{ pub.titulo }}</span>
          </template>
          <template #footer>
            <p class="subtitle">N° Solicitudes</p>
            <p class="count">{{ pub.solicitudes }} Aplicaciones</p>
          </template>
        </Card>
      </div>
    </div>

    <div class="analiticas-section">
      <h2 class="analytics-title">Analíticas</h2>
      <div class="chart-box">
        <h3>Aplicaciones por Publicación</h3>
        <Chart type="bar" :data="chartData1" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>


<style scoped>
.dashboard {
  margin-bottom: 20px;
  font-size: 10px;
  font-family: 'Segoe UI', sans-serif;
  background-color: #f9fdf9;
}
.header {
  background-color: #285a84;
  color: white;
  height: 40px;
  padding: 12px 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}
.header h2{
  text-align: center;
  margin-top: -4px;
}
.cards {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}
.card {
  background-color: #f0f7ff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  padding: 20px;
  text-align: center;
}
.titulo {
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 18px;
  color: #011a2d;
}
.subtitle {
  margin:10px;
  color: #6b7280;
}
.count {
  background-color: white;
  font-size: 22px;
  border-radius: 10px;
  padding: 10px;
  color: #333;
}
.analiticas-section {
  margin-top: 40px;
}
.analytics-title {
  background-color: #68c25c;
  color: white;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: center;
}
.chart-box {
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
.chart-box h3 {
  margin-bottom: 15px;
  color: #388e3c;
  font-weight: 600;
}
  
</style>
