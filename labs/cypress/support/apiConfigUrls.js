import { getAppConfig } from './utils';
import { bffUrls } from './bff-urls/bffUrls';

const tags = Cypress.env('TAGS');
let storeNumber = tags === '@BFF' ? 6335 : 6408;

const reg = Cypress.env('SCO_REG');
const bffApiUrls = bffUrls(reg);

const { devicePlatform, ispHost } = getAppConfig();
//SCO - Genesis
export const STOREINFO_URL = `/omnia/self-checkout/services/fcgi-bin/apps/MGFService?action=StoreInfo`;
export const LOGIN_URL = `/nsco/bff-login/login`;
export const USERINFO_URL = `${ispHost}/services/userInfo`;
export const REGISTERINFO_URL = `${ispHost}/fcgi-bin/apps/MGFService?action=registerInfo&deviceName=reg62`;
export const REGISTER_START_URL = `/omnia/self-checkout/services/services/register?action=start&deviceName=reg62&controller=1`;
export const REGISTER_STOP_URL = `/omnia/self-checkout/services/services/register?action=stop*`;
export const REGISTER_STATUS_URL = `${ispHost}/services/register?action=status&deviceName=reg62&printerPlatform=1`;
export const REGISTER_LOGIN_JOURNAL_URL = `${ispHost}/services/register?action=loginJournal&deviceName=reg62`;
export const NEW_WORKFILE_URL = `/omnia/self-checkout/services/services/workfile?action=new&deviceName=reg62`;
export const ADDITEM_WORKFILE_URL = `/omnia/self-checkout/services/services/workfile?action=addItem*`;
export const EDITITEM_WORKFILE_URL = `/omnia/self-checkout/services/services/workfile?action=editItem*`;
export const EDITCART_WORKFILE_URL = `/omnia/self-checkout/services/services/workfile?action=editCart*`;
export const CANCEL_WORKFILE_URL = `/omnia/self-checkout/services/services/workfile?action=cancel*`;
export const RESET_WORKFILE_URL = `/omnia/self-checkout/services/services/register?action=reset*`;
export const GET_RESOURCE_BUNDLE_URL = `/omnia/self-checkout/services/fcgi-bin/apps/MGFService?action=GetResourceBundle*`;
export const PROCESS_WORKFILE_URL = `/omnia/self-checkout/services/services/workfile?action=process*`;
export const ADD_TENDER_TO_CART_CONTROLLER_URL = `/omnia/self-checkout/services/services/pos?action=addTenderToCartController*`;
export const CONTINUE_WORKFILE_URL = `/omnia/self-checkout/services/services/pos?action=continue*`;
export const SAVE_RTS_RESPONSE_AND_SIGNATURE_URL = `/omnia/self-checkout/services/services/pos?action=saveRTSResponseAndSignature*`;
export const SALE_COMPLETE_URL = `/omnia/self-checkout/services/services/pos?action=saleComplete*`;
export const CONTINUE_WORKFILE_REG_EXP =
  '/omnia/self-checkout/services/services/pos?action=continue';
export const SAVE_INVOICE_URL = `/omnia/self-checkout/services/services/pos?action=saveInvoice*`;
export const FORMAT_RECEIPT_TEMPLATE_URL = `/nsco/bff-login/formatReceiptTemplate`;
export const GENERATE_ASSOCIATE_QR_CODE_URL = `/nsco/bff-login/generateQrCode`;
export const POST_PROCESS_URL = `/omnia/self-checkout/services/services/workfile?action=postProcess*`;
export const TENDER_START_URL = `/omnia/self-checkout/services/services/pos?action=tenderStart*`;
export const CR_STASH_OPEN_URL = `/register/peripherals/cash-recycler//stash/open`;
export const CONTENTS_WORKFILE_URL = `/omnia/self-checkout/services/services/workfile?action=contents*`;
export const CANCEL_TENDER_URL = `/omnia/self-checkout/services/services/pos?action=cancelTender*`;
export const ITEM_LOOKUP_AUTOCOMPLETE = `/4s/redoc/item/v1/autoComplete?maxTerms=10&requestType=1&language=en&searchTerm=nut`;
export const ITEM_LOOKUP_PRODUCT_LIST = `/4s/redoc/item/v1/item-search?&requestType=3&searchTerms=nuts&offset=0&facets=4294546138&storeNumber=0595`;
export const CUSTOMER_LOOKUP_WORKFILE = `/omnia/self-checkout/services/services/customer?action=customerLookup*`;
export const VERIFIED_CUSTOMER_LOOKUP_WORKFILE = `/omnia/self-checkout/services/services/customer?action=customerLookup&fullResponse=1&workfile=FSTLAN0124230&milStatus=VERIFIED*`;
export const ADD_ASSOCIATEID_TO_WORKFILE_URL = `/omnia/self-checkout/services/services/pos?action=addAssociateIdToWorkfile*`;
export const LOGOUT_URL = `omnia/self-checkout/services/services/login?action=logout`;
export const PRO_WORKFILE = `/order/updates/pro/workfile`;
export const WARRANTY_URL = `omnia/self-checkout/services/services/pos?action=warranties*`;
export const PRINT_PREVIOUS_RECEIPT_URL = `omnia/self-checkout/services/services/pos?action=printPrevRcpt*`;
export const LOG_OFF_REPORT_URL = `omnia/self-checkout/services/services/register?action=logoffReport*`;

