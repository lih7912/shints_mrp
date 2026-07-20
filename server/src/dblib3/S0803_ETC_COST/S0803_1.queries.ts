import { Prisma } from '@prisma/client';
import prisma from '../../db';

const statusCase = `
case
  when a.CD_STATUS = '0' then '등록'
  when a.CD_STATUS = '1' then '상신'
  when a.CD_STATUS = '2' then '취소'
  when a.CD_STATUS = '3' then '종결'
  when a.CD_STATUS = '4' then '삭제요청'
  when a.CD_STATUS = '5' then '삭제완료'
  when a.CD_STATUS = '6' then '전표'
  when a.CD_STATUS = '7' then '송금'
  when a.CD_STATUS = '8' then '반려'
  else ''
end
`;

const payTypeCase = `
case
  when a.CD_PAY_TYPE = '1' then '긴급'
  when a.CD_PAY_TYPE = '2' then '일반(국내)'
  when a.CD_PAY_TYPE = '3' then '일반(국외)'
  when a.CD_PAY_TYPE = '4' then '월마감'
  else ''
end
`;

const requestTypeCase = `
case
  when a.CD_REQUEST_TYPE = '0' then '일반'
  when a.CD_REQUEST_TYPE = '1' then '자동이체'
  when a.CD_REQUEST_TYPE = '2' then '현금요청'
  when a.CD_REQUEST_TYPE = '3' then '현장납부'
  else ''
end
`;

const cardCase = `
case
  when a.CD_CARD = '0' then '가능'
  when a.CD_CARD = '1' then '불가'
  else '불가'
end
`;

const taxCase = `
case
  when a.CD_TAX = '1' then '과세'
  when a.CD_TAX = '2' then '면세/영세율'
  when a.CD_TAX = '3' then 'INVOICE/고지서'
  else ''
end
`;

const baseSelect = `
    select
        cast(a.CD_SEQ as varchar(20)) as CD_SEQ,
        cast(isnull(a.CD_STATUS, 0) as varchar(10)) as CD_STATUS,
        ${statusCase} as NM_STATUS,
        isnull(a.DT_DOCUMENT, '') as DT_DOCUMENT,
        isnull(a.DT_REQUEST, '') as DT_REQUEST,
        isnull(a.DT_ACTUAL, '') as DT_ACTUAL,
        isnull(b.BUYER_NAME, '') as BUYER_NAME,
        isnull(c.NM_DS, '') as NM_DS,
        isnull(a.NM_CURR, '') as NM_CURR,
        cast(isnull(a.ACTUAL, 0) as varchar(30)) as ACTUAL,
        isnull(d.VENDOR_NAME, '') as VENDOR_NAME,
        isnull(a.BANK_CD, '') as BANK_CD,
        isnull(a.NM_REMARK, '') as NM_REMARK,
        isnull(a.CD_CC, '') as CD_CC,
        isnull(a.CD_ACCT, '') as CD_ACCT,
        isnull(a.CD_SUPPLIER, '') as CD_SUPPLIER,
        isnull(a.CD_BILL, '') as CD_BILL,
        ${requestTypeCase} as NM_REQUEST_TYPE,
        isnull(a.BANK_NAME, '') as BANK_NAME,
        isnull(a.ACCOUNT_NO, '') as ACCOUNT_NO,
        isnull(a.ACCOUNT_NAME, '') as ACCOUNT_NAME,
        isnull(a.CD_ACDOC, '') as NM_ACDOC,
        ${cardCase} as NM_CARD,
        isnull(d.REG_NO, '') as REG_NO,
        cast(isnull(a.AMT, 0) as varchar(30)) as AMT,
        cast(isnull(a.VAT, 0) as varchar(30)) as VAT,
        cast(isnull(a.TOT, 0) as varchar(30)) as TOT,
        cast(isnull(a.MIN_AMT, 0) as varchar(30)) as MIN_AMT,
        isnull(a.ACT_OPTION, '') as ACT_OPTION,
        isnull(a.ACT_REMARK, '') as ACT_REMARK,
        cast(isnull(a.CD_TAX, 1) as varchar(10)) as CD_TAX,
        ${taxCase} as NM_TAX,
        cast(isnull(a.CD_PAY_TYPE, 2) as varchar(10)) as CD_PAY_TYPE,
        cast(isnull(a.CD_REQUEST_TYPE, 0) as varchar(10)) as CD_REQUEST_TYPE,
        cast(isnull(a.CD_CARD, 1) as varchar(10)) as CD_CARD,
        concat(isnull(a.ID_REG, ''), ' / ', isnull(a.DT_REG, '')) as REG_INFO,
        concat(isnull(a.ID_UPD, ''), ' / ', isnull(a.DT_UPD, '')) as UPD_INFO,
        concat(isnull(a.ID_GW, ''), ' / ', isnull(a.DT_GW, '')) as GW_INFO,
        concat(isnull(a.ID_END, ''), ' / ', isnull(a.DT_END, '')) as ISSUE_INFO,
        concat(
            isnull(a.ID_SEND, ''),
            ' / ',
            isnull(a.DT_SEND, '')
        ) as SEND_INFO,
        isnull(a.CD_PART, '') as CD_PART,
        ${payTypeCase} as NM_PAY_TYPE
    from
        KZZ_ACC_DATA a
        left join KCD_BUYER b on a.CD_CC = b.BUYER_CD
        left join KZZ_ACC_CODE c on a.CD_ACCT = cast(c.CD_DS as varchar(20))
        left join KCD_VENDOR d on a.CD_SUPPLIER = d.VENDOR_CD
`;

