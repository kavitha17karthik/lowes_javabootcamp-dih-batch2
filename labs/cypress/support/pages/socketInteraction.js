import {
  CARD_VISA,
  CARD_LBA,
  CARD_LAR,
  CARD_LCC,
  CARD_GIFT,
  CARD_MERCH,
  SOCKET_EVENTS
} from '../../support/constants';

class SocketInteraction {
  constructor(socket) {
    this.connection = socket;
  }

  //Card Flow Socket Events Starts Here
  pinRequested() {
    const payload = {
      event: 'PIN_REQUESTED'
    };
    this.connection.send(JSON.stringify(payload));
  }

  tenderCapture(cardType) {
    let payload;
    switch (cardType) {
      case CARD_VISA: {
        payload = {
          event: 'TENDER_CAPTURE',
          cardData: {
            cardNumber: '4761737937040135',
            track1Data: 'B4761732060135^USA DEBIT/TEST CARD 02 ^22122011fnxbywXtD/',
            track2Data: '4761732060135=2212201DSn9SzKMNyBKwR4N',
            cardholderName: 'USA DEBIT/TEST CARD 02',
            binFloorLimit: '100.00',
            cardType: cardType,
            commercialIndicator: false,
            primaryTenderCode: '05',
            secondaryTenderCode: '05'
          }
        };
        break;
      }
      case CARD_LBA: {
        payload = {
          event: 'TENDER_CAPTURE',
          cardData: {
            cardNumber: '6900253001009563052',
            track1Data: 'B6900253001009563052^TEST, CSS^49127011000000749000000',
            track2Data: '6900253001009563052=491270110000749',
            cardholderName: 'TEST, CSS',
            binFloorLimit: '500.00',
            cardType: cardType,
            commercialIndicator: true,
            primaryTenderCode: '03',
            secondaryTenderCode: '03',
            lbaLamexPoRequired: true
          }
        };
        break;
      }
      case CARD_LAR: {
        payload = {
          event: 'TENDER_CAPTURE',
          cardData: {
            cardNumber: '6044099000065682',
            track1Data: 'B6044099000065682^LAR/TEST51^9912131800019',
            track2Data: '6044099000065682=99121318000190000000',
            cardholderName: 'LAR/TEST51',
            authBuyerNumber: '00019',
            binFloorLimit: '999.00',
            cardType: cardType,
            commercialIndicator: true,
            primaryTenderCode: '19',
            secondaryTenderCode: '19'
          }
        };
        break;
      }
      case CARD_LCC: {
        payload = {
          event: 'TENDER_CAPTURE',
          cardData: {
            cardNumber: '6900250006009000552',
            track1Data: 'B6900250006009000552^TEST/ CSS^49127011000000394000000',
            track2Data: '6900250006009000552=491270110000394',
            cardholderName: 'TEST/ CSS',
            binFloorLimit: '500.00',
            cardType: cardType,
            commercialIndicator: false,
            primaryTenderCode: '03',
            secondaryTenderCode: '03'
          }
        };
        break;
      }
      case CARD_GIFT: {
        payload = {
          event: 'TENDER_CAPTURE',
          cardData: {
            cardNumber: '6006491720999916398',
            track1Data: '',
            track2Data: '6006491720999916398=491211071608800',
            cardholderName: '',
            cardType: cardType,
            giftCardType: 'NG',
            lastFourRequired: false,
            pinRequired: false,
            primaryTenderCode: '10',
            secondaryTenderCode: '10'
          }
        };
        break;
      }
      case CARD_MERCH: {
        payload = {
          event: 'TENDER_CAPTURE',
          cardData: {
            cardNumber: '6006491780999908365',
            track1Data: 'B6006491780999908365^LOWMC                     ^4912110J04',
            track2Data: '6006491780999908365=491211020788798',
            cardholderName: 'LOWMC',
            cardType: cardType,
            driverLicenseState: 'NC',
            drivingLicenseNumber: '1306620',
            giftCardType: 'MC',
            lastFourRequired: false,
            pinRequired: true,
            primaryTenderCode: '10',
            secondaryTenderCode: '10'
          }
        };
        break;
      }
    }
    this.connection.send(JSON.stringify(payload));
  }

