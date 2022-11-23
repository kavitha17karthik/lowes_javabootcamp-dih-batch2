export const getAppConfig = () => {
  const tags = Cypress.env('TAGS');
  let host = tags === '@BFF' ? 6335 : 6408;
  const reg = Cypress.env('SCO_REG');
  const localEnvFlag = Cypress.env('local_env');
  let enableE2E = Boolean(Cypress.env('ENABLE_E2E'));
  const regInt = parseInt(reg.replace('reg', ''));
  const eregHost = regInt - 32;
  const baseUrl = localEnvFlag
    ? `http://localhost:3000/omnia/self-checkout/`
    : `http://dkr1.${host}.lowes.com/omnia/self-checkout/`;
  const appUrl = `${baseUrl}\#${reg}?activeController=hybridController&enableLTR=true`;
  const emulatorContacts = `http://ereg${eregHost}.7929.lowes.com:8085/emu?action=setState&client=${host}&device=pinpad`;
  const apiHost = `https://dkr1.${host}.lowes.com`;
  const ispHost = `https://apps.${host}.lowes.com`;
  const devicePlatform = 'https://localhost:7189';
  const tachyonWebSocketApi = 'ws://localhost:8000';
  const tachyonWebSocketCMApi = 'wss://localhost:7189/tachyon/v1/till/messages/subscribe';
  const bffBaseUrl = localEnvFlag
    ? `http://localhost:3001/omnia/self-checkout/`
    : `http://dkr1.${host}.lowes.com`;
  const bffAppUrl = `${bffBaseUrl}\#${reg}?activeController=bffController&enableLTR=true`;

  return {
    host,
    reg,
    baseUrl,
    appUrl,
    emulatorContacts,
    enableE2E,
    apiHost,
    ispHost,
    devicePlatform,
    tachyonWebSocketApi,
    tachyonWebSocketCMApi,
    bffBaseUrl,
    bffAppUrl
  };
};

export const getDesiredUrls = () => {
  const { apiHost } = getAppConfig();
  const tenderUrl = `${apiHost}/omnia/self-checkout/services/services/pos`;
  const tenderProcessUrl = `${apiHost}/omnia/self-checkout/services/services/workfile`;
  const payNowProcessUrl = `${apiHost}/omnia/self-checkout/services/services/workfile?action=process`;
  const addItemUrl = `${apiHost}/omnia/self-checkout/services/services/workfile?action=addItem`;
  const changeQtyUrl = `${apiHost}/omnia/self-checkout/services/services/workfile?action=editItem&`;
  const regInfoUrl = `${apiHost}/omnia/self-checkout/services/fcgi-bin/apps/MGFService?action=registerInfo`;
  const storeInfoUrl = `${apiHost}/omnia/self-checkout/services/fcgi-bin/apps/MGFService?action=StoreInfo`;
  const orderApiUrl = 'https://dkr1.6482.lowes.com/order/updates/pro/workfile';

  return {
    tenderUrl,
    tenderProcessUrl,
    payNowProcessUrl,
    addItemUrl,
    changeQtyUrl,
    regInfoUrl,
    storeInfoUrl,
    orderApiUrl
  };
};

export const tachyonCRUrl = () => {
  const { devicePlatform } = getAppConfig();
  const activateUrl = `/tachyon/v1/till/payments/activate`;
  const tenderChangeUrl = `/tachyon/v1/till/payments/tender-change`;
  const deactivateUrl = `/tachyon/v1/till/payments/deactivate`;
  const unLockCollectionDoorUrl = '/tachyon/v2/register/peripherals/cash-recycler/**/stash/open';
  const cashRecyclerMaintenanceUrl = '/tachyon/v2/register/peripherals/**';
  const openBillExitCoverUrl =
    '/tachyon/v2/register/peripherals/cash-recycler/*/dispense-cover/open';
  const closeBillExitCoverUrl =
    '/tachyon/v2/register/peripherals/cash-recycler/*/dispense-cover/close';
  const replenishmentStartUrl =
    '/tachyon/v2/register/peripherals/cash-recycler/**/replenishment/activate';
  const replenishmentDoneUrl =
    '/tachyon/v2/register/peripherals/cash-recycler/**/replenishment/deactivate';
  const tillUrl = `${devicePlatform}/v1/till`;
  const surplusUrl = '/tachyon/v2/register/peripherals/cash-recycler/**/stash/surplus';
  const stashUrl = '/tachyon/v2/register/peripherals/cash-recycler/**/stash';
  return {
    activateUrl,
    tenderChangeUrl,
    deactivateUrl,
    tillUrl,
    unLockCollectionDoorUrl,
    cashRecyclerMaintenanceUrl,
    openBillExitCoverUrl,
    replenishmentStartUrl,
    replenishmentDoneUrl,
    surplusUrl,
    stashUrl,
    closeBillExitCoverUrl
  };
};

export const makeAsyncCall = (time = 2000) =>
  // return a promise that resolves after 1 second
  new Cypress.Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
