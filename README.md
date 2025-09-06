# My Expense Tracker

一個純前端的支出記錄和統計應用程式，使用 HTML、CSS 和 JavaScript 開發。

## 功能特色

- 📱 響應式設計，適配各種螢幕尺寸
- 💰 支出記錄功能，包含日期、類別、項目、金額和描述
- 📊 統計分析功能，包含圓餅圖和統計列表
- 🎨 現代化 UI 設計，使用漸層背景和圓角設計
- ⚡ 純前端實現，無需後端服務器

## 使用方式

1. 直接在瀏覽器中開啟 `index.html` 檔案
2. 或者使用本地服務器：
   ```bash
   # 使用 Python 3
   python -m http.server 8000
   
   # 使用 Node.js (需要安裝 http-server)
   npx http-server
   ```

## 功能說明

### 支出記錄 (Expense Tab)
- **Date / Time**: 輸入支出日期和時間，格式為 `YYYY-MM-DD : hh[am/pm]`
- **Now 按鈕**: 快速填入當前時間
- **Category**: 選擇支出類別 (Food, Entertain, Travel, Utility)
- **Item**: 輸入支出項目名稱
- **Expense**: 輸入支出金額（整數）
- **Description**: 可選的支出描述
- **Record 按鈕**: 記錄支出資料

### 統計分析 (Statistics Tab)
- **圓餅圖**: 顯示各類別支出的比例
- **統計列表**: 顯示各類別的支出總額
- **總計**: 顯示所有支出的總金額

## 技術規格

- **HTML5**: 語義化標記
- **CSS3**: Flexbox 布局、CSS Grid、動畫效果
- **JavaScript ES6+**: 模組化程式設計、Canvas API
- **響應式設計**: 支援桌面和行動裝置
- **無依賴**: 不依賴任何外部框架或函式庫

## 檔案結構

```
my-expense/
├── index.html          # 主 HTML 檔案
├── styles.css          # CSS 樣式檔案
├── script.js           # JavaScript 功能檔案
├── package.json        # 專案配置檔案
├── .gitignore         # Git 忽略檔案
└── README.md          # 說明文件
```

## 瀏覽器支援

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 開發說明

這個專案使用純前端技術開發，所有資料都儲存在瀏覽器的記憶體中。重新整理頁面後，所有資料會清空。

## 授權

MIT License
