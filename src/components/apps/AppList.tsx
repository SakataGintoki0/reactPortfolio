import React from 'react';
import { useAppStore } from '../../store/appStore';
import AppContainer from './AppContainer';
import AppDisplay from './AppDisplay';

export default function AppList() {
  const appList = useAppStore((state) => state.openedApps);
  return (
    <div className='h-full w-full'>
      {appList.map((app) => (
        <React.Fragment key={app.name}>
          <AppContainer app={app}>
            <AppDisplay name={app.name} />
          </AppContainer>
        </React.Fragment>
      ))}
    </div>
  );
}
