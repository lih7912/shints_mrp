/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { AFDataTable } from "../components/AFDataTable";
import { AFColumn } from "../components/AFColumn";
import { ServiceKCD_NATION } from "../service/service_mgrKcdNation/ServiceKCD_NATION";

const emptyQRY_KDC_NATION = {
    id: "",
    NAT_CD: "",
    NAT_NAME: "",
};

const S0104_KCD_NATION_1 = () => {
    const serviceKCD_NATIONRef = useRef(null);
    if (!serviceKCD_NATIONRef.current) serviceKCD_NATIONRef.current = new ServiceKCD_NATION();
    const serviceKCD_NATION = serviceKCD_NATIONRef.current;

    const [dataTbl_KCD_NATION, setDataTbl_KCD_NATION] = useState([]);
    const [dataTbl_KCD_NATION_Temp, setDataTbl_KCD_NATION_Temp] = useState([]);

    const [dataQRY_KCD_NATION, setDataQRY_KCD_NATION] =
        useState(emptyQRY_KDC_NATION);

    const getDatasKCD_NATION = () => {
        serviceKCD_NATION
            .getDatasKCD_NATION(dataQRY_KCD_NATION)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KCD_FACTORY() call => " +
                            data.length,
                    );
                    setDataTbl_KCD_NATION(data);
                    setDataTbl_KCD_NATION_Temp(data);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KCD_FACTORY()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const clearSelectedTBL_KCD_NATION = () => {
        setDataTbl_KCD_NATION([]);
    };

    const onInputChangeQRY_KCD_NATION_CD = (e, name) => {
        setDataTbl_KCD_NATION([]);
        let val = (e.target && e.target.value) || "";

        let temp = new Array();

        temp.push(
            dataTbl_KCD_NATION_Temp.filter((arr) => {
                // console.log(val)
                // console.log(arr[`${name}`])
                // console.log(arr[`${name}`].includes(val))
                return arr[`${name}`].includes(val);
            }),
        );
        //console.log(temp);
        setDataTbl_KCD_NATION(...temp);
    };

    // const checkType = (tTypeVal,val) => {
    //     if(typeof tTypeVal === 'string') return val;
    //     else if(typeof tTypeVal === 'number') return parseInt(val);
    // }

    useEffect(() => {
        getDatasKCD_NATION();
    }, []);
    return (
        <div>
            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "100rem",
                    height: "2rem",
                }}
            >
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "20rem",
                    }}
                >
                    <p style={{ width: "7rem", display: "inline-block" }}>Country Code</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                        id="NAT_CD"
                        onChange={(e) => {
                            onInputChangeQRY_KCD_NATION_CD(e, "NAT_CD");
                        }}
                    />
                </span>
            </div>
            <div>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-blockblock",
                        width: "40rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Country</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "30rem",
                        }}
                        id="NAT_NAME"
                        onChange={(e) => {
                            onInputChangeQRY_KCD_NATION_CD(e, "NAT_NAME");
                        }}
                    />
                </span>
            </div>
            <div style={{ width: "140rem", height: "2rem" }}>
                <div className="formgrid grid">
                    <div className="field col-6 md:col-6">
                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Iquiry"
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={getDatasKCD_NATION}
                        />
                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Insert"
                            icon="pi pi-check"
                            className="p-button-text"
                        />
                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Update"
                            icon="pi pi-check"
                            className="p-button-text"
                        />
                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Delete"
                            icon="pi pi-times"
                            className="p-button-text"
                        />
                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Reset"
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={clearSelectedTBL_KCD_NATION}
                        />
                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Exit"
                            icon="pi pi-check"
                            className="p-button-text"
                        />
                    </div>
                </div>
            </div>

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "2rem",
                    width: "99rem",
                    height: "40rem",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    size="small"
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    value={dataTbl_KCD_NATION}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 50 }}
                    emptyMessage="No Nation found."
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="18rem"
                >
                    <AFColumn field="NAT_CD" header={"Country Code"} headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="NAT_NAME" header={"Country"} headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                </AFDataTable>
            </div>
        </div>
    );
};

export default S0104_KCD_NATION_1;
