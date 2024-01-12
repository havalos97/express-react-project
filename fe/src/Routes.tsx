import { FC } from 'react';
import { BrowserRouter, Route, Routes as RouterRoutes } from 'react-router-dom';
import { AppPath } from './AppPath';

export const Routes: FC = () => {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route path={AppPath.HOME} element={<>Hello world</>} />
        <Route path={AppPath.NOT_FOUND} element={<>Not found :(</>} />
      </RouterRoutes>
    </BrowserRouter>
  );
}
