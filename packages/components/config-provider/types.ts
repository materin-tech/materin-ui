export interface ConfigContext {
  theme: 'dark' | 'light' | 'auto'
}

export const CONFIG_KEY: unique symbol = Symbol('MiConfigProvider')

export interface ConfigProviderProps {
  theme?: 'dark' | 'light' | 'auto'
}