  signatureRequested() {
    const payload = {
      event: 'SIGNATURE_REQUESTED'
    };
    this.connection.send(JSON.stringify(payload));
  }

  tenderPaidViaCard(cardType, amount) {
    let payload;
    switch (cardType) {
      case CARD_VISA: {
        payload = {
          event: 'TENDER_PAID_VIA_CARD',
          cardData: {
            amount: 111,
            authSource: 'V',
            authorizedAmount: 111,
            cardLevel: 'F',
            cardReceivedCode: '0',
            entryMethod: '2',
            guid: '6335023232731649418110797000',
            merchantId: '700000007433',
            netReturnCode: '00',
            paymentServiceFlag: 'E',
            posEntryMode: '80',
            rawRtsResponse:
              '101,FIPEMVVPIN,FIPEMVVPIN,0,118,credit,,6335,023,sale,05,VISA,476173XXXXXX0135,2212,XXXXXXXXXXXX0135=2212,111,62105,English,,,*CEM_Swiped *FALLBACK_EMV *Tokenization *pos_validate_swipe *NoMod10 *NoExpCheck *StoreStan 105450 *DEVCAP=C0 *SIGNATURE *E2EE *NoPA *nocontactless *CardType=VI *CardLevel=F,62418108,,,0000,,,,,,,,6335023232731649418110797000,476173TJOPXC0135,,,072901,Approved authorization / transaction,,700000007433,,draft,5801,E3020984211071433B8H\u001FAS-V,,633523105450,,429991,English,04082022,114150,,00,PNSUSA01,0,<fallbackreason>Technical</fallbackreason>,33523105,,,,,,147,074150783,,,,,,,700000007433,700000007433,,001,,,,,,111\u001C105450\u001C072901\u001C302098421107143\u001C111\u001C,,,,,,,,,SAFable,,476173XXXXXX0135,XXXXXXXXXXXX0135=2212XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX,,/wECAQEEAoE6AgEH5QkNWbGDiAplMmVlQGxvd2VzCUVjEkYSJbRA97b7bCsaXEfZ3uJrp5ZX3yxKvcp9LSyDgMAFKT/0+jS5PrMCWbNu8muVD1ht5NXntvCPxu9Vx1wFoUeTGjGRZA7xLWHvZdnLenZat0hbfGP5F8lk5FUUGWpgmAUij2k3G4kwVLO9jOyTEjVfVcC+C3RT2ElD6RwAAUuVVUZsrX9cIy3vxZgcCaS/rpn/87/EJH4fZF3oZoA5D/7r,,',
            retrievalReferenceNumber: '633523105450',
            schemeType: 'VISA',
            signatureRequired: false,
            systemTraceAuditNumber: '105450',
            tenderCode: '05',
            transactionId: '302098421107143',
            validationCode: '3B8H',
            authorizationCode: '072901',
            returnCode: '5801',
            reversalId: '111XX105450XX072901XX302098421107143XX111XX',
            token: '476173TJOPXC0135'
          }
        };
        break;
      }
      case CARD_LBA: {
        payload = {
          event: 'TENDER_PAID_VIA_CARD',
          cardData: {
            amount: 102,
            authorizedAmount: 102,
            baseCurrencyCode: ' ',
            cardReceivedCode: '0',
            currentExchangeRate: ' ',
            entryMethod: '2',
            guid: '6335023808781651124015269000',
            merchantId: '604409700006335',
            netReturnCode: '00',
            posEntryMode: '02',
            posIdentificationCode: '1',
            prepaidIndicator: false,
            rawRtsResponse:
              '101,FIPEMVVPIN,FIPEMVVPIN,0,118,credit,,6335,023,sale,03,PRIV5,690253******3052,2212,XXXXXXXXXXXXXXX3052=2212,102,60128,English,,,*CEM_Swiped *Tokenization *pos_validate_swipe *NoMod10 *NoExpCheck *StoreStan 128098 *DEVCAP=C0 *SIGNATURE *E2EE *NoPA *nocontactless ,60124012,,,0000,,,,,,,,6335023808781651124015269000,690253BEFPNC3052,,,000424,Successful approval / completion,,,,draft,,,,366600,,366600,English,04282022,053335,,00,GCFCRD02,0,,33523128,,,,,,182,013335564,,,B69002XXXXXXXXX63052^TEST CSS^49127011000000749000000,,,,604409700006335,,,001,,,,,,000424,,Successful approval / completion,,,,,,,SAFable,,',
            retrievalReferenceNumber: '366600',
            schemeType: 'PRIV5',
            signatureRequired: false,
            systemTraceAuditNumber: '128098',
            tenderCode: '03',
            standardResponse: {
              authorizationCode: '000424',
              reversalId: '000424',
              token: '690253BEFPNC3052'
            }
          }
        };
        break;
      }
      case CARD_LAR: {
        payload = {
          event: 'TENDER_PAID_VIA_CARD',
          cardData: {
            amount: 102,
            authSource: '1',
            authorizedAmount: 102,
            cardReceivedCode: '0',
            currentExchangeRate: ' ',
            entryMethod: '2',
            guid: '6335023064871651148287497000',
            merchantId: '6335',
            netReturnCode: '11',
            paymentServiceFlag: 'A',
            posEntryMode: '02',
            posIdentificationCode: '1',
            prepaidIndicator: false,
            rawRtsResponse:
              '101,FIPEMVVPIN,FIPEMVVPIN,0,118,credit,,6335,023,sale,19,PRIV1,604409XXXXXX5682,2212,XXXXXXXXXXXX5682=2212,102,60145,English,,,*CEM_Swiped *Tokenization *NoMod10 *NoExpCheck *POS_MANUAL *StoreStan 145985 *DEVCAP=C0 *SIGNATURE *NoPA *nocontactless,60148266,,,0000,,,,,,,,6335023064871651148287497000,604409ONRUGA5682,,,000687,Approved - purchase order required,,,,draft,,,,057101,,057101,English,04282022,121807,,11,GCFCRD01,0,,33523145,,,,,,189,081808402,,,B60440XXXXXX65682^LAR/TEST51^9912131800019,,,,6335,,,001,,,,,,000687,,Approved - purchase order required,,,,,,,SAFable,,,,,,,,,,,,,,00019,,',
            retrievalReferenceNumber: '057101',
            schemeType: 'PRIV1',
            signatureRequired: true,
            systemTraceAuditNumber: '145985',
            tenderCode: '19',
            standardResponse: {
              authorizationCode: '000687',
              reversalId: '000687',
              token: '604409ONRUGA5682'
            },
            signature: {
              format: 'VFI RAW file format',
              signature:
                'VkZJU0lHMDABgv////8CHAOvAhsDyAIbA94CGwPnAhsD9QIcA/0CHQP//////wHMA3gByQN2AccDcgHFA24BwwNoAcIDZAHGA1QByQNMAdEDOgHfAyUB5wMaAfwDBQIHAvoCHgLpAikC4gI+AtoCTwLbAlUC3gJeAusCYAL8Al4DBwJcAxMCVQMsAksDRgI+A18CMgN2AisDgQIgA5QCFgOiAhIDpwIMA68CCAOxAgYDrwIHA6kCDQOaAhUDjgIZA4cCJAN7AjEDcAI3A2sCRANlAlADYwJWA2MCXgNnAmQDbwJmA3QCaAN/AmkDhgJpA5MCaAOaAmYDpwJjA7gCYwPBAmMDxwJkA8kCZQPKAmcDxgJoA8MCagO7/////wJ6A34CeQN/AngDgAJ3A4H/////AdQDlAHVA5QB1QOTAdUDkgHVA5EB1QOPAdUDjAHVA4cB1gOEAdgDfgHaA3YB3ANxAeEDZwHmA1sB6QNVAfADRwH6AzgB/wMwAhcDEQIeAwoCKgL/Ai8C+gI4AvUCPAL1AkEC9wJCAvsCQwMEAkEDEgJAAxoCOwMrAjQDPgIsA1ICKANcAiADbwIZA4ECEAOcAg0DpwINA6sCDgOrAhADqQIUA6QCFwOh/////wKxA88CsQPOArADzAKvA8gCrgPGAq4DwQKvA6sCsQOhArUDhwK7A2cCvwNVAscDLwLLAx0CzgMMAtUC7QLZAtUC2wLMAtwCwQLdAsAC3QLDAtwCyALaAtcC1wLtAtMDFQLQA0ICzwNdAs4DdgLOA4ACzwOSAs8DoALQA6YC0QOtAtIDrwLUA7AC2AOvAt8DqgLjA6YC7gOcAvoDkAMPA3sDHQNsAyMDZQMtA1QDMANKAzQDNAM1AycDMgMNAysC8gMmAuQDIQLYAxUCwgMOAroDAAKwAvECsQLpArUC4QK8AsIC7AK7AvsCrgMaAqQDOQKgA0cCnANhAp0DdQKfA30CqQOJArYDkAK9A5ICzwOSAuIDjQLrA4kC/gN+AwcDeAMWA2sDJwNYAysDUgMxA0kDNANDAzQDQQMzA0ADMANDAy8DRQMrA0sDKANTAycDVwMmA2ADJwNmAygDaAMsA2sDLwNrAzQDaQM8A2IDQANcA0EDWQNDA1QDRANRA0QDUANCA08DQQNQA0ADUgM/A1UDPgNYAz4DWQM+A1oDPwNZA0EDVgNDA1MDRANRA0YDTgNHA00DRwNMA0cDTgNGA1EDRgNTA0YDVwNHA1sDRwNdA0gDYANKA2EDSwNgA00DXwNQA10DUQNbA1MDWQNVA1gDVgNYA1gDWQNbA1sDXANbA14DXQNhA10DYgNdA2UDWwNoA1cDagNVA2wDTwNvA0kDcANGA3IDQAN1Az4DdgM+A3gDQQN5A0oDegNRA3kDdAN4A38DdgOTA3QDpANzA6wDcwO3A3MDvQN0A70DdwO5A3oDtAN/A6QDggOZA4kDgQOMA3MDkgNVA5gDOQOaAy4DoAMYA6MDFQOlAxcDpwMiA6kDMgOqAzwDqwNQA6sDYQOrA2gDqgNyA6oDdwOrA3EDrANoA60DYwOvA1cDsANRA7IDRAO1A0EDtgNEA7gDSQO6A00DvANTA74DVQPBA1YDwwNVA8cDTgPKAz4DzQM0A84DKAPSAwwD1AL9A9YC4APZAr0D2gKwA9sCrgPcArMD3QK5A+ACzAPiAuYD5AL0A+cDEgPpAyED7AMuA+8DRgPzA1YD9QNcA/cDYQP4A2AD+QNXA/YDOwPwAyED6wMTA98C+QPYAu4DzwLkA70C1gOpAtMDnwLVA4wC3gN8Au4DdgL2A2wDCQNnAxoDZgMiA2cDKQNvAzEDiQMvA6MDJAOxAx0DzQMOA9sDBQPyAvcD+wLxBAUC7AQGAu0EAwLv/////wNnA7ADZgOxA2QDswNjA7MDYgO0A2IDtQNoA7IDewOmA48DlwObA48DtAN+A84DawPbA2MD8gNTA/wDTQQMA0MEEgM/BBoDOQQgAzQEIgMyBCQDMAQnAywEKwMnBC0DJgQxAyUEMwMlBDgDJQQ6AyUEPgMlBD8DJQRCAyX/////'
            }
          }
        };
        break;
      }
      case CARD_LCC: {
        payload = {
          event: 'TENDER_PAID_VIA_CARD',
          cardData: {
            amount: 102,
            authorizedAmount: 102,
            baseCurrencyCode: ' ',
            cardReceivedCode: '0',
            currentExchangeRate: ' ',
            entryMethod: '2',
            guid: '6335023815261651427143587000',
            merchantId: '604409800006335',
            netReturnCode: '00',
            posEntryMode: '02',
            posIdentificationCode: '1',
            prepaidIndicator: false,
            rawRtsResponse:
              '101,FIPEMVVPIN,FIPEMVVPIN,0,118,credit,,6335,023,sale,03,PRIV5,690250******0552,2212,XXXXXXXXXXXXXXX0552=2212,102,60186,English,,,*CEM_Swiped *Tokenization *pos_validate_swipe *NoMod10 *NoExpCheck *StoreStan 186931 *DEVCAP=C0 *SIGNATURE *E2EE *NoPA *nocontactless ,60427141,,,0000,,,,,,,,6335023815261651427143587000,690250LEVFYI0552,,,000177,Successful approval / completion,,,,draft,,,,367255,,367255,English,05012022,174543,,00,GCFCRD01,0,,33523186,,,,,,158,134544388,,,B69002XXXXXXXXX00552^TEST/ CSS^49127011000000394000000,,,,604409800006335,,,001,,,,,,000177,,Successful approval / completion,,,,,,,SAFable,,',
            retrievalReferenceNumber: '367255',
            schemeType: 'PRIV5',
            signatureRequired: false,
            systemTraceAuditNumber: '186931',
            tenderCode: '03',
            standardResponse: {
              authorizationCode: '000177',
              reversalId: '000177',
              token: '690250LEVFYI0552'
            }
          }
        };
        break;
      }
      case CARD_GIFT: {
        payload = {
          event: 'TENDER_PAID_VIA_CARD',
          cardData: {
            amount: amount || 106,
            authorizedAmount: amount || 106,
            baseCurrencyCode: '0840',
            beginningGCBalance: '1093.28',
            cardReceivedCode: '0',
            currentExchangeRate: '1',
            entryMethod: '0',
            guid: '6335023586661652363460960000',
            merchantId: '61700',
            netReturnCode: '01',
            posEntryMode: '1',
            posIdentificationCode: '1',
            prepaidIndicator: false,
            rawRtsResponse:
              '101,FIPEMVVPIN,FIPEMVVPIN,0,118,giftcard,,6335,023,sale,11,GIFT_CARD2,600649XXXXXXXXX6398,2212,XXXXXXXXXXXXXXX6398=2212,106,60076,English,,106,*CEM_Swiped *Tokenization *pos_validate_swipe *NoMod10 *NoExpCheck *StoreStan 076465 *DEVCAP=C0 *NOSIGNATURE *E2EE *NoPA *nocontactless ,60363458,,,0000,,,,,,,06170,6335023586661652363460960000,600649WUQHBIDGX6398,,,109222,Approved ,,,,draft,,,000000272138,272138,,272138,English,05122022,135100,109222,01,SVSGCD01,0,,33523076,,,,,,94,095100933,,,,,,,61700,,,001,,,,,,076465,,Approved ,,,0066,,,,SAFable,,,,,,,,,,,,,,,0840,0840,1,,',
            remainingGCBalance: '1092.22',
            retrievalReferenceNumber: '272138',
            schemeType: 'GIFT_CARD2',
            signatureRequired: false,
            systemTraceAuditNumber: '076465',
            tenderCode: '10',
            standardResponse: {
              authorizationCode: '109222',
              reversalId: '076465',
              token: '600649WUQHBIDGX6398'
            }
          }
        };
        break;
      }
      case CARD_MERCH: {
        payload = {
          event: 'TENDER_PAID_VIA_CARD',
          cardData: {
            amount: amount || 106,
            authorizedAmount: amount || 106,
            baseCurrencyCode: '0840',
            beginningGCBalance: '1093.28',
            cardReceivedCode: '0',
            currentExchangeRate: '1',
            entryMethod: '0',
            guid: '6335023221274531386460691246',
            merchantId: '61700',
            netReturnCode: '01',
            posEntryMode: '1',
            posIdentificationCode: '1',
            prepaidIndicator: false,
            rawRtsResponse:
              '101,FIPEMVVPIN,FIPEMVVPIN,0,118,giftcard,,6335,023,sale,11,GIFT_CARD2,600649XXXXXXXXX8365,2212,XXXXXXXXXXXXXXX8365=2212,106,99005,English,,106,*CEM_Swiped *Tokenization *pos_validate_swipe *NoMod10 *NoExpCheck *StoreStan 005536 *DEVCAP=C0 *NOSIGNATURE *E2EE *NoPA *nocontactless ,99748451,,,0000,,,,,,,06170,6335023221274531386460691246,600649DYNVFDVES8365,,,053628,Approved ,,,,draft,,,000000425811,425811,,425811,English,09212022,082054,53628,01,SVSGCD01,0,,33523005,,,,,,173,042054877,,,B6006491780999908365^LOWMC                     ^4912110J04,,,,61700,,,001,,,,,,005536,,Approved ,,,8117,,,,SAFable,,,,,,,,,,,,,,,0840,0840,1,,',
            remainingGCBalance: '1092.22',
            retrievalReferenceNumber: '425811',
            schemeType: 'GIFT_CARD2',
            signatureRequired: false,
            systemTraceAuditNumber: '005536',
            tenderCode: '10',
            standardResponse: {
              authorizationCode: '053628',
              reversalId: '076465',
              token: '600649DYNVFDVES8365'
            }
          }
        };
        break;
      }
    }
    this.connection.send(JSON.stringify(payload));
  }

