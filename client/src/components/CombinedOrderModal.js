/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { ServiceS020602_ORDER_REG } from "../service/service_biz/ServiceS020602_ORDER_REG";

const CombinedOrderModal = ({ visible, onHide, onSelect, orderCd }) => {
    const serviceS020602_ORDER_REG = new ServiceS020602_ORDER_REG();
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [orders, setOrders] = useState([]);
    const [disabledRows, setDisabledRows] = useState({}); // 체크박스 비활성화 관리

    // ✅ 다이얼로그가 열릴 때 상태 초기화
    useEffect(() => {
        if (visible) {
            setSelectedOrders([]);
            fetchOrders();
        }
    }, [visible]);

    const fetchOrders = () => {
        serviceS020602_ORDER_REG
            .mgrQueryORDER_MODIFY_QRY({ ORDER_CD: orderCd })
            .then((data) => {
                if (!data.ORDER_MST_ARRAY) return;

                let tableData = [];
                let newDisabledRows = {};
                let defaultSelectedOrders = [];

                data.ORDER_MST_ARRAY.forEach((element, index) => {
                    const rowData = {
                        order: element.ORDER_MST.ORDER_CD,
                        buyerPO: element.ORDER_MST.REF_ORDER_NO,
                        country: element.ORDER_MST.NAT_NAME,
                        total: Number(
                            element.ORDER_MST.TOT_CNT,
                        ).toLocaleString(),
                        price: element.ORDER_MST.USD_PRICE,
                    };

                    tableData.push(rowData);

                    // 첫 번째 행이 "Combined Order"이면 기본 선택 + 체크박스 비활성화
                    if (index === 0 && rowData.buyerPO === "Combined Order") {
                        defaultSelectedOrders.push(rowData);
                        newDisabledRows[rowData.order] = true;
                    }
                });

                setOrders(tableData);
                setDisabledRows(newDisabledRows);
                setSelectedOrders(defaultSelectedOrders);
            });
    };

    // ✅ 개별 체크박스 렌더링 (비활성화 적용)
    const checkboxTemplate = (rowData) => {
        return (
            <Checkbox
                checked={selectedOrders.some(
                    (order) => order.order === rowData.order,
                )}
                onChange={(e) => {
                    if (!disabledRows[rowData.order]) {
                        const newSelection = e.checked
                            ? [...selectedOrders, rowData]
                            : selectedOrders.filter(
                                  (order) => order.order !== rowData.order,
                              );
                        setSelectedOrders(newSelection);
                        onSelect(newSelection);
                    }
                }}
                disabled={disabledRows[rowData.order]} // 비활성화 적용
            />
        );
    };

    // ✅ 헤더 체크박스 (전체 선택/해제)
    const headerCheckbox = () => {
        const allSelectableOrders = orders.filter(
            (order) => !disabledRows[order.order],
        );
        const isAllSelected =
            selectedOrders.length - Object.keys(disabledRows).length ===
            allSelectableOrders.length;

        return (
            <Checkbox
                checked={isAllSelected}
                onChange={(e) => {
                    if (e.checked) {
                        const newSelection = [
                            ...allSelectableOrders,
                            ...selectedOrders.filter(
                                (order) => disabledRows[order.order],
                            ),
                        ];
                        setSelectedOrders(newSelection);
                        onSelect(newSelection);
                    } else {
                        const onlyDisabledSelected = selectedOrders.filter(
                            (order) => disabledRows[order.order],
                        );
                        setSelectedOrders(onlyDisabledSelected);
                        onSelect(onlyDisabledSelected);
                    }
                }}
            />
        );
    };

    return (
        <div>
            {/* 모달 다이얼로그 */}
            <Dialog
                header="Combined Order Sheet"
                visible={visible}
                style={{ width: "550px", height: "550px" }}
                onHide={onHide}
                closeIcon={false}
                closable={false}
                dismissableMask={false}
            >
                {/* 테이블 */}
                <DataTable value={orders}>
                    <Column
                        body={checkboxTemplate}
                        header={headerCheckbox}
                        headerClassName="t-header"
                        headerStyle={{ width: "3rem" }}
                    />
                    <Column field="order" header="Order" />
                    <Column field="buyerPO" header="BuyerPO" />
                    <Column field="country" header="Country" />
                    <Column field="total" header="Total" />
                    <Column field="price" header="Price" />
                </DataTable>

                {/* 버튼 영역 */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "10px",
                    }}
                >
                    <Button
                        className="p-button-text green"
                        label="OrderSheet"
                        onClick={() => {
                            onSelect([...selectedOrders]); // 선택된 데이터 부모로 전달
                            onHide("EXEC"); // 모달 닫기
                        }}
                        style={{ width: "100px" }}
                    />
                    <Button
                        label="Exit"
                        onClick={() => {
                            onHide("EXIT"); // 모달 닫기
                        }}
                        style={{ marginLeft: "10px", width: "100px" }}
                    />
                </div>
            </Dialog>
        </div>
    );
};

// 컴포넌트 내보내기
export default CombinedOrderModal;
