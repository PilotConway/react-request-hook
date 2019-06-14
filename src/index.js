import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

import Typography from '@material-ui/core/Typography';
import Dashboard from './components/Dashboard';

import { createClient } from './client';
import ClientProvider from './ClientProvider';

function App() {
  const client = createClient('https://api.github.com');
  return (
    <div className="App">
      <Typography variant="h2">Testing RxJS API Calls</Typography>
      <ClientProvider value={client}>
        <Dashboard />
      </ClientProvider>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
