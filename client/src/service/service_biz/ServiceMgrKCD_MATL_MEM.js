/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceMgrKCD_MATL_MEM {
    async getDatasByParam(qryMatlCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKcdMatlMemQuery($matlCd: String!) {
                        mgrKcdMatlMemQuery(MATL_CD: $matlCd) {
                            id
                            MATL_CD
                            MATL_SEQ
                            MATL_PRICE
                            CURR_CD
                            CONF_FLAG
                            PRICE_TYPE
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            matl_mprice
                            REMARK
                        }
                    }
                `,
                variables: { matlCd: qryMatlCd },
            });
            console.log(
                "MGR_KCD_MATL_MEM:",
                JSON.stringify(data.mgrKcdMatlMemQuery.length),
            );
            return data.mgrKcdMatlMemQuery;
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
                    mutation MgrKcdMatlMemCreates(
                        $datas: [InputMgrKcdMatlMemCreates!]!
                    ) {
                        mgrKcdMatlMemCreates(datas: $datas) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_MATL_MEM CREATES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
