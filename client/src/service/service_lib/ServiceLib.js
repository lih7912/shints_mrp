/* eslint-disable */
import { ApolloClient, InMemoryCache } from "@apollo/client";
import apolloOption from "../../assets/env_graphql";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import moment from "moment";

let loginConfirmAlert = false;
export class ServiceLib {
    loginConfirm() {
        let userInfo = this.getUserInfo();
        if (!userInfo) {
            if (loginConfirmAlert == false) {
                loginConfirmAlert = true;
                alert("다시 로그인해주세요.<br><br>Please log in again.");
                window.parent.location.href = "/#/login";
            }
        } else {
            return { return: "login" };
        }
    }

    // 컴마 + 소숫점 n째 짜리 표현
    numComAndFix(num, decimalPlaces) {
        if (isNaN(num)) {
            return;
        }

        num = parseFloat(num);

        // 소수점 자리수 지정
        if (!decimalPlaces) decimalPlaces = 0;

        const fixedNum = num.toFixed(decimalPlaces);

        // 정규식을 사용하여 셋째 자리마다 콤마 추가
        return fixedNum.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    //소수점 아래 두자리 고정 함수
    numToFixed(num0, fixpoint) {
        var num = num0;
        if (num0 === "") num = "0";
        const floatNum = parseFloat(num);
        const roundedNumber = floatNum.toFixed(fixpoint);
        //console.log(roundedNumber);
        return roundedNumber;
    }

    //숫자 , 찍는 거
    numWithCommas(number, point) {
        if (
            number === "-" ||
            number === "" ||
            number === null ||
            typeof number === "undefined"
        ) {
            if (number === "-") return number;
            else return "";
        }

        var argPoint = 0;
        if (typeof point !== "undefined") argPoint = point;

        var tValue = parseFloat(number);
        var roundedNumber = tValue.toFixed(argPoint);

        var tStr = String(roundedNumber);
        var tCols = tStr.split(".");

        var tCommas = tCols[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        var tRet = "";
        if (tCols.length > 1 && tCols[1] !== "") {
            if (parseFloat(tCols[1]) <= 0) tRet = `${tCommas}`;
            else tRet = `${tCommas}.${tCols[1]}`;
        } else {
            tRet = `${tCommas}`;
        }
        return tRet;
        // return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Amount: Comma, 소수점 두자리
    numToAmt(num) {
        if (num === null) return "";
        if (num === "") return "";
        const roundedNumber = String(parseInt(parseFloat(num) * 100) / 100.0);
        var cols = roundedNumber.split(".");
        var tIntVal = parseInt(cols[0])
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (cols.length > 1) return `${tIntVal}.${cols[1]}`;
        else return tIntVal;
    }

    getUserInfo() {
        var tUserInfo = JSON.parse(
            window.sessionStorage.getItem("AF_ERP_USERINFO"),
        );
        return tUserInfo;
    }
    getApolloClient() {
        var tHeader = {};
        // var tUserInfo = JSON.parse(window.localStorage.getItem('AF_ERP_USERINFO'));
        var tUserInfo = JSON.parse(
            window.sessionStorage.getItem("AF_ERP_USERINFO"),
        );
        /*
            if (typeof tUserInfo.USER_ID === 'undefined') tHeader.authorization = 'NO LOGIN';
            else tHeader.authorization = `${tUserInfo.USER_ID}:${tUserInfo.USER_NAME}`;
        */

        if (typeof tUserInfo.USER_ID === "undefined" || !tUserInfo) {
            tHeader.authorization = "NO LOGIN:NO LOGIN";
        } else {
            tHeader.authorization = `${tUserInfo.USER_ID}:${tUserInfo.PART}:${tUserInfo.FACTORY_CD}:${tUserInfo.EMAIL}`;
        }
        apolloOption.cache = new InMemoryCache();
        apolloOption.headers = { ...tHeader };

        var tOptions = {};
        tOptions.watchQuery = {};
        tOptions.query = {};
        tOptions.watchQuery.fetchPolicy = "no-cache";
        tOptions.watchQuery.errorPolicy = "ignore";
        tOptions.query.fetchPolicy = "no-cache";
        tOptions.query.errorPolicy = "all";
        apolloOption.defaultOptions = { ...tOptions };

        var client = new ApolloClient(apolloOption);
        return client;
    }
    getCurrDate1() {
        var tDate = new Date();
        var mm = tDate.getMonth() + 1;
        var mm_str = "";
        if (mm > 9) mm_str = mm.toString();
        else mm_str = "0" + mm;

        var dd = tDate.getDate();
        var dd_str = "";
        if (dd > 9) dd_str = dd;
        else dd_str = "0" + dd;

        var hours = tDate.getHours();
        var hours_str = "";
        if (hours > 9) hours_str = hours.toString();
        else hours_str = "0" + hours;

        var minutes = tDate.getMinutes();
        var minutes_str = "";
        if (minutes > 9) minutes_str = minutes.toString();
        else minutes_str = "0" + minutes;

        var seconds = tDate.getSeconds();
        var seconds_str = "";
        if (seconds > 9) seconds_str = seconds.toString();
        else seconds_str = "0" + seconds;

        var yyyy = tDate.getFullYear();

        var tRetDate =
            yyyy.toString() +
            mm_str +
            dd_str +
            hours_str +
            minutes_str +
            seconds_str;
        var tRetDate1 = tRetDate.substring(0, 8);
        return tRetDate1;
    }
    getCurrDate() {
        var tDate = new Date();
        var mm = tDate.getMonth() + 1;
        var mm_str = "";
        if (mm > 9) mm_str = mm.toString();
        else mm_str = "0" + mm;

        var dd = tDate.getDate();
        var dd_str = "";
        if (dd > 9) dd_str = dd;
        else dd_str = "0" + dd;

        var hours = tDate.getHours();
        var hours_str = "";
        if (hours > 9) hours_str = hours.toString();
        else hours_str = "0" + hours;

        var minutes = tDate.getMinutes();
        var minutes_str = "";
        if (minutes > 9) minutes_str = minutes.toString();
        else minutes_str = "0" + minutes;

        var seconds = tDate.getSeconds();
        var seconds_str = "";
        if (seconds > 9) seconds_str = seconds.toString();
        else seconds_str = "0" + seconds;

        var yyyy = tDate.getFullYear();

        var tRetDate =
            yyyy.toString() +
            mm_str +
            dd_str +
            hours_str +
            minutes_str +
            seconds_str;
        var tRetDate1 = tRetDate.substring(0, 8);
        return tRetDate;
    }

    getWeek(argDate) {
        var tYear = parseInt(argDate.substring(0, 4));
        var tMon = parseInt(argDate.substring(4, 6)) - 1;
        var tDay = parseInt(argDate.substring(6, 8));

        var tDate = new Date(tYear, tMon, tDay);

        //var tWeeks = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일'];
        var tWeeks = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        var tWeekIdx = tDate.getDay();

        var tRet = tWeeks[tWeekIdx];
        return tRet;
    }

    getCurrWeek() {
        var tDate = new Date();

        //var tWeeks = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일'];
        var tWeeks = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];

        var tWeekIdx = tDate.getDay();

        var tRet = tWeeks[tWeekIdx];
        return tRet;
    }

    getCurrTimeAdd(addDate) {
        var tAddDate = parseInt(addDate);
        var tDate0 = new Date();
        var tDate = new Date(tDate0.setDate(tDate0.getDate() + tAddDate));
        var mm = tDate.getMonth() + 1;
        var mm_str = "";
        if (mm > 9) mm_str = mm.toString();
        else mm_str = "0" + mm;

        var dd = tDate.getDate();
        var dd_str = "";
        if (dd > 9) dd_str = dd;
        else dd_str = "0" + dd;

        var hours = tDate.getHours();
        var hours_str = "";
        if (hours > 9) hours_str = hours.toString();
        else hours_str = "0" + hours;

        var minutes = tDate.getMinutes();
        var minutes_str = "";
        if (minutes > 9) minutes_str = minutes.toString();
        else minutes_str = "0" + minutes;

        var seconds = tDate.getSeconds();
        var seconds_str = "";
        if (seconds > 9) seconds_str = seconds.toString();
        else seconds_str = "0" + seconds;

        var yyyy = tDate.getFullYear();

        var tRetDate =
            yyyy.toString() +
            mm_str +
            dd_str +
            hours_str +
            minutes_str +
            seconds_str;
        return tRetDate;
    }

    getLocaleMessage(argId) {
        var tCols = argId.split(/_/);
        return tCols[2];
    }

    getFloat(argValue, argPoint) {
        const num = parseFloat(argValue);
        if (isNaN(num)) return 0;
        const factor = 10 ** argPoint;
        return Math.floor(num * factor) / factor;
    }

    printF(argValue, argLength) {
        var argZero = "";
        var tIdx = 0;
        for (tIdx = 0; tIdx < argLength; tIdx++) {
            argZero += "0";
        }

        var tRet =
            argZero.substring(0, argLength - String(argValue).length) +
            String(argValue);
        return tRet;
    }

    getNumberFormat(argValue, argPoint) {
        var tStr = String(argValue);
        var tCol = tStr.split(".");

        var tZero = "0000000000";

        var tRet = "";
        var tLengthDeci = 0;
        if (tCol.length > 1) {
            tLengthDeci = tCol[1].length;
            tRet =
                tCol[0] +
                "." +
                tCol[1] +
                tZero.substring(0, argPoint - tCol[1].length);
        } else {
            tLengthDeci = 0;
            tRet = tCol[0] + "." + tZero.substring(0, argPoint);
        }
        return tRet;
    }

    //테이블에서 날짜 데이터 포맷
    dateFormat = (date) => {
        try {
            if (
                date === "null" ||
                date === null ||
                date === "" ||
                date === "undefined"
            ) {
                return "";
            }
            let year = date.substring(0, 4);
            let month = date.substring(4, 6);
            let day = date.substring(6, 8);

            let yyyyMMdd = String(year + "-" + month + "-" + day);
            return yyyyMMdd;
        } catch (err) {
            // console.log(err);
            // console.log(date);
            return "";
        }
    };

    //날짜 데이터 시분초까지
    dateFormatHMS = (date) => {
        try {
            if (date === "Total") {
                return date;
            }
            if (date === null || date === "") {
                return "";
            }

            let year = date.substring(0, 4);
            let month = date.substring(4, 6);
            let day = date.substring(6, 8);

            let hour = date.substring(8, 10);
            let minutes = date.substring(10, 12);
            let second = date.substring(12, 14);

            let tRetDate = "";
            if (date.length > 8) {
                tRetDate = String(
                    `${year}-${month}-${day} ${hour}:${minutes}:${second}`,
                );
            } else {
                tRetDate = String(`${year}-${month}-${day}`);
            }

            return tRetDate;
        } catch (err) {
            return "";
        }
    };

    /**
     * 숫자 문자열을 소수점 두 자리까지 포맷(반올림)하고
     * 세 자리마다 쉼표를 붙여 문자열로 반환합니다.
     *
     * @param {string} numberString - 포맷할 숫자 문자열.
     * @returns {string} 포맷된 숫자 문자열.
     */
    formatNumber = (numberString, digit) => {
        if (!digit) digit = 0;

        if (numberString === "") return "";
        if (numberString === "0") return "0";

        // 공백 제거 및 콤마 제거 후 숫자로 변환
        const cleaned = String(numberString).trim().replace(/,/g, "");
        const n = Number(cleaned);

        if (Number.isNaN(n)) {
            return "0";
        }
        // Intl.NumberFormat으로 2자리까지 포맷(반올림)
        return new Intl.NumberFormat("en-US", {
            minimumFractionDigits: digit,
            maximumFractionDigits: digit,
        }).format(n);
    };

    downloadFile = async (argFileUrl, argFileName) => {
        try {
            const normalizeDownloadUrl = (url) => {
                const raw = String(url || "").trim();
                if (!raw) return "";
                const qIdx = raw.indexOf("?");
                return qIdx >= 0 ? raw.substring(0, qIdx) : raw;
            };

            const normalizeFileName = (name) => {
                let fileName = String(name || "").trim();
                if (!fileName) return "";

                try {
                    fileName = decodeURIComponent(fileName);
                } catch (e) {
                    fileName = String(name || "").trim();
                }

                // Recover common mojibake like "ì±ì..." (UTF-8 bytes read as Latin-1)
                try {
                    const recovered = decodeURIComponent(escape(fileName));
                    if (recovered && recovered !== fileName) {
                        fileName = recovered;
                    }
                } catch (e) {
                    // keep original
                }

                return fileName;
            };

            const getFileNameFromDisposition = (disposition) => {
                if (!disposition) return "";

                const starMatch = disposition.match(/filename\*\s*=\s*UTF-8''([^;]+)/i);
                if (starMatch && starMatch[1]) {
                    try {
                        return decodeURIComponent(starMatch[1].trim());
                    } catch (e) {
                        return starMatch[1].trim();
                    }
                }

                const normalMatch = disposition.match(/filename\s*=\s*"?([^";]+)"?/i);
                if (normalMatch && normalMatch[1]) {
                    return normalizeFileName(normalMatch[1].trim());
                }

                return "";
            };

            let fileName = normalizeFileName(argFileName);
            const downloadUrl = normalizeDownloadUrl(argFileUrl);

            const response = await fetch(downloadUrl);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const disposition = response.headers.get("content-disposition") || "";
            const headerFileName = getFileNameFromDisposition(disposition);
            if (headerFileName) {
                fileName = normalizeFileName(headerFileName);
            }

            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = objectUrl;
            if (fileName) {
                a.download = fileName;
            }
            a.style.display = "none";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(objectUrl);
        } catch (error) {
            // CORS 등으로 blob 다운로드가 실패하면 기존 방식으로 fallback
            try {
                const a = document.createElement("a");
                a.href = String(argFileUrl || "").split("?")[0] || "";
                a.style.display = "none";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            } catch (fallbackError) {
                console.error("Download failed:", fallbackError);
            }
        }
    };

    setCookie = (name, value, days) => {
        let expires = "";
        if (days) {
            const date = new Date();
            // 현재 시간에 days만큼의 시간을 추가하여 만료 시간 계산 (밀리초 단위)
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

            expires = "; expires=" + date.toUTCString();
        }
        // 쿠키 생성, path=/ 로 전체 경로에서 쿠키 사용 가능하게 설정
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    };

    getCookie = (name) => {
        const cookies = document.cookie.split("; ");

        for (let cookie of cookies) {
            const [key, value] = cookie.split("=");
            if (key === name) {
                return decodeURIComponent(value); // 쿠키 값이 인코딩된 경우 해제
            }
        }
        return null; // 해당 쿠키가 없으면 null 반환
    };

    deleteCookie = (name) => {
        document.cookie =
            name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    };

    exportExcel = async (title, sheetName, table, options = {}) => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet(sheetName);
        const dateColumns = new Set(options.dateColumns || []);
        const dateNumberFormat = options.dateNumberFormat || "yyyy-mm-dd";
        const columnNumberFormats = options.columnNumberFormats || {};

        if (!table) {
            return;
        }
        const dataArr = table.map(({ __typename, id, ...rest }) => {
            const row = { ...rest };

            dateColumns.forEach((columnKey) => {
                if (!Object.prototype.hasOwnProperty.call(row, columnKey)) {
                    return;
                }

                const parsedValue = options.dateValueParser
                    ? options.dateValueParser(row[columnKey], columnKey)
                    : row[columnKey];

                if (parsedValue instanceof Date) {
                    row[columnKey] = parsedValue;
                }
            });

            return row;
        });

        if (!dataArr.length) {
            return;
        }

        // 헤더 정의
        const columns = Object.keys(dataArr[0]).map((key) => ({
            header: key,
            key,
        }));
        worksheet.columns = columns;

        // 데이터 추가
        dataArr.forEach((row) => worksheet.addRow(row));

        // 스타일 적용
        worksheet.eachRow((row, rowNumber) => {
            row.eachCell({ includeEmpty: true }, (cell) => {
                // 테두리
                cell.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" },
                };

                // 제목줄은 노란색 + Bold
                if (rowNumber === 1) {
                    cell.fill = {
                        type: "pattern",
                        pattern: "solid",
                        fgColor: {
                            argb: options.headerColor || "FFFF00",
                        },
                    };
                }

                cell.font = {
                    name: "Dotum", // 폰트명
                    size: 10, // 10포인트
                    bold: rowNumber === 1, // 제목줄은 Bold
                };

                const columnKey = worksheet.columns[cell.col - 1]?.key;
                if (
                    rowNumber > 1 &&
                    columnKey &&
                    typeof columnNumberFormats[columnKey] === "string"
                ) {
                    cell.numFmt = columnNumberFormats[columnKey];
                }

                if (rowNumber > 1 && cell.value instanceof Date) {
                    cell.numFmt = dateNumberFormat;
                }

                // 빈칸도 값이 없으면 ''으로 통일
                if (cell.value === "undefined" || cell.value === "null") {
                    cell.value = "";
                }
            });
        });

