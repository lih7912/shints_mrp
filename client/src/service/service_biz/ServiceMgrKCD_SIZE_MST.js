/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceMgrKCD_SIZE_MST {
    async getDatasKCD_SIZE_MEM(qryGroup) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKcdSizeMemQueryByGroup($sizeGroup: String!) {
                        mgrKcdSizeMemQueryByGroup(SIZE_GROUP: $sizeGroup) {
                            id
                            SIZE_GROUP
                            SIZE_SEQ
                            SIZE_VAL
                            UNIT_RATE
                        }
                    }
                `,
                variables: { sizeGroup: qryGroup },
            });
            console.log(
                "MGR_KCD_SIZE_MST.getDataKCD_SIZE_MEM:",
                JSON.stringify(data.mgrKcdSizeMemQueryByGroup.length),
            );
            return data.mgrKcdSizeMemQueryByGroup;
        } catch (e) {
            return e;
        }
    }

    async getDataOne(qryId) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query OneQueryKCD_SIZE_MST($oneQueryKcdSizeMstId: Int!) {
                        oneQueryKCD_SIZE_MST(id: $oneQueryKcdSizeMstId) {
                            id
                            SIZE_GROUP
                            SIZE_MEMBER
                            SIZE_CNT
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                        }
                    }
                `,
                variables: { oneQueryKcdSizeMstId: qryId },
            });
            console.log(
                "MGR_KCD_SIZE_MST:",
                JSON.stringify(data.oneQueryKCD_SIZE_MST.id),
            );
            return data.oneQueryKCD_SIZE_MST.id;
        } catch (e) {
            return e;
        }
    }
}
