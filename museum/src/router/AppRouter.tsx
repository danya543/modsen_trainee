import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ArtPage } from '~/pages/ArtPage/ArtPage';
import { ErrorPage } from '~/pages/ErrorPage/ErrorPage';
import { FavoritesPage } from '~/pages/FavoritesPage/FavoritesPage';
import { MainLayout } from '~/pages/MainLayout/MainLayout';
import { MainPage } from '~/pages/MainPage/MainPage';
import { SearchPage } from '~/pages/SearchPage/SearchPage';


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
