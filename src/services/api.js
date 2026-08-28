// const API_BASE_URL = 'https://localhost/gastronova-backend/api';
const API_BASE_URL = 'https://admin-gastronova.webhostdevs.com/api';

class ApiService {
    async handleApiCall(url, options = {}) {
        try {
            const response = await fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    ...options.headers
                },
                ...options
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const rawText = await response.text();
            
            // Check if response is empty
            if (!rawText || rawText.trim() === '') {
                throw new Error('Server returned empty response');
            }
            
            // Check if response looks truncated (incomplete JSON)
            const trimmedText = rawText.trim();
            if (!trimmedText.endsWith('}') && !trimmedText.endsWith(']')) {
                console.error('Response appears truncated:', trimmedText.substring(0, 200) + '...');
                throw new Error('Server returned truncated JSON response');
            }
            
            let data;
            try {
                data = JSON.parse(rawText);
            } catch (parseError) {
                console.error('JSON parse error for URL:', url);
                console.error('Raw response that failed to parse:', rawText.substring(0, 500));
                throw new Error(`Invalid JSON response: ${parseError.message}`);
            }
            
            if (!data.success) {
                throw new Error(data.message || 'Request failed');
            }
            
            return data.data;
        } catch (error) {
            console.error(`API call error for ${url}:`, error);
            throw error;
        }
    }

    async getFilterOptions() {
        return this.handleApiCall(`${API_BASE_URL}/jobs/get_filter_options.php`);
    }

    async getPositions() {
        return this.handleApiCall(`${API_BASE_URL}/jobs/get_positions.php`);
    }

    async getJobs(filters = {}, page = 1, limit = 10) {
        const params = new URLSearchParams();
        
        if (filters.location && filters.location !== 'All') {
            params.append('location', filters.location);
        }
        if (filters.department && filters.department !== 'All') {
            params.append('department', filters.department);
        }
        if (filters.experience && filters.experience !== 'All') {
            params.append('experience', filters.experience);
        }
        
        params.append('page', page.toString());
        params.append('limit', limit.toString());

        return this.handleApiCall(`${API_BASE_URL}/jobs/get_jobs.php?${params}`);
    }

    // In your api.js - update getMedications method
    async getMedications(filters = {}, page = 1, limit = 20) {
        const params = new URLSearchParams();
        
        if (filters.search) params.append('search', filters.search);
        if (filters.status) params.append('status', filters.status);
        if (filters.category) params.append('category', filters.category); // NEW: Add category filter
        params.append('page', page.toString());
        params.append('limit', limit.toString());

        return this.handleApiCall(`${API_BASE_URL}/medication/get_medications.php?${params}`);
    }

    async getMedication(identifier) {
        const isId = !isNaN(identifier);
        const param = isId ? `id=${identifier}` : `slug=${identifier}`;
        
        return this.handleApiCall(`${API_BASE_URL}/medication/get_medication.php?${param}`);
    }

    async submitApplication(formData) {
        const form = new FormData();
        form.append('name', formData.name);
        form.append('email', formData.email);
        form.append('phone', formData.phone);
        form.append('position', formData.position);
        
        if (formData.cv) {
            form.append('cv', formData.cv);
        }

        return this.handleApiCall(`${API_BASE_URL}/applications/submit.php`, {
            method: 'POST',
            body: form
        });
    }

    async subscribeNewsletter(email) {
        return this.handleApiCall(`${API_BASE_URL}/newsletter/subscribe.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
    }

    async submitProductQuery(queryData) {
        return this.handleApiCall(`${API_BASE_URL}/product-query/submit.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: queryData.name,
                email: queryData.email,
                phone: queryData.phone,
                product_category: queryData.product,
                message: queryData.message
            })
        });
    }
}

export default new ApiService();    