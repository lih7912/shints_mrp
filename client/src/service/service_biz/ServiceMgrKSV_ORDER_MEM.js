/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceMgrKSV_ORDER_MEM {
    async getDatasByParam(qryOrderCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvOrderMemQuery($orderCd: String!) {
                        mgrKsvOrderMemQuery(ORDER_CD: $orderCd) {
                            id
                            ORDER_CD
                            PROD_CD
                            ADD_FLAG
                            PRICE
                            TOT_CNT
                            SIZE_CNT
                            OLD_PROD_CD
                            end_price
                            barcode
                            MID_SIZE
                            MID_SIZE_QTY
                            SIZE_LOSS
                        }
                    }
                `,
                variables: { orderCd: qryOrderCd },
            });
            console.log(
                "MGR_KSV_ORDER_MEM:_KSV_ORDER_MEM:" +
                    qryOrderCd +
                    "," +
                    JSON.stringify(data.mgrKsvOrderMemQuery.length),
            );
            return data.mgrKsvOrderMemQuery;
        } catch (e) {
            console.log("MGR_KSV_ORDER_MEM:_KSV_ORDER_MEM:" + qryOrderCd);
            return e;
        }
    }

    async createsData(argDatas) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        var tInputs = {};
        tInputs.datas = argDatas;
        console.log(JSON.stringify(tInputs));

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrKsvOrderMemCreatesByDel(
                        $datas: [InputMgrKsvOrderMemCreates!]!
                    ) {
                        mgrKsvOrderMemCreatesByDel(datas: $datas) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_ORDER_MEM CREATES BY DEL:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
