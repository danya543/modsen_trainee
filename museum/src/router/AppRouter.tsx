import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ArtPage } from '~/Pages/ArtPage/ArtPage';
import { ErrorPage } from '~/Pages/ErrorPage/ErrorPage';
import { FavoritesPage } from '~/Pages/FavoritesPage/FavoritesPage';
import { MainLayout } from '~/Pages/MainLayout/MainLayout';
import { MainPage } from '~/Pages/MainPage/MainPage';
import { SearchPage } from '~/Pages/SearchPage/SearchPage';


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
                element: <FavoritesPage />
            },
            {
                path: 'search-result/:query',
                element: <SearchPage />
            },
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
