/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceMgrKCD_MATL_SALE {
    async getDatasByParam(qryMatlCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKcdMatlSaleQuery($matlCd: String!) {
                        mgrKcdMatlSaleQuery(MATL_CD: $matlCd) {
                            id
                            MATL_CD
                            MATL_SEQ
                            MATL_PRICE
                            CURR_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            REMARK
                        }
                    }
                `,
                variables: { matlCd: qryMatlCd },
            });
            console.log(
                "MGR_KCD_MATL_SALE:",
                JSON.stringify(data.mgrKcdMatlSaleQuery.length),
            );
            return data.mgrKcdMatlSaleQuery;
        } catch (e) {
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
                    mutation MgrKcdMatlSaleCreates(
                        $datas: [InputMgrKcdMatlSaleCreates!]!
                    ) {
                        mgrKcdMatlSaleCreates(datas: $datas) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_MATL_SALE CREATES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
