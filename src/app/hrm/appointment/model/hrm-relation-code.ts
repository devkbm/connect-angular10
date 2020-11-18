// 인사연관코드정보
export class HrmRelationCode {        
    /**
     * 인사연관코드ID
     */
    relationId: number;    
    /**
     * 연관코드
     */
    relCode: string;
    /**
     * 연관코드
     */
    relCodeName: string;    
    /**
     * 부모 인사유형코드 Id
     */
    parentTypeId: string;
    /**
     * 부모 인사유형코드명
     */
    parentTypeName: string;
    /**
     * 부모 인사상세코드 Id
     */
    parentDetailId: string;
    /**
     * 부모 인사상세코드명
     */
    parentDetailName: string;
    /**
     * 자식 인사유형코드 Id
     */
    childTypeId: string;
    /**
     * 자식 인사유형코드명
     */
    childTypeName: string;
    /**
     * 자식 인사유형상세코드 Id
     */
    childDetailId: string;
    /**
     * 자식 인사유형상세코드명
     */
    childDetailName: string;
  }
  