const buildWhere = (args: any) => {
    const conditions: string[] = [];

    if (args?.data?.STATUS && args.data.STATUS !== 'ALL') {
        conditions.push(`a.CD_STATUS = '${args.data.STATUS}'`);
    }

    if (args?.data?.COST_CENTER) {
        conditions.push(`a.CD_CC = '${args.data.COST_CENTER}'`);
    }

    if (args?.data?.ACCOUNT) {
        conditions.push(`a.CD_ACCT = '${args.data.ACCOUNT}'`);
    }

    if (args?.data?.SUPPLIER) {
        conditions.push(`a.CD_SUPPLIER = '${args.data.SUPPLIER}'`);
    }

    if (args?.data?.PART) {
        conditions.push(`a.CD_PART = '${args.data.PART}'`);
    }

    if (args?.data?.DATE_TYPE === 'document') {
        conditions.push(
            `a.DT_DOCUMENT between '${String(args.data.FROM_DATE || '').replaceAll('-', '')}' and '${String(args.data.TO_DATE || '').replaceAll('-', '')}'`,
        );
    } else if (args?.data?.DATE_TYPE === 'request') {
        conditions.push(
            `a.DT_REQUEST between '${String(args.data.FROM_DATE || '').replaceAll('-', '')}' and '${String(args.data.TO_DATE || '').replaceAll('-', '')}'`,
        );
    }

    return conditions.length ? ` where ${conditions.join(' and ')}` : '';
};

const todoMutation = async (name: string) => {
    return {
        CODE: `TODO:${name}`,
        ID: '',
        OPEN_URL: '',
    };
};

// NOTE:
// Mutation 본문은 현재 acc/server/src/routes/frm206.ts 에서 사용 중인 저장/취소/전자결재/회계처리 로직을
// 운영 프로젝트의 GraphQL resolver 형식으로 옮겨 적을 수 있도록 자리만 만든 상태입니다.
// 이번 result 산출물에서는 "붙여 넣기 가능한 구조"와 "조회/화면/서비스 연결 방식"을 우선 정리합니다.
// 전자결재 URL 규칙은 레거시 Frm206.cs 기준으로 아래 주소를 사용합니다.
// emp_no 는 반드시 KCD_USER.EMP_NO 에서 조회한 값을 사용해야 하며, 값이 없으면 C#과 같이 진행을 막아야 합니다.
const LEGACY_GW_BASE_URL =
    'http://gw.shints.com/KOR_WEBROOT/SRC/CM/TIMS/INDEX.ASPX';
const buildGwOpenUrl = (approKey: string, formId: string, empNo: string) =>
    `${LEGACY_GW_BASE_URL}?erp_div=OTHER_SIN&cd_company=1000&emp_no=${encodeURIComponent(empNo)}&appro_key=${encodeURIComponent(approKey)}&form_id=${encodeURIComponent(formId)}`;

