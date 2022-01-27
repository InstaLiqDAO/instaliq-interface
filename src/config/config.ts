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
    ILSListingHubAddress: '0xeaD3075dc786d01e55e905e1e5CB069f37870e0a',
  },
  prod: {},
};
