import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const API = axios.create({
    baseURL: apiBaseUrl,
});

// This helps send the JWT token automatically
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// Doctor Endpoints
export const fetchDoctors = () => API.get('/doctors');

// Auth Endpoints
export const loginUser = (credentials) => API.post('/auth/login', credentials);
export const registerUser = (userData) => API.post('/auth/register', userData);

// Appointment Endpoints
export const bookAppointment = (appointmentData) => API.post('/appointments', appointmentData);

// --- ADD THESE TWO NEW LINES ---
export const fetchDoctorAppointments = (id) => API.get(`/appointments/doctor/${id}`);
export const fetchPatientAppointments = (id) => API.get(`/appointments/patient/${id}`);

export default API;