const moduleQuery_S0803_ETC_COST = {
    Query: {
        mgrQueryFrm206Options: async () => {
            const [costCenters, accounts, suppliers] = await Promise.all([
                prisma.$queryRaw(
                    Prisma.sql`
                        select
                            BUYER_CD as code,
                            BUYER_NAME as name
                        from
                            KCD_BUYER
                        order by
                            BUYER_NAME
                    `,
                ),
                prisma.$queryRaw(
                    Prisma.sql`
                        select
                            cast(CD_DS as varchar(20)) as code,
                            NM_DS as name
                        from
                            KZZ_ACC_CODE
                        order by
                            NM_DS
                    `,
                ),
                prisma.$queryRaw(
                    Prisma.sql`
                        select
                            VENDOR_CD as code,
                            VENDOR_NAME as name,
                            isnull(REG_NO, '') as regNo,
                            isnull(INVOICE_NAME, '') as invoiceName
                        from
                            KCD_VENDOR
                        where
                            STATUS_CD = '0'
                            and VENDOR_NAME <> '없음'
                        order by
                            VENDOR_NAME
                    `,
                ),
            ]);

            return {
                costCenters: costCenters.map((row: any) => ({
                    ...row,
                    label: `${row.code} ${row.name}`,
                })),
                accounts: accounts.map((row: any) => ({
                    ...row,
                    label: `${row.code} ${row.name}`,
                })),
                suppliers: suppliers.map((row: any) => ({
                    ...row,
                    label: `${row.code} ${row.name}`,
                })),
                currencies: ['KRW', 'USD', 'EUR', 'JPY', 'GBP'],
                actOptions: [
                    '없음',
                    '수기입력',
                    'DebitNote',
                    'CreditNote',
                    '원천징수',
                ],
                payTypeOptions: [
                    {
                        value: '1',
                        label: '긴급',
                    },
                    {
                        value: '2',
                        label: '일반(국내)',
                    },
                    {
                        value: '3',
                        label: '일반(국외)',
                    },
                    {
                        value: '4',
                        label: '월마감',
                    },
                ],
                requestTypeOptions: [
                    {
                        value: '0',
                        label: '일반',
                    },
                    {
                        value: '1',
                        label: '자동이체',
                    },
                    {
                        value: '2',
                        label: '현금요청',
                    },
                    {
                        value: '3',
                        label: '현장납부',
                    },
                ],
                taxTypeOptions: [
                    {
                        value: '1',
                        label: '과세',
                    },
                    {
                        value: '2',
                        label: '면세/영세율',
                    },
                    {
                        value: '3',
                        label: 'INVOICE/고지서',
                    },
                ],
                cardOptions: [
                    {
                        value: '0',
                        label: '가능',
                    },
                    {
                        value: '1',
                        label: '불가',
                    },
                ],
            };
        },

        mgrQueryFrm206List: async (_: any, args: any) => {
            const sqlStr = `${baseSelect}${buildWhere(args)} order by a.CD_SEQ desc`;
            return prisma.$queryRaw(Prisma.raw(sqlStr));
        },

        mgrQueryFrm206Detail: async (_: any, args: any) => {
            const sqlStr = `${baseSelect} where a.CD_SEQ = '${args.data.ID}'`;
            const rows: any[] = await prisma.$queryRaw(Prisma.raw(sqlStr));
            return rows[0] || null;
        },

        mgrQueryFrm206Banks: async (_: any, args: any) => {
            const sqlStr = `
                select
                    b.BANK_CD,
                    isnull(b.BANK_NAME, '') as BANK_NAME,
                    isnull(b.ACCOUNT_NO, '') as ACCOUNT_NO,
                    isnull(b.ACCOUNT_NAME, '') as ACCOUNT_NAME,
                    isnull(b.SFTCODE, '') as SFTCODE,
                    isnull(b.BANK_BRANCH, '') as BANK_BRANCH
                from
                    KCD_VENDOR_BANK vb
                    inner join KCD_BANK b on vb.BANK_CD = b.BANK_CD
                where
                    vb.VENDOR_CD = '${args.data.VENDOR_CD}'
                    and vb.GW = '2'
                order by
                    vb.SEQ
            `;
            return prisma.$queryRaw(Prisma.raw(sqlStr));
        },

        mgrQueryFrm206Templates: async (_: any, args: any) => {
            const sqlStr = `
                select
                    cast(CD_SEQ as varchar(20)) as ID,
                    isnull(NM_REMARK, '') as TITLE
                from
                    KZZ_ACC_DATA
                where
                    ID_REG = '${args.data.USER_ID}'
                    and isnull(NM_REMARK, '') <> ''
                order by
                    CD_SEQ desc
            `;
            return prisma.$queryRaw(Prisma.raw(sqlStr));
        },

        mgrQueryFrm206TemplateDetail: async (_: any, args: any) => {
            const sqlStr = `${baseSelect} where a.CD_SEQ = '${args.data.ID}'`;
            const rows: any[] = await prisma.$queryRaw(Prisma.raw(sqlStr));
            return rows[0] || null;
        },
    },

    Mutation: {
        mgrInsertFrm206Save: async () => todoMutation('INSERT'),
        mgrUpdateFrm206Save: async () => todoMutation('UPDATE'),
        mgrUpdateFrm206Cancel: async () => todoMutation('CANCEL'),
        mgrGwFrm206Expense: async () => todoMutation('GW_EXPENSE'),
        mgrGwFrm206DeleteRequest: async () => todoMutation('GW_DELETE_REQUEST'),
        mgrIssueFrm206Accounting: async () => todoMutation('ACCOUNTING_ISSUE'),
        mgrCancelFrm206Accounting: async () =>
            todoMutation('ACCOUNTING_CANCEL'),
        mgrFinishFrm206Sending: async () => todoMutation('SENDING_FINISH'),
    },
};

export default moduleQuery_S0803_ETC_COST;
