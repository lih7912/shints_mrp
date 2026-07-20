/* eslint-disable */
import React, {
    useState,
    useEffect,
    useRef,
    useMemo,
    useCallback,
} from "react";
import { AFDataTable } from "../components/AFDataTable";
import { AFColumn } from "../components/AFColumn";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS0111_KCD_USER } from "../service/service_biz/ServiceS0111_KCD_USER";

const EMPTY_QRY_KCD_USER = {
    USER_CD: "",
    USER_NAME: "",
    FACTORY_CD: "",
    PART: "",
};

const EMPTY_TBL_KCD_USER = {
    id: 0,
    USER_ID: "",
    PASSWD: "",
    USER_NAME: "",
    FACTORY_NAME: "",
    FACTORY_CD: "",
    PART_NAME: "",
    PART: "",
    RANK_NAME: "",
    RANK: "",
    EMAIL: "",
    TEL_NO: "",
    CELLULAR: "",
    EMP_NO: "",
    BUYER_TEAM: "",
    USER_LEVEL: "",
    STATUS_NAME: "",
    STATUS_CD: "",
};

const EMPTY_EDT_KCD_USER = {
    id: 0,
    USER_ID: "",
    PASSWD: "",
    USER_NAME: "",
    FACTORY_CD: "",
    PART: "",
    RANK: "",
    EMAIL: "",
    TEL_NO: "",
    CELLULAR: "",
    EMP_NO: "",
    BUYER_TEAM: "",
    USER_LEVEL: "",
    STATUS_CD: "",
};

const EMPTY_PASSWORD_FORM = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
};

const CELLULAR_MAX_LENGTH = 20;

const normalizeValue = (value) => {
    if (value === null || value === undefined || value === "null") return "";
    return value;
};

const normalizeRow = (row) =>
    Object.fromEntries(
        Object.entries(row || {}).map(([key, value]) => [
            key,
            normalizeValue(value),
        ]),
    );

const normalizeUsers = (rows = []) =>
    rows.map((user) => {
        const normalized = normalizeRow(user);
        return {
            ...normalized,
            USER_LEVEL: normalized.USER_LEVEL === "2" ? "팀장" : "팀원",
        };
    });

const getOptionByKey = (options = [], key, value) =>
    options.find((item) => item?.[key] === value) || null;

const convertUserLevelToCode = (value) => {
    if (value === "팀장" || value === "2") return "2";
    if (value === "팀원" || value === "1") return "1";
    return value || "";
};

const buildEditableUserPayload = (source = {}) => {
    const {
        __typename,
        company_code,
        id,
        USER_ID,
        PASSWD,
        USER_NAME,
        FACTORY_CD,
        PART,
        RANK,
        EMAIL,
        TEL_NO,
        CELLULAR,
        EMP_NO,
        BUYER_TEAM,
        USER_LEVEL,
        STATUS_CD,
    } = source;

    return {
        id,
        USER_ID,
        PASSWD,
        USER_NAME,
        FACTORY_CD,
        PART,
        RANK,
        EMAIL,
        TEL_NO,
        CELLULAR,
        EMP_NO,
        BUYER_TEAM,
        USER_LEVEL,
        STATUS_CD,
    };
};

const getMissingRequiredUserFields = (data, selectedOptions) => {
    const missingFields = [];

    if (!(data.USER_ID || "").trim()) missingFields.push("사용자ID");
    if (!(data.PASSWD || "").trim()) missingFields.push("비밀번호");
    if (!(data.USER_NAME || "").trim()) missingFields.push("사용자명");
    if (!selectedOptions.factory) missingFields.push("소속");
    if (!selectedOptions.part) missingFields.push("부서");
    if (!(data.EMAIL || "").trim()) missingFields.push("email");
    if (!selectedOptions.rank) missingFields.push("직위");
    if (!selectedOptions.status) missingFields.push("status");
    if (!selectedOptions.level) missingFields.push("level");

    return missingFields;
};