  tenderRemoved() {
    const payload = {
      event: 'TENDER_REMOVED'
    };
    this.connection.send(JSON.stringify(payload));
  }

  //Card Flow Socket Events Ends Here

  //Cash Flow Socket Events Starts Here
  insertCash(amount) {
    const payload = {
      amount: Number(amount) * 100, // in cents
      event: SOCKET_EVENTS.DEPOSIT
    };
    this.connection.send(JSON.stringify(payload));
  }

  tenderPaid(amount) {
    const payload = {
      event: 'TENDER_PAID',
      amount: Number(amount) * 100 // in cents
    };
    this.connection.send(JSON.stringify(payload));
  }

  tenderReturn() {
    const payload = {
      event: 'TENDER_RETURN_CASH'
    };
    this.connection.send(JSON.stringify(payload));
  }

  tenderRemovedCash() {
    const payload = {
      event: 'TENDER_REMOVED_CASH'
    };
    this.connection.send(JSON.stringify(payload));
  }

  tenderRequested() {
    const payload = {
      event: 'TENDER_INSERTION_REQUESTED'
    };
    this.connection.send(JSON.stringify(payload));
  }

  tenderStashed() {
    const payload = {
      event: 'TENDER_STASHED'
    };
    this.connection.send(JSON.stringify(payload));
  }

