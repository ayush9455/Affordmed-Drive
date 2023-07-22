import axios from 'axios';

const AllTrainsPage = () => {

    const fetchAllTrains = async () => {
        try {
            const response = await axios.get('http://20.244.56.144:80/train/trains', {
                headers: {
                    Authorization: 'qxrwbC',
                },
            });
            const trainsData = response.data;
            // Process and manipulate the data as required
            // e.g., filter trains departing in the next 30 minutes, sort, etc.
            console.log(trainsData);
        } catch (error) {
            console.error('Error fetching all trains:', error);
        }
    };

    // Call the function to fetch all trains when the component mounts
    useEffect(() => {
        fetchAllTrains();
    }, []);
};

export default AllTrainsPage;
