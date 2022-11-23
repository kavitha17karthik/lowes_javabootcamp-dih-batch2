export const bffUrls = (registerNumber) => {
  const bffController = {
    path: '',
    bffLogin: `/nsco/bff-login/login`,
    userInfo: `/services/userInfo`,
    bffLogout: `/services/login?action=logout`,
    generateQrCode: `/nsco/bff-login/generateQrCode`,
    generateBarCode: `services/barcode?action=generateBarcode&uid=`,
    formatReceiptTemplate: `/nsco/bff-login/formatReceiptTemplate`,
    refresh: `/services/login?action=refresh`,
    regDeamonStart: `/services/register?action=start&deviceName=${registerNumber}`,
    loginJournal: `/services/register?action=loginJournal&deviceName=${registerNumber}`,
    regDeamonStatus: `/services/register?action=status&deviceName=${registerNumber}`,
    registerInfo: `/fcgi-bin/apps/MGFService?action=registerInfo&deviceName=${registerNumber}`,
    logOffReport: `/services/register?action=logoffReport&deviceName=*`,
    reset: `/services/register?action=reset`,
    stop: `/services/register?action=stop&version=1&model=0&deviceName=*`,
    logout: `/services/login?action=logout`,
    /**
     * BFF SERVICES
     */
    itemDetails: `/4s/redoc/item/v1/item-detail`,
    myLowesLookUp: `/4s/redoc/customer-management/v1/customers?phoneNumber=`,
    storeInfo: `/4s/redoc/store/getStoreInfo`,
    rebates: '/4s/redoc/store/checkout/rebates/',
    newCart: `/4s/redoc/store/cart/new`,
    addItem: `/4s/redoc/store/cart/add`,
    getAvailability: '/4s/redoc/store/cart/getAvailability',
    viewCart: `/4s/redoc/store/cart/view/`,
    cancelCart: `/4s/redoc/store/cart/clearCart/`,
    updateLineItem: `/4s/redoc/store/cart/updateItem/`,
    reviewCardData: '/4s/redoc/store/cart/review/',
    initiateCheckout: `/4s/redoc/store/cart/checkout/`,
    updateLineItemPrice: `/4s/redoc/store/cart/updateItem/`,
    addPayment: `/4s/redoc/store/payment/addPayment/`,
    addAuthorization: `/4s/redoc/store/payment/add/authorization`,
    completeCheckout: `/4s/redoc/store/cart/complete/`,
    removePayment: `/4s/redoc/store/cart/removePayment/`,
    attachServices: `/4s/redoc/store/cart/attachServices/`,
    promoRerice: `/4s/redoc/store/cart/checkout/promo/reprice/`,
    printLastReceipt: '/4s/redoc/receipt/lastReceipt/reprint', //BFF print last receipt for US flow.
    reviewCart: '/4s/redoc/store/cart/',
    bagFee: `/4s/redoc/store/cart/checkout/bagfees/`,
    generateInvoice: `/4s/redoc/store/payment/generateInvoice/`,
    configurations: '/4s/redoc/store/configurations',
    saveCart: `/4s/redoc/store/cart/saveCart/`, //suspend sale for bff
    cancelAuthorization: `/4s/redoc/store/payment/cancel-authorization`,
    itemSearch: '/4s/redoc/item/v1/autoComplete?maxTerms=10&requestType=1&language=en&searchTerm=', //BFF item lookup for US flow.
    productSearch: '/4s/redoc/item/v1/item-search?&requestType=3&searchTerms=', //BFF product search for US flow.,
    inventoryLookup: `/fcgi-bin/apps/MGFService?action=InventoryLookupLight&version=1&deviceName=${registerNumber}&entryMethod=0&loginId=`,
    addMilitaryCustomer: '/4s/redoc/store/cart/addCustomerToCart'
  };
  return bffController;
};
