/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";
import { ServiceLib } from "../service_lib/ServiceLib";

export class ServiceS030501_DEL_MRP_PACK {
    // SERVICE: TBL_KSV_PO_MST

    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrDelete_PO_MST(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S030501_DEL_MRP_PACK_TBL_KSV_PO_MST(
                        $datas: I_S030501_DEL_MRP_PACK_TBL_KSV_PO_MST!
                    ) {
                        mgrDelete_S030501_DEL_MRP_PACK_TBL_KSV_PO_MST(
                            datas: $datas
                        ) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrDelete_S030501_DEL_MRP_PACK_TBL_KSV_PO_MST;
        } catch (e) {
            console.log(
                "async mgrDelete_S030501_DEL_MRP_PACK_TBL_KSV_PO_MST call error: ",
            );
            return e;
        }
    }

    async mgrQueryTBL_KSV_PO_MST(argQRY_KSV_PO_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S030501_DEL_MRP_PACK_TBL_KSV_PO_MST(
                        $data: I_S030501_DEL_MRP_PACK_QRY_KSV_PO_MST!
                    ) {
                        mgrQuery_S030501_DEL_MRP_PACK_TBL_KSV_PO_MST(
                            data: $data
                        ) {
                            id
                            PO_CD
                            PO_SEQ
                            PO_TYPE_NAME
                            PO_TYPE
                            PO_STATUS_NAME
                            PO_STATUS
                            REMARK
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PO_MST,
                },
            });
            console.log(
                "marQuery_S030501_DEL_MRP_PACK_TBL_KSV_PO_MST:" +
                    data.mgrQuery_S030501_DEL_MRP_PACK_TBL_KSV_PO_MST.length,
            );
            return data.mgrQuery_S030501_DEL_MRP_PACK_TBL_KSV_PO_MST;
        } catch (e) {
            return e;
        }
    }
}
