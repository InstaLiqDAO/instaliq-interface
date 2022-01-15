type BaseConfig = {
  ILSListingHubAddress?: string;
};

type LocalConfig = BaseConfig;

type RopstenConfig = BaseConfig;

type ProdConfig = BaseConfig;

type AppConfig = {
  local: LocalConfig;
  ropsten: RopstenConfig;
  prod: ProdConfig;
};

export const appConfig: AppConfig = {
  local: {},
  ropsten: {
    ILSListingHubAddress: '0x162266815DA0Eed3888B6B143199911Aa0B76e9c',
  },
  prod: {},
};
