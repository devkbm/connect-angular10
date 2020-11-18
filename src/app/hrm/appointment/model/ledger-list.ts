import { LedgerChangeInfo } from './ledger-change-info';

export class LedgerList {    
    listId: string;    
    sequence: number;
    empId: string;
    appointmentCode: string;
    appointmentFromDate: Date;
    appointmentToDate: Date;    
    changeInfoList: LedgerChangeInfo[];

    ledgerId: string;        
}
