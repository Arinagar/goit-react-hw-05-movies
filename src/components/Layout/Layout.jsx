import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PuffLoader } from 'react-spinners';
import css from './Layout.module.css';

const Layout = () => {
  return (
    <>
      <header className={css.header}>
        <div>
          <nav>
            <ul className={css.link_list}>
              <li>
                <NavLink to="/" className={css.navLink}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/movies" className={css.navLink}>
                  Movies
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className={css.main}>
        <Suspense fallback={<PuffLoader color="#36d7b7" size={200} />}>
          <Outlet />
        </Suspense>
      </main>
      <ToastContainer />
    </>
  );
};

export default Layout;
