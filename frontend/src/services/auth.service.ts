import api from "@/lib/api";

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

const TOKEN_KEY = "token";
const TOKEN_MAX_AGE_SECONDS = 7 * 24 * 60 * 60;

function setAuthCookie(token: string) {
  document.cookie = `${TOKEN_KEY}=${encodeURIComponent(token)}; path=/; max-age=${TOKEN_MAX_AGE_SECONDS}; SameSite=Lax`;
}

function clearAuthCookie() {
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`;
}

export function storeToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
  setAuthCookie(token);
}

export async function register(data: RegisterData) {
  const response = await api.post("/auth/register", data);
  return response.data;
}

export async function login(data: LoginData) {
  const response = await api.post("/auth/login", data);

  if (response.data?.data?.token) {
    storeToken(response.data.data.token);
  }

  return response.data;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  clearAuthCookie();
}

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}
