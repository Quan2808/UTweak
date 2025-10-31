# YouTube Tweak Manager

Extension Chrome/Edge để quản lý các tweak cho YouTube với giao diện Material UI.

## 🎯 Tính năng

### Giao diện (UI)

- **Custom Logo**: Thay đổi logo YouTube

### Phát video (Playback)

- **YouTube NonStop**: Tự động bỏ qua popup "Bạn vẫn đang xem?"

## 🚀 Cài đặt

### Development

```bash
npm install
npm run dev
```

### Build Extension

```bash
npm run build
```

Sau khi build, load extension từ thư mục `dist`:

1. Mở `chrome://extensions` (Chrome) hoặc `edge://extensions` (Edge)
2. Bật "Developer mode"
3. Click "Load unpacked"
4. Chọn thư mục `dist`

## 📁 Cấu trúc

```
src/
├── popup/              # React UI với Material UI
│   ├── App.jsx        # Component chính
│   ├── index.jsx      # Entry point
│   └── popup.html     # HTML template
├── content/           # Content scripts
│   ├── ContentManager.js    # Quản lý tweaks
│   └── tweaks/             # Các tweak modules
│       ├── ui/            # UI tweaks
│       │   └── LogoReplacer.js
│       └── playback/      # Playback tweaks
│           └── YoutubeNonStop.js
├── background/        # Background service worker
│   └── background.js
└── shared/           # Code dùng chung
    ├── config.js    # Cấu hình tweaks
    ├── storage.js   # Storage manager
    └── constants.js # Constants
```

## 🔧 Thêm Tweak mới

### Bước 1: Tạo class tweak

Tạo file trong `src/content/tweaks/[category]/YourTweak.js`:

```javascript
export class YourTweakClass {
  constructor() {
    this.id = "your-tweak-id";
    this.isActive = false;
  }

  enable() {
    if (this.isActive) return;
    this.isActive = true;
    // Code kích hoạt
    console.log("[YourTweak] ✅ Enabled");
  }

  disable() {
    if (!this.isActive) return;
    this.isActive = false;
    // Code vô hiệu hóa
    console.log("[YourTweak] ❌ Disabled");
  }
}
```

### Bước 2: Thêm vào config

Trong `src/shared/config.js`:

```javascript
{
  id: 'your-tweak-id',
  name: 'Tên hiển thị',
  description: 'Mô tả chi tiết',
  category: 'ui', // hoặc 'playback', 'premium'
  requiresContent: true,
  requiresBackground: false,
  enabled: false
}
```

### Bước 3: Register tweak

Trong `src/content/tweaks/index.js`:

```javascript
import { YourTweakClass } from "./[category]/YourTweak";

export const TWEAK_CLASSES = {
  "your-tweak-id": YourTweakClass,
  // ... các tweak khác
};
```

### Bước 4: (Optional) Thêm category mới

Trong `src/shared/constants.js`:

```javascript
export const CATEGORIES = {
  YOUR_CATEGORY: {
    id: "your-category",
    label: "Tên category",
    icon: "IconName", // từ @mui/icons-material
    color: "#FF5722",
  },
};
```

## 💡 Best Practices

1. **Cleanup**: Luôn implement cleanup trong `disable()` để remove listeners, observers
2. **Console logs**: Dùng format `[TweakName] ✅/❌ message` để dễ debug
3. **Error handling**: Wrap code trong try-catch để tránh crash
4. **Performance**: Dùng debounce/throttle cho event listeners
5. **Compatibility**: Test trên cả YouTube.com và music.youtube.com

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Material UI 5** - Component library
- **Vite** - Build tool
- **Chrome Extension Manifest V3**

## 📝 License
