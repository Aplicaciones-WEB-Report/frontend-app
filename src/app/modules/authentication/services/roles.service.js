import router from "../../../routers/router.js"  // Ajusta la ruta según la estructura de tu proyecto

export function selectRole(role) {
    localStorage.setItem('selectedRole', role)
    router.push('/login')
}

export function login() {
    const selectedRole = localStorage.getItem('selectedRole')
    if (selectedRole === 'reclutador') {
        router.push('/reclutador')
    } else if (selectedRole === 'postulante') {
        router.push('/postulante')
    } else {
        router.push('/select-role')
    }
}

export function register() {
    const selectedRole = localStorage.getItem('selectedRole')
    if (selectedRole === 'reclutador') {
        router.push('/reclutador/dashboard')
    } else if (selectedRole === 'postulante') {
        router.push('/postulante/dashboard')
    } else {
        router.push('/select-role')
    }
}

export function logout() {
    localStorage.removeItem('selectedRole');
    localStorage.removeItem('userToken');
    router.push('/login');
}