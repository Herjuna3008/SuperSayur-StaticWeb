module.exports = {

"[project]/src/components/ProductCard.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>ProductCard
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
;
function ProductCard({ product }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transform transition-transform hover:scale-105 duration-300 animate-fadeIn group",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "relative",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                    src: product.image_url || "https://source.unsplash.com/400x300/?vegetable",
                    alt: product.name,
                    className: "h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                }, void 0, false, {
                    fileName: "[project]/src/components/ProductCard.js",
                    lineNumber: 5,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ProductCard.js",
                lineNumber: 4,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                        className: "font-semibold text-lg mb-1",
                        children: [
                            product.name,
                            " 1Kg"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ProductCard.js",
                        lineNumber: 12,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductCard.js",
                        lineNumber: 13,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ProductCard.js",
                lineNumber: 11,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ProductCard.js",
        lineNumber: 3,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/pages/product.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>Products
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Navbar$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Navbar.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Footer.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProductCard.js [ssr] (ecmascript)");
;
;
;
;
;
;
const categories = [
    {
        key: "all",
        name: "Semua"
    },
    {
        key: "sayuran",
        name: "Sayur"
    },
    {
        key: "daging",
        name: "Daging"
    },
    {
        key: "seafood",
        name: "Seafood"
    }
];
function Products() {
    const [allProducts, setAllProducts] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([
        {
            "id": 1,
            "name": "Brokoli",
            "category": "sayuran",
            "image_url": "https://cdn.pixabay.com/photo/2016/06/11/15/33/broccoli-1450274_640.png"
        },
        {
            "id": 2,
            "name": "Bayam",
            "category": "sayuran",
            "image_url": "https://image.astronauts.cloud/product-images/2025/6/BabyBayamHydroponicAstroGoods200gram56372b12312b44349a3c79c76a52156a900x900removebgpreview_adc5fec5-007a-4aeb-90c8-4051c93cbb9b_900x900.png"
        },
        {
            "id": 3,
            "name": "Baby Pakcoy",
            "category": "sayuran",
            "image_url": "https://elementor.merkulov.design/wp-content/uploads/2021/10/product-1-768x559.png"
        },
        {
            "id": 4,
            "name": "Buncis",
            "category": "sayuran",
            "image_url": "https://images.finegardening.com/app/uploads/2019/10/27224302/25247-e1567103117482-700x361-700x361.png"
        },
        {
            "id": 5,
            "name": "Baby Buncis",
            "category": "sayuran",
            "image_url": "https://asset.kompas.com/crops/YVrgMwYNzcRdYhg_UG1MLe7m1oA=/0x32:500x365/1200x800/data/photo/2023/04/08/64310402284bd.jpg"
        },
        {
            "id": 6,
            "name": "Baby Kailan",
            "category": "sayuran",
            "image_url": "https://image.astronauts.cloud/product-images/2024/5/1Cover12_cb35df8c-42da-4df9-9747-a57ff86415d7_900x900.png"
        },
        {
            "id": 7,
            "name": "Rawit Merah",
            "category": "sayuran",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//102/MTA-10881389/hypermart_cabe-rawit-merah-100-gr_full01.jpg"
        },
        {
            "id": 8,
            "name": "Cabe Rawit Hijau",
            "category": "sayuran",
            "image_url": "https://asparindogrosir.com/uploads/product/1679904011.png"
        },
        {
            "id": 9,
            "name": "Cabe Merah Keriting",
            "category": "sayuran",
            "image_url": "https://i0.wp.com/raisa.aeonstore.id/wp-content/uploads/2023/04/805353.jpg?fit=800%2C800&ssl=1"
        },
        {
            "id": 10,
            "name": "Cabe Merah Besar",
            "category": "sayuran",
            "image_url": "https://cantina-canggu.com/cdn/shop/products/longchili_530x@2x.jpg?v=1593338464"
        },
        {
            "id": 11,
            "name": "Cabe Hijau Kriting",
            "category": "sayuran",
            "image_url": "https://d27xm72ryhvga.cloudfront.net/product/15_07_2022_01_54_32_cabe_hijau_keritingg.jpg"
        },
        {
            "id": 12,
            "name": "Cabe Hijau Besar",
            "category": "sayuran",
            "image_url": "https://image.astronauts.cloud/product-images/2024/12/CabeHijauBesar21_6ab56069-d9cc-48c6-b757-21f28b254f95_900x900.jpg"
        },
        {
            "id": 13,
            "name": "Cabe Rawit Merah Blitar",
            "category": "sayuran",
            "image_url": "https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2023/06/05/FotoJet-28-3224431605.jpg"
        },
        {
            "id": 14,
            "name": "Cabe Rawit Merah Blitar Petik",
            "category": "sayuran",
            "image_url": "https://images.tokopedia.net/img/cache/700/VqbcmM/2021/8/21/107b72fd-a57c-43dd-9c60-dae7ae0e600c.jpg"
        },
        {
            "id": 15,
            "name": "Cabe Rawit Hijau Petik",
            "category": "sayuran",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//96/MTA-44047166/no_brand_cabe_rawit_hijau_petik_250_gr_full01_nm8kskdi.jpg"
        },
        {
            "id": 16,
            "name": "Cahesim Pahit",
            "category": "sayuran",
            "image_url": "https://sayurbox-blog-stage.s3.amazonaws.com/uploads/2020/03/caisimm-org-1080.jpg"
        },
        {
            "id": 17,
            "name": "Cahesim",
            "category": "sayuran",
            "image_url": "https://allofresh.id/blog/wp-content/uploads/2023/03/caisim-adalah-scaled.jpg"
        },
        {
            "id": 18,
            "name": "Cuciwis",
            "category": "sayuran",
            "image_url": "https://images.tokopedia.net/img/cache/700/product-1/2020/4/1/71621648/71621648_ae91c898-8eb5-4038-a669-d3b625bd5f56_700_700"
        },
        {
            "id": 19,
            "name": "Celery Stick",
            "category": "sayuran",
            "image_url": "https://vivregourmet.com/wp-content/uploads/2020/07/Celery-Stick.png"
        },
        {
            "id": 20,
            "name": "Daun Wansui / Daun Ketumbar",
            "category": "sayuran",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//101/MTA-50716774/oem_daun_wansui-_daun_ketumbar_segar_1_kg_full01_gcqjv4we.jpg"
        },
        {
            "id": 21,
            "name": "Daun Kemangi",
            "category": "sayuran",
            "image_url": "https://bnp.jambiprov.go.id/wp-content/uploads/2023/08/Manfaat-daun-kemangi.png"
        },
        {
            "id": 22,
            "name": "Daun Bawang",
            "category": "sayuran",
            "image_url": "https://drivethru.klikindomaret.com/tk30/wp-content/uploads/sites/33/2021/05/daun-bawang.jpg"
        },
        {
            "id": 23,
            "name": "Daun Pisang",
            "category": "sayuran",
            "image_url": "https://image.astronauts.cloud/product-images/2024/5/1Cover114_100fc87d-21aa-4c83-a9fc-6896f0eff283_900x900.png"
        },
        {
            "id": 24,
            "name": "Daun Pepaya Jepang",
            "category": "sayuran",
            "image_url": "https://kecipir.id/cdn/shop/files/Daunpepayakebunsalampage1.jpg?v=1712291248"
        },
        {
            "id": 25,
            "name": "Daun Parsley",
            "category": "sayuran",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//103/MTA-8498091/afcbandung_daun_parsley_peterseli_sayur_parseli_segar_100gr_full01_cuqw7ik5.jpg"
        },
        {
            "id": 26,
            "name": "Daun Pandan",
            "category": "sayuran",
            "image_url": "https://image.astronauts.cloud/product-images/2024/5/1Cover46_f0ee7e7e-abe3-4103-aadb-8300beb5711f_900x900.png"
        },
        {
            "id": 27,
            "name": "Daun Mint",
            "category": "sayuran",
            "image_url": "https://puskesmasmeninting-dikes.lombokbaratkab.go.id/media/crop/2025/05/05/57-20250505-111814-883880.jpg"
        },
        {
            "id": 28,
            "name": "Daun Melinjo",
            "category": "sayuran",
            "image_url": "https://res.cloudinary.com/dk0z4ums3/image/upload/v1613996169/attached_image/inilah-5-manfaat-daun-melinjo-untuk-kesehatan-tubuh.jpg"
        },
        {
            "id": 29,
            "name": "Daun Seledri",
            "category": "sayuran",
            "image_url": "https://desagrogol.gunungkidulkab.go.id/assets/files/dokumen/SELEDRI.jpg"
        },
        {
            "id": 30,
            "name": "Daun Singkong",
            "category": "sayuran",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLo5dpZJWvdPsGbp0HVBB5MkOMOsKvJWi-9Q&s"
        },
        {
            "id": 31,
            "name": "Daun Kucai",
            "category": "sayuran",
            "image_url": "https://res.cloudinary.com/dk0z4ums3/image/upload/v1606097410/attached_image/7-manfaat-kucai-yang-belum-banyak-diketahui.jpg"
        },
        {
            "id": 32,
            "name": "Horenso",
            "category": "sayuran",
            "image_url": "https://sayurbox-blog-stage.s3.amazonaws.com/uploads/2020/01/horenzo-org-500.jpg"
        },
        {
            "id": 33,
            "name": "Jeruk Nipis",
            "category": "sayuran",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6rhS7MHPP_r6kO07p05mVUUuR2mFEfFYC8Q&s"
        },
        {
            "id": 34,
            "name": "Jeruk Nipis Kuning",
            "category": "sayuran",
            "image_url": "https://d27xm72ryhvga.cloudfront.net/product/16_11_2020_03_20_28_JERUK_NIPIS_KUNING.jpg"
        },
        {
            "id": 35,
            "name": "Jagung Manis",
            "category": "sayuran",
            "image_url": "https://pasarsegar.co.id/wp-content/uploads/2020/06/jagungmanis.jpeg"
        },
        {
            "id": 36,
            "name": "Jagung Muda",
            "category": "sayuran",
            "image_url": "https://asset.kompas.com/crops/_Ui0WRQgp4qFbMUR13EUIovxywo=/100x98:900x632/1200x800/data/photo/2023/04/25/6447c89e49faa.jpg"
        },
        {
            "id": 37,
            "name": "Jagung Manis Kupas",
            "category": "sayuran",
            "image_url": "https://sosialita.tanahlautkab.go.id/assets/uploads/webp/fotoproduk/crop/PL1Frm8j20230330121521.jpeg.webp"
        },
        {
            "id": 38,
            "name": "Jamur Champingnon",
            "category": "sayuran",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/100/MTA-162448291/no_brand_jamur_champignon_-_jamur_kancing_-_mushroom_champignon_full02_r5g1f543.jpg"
        },
        {
            "id": 39,
            "name": "Jamur Merang",
            "category": "sayuran",
            "image_url": "https://www.greeners.co/wp-content/uploads/2020/06/Jamur-Merang-Jamur-Pangan-Favorit-Bergizi-Tinggi-2.jpg"
        },
        {
            "id": 40,
            "name": "Jamur Kuping",
            "category": "sayuran",
            "image_url": "https://sufarm.id/storage/2022/09/Jamur-Kuping-Copy-2.png"
        },
        {
            "id": 41,
            "name": "Jengkol",
            "category": "sayuran",
            "image_url": "https://www.kebunindo.com/wp-content/uploads/2024/11/jengkol.webp"
        },
        {
            "id": 42,
            "name": "Jamur Shimeji",
            "category": "sayuran",
            "image_url": "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/11/28091909/Ini-7-Manfaat-Jamur-Shimeji-yang-bagi-Kesehatan-dan-Cara-Mengolahnya.jpg.webp"
        },
        {
            "id": 43,
            "name": "Jeruk Limo",
            "category": "sayuran",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//103/MTA-8395924/afcbandung_buah_jeruk_limau_jeruk_limo_untuk_sambal_500gr_full02_s32bpi7w.jpg"
        },
        {
            "id": 44,
            "name": "Jamur Shitake",
            "category": "sayuran",
            "image_url": "https://image.astronauts.cloud/product-images/2024/5/Slide1CoverJamurShitake200gr_4ae1c99a-1fb8-4f3f-a397-2e0fe710998e_900x900.png"
        },
        {
            "id": 45,
            "name": "Jamur Tiram",
            "category": "sayuran",
            "image_url": "https://umsu.ac.id/health/wp-content/uploads/2024/03/Manfaat-Jamur-Tiram-yang-Tidak-Boleh-Dilewatkan.jpg"
        },
        {
            "id": 46,
            "name": "Kol",
            "category": "sayuran",
            "image_url": "https://res.cloudinary.com/dk0z4ums3/image/upload/v1715673884/attached_image/kol-putih-ketahui-nutrisi-dan-6-manfaatnya.jpg"
        },
        {
            "id": 47,
            "name": "Kembang Kol",
            "category": "sayuran",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//101/MTA-13595456/greenfresh_kembang_kol_-_bunga_kol_-500_gr-_full01_lkio86e1.jpg"
        },
        {
            "id": 48,
            "name": "Kol Ungu",
            "category": "sayuran",
            "image_url": "https://tribratanews.polri.go.id/web/image/blog.post/72963/image"
        },
        {
            "id": 49,
            "name": "Kangkung",
            "category": "sayuran",
            "image_url": "https://pasarsegar.co.id/wp-content/uploads/2021/02/kangkung.jpg"
        },
        {
            "id": 50,
            "name": "Kentang Rendang",
            "category": "sayuran",
            "image_url": "https://d27xm72ryhvga.cloudfront.net/product/08_12_2018_02_22_38_KENTANG_RENDANG.jpg"
        },
        {
            "id": 51,
            "name": "Kentang AB",
            "category": "sayuran",
            "image_url": "https://d27xm72ryhvga.cloudfront.net/product/07_12_2018_06_10_35_KENTANG_B.jpg"
        },
        {
            "id": 52,
            "name": "Kacang Tanah Kulit",
            "category": "sayuran",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/MTA-38532612/none_kentang_full01_c11d1145.jpg"
        },
        {
            "id": 53,
            "name": "Kelapa Tua Utuh",
            "category": "sayuran",
            "image_url": "https://d27xm72ryhvga.cloudfront.net/product/13_02_2024_11_02_19_22_02_2022_09_59_03_kelapa_tua_utuh_kupas1.jpg"
        },
        {
            "id": 54,
            "name": "Kacang Panjang",
            "category": "sayuran",
            "image_url": "https://kecipir.com/cdn/shop/products/34bdf6212eda0204e2b8629e37764c02_ad14a6cb-b5d8-4a3c-ad1d-a124903215a2.jpg?v=1710923449"
        },
        {
            "id": 55,
            "name": "Kecipir",
            "category": "sayuran",
            "image_url": "https://umsu.ac.id/health/wp-content/uploads/2024/04/Kandungan-dan-Manfaat-Kecipir-Untuk-Kesehatan-Tubuh.jpg"
        },
        {
            "id": 56,
            "name": "Lobak",
            "category": "sayuran",
            "image_url": "https://res.cloudinary.com/dk0z4ums3/image/upload/v1638863853/attached_image/manfaat-lobak-dari-obat-herba-hingga-menjadi-teman-diet.jpg"
        },
        {
            "id": 57,
            "name": "Leunca",
            "category": "sayuran",
            "image_url": "https://res.cloudinary.com/dk0z4ums3/image/upload/v1716548564/attached_image/leunca-ini-kandungan-nutrisi-dan-manfaatnya-untuk-kesehatan.jpg"
        },
        {
            "id": 58,
            "name": "Labu Acar",
            "category": "sayuran",
            "image_url": "https://yoline.co.id/media/products/ProductLabusiamacar_kg.png"
        },
        {
            "id": 59,
            "name": "Labu",
            "category": "sayuran",
            "image_url": "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2024/08/27055207/Ini-Manfaat-Labu-dan-Kandungan-Nutrisinya-yang-Melimpah.jpg.webp"
        },
        {
            "id": 60,
            "name": "Lettuce Romaine",
            "category": "sayuran",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCS_jTmAlQlt4K-cjMd_5LRgRIzkSDVMd1fQ&s"
        },
        {
            "id": 61,
            "name": "Lettuce Head",
            "category": "sayuran",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4su0JzKDDRf6SAd8N6dz0LJwfaionhh8o8Q&s"
        },
        {
            "id": 62,
            "name": "Melinjo",
            "category": "sayuran",
            "image_url": "https://cdn1-production-images-kly.akamaized.net/26Z9CiI4jlGByaN85TIkCBvf2-Y=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/1456817/original/025426200_1483453209-Segudang-Manfaat-Kulit-Melinjo.jpg"
        },
        {
            "id": 63,
            "name": "Nangka",
            "category": "sayuran",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//99/MTA-50857720/oem_sayur_nangka_muda_potong_segar_1-2_kg_-_500_gram_full01_djneb5r9.jpg"
        },
        {
            "id": 64,
            "name": "Oyong",
            "category": "sayuran",
            "image_url": "https://static.mooimom.id/media/mamapedia/h0ENc77Y--main-image.jpg"
        },
        {
            "id": 65,
            "name": "Okra",
            "category": "sayuran",
            "image_url": "https://cdn.britannica.com/60/157660-050-99656755/Okra-fruits-section.jpg"
        },
        {
            "id": 66,
            "name": "Paprika Kuning",
            "category": "sayuran",
            "image_url": "https://image.astronauts.cloud/product-images/2024/5/1Cover38_853bf83c-05e5-4d90-89ec-9621c068de5c_900x900.png"
        },
        {
            "id": 67,
            "name": "Paprika Merah",
            "category": "sayuran",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPkK1PxY6uoB3kHupflaS9QI4b9CVN29TRGQ&s"
        },
        {
            "id": 68,
            "name": "Paprika Hijau",
            "category": "sayuran",
            "image_url": "https://raisa.aeonstore.id/wp-content/uploads/2023/04/806718.jpg"
        },
        {
            "id": 69,
            "name": "Pare",
            "category": "sayuran",
            "image_url": "https://ners.unair.ac.id/site/images/Lihat/manfaat-pare.png"
        },
        {
            "id": 70,
            "name": "Pakchoy",
            "category": "sayuran",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//95/MTA-52415950/no-brand_sayur-pakcoy-besar-200gr-ikat_full01.jpg"
        },
        {
            "id": 71,
            "name": "Pepaya Sayur",
            "category": "sayuran",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/MTA-3095967/cari_sayur_cari_sayur_-_pepaya_sayur_-0-9_-_1-1_kg-_full01_hq4d1lkb.jpeg"
        },
        {
            "id": 72,
            "name": "Pucuk Labu",
            "category": "sayuran",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS217FxK0LniYQHndbdbW5CLAk_do0ODmjy3g&s"
        },
        {
            "id": 73,
            "name": "Sawi Putih",
            "category": "sayuran",
            "image_url": "https://allofresh.id/blog/wp-content/uploads/2023/04/manfaat-sawi-putih-4.jpg"
        },
        {
            "id": 74,
            "name": "Siomak",
            "category": "sayuran",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//96/MTA-35757114/dunia_sayur_online_siomak_250_gram_full01_h7cy4py4.jpg"
        },
        {
            "id": 75,
            "name": "Selada",
            "category": "sayuran",
            "image_url": "https://manfaat.co.id/wp-content/uploads/2015/04/manfaat-selada-air.jpg"
        },
        {
            "id": 76,
            "name": "Selada Air",
            "category": "sayuran",
            "image_url": "https://awsimages.detik.net.id/community/media/visual/2022/01/02/resep-tumis-selada-air-bumbu-ulek_169.jpeg?w=600&q=90"
        },
        {
            "id": 77,
            "name": "Tomat",
            "category": "sayuran",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg"
        },
        {
            "id": 78,
            "name": "Tomat Cherry",
            "category": "sayuran",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZjRuhlVNh_ZjVVtYZPK5DZzjk1LI4iOOGoA&s"
        },
        {
            "id": 79,
            "name": "Tomat Hijau",
            "category": "sayuran",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//93/MTA-8205248/afcbandung_sayur_tomat_hijau_segar_tomat_ijo_500gr_full01_ojyq5sy3.jpg"
        },
        {
            "id": 80,
            "name": "Timun Kyuri",
            "category": "sayuran",
            "image_url": "https://image.astronauts.cloud/product-images/2024/5/1Cover68_0fcd8d66-6e3e-4af9-a02d-09625a758f5e_900x900.png"
        },
        {
            "id": 81,
            "name": "Timun Acar",
            "category": "sayuran",
            "image_url": "https://image.astronauts.cloud/product-images/2024/12/timun_bcddcfd5-dd5f-4e27-9931-e421dd7a5bf1_900x897.jpg"
        },
        {
            "id": 82,
            "name": "Terong Hijau",
            "category": "sayuran",
            "image_url": "https://pasarsegar.co.id/wp-content/uploads/2022/01/251.jpg"
        },
        {
            "id": 83,
            "name": "Terong",
            "category": "sayuran",
            "image_url": "https://harianmuba.bacakoran.co/upload/8b4d53001aa50ed604332a840c56e169.jpg"
        },
        {
            "id": 84,
            "name": "Timun SP",
            "category": "sayuran",
            "image_url": "https://cdn.ralali.id/assets/img/Libraries/DESTRA-AGRO-Timun-SP-1-Kg_CzXTsOJ6seCnFCRh_1583239194.jpg"
        },
        {
            "id": 85,
            "name": "Wortel Brastagi",
            "category": "sayuran",
            "image_url": "https://lapakbuah.com/wp-content/uploads/2021/10/wortel.jpg"
        },
        {
            "id": 86,
            "name": "Wortel Lokal",
            "category": "sayuran",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//97/MTA-11885281/dunia_sayur_online_wortel_lokal_250_gram_full01_j4szms2y.jpg"
        },
        {
            "id": 87,
            "name": "Zukini",
            "category": "sayuran",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//98/MTA-26592046/dunia_sayur_online_labu_zukini_-_zucchini_-_cukini_250_gram_full01_pdsvrdin.jpg"
        },
        {
            "id": 88,
            "name": "Bunga Lawang",
            "category": "sayuran",
            "image_url": "https://d27xm72ryhvga.cloudfront.net/product/07_01_2022_05_29_24_09_03_2020_02_25_51_bunga_lawang_cs.jpg"
        },
        {
            "id": 89,
            "name": "Buah Asam",
            "category": "sayuran",
            "image_url": "https://res.cloudinary.com/dk0z4ums3/image/upload/v1638927245/attached_image/manfaat-asam-jawa-tidak-seasam-rasanya.jpg"
        },
        {
            "id": 90,
            "name": "Cabe Kering",
            "category": "sayuran",
            "image_url": "https://d27xm72ryhvga.cloudfront.net/product/21_02_2022_11_35_12_cabe_merah_besar_kering.jpg"
        },
        {
            "id": 91,
            "name": "Cengkeh",
            "category": "sayuran",
            "image_url": "https://klikpositif.com/wp-content/uploads/2022/01/Bukan-Sekadar-Bumbu-Masak-Ini-Manfaat-Cengkeh-Bagi-Kesehatan-KlikPositif-221021014315.jpeg"
        },
        {
            "id": 92,
            "name": "Daun Jeruk",
            "category": "sayuran",
            "image_url": "https://sumateraekspres.bacakoran.co/upload/4a3d5912b7658f4b132943b8d8161af9.jpeg"
        },
        {
            "id": 93,
            "name": "Daun Salam",
            "category": "sayuran",
            "image_url": "https://dash.naturalfarm.id/uploads/article/manfaat-daun-salam-untuk-kesehatan-dan-kelezatan-kuliner-55-1700407116.jpeg"
        },
        {
            "id": 94,
            "name": "Ebi",
            "category": "sayuran",
            "image_url": "https://i0.wp.com/resepkoki.id/wp-content/uploads/2017/04/Ebi.jpg?fit=600%2C390&ssl=1"
        },
        {
            "id": 95,
            "name": "Jinten",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img249.jpg"
        },
        {
            "id": 96,
            "name": "Jahe Merah",
            "category": "sayuran",
            "image_url": "https://desagrogol.gunungkidulkab.go.id/assets/files/artikel/sedang_1724401632JAHE%20MERAH.jpg"
        },
        {
            "id": 97,
            "name": "Jahe",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img257.jpg"
        },
        {
            "id": 100,
            "name": "Keluwek",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img263.jpg"
        },
        {
            "id": 101,
            "name": "Ketumbar",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img265.jpg"
        },
        {
            "id": 102,
            "name": "Kencur",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img267.jpg"
        },
        {
            "id": 103,
            "name": "Kemiri Pecah",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img269.jpg"
        },
        {
            "id": 104,
            "name": "Kemiri",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img271.jpg"
        },
        {
            "id": 105,
            "name": "Kayu Manis",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img273.jpg"
        },
        {
            "id": 106,
            "name": "Kunyit",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img275.jpg"
        },
        {
            "id": 107,
            "name": "Lengkuas",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img277.jpg"
        },
        {
            "id": 108,
            "name": "Lada",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img279.jpg"
        },
        {
            "id": 109,
            "name": "Sereh",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img279.jpg"
        },
        {
            "id": 110,
            "name": "Temukunci",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img279.jpg"
        },
        {
            "id": 111,
            "name": "Temulawak",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img279.jpg"
        },
        {
            "id": 112,
            "name": "Bawang Putih",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img290.jpg"
        },
        {
            "id": 113,
            "name": "Bawang Putih Kupas",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img292.jpg"
        },
        {
            "id": 114,
            "name": "Bawang Putih Kating",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img294.jpg"
        },
        {
            "id": 115,
            "name": "Bawang Putih Iris",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img296.jpg"
        },
        {
            "id": 116,
            "name": "Bawang Merah",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img298.jpg"
        },
        {
            "id": 117,
            "name": "Bawang Merah Super",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img300.jpg"
        },
        {
            "id": 118,
            "name": "Bawang Merah Kupas",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img302.jpg"
        },
        {
            "id": 119,
            "name": "Bawang Merah Iris",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img304.jpg"
        },
        {
            "id": 120,
            "name": "Bawang Bombay",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img306.jpg"
        },
        {
            "id": 121,
            "name": "Dada fillet",
            "category": "daging",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//96/MTA-12077942/afcbandung_daging_ayam_fillet_dada_ayam_500gr_filet_dada_ayam_boneless_500gr_full01_h80zkn14.jpg"
        },
        {
            "id": 122,
            "name": "Paha fillet",
            "category": "daging",
            "image_url": "https://image.astronauts.cloud/product-images/2025/4/pahabonelessayamorganik250gr01_d8950d05-8f23-4962-a83f-c2c6f42704bd_900x900.jpg"
        },
        {
            "id": 123,
            "name": "Paha utuh",
            "category": "daging",
            "image_url": "https://www.sinarpahalautama.com/image-product/img25-1571205581.jpg"
        },
        {
            "id": 124,
            "name": "Ceker",
            "category": "daging",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl-RQCS0WXMRqH8R8Als37GmyzoPN5byRThQ&s"
        },
        {
            "id": 125,
            "name": "Sayap",
            "category": "daging",
            "image_url": "https://awsimages.detik.net.id/community/media/visual/2021/09/19/resep-sayap-ayam-panggang-bumbu-kecap-pedas_43.jpeg?w=480"
        },
        {
            "id": 126,
            "name": "Paha kulit",
            "category": "daging",
            "image_url": "https://nindyautama.com/wp-content/uploads/2019/01/fillet-paha-ayam-kulit.webp"
        },
        {
            "id": 127,
            "name": "Trimingan",
            "category": "daging",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDj-25Pnaw_S3ziGvvKv8MssRrfe0wBbpWUg&s"
        },
        {
            "id": 128,
            "name": "Paha bawah",
            "category": "daging",
            "image_url": "https://www.sinarpahalautama.com/image-product/img28-1571220116.jpg"
        },
        {
            "id": 129,
            "name": "Leher",
            "category": "daging",
            "image_url": "https://harumikitchen.com/cdn/shop/files/neck-01.png?v=1748919563"
        },
        {
            "id": 130,
            "name": "Kerongkongan",
            "category": "daging",
            "image_url": "https://yubissayur.com/wp-content/uploads/2020/09/ayam-kerongkongan.jpg"
        },
        {
            "id": 131,
            "name": "Udang Vaname",
            "category": "seafood",
            "image_url": "https://webicdn.com/sdirmember/27/26283/produk/26283_product_1505121550.jpg"
        },
        {
            "id": 132,
            "name": "Cumi Utuh / Cumi Fillet",
            "category": "seafood",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeH6CCqThyO_nDEk4TamlTQKoMgv_oIBho9Q&s"
        },
        {
            "id": 133,
            "name": "Kepiting Soka",
            "category": "seafood",
            "image_url": "https://trubus.id/wp-content/uploads/2023/01/Menghasilkan-Kepiting-Berkualitas-dengan-Budidaya-yang-Tepat.jpg"
        },
        {
            "id": 134,
            "name": "Fillet Ikan Kakap",
            "category": "seafood",
            "image_url": "https://image.astronauts.cloud/product-images/2025/6/IkanKakapMerahFillet132838cf6cd4243ed8cfa92d7d5df815d900x900removebgpreview_0df4be63-ecad-49de-a4cb-374edc20f2dc_900x900.png"
        },
        {
            "id": 135,
            "name": "Fillet Ikan Dori",
            "category": "seafood",
            "image_url": "https://cvmamora.com/wp-content/uploads/2017/12/Dori-Fillet-3.jpg"
        },
        {
            "id": 136,
            "name": "Ikan Tuna (loin/fillet)",
            "category": "seafood",
            "image_url": "https://cvmamora.com/wp-content/uploads/2021/01/Loin-Tuna.jpg"
        },
        {
            "id": 137,
            "name": "Bandeng / Ikan Bandeng",
            "category": "seafood",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB9KXhPA_43xSGkU9JkxXf3WHg_jb9RC4A1g&s"
        },
        {
            "id": 138,
            "name": "Scallop / Kerang",
            "category": "seafood",
            "image_url": "https://www.thoughtco.com/thmb/WcDZOJXyz_3oXv64g6IGl5izvGc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Scallop-showing-adductor-muscle-Ryoji-Yoshimoto-Aflo-getty-56a5f80e5f9b58b7d0df5201.jpg"
        },
        {
            "id": 139,
            "name": "Kerang Mussel / Kerang Laut",
            "category": "seafood",
            "image_url": "https://id.fisheryfood.com/uploads/202029232/frozen-mussel47176915048.jpg"
        }
    ]);
    const [category, setCategory] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("all");
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const validCategoryKeys = categories.map((cat)=>cat.key);
    // Sync state dengan hash di URL
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        function syncCategoryWithHash() {
            // Ambil hash (tanpa #)
            let hash = (window.location.hash || "").replace("#", "");
            if (!hash) hash = "all";
            if (!validCategoryKeys.includes(hash)) {
                // Jika gak valid fallback ke all & update URL
                window.location.hash = "all";
                setCategory("all");
            } else {
                setCategory(hash);
            }
        }
        // Jalankan sekali saat mount (initial load)
        syncCategoryWithHash();
        // Jalankan setiap hash berubah
        window.addEventListener("hashchange", syncCategoryWithHash);
        // Cleanup
        return ()=>window.removeEventListener("hashchange", syncCategoryWithHash);
    }, []);
    // Saat klik kategori, update hash (dan otomatis update state lewat useEffect)
    function handleCategoryClick(catKey) {
        window.location.hash = catKey;
    // Jangan setCategory langsung, biar useEffect yang handle (biar selalu sync)
    }
    // Filter produk by kategori dan pencarian
    const filteredProducts = allProducts.filter((prod)=>{
        const matchCategory = category === "all" || prod.category === category;
        const matchSearch = prod.name.toLowerCase().includes(search.toLowerCase());
        return matchCategory && matchSearch;
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                    children: "Daftar Produk | SuperSayur"
                }, void 0, false, {
                    fileName: "[project]/src/pages/product.js",
                    lineNumber: 888,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/product.js",
                lineNumber: 887,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Navbar$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/pages/product.js",
                lineNumber: 890,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                className: "min-h-screen bg-gray-50 pb-20 animate-fadeIn",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                    className: "max-w-6xl mx-auto px-4 py-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                            className: "text-3xl md:text-4xl font-bold text-green-700 mb-8 text-center",
                            children: "Daftar Produk"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/product.js",
                            lineNumber: 893,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "flex flex-col md:flex-row items-center justify-between gap-4 mb-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-2",
                                    children: categories.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleCategoryClick(cat.key),
                                            className: `px-5 py-2 rounded-full font-medium border transition
                    ${category === cat.key ? "bg-green-600 text-white shadow" : "bg-white text-green-700 border-green-200 hover:bg-green-100"}`,
                                            children: cat.name
                                        }, cat.key, false, {
                                            fileName: "[project]/src/pages/product.js",
                                            lineNumber: 898,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/product.js",
                                    lineNumber: 896,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "Cari produk…",
                                    className: "border border-green-300 rounded-full px-5 py-2 w-full md:w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition",
                                    value: search,
                                    onChange: (e)=>setSearch(e.target.value)
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/product.js",
                                    lineNumber: 910,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/product.js",
                            lineNumber: 895,
                            columnNumber: 11
                        }, this),
                        filteredProducts.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "py-16 text-center text-gray-400 text-lg",
                            children: "Produk tidak ditemukan."
                        }, void 0, false, {
                            fileName: "[project]/src/pages/product.js",
                            lineNumber: 920,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
                            children: filteredProducts.map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    product: product
                                }, product.id, false, {
                                    fileName: "[project]/src/pages/product.js",
                                    lineNumber: 924,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/pages/product.js",
                            lineNumber: 922,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "py-16 text-center text-black font-semibold",
                            children: "Hubungi Admin untuk melihat produk secara lengkap."
                        }, void 0, false, {
                            fileName: "[project]/src/pages/product.js",
                            lineNumber: 928,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/product.js",
                    lineNumber: 892,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/product.js",
                lineNumber: 891,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/pages/product.js",
                lineNumber: 931,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__9519b440._.js.map