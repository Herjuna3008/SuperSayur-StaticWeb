module.exports = {

"[project]/src/components/ReviewCarousel.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>ReviewSection
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$keen$2d$slider$2f$react$2e$js__$5b$external$5d$__$28$keen$2d$slider$2f$react$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/keen-slider/react.js [external] (keen-slider/react.js, cjs)");
;
;
;
;
// Dummy data
const reviews = [
    {
        name: "Teddy Nursyafrani",
        date: "1 year ago",
        rating: 5,
        text: "Baru pertama kali coba order untuk usaha saya, ternyata sangat menguntungkan banget. Cocok ini buat jadi langganan sukse..."
    },
    {
        name: "Martha Diniyanti",
        date: "1 year ago",
        rating: 5,
        text: "Worth it banget ternyata ada supplier yang sigap dan siap untuk kita repotin. Staf tetap ramah dan proses cepat."
    },
    {
        name: "Ika Amalia",
        date: "1 year ago",
        rating: 5,
        text: "Good job"
    },
    {
        name: "Hendri Wirawan",
        date: "2 years ago",
        rating: 4,
        text: "Pelayanan oke, variasi produk banyak, kadang promo menarik."
    },
    {
        name: "Sari Pratiwi",
        date: "5 days ago",
        rating: 5,
        text: "Beli dalam jumlah besar untuk acara kantor, semua fresh dan rapi."
    },
    {
        name: "Budi Santoso",
        date: "1 month ago",
        rating: 4,
        text: "Lokasi strategis, pelayan ramah, area bersih."
    },
    {
        name: "Nina Rachmawati",
        date: "2 weeks ago",
        rating: 5,
        text: "Order via WA gampang, pengantaran cepat, produk tidak pernah kecewa."
    },
    {
        name: "Rian Aditya",
        date: "3 months ago",
        rating: 5,
        text: "Langganan bulanan buat restoran. Sering ada diskon. Support adminnya cepat."
    },
    {
        name: "Mira Febrianti",
        date: "8 months ago",
        rating: 5,
        text: "Kualitas buah dan sayur fresh. Harga terjangkau."
    },
    {
        name: "Dwi Cahya",
        date: "1 year ago",
        rating: 5,
        text: "Tempatnya luas, nyaman, bisa mesen di mesin Self order kios, posisi sebelah SPBU. Produknya segar, pengiriman tepat waktu. Sangat recommended untuk belanja keluarga."
    }
];
// Card avatar
function ReviewAvatar({ name }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl font-bold text-green-600 border-2 border-green-200",
        children: name[0]
    }, void 0, false, {
        fileName: "[project]/src/components/ReviewCarousel.js",
        lineNumber: 72,
        columnNumber: 5
    }, this);
}
// Card star
function StarBar({ rating }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "flex gap-0.5 mb-2",
        children: Array.from({
            length: 5
        }).map((_, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                viewBox: "0 0 20 20",
                className: "w-5 h-5",
                fill: idx < rating ? "#FBC02D" : "#E2E8F0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                    d: "M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.564-.955L10 0l2.947 5.955 6.564.955-4.756 4.635 1.123 6.545z"
                }, void 0, false, {
                    fileName: "[project]/src/components/ReviewCarousel.js",
                    lineNumber: 84,
                    columnNumber: 11
                }, this)
            }, idx, false, {
                fileName: "[project]/src/components/ReviewCarousel.js",
                lineNumber: 83,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/ReviewCarousel.js",
        lineNumber: 81,
        columnNumber: 5
    }, this);
}
// Card
function ReviewCard({ review }) {
    const [expand, setExpand] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const maxLen = 130;
    const isLong = review.text.length > maxLen;
    const showText = !expand && isLong ? review.text.slice(0, maxLen) + "..." : review.text;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-2xl shadow px-8 py-6 mx-2 flex flex-col items-center text-center min-h-[280px] max-w-md mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(ReviewAvatar, {
                name: review.name
            }, void 0, false, {
                fileName: "[project]/src/components/ReviewCarousel.js",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "mt-4 font-bold text-lg text-black",
                children: review.name
            }, void 0, false, {
                fileName: "[project]/src/components/ReviewCarousel.js",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "text-sm text-gray-400 mb-2",
                children: review.date
            }, void 0, false, {
                fileName: "[project]/src/components/ReviewCarousel.js",
                lineNumber: 102,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(StarBar, {
                rating: review.rating
            }, void 0, false, {
                fileName: "[project]/src/components/ReviewCarousel.js",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "text-gray-700 mt-1 mb-2",
                children: [
                    showText,
                    isLong && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        className: "ml-1 text-green-600 hover:underline text-sm",
                        onClick: ()=>setExpand((v)=>!v),
                        children: expand ? "Read less" : "Read more"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ReviewCarousel.js",
                        lineNumber: 107,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ReviewCarousel.js",
                lineNumber: 104,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ReviewCarousel.js",
        lineNumber: 99,
        columnNumber: 5
    }, this);
}
// Rating bar top
function RatingBar({ avg = 4.75, total = 326 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "flex flex-col md:flex-row items-center justify-between bg-white rounded-xl shadow p-6 mb-10 w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                        src: "https://ik.imagekit.io/hexocdn/Logo%20Super%20Sayur@300x.png?updatedAt=1753571167387",
                        alt: "Logo",
                        className: "w-8 h-8"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ReviewCarousel.js",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: "font-bold text-xl md:text-2xl",
                        children: '"All Customer are Satisfied"'
                    }, void 0, false, {
                        fileName: "[project]/src/components/ReviewCarousel.js",
                        lineNumber: 126,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "flex sm-4",
                        children: Array.from({
                            length: 1
                        }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                                viewBox: "0 0 20 20",
                                className: "w-6 h-6",
                                fill: i < avg ? "#FBC02D" : "#E2E8F0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                                    d: "M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.564-.955L10 0l2.947 5.955 6.564.955-4.756 4.635 1.123 6.545z"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ReviewCarousel.js",
                                    lineNumber: 130,
                                    columnNumber: 15
                                }, this)
                            }, i, false, {
                                fileName: "[project]/src/components/ReviewCarousel.js",
                                lineNumber: 129,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/ReviewCarousel.js",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: "ml-2 font-semibold text-lg",
                        children: avg
                    }, void 0, false, {
                        fileName: "[project]/src/components/ReviewCarousel.js",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: "text-gray-600 ml-1",
                        children: [
                            "out of ",
                            reviews.length,
                            " based on ",
                            total.toLocaleString(),
                            " reviews"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ReviewCarousel.js",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ReviewCarousel.js",
                lineNumber: 120,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                href: "https://www.google.com/maps/place/SuperSayur/",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "hidden mt-4 md:mt-0 px-5 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full shadow transition",
                children: "Review us on Google"
            }, void 0, false, {
                fileName: "[project]/src/components/ReviewCarousel.js",
                lineNumber: 137,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ReviewCarousel.js",
        lineNumber: 119,
        columnNumber: 5
    }, this);
}
function ReviewSection() {
    const [sliderRef, instanceRef] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$keen$2d$slider$2f$react$2e$js__$5b$external$5d$__$28$keen$2d$slider$2f$react$2e$js$2c$__cjs$29$__["useKeenSlider"])({
        loop: true,
        slides: {
            perView: 4,
            spacing: 24
        },
        breakpoints: {
            "(max-width: 1200px)": {
                slides: {
                    perView: 3,
                    spacing: 20
                }
            },
            "(max-width: 900px)": {
                slides: {
                    perView: 2,
                    spacing: 16
                }
            },
            "(max-width: 600px)": {
                slides: {
                    perView: 1,
                    spacing: 12
                }
            }
        }
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
        className: "bg-green-50 py-12 px-2",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "max-w-6xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                    className: "text-3xl md:text-4xl font-bold text-center mb-6",
                    children: "What Our Customers Say"
                }, void 0, false, {
                    fileName: "[project]/src/components/ReviewCarousel.js",
                    lineNumber: 163,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(RatingBar, {}, void 0, false, {
                    fileName: "[project]/src/components/ReviewCarousel.js",
                    lineNumber: 164,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    ref: sliderRef,
                    className: "keen-slider mb-5",
                    children: reviews.map((review, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "keen-slider__slide",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(ReviewCard, {
                                review: review
                            }, void 0, false, {
                                fileName: "[project]/src/components/ReviewCarousel.js",
                                lineNumber: 168,
                                columnNumber: 15
                            }, this)
                        }, idx, false, {
                            fileName: "[project]/src/components/ReviewCarousel.js",
                            lineNumber: 167,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/ReviewCarousel.js",
                    lineNumber: 165,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ReviewCarousel.js",
            lineNumber: 162,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ReviewCarousel.js",
        lineNumber: 161,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/ReviewCarousel.js [ssr] (ecmascript, next/dynamic entry)": ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/ReviewCarousel.js [ssr] (ecmascript)"));
}),

};

//# sourceMappingURL=src_components_ReviewCarousel_91770aa9.js.map