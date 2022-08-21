import { Suspense, lazy, ElementType } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
import Layout from 'src/layout';
import Loading from '../components/Loading';



const Loadable = (Component: ElementType) => (props: any) => {

    return (
        <Suspense fallback={<Loading />}>
            <Component {...props} />
        </Suspense>
    );
};

// pages 
const Login = Loadable(lazy(() => import('src/pages/login')))
const Home = Loadable(lazy(() => import('src/pages/home')))
const Category = Loadable(lazy(() => import('src/pages/categories')))
const CategoryDetails = Loadable(lazy(() => import('src/pages/categoryDetails')))
const Notfound = Loadable(lazy(() => import('src/pages/NotFound')))



export default function Router() {

    return useRoutes([
        { path: '/login', element: <Login /> },
        {
            path: '/',
            element: <Layout />,
            children: [
                { path: '/', element: <Navigate to='/category' replace /> },
                { path: '/category', element: <Category /> },
                { path: '/category/:id', element: <CategoryDetails /> }
            ]
        },
        { path: '*', element: <Notfound /> }
    ])
}