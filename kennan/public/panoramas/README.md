# 360° Panorama Görselleri

Bu klasör, projelerin sanal tur sayfalarında kullanılan 360° panorama görsellerini içerir.

## Klasör Yapısı

```
panoramas/
├── sahil-yali/
│   ├── giris.jpg
│   ├── salon.jpg
│   ├── mutfak.jpg
│   └── teras.jpg
├── kent-kulesi/
│   ├── lobi.jpg
│   ├── atrium.jpg
│   └── ofis.jpg
├── beyaz-avlu/
│   ├── avlu.jpg
│   ├── hol.jpg
│   └── yatak.jpg
└── lagun-park/
    ├── promenad.jpg
    ├── gozlem.jpg
    └── sahil.jpg
```

## Görsel Gereksinimleri

### Format
- **Dosya tipi:** JPG veya PNG (JPG önerilir, daha küçük boyut)
- **Projeksiyon:** Equirectangular (küresel panorama)
- **En-boy oranı:** 2:1 (genişlik, yüksekliğin 2 katı olmalı)

### Çözünürlük Önerileri
| Kalite | Çözünürlük | Dosya Boyutu (yaklaşık) |
|--------|------------|-------------------------|
| Standart | 4096 x 2048 px | 1-3 MB |
| Yüksek | 6144 x 3072 px | 3-6 MB |
| Ultra | 8192 x 4096 px | 5-10 MB |

> **Not:** Web performansı için 4096x2048 veya 6144x3072 önerilir.

## Twinmotion'dan Export

1. Kamerayı istediğiniz noktaya yerleştirin
2. **Media > Image** seçin
3. **Image Type:** Panorama 360°
4. **Resolution:** 4K veya 8K
5. **Format:** JPEG (Quality: 90-95)
6. Dosyayı ilgili proje klasörüne kaydedin

## Lumion'dan Export

1. **Photo Mode** açın
2. Kamerayı konumlandırın
3. **360 Panorama** seçeneğini aktif edin
4. **Resolution:** 4096 veya 8192
5. **Output Format:** JPEG
6. Render alın ve dosyayı ilgili klasöre taşıyın

## Enscape'den Export

1. **Visual Settings > Output** açın
2. **Panorama** modunu seçin
3. **Resolution:** 4K
4. **Render** butonuna tıklayın
5. Dosyayı kaydedin

## V-Ray'den Export

1. **VRay Frame Buffer** açın
2. **Render Elements > VRaySphericalHarmonic** ekleyin
3. Kamera tipini **Spherical** olarak ayarlayın
4. Render alın ve JPEG olarak kaydedin

---

## projects.ts Güncelleme

Görselleri ekledikten sonra `src/data/projects.ts` dosyasındaki URL'leri güncelleyin:

```typescript
panoramaScenes: [
  {
    id: "giris",
    name: "Giriş Holü",
    imageUrl: "/panoramas/sahil-yali/giris.jpg",  // <- Yerel dosya yolu
    position: { x: 30, y: 70 },
    hotspots: [
      { id: "h1", targetSceneId: "salon", yaw: 45, pitch: 0, label: "Salon" },
    ],
  },
  // ...
],
```

## Hotspot Yaw/Pitch Değerleri

- **yaw:** Yatay açı (-180° ile 180° arası). 0° = ileri, 90° = sağ, -90° = sol, 180° = arkası
- **pitch:** Dikey açı (-90° ile 90° arası). 0° = düz, pozitif = yukarı, negatif = aşağı

### İpucu
Hotspot'ların doğru yönde görünmesi için 360° görselinizdeki kapı/geçiş yönlerini kontrol edin ve yaw değerlerini buna göre ayarlayın.

---

## Sorun Giderme

### Görsel yüklenmiyor
- Dosya adının küçük harf ve Türkçe karakter içermediğinden emin olun
- Dosya uzantısının `.jpg` veya `.png` olduğunu kontrol edin
- Tarayıcı önbelleğini temizleyin

### Görsel bozuk görünüyor
- En-boy oranının tam olarak 2:1 olduğundan emin olun
- Equirectangular projeksiyon kullandığınızı doğrulayın

### Yavaş yükleme
- Dosya boyutunu 5 MB altında tutmaya çalışın
- JPEG kalitesini %85-90 arasında ayarlayın
