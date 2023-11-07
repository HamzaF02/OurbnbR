import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
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
    path: '/fetch-data',
    element: <FetchData />
  }, {
    path: '/rental',
    element: <Rental />
  }
];

export default AppRoutes;
