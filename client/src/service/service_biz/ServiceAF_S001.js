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

export class ServiceAF_S001 {
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrQuery_LIST_1(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryAF_S001_2_1($data: I_AF_S001_2_1!) {
                        mgrQueryAF_S001_2_1(data: $data) {
                            USER_ID
                            HEIGHT
                            AGE
                            REG_DATETIME
                            KIND
                            KIND2
                            TIME
                            TEMP
                            ECG
                            RESULT
                            LENG
                            STEP
                            SIZE
                            PACE
                            SIZE1
                            ANG
                            STRENGTH
                            LEFT_ANG
                            RESULT2
                            EMG
                            EMG_TIME
                            CNT
                            ETC1
                            ETC2
                            ETC3
                            ETC4
                            ETC5
                            MEMS {
                                USER_ID
                                HEIGHT
                                AGE
                                REG_DATETIME
                                WORK_SEQ
                                KIND
                                KIND2
                                TIME
                                TEMP
                                ECG
                                RESULT
                                LENG
                                STEP
                                SIZE
                                PACE
                                SIZE1
                                ANG
                                STRENGTH
                                LEFT_ANG
                                RESULT2
                                EMG
                                EMG_TIME
                                CNT
                                ETC1
                                ETC2
                                ETC3
                                ETC4
                                ETC5
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryAF_S001_2_1;
        } catch (e) {
            return e;
        }
    }
}
