const BASE_URL = "http://localhost:8081"; // your Spring Boot backend

// Helper to handle fetch errors
async function handleResponse(response: Response) {
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message || response.statusText);
  }
  return data;
}

// Register a new user
export async function registerUser(username: string, password: string) {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return handleResponse(response);
}

// Login user and return JWT token
export async function loginUser(username: string, password: string) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const token = await response.text(); // backend returns JWT as plain text
  if (!token) throw new Error("Login failed");
  return token;
}

// Fetch all tests (requires Authorization header)
export async function getTests(token: string) {
  const response = await fetch(`${BASE_URL}/api/tests`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(response);
}
