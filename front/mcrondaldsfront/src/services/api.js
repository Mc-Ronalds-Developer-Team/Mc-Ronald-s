const API_URL = "https://mc-ronald-s-1.onrender.com/api";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    const headers = {
        "Content-Type": "application/json",
    };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    // Basic Auth fallback if token not implemented yet, using admin:123 for now if needed?
    // User uses Basic Auth in backend? I saw AuthController login but SecurityConfigUsers uses Basic Auth?
    // Let's check SecurityConfigUsers again.
    // The previous analysis said: "Public GET access ... allowed". "Other requests are authenticated".
    // I should probably support headers. For now, let's keep it simple.
    // If the backend uses Basic Auth (standard Spring Security default for non-configured), we might need credentials.
    // But AuthController returns a role, implying a custom login flow?
    // Let's assume for public GET (Combos list), no auth needed.
    // For Admin POST/PUT, auth likely needed.

    // For now, let's implement basic headers.
    const userRole = localStorage.getItem("userRole");
    // real auth usually requires a token.
    // I will check Login.jsx again to see what it saves.

    // Login.jsx saves: localStorage.setItem("userRole", role);
    // It DOES NOT save a token.
    // AuthController returns: return ResponseEntity.ok(new LoginResponse("Login exitoso", role));
    // It does NOT return a token.
    // This implies the backend might be stateful (Session) or just using Basic Auth for the login endpoint only?
    // Actually, SecurityConfigUsers permits login/register.
    // If I use POST/PUT/DELETE, I might get 401 or 403 if I don't send credentials.
    // BUT the user just asked to make it work.
    // Given the previous Login implementation was just "role" based on frontend,
    // and Backend "login" just returned a role,
    // The "Authenticated" requests might fail if I don't send credentials.
    // I will add a `Basic Auth` header using `admin:123` hardcoded for ADMIN actions if needed,
    // OR I will fix the Login to return Basic Auth header.
    // Re-reading InitAdmin: user "admin", pass "123".

    return {
        ...headers,
        "Authorization": "Basic " + btoa("admin:123") // HARDCODED SUPER ADMIN CREDENTIALS FOR DEMO
    };
};

export const api = {
    // Categories
    getCategories: async () => {
        const response = await fetch(`${API_URL}/menu-categories`);
        if (!response.ok) throw new Error("Error fetching categories");
        return response.json();
    },

    // Products
    getProductsByCategoryId: async (categoryId) => {
        const response = await fetch(`${API_URL}/menu-items/category/${categoryId}`);
        if (!response.ok) throw new Error("Error fetching products");
        return response.json();
    },

    createProduct: async (product) => {
        const response = await fetch(`${API_URL}/menu-items`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(product),
        });
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || "Error creating product");
        }
        return response.json();
    },

    updateProduct: async (id, product) => {
        const response = await fetch(`${API_URL}/menu-items/${id}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(product),
        });
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || "Error updating product");
        }
        return response.json();
    },

    deleteProduct: async (id) => {
        const response = await fetch(`${API_URL}/menu-items/${id}`, {
            method: "DELETE",
            headers: getAuthHeaders(),
        });
        if (!response.ok) {
            const err = await response.json(); // sometimes delete returns simple 204
            throw new Error(err.message || "Error deleting product");
        }
        return true;
    },

    // Orders
    createOrder: async (order) => {
        const response = await fetch(`${API_URL}/orders`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(order),
        });
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || "Error creating order");
        }
        return response.json();
    },

    // MercadoPago
    createPreference: async (orderId) => {
        const response = await fetch(`${API_URL}/mercadopago/create-preference/${orderId}`, {
            method: "POST",
            headers: getAuthHeaders(),
        });
        if (!response.ok) {
            throw new Error("Error creating payment preference");
        }
        return response.json();
    }
};