const S0111_KCD_USER = () => {
    const serviceLib = useMemo(() => new ServiceLib(), []);
    const serviceS0111_KCD_USER = useMemo(
        () => new ServiceS0111_KCD_USER(),
        [],
    );

    const toast = useRef(null);
    const dt_TBL_KCD_USER = useRef(null);
    const dt_TBL_KCD_USER_BUYER = useRef(null);

    const [loading, setLoading] = useState(false);

    const [dataQRY_KCD_USER, setDataQRY_KCD_USER] =
        useState(EMPTY_QRY_KCD_USER);
    const [datasQRY_KCD_USER_FACTORY_CD, setDatasQRY_KCD_USER_FACTORY_CD] =
        useState([]);
    const [dataQRY_KCD_USER_FACTORY_CD, setDataQRY_KCD_USER_FACTORY_CD] =
        useState(null);

    const [datasTBL_KCD_USER, setDatasTBL_KCD_USER] = useState([]);
    const [selectedTBL_KCD_USER, setSelectedTBL_KCD_USER] = useState([]);
    const [flagSelectModeTBL_KCD_USER, setFlagSelectModeTBL_KCD_USER] =
        useState(false);

    const [datasTBL_KCD_USER_BUYER, setDatasTBL_KCD_USER_BUYER] = useState([]);

    const [dataEDT_KCD_USER, setDataEDT_KCD_USER] =
        useState(EMPTY_EDT_KCD_USER);

    const [datasEDT_KCD_USER_FACTORY_CD, setDatasEDT_KCD_USER_FACTORY_CD] =
        useState([]);
    const [dataEDT_KCD_USER_FACTORY_CD, setDataEDT_KCD_USER_FACTORY_CD] =
        useState(null);

    const [datasEDT_KCD_USER_PART, setDatasEDT_KCD_USER_PART] = useState([]);
    const [dataEDT_KCD_USER_PART, setDataEDT_KCD_USER_PART] = useState(null);

    const [datasEDT_KCD_USER_RANK, setDatasEDT_KCD_USER_RANK] = useState([]);
    const [dataEDT_KCD_USER_RANK, setDataEDT_KCD_USER_RANK] = useState(null);

    const [datasEDT_KCD_USER_LEVEL, setDatasEDT_KCD_USER_LEVEL] = useState([]);
    const [dataEDT_KCD_USER_LEVEL, setDataEDT_KCD_USER_LEVEL] = useState(null);

    const [datasEDT_KCD_USER_STATUS_CD, setDatasEDT_KCD_USER_STATUS_CD] =
        useState([]);
    const [dataEDT_KCD_USER_STATUS_CD, setDataEDT_KCD_USER_STATUS_CD] =
        useState(null);

    const [changePassWordModal, setChangePassWordModal] = useState(false);
    const [passwordForm, setPasswordForm] = useState(EMPTY_PASSWORD_FORM);

    useEffect(() => {
        serviceLib.loginConfirm();
    }, [serviceLib]);

    const showToast = useCallback((severity, summary, detail) => {
        toast.current?.show({
            severity,
            summary,
            detail,
            life: 3000,
        });
    }, []);

    const hasGraphQLError = (data) =>
        typeof data?.graphQLErrors !== "undefined";

    const hasMutationErrorCode = (response) => {
        if (!Array.isArray(response) || response.length === 0) return false;
        return response.some((item) =>
            String(item?.CODE || "")
                .toUpperCase()
                .startsWith("ERROR"),
        );
    };

    const handleInputChange = useCallback((setter) => {
        return (e, name) => {
            const value = e?.target?.value ?? "";

            setter((prev) => {
                const next = { ...prev };
                if (typeof next[name] === "number") {
                    next[name] = parseInt(value, 10) || 0;
                } else {
                    next[name] = value;
                }
                return next;
            });
        };
    }, []);

    const handleDropdownChange = useCallback((setter, key = "CD_CODE") => {
        return (e, name, optionSetter) => {
            const selectedOption = e?.value ?? null;
            const value = selectedOption?.[key] ?? "";

            setter((prev) => {
                const next = { ...prev };
                if (typeof next[name] === "number") {
                    next[name] = parseInt(value, 10) || 0;
                } else {
                    next[name] = String(value);
                }
                return next;
            });

            if (typeof optionSetter === "function") {
                optionSetter(selectedOption);
            }
        };
    }, []);

    const onInputChangeQRY = handleInputChange(setDataQRY_KCD_USER);
    const onInputChangeEDT = handleInputChange(setDataEDT_KCD_USER);
    const onPasswordFormChange = handleInputChange(setPasswordForm);

    const onDropdownChangeQRYFactory = handleDropdownChange(
        setDataQRY_KCD_USER,
        "FACTORY_CD",
    );
    const onDropdownChangeEDTFactory = handleDropdownChange(
        setDataEDT_KCD_USER,
        "FACTORY_CD",
    );
    const onDropdownChangeEDT = handleDropdownChange(
        setDataEDT_KCD_USER,
        "CD_CODE",
    );

    const clearSelectedTBL_KCD_USER = useCallback(() => {
        setSelectedTBL_KCD_USER([]);
        setFlagSelectModeTBL_KCD_USER(false);
    }, []);

    const applyEditData = useCallback(
        (argData) => {
            const nextData = {
                ...EMPTY_EDT_KCD_USER,
                ...normalizeRow(argData),
            };

            setDataEDT_KCD_USER(nextData);

            setDataEDT_KCD_USER_FACTORY_CD(
                getOptionByKey(
                    datasEDT_KCD_USER_FACTORY_CD,
                    "FACTORY_CD",
                    nextData.FACTORY_CD,
                ),
            );
            setDataEDT_KCD_USER_PART(
                getOptionByKey(
                    datasEDT_KCD_USER_PART,
                    "CD_CODE",
                    nextData.PART,
                ),
            );
            setDataEDT_KCD_USER_RANK(
                getOptionByKey(
                    datasEDT_KCD_USER_RANK,
                    "CD_CODE",
                    nextData.RANK,
                ),
            );
            setDataEDT_KCD_USER_STATUS_CD(
                getOptionByKey(
                    datasEDT_KCD_USER_STATUS_CD,
                    "CD_CODE",
                    nextData.STATUS_CD,
                ),
            );
            setDataEDT_KCD_USER_LEVEL(
                getOptionByKey(
                    datasEDT_KCD_USER_LEVEL,
                    "CD_CODE",
                    convertUserLevelToCode(nextData.USER_LEVEL),
                ),
            );
        },
        [
            datasEDT_KCD_USER_FACTORY_CD,
            datasEDT_KCD_USER_PART,
            datasEDT_KCD_USER_RANK,
            datasEDT_KCD_USER_STATUS_CD,
            datasEDT_KCD_USER_LEVEL,
        ],
    );

    const fetchBuyerList = useCallback(
        async (userId) => {
            if (!userId) {
                setDatasTBL_KCD_USER_BUYER([]);
                return;
            }

            const response =
                await serviceS0111_KCD_USER.mgrQueryTBL_KCD_USER_BUYER({
                    USER_ID: userId,
                });

            if (hasGraphQLError(response)) {
                console.log(
                    "serviceS0111_KCD_USER.mgrQueryTBL_KCD_USER_BUYER error => " +
                        JSON.stringify(response.graphQLErrors),
                );
                setDatasTBL_KCD_USER_BUYER([]);
                return;
            }

            console.log(
                "ServiceS0111_KCD_USER.mgrQueryTBL_KCD_USER_BUYER call => " +
                    response.length,
            );
            setDatasTBL_KCD_USER_BUYER(response);
        },
        [serviceS0111_KCD_USER],
    );

    const handleUserSelect = useCallback(
        async (user) => {
            if (!user) return;
            applyEditData(user);
            await fetchBuyerList(user.USER_ID);
        },
        [applyEditData, fetchBuyerList],
    );

    const searchTBL_KCD_USER = useCallback(async () => {
        clearSelectedTBL_KCD_USER();
        setLoading(true);

        try {
            const data =
                await serviceS0111_KCD_USER.mgrQueryTBL_KCD_USER(
                    dataQRY_KCD_USER,
                );

            if (hasGraphQLError(data)) {
                console.log(
                    "ServiceS0111_KCD_USER.mgrQueryTBL_KCD_USER error => " +
                        JSON.stringify(data.graphQLErrors),
                );
                showToast(
                    "error",
                    "Error",
                    "사용자 조회 중 오류가 발생했습니다.",
                );
                return;
            }

            console.log(
                "ServiceS0111_KCD_USER.mgrQueryTBL_KCD_USER call => " +
                    data.length,
            );
            setDatasTBL_KCD_USER(normalizeUsers(data));
        } finally {
            setLoading(false);
        }
    }, [
        clearSelectedTBL_KCD_USER,
        dataQRY_KCD_USER,
        serviceS0111_KCD_USER,
        showToast,
    ]);

    const getUserList = useCallback(async () => {
        setLoading(true);

        try {
            const [userData, codeData] = await Promise.all([
                serviceS0111_KCD_USER.mgrQueryTBL_KCD_USER(dataQRY_KCD_USER),
                serviceS0111_KCD_USER.mgrQueryTBL_KCD_USER_CODE(),
            ]);

            if (hasGraphQLError(userData)) {
                console.log(
                    "serviceS0111_KCD_USER.mgrQueryTBL_KCD_USER error => " +
                        JSON.stringify(userData.graphQLErrors),
                );
            } else {
                console.log(
                    "ServiceS0111_KCD_USER.mgrQueryTBL_KCD_USER call => " +
                        userData.length,
                );
                setDatasTBL_KCD_USER(normalizeUsers(userData));
            }

            if (hasGraphQLError(codeData)) {
                console.log(
                    "serviceS0111_KCD_USER.mgrQueryTBL_KCD_USER_CODE error => " +
                        JSON.stringify(codeData.graphQLErrors),
                );
            } else {
                const userLevelArr = [
                    { CD_CODE: "", CD_NAME: " " },
                    { CD_CODE: "1", CD_NAME: "팀원" },
                    { CD_CODE: "2", CD_NAME: "팀장" },
                ];

                setDatasQRY_KCD_USER_FACTORY_CD(codeData.FACTORY_CD || []);
                setDataQRY_KCD_USER_FACTORY_CD(
                    codeData.FACTORY_CD?.[0] || null,
                );

                setDatasEDT_KCD_USER_FACTORY_CD(codeData.FACTORY_CD || []);
                setDataEDT_KCD_USER_FACTORY_CD(
                    codeData.FACTORY_CD?.[0] || null,
                );

                setDatasEDT_KCD_USER_STATUS_CD(codeData.STATUS_CD || []);
                setDataEDT_KCD_USER_STATUS_CD(codeData.STATUS_CD?.[0] || null);

                setDatasEDT_KCD_USER_PART(codeData.PART || []);
                setDataEDT_KCD_USER_PART(codeData.PART?.[0] || null);

                setDatasEDT_KCD_USER_RANK(codeData.RANK || []);
                setDataEDT_KCD_USER_RANK(codeData.RANK?.[0] || null);

                setDatasEDT_KCD_USER_LEVEL(userLevelArr);
                setDataEDT_KCD_USER_LEVEL(userLevelArr[0] || null);
            }
        } finally {
            setLoading(false);
        }
    }, [dataQRY_KCD_USER, serviceS0111_KCD_USER]);

    useEffect(() => {
        getUserList();
    }, [getUserList]);

    const resetEDT_KCD_USER = useCallback(() => {
        setDataEDT_KCD_USER(EMPTY_EDT_KCD_USER);
        setDataEDT_KCD_USER_FACTORY_CD(
            getOptionByKey(datasEDT_KCD_USER_FACTORY_CD, "FACTORY_CD", ""),
        );
        setDataEDT_KCD_USER_PART(
            getOptionByKey(datasEDT_KCD_USER_PART, "CD_CODE", ""),
        );
        setDataEDT_KCD_USER_RANK(
            getOptionByKey(datasEDT_KCD_USER_RANK, "CD_CODE", ""),
        );
        setDataEDT_KCD_USER_STATUS_CD(
            getOptionByKey(datasEDT_KCD_USER_STATUS_CD, "CD_CODE", ""),
        );
        setDataEDT_KCD_USER_LEVEL(
            getOptionByKey(datasEDT_KCD_USER_LEVEL, "CD_CODE", ""),
        );
        setDatasTBL_KCD_USER_BUYER([]);
    }, [
        datasEDT_KCD_USER_FACTORY_CD,
        datasEDT_KCD_USER_PART,
        datasEDT_KCD_USER_RANK,
        datasEDT_KCD_USER_STATUS_CD,
        datasEDT_KCD_USER_LEVEL,
    ]);

    const buildSavePayload = useCallback(() => {
        const payload = buildEditableUserPayload(dataEDT_KCD_USER);

        payload.USER_LEVEL = convertUserLevelToCode(payload.USER_LEVEL);
        payload.BUYER_TEAM = payload.BUYER_TEAM || "";
        payload.CELLULAR = payload.CELLULAR || "";
        payload.EMP_NO = payload.EMP_NO || "";

        return [payload];
    }, [dataEDT_KCD_USER]);

    const saveEDT_KCD_USER_INSERT = useCallback(async () => {
        const payload = buildSavePayload();
        const response =
            await serviceS0111_KCD_USER.mgrInsertEDT_KCD_USER(payload);

        if (hasGraphQLError(response) || hasMutationErrorCode(response)) {
            console.log(
                "ServiceS0111_KCD_USER.mgrInsertEDT_KCD_USER error => " +
                    JSON.stringify(response),
            );
            showToast("error", "Error", "사용자 저장 중 오류가 발생했습니다.");
            return;
        }

        showToast("success", "Success", "사용자가 저장되었습니다.");
        await getUserList();
    }, [
        buildSavePayload,
        getUserList,
        serviceS0111_KCD_USER,
        showToast,
    ]);

    const saveEDT_KCD_USER_UPDATE = useCallback(async () => {
        const payload = buildSavePayload();
        const response =
            await serviceS0111_KCD_USER.mgrUpdateEDT_KCD_USER(payload);

        if (hasGraphQLError(response) || hasMutationErrorCode(response)) {
            console.log(
                "ServiceS0111_KCD_USER.mgrUpdateEDT_KCD_USER error => " +
                    JSON.stringify(response),
            );
            showToast("error", "Error", "사용자 수정 중 오류가 발생했습니다.");
            return;
        }

        showToast("success", "Success", "사용자 정보가 수정되었습니다.");
        await getUserList();
        resetEDT_KCD_USER();
    }, [
        buildSavePayload,
        getUserList,
        resetEDT_KCD_USER,
        serviceS0111_KCD_USER,
        showToast,
    ]);

    const saveEDT_KCD_USER = useCallback(async () => {
        const missingFields = getMissingRequiredUserFields(dataEDT_KCD_USER, {
            factory: dataEDT_KCD_USER_FACTORY_CD,
            part: dataEDT_KCD_USER_PART,
            rank: dataEDT_KCD_USER_RANK,
            status: dataEDT_KCD_USER_STATUS_CD,
            level: dataEDT_KCD_USER_LEVEL,
        });

        if ((dataEDT_KCD_USER.CELLULAR || "").length > CELLULAR_MAX_LENGTH) {
            showToast(
                "warn",
                "Warning",
                `CELLULAR는 최대 ${CELLULAR_MAX_LENGTH}자리까지 입력 가능합니다.`,
            );
            return;
        }

        if (missingFields.length > 0) {
            showToast(
                "warn",
                "Warning",
                `필수입력값을 확인해주세요: ${missingFields.join(", ")}`,
            );
            return;
        }

        if (dataEDT_KCD_USER.id <= 0) {
            await saveEDT_KCD_USER_INSERT();
        } else {
            await saveEDT_KCD_USER_UPDATE();
        }
    }, [
        dataEDT_KCD_USER,
        dataEDT_KCD_USER_FACTORY_CD,
        dataEDT_KCD_USER_PART,
        dataEDT_KCD_USER_RANK,
        dataEDT_KCD_USER_STATUS_CD,
        dataEDT_KCD_USER_LEVEL,
        saveEDT_KCD_USER_INSERT,
        saveEDT_KCD_USER_UPDATE,
        showToast,
    ]);

    const deleteEDT_KCD_USER = useCallback(async () => {
        const payload = [buildEditableUserPayload(dataEDT_KCD_USER)];

        const response =
            await serviceS0111_KCD_USER.mgrDeleteEDT_KCD_USER(payload);

        if (hasGraphQLError(response)) {
            console.log(
                "ServiceS0111_KCD_USER.mgrDeleteEDT_KCD_USER error => " +
                    JSON.stringify(response.graphQLErrors),
            );
            showToast("error", "Error", "사용자 삭제 중 오류가 발생했습니다.");
            return;
        }

        showToast("success", "Success", "사용자가 삭제되었습니다.");
        await getUserList();
        resetEDT_KCD_USER();
    }, [
        dataEDT_KCD_USER,
        getUserList,
        resetEDT_KCD_USER,
        serviceS0111_KCD_USER,
        showToast,
    ]);

    const exportExcelTBL_KCD_USER = useCallback(() => {
        import("xlsx").then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(datasTBL_KCD_USER);
            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ["data"],
            };
            const excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });

            import("file-saver").then((module) => {
                if (module?.default) {
                    const EXCEL_TYPE =
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
                    const EXCEL_EXTENSION = ".xlsx";

                    const data = new Blob([excelBuffer], { type: EXCEL_TYPE });
                    module.default.saveAs(
                        data,
                        `사용자목록_export_${new Date().getTime()}${EXCEL_EXTENSION}`,
                    );
                }
            });
        });
    }, [datasTBL_KCD_USER]);

    const onQryEnterKeyDown = useCallback(
        (e) => {
            if (e.key === "Enter") {
                searchTBL_KCD_USER();
            }
        },
        [searchTBL_KCD_USER],
    );

    const onSelectionChangeTBL_KCD_USER = useCallback(
        async (e) => {
            const nextSelection = e?.value || [];
            setFlagSelectModeTBL_KCD_USER(true);
            setSelectedTBL_KCD_USER(nextSelection);

            const selectedUser = Array.isArray(nextSelection)
                ? nextSelection[nextSelection.length - 1]
                : nextSelection;

            if (selectedUser) {
                await handleUserSelect(selectedUser);
            }
        },
        [handleUserSelect],
    );

    const onRowClickTBL_KCD_USER = useCallback(
        async (event) => {
            if (flagSelectModeTBL_KCD_USER) return;
            const selectedUser = event?.data;
            if (!selectedUser) return;
            await handleUserSelect(selectedUser);
        },
        [flagSelectModeTBL_KCD_USER, handleUserSelect],
    );

    const hideChangePassWordModal = useCallback(() => {
        setChangePassWordModal(false);
        setPasswordForm(EMPTY_PASSWORD_FORM);
    }, []);

    const showChangePassWordModal = useCallback(() => {
        setChangePassWordModal(true);
    }, []);

    const saveChangedPassword = useCallback(async () => {
        if (dataEDT_KCD_USER.id <= 0 || !(dataEDT_KCD_USER.USER_ID || "").trim()) {
            showToast("warn", "Warning", "비밀번호를 변경할 사용자를 먼저 선택해주세요.");
            return;
        }

        if (!(passwordForm.currentPassword || "").trim()) {
            showToast("warn", "Warning", "기존 비밀번호를 입력해주세요.");
            return;
        }

        if (!(passwordForm.newPassword || "").trim()) {
            showToast("warn", "Warning", "새 비밀번호를 입력해주세요.");
            return;
        }

        if (!(passwordForm.confirmPassword || "").trim()) {
            showToast("warn", "Warning", "새 비밀번호 확인을 입력해주세요.");
            return;
        }

        if (String(dataEDT_KCD_USER.PASSWD || "") !== String(passwordForm.currentPassword || "")) {
            showToast("warn", "Warning", "기존 비밀번호가 일치하지 않습니다.");
            return;
        }

        if (String(passwordForm.newPassword || "") !== String(passwordForm.confirmPassword || "")) {
            showToast("warn", "Warning", "새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
            return;
        }

        const payload = [
            {
                ...buildEditableUserPayload(dataEDT_KCD_USER),
                PASSWD: String(passwordForm.newPassword || ""),
                USER_LEVEL: convertUserLevelToCode(dataEDT_KCD_USER.USER_LEVEL),
                BUYER_TEAM: dataEDT_KCD_USER.BUYER_TEAM || "",
                CELLULAR: dataEDT_KCD_USER.CELLULAR || "",
                EMP_NO: dataEDT_KCD_USER.EMP_NO || "",
            },
        ];

        const response = await serviceS0111_KCD_USER.mgrUpdateEDT_KCD_USER(payload);

        if (hasGraphQLError(response) || hasMutationErrorCode(response)) {
            console.log(
                "ServiceS0111_KCD_USER.mgrUpdateEDT_KCD_USER(password) error => " +
                    JSON.stringify(response),
            );
            showToast("error", "Error", "비밀번호 변경 중 오류가 발생했습니다.");
            return;
        }

        setDataEDT_KCD_USER((prev) => ({
            ...prev,
            PASSWD: String(passwordForm.newPassword || ""),
        }));
        showToast("success", "Success", "비밀번호가 변경되었습니다.");
        hideChangePassWordModal();
        await getUserList();
    }, [
        buildEditableUserPayload,
        dataEDT_KCD_USER,
        getUserList,
        hideChangePassWordModal,
        passwordForm.confirmPassword,
        passwordForm.currentPassword,
        passwordForm.newPassword,
        serviceS0111_KCD_USER,
        showToast,
    ]);

    const footerContent = (
        <div>
            <Button
                label="Cancel"
                icon="pi pi-times"
                onClick={hideChangePassWordModal}
                className="p-button-text"
                size="small"
            />
            <Button
                label="Save"
                icon="pi pi-check"
                onClick={saveChangedPassword}
                autoFocus
                size="small"
            />
        </div>
    );

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "3rem" }}
            >
                <span
                    className="af-span-3-0"
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        width: "30rem",
                    }}
                >
                    <span style={{ width: "10rem", display: "inline-block" }}>
                        User ID/User Name
                    </span>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "17rem",
                        }}
                        id="id_USER_CD"
                        value={dataQRY_KCD_USER.USER_CD}
                        onChange={(e) => onInputChangeQRY(e, "USER_CD")}
                        onKeyDown={onQryEnterKeyDown}
                    />
                </span>

                <span
                    className="af-span-3-0"
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        width: "22rem",
                    }}
                >
                    <span style={{ width: "2rem", display: "inline-block" }}>
                        소속
                    </span>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "17rem",
                        }}
                    >
                        <Dropdown
                            id="id_FACTORY_CD"
                            value={dataQRY_KCD_USER_FACTORY_CD}
                            onChange={(e) =>
                                onDropdownChangeQRYFactory(
                                    e,
                                    "FACTORY_CD",
                                    setDataQRY_KCD_USER_FACTORY_CD,
                                )
                            }
                            options={datasQRY_KCD_USER_FACTORY_CD}
                            optionLabel="FACTORY_NAME"
                            placeholder=""
                            editable
                        />
                    </div>
                </span>

                <span
                    className="af-span-3-0"
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        width: "20rem",
                    }}
                >
                    <span style={{ width: "3rem", display: "inline-block" }}>
                        PART
                    </span>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                        id="id_PART"
                        value={dataQRY_KCD_USER.PART}
                        onChange={(e) => onInputChangeQRY(e, "PART")}
                        onKeyDown={onQryEnterKeyDown}
                    />
                </span>

                <div style={{ display: "inline-block", marginLeft: "1rem" }}>
                    <span className="block mt-2 md:mt-0 p-input-icon-left">
                        <Tooltip
                            className="menuCodeTooltip"
                            target="#btnSearch"
                            content="Alt+S"
                            position="bottom"
                        />
                        <Button
                            label={
                                <span>
                                    Search(<u>S</u>)
                                </span>
                            }
                            accessKey="S"
                            id="btnSearch"
                            className="p-button-text"
                            onClick={searchTBL_KCD_USER}
                            size="small"
                        />
                        <Button
                            label="Excel"
                            className="p-button-text green"
                            onClick={exportExcelTBL_KCD_USER}
                            size="small"
                        />
                    </span>
                </div>
            </div>

            <div
                className="af-div-first"
                style={{ marginTop: "1rem", width: "123rem", height: "33rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KCD_USER}
                    size="small"
                    value={datasTBL_KCD_USER}
                    tableStyle={{ tableLayout: "auto" }}
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
                    selectionMode="checkbox"
                    loading={loading}
                    selection={selectedTBL_KCD_USER}
                    onSelectionChange={onSelectionChangeTBL_KCD_USER}
                    onRowClick={onRowClickTBL_KCD_USER}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" "
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="360px"
                >
                    <AFColumn field="USER_ID" headerClassName="t-header" header="User ID" style={{ flexBasis: "auto" }} headerStyle={{ height: "1.8rem" }} bodyStyle={{ height: "1.8rem" }} />
                    <AFColumn field="USER_NAME" headerClassName="t-header" header="User Name" style={{ flexBasis: "auto" }} headerStyle={{ height: "1.8rem" }} bodyStyle={{ height: "1.8rem" }} />
                    <AFColumn field="FACTORY_NAME" headerClassName="t-header" header="Factory Name" style={{ flexBasis: "auto" }} headerStyle={{ height: "1.8rem" }} bodyStyle={{ height: "1.8rem" }} />
                    <AFColumn field="FACTORY_CD" headerClassName="t-header" header="Factory#" style={{ flexBasis: "auto" }} headerStyle={{ height: "1.8rem" }} bodyStyle={{ height: "1.8rem" }} />
                    <AFColumn field="PART_NAME" headerClassName="t-header" header="Part" style={{ flexBasis: "auto" }} headerStyle={{ height: "1.8rem" }} bodyStyle={{ height: "1.8rem" }} />
                    <AFColumn field="PART" headerClassName="t-header" header="Part#" style={{ flexBasis: "auto" }} headerStyle={{ height: "1.8rem" }} bodyStyle={{ height: "1.8rem" }} />
                    <AFColumn field="RANK_NAME" headerClassName="t-header" header="Rank" style={{ flexBasis: "auto", width: "4rem" }} headerStyle={{ height: "1.8rem" }} bodyStyle={{ height: "1.8rem" }} />
                    <AFColumn field="USER_LEVEL" headerClassName="t-header" header="Level" style={{ flexBasis: "auto" }} headerStyle={{ height: "1.8rem" }} bodyStyle={{ height: "1.8rem" }} />
                    <AFColumn field="EMAIL" headerClassName="t-header" header="Email" style={{ flexBasis: "auto" }} headerStyle={{ height: "1.8rem" }} bodyStyle={{ height: "1.8rem" }} />
                    <AFColumn field="TEL_NO" headerClassName="t-header" header="Tel NO" style={{ flexBasis: "auto" }} headerStyle={{ height: "1.8rem" }} bodyStyle={{ height: "1.8rem" }} />
                    <AFColumn field="CELLULAR" headerClassName="t-header" header="Cell NO" style={{ flexBasis: "auto" }} headerStyle={{ height: "1.8rem" }} bodyStyle={{ height: "1.8rem" }} />
                    <AFColumn field="EMP_NO" headerClassName="t-header" header="EMP NO" style={{ flexBasis: "auto" }} headerStyle={{ height: "1.8rem" }} bodyStyle={{ height: "1.8rem" }} />
                    <AFColumn field="BUYER_TEAM" headerClassName="t-header" header="BUYER Team" style={{ flexBasis: "auto" }} headerStyle={{ height: "1.8rem" }} bodyStyle={{ height: "1.8rem" }} />
                    <AFColumn field="STATUS_NAME" headerClassName="t-header" header="Status" style={{ flexBasis: "auto" }} headerStyle={{ height: "1.8rem" }} bodyStyle={{ height: "1.8rem" }} />
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{
                    width: "123rem",
                    height: "30rem",
                    marginTop: "0.5rem",
                }}
            >
                <div className="flex mt-6">
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "32rem",
                            marginLeft: "10rem",
                        }}
                    >
                        <div style={{ display: "flex" }} className="mt-2">
                            <span style={{ width: "6rem", display: "flex" }}>
                                사용자 ID
                            </span>
                            <InputText
                                style={{
                                    display: "inline-block",
                                    width: "18rem",
                                }}
                                id="id_USER_ID"
                                value={dataEDT_KCD_USER.USER_ID}
                                onChange={(e) => onInputChangeEDT(e, "USER_ID")}
                            />
                        </div>

                        <div style={{ display: "flex" }} className="mt-2">
                            <span style={{ width: "6rem", display: "flex" }}>
                                사용자명
                            </span>
                            <InputText
                                style={{ display: "flex", width: "18rem" }}
                                value={dataEDT_KCD_USER.USER_NAME}
                                onChange={(e) =>
                                    onInputChangeEDT(e, "USER_NAME")
                                }
                            />
                        </div>

                        <div style={{ display: "flex" }} className="mt-2">
                            <span style={{ width: "6rem", display: "flex" }}>
                                부서
                            </span>
                            <Dropdown
                                id="id_PART"
                                style={{ width: "18rem" }}
                                value={dataEDT_KCD_USER_PART}
                                onChange={(e) =>
                                    onDropdownChangeEDT(
                                        e,
                                        "PART",
                                        setDataEDT_KCD_USER_PART,
                                    )
                                }
                                options={datasEDT_KCD_USER_PART}
                                optionLabel="CD_NAME"
                                placeholder=""
                            />
                        </div>

                        <div style={{ display: "flex" }} className="mt-2">
                            <span style={{ width: "6rem", display: "flex" }}>
                                직위
                            </span>
                            <Dropdown
                                id="id_RANK"
                                style={{ width: "18rem" }}
                                value={dataEDT_KCD_USER_RANK}
                                onChange={(e) =>
                                    onDropdownChangeEDT(
                                        e,
                                        "RANK",
                                        setDataEDT_KCD_USER_RANK,
                                    )
                                }
                                options={datasEDT_KCD_USER_RANK}
                                optionLabel="CD_NAME"
                                placeholder=""
                            />
                        </div>

                        <div style={{ display: "flex" }} className="mt-2">
                            <span style={{ width: "6rem", display: "flex" }}>
                                Level
                            </span>
                            <Dropdown
                                id="id_USER_LEVEL"
                                style={{ width: "18rem" }}
                                value={dataEDT_KCD_USER_LEVEL}
                                onChange={(e) =>
                                    onDropdownChangeEDT(
                                        e,
                                        "USER_LEVEL",
                                        setDataEDT_KCD_USER_LEVEL,
                                    )
                                }
                                options={datasEDT_KCD_USER_LEVEL}
                                optionLabel="CD_NAME"
                                placeholder=""
                            />
                        </div>

                        <div style={{ display: "flex" }} className="mt-2">
                            <span style={{ width: "6rem", display: "flex" }}>
                                TEL NO
                            </span>
                            <InputText
                                style={{ display: "flex", width: "18rem" }}
                                value={dataEDT_KCD_USER.TEL_NO}
                                onChange={(e) => onInputChangeEDT(e, "TEL_NO")}
                            />
                        </div>

                        <div style={{ display: "flex" }} className="mt-2">
                            <span style={{ width: "6rem", display: "flex" }}>
                                Byr.TEAM
                            </span>
                            <InputText
                                style={{ display: "flex", width: "18rem" }}
                                value={dataEDT_KCD_USER.BUYER_TEAM}
                                onChange={(e) =>
                                    onInputChangeEDT(e, "BUYER_TEAM")
                                }
                            />
                        </div>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "32rem",
                        }}
                    >
                        <div style={{ display: "flex" }} className="mt-2">
                            <span
                                onDoubleClick={() =>
                                    alert(dataEDT_KCD_USER.PASSWD)
                                }
                                style={{ width: "6rem", display: "flex" }}
                            >
                                비밀번호
                            </span>
                            <Password
                                style={{
                                    display: "inline-block",
                                    width: "18rem",
                                }}
                                inputStyle={{ width: "18rem" }}
                                id="id_PASSWD"
                                value={dataEDT_KCD_USER.PASSWD}
                                onChange={(e) => onInputChangeEDT(e, "PASSWD")}
                            />
                            <Button
                                label="Change PW"
                                style={{ width: "7rem" }}
                                className="p-button-text"
                                onClick={showChangePassWordModal}
                            />
                        </div>

                        <div style={{ display: "flex" }} className="mt-2">
                            <span style={{ width: "6rem", display: "flex" }}>
                                소속
                            </span>
                            <Dropdown
                                id="id_FACTORY_CD"
                                style={{ width: "18rem" }}
                                value={dataEDT_KCD_USER_FACTORY_CD}
                                onChange={(e) =>
                                    onDropdownChangeEDTFactory(
                                        e,
                                        "FACTORY_CD",
                                        setDataEDT_KCD_USER_FACTORY_CD,
                                    )
                                }
                                options={datasEDT_KCD_USER_FACTORY_CD}
                                optionLabel="FACTORY_NAME"
                                placeholder=""
                            />
                        </div>

                        <div style={{ display: "flex" }} className="mt-2">
                            <span style={{ width: "6rem", display: "flex" }}>
                                Email
                            </span>
                            <InputText
                                style={{ display: "flex", width: "18rem" }}
                                value={dataEDT_KCD_USER.EMAIL}
                                onChange={(e) => onInputChangeEDT(e, "EMAIL")}
                            />
                        </div>

                        <div style={{ display: "flex" }} className="mt-2">
                            <span style={{ width: "6rem", display: "flex" }}>
                                Status
                            </span>
                            <Dropdown
                                id="id_STATUS_CD"
                                style={{ width: "18rem" }}
                                value={dataEDT_KCD_USER_STATUS_CD}
                                onChange={(e) =>
                                    onDropdownChangeEDT(
                                        e,
                                        "STATUS_CD",
                                        setDataEDT_KCD_USER_STATUS_CD,
                                    )
                                }
                                options={datasEDT_KCD_USER_STATUS_CD}
                                optionLabel="CD_NAME"
                                placeholder=""
                            />
                        </div>

                        <div style={{ display: "flex" }} className="mt-2">
                            <span style={{ width: "6rem", display: "flex" }}>
                                CELLULAR
                            </span>
                            <InputText
                                style={{ display: "flex", width: "18rem" }}
                                value={dataEDT_KCD_USER.CELLULAR}
                                maxLength={CELLULAR_MAX_LENGTH}
                                onChange={(e) =>
                                    onInputChangeEDT(e, "CELLULAR")
                                }
                            />
                        </div>

                        <div style={{ display: "flex" }} className="mt-2">
                            <span style={{ width: "6rem", display: "flex" }}>
                                EMP NO
                            </span>
                            <InputText
                                style={{ display: "flex", width: "18rem" }}
                                value={dataEDT_KCD_USER.EMP_NO}
                                onChange={(e) => onInputChangeEDT(e, "EMP_NO")}
                            />
                        </div>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "33rem",
                            marginLeft: "10rem",
                            height: "20rem",
                        }}
                    >
                        <AFDataTable preventUnrelatedRerender
                            ref={dt_TBL_KCD_USER_BUYER}
                            size="small"
                            value={datasTBL_KCD_USER_BUYER}
                            scrollable
                            scrollHeight="20rem"
                            resizableColumns
                            columnResizeMode="expand"
                            showGridlines
                            loading={loading}
                            emptyMessage=" "
                            responsiveLayout="scroll"
                        >
                            <AFColumn field="BUYER_CD" headerClassName="t-header" header="BUYER" style={{ flexBasis: "auto" }} headerStyle={{ height: "1.8rem" }} bodyStyle={{ height: "1.8rem" }} />
                            <AFColumn field="FACTORY" headerClassName="t-header" header="FACTORY" style={{ flexBasis: "auto" }} headerStyle={{ height: "1.8rem" }} bodyStyle={{ height: "1.8rem" }} />
                            <AFColumn field="TEAM" headerClassName="t-header" header="JOB" style={{ flexBasis: "auto" }} headerStyle={{ height: "1.8rem" }} bodyStyle={{ height: "1.8rem" }} />
                        </AFDataTable>
                    </div>
                </div>

                <div
                    className="field col-6 md:col-6 mt-5"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "0.75rem",
                        width: "100%",
                        flexWrap: "nowrap",
                    }}
                >
                    <Button
                        style={{ width: "9rem" }}
                        label="Save"
                        className="p-button-text"
                        onClick={saveEDT_KCD_USER}
                    />
                    <Button
                        style={{ width: "9rem" }}
                        label="Reset"
                        className="p-button-text"
                        onClick={resetEDT_KCD_USER}
                    />
                    <Button
                        style={{ width: "9rem" }}
                        label="Delete"
                        className="p-button-text"
                        onClick={deleteEDT_KCD_USER}
                    />
                </div>
            </div>

            <div style={{ width: "123rem", height: "2rem" }}>
                <div className="formgrid grid" />
            </div>

            <Divider />

            <Toast ref={toast} />

            <Dialog
                header="비밀번호 변경"
                footer={footerContent}
                visible={changePassWordModal}
                modal={false}
                style={{ width: "24rem" }}
                onHide={hideChangePassWordModal}
            >
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "flex",
                    }}
                >
                    <p style={{ width: "12rem", display: "inline-block" }}>기존 비밀번호</p>
                    <Password
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        value={passwordForm.currentPassword}
                        onChange={(e) =>
                            onPasswordFormChange(e, "currentPassword")
                        }
                        feedback={false}
                    />
                </span>

                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "flex",
                    }}
                >
                    <p style={{ width: "12rem", display: "inline-block" }}>새 비밀번호</p>
                    <Password
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        value={passwordForm.newPassword}
                        onChange={(e) => onPasswordFormChange(e, "newPassword")}
                    />
                </span>

                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "flex",
                    }}
                >
                    <p style={{ width: "12rem", display: "inline-block" }}>새 비밀번호 확인</p>
                    <Password
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        value={passwordForm.confirmPassword}
                        onChange={(e) =>
                            onPasswordFormChange(e, "confirmPassword")
                        }
                    />
                </span>
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0111_KCD_USER, comparisonFn);