  tenderReboot() {
    const payload = {
      event: 'PERIPHERAL_REBOOT_COMPLETED'
    };
    this.connection.send(JSON.stringify(payload));
  }

  socketError() {
    const payload = {
      event: 'error'
    };
    this.connection.send(JSON.stringify(payload));
  }

  tenderStashedSocketError(message) {
    const payload = {
      event: message
    };
    this.connection.send(JSON.stringify(payload));
  }
  //Cash Flow Socket Events Ends Here

  //Cash Management Sockets
  stashInserted() {
    const payload = {
      event: 'STASH_INSERTED'
    };
    this.connection.send(JSON.stringify(payload));
  }

  stashLocked() {
    const payload = {
      event: 'STASH_LOCKED'
    };
    this.connection.send(JSON.stringify(payload));
  }

  stashRemoved() {
    const payload = {
      event: 'STASH_REMOVED'
    };
    this.connection.send(JSON.stringify(payload));
  }

  stashUnlocked() {
    const payload = {
      event: 'STASH_UNLOCKED'
    };
    this.connection.send(JSON.stringify(payload));
  }

  stashInsertedError() {
    const payload = {
      event: 'STASH_INSERTED_ERROR'
    };
    this.connection.send(JSON.stringify(payload));
  }
}

export default SocketInteraction;
