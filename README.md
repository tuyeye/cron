# cron
🏆 自己項目中使用的Cron生成組件，網上的不好用，索性自己造了個 😁 基於 antd 的 ui 實現的 react 輕量級組件，表單組件般的體驗～

## 📦 Install

```bash
npm install @tuyeye/cron
```

```bash
yarn add @tuyeye/cron
```

## 🔨 Usage

```tsx
import Cron from '@tuyeye/cron';

ReactDOM.render(<Cron setValue={ value => console.log(value)} showResult/>, mountNode);
```

## 🏆 Props

| 屬性 | 類型 | 描述 | 默認值 |
| ------ | ------ | ------ | ------ |
| setValue | (value:string)=>void | 值改變的回調函數 | - |
| showResult | boolean | 是否要在組件下方顯示結果 | false |

## 按需加载导致的样式丢失问题的解决办法
```tsx
 import 'antd/dist/antd.css';
 ```
