/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { useParams } from "react-router-dom";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import { Tree } from "primereact/tree";
import { Dialog } from "primereact/dialog";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { Tooltip } from "primereact/tooltip";
import { Rnd } from "react-rnd";

import Swal from "sweetalert2";
import { blindMenu } from "./blindMenu";
import { getMrpWorkingStatus } from "./getMrpWorkingStatus";
import { changePassword, getPassword } from "./changePassword";
import apolloOption from "./assets/env_graphql";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";

const menu1 = require("./menu").menu1;
const menu3 = require("./menu").menu3;

import $ from "jquery";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "./assets/layout/layout.scss";
import "./App.scss";

import logo from "./assets/shints_logo_transparent.png";

let userInfoForAuth = {};
let prismaDate = "";

$(async function () {
    showTestEnvLabel(window);
});

function refreshOffset() {
    let total = 0;

    const userInfoH = $("#userInfoWrapper").outerHeight() || 0;
    const menuTopH = $("#menuTopWrapper").outerHeight() || 0;

    const favoritesH = $("#favoritesWrapper").outerHeight() || 0;
    total = userInfoH + menuTopH + favoritesH + 25;

    setTimeout(() => {
        $(":root").css("--dynamicOffset", total + "px");
    }, 100);
}
$(window).on("load resize", refreshOffset);

refreshOffset();

window.addEventListener("message", function (event) {
    if (event.origin === `https://${window.location.hostname}:3201`) {
        if (event.data === "focusParent") {
            window.focus(); // 부모 프레임에 포커스
            console.log("Parent frame focused!");
            $(".p-tabmenu").fadeOut(200).fadeIn(200);
        }

        if (event.data === "WorkingMrp") {
            console.log("Working MrpEVENT 수신");
            getMrpWorkingStatus(window, apolloOption, userInfoForAuth);
        }
    }
});

function showTestEnvLabel(window) {
    if (!window.location.host.includes("erp.shints.com")) {
        $(".testEnvLabel").css("display", "block");
    }
}

function clearAllColumnOrders(activeIndex) {
    const confirmMessage =
        "현재 탭의 컬럼 순서정보만 삭제하시겠습니까?\nDo you want to delete column order only for the active tab?";
    if (confirm(confirmMessage)) {
        const iframe = document.getElementById(`tabIframe-${activeIndex}`);
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage(
                { type: "CLEAR_AF_COLUMNS_ACTIVE" },
                "*",
            );
        } else {
            console.warn(`iframe with id "tabIframe-${activeIndex}" not found.`);
        }
    }
}

