import { FC } from 'react';
import { BrowserRouter, Route, Routes as RouterRoutes } from 'react-router-dom';
import { AppPath } from './AppPath';
import { MainComponent } from './components/MainComponent';
import { CommentsContextProvider } from './hooks/useComment';

export const Routes: FC = () => {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route path={AppPath.HOME} element={
          <CommentsContextProvider>
            <MainComponent />
          </CommentsContextProvider>
        } />
        <Route path={AppPath.NOT_FOUND} element={<>Not found :(</>} />
      </RouterRoutes>
    </BrowserRouter>
  );
};
