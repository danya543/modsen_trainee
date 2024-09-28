import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Favorites } from '../components/Favorites/Favorites';
import { ArtPage } from '../Pages/ArtPage/ArtPage';
import { ErrorPage } from '../Pages/ErrorPage/ErrorPage';
import { MainLayout } from '../Pages/MainLayout/MainLayout';
import { MainPage } from '../Pages/MainPage/MainPage';


const routerSchema = createBrowserRouter([
    {
        Component: MainLayout,
        path: '/',
        children: [
            {
                index: true,
                element: <MainPage />
            },
            {
                path: 'favorites',
                element: <Favorites />
            },
            /*             {
                            path: '/searchResult/:query',
                            element: <SearchPage />
                        }, */
            {
                path: 'art/:id',
                element: <ArtPage />
            },
        ]
    },
    {
        path: '*',
        element: <ErrorPage />
    }
]);

export const AppRouter = () => <RouterProvider router={routerSchema} />;
