<script>
import Card from "primevue/card";
import Chart from "primevue/chart";
import { getAllPublications } from '../services/Publication.service.js';
import { Publication } from "../model/Publication.entity.js";

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
            label: 'Aplicaciones simuladas',
            backgroundColor: ['#a8dadc', '#457b9d', '#1d3557', '#74c69d', '#e63946'],
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
  computed: {
    totalAplicaciones() {
      return this.chartData1.datasets[0].data.reduce((acc, val) => acc + val, 0);
    }
  },
  methods: {
    async cargarDatosDelPanel() {
      try {
        console.log("🟢 Ejecutando cargarDatosDelPanel()");

        const rawUser = localStorage.getItem('user');
        console.log("📦 Usuario crudo desde localStorage:", rawUser);

        const currentUser = JSON.parse(rawUser);
        console.log("👤 Usuario parseado:", currentUser);

        if (!currentUser || currentUser.role !== 1) return;



        const response = await getAllPublications(currentUser.id); // o sin ID para probar
        console.log(" Datos recibidos en el panel:", response.data);

        if (!response.data || response.data.length === 0) {
          console.warn("️ No se encontraron publicaciones.");
        }

        this.publicaciones = response.data.map(p => new Publication(p));

        const labels = this.publicaciones.map(pub => pub.title);
        const data = this.publicaciones.map(() => Math.floor(Math.random() * 15) + 1);

        this.chartData1 = {
          labels,
          datasets: [
            {
              ...this.chartData1.datasets[0],
              data
            }
          ]
        };
      } catch (error) {
        console.error(" Error al cargar publicaciones:", error);
      }
    }
  },
  mounted() {
    console.log("🔵 Componente PrincipalReclutador montado");
    this.cargarDatosDelPanel();
  }
};
</script>

<template>
  <div class="dashboard">
    <div class="header">
      <h2>{{ $t("publicaciones_recientes") }}</h2>
    </div>

    <div class="cards">
      <div v-for="(pub, index) in publicaciones" :key="index" class="card-container">
        <Card class="card">
          <template #title>
            <p class="subtitle"><i class="pi pi-briefcase icon"></i> {{ $t("columna_titulo") }}</p>
            <span class="titulo">{{ pub.title }}</span>
          </template>
          <template #footer>
            <p class="subtitle"><i class="pi pi-align-left icon"></i> {{ $t("columna_descripcion") }}</p>
            <p class="count">{{ pub.description }}</p>
          </template>
        </Card>
      </div>
    </div>

    <div class="analiticas-section">
      <h2 class="analytics-title">
        <i class="pi pi-chart-bar analytics-icon"></i> {{ $t("analiticas") }}
      </h2>
      <div class="chart-box">
        <h3><i class="pi pi-chart-line chart-icon"></i> {{ $t("aplicaciones_por_publicacion") }}</h3>

        <Chart
            v-if="chartData1.datasets[0].data.length"
            type="bar"
            :data="chartData1"
            :options="chartOptions"
        />
        <p v-else style="text-align: center; color: #888;">{{ $t("sin_datos_grafico") }}</p>

        <div class="total-box">
          <i class="pi pi-calculator total-icon"></i>
          {{ $t("total_aplicaciones") }}: <span class="total-number">{{ totalAplicaciones }}</span>
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
