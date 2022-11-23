import {
  DP_LANE_OPEN_URL,
  DP_LANE_CLOSE_URL,
  DP_LANE_ERROR_URL,
  DP_SIGNAL_URL,
  DP_REGISTER_URL,
  DP_TRANSACTION_START_URL,
  DP_TRANSACTION_END_URL,
  DP_TRANSACTION_SUSPEND_URL,
  DP_INTERVENTION_START_URL,
  DP_INTERVENTION_END_URL,
  DP_INTERVENTION_ERROR_URL,
  DP_TRANSACTION_ABORT_URL,
  DP_PAYMENT_START_URL,
  DP_PAYMENT_END_URL,
  DP_ACTIVATE_URL,
  DP_DEACTIVATE_URL,
  DP_SUSPEND_URL,
  DP_APPROVE_URL,
  DP_PRINT_URL,
  DP_TENDER_RETURN,
  DP_TENDER_REMOVED,
  LTR_FEEDBACK,
  ADD_TENDER_TO_CART_CONTROLLER_URL,
  CONTINUE_WORKFILE_URL,
  SAVE_RTS_RESPONSE_AND_SIGNATURE_URL,
  SALE_COMPLETE_URL
} from './apiConfigUrls';

import { tachyonCRUrl } from './utils';

// card Types
export const CARD_LBA = 'LBA';
export const CARD_LCC = 'LCC';
export const CARD_LAR = 'LAR';
export const CARD_GIFT = 'GC';
export const CARD_VISA = 'VISA';
export const CARD_MERCH = 'MERCH';

// tender Types
export const CASH_TENDER = 'Cash';
export const CARD_TENDER = 'Card';
export const CARDS_ONLY = 'Cards Only';
export const CASH_AND_CARDS = 'Cash and Cards';

// intervention message types
export const REMOVE_ITEM_INTERVENTION_MESSAGE =
  'Associate assistance is needed for a removed item.';
export const REDUCED_ITEM_INTERVENTION_MESSAGE =
  'Associate assistance is needed for a reduced item quantity.';
export const HARD_STOP_ITEM_INTERVENTION_MESSAGE = 'An associate will help you with your purchase.';
export const MERCH_CARD_LICENSE_INTERVENTION_MESSAGE = 'Please have your photo ID ready.';

// Peripherals banner message types
export const CASH_RECYCLER_ERROR_MESSAGE =
  'Unknown error has occurred with the cash recycler. Contact the IT Service Desk for assistance.';
export const CASH_RECYCLER_OFFLINE = 'CRNonOperational';

export const SOCKET_EVENTS = {
  TENDER_PAID: 'TENDER_PAID',
  DEPOSIT: 'DEPOSIT'
};

// following urls will be stubbed always even if end to end test are enable
export const FIXED_STUBBED_URLS = [
  ...Object.values(tachyonCRUrl()),
  DP_LANE_OPEN_URL,
  DP_LANE_CLOSE_URL,
  DP_LANE_ERROR_URL,
  DP_SIGNAL_URL,
  DP_REGISTER_URL,
  DP_TRANSACTION_START_URL,
  DP_TRANSACTION_END_URL,
  DP_TRANSACTION_SUSPEND_URL,
  DP_INTERVENTION_START_URL,
  DP_INTERVENTION_END_URL,
  DP_INTERVENTION_ERROR_URL,
  DP_TRANSACTION_ABORT_URL,
  DP_PAYMENT_START_URL,
  DP_PAYMENT_END_URL,
  DP_ACTIVATE_URL,
  DP_DEACTIVATE_URL,
  DP_SUSPEND_URL,
  DP_APPROVE_URL,
  DP_PRINT_URL,
  DP_TENDER_RETURN,
  DP_TENDER_REMOVED,
  LTR_FEEDBACK,
  ADD_TENDER_TO_CART_CONTROLLER_URL,
  CONTINUE_WORKFILE_URL,
  SAVE_RTS_RESPONSE_AND_SIGNATURE_URL,
  SALE_COMPLETE_URL
];

export const ABOVE_FOUR_DOLLARS_ITEM = 'highValueItem';

export const CASH_SHORTAGE = 'CashShortage';
export const WIRELESS_SCANNER = 'WirelessScanner';
export const SCAN_ITEM = 'scanItem';
export const PRICE_REQUIRED_ITEM = 'priceReqItem';
export const INVALID_MANAGER_PASSCODE = 'invalidPasscode';
export const VALID_MANAGER_PASSCODE = 'validPasscode';
export const KEYBOARD_NUMBER_ELEMENTS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export const KEYBOARD_ALPHABET_ELEMENTS = ['a', 't', 'e', 's', 't'];
export const CART_ID = '6960209587791152889';
