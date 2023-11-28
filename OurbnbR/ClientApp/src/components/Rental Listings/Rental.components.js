const RentalsComponent = () => {
    const history = useHistory();
    const [rentals, setRentals] = useState([]);
    const [filteredRentals, setFilteredRentals] = useState([]);
    const [displayImage, setDisplayImage] = useState(true);
    const [listFilter, setListFilter] = useState('');

    useEffect(() => {
        getRentals();
        console.log('RentalsComponent created');
    }, []);

    const getRentals = async () => {
        const fetchedRentals = await useRentalApi().getRentals();
        console.log('All', JSON.stringify(fetchedRentals));
        setRentals(fetchedRentals);
        setFilteredRentals(fetchedRentals);
    };

    const performRentalFilter = (filterBy) => {
        filterBy = filterBy.toLowerCase();
        return rentals.filter(rental => rental.Name.toLowerCase().includes(filterBy));
    };

    const handleFilterChange = (value) => {
        console.log('In setter:', value);
        setListFilter(value);
        setFilteredRentals(performRentalFilter(value));
    };

    const toggleImage = () => {
        setDisplayImage(!displayImage);
    };

    const navigateToRentalForm = () => {
        history.push('/rentalform');
    };

    return (RentalsComponent);
};

export default RentalsComponent;
