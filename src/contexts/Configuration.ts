/*
 * Current client configuration.
 */

import {
  createContext,
  useContext,
} from 'react';

import Environment from '../common/Environment';
import Configuration from '../interfaces/Configuration';

export function useConfiguration() {
  return useContext(ConfigurationContext);
}

// Typing is necessary for setting default value in App.tsx
// The default Configuration is implemented by Environment
export const ConfigurationContext =
  createContext<Configuration>(new Environment());
