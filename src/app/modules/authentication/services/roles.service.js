import axios from 'axios';
import router from '../../../routers/router.js';

const API_URL = 'http://localhost:5195/api';

const roleMapping = {
    postulante: 'candidate',
    reclutador: 'employer'
};

/**
 * REGISTRO: Crea un nuevo usuario con su nombre directamente en la tabla 'User'.
 */
export async function register(userData) {
    const selectedRole = localStorage.getItem('selectedRole');
    if (!selectedRole) {
        throw new Error('No se ha seleccionado un rol.');
    }

    const newUserPayload = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: selectedRole === 'reclutador' ? 1 : 0, // Backend acepta role como número
        description: ""
    };

    const { data: newUser } = await axios.post(`${API_URL}/User`, newUserPayload);
    return newUser;
}

/**
 * LOGIN: Valida credenciales, guarda el token y redirige según el rol.
 */
export async function login(credentials) {
    const { data } = await axios.post(`${API_URL}/User/login`, credentials);
    const { token } = data;

    // Guardar el token
    localStorage.setItem('token', token);

    // Obtener los datos del usuario con el token
    const { data: user } = await axios.get(`${API_URL}/User/me`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    localStorage.setItem('user', JSON.stringify(user));

    const redirectPath = user.role === 1 ? '/reclutador' : '/postulante';
    router.push(redirectPath);
    return user;

}

/**
 * ACTUALIZAR PERFIL: Actualiza los datos del usuario.
 */
export async function updateUserProfile(updatedUserData) {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!user || !token) {
        throw new Error("Usuario no autenticado.");
    }

    const { data: updatedProfile } = await axios.put(
        `${API_URL}/User/${user.id}`,
        updatedUserData,
        { headers: { Authorization: `Bearer ${token}` } }
    );

    localStorage.setItem('user', JSON.stringify(updatedProfile));
    return updatedProfile;
}

/**
 * LOGOUT: Limpia sesión y redirige al selector de rol.
 */
export function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('selectedRole');
    router.push('/select-role');
}

/**
 * SELECCIONAR ROL: Guarda el rol y redirige a registro.
 */
export function selectRole(role) {
    localStorage.setItem('selectedRole', role);
    router.push('/register');
}