interface IEnvVariables {
  isProd: boolean;
  isClient: boolean;
  HOST_DOMAIN: string;
  GA_MEASUREMENT_ID: string;
  WALLETCONNECT_PROJECT_ID: string;
  NETWORK_ID_DEFAULT: number;
  CONTRACT_ADDRESS: `0x${string}`;
  MODULE_NAME: string;
  TEST_MODE: boolean;
  VERSION: string;
  SPIN_API_URL: string;
  SPIN_API_PATH_PREFIX: string;
  APTOS_NODIT_KEY: string;
}

// build time
const config = {
  isProd: process.env.NODE_ENV === 'production',
  HostDomain: process.env.HOST_DOMAIN || 'localhost',
  GA_MEASUREMENT_ID: process.env['GA_MEASUREMENT_ID'] || '',
  WALLETCONNECT_PROJECT_ID:
    process.env['WALLETCONNECT_PROJECT_ID'] ||
    'e48c07417deaef23291533c3a0440f2b',
  NETWORK_ID_DEFAULT: process.env.NETWORK_ID_DEFAULT || 18,
  CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS || '',
  MODULE_NAME: process.env.MODULE_NAME || 'vortex',
  TEST_MODE: process.env.TEST_MODE === 'true',
  VERSION: process.env.VERSION || '0.0.0',
  SPIN_API_URL: process.env['SPIN_API_URL'] || 'http://192.168.31.120:8080',
  SPIN_API_PATH_PREFIX: process.env['SPIN_API_PATH_PREFIX'] || '/api',
  APTOS_NODIT_KEY: process.env['APTOS_NODIT_KEY'] || '',
};

const EnvVariables: IEnvVariables = {
  isProd: config.isProd,
  isClient: (() => typeof window !== 'undefined')(),
  HOST_DOMAIN: config.HostDomain,
  GA_MEASUREMENT_ID: config.GA_MEASUREMENT_ID,
  WALLETCONNECT_PROJECT_ID: config.WALLETCONNECT_PROJECT_ID,
  NETWORK_ID_DEFAULT: Number(config.NETWORK_ID_DEFAULT),
  CONTRACT_ADDRESS: config.CONTRACT_ADDRESS as `0x${string}`,
  MODULE_NAME: config.MODULE_NAME,
  TEST_MODE: config.TEST_MODE,
  VERSION: config.VERSION,
  SPIN_API_URL: config.SPIN_API_URL,
  SPIN_API_PATH_PREFIX: config.SPIN_API_PATH_PREFIX,
  APTOS_NODIT_KEY: config.APTOS_NODIT_KEY,
};

export default EnvVariables;
