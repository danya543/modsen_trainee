import { Outlet } from 'react-router-dom'

import { Footer } from '~/components/Footer/Footer'
import { Header } from '~/components/Header/Header'

export const MainLayout = () => {
    return (
        <section>
            <Header />
            <Outlet />
            <Footer />
        </section>
    )
}
