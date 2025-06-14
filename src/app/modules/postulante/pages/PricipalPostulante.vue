<script>
import Card from "primevue/card";
import Chart from "primevue/chart";

export default {
  name: "PanelPricipal",
  components: { Card, Chart },
  data() {
    return {
      publicaciones: [
        { titulo: "Postulación 1", solicitudes: 3 },
        { titulo: "Postulación 2", solicitudes: 7 },
        { titulo: "Postulación 3", solicitudes: 8 },
      ],
      mensajes: [
        {
          titulo: "Publicación 1",
          contenido: "Hola postulante, has sido aceptado en el puesto de trabajo, Felicidades.",
          estado: "aceptado"
        },
        {
          titulo: "Publicación 2",
          contenido: "El proceso de reclutamiento demorara más de lo esperado. Sigue esperando respuesta por favor.",
          estado: "proceso"
        }
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
}
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
            <p class="subtitle">Título</p>
            <span class="titulo">{{ pub.titulo }}</span>
          </template>
          <template #footer>
            <p class="subtitle">N° Solicitudes</p>
            <p class="count">{{ pub.solicitudes }} Aplicaciones</p>
          </template>
        </Card>
      </div>
    </div>

    <div class="header mt-5" style="margin-top: 30px;">
      <h2>Bandeja de Entrada</h2>
    </div>
    <div class="grid">
      <div v-for="(msg, index) in mensajes" :key="index" class="col-12 md:col-6 lg:col-6">
        <Card class="card-mensaje">
          <template #title>
            <span class="titulo-mensaje">{{ msg.titulo }}</span>
            <span :class="['estado-badge', msg.estado]">
              {{ msg.estado === 'aceptado' ? 'Aceptado' : 'En Proceso' }}
            </span>
          </template>
          <template #content>
            <p class="contenido-mensaje">{{ msg.contenido }}</p>
          </template>
        </Card>
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
.header h2 {
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
  margin: 10px;
  color: #6b7280;
}
.count {
  background-color: white;
  font-size: 22px;
  border-radius: 10px;
  padding: 10px;
  color: #333;
}

/* Estilos para la bandeja de entrada */
.card-mensaje {
  background-color: #f0f7ff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  padding: 15px;
  margin-bottom: 20px;
}
.titulo-mensaje {
  font-weight: 600;
  font-size: 16px;
  color: #011a2d;
  display: block;
  margin-bottom: 10px;
}
.contenido-mensaje {
  color: #333;
  font-size: 14px;
  line-height: 1.5;
}
.estado-badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  float: right;
}
.estado-badge.aceptado {
  background-color: #68c25c;
}
.estado-badge.proceso {
  background-color: #ffb74d;
}

/* Responsividad */
@media screen and (max-width: 768px) {
  .cards {
    flex-direction: column;
  }
  .card {
    margin-bottom: 15px;
  }
}
@media screen and (max-width: 768px) {
  .card {
    margin-bottom: 15px;
  }
}
@media screen and (max-width: 768px) {
  .header h2 {
    font-size: 1rem; /* Tamaño más pequeño en móviles */
    padding: 0 10px; /* Menos padding en móviles */
    white-space: nowrap; /* Evita que el texto se divida en dos líneas */
    overflow: hidden;
    text-overflow: ellipsis; /* Añade puntos suspensivos si el texto es muy largo */
  }

  .header {
    height: auto; /* Altura automática para móviles */
    padding: 10px 5px; /* Padding reducido en móviles */
  }

  .cards {
    flex-direction: column;
  }

  .card {
    margin-bottom: 15px;
  }
}

@media screen and (min-width: 769px) and (max-width: 1024px) {
  .header h2 {
    font-size: 1.1rem; /* Tamaño intermedio para tablets */
  }
}
</style>