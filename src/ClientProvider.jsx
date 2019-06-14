import React from 'react';
import { createClient } from './client';

export const ClientContext = React.createContext(createClient());

export default ClientContext.Provider;
