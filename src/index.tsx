import * as React from 'react';
import { Tabs, Radio, InputNumber, Space, Checkbox } from 'antd';

const { TabPane } = Tabs;
const { useEffect, useState } = React;

const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

const numAreaEnum = {
    'second': { min: 0, max: 59 },
    'minute': { min: 0, max: 59 },
    'hour': { min: 0, max: 23 },
    'date': { min: 1, max: 31 },
    'month': { min: 1, max: 12 },
    'week': { min: 1, max: 7 }
};

declare type keyType = 'second' | 'minute' | 'hour' | 'date' | 'month' | 'week';

const returnTheNumArea = (key: keyType) => {
    let result: any[] = [];
    for (let i = numAreaEnum[key].min; i <= numAreaEnum[key].max; i++) {
        result.push({ label: `${i}`, value: `${i}` });
    }
    return result;
}

const RenderArea: React.FC<{
    change: (value: string) => void;
    keyStr: keyType;
}> = ({ change, keyStr }) => {

    const valueEnum = {
        'second': ["*", [0, 59], [0, 1], []],
        'minute': ["*", [0, 59], [0, 1], []],
        'hour': ["*", [0, 23], [0, 1], []],
        'date': ["*", [1, 31], [1, 1], [], "?"],
        'month': ["*", [1, 12], [1, 1], []],
        'week': ["*", [1, 7], [1, 1], [], "?", "1L"]
    };
    const strEnum = {
        'second': '秒',
        'minute': '分',
        'hour': '时',
        'date': '日',
        'month': '月',
        'week': '周'
    };

    const [value, setValue] = useState<any[]>(valueEnum[keyStr]);
    const [index, setIndex] = useState<number>(keyStr === "week" ? 4 : 0);

    const toParent = () => {
        let result = "";
        if (index === 0 || index === 4 || index === 5) result = value[index];
        if (index === 1) result = value[index].join("-");
        if (index === 2) result = value[index].join("/");
        if (index === 3) {
            if (value[index].length === 0) result = "*"
            else result = value[index].join(",");
        }
        change(result);
    }

    const arrChange = (arrIndex: number, values: number, index: number) => {
        let origin = value;
        let old = origin[arrIndex];
        old.splice(index, 1, values);
        setValue(origin);
        toParent();
    }

    useEffect(toParent, [index]);

    return <Radio.Group value={index} onChange={(e: any) => { setIndex(e.target.value); }}>
        <Radio value={0} style={radioStyle}>每{strEnum[keyStr]}</Radio>
        {(keyStr === "date" || keyStr === "week") && <Radio value={4} style={radioStyle}>不指定</Radio>}
        <Radio value={1} style={radioStyle}>
            <Space align="start">
                <p>周期从</p>
                <InputNumber disabled={index !== 1} min={numAreaEnum[keyStr].min} max={numAreaEnum[keyStr].max} defaultValue={numAreaEnum[keyStr].min} onChange={e => arrChange(1, e, 0)} size="small" />
                <p>到</p>
                <InputNumber disabled={index !== 1} min={numAreaEnum[keyStr].min} max={numAreaEnum[keyStr].max} defaultValue={numAreaEnum[keyStr].max} onChange={e => arrChange(1, e, 1)} size="small" />
                <p>{strEnum[keyStr]}</p>
            </Space>
        </Radio>
        <Radio value={2} style={radioStyle}>
            {keyStr !== "week" && <Space align="start">
                <p>从</p>
                <InputNumber disabled={index !== 2} min={numAreaEnum[keyStr].min} max={numAreaEnum[keyStr].max} defaultValue={numAreaEnum[keyStr].min} onChange={e => arrChange(2, e, 0)} size="small" />
                <p>{strEnum[keyStr]}开始，每</p>
                <InputNumber disabled={index !== 2} min={numAreaEnum[keyStr].min} defaultValue={1} onChange={e => arrChange(2, e, 1)} size="small" />
                <p>{strEnum[keyStr]}执行一次</p>
            </Space>
            }
            {
                keyStr === "week" && <Space align="start">
                    <p>第</p>
                    <InputNumber disabled={index !== 2} min={1} max={4} defaultValue={1} onChange={e => arrChange(2, e, 0)} size="small" />
                    <p>周的星期</p>
                    <InputNumber disabled={index !== 2} min={numAreaEnum[keyStr].min} max={numAreaEnum[keyStr].max} defaultValue={1} onChange={e => arrChange(2, e, 1)} size="small" />
                </Space>
            }

        </Radio>
        {keyStr === "week" && <Radio value={5} style={radioStyle}>
            <Space align="start">
                <p>本月最后一个星期</p>
                <InputNumber disabled={index !== 5} min={numAreaEnum[keyStr].min} max={numAreaEnum[keyStr].max} defaultValue={numAreaEnum[keyStr].min} onChange={e => {
                    let old = value;
                    old.splice(old.length - 1, 1, `${e}L`);
                    setValue(old);
                    toParent();
                }} size="small" />
            </Space>
        </Radio>}
        <Radio value={3} style={{ ...radioStyle, marginTop: '10px' }}>指定：<div>
            <Checkbox.Group options={returnTheNumArea(keyStr)} onChange={e => {
                let origin = value;
                value.splice(3, 1, e);
                setValue(origin);
                toParent();
            }} disabled={index !== 3} />
        </div>
        </Radio>
    </Radio.Group>
}

export interface cronProps {
    showResult?: boolean;
    setValue: (e: string) => void;
}

const page: React.FC<cronProps> = ({ setValue, showResult }) => {

    const [second, setSecond] = useState<string>("*");
    const [minute, setMinute] = useState<string>("*");
    const [hour, setHour] = useState<string>("*");
    const [date, setDate] = useState<string>("*");
    const [month, setMonth] = useState<string>("*");
    const [week, setWeek] = useState<string>("?");

    const getCorn = () => (second + " " + minute + " " + hour + " " + date + " " + month + " " + week);

    useEffect(() => setValue(getCorn()), [getCorn()]);

    return <>
        <Tabs defaultActiveKey="1">
            <TabPane tab="秒（second）" key="1">
                <RenderArea change={setSecond} keyStr="second" />
            </TabPane>
            <TabPane tab="分（minute）" key="2">
                <RenderArea change={setMinute} keyStr='minute' />
            </TabPane>
            <TabPane tab="时（hour）" key="3">
                <RenderArea change={setHour} keyStr='hour' />
            </TabPane>
            <TabPane tab="日（date）" key="4">
                <RenderArea change={setDate} keyStr='date' />
            </TabPane>
            <TabPane tab="月（month）" key="5">
                <RenderArea change={setMonth} keyStr='month' />
            </TabPane>
            <TabPane tab="周（week）" key="6">
                <RenderArea change={setWeek} keyStr='week' />
            </TabPane>
        </Tabs>
        {showResult && <p>cron 表达式：{getCorn()}</p>}
    </>
}

export default page;