const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api";

class ApiService {
  async get(endpoint) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("API GET Error:", error);
      throw error;
    }
  }

  async post(endpoint, data) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("API POST Error:", error);
      throw error;
    }
  }

  // Future methods for photo frame orders
  async submitOrder(orderData) {
    return this.post("/orders", orderData);
  }

  async getWorks() {
    return this.get("/works");
  }

  async getTestimonials() {
    return this.get("/testimonials");
  }

  // Get price for frame type and size combination
  async getPrice(frameTypeId, sizeId) {
    return this.get(`/prices/${frameTypeId}/${sizeId}`);
  }
}

export const apiService = new ApiService();