const App = () => {
    const formatDateTime = (date) => {
        const pad = (n) => String(n).padStart(2, "0");
        const y = date.getFullYear();
        const m = pad(date.getMonth() + 1);
        const d = pad(date.getDate());
        const hh = pad(date.getHours());
        const mm = pad(date.getMinutes());
        const ss = pad(date.getSeconds());

        return `${y}${m}${d} ${hh}:${mm}:${ss}`;
    };

    const MATL_RECORD_CODE_CACHE_KEY = "S0301_MATL_RECORD_CODE_CACHE";
    const [tabs, setTabs] = useState([]);
    const tabsRef = useRef([]);
    const toast = useRef(null);
    const [userInfo, setUserInfo] = useState({});
    const [menuInfo, setMenuInfo] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [sseLastMsg, setSseLastMsg] = useState("");
    const [sseLastTime, setSseLastTime] = useState("");
    const [sseDialogVisible, setSseDialogVisible] = useState(false);
    const [sendDialogVisible, setSendDialogVisible] = useState(false);
    const [sendMessage, setSendMessage] = useState("");
    const [currentDateTime, setCurrentDateTime] = useState(() =>
        formatDateTime(new Date()),
    );
    const DEFAULT_NOTICE_MESSAGE =
        "개발팀이 수정내용을 5분안에 반영합니다. 서버가 재시작되면 화면의 내용을 잃을 수 있고 잠시 작동이 멈출 수 있습니다.";

    const BASE_URL = `https://${window.location.hostname}:3201/#/`;

    const buildTabUrl = (url1, label) => {
        if (!url1) return "";

        const tBase = `${BASE_URL}${url1}`;
        if (!label) return tBase;

        const tSep = tBase.includes("?") ? "&" : "?";
        return `${tBase}${tSep}label=${encodeURI(label)}`;
    };

    function getCookie(name) {
        const cookies = document.cookie.split("; ");

        for (let cookie of cookies) {
            const [key, value] = cookie.split("=");
            if (key === name) {
                return decodeURIComponent(value); // 쿠키 값이 인코딩된 경우 해제
            }
        }
        return null; // 해당 쿠키가 없으면 null 반환
    }

    function deleteCookie(name) {
        document.cookie =
            name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    useEffect(() => {
        tabsRef.current = tabs;
    }, [tabs]);

    useEffect(() => {
        const updateDateTime = () => {
            setCurrentDateTime(formatDateTime(new Date()));
        };

        updateDateTime();
        const timer = setInterval(updateDateTime, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        // Ignore all file drag/drop interactions in menu UI.
        const blockDragEvent = (e) => {
            e.preventDefault();
            e.stopPropagation();
        };

        const dragEvents = ["dragenter", "dragover", "dragleave", "drop"];
        dragEvents.forEach((eventName) => {
            document.addEventListener(eventName, blockDragEvent, true);
        });

        return () => {
            dragEvents.forEach((eventName) => {
                document.removeEventListener(eventName, blockDragEvent, true);
            });
        };
    }, []);

    useEffect(() => {
        // 쿠키에서 사용자 정보 가져오기
        let userId = new URLSearchParams(location.hash.split("?")[1]).get(
            "userId",
        );

        if (userId) {
            window.sessionStorage.setItem("SESSION_USER_ID", userId);
        } else {
            userId = window.sessionStorage.getItem("SESSION_USER_ID");
        }

        let userInfoFromLogin = JSON.parse(
            getCookie(`AF_ERP_USERINFO_${userId}`),
        );

        if (userInfoFromLogin) {
            userInfoForAuth.userId = userInfoFromLogin.USER_ID;
            userInfoForAuth.userName = userInfoFromLogin.USER_NAME;
            setUserInfo(userInfoFromLogin);
            history.pushState({}, "", "/#/");
        } else {
            window.location.href = `${window.location.protocol}//${window.location.hostname}:${apolloOption.client_port}/#/login`;
            return;
        }

        const transformMenuUrls = (menu) => {
            return menu.map((item) => ({
                ...item,
                url: item.url ? buildTabUrl(item.url, item.label) : "",
                children: item.children ? transformMenuUrls(item.children) : [],
            }));
        };

        const updatedMenu1 = transformMenuUrls(menu1);
        setMenuInfo(updatedMenu1);

        window.addEventListener(
            "message",
            (e) => {
                if (!e?.data || typeof e.data !== "object") return;

                // Debug: log all messages
                console.log("Menu received message:", e.data.func, e.data);

                if (e.data.func && e.data.func === "call_url") {
                    const tMessage = e.data.message || {};
                    console.log(tMessage);

                    // Hard bypass for S0301: if opened already, focus existing tab only.
                    const tUrl1 = String(tMessage.url1 || "");
                    const tRoute = tUrl1.split("?")[0] || "";
                    if (tRoute === "S0301_MATL_RECORD") {
                        const tTargetIdx = tabsRef.current.findIndex((tab) =>
                            String(tab?.url || "").includes(
                                "#/S0301_MATL_RECORD",
                            ),
                        );

                        if (tTargetIdx >= 0) {
                            setActiveIndex(tTargetIdx);

                            // Legacy fallback: extract MATL_CD from query and forward.
                            const tQuery = tUrl1.includes("?")
                                ? tUrl1.split("?")[1]
                                : "";
                            const tParams = new URLSearchParams(tQuery);
                            const tMatlCd = (tParams.get("MATL_CD") || "").trim();

                            if (tMatlCd) {
                                const tTargetIframe = document.getElementById(
                                    `tabIframe-${tTargetIdx}`,
                                );
                                if (tTargetIframe?.contentWindow) {
                                    tTargetIframe.contentWindow.postMessage(
                                        {
                                            func: "s0301_set_matl_cd",
                                            message: {
                                                MATL_CD: tMatlCd,
                                                SOURCE: "LEGACY_CALL_URL",
                                                TS: Date.now(),
                                            },
                                        },
                                        "*",
                                    );
                                }
                            }

                            return;
                        }
                    }

                    openTab(tMessage);
                }

                if (e.data.func && e.data.func === "s0301_set_matl_cd") {
                    const tMessage = e.data.message || {};
                    const tTargetPage = "S0301_MATL_RECORD";

                    const tTargetIdx = tabsRef.current.findIndex((tab) =>
                        String(tab?.url || "").includes(`#/${tTargetPage}`),
                    );

                    if (tTargetIdx >= 0) {
                        setActiveIndex(tTargetIdx);

                        const tTargetIframe = document.getElementById(
                            `tabIframe-${tTargetIdx}`,
                        );
                        if (tTargetIframe?.contentWindow) {
                            tTargetIframe.contentWindow.postMessage(
                                {
                                    func: "s0301_set_matl_cd",
                                    message: tMessage,
                                },
                                "*",
                            );
                        }
                    }
                }

                if (
                    e.data.func &&
                    e.data.func === "mrp_requery_parent_center"
                ) {
                    const tSource = String(
                        e?.data?.message?.SOURCE || "",
                    ).toUpperCase();
                    const tMessage = e?.data?.message || {};
                    const tTargetPage =
                        tSource === "S0303"
                            ? "S0303_MRP_RECORD_STYLE"
                            : "S0306_MRP_BY_ORDER";

                    const tParams = [];
                    if (tMessage.STYLE_CD)
                        tParams.push(
                            `STYLE_CD=${encodeURIComponent(tMessage.STYLE_CD)}`,
                        );
                    if (tMessage.ORDER_CD)
                        tParams.push(
                            `ORDER_CD=${encodeURIComponent(tMessage.ORDER_CD)}`,
                        );
                    if (tMessage.ORDER_MRP_SEQ)
                        tParams.push(
                            `ORDER_MRP_SEQ=${encodeURIComponent(
                                tMessage.ORDER_MRP_SEQ,
                            )}`,
                        );

                    const tTargetUrl1 =
                        tParams.length > 0
                            ? `${tTargetPage}?${tParams.join("&")}`
                            : tTargetPage;

                    const tTargetMeta =
                        tSource === "S0303"
                            ? {
                                  key: "2-3",
                                  label: "MRP Record(Style)",
                                  icon: "pi pi-fw pi-user-edit",
                                  url1: tTargetUrl1,
                              }
                            : {
                                  key: "2-6",
                                  label: "MRP Record(Order)",
                                  icon: "pi pi-fw pi-user-edit",
                                  url1: tTargetUrl1,
                              };

                    const tTargetIdx = tabsRef.current.findIndex((tab) =>
                        String(tab?.url || "").includes(`#/${tTargetPage}`),
                    );

                    if (tTargetIdx >= 0) {
                        setActiveIndex(tTargetIdx);
                    } else {
                        openTab(tTargetMeta);
                    }

                    const postToAllIframes = () => {
                        const iframes = Array.from(
                            document.querySelectorAll('iframe[id^="tabIframe-"]'),
                        );

                        iframes.forEach((iframe) => {
                            if (iframe?.contentWindow) {
                                iframe.contentWindow.postMessage(e.data, "*");
                            }
                        });
                    };

                    postToAllIframes();
                    setTimeout(() => postToAllIframes(), 350);
                }

                if (
                    e.data.func &&
                    e.data.func === "requery_s0305_mrp_manager"
                ) {
                    const postToS0305Iframes = () => {
                        const iframes = Array.from(
                            document.querySelectorAll('iframe[id^="tabIframe-"]'),
                        ).filter((iframe) =>
                            String(iframe?.src || "").includes(
                                "#/S0305_MRP_MANAGER",
                            ),
                        );

                        iframes.forEach((iframe) => {
                            if (iframe?.contentWindow) {
                                iframe.contentWindow.postMessage(e.data, "*");
                            }
                        });
                    };

                    postToS0305Iframes();
                    setTimeout(() => postToS0305Iframes(), 350);
                }

                if (
                    e.data.func &&
                    e.data.func === "close_tabs_and_activate_mrp_manager"
                ) {
                    const tMessage = e.data.message || {};
                    const tabsToClose = tMessage.tabsToClose || [];
                    const activateTabName = tMessage.activateTab || "";

                    // Get current tabs
                    const currentTabs = tabsRef.current || [];

                    // Find indices of tabs to close
                    const indicesToRemove = [];
                    tabsToClose.forEach((tabNameToClose) => {
                        const idx = currentTabs.findIndex(
                            (tab) =>
                                String(tab?.label || "").includes(
                                    tabNameToClose,
                                ),
                        );
                        if (idx !== -1) {
                            indicesToRemove.push(idx);
                        }
                    });

                    // Remove duplicates and sort in descending order
                    const uniqueIndices = [...new Set(indicesToRemove)].sort(
                        (a, b) => b - a,
                    );

                    console.log("Tabs to close:", tabsToClose);
                    console.log("Indices to remove:", uniqueIndices);
                    console.log("Current tabs:", currentTabs);

                    // Remove tabs one by one from highest index (to avoid index shift)
                    if (uniqueIndices.length > 0) {
                        setTabs((prevTabs) => {
                            let newTabs = [...prevTabs];
                            uniqueIndices.forEach((idx) => {
                                newTabs.splice(idx, 1);
                            });

                            // Adjust activeIndex after removing tabs
                            setActiveIndex((prevIdx) => {
                                const minRemovedIdx = uniqueIndices[
                                    uniqueIndices.length - 1
                                ];
                                const maxRemovedIdx = uniqueIndices[0];

                                let newActiveIdx = prevIdx;

                                // If active tab was removed
                                if (
                                    prevIdx >= minRemovedIdx &&
                                    prevIdx <= maxRemovedIdx
                                ) {
                                    newActiveIdx = Math.max(
                                        0,
                                        newTabs.length - 1,
                                    );
                                } else if (prevIdx > maxRemovedIdx) {
                                    // Active tab is after removed tabs
                                    newActiveIdx = prevIdx - uniqueIndices.length;
                                }

                                return newActiveIdx;
                            });

                            return newTabs;
                        });
                    }

                    // Activate MRP Manager tab after tabs are closed
                    if (activateTabName) {
                        setTimeout(() => {
                            // Use current tabs (which may have been updated)
                            const updatedTabs = tabsRef.current || [];
                            const targetIdx = updatedTabs.findIndex(
                                (tab) =>
                                    String(tab?.label || "").includes(
                                        activateTabName,
                                    ),
                            );

                            console.log(
                                "Activating tab:",
                                activateTabName,
                                "at index:",
                                targetIdx,
                            );

                            if (targetIdx >= 0) {
                                setActiveIndex(targetIdx);
                            }
                        }, 200);
                    }
                }
            },
            false,
        );

        $('input[type="text"]').on("focus", function () {
            $(this).select(); // 포커스된 input 요소의 내용을 전체 선택
        });
    }, []);

    useEffect(() => {
        const blockF5 = (e) => {
            if (e.key === "F5" || e.keyCode === 116) {
                e.preventDefault();
                e.stopPropagation();
            }
        };

        window.addEventListener("keydown", blockF5, true);

        return () => {
            window.removeEventListener("keydown", blockF5, true);
        };
    }, []);

    useEffect(() => {
        const eventUrl = `https://${window.location.hostname}:${apolloOption.server_port}/restapi/events`;
        const evtSource = new EventSource(eventUrl);
        let hasLoggedConnectionError = false;
        let hasConnected = false;

        evtSource.onopen = () => {
            hasConnected = true;
            hasLoggedConnectionError = false;
            console.log("[SSE] Connected");
        };

        evtSource.onmessage = (e) => {
            try {
                const data = JSON.parse(e.data || "{}");
                const msg = data.msg || "알림";
                setSseLastMsg(msg);
                setSseLastTime(new Date().toLocaleTimeString());
                setSseDialogVisible(true);
            } catch (err) {
                console.error("SSE parse error", err);
            }
        };

        evtSource.onerror = (err) => {
            const isConnectedError = hasConnected;
            if (!hasLoggedConnectionError) {
                console.warn(`[SSE] ${isConnectedError ? 'Disconnected' : 'Connection Failed'}. Status: ${evtSource.readyState}`);
                hasLoggedConnectionError = true;
            }
            hasConnected = false;
        };

        return () => {
            evtSource.close();
            console.log("[SSE] Closed");
        };
    }, []);

    const sendSseNotification = async () => {
        const message = (sendMessage || "").trim();

        try {
            await axios.post(
                `${window.location.protocol}//${window.location.hostname}:${apolloOption.server_port}/restapi/events/send`,
                { message },
            );
            setSendDialogVisible(false);
            setSendMessage("");
        } catch (err) {
            console.error("SSE send error", err);
            Swal.fire({
                icon: "error",
                html: "알림 전송에 실패했습니다.",
            });
        }
    };

    const openTab = (item) => {
        if (item.url1) {
            item.url = buildTabUrl(item.url1, item.label);
        }
        if (!item.url) return;

        const getRoutePath = (url) => {
            const tUrl = String(url || "");
            const tHashIdx = tUrl.indexOf("#/");
            if (tHashIdx < 0) return "";

            const tRouteWithQuery = tUrl.substring(tHashIdx + 2);
            return tRouteWithQuery.split("?")[0] || "";
        };

        const tRequestedRoute =
            getRoutePath(buildTabUrl(item.url1 || "", item.label)) ||
            getRoutePath(item.url);
        const tAlwaysReuseRoutes = ["S0301_MATL_RECORD"];
        const tShouldForceReuse = tAlwaysReuseRoutes.includes(tRequestedRoute);

        setTabs((prevTabs) => {
            let existingTabIndex = prevTabs.findIndex(
                (tab) => tab.label === item.label,
            );

            if ((item.keepStateIfOpen || tShouldForceReuse) && tRequestedRoute) {
                const tRouteMatchIndex = prevTabs.findIndex((tab) => {
                    const tTabRoute = getRoutePath(tab?.url);
                    return tTabRoute === tRequestedRoute;
                });

                if (tRouteMatchIndex >= 0) {
                    existingTabIndex = tRouteMatchIndex;
                }
            }

            if (existingTabIndex === -1) {
                if (prevTabs.length >= 10) {
                    toast.current.show({
                        severity: "error",
                        summary: "Error",
                        detail: "탭은 10개까지 열 수 있습니다. 열린 탭을 닫고 새로 열어주세요. (Alt+X)",
                        life: 5000,
                    });
                    return prevTabs;
                }
                item.idx = `${item.label}-${new Date().getTime()}`;
                item.key = `${item.idx}-key-${new Date().getTime()}`; // 강제 리렌더링을 위한 key 추가
                const newTabs = [...prevTabs, item];
                setActiveIndex(newTabs.length - 1);
                return newTabs;
            } else {
                if (item.keepStateIfOpen || tShouldForceReuse) {
                    // Keep existing iframe state and just focus the tab.
                    setActiveIndex(existingTabIndex);
                    return prevTabs;
                }

                // 기존 탭이 있으면 URL을 업데이트하면서 key도 변경하여 리렌더링 유도
                const updatedTabs = prevTabs.map((tab, index) => {
                    if (index === existingTabIndex) {
                        return {
                            ...tab,
                            url: item.url,
                            key: `${tab.idx}-key-${new Date().getTime()}`,
                        };
                    }
                    return tab;
                });

                setActiveIndex(existingTabIndex);
                return updatedTabs;
            }
        });
    };

    // 탭 닫기 (iframe도 삭제)
    const removeTab = (index) => {
        const tRunRemove = () => {
            // 현재 탭 목록에서 해당 인덱스의 탭 제거
            const newTabs = tabs.filter((_, i) => i !== index);
            setTabs(newTabs);

            if (index === 0 && newTabs.length > 0) {
                // 첫번째 탭이 닫혔을 때: 남은 탭의 첫번째(원래 두번째 탭)를 활성화
                setActiveIndex(0);
            } else if (index < activeIndex) {
                // 닫은 탭이 현재 활성 탭보다 앞쪽에 있다면, 인덱스가 한 칸씩 당겨지므로 activeIndex 조정
                setActiveIndex(activeIndex - 1);
            } else if (index === activeIndex) {
                // 닫은 탭이 현재 활성 탭일 경우: 남은 탭이 있다면 동일 인덱스 유지, 없으면 마지막 탭 활성화
                if (newTabs.length > activeIndex) {
                    setActiveIndex(activeIndex);
                } else {
                    setActiveIndex(newTabs.length - 1);
                }
            }
        };

        const tClosedTab = tabs[index];
        const tClosedUrl = String(tClosedTab?.url || "");
        if (tClosedUrl.includes("#/S0301_MATL_RECORD")) {
            window.sessionStorage.removeItem(MATL_RECORD_CODE_CACHE_KEY);

            const tTargetIframe = document.getElementById(`tabIframe-${index}`);
            if (tTargetIframe?.contentWindow) {
                tTargetIframe.contentWindow.postMessage(
                    { func: "s0301_clear_code_cache" },
                    "*",
                );
            }

            setTimeout(tRunRemove, 120);
            return;
        }

        tRunRemove();
    };

    const [expandedKeys, setExpandedKeys] = useState({});

    const onToggleNode = (node) => {
        openTab(node);
        setExpandedKeys((prevExpandedKeys) => {
            const newExpandedKeys = { ...prevExpandedKeys };
            if (newExpandedKeys[node.key]) {
                delete newExpandedKeys[node.key]; // 이미 확장되어 있다면 닫기
            } else {
                newExpandedKeys[node.key] = true; // 닫혀 있다면 열기
            }
            return newExpandedKeys;
        });
    };

    /* 패스워드 변경 */
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const validatePassword = (password) => {
        const lengthCheck = password.length >= 8;
        const complexityCheck =
            /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(
                password,
            );
        const hasNoSequential =
            !/(1111|0123|1234|2345|3456|4567|5678|6789|7890|abcd|bcde|cdef|defg|efgh|fghi|ghij|hijk|ijkl|jklm|klmn|lmno|mnop|nopq|opqr|pqrs|qrst|rstu|stuv|tuvw|uvwx|vwxy|wxyz|aaaa|bbbb|cccc|dddd|eeee|ffff|gggg|hhhh|iiii|jjjj|kkkk|llll|mmmm|nnnn|oooo|pppp|qqqq|rrrr|ssss|tttt|uuuu|vvvv|wwww|xxxx|yyyy|zzzz)/i.test(
                password,
            );
        return lengthCheck && complexityCheck && hasNoSequential;
    };

    const handleSave = async () => {
        let result = (
            await getPassword(window, apolloOption, userInfoForAuth.userId)
        )[0].passwd;

        console.log(result);

        if (currentPassword !== result) {
            Swal.fire({
                html: "Wrong current password!",
                icon: "error",
            });
            return;
        }

        if (newPassword !== confirmPassword) {
            Swal.fire({
                title: "Confirm new password",
                html: "Passwords do not match!",
            });
            return;
        }

        if (!validatePassword(newPassword)) {
            Swal.fire({
                title: "Confirm new password",
                html: "Password must be at least 8 characters, include letters, numbers, and special characters, and must not contain 4 consecutive characters.<br><br>비밀번호는 최소 8자 이상이어야 하며, 영문자, 숫자, 특수문자를 포함해야 합니다. 또한, 4자리 이상의 연속된 문자를 포함할 수 없습니다.",
                icon: "error",
            });
            return;
        }

        await changePassword(
            window,
            apolloOption,
            userInfoForAuth.userId,
            newPassword,
            currentPassword,
        );

        Swal.fire({
            html: "Password changed successfully!",
            icon: "success",
        });
        setPasswordModalVisible(false);
    };

    const handleCancel = () => {
        setPasswordModalVisible(false);
    };
    /***************************************/

    const [dbName, setDbName] = useState("");
    useEffect(() => {
        axios
            .get(
                `${window.location.protocol}//${window.location.hostname}:${apolloOption.server_port}/restapi/db-name`,
            )
            .then((res) => setDbName(res.data.dbName.replace("test", "")))
            .catch(() => setDbName("오류 발생"));
    }, []);

    useEffect(() => {
        const handleMessage = (event) => {
            if (!event.data || typeof event.data !== "object") return;

            const { type, url } = event.data;

            if (type === "closeTab" && url) {
                const tClosedUrl = String(url || "");
                const tRunRemove = () => setTabs((prevTabs) => {
                    const tabIndex = prevTabs.findIndex(
                        (tab) => tab.url === url,
                    );
                    if (tabIndex !== -1) {
                        const newTabs = prevTabs.filter(
                            (_, i) => i !== tabIndex,
                        );

                        if (tabIndex === activeIndex) {
                            setActiveIndex((prev) =>
                                tabIndex === 0 ? 0 : prev - 1,
                            );
                        } else if (tabIndex < activeIndex) {
                            setActiveIndex((prev) => prev - 1);
                        }

                        return newTabs;
                    }
                    return prevTabs;
                });

                if (tClosedUrl.includes("#/S0301_MATL_RECORD")) {
                    window.sessionStorage.removeItem(MATL_RECORD_CODE_CACHE_KEY);

                    const tTabIndex = tabsRef.current.findIndex(
                        (tab) => tab.url === url,
                    );
                    if (tTabIndex !== -1) {
                        const tTargetIframe = document.getElementById(
                            `tabIframe-${tTabIndex}`,
                        );
                        if (tTargetIframe?.contentWindow) {
                            tTargetIframe.contentWindow.postMessage(
                                { func: "s0301_clear_code_cache" },
                                "*",
                            );
                        }
                    }

                    setTimeout(tRunRemove, 120);
                    return;
                }

                tRunRemove();
            }
        };

        window.addEventListener("message", handleMessage);
        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, [activeIndex]);

    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [favorites, setFavorites] = useState([]); // [{key, label, url}]
    const storageKey = userInfo?.USER_ID
        ? `${userInfo.USER_ID}-favorites`
        : null;
    const sidebarPinnedKey = userInfo?.USER_ID
        ? `${userInfo.USER_ID}-sidebarPinned`
        : null;

    const getNodeKey = (node) => node?.url || node?.key || node?.label;

    const loadFavorites = () => {
        if (!storageKey) return;
        try {
            const raw = localStorage.getItem(storageKey);
            const arr = raw ? JSON.parse(raw) : [];
            setFavorites(Array.isArray(arr) ? arr : []);
        } catch {
            setFavorites([]);
        }
    };

    const saveFavorites = (next) => {
        if (!storageKey) return;
        localStorage.setItem(storageKey, JSON.stringify(next));
    };

    const isFavorite = (node) => {
        const k = getNodeKey(node);
        if (!k) return false;
        return favorites.some((f) => f.key === k);
    };

    useEffect(() => {
        if (storageKey) {
            loadFavorites();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storageKey]);

    const nodeTemplate = (node, options) => {
        return (
            <div
                className="tree-node-custom"
                onClick={() => onToggleNode(node)}
                style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    gap: "6px",
                }}
            >
                {node.icon && <i className={node.icon} />}
                <span>{node.label}</span>
            </div>
        );
    };

    useEffect(() => {
        refreshOffset();
    }, [favorites]);

    const getTabKey = (tab) => tab?.url || tab?.idx || tab?.label;

    // 현재 탭이 즐겨찾기인지
    const isFavoriteTab = (tab) =>
        favorites.some((f) => f.key === getTabKey(tab));

    // 탭에서 즐겨찾기 토글
    const toggleFavoriteFromTab = (tab) => {
        const key = getTabKey(tab);
        const label = tab?.label || key;
        const url = tab?.url || "";

        setFavorites((prev) => {
            const exists = prev.some((f) => f.key === key);
            const next = exists
                ? prev.filter((f) => f.key !== key)
                : [...prev, { key, label, url }];
            saveFavorites(next);
            return next;
        });
    };

    useEffect(() => {
        if (userInfo.USER_ID && menuInfo.length > 0) {
            userInfoForAuth.userId = userInfo.USER_ID;
            userInfoForAuth.userName = userInfo.USER_NAME;

            blindMenu(window, apolloOption, userInfoForAuth);
        }
    }, [userInfo, menuInfo]);

    const [sidebarPinned, setSidebarPinned] = useState(() => {
        const userId = window.sessionStorage.getItem("SESSION_USER_ID");

        if (!userId) return true;

        const saved = localStorage.getItem(`${userId}-sidebarPinned`);

        if (saved === null) return true;

        return saved === "true";
    });

    useEffect(() => {
        const userId = userInfo?.USER_ID;

        if (!userId) return;

        localStorage.setItem(`${userId}-sidebarPinned`, sidebarPinned);
    }, [sidebarPinned, userInfo]);

    return (
        <div
            className="app-container"
            style={{ display: "flex", height: "100vh" }}
        >
            <Toast ref={toast} />
            <div
                style={{
                    position: "fixed", // 고정 위치
                    bottom: "5px", // 상단 여백
                    left: "5px", // 왼쪽 여백
                    zIndex: 2000, // 다른 요소보다 위에
                }}
            ></div>
            <div className={`sidebar ${sidebarPinned ? "pinned" : ""}`}>
                <div className="sidebar-content">
                    <div id="userInfoWrapper">
                        <div
                            style={{
                                marginTop: "0rem",
                                width: "93%",
                                height: "5rem",
                                border: " 1px solid #cdcdcd",
                                borderRadius: "5px",
                                margin: "0 10px 0 5px",
                                padding: "3px",
                                backgroundColor: "#ebebeb",
                            }}
                        >
                            <span style={{ width: "100%" }}>
                                <p
                                    className="p-text-secondary"
                                    style={{
                                        width: "100%",
                                        fontSize: "11px",
                                        fontWeight: "500",
                                        display: "inline-block",
                                        textAlign: "center",
                                    }}
                                >
                                    {userInfo.USER_ID}
                                </p>
                            </span>
                            <span style={{ width: "100%" }}>
                                <p
                                    className="p-text-secondary"
                                    style={{
                                        width: "100%",
                                        fontSize: "11px",
                                        fontWeight: "400",
                                        display: "inline-block",
                                        textAlign: "center",
                                    }}
                                >
                                    {userInfo.USER_NAME}
                                </p>
                            </span>
                        </div>

                        <div style={{margin: "4px 0 5px 0"}}>
                            <span style={{ width: "100%" }}>
                                <p
                                    className="p-text-secondary"
                                    style={{
                                        width: "100%",
                                        fontSize: "10px",
                                        fontWeight: "400",
                                        display: "inline-block",
                                        textAlign: "center",
                                        marginTop: "-4px",
                                    }}
                                >
                                    {currentDateTime}
                                </p>
                            </span>
                        </div>
                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "3px",
                            }}
                        >
                            <div
                                style={{
                                    width: "2.5rem",
                                    height: "2rem",
                                    textAlign: "center",
                                }}
                            >
                                <i
                                    className="af-button custom-target-icon pi pi-arrows-h p-text-secondary"
                                    onClick={() => {
                                        clearAllColumnOrders(activeIndex);
                                    }}
                                    style={{
                                        fontSize: "1.5rem",
                                        cursor: "pointer",
                                    }}
                                    title="Clear customized column"
                                ></i>
                            </div>

                            <div
                                style={{
                                    width: "2.5rem",
                                    height: "2rem",
                                    textAlign: "center",
                                }}
                            >
                                <i
                                    className="af-button custom-target-icon pi pi-unlock p-text-secondary"
                                    onClick={() => {
                                        setPasswordModalVisible(true);
                                        setCurrentPassword("");
                                        setNewPassword("");
                                        setConfirmPassword("");
                                    }}
                                    style={{
                                        fontSize: "1.5rem",
                                        cursor: "pointer",
                                    }}
                                    title="Change password"
                                ></i>
                            </div>
                            {/*}
                        <div style={{ float: 'left', marginTop: '0.6rem', width: '2rem', height: '2rem' }}>
                            <i className="custom-target-icon pi pi-arrows-h p-text-secondary"
                                id='iconFitToWindow'
                                style={{ fontSize: '1.5rem', cursor: "pointer" }}
                                title="Fit to window">
                            </i>
                        </div>
                        */}
                            <div
                                style={{
                                    width: "2.5rem",
                                    height: "2rem",
                                    textAlign: "center",
                                }}
                            >
                                <i
                                    className="af-button custom-target-icon pi pi-times p-text-secondary"
                                    onClick={() => {
                                        setTabs([]);
                                    }}
                                    style={{
                                        fontSize: "1.5rem",
                                        cursor: "pointer",
                                    }}
                                    title="Close all tabs"
                                ></i>
                            </div>
                            <div
                                style={{
                                    width: "2.5rem",
                                    height: "2rem",
                                    textAlign: "center",
                                }}
                            >
                                <i
                                    className="af-button custom-target-icon pi pi-refresh p-text-secondary"
                                    data-pr-position="right"
                                    data-pr-at="right+5 top"
                                    data-pr-my="left center-2"
                                    style={{
                                        fontSize: "1.5rem",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => {
                                        setTabs((prevTabs) =>
                                            prevTabs.map((tab, index) => {
                                                if (index === activeIndex) {
                                                    return {
                                                        ...tab,
                                                        key: `${tab.idx}-key-${new Date().getTime()}`, // key 변경하여 iframe 리프레시
                                                    };
                                                }
                                                return tab;
                                            }),
                                        );
                                    }}
                                    title="Reload current tab"
                                ></i>
                            </div>
                        </div>
                    </div>
                    <div
                        id="mobileLogOut"
                        style={{
                            marginBottom: "1.5rem",
                            width: "100%",
                            padding: "0",
                            marginLeft: "7px",
                            paddingTop: "7px",
                        }}
                    >
                        <button
                            style={{
                                marginBottom: "0.5rem",
                                width: "92%",
                                height: "20px",
                            }}
                            onClick={() => {
                                window.sessionStorage.removeItem(
                                    "AF_ERP_USERINFO",
                                );
                                deleteCookie(
                                    `AF_ERP_USERINFO_${userInfoForAuth.userId}`,
                                );
                                window.location.href = `${BASE_URL}login`;
                            }}
                        >
                            Log out
                        </button>
                    </div>
                    <div
                        id="menuTopWrapper"
                        style={{
                            marginTop: "10px",
                            marginBottom: "1.5rem",
                            width: "100%",
                            padding: "0",
                            marginLeft: "7px",
                            paddingTop: "35px",
                        }}
                    >
                        <button
                            style={{
                                marginBottom: "0.5rem",
                                width: "92%",
                                height: "20px",
                            }}
                            onClick={() => {
                                window.sessionStorage.removeItem(
                                    "AF_ERP_USERINFO",
                                );
                                deleteCookie(
                                    `AF_ERP_USERINFO_${userInfoForAuth.userId}`,
                                );
                                window.location.href = `${BASE_URL}login`;
                            }}
                        >
                            Log out
                        </button>
                        <button
                            style={{
                                marginBottom: "0.5rem",
                                width: "92%",
                                height: "20px",
                            }}
                            onClick={() => {
                                window.open(
                                    "https://shints.notion.site/shints-erp-manual?v=abd027845fc846f49081807f183af5ba",
                                    "blank",
                                );
                            }}
                        >
                            Manual
                        </button>
                        <button
                            id="btnAuth"
                            style={{
                                marginBottom: "0.5rem",
                                width: "92%",
                                height: "20px",
                                display: "none",
                            }}
                            onClick={() => {
                                window.open(
                                    `${window.location.protocol}//${window.location.hostname}:3201/authority.html`,
                                    "blank",
                                );
                            }}
                        >
                            권한 설정
                        </button>
                        <button
                            id="btnNotify"
                            style={{
                                marginBottom: "0.5rem",
                                width: "92%",
                                height: "20px",
                                display: "none",
                            }}
                            onClick={() => setSendDialogVisible(true)}
                        >
                            알림보내기
                        </button>
                        <button
                            id="btnTrLog"
                            style={{
                                marginBottom: "0.5rem",
                                width: "92%",
                                height: "20px",
                                display: "none",
                            }}
                            onClick={() => {
                                window.open(
                                    `${window.location.protocol}//${window.location.hostname}:3201/tr_log.html`,
                                    "blank",
                                );
                            }}
                        >
                            Transaction LOG
                        </button>
                        {/*<button id='btnDevManual' style={{ marginBottom: '0.5rem', width: '92%', height: '20px' }} onClick={() => { window.open(`https://www.notion.so/shints/1cf09bcd64ff803ea457dc278b9ba591?v=1cf09bcd64ff8031b40e000c9bdf5071`, 'blank'); }}>화면 분석서</button>*/}
                        <div
                            className="testEnvLabel"
                            style={{
                                marginBottom: "1rem",
                                width: "92%",
                                height: "20px",
                                backgroundColor: "purple",
                                borderRadius: "3px",
                                color: "white",
                                fontWeight: "700",
                                textAlign: "center",
                                alignContent: "center",
                            }}
                        >
                            TEST 환경 ({dbName})
                        </div>
                        <div className="workingMrpIcon">
                            <dotlottie-player
                                src="https://lottie.host/8bad9105-8a45-4862-a1bc-ff9efaa5a99b/hiboDpMUKL.lottie"
                                background="transparent"
                                speed="1"
                                style={{ width: "20px", height: "20px" }}
                                direction="1"
                                playMode="normal"
                                loop
                                autoplay
                            ></dotlottie-player>
                            <span>WORKING MRPLIST…</span>
                        </div>
                    </div>
                    {favorites.length > 0 && (
                        <div
                            id="favoritesWrapper"
                            style={{
                                width: "100%",
                                padding: sidebarCollapsed ? "0" : "0",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    margin: "6px 0 4px 6px",
                                }}
                            >
                                <div
                                    style={{
                                        fontWeight: 700,
                                        fontSize: "12px",
                                    }}
                                >
                                    <span style={{ color: "#f59e0b" }}>★</span>{" "}
                                    Favorites
                                </div>
                                <Button
                                    icon="pi pi-trash"
                                    className="p-button-text p-button-plain p-button-sm"
                                    onClick={() => {
                                        setFavorites([]);
                                        saveFavorites([]);
                                    }}
                                    style={{
                                        fontSize: "1.5rem",
                                        height: "1.3rem",
                                        color: "gray",
                                    }}
                                />
                            </div>

                            <Tree
                                value={favorites.map((f) => ({
                                    key: f.key,
                                    label: f.label,
                                    url: f.url,
                                }))}
                                style={{ width: "100%", marginBottom: "0px" }}
                                nodeTemplate={nodeTemplate}
                            />
                        </div>
                    )}

                    <Tree
                        id="menuTree"
                        value={menuInfo}
                        style={{ width: "100%", marginTop: "10px" }}
                        expandedKeys={expandedKeys}
                        onToggle={(e) => setExpandedKeys(e.value)}
                        nodeTemplate={nodeTemplate}
                    />
                </div>

                <div
                    className={`sidebar-pin ${sidebarPinned ? "pinned" : "unpinned"}`}
                    onClick={() => setSidebarPinned((prev) => !prev)}
                    title={sidebarPinned ? "Unpin sidebar" : "Pin sidebar"}
                >
                    <i className="fas fa-thumbtack" />
                </div>
            </div>

            {/* 탭 UI */}
            <div className="tab-container" style={{ flex: 1, padding: "5px" }}>
                {tabs.length === 0 && (
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            pointerEvents: "none",
                        }}
                    >
                        <img
                            src={logo}
                            alt="logo"
                            className="logo-placeholder"
                            style={{
                                width: "300px",
                                opacity: 0.8,
                            }}
                        />
                    </div>
                )}

                <Tooltip target=".tab-header" position="bottom" />
                <TabView
                    activeIndex={activeIndex}
                    onTabChange={(e) => setActiveIndex(e.index)}
                    renderActiveOnly={false} // 모든 탭 패널을 렌더링하여 상태 유지
                >
                    {tabs.map((tab, index) => (
                        <TabPanel
                            key={tab.idx}
                            header={
                                <span
                                    className="tab-header"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        width: "132px",
                                        height: "15px",
                                        overflow: "hidden",
                                        padding: "0 2px 0 2px",
                                    }}
                                >
                                    <span
                                        style={{
                                            width: "110px",
                                            overflow: "hidden",
                                            height: "25px",
                                            paddingTop: "9px",
                                        }}
                                        title={
                                            tab.url.split("#/")[1].split("?")[0]
                                        }
                                    >
                                        {tab.label}
                                    </span>

                                    {/* 즐겨찾기 토글 버튼 */}
                                    <Button
                                        icon={
                                            isFavoriteTab(tab)
                                                ? "pi pi-star-fill"
                                                : "pi pi-star"
                                        }
                                        className="p-button-text p-button-sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFavoriteFromTab(tab);
                                        }}
                                        style={{
                                            color: isFavoriteTab(tab)
                                                ? "#f59e0b"
                                                : "#8a8a8a",
                                        }}
                                        title={
                                            isFavoriteTab(tab)
                                                ? "Remove favorite"
                                                : "Add favorite"
                                        }
                                    />

                                    <Button
                                        icon="pi pi-times"
                                        className="p-button-text p-button-sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeTab(index);
                                        }}
                                        style={{
                                            textAlign: "right",
                                            marginRight: "5px",
                                            color: "red",
                                        }}
                                        title="CLOSE TAB"
                                        accessKey="x"
                                    />
                                </span>
                            }
                        >
                            <div className="iframe-scroll-wrapper">
                                <iframe
                                    id={`tabIframe-${index}`}
                                    key={tab.key}
                                    src={tab.url}
                                    height="100%"
                                    style={{
                                        border: "none",
                                        marginTop: "-5px",
                                    }}
                                />
                            </div>
                        </TabPanel>
                    ))}
                </TabView>
            </div>

            <Dialog
                header="알림 보내기"
                visible={sendDialogVisible}
                style={{ width: "560px", maxWidth: "90vw" }}
                modal
                onHide={() => setSendDialogVisible(false)}
                footer={
                    <div>
                        <Button
                            label="취소"
                            icon="pi pi-times"
                            onClick={() => setSendDialogVisible(false)}
                        />
                        <Button
                            label="알림보내기"
                            icon="pi pi-send"
                            onClick={sendSseNotification}
                        />
                    </div>
                }
            >
                <div className="p-fluid">
                    <div className="field">
                        <label htmlFor="noticeMessage">알림 내용</label>
                        <textarea
                            id="noticeMessage"
                            rows={5}
                            value={sendMessage}
                            onChange={(e) => setSendMessage(e.target.value)}
                            style={{ width: "100%", resize: "vertical" }}
                            placeholder="비워두면 기본 안내 문구가 전송됩니다."
                        />
                    </div>
                    <p style={{ color: "#666", marginTop: "8px" }}>
                        입력값이 없으면 아래 기본 문구를 전송합니다.
                        <br />
                        {DEFAULT_NOTICE_MESSAGE}
                    </p>
                </div>
            </Dialog>

            <Dialog
                header="NOTICE"
                visible={sseDialogVisible}
                style={{ width: "40vw", maxWidth: "800px" }}
                modal
                onHide={() => setSseDialogVisible(false)}
                footer={
                    <div>
                        <Button
                            label="닫기"
                            icon="pi pi-times"
                            onClick={() => setSseDialogVisible(false)}
                        />
                    </div>
                }
            >
                <div
                    style={{
                        minHeight: "180px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        textAlign: "center",
                        gap: "12px",
                    }}
                >
                    <div
                        style={{
                            fontSize: "2rem",
                            fontWeight: 700,
                            whiteSpace: "pre-line",
                        }}
                    >
                        {sseLastMsg || "알림"}
                    </div>
                    <div style={{ fontSize: "1rem", color: "#666" }}>
                        수신 시간: {sseLastTime || "-"}
                    </div>
                </div>
            </Dialog>

            <Dialog
                header="Change Password"
                visible={passwordModalVisible}
                style={{ width: "400px" }}
                modal
                onHide={() => setPasswordModalVisible(false)}
                footer={
                    <div>
                        <Button
                            label="Cancel"
                            icon="pi pi-times"
                            onClick={handleCancel}
                        />
                        <Button
                            label="Save"
                            icon="pi pi-check"
                            onClick={handleSave}
                        />
                    </div>
                }
            >
                <div className="p-fluid">
                    <div className="field">
                        <label htmlFor="currentPassword">
                            Current Password
                        </label>
                        <Password
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            toggleMask
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="newPassword">New Password</label>
                        <Password
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            toggleMask
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="confirmPassword">
                            Confirm New Password
                        </label>
                        <Password
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            toggleMask
                            feedback={false}
                        />
                    </div>
                    <p style={{ color: "#BF0000" }}>
                        Password must be at least 8 characters, include letters,
                        numbers, and special characters, and must not contain 4
                        consecutive characters.
                        <br />
                        <br />
                        비밀번호는 최소 8자 이상이어야 하며, 영문자, 숫자,
                        특수문자를 포함해야 합니다. 또한, 4자리 이상의 연속된
                        문자를 포함할 수 없습니다.
                    </p>
                </div>
            </Dialog>
        </div>
    );
};

export default App;