        // 열 폭 자동 조정
        worksheet.columns.forEach((column) => {
            let maxLength = column.header.length;
            column.eachCell?.({ includeEmpty: true }, (cell) => {
                const cellValue = cell.value instanceof Date
                    ? dateNumberFormat
                    : cell.value
                      ? cell.value.toString()
                      : "";
                maxLength = Math.max(maxLength, cellValue.length);
            });
            column.width = maxLength + 2; // padding
        });

        // 엑셀 저장
        const buffer = await workbook.xlsx.writeBuffer();
        saveAs(
            new Blob([buffer]),
            `${title}_${moment().format("YYYYMMDDHHMMss")}.xlsx`,
        );
    };

    getQueryParam = (paramName) => {
        const hash = window.location.hash;
        const q = hash.includes("?")
            ? hash.slice(hash.indexOf("?") + 1).replace("?", "&")
            : "";
        const params = new URLSearchParams(q);

        return params.get(paramName);
    };

    // ============ 통합 입력 핸들러 시작 ============
    
    /**
     * TextInput 변경 통합 핸들러
     * @param {Event} e - Input 이벤트
     * @param {string} name - 상태 객체의 필드명
     * @param {Object} state - 현재 상태 객체
     * @param {Function} setState - 상태 업데이트 함수
     * @param {Object} options - { removeSpace: boolean }
     */
    handleInputChange = (e, name, state, setState, options = {}) => {
        let val = (e.target && e.target.value) || "";

        let _state = { ...state };

        // 선택적 공백 제거
        if (options.removeSpace) val = val.replaceAll(" ", "");

        let tTypeVal = _state[`${name}`];
        if (typeof tTypeVal === "string") _state[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _state[`${name}`] = parseInt(val);

        setState(_state);
    };

    /**
     * Calendar 변경 통합 핸들러
     * @param {Event} e - Calendar 이벤트
     * @param {string} name - 상태 객체의 필드명
     * @param {Object} state - 현재 상태 객체
     * @param {Function} setState - 상태 업데이트 함수
     * @param {Function} onCallback - 추가 처리 콜백 (선택사항)
     */
    handleCalendarChange = (e, name, state, setState, onCallback) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = this.getDateVal(val1);
        }

        let _state = { ...state };
        _state[`${name}`] = val;
        setState(_state);

        // 추가 콜백이 있으면 실행 (예: 별도의 상태 업데이트)
        if (onCallback) onCallback(val);
    };

    /**
     * Dropdown(싱글 선택) 변경 통합 핸들러
     * CD_CODE를 추출하여 주 상태에 저장하고, 필요시 추가 상태도 업데이트
     * @param {Event} e - Dropdown 이벤트
     * @param {string} name - 상태 객체의 필드명
     * @param {Object} state - 현재 상태 객체
     * @param {Function} setState - 상태 업데이트 함수
     * @param {Function} onCallback - 추가 처리 콜백 (예: setDataXXX_DESTINATION(e.value))
     */
    handleDropdownChange = (e, name, state, setState, onCallback) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _state = { ...state };

        let tTypeVal = _state[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _state[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _state[`${name}`] = parseInt(val);
        }

        setState(_state);

        // 추가 콜백 (예: 선택 항목 전체 객체 저장)
        if (onCallback) onCallback(e.value);
    };

    /**
     * Dropdown(싱글 선택) 변경 통합 핸들러 (키 지정형)
     * @param {Event} e - Dropdown 이벤트
     * @param {string} name - 상태 객체의 필드명
     * @param {Object} state - 현재 상태 객체
     * @param {Function} setState - 상태 업데이트 함수
     * @param {Function} onCallback - 추가 처리 콜백 (예: setDataXXX(e.value))
     * @param {string} valueKey - e.value에서 상태로 저장할 키명 (기본: CD_CODE)
     */
    handleDropdownChangeByKey = (
        e,
        name,
        state,
        setState,
        onCallback,
        valueKey = "CD_CODE",
    ) => {
        let val = (e.value && e.value[valueKey]) || "";

        let _state = { ...state };

        let tTypeVal = _state[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _state[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _state[`${name}`] = parseInt(val);
        }

        setState(_state);

        if (onCallback) onCallback(e.value);
    };

    /**
     * MultiSelect 변경 통합 핸들러
     * CD_CODE 배열을 쉼표로 join하여 주 상태에 저장하고, 필요시 추가 상태도 업데이트
     * @param {Event} e - MultiSelect 이벤트
     * @param {string} name - 상태 객체의 필드명
     * @param {Object} state - 현재 상태 객체
     * @param {Function} setState - 상태 업데이트 함수
     * @param {Function} onCallback - 추가 처리 콜백 (예: setDataXXX_STATUS_CD(selectedList))
     */
    handleMultiSelectChange = (e, name, state, setState, onCallback) => {
        const selectedList = Array.isArray(e.value) ? e.value : [];

        // CD_CODE 배열 추출
        const codes = selectedList.map((v) => v.CD_CODE);

        let _state = { ...state };
        _state[name] = codes.join(",");

        setState(_state);

        // 추가 콜백 (예: 선택된 전체 항목 저장)
        if (onCallback) onCallback(selectedList);
    };

    /**
     * 날짜 객체를 YYYYMMDD 문자열로 변환
     * @param {Date} argVal - 변환할 날짜 객체
     * @returns {string} YYYYMMDD 형식의 문자열
     */
    getDateVal = (argVal) => {
        var tDate = argVal;
        var mm = tDate.getMonth() + 1;
        var mm_str = "";
        if (mm > 9) mm_str = mm;
        else mm_str = "0" + mm;

        var dd = tDate.getDate();
        var dd_str = "";
        if (dd > 9) dd_str = dd;
        else dd_str = "0" + dd;

        var yyyy = tDate.getFullYear().toString();

        var tRet = yyyy + mm_str + dd_str;
        return tRet;
    };

    // ============ 통합 입력 핸들러 종료 ============
}
