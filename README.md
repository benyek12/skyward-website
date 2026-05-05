# SKYWARD OFFICIAL — Website

Website portofolio Roblox Map oleh @Benyek_store.

## 📁 Struktur Folder

```
skyward-website/
├── index.html          ← File utama (halaman website)
├── css/
│   └── style.css       ← Semua styling / tampilan
├── js/
│   └── main.js         ← JavaScript (animasi, interaksi)
├── assets/             ← Taruh gambar thumbnail di sini
│   ├── thumb-neokoplo.jpg   (opsional)
│   └── thumb-skyward.jpg    (opsional)
└── README.md
```

---

## 🖼️ Cara Ganti Thumbnail Map

1. Simpan gambar thumbnail ke folder `assets/`
2. Buka `index.html`
3. Cari komentar `<!-- CARA GANTI THUMBNAIL -->`
4. Ganti blok `<div class="map-thumb-placeholder">` dengan:

```html
<img src="assets/thumb-neokoplo.jpg" alt="NEO KOPLO VIBES" class="map-thumb" />
```

---

## ✏️ Cara Edit Konten

| Yang mau diubah | Edit di mana |
|---|---|
| Teks, judul, link | `index.html` |
| Warna, font, ukuran | `css/style.css` |
| Animasi, efek hover | `js/main.js` |

---

## 🚀 Cara Hosting

### Opsi 1: GitHub Pages (GRATIS)
1. Buat repo baru di GitHub
2. Upload semua file (pertahankan struktur folder)
3. Masuk ke Settings → Pages → pilih branch `main`
4. Website live di: `https://username.github.io/nama-repo`

### Opsi 2: Netlify (GRATIS)
1. Drag & drop folder `skyward-website/` ke netlify.com/drop
2. Langsung live + dapat domain gratis `.netlify.app`

### Opsi 3: Vercel (GRATIS)
1. Push ke GitHub
2. Import di vercel.com
3. Auto-deploy setiap kali push

---

## 🔗 Link Penting

- Discord: https://discord.gg/2eVstAeQEH
- Bagi Bagi: https://bagibagi.co/SKYWARD_OFFICIAL
- NEO KOPLO VIBES: https://www.roblox.com/id/games/123508549180410/NEO-KOPLO-VIBES
- SKYWARD SOCIETY: https://www.roblox.com/id/games/100440865732420/SKYWARD-SOCIETY
