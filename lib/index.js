"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var antd_1 = require("antd");
var TabPane = antd_1.Tabs.TabPane;
var useEffect = React.useEffect, useState = React.useState;
var radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};
var numAreaEnum = {
    'second': { min: 0, max: 59 },
    'minute': { min: 0, max: 59 },
    'hour': { min: 0, max: 23 },
    'date': { min: 1, max: 31 },
    'month': { min: 1, max: 12 },
    'week': { min: 1, max: 7 }
};
var returnTheNumArea = function (key) {
    var result = [];
    for (var i = numAreaEnum[key].min; i <= numAreaEnum[key].max; i++) {
        result.push({ label: "" + i, value: "" + i });
    }
    return result;
};
var RenderArea = function (_a) {
    var change = _a.change, keyStr = _a.keyStr;
    var valueEnum = {
        'second': ["*", [0, 59], [0, 1], []],
        'minute': ["*", [0, 59], [0, 1], []],
        'hour': ["*", [0, 23], [0, 1], []],
        'date': ["*", [1, 31], [1, 1], [], "?"],
        'month': ["*", [1, 12], [1, 1], []],
        'week': ["*", [1, 7], [1, 1], [], "?", "1L"]
    };
    var strEnum = {
        'second': '秒',
        'minute': '分',
        'hour': '时',
        'date': '日',
        'month': '月',
        'week': '周'
    };
    var _b = useState(valueEnum[keyStr]), value = _b[0], setValue = _b[1];
    var _c = useState(keyStr === "week" ? 4 : 0), index = _c[0], setIndex = _c[1];
    var toParent = function () {
        var result = "";
        if (index === 0 || index === 4 || index === 5)
            result = value[index];
        if (index === 1)
            result = value[index].join("-");
        if (index === 2)
            result = value[index].join("/");
        if (index === 3) {
            if (value[index].length === 0)
                result = "*";
            else
                result = value[index].join(",");
        }
        change(result);
    };
    var arrChange = function (arrIndex, values, index) {
        var origin = value;
        var old = origin[arrIndex];
        old.splice(index, 1, values);
        setValue(origin);
        toParent();
    };
    useEffect(toParent, [index]);
    return React.createElement(antd_1.Radio.Group, { value: index, onChange: function (e) { setIndex(e.target.value); } },
        React.createElement(antd_1.Radio, { value: 0, style: radioStyle },
            "\u6BCF",
            strEnum[keyStr]),
        (keyStr === "date" || keyStr === "week") && React.createElement(antd_1.Radio, { value: 4, style: radioStyle }, "\u4E0D\u6307\u5B9A"),
        React.createElement(antd_1.Radio, { value: 1, style: radioStyle },
            React.createElement(antd_1.Space, { align: "start" },
                React.createElement("p", null, "\u5468\u671F\u4ECE"),
                React.createElement(antd_1.InputNumber, { disabled: index !== 1, min: numAreaEnum[keyStr].min, max: numAreaEnum[keyStr].max, defaultValue: numAreaEnum[keyStr].min, onChange: function (e) { return arrChange(1, e, 0); }, size: "small" }),
                React.createElement("p", null, "\u5230"),
                React.createElement(antd_1.InputNumber, { disabled: index !== 1, min: numAreaEnum[keyStr].min, max: numAreaEnum[keyStr].max, defaultValue: numAreaEnum[keyStr].max, onChange: function (e) { return arrChange(1, e, 1); }, size: "small" }),
                React.createElement("p", null, strEnum[keyStr]))),
        React.createElement(antd_1.Radio, { value: 2, style: radioStyle },
            keyStr !== "week" && React.createElement(antd_1.Space, { align: "start" },
                React.createElement("p", null, "\u4ECE"),
                React.createElement(antd_1.InputNumber, { disabled: index !== 2, min: numAreaEnum[keyStr].min, max: numAreaEnum[keyStr].max, defaultValue: numAreaEnum[keyStr].min, onChange: function (e) { return arrChange(2, e, 0); }, size: "small" }),
                React.createElement("p", null,
                    strEnum[keyStr],
                    "\u5F00\u59CB\uFF0C\u6BCF"),
                React.createElement(antd_1.InputNumber, { disabled: index !== 2, min: numAreaEnum[keyStr].min, defaultValue: 1, onChange: function (e) { return arrChange(2, e, 1); }, size: "small" }),
                React.createElement("p", null,
                    strEnum[keyStr],
                    "\u6267\u884C\u4E00\u6B21")),
            keyStr === "week" && React.createElement(antd_1.Space, { align: "start" },
                React.createElement("p", null, "\u7B2C"),
                React.createElement(antd_1.InputNumber, { disabled: index !== 2, min: 1, max: 4, defaultValue: 1, onChange: function (e) { return arrChange(2, e, 0); }, size: "small" }),
                React.createElement("p", null, "\u5468\u7684\u661F\u671F"),
                React.createElement(antd_1.InputNumber, { disabled: index !== 2, min: numAreaEnum[keyStr].min, max: numAreaEnum[keyStr].max, defaultValue: 1, onChange: function (e) { return arrChange(2, e, 1); }, size: "small" }))),
        keyStr === "week" && React.createElement(antd_1.Radio, { value: 5, style: radioStyle },
            React.createElement(antd_1.Space, { align: "start" },
                React.createElement("p", null, "\u672C\u6708\u6700\u540E\u4E00\u4E2A\u661F\u671F"),
                React.createElement(antd_1.InputNumber, { disabled: index !== 5, min: numAreaEnum[keyStr].min, max: numAreaEnum[keyStr].max, defaultValue: numAreaEnum[keyStr].min, onChange: function (e) {
                        var old = value;
                        old.splice(old.length - 1, 1, e + "L");
                        setValue(old);
                        toParent();
                    }, size: "small" }))),
        React.createElement(antd_1.Radio, { value: 3, style: __assign(__assign({}, radioStyle), { marginTop: '10px' }) },
            "\u6307\u5B9A\uFF1A",
            React.createElement("div", null,
                React.createElement(antd_1.Checkbox.Group, { options: returnTheNumArea(keyStr), onChange: function (e) {
                        var origin = value;
                        value.splice(3, 1, e);
                        setValue(origin);
                        toParent();
                    }, disabled: index !== 3 }))));
};
var page = function (_a) {
    var setValue = _a.setValue, showResult = _a.showResult;
    var _b = useState("*"), second = _b[0], setSecond = _b[1];
    var _c = useState("*"), minute = _c[0], setMinute = _c[1];
    var _d = useState("*"), hour = _d[0], setHour = _d[1];
    var _e = useState("*"), date = _e[0], setDate = _e[1];
    var _f = useState("*"), month = _f[0], setMonth = _f[1];
    var _g = useState("?"), week = _g[0], setWeek = _g[1];
    var getCorn = function () { return (second + " " + minute + " " + hour + " " + date + " " + month + " " + week); };
    useEffect(function () { return setValue(getCorn()); }, [getCorn()]);
    return React.createElement(React.Fragment, null,
        React.createElement(antd_1.Tabs, { defaultActiveKey: "1" },
            React.createElement(TabPane, { tab: "\u79D2\uFF08second\uFF09", key: "1" },
                React.createElement(RenderArea, { change: setSecond, keyStr: "second" })),
            React.createElement(TabPane, { tab: "\u5206\uFF08minute\uFF09", key: "2" },
                React.createElement(RenderArea, { change: setMinute, keyStr: 'minute' })),
            React.createElement(TabPane, { tab: "\u65F6\uFF08hour\uFF09", key: "3" },
                React.createElement(RenderArea, { change: setHour, keyStr: 'hour' })),
            React.createElement(TabPane, { tab: "\u65E5\uFF08date\uFF09", key: "4" },
                React.createElement(RenderArea, { change: setDate, keyStr: 'date' })),
            React.createElement(TabPane, { tab: "\u6708\uFF08month\uFF09", key: "5" },
                React.createElement(RenderArea, { change: setMonth, keyStr: 'month' })),
            React.createElement(TabPane, { tab: "\u5468\uFF08week\uFF09", key: "6" },
                React.createElement(RenderArea, { change: setWeek, keyStr: 'week' }))),
        showResult && React.createElement("p", null,
            "cron \u8868\u8FBE\u5F0F\uFF1A",
            getCorn()));
};
exports.default = page;
