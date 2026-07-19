import axios from 'axios';

export async function getLocationFromIP(ip) {
    try {
        const localIPs = ['127.0.0.1', '::1', 'localhost'];
        if (localIPs.includes(ip)) {
            return {
                country: 'India',
                city: 'Islampur',
                state: 'Bihar'
            };
        }

        const token = process.env.IPINFO_TOKEN;
        const url = `https://ipinfo.io/${ip}?token=${token}`;
        const response = await axios.get(url);

        const { country, city, region } = response.data;
        return {
            country,
            city,
            state: region
        };
    } catch (error) {
        console.error('Error fetching IP location:', error.message);
        return null;
    }
}
