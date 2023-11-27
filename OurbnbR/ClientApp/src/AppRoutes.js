import { Details } from "./components/rental/Details";
import { Home } from "./components/Home";
import { Orders } from "./components/order/Orders";
import { Rental, getRentals } from "./components/rental/Rental";
import { CreateRental, rentalCreateAction } from "./components/rental/Create";
import Update from "./components/rental/Update";
import { Delete } from "./components/rental/Delete";
import { NewOrder } from "./components/order/newOrder";
import UpdateOrder from "./components/order/UpdateOrder";
import { DeleteOrder } from "./components/order/DeleteOrder";

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
        path: '/orders/create/:id',
        element: <NewOrder />,
    },
    {
        path: '/orders/update/:id',
        element: <UpdateOrder />
    },
    {
        path: '/orders/delete/:id',
        element: <DeleteOrder />
    },
    {
        path: '/rental',
        element: <Rental />,
        loader: getRentals
    },
    {
        path: '/rental/create',
        element: <CreateRental />,
        action: rentalCreateAction
    },
    {
        path: '/rental/details/:id',
        element: <Details />
    },
    {
        path: '/rental/update/:id',
        element: <Update />,

    },
    {
        path: '/rental/delete/:id',
        element: <Delete />
    }
];

export default AppRoutes;
