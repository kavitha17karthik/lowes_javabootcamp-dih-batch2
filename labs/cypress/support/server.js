import { Server, WebSocket } from 'mock-socket';
import { getAppConfig } from './utils';

const { tachyonWebSocketApi, tachyonWebSocketCMApi } = getAppConfig();
const sockets = {};

export function initServer(appType = '') {
  // useful to reset sockets when doing TDD and webpack refreshes the app
  for (const socket of Object.values(sockets)) {
    socket.close();
  }
  mockServer(appType);
}

function mockServer(appType) {
  // Of course, your frontend will have to connecto to localhost:4000, otherwise change this
  sockets.mockServer =
    appType === 'CASH_MANAGEMENT'
      ? new Server(tachyonWebSocketCMApi)
      : new Server(tachyonWebSocketApi);
  sockets.mockServer.on('connection', (socket) => {
    sockets.server = socket;
    socket.on('error', (error) => {
      console.log(error);
    });
    socket.on('message', (message) => {
      let data;
      try {
        data = JSON.parse(message);
      } catch (e) {
        data = message;
      }
      const { amount = '', event = '', cardData = '' } = data;
      let payload;
      switch (event) {
        case 'DEPOSIT': {
          payload = {
            id: '565029a2-68ca-11ea-bc55-0242ac130003',
            correlationId: 'd7d37bb8-6871-11ea-bc55-0242ac130003',
            timestamp: 2323423423,
            type: 'TENDER',
            status: 'DEPOSIT',
            info: {
              mode: 'CASH',
              amount: amount,
              currencyCode: 'USD'
            }
          };
          break;
        }
        case 'TENDER_PAID': {
          payload = {
            messageId: '0e725454-e097-4cbd-a49c-805559e4c196',
            messageName: 'TENDER_PAID',
            traceId: '9721cb69-8994-4ab2-9cc4-64cea3424b7d',
            timestamp: 1655905253990,
            source: 'PERIPHERAL',
            localId: 'GLORY-CI10-local-cash-recycler',
            vendor: 'GLORY',
            model: 'CI10',
            categories: ['CASH_RECYCLER'],
            amount: amount,
            currencyCode: 'USD',
            info: {
              tenderDenominations: [
                {
                  denomination: 1000,
                  piece: 1,
                  type: 'BILL'
                }
              ]
            }
          };
          break;
        }
        case 'TENDER_RETURN_CASH': {
          payload = {
            messageId: 'c6b4c4a7-b40a-4fe2-a6d8-17b9d147d15d',
            messageName: 'TENDER_RETURN',
            traceId: '0dd84777-c3cd-41cd-aa00-7095af41eae1',
            timestamp: 1655910293379,
            source: 'PERIPHERAL',
            localId: 'GLORY-CI10-local-cash-recycler',
            vendor: 'GLORY',
            model: 'CI10',
            categories: ['CASH_RECYCLER'],
            info: {
              status: 'success',
              transactionAmount: 0
            }
          };
          break;
        }
        case 'TENDER_REMOVED_CASH': {
          payload = {
            messageId: 'c6b4c4a7-b40a-4fe2-a6d8-17b9d147d15d',
            messageName: 'TENDER_REMOVED',
            traceId: '0dd84777-c3cd-41cd-aa00-7095af41eae1',
            timestamp: 1655910293379,
            source: 'PERIPHERAL',
            localId: 'GLORY-CI10-local-cash-recycler',
            vendor: 'GLORY',
            model: 'CI10',
            categories: ['CASH_RECYCLER'],
            info: {
              transactionAmount: 0
            }
          };
          break;
        }
        case 'TENDER_INSERTION_REQUESTED': {
          payload = {
            messageId: '8494335a-e8d8-4345-9c27-ade3327fed69',
            messageName: 'TENDER_INSERTION_REQUESTED',
            traceId: 'test',
            timestamp: 1634821699951,
            source: 'PERIPHERAL',
            localId: 'GLORY-CI10-cr39.1499.lowes.com',
            vendor: 'GLORY',
            model: 'CI10',
            categories: ['CASH_RECYCLER']
          };
          break;
        }
        case 'TENDER_STASHED': {
          payload = {
            categories: ['CASH_RECYCLER'],
            info: { status: 'success' },
            localId: 'GLORY-CI10-cr39.1499.lowes.com',
            messageId: 'a61f7c13-bb14-481b-a431-b3ba75fa831c',
            messageName: 'TENDER_STASHED',
            model: 'CI10',
            source: 'PERIPHERAL',
            timestamp: 1634887909104,
            traceId: '1634887157820',
            vendor: 'GLORY'
          };
          break;
        }
        case 'PERIPHERAL_REBOOT_COMPLETED': {
          payload = {
            messageId: 'b244937a-0807-4a08-abe5-3cae52de942a',
            messageName: 'PERIPHERAL_REBOOT_COMPLETED',
            timestamp: 1634822491872,
            source: 'PERIPHERAL',
            localId: 'GLORY-CI10-cr39.1499.lowes.com',
            vendor: 'GLORY',
            model: 'CI10',
            categories: ['CASH_RECYCLER']
          };
          break;
        }
        case 'TENDER_STASHED_DEV_BUSY': {
          payload = {
            categories: ['CASH_RECYCLER'],
            errors: [{ code: 'DEV_BUSY', message: 'Device is in busy state.' }],
            info: { status: 'failed' },
            localId: 'GLORY-CI10-cr39.1499.lowes.com',
            messageId: 'a61f7c13-bb14-481b-a431-b3ba75fa831c',
            messageName: 'TENDER_STASHED',
            model: 'CI10',
            source: 'PERIPHERAL',
            timestamp: 1634887909104,
            traceId: '1634887157820',
            vendor: 'GLORY'
          };
          break;
        }
        case 'TENDER_STASHED_DEV_ERR': {
          payload = {
            categories: ['CASH_RECYCLER'],
            errors: [{ code: 'DEV_ERR', message: 'Device is in error state.' }],
            info: { status: 'failed' },
            localId: 'GLORY-CI10-cr39.1499.lowes.com',
            messageId: 'a61f7c13-bb14-481b-a431-b3ba75fa831c',
            messageName: 'TENDER_STASHED',
            model: 'CI10',
            source: 'PERIPHERAL',
            timestamp: 1634887909104,
            traceId: '1634887157820',
            vendor: 'GLORY'
          };
          break;
        }
        case 'TENDER_STASHED_UNKNOWN_ERR': {
          payload = {
            categories: ['CASH_RECYCLER'],
            errors: [{ code: 'UNKNOWN_ERR', message: 'Device is currently busy.' }],
            info: { status: 'failed' },
            localId: 'GLORY-CI10-cr39.1499.lowes.com',
            messageId: 'a61f7c13-bb14-481b-a431-b3ba75fa831c',
            messageName: 'TENDER_STASHED',
            model: 'CI10',
            source: 'PERIPHERAL',
            timestamp: 1634887909104,
            traceId: '1634887157820',
            vendor: 'GLORY'
          };
          break;
        }
        case 'PIN_REQUESTED': {
          payload = {
            messageId: 'b17e1c89-b313-4587-b18a-083a54e922af',
            messageName: 'PIN_REQUESTED',
            traceId: 'f87c1908-97f5-47be-bd69-9a15374f87c2',
            timestamp: 1649155867448,
            source: 'PERIPHERAL',
            localId: 'local-sigcap',
            vendor: 'VERIFONE',
            model: 'MX925',
            categories: ['PED'],
            info: {
              pinType: 'ONLINE_PIN',
              screen: 'LOWES_PIN_PROMPT',
              messages: []
            }
          };
          break;
        }
        case 'TENDER_CAPTURE': {
          payload = {
            messageId: 'cee49a37-a128-4043-9011-9c4f0c16551f',
            messageName: 'TENDER_CAPTURE',
            traceId: 'be062172-deb5-42b6-bdb9-5cfa139df779',
            timestamp: 1649418106349,
            source: 'PERIPHERAL',
            localId: 'local-sigcap',
            vendor: 'VERIFONE',
            model: 'MX925',
            categories: ['PED'],
            info: {
              cardDetails: {
                cardNumber: cardData.cardNumber,
                drivingLicenseNumber: cardData.drivingLicenseNumber,
                driverLicenseState: cardData.driverLicenseState,
                expiry: '2212',
                language: 'English',
                track1Data: cardData.track1Data,
                track2Data: cardData.track2Data,
                cardholderName: cardData.cardholderName,
                binFloorLimit: cardData.binFloorLimit,
                cardType: cardData.cardType,
                giftCardType: cardData.giftCardType,
                lastFourRequired: cardData.lastFourRequired,
                pinRequired: cardData.pinRequired,
                commercialIndicator: cardData.commercialIndicator,
                primaryTenderCode: cardData.primaryTenderCode,
                secondaryTenderCode: cardData.secondaryTenderCode
              },
              modeOfPayment: 'SWIPE',
              tenderType: 'CREDIT',
              fallbackReason: 'Technical',
              registerNumber: '23'
            }
          };
          break;
        }
        case 'SIGNATURE_REQUESTED': {
          payload = {
            messageId: '52ff7d08-b283-4e4c-b330-839f313ef46e',
            messageName: 'SIGNATURE_REQUESTED',
            traceId: '3640bd1f-8e7d-459c-aec5-7d9c5632fb9a',
            timestamp: 1648716415196,
            source: 'PERIPHERAL',
            localId: 'local-sigcap',
            vendor: 'VERIFONE',
            model: 'MX925',
            categories: ['PED'],
            info: {
              screen: 'LOWES_SIGNATURE_US',
              messages: ['1.11'],
              timeout: 125000
            }
          };
          break;
        }
        case 'TENDER_PAID_VIA_CARD': {
          payload = {
            messageId: '1e39eee6-2184-4d75-baff-c6572cafc3fe',
            messageName: 'TENDER_PAID',
            traceId: 'be062172-deb5-42b6-bdb9-5cfa139df779',
            timestamp: 1649418110362,
            source: 'PERIPHERAL',
            localId: 'local-sigcap',
            vendor: 'VERIFONE',
            model: 'MX925',
            categories: ['PED'],
            amount: cardData.amount,
            currencyCode: 'USD',
            info: {
              authDateTime: '20220408114150',
              authSource: cardData.authSource,
              authorizedAmount: cardData.authorizedAmount,
              baseCurrencyCode: cardData.baseCurrencyCode,
              beginningGCBalance: cardData.beginningGCBalance,
              cardLevel: cardData.cardLevel,
              cardReceivedCode: cardData.cardReceivedCode,
              currentExchangeRate: cardData.currentExchangeRate,
              entryMethod: cardData.entryMethod,
              guid: cardData.guid,
              merchantId: cardData.merchantId,
              netReturnCode: cardData.netReturnCode,
              paymentServiceFlag: cardData.paymentServiceFlag,
              posEntryMode: cardData.posEntryMode,
              posIdentificationCode: cardData.posIdentificationCode,
              prepaidIndicator: false,
              rawRtsResponse: cardData.rawRtsResponse,
              remainingGCBalance: cardData.remainingGCBalance,
              retrievalReferenceNumber: cardData.retrievalReferenceNumber,
              schemeType: cardData.schemeType,
              signatureRequired: cardData.signatureRequired,
              systemTraceAuditNumber: cardData.systemTraceAuditNumber,
              tenderCode: cardData.tenderCode,
              transType: 'S',
              transactionId: cardData.transactionId,
              validationCode: cardData.validationCode,
              standardResponse: {
                authorizationCode: cardData.authorizationCode,
                returnCode: cardData.returnCode,
                reversalId: cardData.reversalId,
                status: 'Approved',
                token: cardData.token
              },
              signature: {
                format: cardData.format,
                signature: cardData.signature
              }
            }
          };
          break;
        }
        case 'TENDER_REMOVED': {
          payload = {
            messageId: '98977511-9115-4fdb-b814-df2617409c43',
            messageName: 'TENDER_REMOVED',
            traceId: 'be062172-deb5-42b6-bdb9-5cfa139df779',
            timestamp: 1649418111190,
            source: 'PERIPHERAL',
            localId: 'local-sigcap',
            vendor: 'VERIFONE',
            model: 'MX925',
            categories: ['PED']
          };
          break;
        }
        case 'TENDER_RETURN': {
          payload = {
            messageId: '6c2c8d23-4e3c-461e-b4cd-92a44249897d',
            messageName: 'TENDER_RETURN',
            traceId: '0dd84777-c3cd-41cd-aa00-7095af41eae1',
            timestamp: 1655910293379,
            source: 'PERIPHERAL',
            localId: 'GLORY-CI10-local-cash-recycler',
            vendor: 'GLORY',
            model: 'CI10',
            categories: ['CASH_RECYCLER'],
            info: {
              status: 'success',
              transactionAmount: 0
            }
          };
          break;
        }
        case 'STASH_UNLOCKED': {
          payload = {
            localId: 'GLORY-CI10-local-cash-recycler',
            messageId: '@{string}',
            messageName: 'STASH_UNLOCKED',
            vendor: 'GLORY',
            model: 'CI10',
            source: 'PERIPHERAL',
            timestamp: '@{number}',
            traceId: 'testCassetteInserted',
            categories: ['CASH_RECYCLER']
          };
          break;
        }
        case 'STASH_REMOVED': {
          payload = {
            messageId: '@{string}',
            messageName: 'STASH_REMOVED',
            traceId: 'testCassetteRemoved',
            timestamp: '@{number}',
            source: 'PERIPHERAL',
            localId: 'GLORY-CI10-local-cash-recycler',
            vendor: 'GLORY',
            model: 'CI10',
            categories: ['CASH_RECYCLER']
          };
          break;
        }
        case 'STASH_LOCKED': {
          payload = {
            localId: 'GLORY-CI10-local-cash-recycler',
            messageId: '@{string}',
            messageName: 'STASH_LOCKED',
            vendor: 'GLORY',
            model: 'CI10',
            source: 'PERIPHERAL',
            timestamp: '@{number}',
            traceId: 'testCassetteInserted',
            categories: ['CASH_RECYCLER']
          };
          break;
        }
        case 'STASH_INSERTED': {
          payload = {
            localId: 'GLORY-CI10-local-cash-recycler',
            messageId: '@{string}',
            messageName: 'STASH_INSERTED',
            vendor: 'GLORY',
            model: 'CI10',
            source: 'PERIPHERAL',
            timestamp: '@{number}',
            traceId: 'testCassetteInserted',
            categories: ['CASH_RECYCLER']
          };
          break;
        }
        case 'STASH_INSERTED_ERROR': {
          payload = {
            messageId: '@{string}',
            messageName: 'STASH_INSERTED',
            traceId: 'testInvalidCassetteInserted',
            timestamp: '@{number}',
            source: 'PERIPHERAL',
            localId: 'GLORY-CI10-local-cash-recycler',
            vendor: 'GLORY',
            model: 'CI10',
            categories: ['CASH_RECYCLER'],
            errors: [
              {
                code: 'STASH_NOT_EMPTY',
                message: 'Non-Empty Cassette inserted into Cash Recycler'
              }
            ]
          };
          break;
        }
        case 'error': {
          const error = {
            correlationId: 'd7d37bb8-6871-11ea-bc55-0242ac130003',
            errors: [
              {
                code: 'MAND_CAT_NON_OP',
                info: {
                  categories: ['CASH_RECYCLER', 'PRINTER']
                },
                message: 'Mandatory category devices not working.'
              }
            ],
            id: '565029a2-68ca-11ea-bc55-0242ac130003',
            status: 'NON_OPERATIONAL',
            timestamp: 2323423423,
            type: 'TILL_STATUS'
          };
          socket.send(JSON.stringify(error));
          break;
        }
      }
      if (payload) {
        sockets.mockServer.clients().forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(payload));
          }
        });
      }
    });
  });
  return sockets;
}
