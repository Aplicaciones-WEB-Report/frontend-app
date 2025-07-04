<script>
import Card from 'primevue/card';
import Chart from 'primevue/chart';
import { getJobOffersData } from '../services/JobOffers.service';

export default {
  name: "PrincipalReclutador",
  components: { Card, Chart },
  data() {
    return {
      publicaciones: [],
      chartData1: {
        labels: [],
        datasets: [
          {
            label: 'Aplicaciones',
            backgroundColor: ['#a8dadc', '#457b9d', '#1d3557', '#74c69d'],
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
  computed: {
    totalAplicaciones() {
      return this.publicaciones.reduce((acc, pub) => acc + pub.solicitudes, 0);
    }
  },
  methods: {
    async cargarPublicaciones() {
      try {
        const response = await getJobOffersData();
        const jobOffers = response.data;

        this.publicaciones = jobOffers.map(offer => ({
          titulo: offer.title,
          solicitudes: Number(offer.applications) || 0
        }));

       

        const labels = this.publicaciones.map(p => p.titulo);
        const data = this.publicaciones.map(p => p.solicitudes);

        // Debug
        console.log("Títulos:", labels);
        console.log("Solicitudes:", data);

        // Forzar reactividad del gráfico
        this.chartData1 = {
          labels,
          datasets: [
            {
              label: 'Aplicaciones',
              backgroundColor: ['#a8dadc', '#457b9d', '#1d3557', '#74c69d'],
              data
            }
          ]
        };
      } catch (error) {
        console.error("Error al cargar las publicaciones:", error);
      }
    }
  },
  mounted() {
    this.cargarPublicaciones();
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
            <p class="subtitle"><i class="pi pi-briefcase icon"></i> Título</p>
            <span class="titulo">{{ pub.titulo }}</span>
          </template>
          <template #footer>
            <p class="subtitle"><i class="pi pi-users icon"></i> N° Solicitudes</p>
            <p class="count">{{ pub.solicitudes }} Aplicaciones</p>
          </template>
        </Card>
      </div>
    </div>

    <div class="analiticas-section">
      <h2 class="analytics-title">
        <i class="pi pi-chart-bar analytics-icon"></i> Analíticas
      </h2>
      <div class="chart-box">
        <h3><i class="pi pi-chart-line chart-icon"></i> Aplicaciones por Publicación</h3>
        
        <Chart
          v-if="chartData1.datasets[0].data.length"
          type="bar"
          :data="chartData1"
          :options="chartOptions"
        />
        <p v-else style="text-align: center; color: #888;">No hay datos disponibles para mostrar el gráfico.</p>

        <div class="total-box">
          <i class="pi pi-calculator total-icon"></i>
          Total Aplicaciones: <span class="total-number">{{ totalAplicaciones }}</span>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.dashboard {
  padding: 20px;
  background-color: #f5f9f7;
  font-family: 'Segoe UI', sans-serif;
}

/* Header */
.header {
  background-color: #1d578c;
  color: #fff;
  padding: 16px 24px;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 30px;
}
.header h2 {
  margin: 0;
  font-size: 1.6rem;
  font-weight: 600;
}

/* Cards layout */
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-bottom: 40px;
}
.card-container {
  flex: 1 1 260px;
  max-width: 300px;
}
.card {
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 6px 12px rgba(0,0,0,0.08);
  padding: 20px;
  text-align: center;
  transition: transform 0.2s ease;
}
.card:hover {
  transform: translateY(-4px);
}
.titulo {
  display: block;
  background-color: rgba(5, 186, 162, 0.27);
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  color: #34495e;
}
.subtitle {
  margin: 10px 0 4px;
  color: #7f8c8d;
  font-size: 0.9rem;
}
.count {
  background-color: #ecf0f1;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 10px;
  border-radius: 8px;
  color: #2c3e50;
}

/* Analítica */
.analiticas-section {
  margin-top: 40px;
}
.analytics-title {
  background-color: #27ae60;
  color: white;
  padding: 12px;
  border-radius: 10px;
  text-align: center;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.analytics-icon {
  font-size: 1.4rem;
}

/* Gráfico */
.chart-box {
  background-color: white;
  padding: 24px;
  border-radius: 14px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.06);
  max-width: 800px;
  margin: 0 auto;
}
.chart-box h3 {
  margin-bottom: 20px;
  color: #2d6a4f;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
}

/* Total apps */
.total-box {
  margin-top: 25px;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1d3557;
  background-color: #eaf4f4;
  padding: 12px;
  border-radius: 10px;
}
.total-icon {
  margin-right: 8px;
  color: #1d3557;
}
.total-number {
  font-weight: bold;
  color: #0d3b66;
}

/* Responsive */
@media (max-width: 768px) {
  .cards {
    flex-direction: column;
    align-items: center;
  }
  .card-container {
    max-width: 100%;
  }
  .analytics-title {
    flex-direction: column;
    gap: 4px;
  }
}
</style>
