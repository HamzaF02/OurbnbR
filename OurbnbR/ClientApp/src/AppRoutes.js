import { Details } from "./components/Details";
import { Home } from "./components/Home";
import { Orders } from "./components/Orders";
import { Rental } from "./components/Rental";

const AppRoutes = [
  {
    index: true,
    element: <Home />
    },
    {
        path: '/orders',
        element: <Orders/>
    },
    
    {
        path: '/rental',
        element: <Rental />
    },
    {
        path: '/details/:id',
        element: <Details />
    }
];

export default AppRoutes;