//Device Platform
export const DP_LANE_OPEN_URL = `${devicePlatform}/tachyon/v2/register/notify/lane/open`;
export const DP_LANE_CLOSE_URL = `${devicePlatform}/tachyon/v2/register/notify/lane/close`;
export const DP_LANE_ERROR_URL = `${devicePlatform}/tachyon/v2/register/notify/lane/error`;
export const DP_SIGNAL_URL = `${devicePlatform}/tachyon/v2/register/signal`;
export const DP_REGISTER_URL = `${devicePlatform}/tachyon/v2/register`;
export const DP_TRANSACTION_START_URL = `${devicePlatform}/tachyon/v2/register/notify/transaction/start`;
export const DP_TRANSACTION_END_URL = `${devicePlatform}/tachyon/v2/register/notify/transaction/end`;
export const DP_TRANSACTION_SUSPEND_URL = `${devicePlatform}/tachyon/v2/register/notify/transaction/suspend`;
export const DP_INTERVENTION_START_URL = `${devicePlatform}/tachyon/v2/register/notify/intervention/start`;
export const DP_INTERVENTION_END_URL = `${devicePlatform}/tachyon/v2/register/notify/intervention/end`;
export const DP_INTERVENTION_ERROR_URL = `${devicePlatform}/tachyon/v2/register/notify/intervention/error`;
export const DP_TRANSACTION_ABORT_URL = `${devicePlatform}/tachyon/v2/register/notify/transaction/abort`;
export const DP_PAYMENT_START_URL = `${devicePlatform}/tachyon/v2/register/notify/payment/start`;
export const DP_PAYMENT_END_URL = `${devicePlatform}/tachyon/v2/register/notify/payment/end`;
export const DP_PAYMENT_ERR_URL = `${devicePlatform}/tachyon/v2/register/notify/payment/error`;
export const DP_ACTIVATE_URL = `${devicePlatform}/tachyon/v2/register/payments/activate`;
export const DP_DEACTIVATE_URL = `${devicePlatform}/tachyon/v2/register/payments/deactivate`;
export const DP_SUSPEND_URL = `${devicePlatform}/tachyon/v2/register/payments/suspend`;
export const DP_APPROVE_URL = `${devicePlatform}/tachyon/v2/register/payments/approve`;
export const DP_PRINT_URL = `${devicePlatform}/tachyon/v2/register/peripherals/category/printer/print`;
export const DP_TENDER_RETURN = `${devicePlatform}/tachyon/v2/register/payments/tender-return`;
export const DP_TENDER_REMOVED = `${devicePlatform}/tachyon/v2/register/payments/tender-removed`;
export const LTR_FEEDBACK = `${devicePlatform}/tachyon/v2/register/notify/ltr`;
//Metrics
export const SCO_METRICS_DEV =
  'https://dkr1.6408.lowes.com/omnia/fluentd/omnia.selfcheckout.metrics.dev';
export const SCO_LOGS_STG = 'https://dkr1.6408.lowes.com/omnia/fluentd/omnia.selfcheckout.logs.stg';
export const ISP_BASE_URL = `https://apps.${storeNumber}.lowes.com`;
export const CARBON_URL = `https://carbon.${storeNumber}.lowes.com`;
export const DOCKER_URL = `https://dkr1.${storeNumber}.lowes.com`;

export const CARBON_APIS = {
  URLS: {
    ...bffApiUrls,
    REG_D_START: `${ISP_BASE_URL}${bffApiUrls.regDeamonStart}&controller=1`,
    REG_INFO: `${ISP_BASE_URL}${bffApiUrls.registerInfo}`,
    LOGIN_JOURNAL: `${ISP_BASE_URL}${bffApiUrls.loginJournal}`,
    REG_D_STATUS: `${ISP_BASE_URL}${bffApiUrls.regDeamonStatus}&printerPlatform=1`,
    STORE_INFO: `${CARBON_URL}${bffApiUrls.storeInfo}`,
    INVENTORY: `${ISP_BASE_URL}${bffApiUrls.inventoryLookup}loginId=undefined&ItemOrBarcode=12212`,
    LOG_OFF_REPORT: `${ISP_BASE_URL}${bffApiUrls.logOffReport}`,
    REGISTER_STOP: `${ISP_BASE_URL}${bffApiUrls.stop}`,
    LOGOUT: `${ISP_BASE_URL}${bffApiUrls.logout}`
  }
};
