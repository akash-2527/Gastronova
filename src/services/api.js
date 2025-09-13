const API_BASE_URL = 'http://admin.gastronova.in/api';

class ApiService {

    async getFilterOptions() {
        try {
            const response = await fetch(`${API_BASE_URL}/jobs/get_filter_options.php`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Server returned non-JSON response');
            }
            
            const data = await response.json();
            
            if (!data.success) {
                throw new Error(data.message || 'Failed to fetch filter options');
            }
            
            return data.data; // Should return { locations: [], departments: [], experiences: [] }
        } catch (error) {
            console.error('Error fetching filter options:', error);
            throw error;
        }
    }

    async getPositions() {
        try {
            const response = await fetch(`${API_BASE_URL}/jobs/get_positions.php`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Server returned non-JSON response');
            }
            
            const data = await response.json();
            
            if (!data.success) {
                throw new Error(data.message || 'Failed to fetch positions');
            }
            
            return data.data; // Should return array of position names
        } catch (error) {
            console.error('Error fetching positions:', error);
            throw error;
        }
    }
  
    async getJobs(filters = {}, page = 1, limit = 10) {
        try {
            const params = new URLSearchParams();
            
            // Add filters
            if (filters.location && filters.location !== 'All') {
                params.append('location', filters.location);
            }
            if (filters.department && filters.department !== 'All') {
                params.append('department', filters.department);
            }
            if (filters.experience && filters.experience !== 'All') {
                params.append('experience', filters.experience);
            }
            
            // Add pagination
            params.append('page', page.toString());
            params.append('limit', limit.toString());

            const response = await fetch(`${API_BASE_URL}/jobs/get_jobs.php?${params}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Server returned non-JSON response');
            }

            const data = await response.json();
            
            if (!data.success) {
                throw new Error(data.message || 'Failed to fetch jobs');
            }
            
            return data.data;
        } 
        catch (error) {
            console.error('Error fetching jobs:', error);
            throw error;
        }
    }

    async submitApplication(formData) {
        try {
            const form = new FormData();
            form.append('name', formData.name);
            form.append('email', formData.email);
            form.append('phone', formData.phone);
            form.append('position', formData.position);
            
            if (formData.cv) {
                form.append('cv', formData.cv);
            }

            const response = await fetch(`${API_BASE_URL}/applications/submit.php`, {
                method: 'POST',
                body: form
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Server returned non-JSON response');
            }

            const data = await response.json();
            
            if (!data.success) {
                throw new Error(data.message || 'Failed to submit application');
            }
            
            return data;
        } catch (error) {
            console.error('Error submitting application:', error);
            throw error;
        }
    }

    async subscribeNewsletter(email) {
        try {
            const response = await fetch(`${API_BASE_URL}/newsletter/subscribe.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Server returned non-JSON response');
            }

            const data = await response.json();
            
            if (!data.success) {
                throw new Error(data.message || 'Failed to subscribe to newsletter');
            }
            
            return data;
        } catch (error) {
            console.error('Error subscribing to newsletter:', error);
            throw error;
        }
    }

    async submitProductQuery(queryData) {
        try {
            const response = await fetch(`${API_BASE_URL}/product-query/submit.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: queryData.name,
                    email: queryData.email,
                    phone: queryData.phone,
                    product_category: queryData.product,
                    message: queryData.message
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Server returned non-JSON response');
            }

            const data = await response.json();
            
            if (!data.success) {
                throw new Error(data.message || 'Failed to submit product query');
            }
            
            return data;
        } catch (error) {
            console.error('Error submitting product query:', error);
            throw error;
        }
    }
}

export default new ApiService();