import axios from 'axios';
import router from '../../../routers/router.js';

const API_URL = 'http://localhost:3000';

const roleMapping = {
    postulante: 'candidate',
    reclutador: 'employer'
};

/**
 * REGISTRO: Crea un nuevo usuario con su nombre directamente en la tabla 'users'.
 */
export async function register(userData) {
    const selectedRole = localStorage.getItem('selectedRole');
    if (!selectedRole) {
        throw new Error('No se ha seleccionado un rol.');
    }

    const { data: existingUsers } = await axios.get(`${API_URL}/users?email=${userData.email}`);
    if (existingUsers.length > 0) {
        throw new Error('El correo electrónico ya está registrado.');
    }

    const newUserPayload = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: roleMapping[selectedRole],
        description: "",
        created_at: new Date().toISOString()
    };

    const { data: newUser } = await axios.post(`${API_URL}/users`, newUserPayload);
    return newUser;
}

/**
 * LOGIN:Válida al usuario y guarda su objeto completo (con nombre) en localStorage.
 */
export async function login(credentials) {
    const { data: users } = await axios.get(`${API_URL}/users?email=${credentials.email}&password=${credentials.password}`);
    if (users.length === 0) {
        throw new Error('Email o contraseña incorrectos.');
    }
    const user = users[0];

    localStorage.setItem('user', JSON.stringify(user));

    const redirectPath = user.role === 'employer' ? '/reclutador' : '/postulante';
    router.push(redirectPath);
    return user;
}

/**
 * ACTUALIZAR PERFIL: Actualiza los datos del usuario en la tabla 'users'.
 */
export async function updateUserProfile(updatedUserData) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        throw new Error("Usuario no autenticado.");
    }
    const endpoint = `${API_URL}/users/${user.id}`;
    const { data: updatedProfile } = await axios.put(endpoint, updatedUserData);
    localStorage.setItem('user', JSON.stringify(updatedProfile));
    return updatedProfile;
}

/**
 * LOGOUT: Limpia la sesión y redirige directamente a la selección de rol.
 */
export function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('selectedRole');
    // --- ¡AQUÍ ESTÁ LA CORRECCIÓN! ---
    router.push('/select-role');
}

/**
 * SELECCIONAR ROL: Guarda el rol y redirige al registro.
 */
export function selectRole(role) {
    localStorage.setItem('selectedRole', role);
    router.push('/register');
}
