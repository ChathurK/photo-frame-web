class DatabaseService {
  constructor() {
    this.apiBaseUrl = 'http://localhost:3001/api';
    this.isClient = typeof window !== 'undefined';
  }

  // Save order to MySQL database via API
  async saveOrder(orderData) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categoryId: orderData.categoryId,
          designSampleId: orderData.designSampleId,
          frameTypeId: orderData.frameTypeId,
          sizeId: orderData.sizeId,
          frameColorId: orderData.frameColorId,
          numberOfPersons: orderData.numberOfPersons,
          customerName: orderData.customerName,
          customerAddress: orderData.customerAddress,
          customerWhatsapp: orderData.customerWhatsapp,
          deliveryTo: orderData.deliveryTo,
          deliveryDate: orderData.deliveryDate,
          backgroundColor: orderData.backgroundColor,
          imageUrl: orderData.imageUrl,
          notes: orderData.notes
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save order');
      }

      const result = await response.json();
      return {
        success: result.success,
        message: result.message,
        data: result.data
      };
    } catch (error) {
      console.error('Error saving order:', error);
      
      // Fallback to localStorage if API is not available
      if (this.isClient) {
        console.warn('API not available, falling back to localStorage');
        return await this.saveOrderToLocalStorage(orderData);
      }
      
      throw error;
    }
  }

  // Fallback method: save to localStorage if API is not available
  async saveOrderToLocalStorage(orderData) {
    const orderId = 'ORD' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
    
    const order = {
      id: orderId,
      ...orderData,
      createdAt: new Date().toISOString(),
      status: 'PENDING'
    };

    if (typeof window !== 'undefined') {
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      existingOrders.push(order);
      localStorage.setItem('orders', JSON.stringify(existingOrders));
    }

    return {
      id: orderId,
      success: true,
      message: 'Order saved locally (API not available)'
    };
  }

  async getOrders() {
    try {
      const response = await fetch(`${this.apiBaseUrl}/orders`);
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      
      // Fallback to localStorage
      if (this.isClient) {
        console.warn('API not available, falling back to localStorage');
        return JSON.parse(localStorage.getItem('orders') || '[]');
      }
      
      throw error;
    }
  }

  async getOrdersFromDatabase() {
    // In a real implementation, this would execute SQL:
    // const sql = 'SELECT * FROM orders ORDER BY created_at DESC';
    
    // For now, get from localStorage
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('orders') || '[]');
    }
    return [];
  }

  async getOrderById(orderId) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/orders/${orderId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch order');
      }
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      
      // Fallback to localStorage
      if (this.isClient) {
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        return orders.find(order => order.id === orderId);
      }
      
      throw error;
    }
  }

  async getOrderByIdFromDatabase(orderId) {
    // In a real implementation, this would execute SQL:
    // const sql = 'SELECT * FROM orders WHERE id = ?';
    
    // For now, get from localStorage
    if (typeof window !== 'undefined') {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      return orders.find(order => order.id === orderId);
    }
    return null;
  }

  async updateOrderStatus(orderId, status) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update order');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating order status:', error);
      
      // Fallback to localStorage
      if (this.isClient) {
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const orderIndex = orders.findIndex(order => order.id === orderId);
        
        if (orderIndex !== -1) {
          orders[orderIndex].status = status;
          orders[orderIndex].updatedAt = new Date().toISOString();
          localStorage.setItem('orders', JSON.stringify(orders));
          return { success: true, message: 'Status updated locally' };
        }
      }
      
      throw error;
    }
  }

  async updateOrderStatusInDatabase(orderId, status) {
    // In a real implementation, this would execute SQL:
    // const sql = 'UPDATE orders SET status = ?, updated_at = ? WHERE id = ?';
    
    // For now, update in localStorage
    if (typeof window !== 'undefined') {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const orderIndex = orders.findIndex(order => order.id === orderId);
      
      if (orderIndex !== -1) {
        orders[orderIndex].status = status;
        orders[orderIndex].updatedAt = new Date().toISOString();
        localStorage.setItem('orders', JSON.stringify(orders));
        return orders[orderIndex];
      }
    }
    return null;
  }
}

export const databaseService = new DatabaseService();