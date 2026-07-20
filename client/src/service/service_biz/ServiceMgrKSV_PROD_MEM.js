/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceMgrKSV_PROD_MEM {
    async getDatasDetail(qryProdCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvProdMemQueryDetail($prodCd: String!) {
                        mgrKsvProdMemQueryDetail(PROD_CD: $prodCd) {
                            id
                            PROD_CD
                            MATL_CD
                            STD_NET
                            STD_LOSS
                            STD_GROSS
                            NET
                            LOSS
                            GROSS
                            REMARK
                            USE_SIZE
                            SEQ
                            COUNTRY
                            MRP_CHECK
                            BVT_REMARK
                            VERSION
                            DL_FLAG
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            MATL_PRICE
                            CURR_CD
                            VENDOR_NAME
                            NAT_NAME
                        }
                    }
                `,
                variables: { prodCd: qryProdCd },
            });
            console.log(
                "MGR_KSV_PROD_MEM:_KSV_PROD_MEM:" +
                    qryProdCd +
                    "," +
                    JSON.stringify(data.mgrKsvProdMemQueryDetail.length),
            );
            return data.mgrKsvProdMemQueryDetail;
        } catch (e) {
            console.log("MGR_KSV_PROD_MEM:_KSV_PROD_MEM:" + qryProdCd);
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
                    mutation MgrKsvProdMemCreatesByDel(
                        $datas: [InputMgrKsvProdMemCreates!]!
                    ) {
                        mgrKsvProdMemCreatesByDel(datas: $datas) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_PROD_MEM CREATES BY DEL:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
