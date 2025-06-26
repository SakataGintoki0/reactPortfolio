import React from 'react';
import { useAppStore } from '../../store/appStore';
import AppContainer from './AppContainer';

export default function AppList() {
  const appList = useAppStore((state) => state.openedApps);
  return (
    <div className='h-full w-full'>
      {appList.map((app) => (
        <React.Fragment key={app.name}>
          <AppContainer app={app}>
            <p>{app.name}</p>
          </AppContainer>
        </React.Fragment>
      ))}
    </div>
  );
}
