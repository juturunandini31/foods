import React, { useState } from "react";
import { FaShoppingCart, FaUserAlt, FaSearch, FaLeaf, FaBreadSlice, FaCheese, FaAppleAlt, FaCarrot, FaCheckCircle, FaWhatsapp, FaEnvelope, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import { auth } from "./firebase";
import { sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

const categories = [
  { name: "Bakery", img: "https://img.freepik.com/premium-vector/cute-bakery-logo-design-template_450825-386.jpg" },
  { name: "Dairy", img: "https://s.tmimgcdn.com/scr/1200x750/227100/cow-cartoon-logo-template_227144-original.jpg" },
  { 
    name: "Snacks & Beverages", 
    img: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=400&q=80",
    subcategories: ["Chips & Crisps", "Bhujiya & Mixes"]
  },
  { name: "Mukhvas", img: "https://cdn.vibecity.in/providers/6396ef71dade740011ffa7dc/54253e83-a693-4043-9874-9c33f5066a8a_f230a93f-b265-4329-bc2c-bd507a7ce64d-2X.png" },
  { name: "Grains & Pulses", img: "https://www.rpsgroup.com/imported-media/3636/rps-laboratories-cereals-and-grains.jpg?width=830&height=533&quality=90" },
  { name: "Snacks & Munchies", img: "https://thegifttree.in/wp-content/uploads/2023/12/TGT5001.2.jpg" },
  { name: "Spices & Masala Blends", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMW3gy7PwZty2UC1vDttn-CKF4XOV4khbbRQ&s" },
  { name: "Dry Fruits & Nuts", img: "https://nutribinge.in/cdn/shop/articles/seeds_dry_fruits_nuts.webp?v=1713264895" },
  { name: "Ready-to-Cook", img: "https://shop.cookdtv.com/cdn/shop/articles/ready-to-cook-vs-ready-to-eat-all-you-need-to-know-cookd-ventures-private-limited_1000x.jpg?v=1681711895", subcategories: ["Instant Noodles & Pasta"] },
  { name: "Instant Beverages & Mix", img: "https://www.jiomart.com/images/product/original/rv9ia5oml8/tiint-instant-drink-mix-cola-pack-of-24-per-pack-9-gm-powder-soft-drink-concentrate-enriched-with-vitamin-c-instant-drink-mix-immunity-booster-drink-anytime-product-images-orv9ia5oml8-p600835536-1-202304230514.jpg?im=Resize=(420,420)" },
  { name: "Indian Sweets (Dry or Vacuum)", img: "https://5.imimg.com/data5/BZ/TL/ST/ANDROID-14048953/product-jpeg-500x500.jpg" },
  { name: "Biscuits & Cookies", img: "https://www.businessoffood.in/wp-content/uploads/2024/01/freepik-biscuits-sweets.jpg", subcategories: ["Kaju Biscuits", "maada"] },
  { name: "Pooja & Cultural Products", img: "https://pieera.com/upload/product/161361730653072.jpg" },
  { name: "Miscellaneous Condiments & Sauce", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjGvK1DdviT_7HTXDHZdN_v4pbebTFUDuIu4vwcO-YeDqbaOkVUwDTTkkhDTYrtrt9zjY_oOrg8722Tm8p5eF0TploVO4L6hh9GH4vbO15S0xZRmGVN0ikVy_33X2rfved18AT9mOynwWxPQAnGUKf_7-O5-uKG9H12Z_atBtOer9-YcP9jreyJQ3nyH78/s1143/IMG_5683.jpeg" },
  { name: "Pickles & Frozen Snacks", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIRDg9h6jBGaYUNEF_W0KS2rhuh-zs59a7gg&s" },
  { name: "Canned Goods & Processed Fruits",img: "https://farelabs.com/wp-content/uploads/canned-food-768x432-1.webp" },
  { name: "Health, Beauty & Ayurveda", img: "https://i0.wp.com/punarjith.com/wp-content/uploads/2024/07/punarjith-png.webp?resize=977%2C668&ssl=1" },
  { name: "Milled Products",img: "https://www.adm.com/globalassets/products--services/human-nutrition/products/flours--grains/flours--grains/multi-seed-whole-grain-rolls-seeds-nuts-and-cereals-gettyimages-890849884.jpg" },
];

const products = [
  { id: 1, name: "Balaji Simply Salted Chips", brand: "Balaji", weight: "150 g", price: 40, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSEa0SdSTznOR2L1lrsT8XgyWiekiTVkFTGQMSGWJ7V-u7_RP9iTiU2WR6KsM0oBAK8Mmkun-3ZDDkxY1ohEvJESjSWjE_IQ957k78JVvzL_5oDIiJSO_wyig" },
  { id: 2, name: "Balaji Magic Masala Masti Potato Wafers", brand: "Balaji", weight: "150 g", price: 40, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://cdn.zeptonow.com/production/tr:w-640,ar-2400-2400,pr-true,f-auto,q-80/cms/product_variant/0f46fbea-230d-40d3-8b3c-8b0befcb4f30.jpeg" },
  { id: 3, name: "Balaji Crunchem Masala Masti Wafers", brand: "Balaji", weight: "135 g", price: 40, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSBkFAN8GbY6zVu1X2qzXX09UVVKHJ6A7nXuBQL27GEXgh0lxmxgzZmmzSvceR9qflimpzstFeGapZCdtbqyCz7xyHs9V6p63kTEu3yZPbfE0c1ppo5f1remw" },
  { id: 4, name: "Balaji Crunchx Chilli Tadka Wafers", brand: "Balaji", weight: "135 g", price: 40, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://www.balajiwafers.com/wp-content/uploads/2019/04/M_Crunchex_ChilliTadka.png" },
  { id: 5, name: "Balaji Chaat Chaska Wafers", brand: "Balaji", weight: "155 g", price: 38, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://cdn.grofers.com/app/assets/products/sliding_images/jpeg/bd801aed-60ff-48c2-84b2-9bacceefabdf.jpg?ts=1721124958" },
  { id: 6, name: "Balaji Cream Onion Wafers", brand: "Balaji", weight: "150 g", price: 38, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://www.bigbasket.com/media/uploads/p/l/40053585_2-balaji-cream-onion-chips.jpg" },
  { id: 7, name: "Balaji Tomato Masti Wafers", brand: "Balaji", weight: "150 g", price: 38, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://www.bigbasket.com/media/uploads/p/l/40053585_2-balaji-cream-onion-chips.jpg" },
  { id: 8, name: "Balaji Pizzy Masala Wafers", brand: "Balaji", weight: "30 g", price: 10, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://www.jiomart.com/images/product/original/491336862/balaji-wafers-crunchem-pizzy-masala-potato-wafers-30-g-product-images-o491336862-p610108353-0-202410181639.jpg?im=Resize=(420,420)" },
  { id: 9, name: "Balaji Aloo Sev", brand: "Balaji", weight: "200 g", price: 42, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://www.jiomart.com/images/product/original/491336862/balaji-wafers-crunchem-pizzy-masala-potato-wafers-30-g-product-images-o491336862-p610108353-0-202410181639.jpg?im=Resize=(420,420)" },
  { id: 10, name: "Balaji Chana Dal", brand: "Balaji", weight: "500 g", price: 76, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://www.bbassets.com/media/uploads/p/l/30010131_5-balaji-namkeen-chana-dal.jpg" },
  { id: 11, name: "Balaji Chana Jor Garam", brand: "Balaji", weight: "220 g", price: 38, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/myahi9g0qb3kurclxmhw" },
  { id: 12, name: "Balaji Farali Chevda", brand: "Balaji", weight: "450 g", price: 80, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://m.media-amazon.com/images/I/51qqMBhPAiL.jpg" },
  { id: 13, name: "Balaji Farali Chevdo", brand: "Balaji", weight: "235 g", price: 47, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://m.media-amazon.com/images/I/51qqMBhPAiL.jpg" },
  { id: 14, name: "Balaji Gathiya", brand: "Balaji", weight: "300 g", price: 60, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://m.media-amazon.com/images/I/51iiHMKCC0L._UF1000,1000_QL80_.jpg" },
  { id: 15, name: "Balaji Khatta Mitha Mix", brand: "Balaji", weight: "500 g", price: 85, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://rukminim2.flixcart.com/image/750/900/xif0q/snack-savourie/r/g/l/-original-imahyhhujkuzgqps.jpeg?q=90&crop=false" },
  { id: 16, name: "Balaji Mung Dal", brand: "Balaji", weight: "400 g", price: 95, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsREhWjkaTcPFH__K4lV5JY1BXuw6QKeYPsg&s" },
  { id: 17, name: "Balaji Ratlami Sev", brand: "Balaji", weight: "200 g", price: 33, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://www.bbassets.com/media/uploads/p/l/40053580_3-balaji-namkeen-ratlami-sev.jpg" },
  { id: 18, name: "Balaji Shing Bhujia", brand: "Balaji", weight: "400 g", price: 71, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://www.bbassets.com/media/uploads/p/l/30010142_2-balaji-namkeen-shing-bhujiya.jpg" },
  { id: 19, name: "Balaji Tikha Mitha Mix", brand: "Balaji", weight: "500 g", price: 85, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://www.bbassets.com/media/uploads/p/l/40053576_3-balaji-namkeen-tikha-mitha-mix.jpg" },
  { id: 20, name: "Kurkure Masala Munch", brand: "Kurkure", weight: "75 g", price: 20, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://m.media-amazon.com/images/I/71sOPzrW0mL.jpg" },
  { id: 21, name: "Kurkure Chilli Chatka", brand: "Kurkure", weight: "68 g", price: 20, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://m.media-amazon.com/images/I/71znu5AldRL.jpg" },
  { id: 22, name: "Kurkure Green Chutney Rajasthani Style", brand: "Kurkure", weight: "68 g", price: 20, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://www.bbassets.com/media/uploads/p/m/294266_13-kurkure-namkeen-green-chutney-rajasthani-style.jpg" },
  { id: 23, name: "Kurkure Puffcorn Yummy Cheese", brand: "Kurkure", weight: "52 g", price: 20, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://m.media-amazon.com/images/I/71OwiJcIsjL.jpg" },
  { id: 24, name: "Kurkure Solid Masti Twisteez", brand: "Kurkure", weight: "90 g", price: 20, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://www.bbassets.com/media/uploads/p/l/30010142_2-balaji-namkeen-shing-bhujiya.jpg" },
  { id: 25, name: "Kurkure Hyderabadi Hungama", brand: "Kurkure", weight: "55 g", price: 20, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://www.bbassets.com/media/uploads/p/l/40053576_3-balaji-namkeen-tikha-mitha-mix.jpg" },
  { id: 26, name: "Kurkure Naughty Tomato", brand: "Kurkure", weight: "50 g", price: 20, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://m.media-amazon.com/images/I/71sOPzrW0mL.jpg" },
  { id: 27, name: "Kurkure Moong Dal Salted Namkeen", brand: "Kurkure", weight: "140 g", price: 40, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://m.media-amazon.com/images/I/81Leb4WJwQL._AC_UF894,1000_QL80_.jpg" },
  { id: 28, name: "Kurkure Multigrain Scoops", brand: "Kurkure", weight: "80 g", price: 20, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://www.bigbasket.com/media/uploads/p/s/40126336_1-kurkure-namkeen-multigrain-curry-herb-flavour.jpg" },
  { id: 29, name: "Kurkure Desi Beats", brand: "Kurkure", weight: "60 g", price: 20, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://mir-s3-cdn-cf.behance.net/projects/404/11028543.5480d0628fa0f.jpg" },
  { id: 30, name: "Classic Salted", brand: "Lay's", weight: "115 g", price: 55, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://www.onionz.in/uploads/items/0bbbf479375a272cbc1f5f8603748db5.jpg" },
  { id: 31, name: "India's Magic Masala", brand: "Lay's", weight: "115 g", price: 55, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://m.media-amazon.com/images/I/71oT4UpWomL.jpg" },
  { id: 32, name: "American Style Cream & Onion", brand: "Lay's", weight: "115 g", price: 55, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://m.media-amazon.com/images/I/71G1kVHN0-L.jpg" },
  { id: 33, name: "Spanish Tomato Tango", brand: "Lay's", weight: "115 g", price: 55, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://m.media-amazon.com/images/I/71S0Pgoi2XL.jpg" },
  { id: 34, name: "Hot & Sweet Chili", brand: "Lay's", weight: "115 g", price: 55, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://www.bbassets.com/media/uploads/p/l/294278_23-lays-potato-chips-hot-sweet-chilli-flavour-best-quality.jpg" },
  { id: 35, name: "Chile Limon", brand: "Lay's", weight: "115 g", price: 55, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://m.media-amazon.com/images/I/71DCs2yzAwL._UF1000,1000_QL80_.jpg" },
  { id: 36, name: "Thai Sweet Chilli", brand: "Lay's", weight: "110 g", price: 66, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://www.bbassets.com/media/uploads/p/l/40263752_1-lays-ignore-gourmet-potato-chips-thai-sweet-chilli-crispy.jpg" },
  { id: 37, name: "Thai Sweet Chilli", brand: "Lay's", weight: "160 g", price: 110, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://m.media-amazon.com/images/I/71XrrK0KlXL._AC_UF1000,1000_QL80_.jpg" },
  { id: 38, name: "Lime & Cracked Pepper", brand: "Lay's", weight: "160 g", price: 110, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://www.bbassets.com/media/uploads/p/l/40263756_1-lays-ignore-gourmet-potato-chips-lime-cracked-pepper-crunchy.jpg" },
  { id: 39, name: "Vintage Cheese & Paprika", brand: "Lay's", weight: "110 g", price: 64, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://www.bbassets.com/media/uploads/p/xl/40263754_1-lays-ignore-gourmet-potato-chips-vintage-cheese-paprika-crispy.jpg" },
  { id: 40, name: "Wavy Hickory BBQ", brand: "Lay's", weight: "115 g", price: 55, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRPIaeIZIZrj2l7Q1bgOIsnH_-iBGuFpA49Q&s" },
  { id: 41, name: "Wavy Ranch", brand: "Lay's", weight: "115 g", price: 55, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://m.media-amazon.com/images/I/81IIXfXVZ6L._UF894,1000_QL80_.jpg" },
  { id: 42, name: "Stax Original", brand: "Lay's", weight: "135 g", price: 120, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://rukminim2.flixcart.com/image/750/900/xif0q/chips/z/f/l/135-stax-original-flavour-chips-imported-135-gms-1-lays-original-imagj2gnpybafdnr.jpeg?q=90&crop=false" },
  { id: 43, name: "Stax Sour Cream & Onion", brand: "Lay's", weight: "135 g", price: 120, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://m.media-amazon.com/images/I/612J+lOpp3S._UF1000,1000_QL80_.jpg" },
  { id: 44, name: "Stax Cheddar", brand: "Lay's", weight: "135 g", price: 120, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://m.media-amazon.com/images/I/611Ba5VLm7L._UF1000,1000_QL80_.jpg" },
  { id: 45, name: "Stax Barbecue", brand: "Lay's", weight: "135 g", price: 120, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://images-eu.ssl-images-amazon.com/images/I/71TvroOBQnL._AC_UL210_SR210,210_.jpg" },
  { id: 46, name: "Baked Original", brand: "Lay's", weight: "50 g", price: 25, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://www.fritolay.com/sites/fritolay.com/files/2022-02/Baked_2021_Lays_ORIG_6.25oz_Render.png" },
  { id: 47, name: "Baked Sour Cream & Onion", brand: "Lay's", weight: "50 g", price: 25, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://www.fritolay.com/sites/fritolay.com/files/2022-02/Baked_2021_Lays_SCO_6.25oz_Render.png" },
  { id: 48, name: "Baked Barbecue", brand: "Lay's", weight: "50 g", price: 25, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://www.fritolay.com/sites/fritolay.com/files/2022-02/Baked_2021_Lays_BBQ_6.25oz_Render.png" },
  { id: 49, name: "Maxx Macho Chilli", brand: "Lay's", weight: "52 g", price: 25, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://m.media-amazon.com/images/I/71MKGDEEVKL._UF1000,1000_QL80_.jpg" },
  { id: 50, name: "Maxx Peppery Cheddar", brand: "Lay's", weight: "52 g", price: 25, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://cdn.zeptonow.com/production/tr:w-640,ar-500-500,pr-true,f-auto,q-80/inventory/product/c93ee3fe-58aa-4f58-99d2-d12bb669de33-897112f0-a6a2-4ca8-8b61-e3d464914915.jpeg" },
  { id: 51, name: "Sundried Chilli (Wafer Style)", brand: "Lay's", weight: "50 g", price: 22, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://www.jiomart.com/images/product/original/492662938/lay-s-sundried-chilli-potato-chips-52-g-product-images-o492662938-p592545031-0-202207131055.jpg?im=Resize=(1000,1000)" },
  { id: 52, name: "Salt & Pepper (Wafer Style)", brand: "Lay's", weight: "50 g", price: 22, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://m.media-amazon.com/images/I/71nT07IPJuL.jpg" },
  { id: 53, name: "Long Msala Banana Chips", brand: "Chheda's", weight: "95 g", price: 95, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://cdn.grofers.com/app/assets/products/sliding_images/jpeg/80393334-436d-4090-b7b0-bcbeb2ce54e6.jpg?ts=1726837541" },
  { id: 54, name: "Golden Aloo Chips", brand: "Chheda's", weight: "90 g", price: 90, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://cdn.zeptonow.com/production/ik-seo/tr:w-400,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/00096717-ab01-4e12-8fbb-4ae9e7bc5e82/Chheda-s-Golden-Plain-Salted-Chips.jpeg" },
  { id: 55, name: "Yellos Banana Chips", brand: "Chheda's", weight: "120 g", price: 120, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://rukminim2.flixcart.com/image/750/900/kl2mljk0/chips/o/v/d/350-yellow-banana-chips-350g-pack-of-1-chheda-s-original-imagy9zgvkppwwyw.jpeg?q=90&crop=false" },
  { id: 56, name: "Salt-n-Papper Banana Chips", brand: "Chheda's", weight: "85 g", price: 85, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://chheda.store/wp-content/uploads/2020/12/chheda_Banana_Chips_Salt_N_Pepper_Front.jpg" },
  { id: 57, name: "Tomato Banana Chips", brand: "Chheda's", weight: "85 g", price: 85, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://m.media-amazon.com/images/I/61OTWifsHqL.jpg" },
  { id: 58, name: "Bhakharwadi", brand: "Chheda's", weight: "65 g", price: 65, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://cdn.grofers.com/app/assets/products/sliding_images/jpeg/145bad46-b059-4fdd-bfd2-144072e2ffa1.jpg?ts=1720374937" },
  { id: 59, name: "Nylon Sev Bhujia", brand: "Chheda's", weight: "55 g", price: 55, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://cdn.grofers.com/app/images/products/sliding_image/372141a.jpg?ts=1687755237" },
  { id: 60, name: "Roasted Chivda", brand: "Chheda's", weight: "55 g", price: 55, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://cdn.grofers.com/app/images/products/sliding_image/345991a.jpg?ts=1687438426" },
  { id: 61, name: "Ratlami Sev", brand: "Chheda's", weight: "55 g", price: 55, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://cdn.grofers.com/app/assets/products/sliding_images/jpeg/998dca29-c4c0-4871-8fde-070f1fd7caf3.jpg?ts=1708594229" },
  { id: 62, name: "Mora Sev Bhujia", brand: "Chheda's", weight: "55 g", price: 55, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://cdn.grofers.com/app/images/products/sliding_image/341427a.jpg?ts=1687755237" },
  { id: 63, name: "Diet Poha Chivda", brand: "Chheda's", weight: "55 g", price: 55, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://cdn.zeptonow.com/production/tr:w-640,ar-1200-1200,pr-true,f-auto,q-80/cms/product_variant/709008c0-cf8c-4f41-8146-36af167a7ac6.png" },
  { id: 64, name: "Tikha Sev Bhujia", brand: "Chheda's", weight: "55 g", price: 55, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/app/images/products/sliding_image/58596a.jpg?ts=1687948909" },
  { id: 65, name: "Salted Bundi", brand: "Chheda's", weight: "55 g", price: 55, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://m.media-amazon.com/images/I/61IXFqpjmKL.jpg" },
  { id: 66, name: "Tasty Peanuts", brand: "Chheda's", weight: "60 g", price: 60, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://cdn.grofers.com/app/images/products/sliding_image/318776a.jpg?ts=1687243863" },
  { id: 67, name: "Farsan Mixture Namkeen", brand: "Chheda's", weight: "55 g", price: 55, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/app/images/products/sliding_image/372138a.jpg?ts=1687616753" },
  { id: 68, name: "Moong Dal", brand: "Chheda's", weight: "60 g", price: 60, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://cdn.zeptonow.com/production/tr:w-640,ar-2000-1500,pr-true,f-auto,q-80/inventory/product/79fc9bac-9ae0-45fc-9ccc-489c1740f8e1-Photo.jpeg" },
  { id: 69, name: "Bhavnagari Gathiya", brand: "Chheda's", weight: "55 g", price: 55, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/app/images/products/sliding_image/372140a.jpg?ts=1687243866" },
  { id: 70, name: "Nadyadi Mixture", brand: "Chheda's", weight: "55 g", price: 55, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://cdn.zeptonow.com/production/tr:w-640,ar-671-966,pr-true,f-auto,q-80/inventory/product/60b22db9-5cbc-4ac0-97b4-e91c5059f107-1dzfKjBJ4QnYTh5q5ZQX3DPkNccITXw74.jpeg" },
  { id: 71, name: "Manglori Murukku Namkeen", brand: "Chheda's", weight: "55 g", price: 55, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://cdn.grofers.com/app/images/products/sliding_image/341426a.jpg?ts=1687243864" },
  { id: 72, name: "Bhelpuri Mix", brand: "Chheda's", weight: "55 g", price: 55, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://cdn.grofers.com/app/images/products/sliding_image/380893a.jpg?ts=1687755238" },
  { id: 73, name: "Chana Dal", brand: "Chheda's", weight: "55 g", price: 55, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://cdn.grofers.com/app/images/products/sliding_image/341425a.jpg?ts=1687326260" },
  { id: 74, name: "Farali Potato Falhari Mixture", brand: "Chheda's", weight: "90 g", price: 90, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://cdn.grofers.com/app/assets/products/sliding_images/jpeg/5dc4d82c-4ea3-40f4-a046-87037ef633e6.jpg?ts=1712061846" },
  { id: 75, name: "Instant Bhelpuri", brand: "Chheda's", weight: "60 g", price: 60, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://m.media-amazon.com/images/I/717n+p1rfSL._UF1000,1000_QL80_.jpg" },
  { id: 76, name: "Navratan Mixture Namkeen", brand: "Chheda's", weight: "55 g", price: 55, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://cdn.grofers.com/app/images/products/sliding_image/372139a.jpg?ts=1687949322" },
  { id: 77, name: "Golden Mixture Namkeen", brand: "Chheda's", weight: "55 g", price: 55, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://cdn.grofers.com/app/images/products/sliding_image/318748a.jpg?ts=1687949314" },
  { id: 78, name: "Dry Kachori", brand: "Chheda's", weight: "60 g", price: 60, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRcChpFNKjhrFRUjvW4rqKT2UTsErjZjRqAg&s" },
  { id: 79, name: "Chana Dal", brand: "Balaji", weight: "200 g", price: 42, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://nammagrocery.com/cdn/shop/files/Balaji-200g-Chana-Dal.png?v=1719465272" },
  { id: 80, name: "Saunf Mukhvas", brand: "Assorted", weight: "100g", price: 50, category: "Mukhvas", subcategory: "Traditional", img: "https://m.media-amazon.com/images/I/61hzdk-vhGL._UF1000,1000_QL80_.jpg", flavorProfile: "Sweet, cooling", ingredients: "Fennel seeds, sugar, menthol" },
  { id: 81, name: "Variyali", brand: "Assorted", weight: "100g", price: 50, category: "Mukhvas", subcategory: "Traditional", img: "https://m.media-amazon.com/images/I/71hCG+MQXiL._UF1000,1000_QL80_.jpg", flavorProfile: "Sweet, aromatic", ingredients: "Roasted fennel seeds, sugar coating" },
  { id: 82, name: "Mix Mukhvas", brand: "Assorted", weight: "100g", price: 50, category: "Mukhvas", subcategory: "Traditional", img: "https://m.media-amazon.com/images/I/41S8JGVwaNL._UF894,1000_QL80_.jpg", flavorProfile: "Mixed flavor, slightly tangy", ingredients: "Fennel, sesame seeds, ajwain, dhana dal, sugar" },
  { id: 83, name: "Dhana Dal", brand: "Assorted", weight: "100g", price: 50, category: "Mukhvas", subcategory: "Traditional", img: "https://m.media-amazon.com/images/I/8179adDD8XL._UF1000,1000_QL80_.jpg", flavorProfile: "Nutty, slightly bitter", ingredients: "Roasted coriander seeds" },
  { id: 84, name: "Jeera Goli", brand: "Assorted", weight: "100g", price: 50, category: "Mukhvas", subcategory: "Traditional", img: "https://satyanarayanmukhwas.com/wp-content/uploads/2022/11/Jeera-Goli-scaled.jpg", flavorProfile: "Tangy, salty, digestive", ingredients: "Cumin seeds, sugar, lemon, black salt" },
  { id: 85, name: "Amla Candy", brand: "Assorted", weight: "100g", price: 50, category: "Mukhvas", subcategory: "Traditional", img: "https://e.saravanaonline.com/4843-large_default/sweet-amla-candy-100-gm.jpg", flavorProfile: "Sweet, tangy, vitamin-rich", ingredients: "Dried Indian gooseberry, sugar" },
  { id: 86, name: "Meetha Pan Mukhvas", brand: "Assorted", weight: "100g", price: 50, category: "Mukhvas", subcategory: "Traditional", img: "https://m.media-amazon.com/images/I/619y9J900zL._UF350,350_QL80_.jpg", flavorProfile: "Sweet, aromatic, mild paan", ingredients: "Betel leaves, fennel, coconut, gulkand" },
  { id: 87, name: "Madrasi Saunf", brand: "Assorted", weight: "100g", price: 50, category: "Mukhvas", subcategory: "Traditional", img: "https://m.media-amazon.com/images/I/6146GINhayS._UF1000,1000_QL80_.jpg", flavorProfile: "Sweet, crunchy", ingredients: "Sugar-coated fennel with bright colors" },
  { id: 88, name: "Hing Peda", brand: "Assorted", weight: "100g", price: 50, category: "Mukhvas", subcategory: "Traditional", img: "https://5.imimg.com/data5/SELLER/Default/2024/11/466536655/WI/YC/TV/20442746/hing-peda.webp", flavorProfile: "Pungent, digestive", ingredients: "Asafoetida, sugar, mango powder, salt" },
  { id: 89, name: "Churan Goli", brand: "Assorted", weight: "100g", price: 50, category: "Mukhvas", subcategory: "Traditional", img: "https://m.media-amazon.com/images/I/615amdn4XZL._UF1000,1000_QL80_.jpg", flavorProfile: "Tangy, spicy", ingredients: "Tamarind, mango powder, black salt, spices" },
  { id: 90, name: "Digestive Mukhvas", brand: "Assorted", weight: "100g", price: 50, category: "Mukhvas", subcategory: "Traditional", img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSqmpMlOqWKPK-DK9O8PQv0hl4ofMdcXVOzI9f-kPP4JwRE-xN0zdCa6T3khQHkBqAbXPH_krrKxGXaPTYNVL4TzIbZepDIFS7Q5Z2vP9jo-mpIilczXX0J", flavorProfile: "Strong, digestive", ingredients: "Carom seeds, fennel, cumin, black salt" },
  { id: 91, name: "Pan Shot", brand: "Assorted", weight: "100g", price: 50, category: "Mukhvas", subcategory: "Traditional", img: "https://m.media-amazon.com/images/I/617an97vBSL._UF1000,1000_QL80_.jpg", flavorProfile: "Sweet, tangy, refreshing", ingredients: "Betel leaves essence, fennel, gulkand, spices" },
  { id: 92, name: "Dry Pan Mukhvas", brand: "Assorted", weight: "100g", price: 50, category: "Mukhvas", subcategory: "Traditional", img: "https://rukminim2.flixcart.com/image/850/1000/kcz4rrk0/candy-mouth-freshener/r/s/f/200-homemade-natural-paan-200-g-mouth-freshener-digestive-after-original-imaftzf2upggxsyz.jpeg?q=90&crop=false", flavorProfile: "Intense paan flavor", ingredients: "Dry betel leaves, gulkand, fennel, coconut" },
  { id: 93, name: "Silver Coated Saunf", brand: "Assorted", weight: "100g", price: 50, category: "Mukhvas", subcategory: "Traditional", img: "https://rajajionline.in/cdn/shop/files/1027.-01_large.jpg?v=1731072042", flavorProfile: "Premium, sweet", ingredients: "Fennel seeds coated with edible silver & sugar" },
  { id: 94, name: "Rose Petal Mukhvas (Gulkand Mix)", brand: "Assorted", weight: "100g", price: 50, category: "Mukhvas", subcategory: "Traditional", img: "https://m.media-amazon.com/images/I/71b7kmp1pbL._UF1000,1000_QL80_.jpg", flavorProfile: "Sweet, floral", ingredients: "Gulkand, cardamom, fennel, rose petals" },
  { id: 95, name: "Til Mukhvas", brand: "Assorted", weight: "100g", price: 50, category: "Mukhvas", subcategory: "Traditional", img: "https://images.meesho.com/images/products/188372326/tvmz7_512.webp", flavorProfile: "Nutty, sweet", ingredients: "Sesame seeds, jaggery/sugar" },
  { id: 96, name: "Anardana Goli", brand: "Assorted", weight: "100g", price: 50, category: "Mukhvas", subcategory: "Traditional", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUOiZbswKP8GGztyJYShVl2d7_uC89BC9vWA&s", flavorProfile: "Tangy, sour", ingredients: "Pomegranate powder, spices" },
  { id: 97, name: "Elaichi Dana", brand: "Assorted", weight: "100g", price: 50, category: "Mukhvas", subcategory: "Traditional", img: "https://rukminim2.flixcart.com/image/850/1000/xif0q/candy-mouth-freshener/b/6/b/50-silver-coated-elaichi-dana-cardamom-pearls-mouth-freshener-1-original-imagkuaqhhywgyd2.jpeg?q=20&crop=false", flavorProfile: "Strong, sweet, aromatic", ingredients: "Cardamom seeds, sugar coating" },
  { id: 98, name: "Dry Kachori", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJUrnC_X4TrTDfx2F4Jmmn6sSw_9yVN7_rDQ&s" },
  { id: 99, name: "Dry Patra", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://maniarrs.com/cdn/shop/products/Dry-patra_1000x.jpg?v=1655453894" },
  { id: 100, name: "Methi Puri", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://prashantcorner.com/cdn/shop/files/MethiPuri-3.jpg?v=1727760132" },
  { id: 101, name: "Chana Jor Garam", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://m.media-amazon.com/images/I/71bSCeNj3bL._UF1000,1000_QL80_.jpg" },
  { id: 102, name: "Fudwadi", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://cpimg.tistatic.com/4851696/b/4/fulwadi-namkeen.jpg" },
  { id: 103, name: "Mix Chavanu", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtErg78h_N5dj_i5ot1lk3EaALJKf-27F12g&s" },
  { id: 104, name: "Bhakharwadi", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://m.media-amazon.com/images/I/51U0wPZzsWL._UF350,350_QL80_.jpg" },
  { id: 105, name: "Ratlami Sev", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://m.media-amazon.com/images/I/71uhR7jA+AL._UF1000,1000_QL80_.jpg" },
  { id: 106, name: "Chorafali", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://cpimg.tistatic.com/5415851/b/4/chorafali-papad.jpg" },
  { id: 107, name: "Alu sev", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://www.bbassets.com/media/uploads/p/l/30010145_7-balaji-namkeen-aloo-sev.jpg" },
  { id: 108, name: "Khakhra", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://neelamfoodlandmumbai.com/cdn/shop/products/IMG_8258_a09380d6-2431-4497-b469-6e22e39336e1_1200x.jpg?v=1634020615" },
  { id: 109, name: "Gathiya", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://www.jiomart.com/images/product/original/rvgposm4ql/freshocartz-makhaniya-soft-salted-gathiya-namkeen-100-g-product-images-orvgposm4ql-p601692078-0-202305221700.jpg?im=Resize=(420,420)" },
  { id: 110, name: "Wheat Chakri", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://sonalbenpuriwala.com/cdn/shop/files/GhauChakri4_c979bb2f-591c-4de2-be17-102b859d6129.png?v=1715411202" },
  { id: 111, name: "Mung Dal", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://3.imimg.com/data3/YK/RH/MY-10353443/moong-dal-500x500.jpg" },
  { id: 112, name: "Makai Paua", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://5.imimg.com/data5/SELLER/Default/2022/2/MT/PY/LO/23881680/makkai-poha-500x500.jpg" },
  { id: 113, name: "Farsi Puri", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://i1.wp.com/indiaspicemart.com/wp-content/uploads/2021/07/Farsi-Puri-1_600x600.jpg?fit=600%2C600&ssl=1" },
  { id: 114, name: "Shakkar para Sweet", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://5.imimg.com/data5/JD/XP/MY-13778460/sweet-shakkar-para.jpg" },
  { id: 115, name: "Shakkar para (Spicy)", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://5.imimg.com/data5/SELLER/Default/2025/3/498681920/MG/FO/YN/28858320/healmillet-ragi-millet-jaggery-shakarpara.png" },
  { id: 116, name: "Lilo Chevdo", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://jagdishfarshan.com/cdn/shop/files/lilo_chevdo_G.png?v=1720604213" },
  { id: 117, name: "Sing Bhujia", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://www.bbassets.com/media/uploads/p/l/40050975_4-samrat-namkeen-sing-bhujia.jpg" },
  { id: 118, name: "Nylon Sev", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://m.media-amazon.com/images/I/61wXIDR7enS.jpg" },
  { id: 119, name: "Masala Sing", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://m.media-amazon.com/images/I/71wFNhTulxS._UF350,350_QL80_.jpg" },
  { id: 120, name: "Chana Dal", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://rukminim2.flixcart.com/image/300/300/l1nwnm80/snack-savourie/t/x/i/masala-chana-dal-spicy-and-crunchy-snacks-protein-rich-box-original-imagd6kstuswzekb.jpeg" },
  { id: 121, name: "Paled Sev", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://images-eu.ssl-images-amazon.com/images/I/61wXIDR7enS._AC_UL210_SR210,210_.jpg" },
  { id: 122, name: "Tomo Sev", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://5.imimg.com/data5/ED/ZN/FZ/SELLER-21848749/tomato-sev-namkeen-500x500.jpg" },
  { id: 123, name: "Dry samosa", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://dadus.co.in/cdn/shop/files/48_69aad44f-9773-498c-b8e2-aa5818c1733c.png?v=1742311222&width=1200" },
  { id: 124, name: "Sabudana Chevdo", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://m.media-amazon.com/images/I/61oQubzVIqL._UF350,350_QL80_.jpg" },
  { id: 125, name: "Farali Chevdo", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://www.bbassets.com/media/uploads/p/xl/30010133_2-balaji-farali-chevdo-namkeen.jpg" },
  { id: 126, name: "Khari Sing", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://rukminim2.flixcart.com/image/750/900/jz4g3gw0/snack-savourie/a/2/g/250-roasted-salted-peanuts-khari-sing-250g-tin-nutrilla-original-imafj7gs2swmtx9d.jpeg?q=90&crop=false" },
  { id: 127, name: "Wheat Paua", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://5.imimg.com/data5/SELLER/Default/2022/10/KF/FF/LI/12577106/banshi-wheat-500x500.jpg" },
  { id: 128, name: "papad", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://i0.wp.com/bajarhaat.com/wp-content/uploads/2024/06/Masala-Papad.webp?fit=500%2C500&ssl=1" },
  { id: 129, name: "soya sticks", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://content.jdmagicbox.com/rep/b2b/soya-stick/soya-stick-11.jpg?impolicy=queryparam&im=Resize=(360,360),aspect=fit" },
];

function Header({ cartCount, onLoginClick, onCartClick, isLoggedIn, handleCategoryNavClick, handleSubcategoryNavClick, searchQuery, setSearchQuery }) {
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // Only show mega menu for Snacks & Beverages for now
  const megaMenuCategories = categories.filter(cat => cat.name === "Snacks & Beverages");

  return (
    <header className="header-modern">
      <div className="logo-modern">
        <img src="/yralfoods.png" alt="Yral Foods Logo" style={{ height: 68, width: 68, marginRight: 14, verticalAlign: 'middle', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(67,160,71,0.10)' }} />
        <span style={{ fontWeight: 700, fontSize: '2rem', color: '#43a047', letterSpacing: '1px' }}>YRAL FOODS</span>
      </div>
      <nav className="nav-modern">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/admin">Admin</Link>
      </nav>
      <div className="header-actions-modern">
        <div className="search-bar-modern">
          <FaSearch />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="cart-btn-modern" onClick={onCartClick}>
          <FaShoppingCart />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </button>
        {isLoggedIn ? (
          <span className="user-logged-in"><FaCheckCircle style={{color:'#43a047', marginRight:4}}/>Logged In</span>
        ) : (
          <button className="login-btn-modern" onClick={onLoginClick}><FaUserAlt /></button>
        )}
      </div>
    </header>
  );
}

function LoginModal({ open, onClose, onLoginSuccess }) {
  const [step, setStep] = useState(1); // 1: mobile, 2: otp
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleSendOtp = () => {
    if (/^\d{10}$/.test(mobile)) {
      setStep(2);
      setError("");
    } else {
      setError("Please enter a valid 10-digit mobile number.");
    }
  };

  const handleVerifyOtp = () => {
    if (otp === "1234") {
      setError("");
      onLoginSuccess();
      setStep(1);
      setMobile("");
      setOtp("");
    } else {
      setError("Invalid OTP. Try 1234 for demo.");
    }
  };

  const handleClose = () => {
    setStep(1);
    setMobile("");
    setOtp("");
    setError("");
    onClose();
  };

  if (!open) return null;
  return (
    <div className="modal-overlay">
      <div className="login-modal">
        <button className="close-modal" onClick={handleClose}>&times;</button>
        <h2>{step === 1 ? "Login with Mobile" : "Enter OTP"}</h2>
        {step === 1 ? (
          <>
            <input
              type="tel"
              placeholder="Enter mobile number"
              value={mobile}
              onChange={e => setMobile(e.target.value.replace(/[^\d]/g, ""))}
              maxLength={10}
            />
            <button onClick={handleSendOtp}>Send OTP</button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP (1234)"
              value={otp}
              onChange={e => setOtp(e.target.value.replace(/[^\d]/g, ""))}
              maxLength={4}
            />
            <button onClick={handleVerifyOtp}>Verify</button>
          </>
        )}
        {error && <div className="login-error">{error}</div>}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero-modern">
      <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80" alt="Fresh Groceries" />
      <div className="hero-text-modern">
        <h1>Fresh Groceries Delivered</h1>
        <p className="hero-tagline">Taste That Travels – From India to the World</p>
        {/* <p>Shop the best quality fruits, vegetables, and gourmet products.</p> */}
        <button className="cta-btn">Shop Now</button>
      </div>
    </section>
  );
}

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    if (category.subcategories) {
      setSelectedCategory(selectedCategory === category.name ? null : category.name);
    }
  };

  return (
    <section className="categories-modern">
      <h2>Shop by Category</h2>
      <div className="category-list-modern">
        {categories.map((cat) => (
          <div key={cat.name}>
            <div 
              className={`category-card ${selectedCategory === cat.name ? 'selected' : ''}`}
              onClick={() => handleCategoryClick(cat)}
            >
            <div className="category-icon">{cat.icon}</div>
            <img src={cat.img} alt={cat.name} />
            <span>{cat.name}</span>
            </div>
            {selectedCategory === cat.name && cat.subcategories && (
              <div className="subcategories-modern">
                {cat.subcategories.map((subcat) => (
                  <div key={subcat} className="subcategory-item">
                    {subcat}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function Products({ onAddToCart, addedId, products, showSubcategoryFilter, subcategories, selectedSubcategory, onSubcategoryClick, selectedCategory, cart, onIncrement, onDecrement }) {
  // Determine heading
  let heading = "Featured Products";
  if (selectedSubcategory) heading = selectedSubcategory;
  else if (selectedCategory) heading = selectedCategory;

  // Helper to get quantity in cart
  const getQty = (id) => {
    const found = cart.find(item => item.id === id);
    return found ? found.quantity : 0;
  };

  return (
    <section className="products-modern">
      <h2>{heading}</h2>
      <div style={{ marginBottom: 16, color: '#888', fontWeight: 500 }}>
        {products.length} Product{products.length !== 1 ? 's' : ''}
      </div>
      <div className="product-list-modern">
        {products.map((prod) => {
          const qty = getQty(prod.id);
          return (
          <div className="product-card" key={prod.id}>
            <img src={prod.img} alt={prod.name} />
            <h3>{prod.name}</h3>
              <div style={{ fontSize: '0.95rem', color: '#888', marginBottom: 4 }}>{prod.brand} &bull; {prod.weight}</div>
            <p>₹{prod.price} <span className="unit">/ unit</span></p>
              {qty === 0 ? (
            <button onClick={() => onAddToCart(prod.id)} className={addedId === prod.id ? "added" : ""}>
              {addedId === prod.id ? "Added!" : "Add to Cart"}
            </button>
              ) : (
                <div className="cart-qty-controls">
                  <button onClick={() => onDecrement(prod.id)} className="qty-btn">-</button>
                  <span className="cart-qty">{qty}</span>
                  <button onClick={() => onIncrement(prod.id)} className="qty-btn">+</button>
                </div>
              )}
          </div>
          );
        })}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
  className="footer-modern"
  style={{
    background: 'linear-gradient(90deg, #256029 0%, #388e3c 100%)',
    color: '#fff',
    padding: '40px 0 0 0',
    marginTop: 40,
  }}
>
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      maxWidth: 1200,
      margin: '0 auto',
      padding: '0 32px 32px 32px',
      gap: 32,
    }}
  >
    {/* Customer Service */}
    <div style={{ minWidth: 260, flex: 1 }}>
      <div
        style={{
          fontWeight: 700,
          fontSize: '1.2rem',
          marginBottom: 16,
        }}
      >
        Customer Service
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div>About Us</div>
        <div>Contact Us</div>
        <div>Terms & Conditions</div>
        <div>Privacy Policy</div>
        <div>Refund Policy</div>
      </div>
    </div>

    {/* My Account */}
    <div style={{ minWidth: 160, flex: 1 }}>
      <div
        style={{
          fontWeight: 700,
          fontSize: '1.2rem',
          marginBottom: 16,
        }}
      >
        My Account
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div>My Orders</div>
      </div>
    </div>
  </div>

  {/* Bottom Bar */}
  <div
    style={{
      borderTop: '1px solid #388e3c',
      marginTop: 16,
      padding: '16px 0',
      textAlign: 'center',
      background: 'rgba(0,0,0,0.04)',
      color: '#fff',
      fontWeight: 500,
    }}
  >
    © 2025 YRAL FOODS. All rights reserved.
  </div>
</footer>

  );
}

function CartDrawer({ open, onClose, cart, products, onRemoveFromCart, onCheckout, onIncrement, onDecrement }) {
  if (!open) return null;

  const cartItems = cart.map(({id, quantity}) => {
    const product = products.find(p => p.id === id);
    return product ? { ...product, quantity } : null;
  }).filter(Boolean);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={e => e.stopPropagation()}>
        <div className="cart-drawer-header">
          <h2>Your Cart</h2>
          <button className="close-modal" onClick={onClose}>&times;</button>
        </div>
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button onClick={onClose}>Continue Shopping</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.img} alt={item.name} />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p>₹{item.price}</p>
                    <div className="cart-qty-controls">
                      <button onClick={() => onDecrement(item.id)} className="qty-btn">-</button>
                      <span className="cart-qty">{item.quantity}</span>
                      <button onClick={() => onIncrement(item.id)} className="qty-btn">+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <h3>Subtotal: ₹{total}</h3>
              <button className="checkout-btn" onClick={onCheckout}>Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function PaymentModal({ open, onClose, total, onPaymentSuccess }) {
  // Implementation of PaymentModal component
}

function LeftSidebarMenu({ categories, onCategoryClick, onClose, show, selectedCategory, onSubcategoryClick }) {
  return (
    <div className={`left-sidebar-menu${show ? ' open' : ''}`}>
      <div className="sidebar-header">
        <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>Shop by Categories</span>
        <button className="close-sidebar" onClick={onClose}>&times;</button>
          </div>
      <div className="sidebar-categories">
        {categories.map(cat => (
          <div
            key={cat.name}
            className={`sidebar-category${selectedCategory === cat.name ? ' selected' : ''}`}
            onClick={() => onCategoryClick(cat.name)}
          >
            {cat.name}
            {cat.subcategories && selectedCategory === cat.name && (
              <div className="sidebar-subcategories">
                {cat.subcategories.map(subcat => (
                  <div
                    key={subcat}
                    className="sidebar-subcategory"
                    onClick={e => { e.stopPropagation(); onSubcategoryClick(subcat); }}
                  >
                    {subcat}
        </div>
                ))}
      </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section className="about-modern" style={{padding:32}}>
      <h2>About Yral Foods</h2>
      <p>Yral Foods brings you the best groceries, snacks, and more, delivered fresh to your door. Taste That Travels – From India to the World.</p>
    </section>
  );
}

function ContactUs() {
  return (
    <section className="contact-modern" style={{padding:32}}>
      <h2>Contact Us</h2>
      <p>Email: info@yralfoods.com</p>
      <p>Phone: +44 7355810149</p>
      <p>Address: Gujarat, India</p>
    </section>
  );
}

function SignInModal({ open, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  React.useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let storedEmail = window.localStorage.getItem("emailForSignIn");
      if (!storedEmail) {
        storedEmail = window.prompt("Please provide your email for confirmation");
      }
      signInWithEmailLink(auth, storedEmail, window.location.href)
        .then((result) => {
          window.localStorage.removeItem("emailForSignIn");
          setMessage("Successfully signed in!");
          setEmailSent(false);
          setEmail("");
    setError("");
          if (onLoginSuccess) onLoginSuccess(result.user.email);
    onClose();
        })
        .catch((err) => {
          setError("Sign-in failed: " + (err.message || "Unknown error"));
        });
    }
  }, [onLoginSuccess, onClose]);

  const handleSendLink = async () => {
    setError("");
    setLoading(true);
    try {
      const actionCodeSettings = {
        url: window.location.origin,
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      setEmailSent(true);
      setMessage("A sign-in link has been sent to your email. Please check your inbox.");
    } catch (err) {
      setError("Failed to send sign-in link: " + (err.message || "Unknown error"));
    }
    setLoading(false);
  };

  const handleClose = () => {
    setEmail("");
    setMessage("");
    setError("");
    setEmailSent(false);
    onClose();
  };

  if (!open) return null;
  return (
    <div className="modal-overlay">
      <div className="login-modal">
        <button className="close-modal" onClick={handleClose}>&times;</button>
        <h2>Sign In with Email</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={emailSent}
        />
        <button onClick={handleSendLink} disabled={loading || emailSent}>
          {loading ? "Sending..." : emailSent ? "Link Sent" : "Send Sign-In Link"}
        </button>
        {message && <div className="login-success">{message}</div>}
        {error && <div className="login-error">{error}</div>}
      </div>
    </div>
  );
}

function App() {
  const [cart, setCart] = useState([]); // [{id, quantity}]
  const [addedId, setAddedId] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [sidebarShow, setSidebarShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([
    { id: 1, name: "Balaji Simply Salted Chips", brand: "Balaji", weight: "150 g", price: 40, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSEa0SdSTznOR2L1lrsT8XgyWiekiTVkFTGQMSGWJ7V-u7_RP9iTiU2WR6KsM0oBAK8Mmkun-3ZDDkxY1ohEvJESjSWjE_IQ957k78JVvzL_5oDIiJSO_wyig" },
    { id: 2, name: "Balaji Magic Masala Masti Potato Wafers", brand: "Balaji", weight: "150 g", price: 40, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://cdn.zeptonow.com/production/tr:w-640,ar-2400-2400,pr-true,f-auto,q-80/cms/product_variant/0f46fbea-230d-40d3-8b3c-8b0befcb4f30.jpeg" },
    { id: 3, name: "Balaji Crunchem Masala Masti Wafers", brand: "Balaji", weight: "135 g", price: 40, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSBkFAN8GbY6zVu1X2qzXX09UVVKHJ6A7nXuBQL27GEXgh0lxmxgzZmmzSvceR9qflimpzstFeGapZCdtbqyCz7xyHs9V6p63kTEu3yZPbfE0c1ppo5f1remw" },
  { id: 4, name: "Balaji Crunchx Chilli Tadka Wafers", brand: "Balaji", weight: "135 g", price: 40, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://www.balajiwafers.com/wp-content/uploads/2019/04/M_Crunchex_ChilliTadka.png" },
  { id: 5, name: "Balaji Chaat Chaska Wafers", brand: "Balaji", weight: "155 g", price: 38, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://cdn.grofers.com/app/assets/products/sliding_images/jpeg/bd801aed-60ff-48c2-84b2-9bacceefabdf.jpg?ts=1721124958" },
  { id: 6, name: "Balaji Cream Onion Wafers", brand: "Balaji", weight: "150 g", price: 38, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://www.bigbasket.com/media/uploads/p/l/40053585_2-balaji-cream-onion-chips.jpg" },
  { id: 7, name: "Balaji Tomato Masti Wafers", brand: "Balaji", weight: "150 g", price: 38, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://www.bigbasket.com/media/uploads/p/l/40053585_2-balaji-cream-onion-chips.jpg" },
  { id: 8, name: "Balaji Pizzy Masala Wafers", brand: "Balaji", weight: "30 g", price: 10, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://www.jiomart.com/images/product/original/491336862/balaji-wafers-crunchem-pizzy-masala-potato-wafers-30-g-product-images-o491336862-p610108353-0-202410181639.jpg?im=Resize=(420,420)" },
  { id: 9, name: "Balaji Aloo Sev", brand: "Balaji", weight: "200 g", price: 42, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://www.jiomart.com/images/product/original/491336862/balaji-wafers-crunchem-pizzy-masala-potato-wafers-30-g-product-images-o491336862-p610108353-0-202410181639.jpg?im=Resize=(420,420)" },
  { id: 10, name: "Balaji Chana Dal", brand: "Balaji", weight: "500 g", price: 76, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://www.bbassets.com/media/uploads/p/l/30010131_5-balaji-namkeen-chana-dal.jpg" },
  { id: 11, name: "Balaji Chana Jor Garam", brand: "Balaji", weight: "220 g", price: 38, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/myahi9g0qb3kurclxmhw" },
  { id: 12, name: "Balaji Farali Chevda", brand: "Balaji", weight: "450 g", price: 80, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://m.media-amazon.com/images/I/51qqMBhPAiL.jpg" },
  { id: 13, name: "Balaji Farali Chevdo", brand: "Balaji", weight: "235 g", price: 47, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://m.media-amazon.com/images/I/51qqMBhPAiL.jpg" },
  { id: 14, name: "Balaji Gathiya", brand: "Balaji", weight: "300 g", price: 60, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://m.media-amazon.com/images/I/51iiHMKCC0L._UF1000,1000_QL80_.jpg" },
  { id: 15, name: "Balaji Khatta Mitha Mix", brand: "Balaji", weight: "500 g", price: 85, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://rukminim2.flixcart.com/image/750/900/xif0q/snack-savourie/r/g/l/-original-imahyhhujkuzgqps.jpeg?q=90&crop=false" },
  { id: 16, name: "Balaji Mung Dal", brand: "Balaji", weight: "400 g", price: 95, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsREhWjkaTcPFH__K4lV5JY1BXuw6QKeYPsg&s" },
  { id: 17, name: "Balaji Ratlami Sev", brand: "Balaji", weight: "200 g", price: 33, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://www.bbassets.com/media/uploads/p/l/40053580_3-balaji-namkeen-ratlami-sev.jpg" },
  { id: 18, name: "Balaji Shing Bhujia", brand: "Balaji", weight: "400 g", price: 71, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://www.bbassets.com/media/uploads/p/l/30010142_2-balaji-namkeen-shing-bhujiya.jpg" },
  { id: 19, name: "Balaji Tikha Mitha Mix", brand: "Balaji", weight: "500 g", price: 85, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://www.bbassets.com/media/uploads/p/l/40053576_3-balaji-namkeen-tikha-mitha-mix.jpg" },
  { id: 20, name: "Kurkure Masala Munch", brand: "Kurkure", weight: "75 g", price: 20, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://m.media-amazon.com/images/I/71sOPzrW0mL.jpg" },
  { id: 21, name: "Kurkure Chilli Chatka", brand: "Kurkure", weight: "68 g", price: 20, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://m.media-amazon.com/images/I/71znu5AldRL.jpg" },
  { id: 22, name: "Kurkure Green Chutney Rajasthani Style", brand: "Kurkure", weight: "68 g", price: 20, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://www.bbassets.com/media/uploads/p/m/294266_13-kurkure-namkeen-green-chutney-rajasthani-style.jpg" },
  { id: 23, name: "Kurkure Puffcorn Yummy Cheese", brand: "Kurkure", weight: "52 g", price: 20, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://m.media-amazon.com/images/I/71OwiJcIsjL.jpg" },
  { id: 24, name: "Kurkure Solid Masti Twisteez", brand: "Kurkure", weight: "90 g", price: 20, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://www.bbassets.com/media/uploads/p/l/30010142_2-balaji-namkeen-shing-bhujiya.jpg" },
  { id: 25, name: "Kurkure Hyderabadi Hungama", brand: "Kurkure", weight: "55 g", price: 20, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://www.bbassets.com/media/uploads/p/l/40053576_3-balaji-namkeen-tikha-mitha-mix.jpg" },
  { id: 26, name: "Kurkure Naughty Tomato", brand: "Kurkure", weight: "50 g", price: 20, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://m.media-amazon.com/images/I/71sOPzrW0mL.jpg" },
  { id: 27, name: "Kurkure Moong Dal Salted Namkeen", brand: "Kurkure", weight: "140 g", price: 40, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://m.media-amazon.com/images/I/81Leb4WJwQL._AC_UF894,1000_QL80_.jpg" },
  { id: 28, name: "Kurkure Multigrain Scoops", brand: "Kurkure", weight: "80 g", price: 20, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://www.bigbasket.com/media/uploads/p/s/40126336_1-kurkure-namkeen-multigrain-curry-herb-flavour.jpg" },
  { id: 29, name: "Kurkure Desi Beats", brand: "Kurkure", weight: "60 g", price: 20, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://mir-s3-cdn-cf.behance.net/projects/404/11028543.5480d0628fa0f.jpg" },
  { id: 30, name: "Classic Salted", brand: "Lay's", weight: "115 g", price: 55, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://www.onionz.in/uploads/items/0bbbf479375a272cbc1f5f8603748db5.jpg" },
  { id: 31, name: "India's Magic Masala", brand: "Lay's", weight: "115 g", price: 55, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://m.media-amazon.com/images/I/71oT4UpWomL.jpg" },
  { id: 32, name: "American Style Cream & Onion", brand: "Lay's", weight: "115 g", price: 55, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://m.media-amazon.com/images/I/71G1kVHN0-L.jpg" },
  { id: 33, name: "Spanish Tomato Tango", brand: "Lay's", weight: "115 g", price: 55, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://m.media-amazon.com/images/I/71S0Pgoi2XL.jpg" },
  { id: 34, name: "Hot & Sweet Chili", brand: "Lay's", weight: "115 g", price: 55, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://www.bbassets.com/media/uploads/p/l/294278_23-lays-potato-chips-hot-sweet-chilli-flavour-best-quality.jpg" },
  { id: 35, name: "Chile Limon", brand: "Lay's", weight: "115 g", price: 55, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://m.media-amazon.com/images/I/71DCs2yzAwL._UF1000,1000_QL80_.jpg" },
  { id: 36, name: "Thai Sweet Chilli", brand: "Lay's", weight: "110 g", price: 66, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://www.bbassets.com/media/uploads/p/l/40263752_1-lays-ignore-gourmet-potato-chips-thai-sweet-chilli-crispy.jpg" },
  { id: 37, name: "Thai Sweet Chilli", brand: "Lay's", weight: "160 g", price: 110, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://m.media-amazon.com/images/I/71XrrK0KlXL._AC_UF1000,1000_QL80_.jpg" },
  { id: 38, name: "Lime & Cracked Pepper", brand: "Lay's", weight: "160 g", price: 110, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://www.bbassets.com/media/uploads/p/l/40263756_1-lays-ignore-gourmet-potato-chips-lime-cracked-pepper-crunchy.jpg" },
  { id: 39, name: "Vintage Cheese & Paprika", brand: "Lay's", weight: "110 g", price: 64, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://www.bbassets.com/media/uploads/p/xl/40263754_1-lays-ignore-gourmet-potato-chips-vintage-cheese-paprika-crispy.jpg" },
  { id: 40, name: "Wavy Hickory BBQ", brand: "Lay's", weight: "115 g", price: 55, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRPIaeIZIZrj2l7Q1bgOIsnH_-iBGuFpA49Q&s" },
  { id: 41, name: "Wavy Ranch", brand: "Lay's", weight: "115 g", price: 55, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://m.media-amazon.com/images/I/81IIXfXVZ6L._UF894,1000_QL80_.jpg" },
  { id: 42, name: "Stax Original", brand: "Lay's", weight: "135 g", price: 120, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://rukminim2.flixcart.com/image/750/900/xif0q/chips/z/f/l/135-stax-original-flavour-chips-imported-135-gms-1-lays-original-imagj2gnpybafdnr.jpeg?q=90&crop=false" },
  { id: 43, name: "Stax Sour Cream & Onion", brand: "Lay's", weight: "135 g", price: 120, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://m.media-amazon.com/images/I/612J+lOpp3S._UF1000,1000_QL80_.jpg" },
  { id: 44, name: "Stax Cheddar", brand: "Lay's", weight: "135 g", price: 120, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://m.media-amazon.com/images/I/611Ba5VLm7L._UF1000,1000_QL80_.jpg" },
  { id: 45, name: "Stax Barbecue", brand: "Lay's", weight: "135 g", price: 120, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://images-eu.ssl-images-amazon.com/images/I/71TvroOBQnL._AC_UL210_SR210,210_.jpg" },
  { id: 46, name: "Baked Original", brand: "Lay's", weight: "50 g", price: 25, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://www.fritolay.com/sites/fritolay.com/files/2022-02/Baked_2021_Lays_ORIG_6.25oz_Render.png" },
  { id: 47, name: "Baked Sour Cream & Onion", brand: "Lay's", weight: "50 g", price: 25, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://www.fritolay.com/sites/fritolay.com/files/2022-02/Baked_2021_Lays_SCO_6.25oz_Render.png" },
  { id: 48, name: "Baked Barbecue", brand: "Lay's", weight: "50 g", price: 25, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://www.fritolay.com/sites/fritolay.com/files/2022-02/Baked_2021_Lays_BBQ_6.25oz_Render.png" },
  { id: 49, name: "Maxx Macho Chilli", brand: "Lay's", weight: "52 g", price: 25, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://m.media-amazon.com/images/I/71MKGDEEVKL._UF1000,1000_QL80_.jpg" },
  { id: 50, name: "Maxx Peppery Cheddar", brand: "Lay's", weight: "52 g", price: 25, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://cdn.zeptonow.com/production/tr:w-640,ar-500-500,pr-true,f-auto,q-80/inventory/product/c93ee3fe-58aa-4f58-99d2-d12bb669de33-897112f0-a6a2-4ca8-8b61-e3d464914915.jpeg" },
  { id: 51, name: "Sundried Chilli (Wafer Style)", brand: "Lay's", weight: "50 g", price: 22, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://www.jiomart.com/images/product/original/492662938/lay-s-sundried-chilli-potato-chips-52-g-product-images-o492662938-p592545031-0-202207131055.jpg?im=Resize=(1000,1000)" },
  { id: 52, name: "Salt & Pepper (Wafer Style)", brand: "Lay's", weight: "50 g", price: 22, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://m.media-amazon.com/images/I/71nT07IPJuL.jpg" },
  { id: 53, name: "Long Msala Banana Chips", brand: "Chheda's", weight: "95 g", price: 95, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://cdn.grofers.com/app/assets/products/sliding_images/jpeg/80393334-436d-4090-b7b0-bcbeb2ce54e6.jpg?ts=1726837541" },
  { id: 54, name: "Golden Aloo Chips", brand: "Chheda's", weight: "90 g", price: 90, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://cdn.zeptonow.com/production/ik-seo/tr:w-400,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/00096717-ab01-4e12-8fbb-4ae9e7bc5e82/Chheda-s-Golden-Plain-Salted-Chips.jpeg" },
  { id: 55, name: "Yellos Banana Chips", brand: "Chheda's", weight: "120 g", price: 120, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://rukminim2.flixcart.com/image/750/900/kl2mljk0/chips/o/v/d/350-yellow-banana-chips-350g-pack-of-1-chheda-s-original-imagy9zgvkppwwyw.jpeg?q=90&crop=false" },
  { id: 56, name: "Salt-n-Papper Banana Chips", brand: "Chheda's", weight: "85 g", price: 85, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://chheda.store/wp-content/uploads/2020/12/chheda_Banana_Chips_Salt_N_Pepper_Front.jpg" },
  { id: 57, name: "Tomato Banana Chips", brand: "Chheda's", weight: "85 g", price: 85, category: "Snacks & Beverages", subcategory: "Chips & Crisps", img: "https://m.media-amazon.com/images/I/61OTWifsHqL.jpg" },
  { id: 58, name: "Bhakharwadi", brand: "Chheda's", weight: "65 g", price: 65, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://cdn.grofers.com/app/assets/products/sliding_images/jpeg/145bad46-b059-4fdd-bfd2-144072e2ffa1.jpg?ts=1720374937" },
  { id: 59, name: "Nylon Sev Bhujia", brand: "Chheda's", weight: "55 g", price: 55, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://cdn.grofers.com/app/images/products/sliding_image/372141a.jpg?ts=1687755237" },
  { id: 60, name: "Roasted Chivda", brand: "Chheda's", weight: "55 g", price: 55, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://cdn.grofers.com/app/images/products/sliding_image/345991a.jpg?ts=1687438426" },
  { id: 61, name: "Ratlami Sev", brand: "Chheda's", weight: "55 g", price: 55, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://cdn.grofers.com/app/assets/products/sliding_images/jpeg/998dca29-c4c0-4871-8fde-070f1fd7caf3.jpg?ts=1708594229" },
  { id: 62, name: "Mora Sev Bhujia", brand: "Chheda's", weight: "55 g", price: 55, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://cdn.grofers.com/app/images/products/sliding_image/341427a.jpg?ts=1687755237" },
  { id: 63, name: "Diet Poha Chivda", brand: "Chheda's", weight: "55 g", price: 55, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://cdn.zeptonow.com/production/tr:w-640,ar-1200-1200,pr-true,f-auto,q-80/cms/product_variant/709008c0-cf8c-4f41-8146-36af167a7ac6.png" },
  { id: 64, name: "Tikha Sev Bhujia", brand: "Chheda's", weight: "55 g", price: 55, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/app/images/products/sliding_image/58596a.jpg?ts=1687948909" },
  { id: 65, name: "Salted Bundi", brand: "Chheda's", weight: "55 g", price: 55, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://m.media-amazon.com/images/I/61IXFqpjmKL.jpg" },
  { id: 66, name: "Tasty Peanuts", brand: "Chheda's", weight: "60 g", price: 60, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://cdn.grofers.com/app/images/products/sliding_image/318776a.jpg?ts=1687243863" },
  { id: 67, name: "Farsan Mixture Namkeen", brand: "Chheda's", weight: "55 g", price: 55, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/app/images/products/sliding_image/372138a.jpg?ts=1687616753" },
  { id: 68, name: "Moong Dal", brand: "Chheda's", weight: "60 g", price: 60, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://cdn.zeptonow.com/production/tr:w-640,ar-2000-1500,pr-true,f-auto,q-80/inventory/product/79fc9bac-9ae0-45fc-9ccc-489c1740f8e1-Photo.jpeg" },
  { id: 69, name: "Bhavnagari Gathiya", brand: "Chheda's", weight: "55 g", price: 55, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/app/images/products/sliding_image/372140a.jpg?ts=1687243866" },
  { id: 70, name: "Nadyadi Mixture", brand: "Chheda's", weight: "55 g", price: 55, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://cdn.zeptonow.com/production/tr:w-640,ar-671-966,pr-true,f-auto,q-80/inventory/product/60b22db9-5cbc-4ac0-97b4-e91c5059f107-1dzfKjBJ4QnYTh5q5ZQX3DPkNccITXw74.jpeg" },
  { id: 71, name: "Manglori Murukku Namkeen", brand: "Chheda's", weight: "55 g", price: 55, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://cdn.grofers.com/app/images/products/sliding_image/341426a.jpg?ts=1687243864" },
  { id: 72, name: "Bhelpuri Mix", brand: "Chheda's", weight: "55 g", price: 55, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://cdn.grofers.com/app/images/products/sliding_image/380893a.jpg?ts=1687755238" },
  { id: 73, name: "Chana Dal", brand: "Chheda's", weight: "55 g", price: 55, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://cdn.grofers.com/app/images/products/sliding_image/341425a.jpg?ts=1687326260" },
  { id: 74, name: "Farali Potato Falhari Mixture", brand: "Chheda's", weight: "90 g", price: 90, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://cdn.grofers.com/app/assets/products/sliding_images/jpeg/5dc4d82c-4ea3-40f4-a046-87037ef633e6.jpg?ts=1712061846" },
  { id: 75, name: "Instant Bhelpuri", brand: "Chheda's", weight: "60 g", price: 60, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://m.media-amazon.com/images/I/717n+p1rfSL._UF1000,1000_QL80_.jpg" },
  { id: 76, name: "Navratan Mixture Namkeen", brand: "Chheda's", weight: "55 g", price: 55, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://cdn.grofers.com/app/images/products/sliding_image/372139a.jpg?ts=1687949322" },
  { id: 77, name: "Golden Mixture Namkeen", brand: "Chheda's", weight: "55 g", price: 55, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://cdn.grofers.com/app/images/products/sliding_image/318748a.jpg?ts=1687949314" },
  { id: 78, name: "Dry Kachori", brand: "Chheda's", weight: "60 g", price: 60, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRcChpFNKjhrFRUjvW4rqKT2UTsErjZjRqAg&s" },
  { id: 79, name: "Chana Dal", brand: "Balaji", weight: "200 g", price: 42, category: "Snacks & Beverages", subcategory: "Bhujiya & Mixes", img: "https://nammagrocery.com/cdn/shop/files/Balaji-200g-Chana-Dal.png?v=1719465272" },
  { id: 80, name: "Saunf Mukhvas", brand: "Assorted", weight: "100g", price: 50, category: "Mukhvas", subcategory: "Traditional", img: "https://m.media-amazon.com/images/I/61hzdk-vhGL._UF1000,1000_QL80_.jpg", flavorProfile: "Sweet, cooling", ingredients: "Fennel seeds, sugar, menthol" },
  { id: 81, name: "Variyali", brand: "Assorted", weight: "100g", price: 50, category: "Mukhvas", subcategory: "Traditional", img: "https://m.media-amazon.com/images/I/71hCG+MQXiL._UF1000,1000_QL80_.jpg", flavorProfile: "Sweet, aromatic", ingredients: "Roasted fennel seeds, sugar coating" },
  { id: 82, name: "Mix Mukhvas", brand: "Assorted", weight: "100g", price: 50, category: "Mukhvas", subcategory: "Traditional", img: "https://m.media-amazon.com/images/I/41S8JGVwaNL._UF894,1000_QL80_.jpg", flavorProfile: "Mixed flavor, slightly tangy", ingredients: "Fennel, sesame seeds, ajwain, dhana dal, sugar" },
  { id: 83, name: "Dhana Dal", brand: "Assorted", weight: "100g", price: 50, category: "Mukhvas", subcategory: "Traditional", img: "https://m.media-amazon.com/images/I/8179adDD8XL._UF1000,1000_QL80_.jpg", flavorProfile: "Nutty, slightly bitter", ingredients: "Roasted coriander seeds" },
  { id: 84, name: "Jeera Goli", brand: "Assorted", weight: "100g", price: 50, category: "Mukhvas", subcategory: "Traditional", img: "https://satyanarayanmukhwas.com/wp-content/uploads/2022/11/Jeera-Goli-scaled.jpg", flavorProfile: "Tangy, salty, digestive", ingredients: "Cumin seeds, sugar, lemon, black salt" },
  { id: 85, name: "Amla Candy", brand: "Assorted", weight: "100g", price: 50, category: "Mukhvas", subcategory: "Traditional", img: "https://e.saravanaonline.com/4843-large_default/sweet-amla-candy-100-gm.jpg", flavorProfile: "Sweet, tangy, vitamin-rich", ingredients: "Dried Indian gooseberry, sugar" },
  { id: 86, name: "Meetha Pan Mukhvas", brand: "Assorted", weight: "100g", price: 50, category: "Mukhvas", subcategory: "Traditional", img: "https://m.media-amazon.com/images/I/619y9J900zL._UF350,350_QL80_.jpg", flavorProfile: "Sweet, aromatic, mild paan", ingredients: "Betel leaves, fennel, coconut, gulkand" },
  { id: 87, name: "Madrasi Saunf", brand: "Assorted", weight: "100g", price: 50, category: "Mukhvas", subcategory: "Traditional", img: "https://m.media-amazon.com/images/I/6146GINhayS._UF1000,1000_QL80_.jpg", flavorProfile: "Sweet, crunchy", ingredients: "Sugar-coated fennel with bright colors" },
  { id: 88, name: "Hing Peda", brand: "Assorted", weight: "100g", price: 50, category: "Mukhvas", subcategory: "Traditional", img: "https://5.imimg.com/data5/SELLER/Default/2024/11/466536655/WI/YC/TV/20442746/hing-peda.webp", flavorProfile: "Pungent, digestive", ingredients: "Asafoetida, sugar, mango powder, salt" },
  { id: 89, name: "Churan Goli", brand: "Assorted", weight: "100g", price: 50, category: "Mukhvas", subcategory: "Traditional", img: "https://m.media-amazon.com/images/I/615amdn4XZL._UF1000,1000_QL80_.jpg", flavorProfile: "Tangy, spicy", ingredients: "Tamarind, mango powder, black salt, spices" },
  { id: 90, name: "Digestive Mukhvas", brand: "Assorted", weight: "100g", price: 50, category: "Mukhvas", subcategory: "Traditional", img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSqmpMlOqWKPK-DK9O8PQv0hl4ofMdcXVOzI9f-kPP4JwRE-xN0zdCa6T3khQHkBqAbXPH_krrKxGXaPTYNVL4TzIbZepDIFS7Q5Z2vP9jo-mpIilczXX0J", flavorProfile: "Strong, digestive", ingredients: "Carom seeds, fennel, cumin, black salt" },
  { id: 91, name: "Pan Shot", brand: "Assorted", weight: "100g", price: 50, category: "Mukhvas", subcategory: "Traditional", img: "https://m.media-amazon.com/images/I/617an97vBSL._UF1000,1000_QL80_.jpg", flavorProfile: "Sweet, tangy, refreshing", ingredients: "Betel leaves essence, fennel, gulkand, spices" },
  { id: 92, name: "Dry Pan Mukhvas", brand: "Assorted", weight: "100g", price: 50, category: "Mukhvas", subcategory: "Traditional", img: "https://rukminim2.flixcart.com/image/850/1000/kcz4rrk0/candy-mouth-freshener/r/s/f/200-homemade-natural-paan-200-g-mouth-freshener-digestive-after-original-imaftzf2upggxsyz.jpeg?q=90&crop=false", flavorProfile: "Intense paan flavor", ingredients: "Dry betel leaves, gulkand, fennel, coconut" },
  { id: 93, name: "Silver Coated Saunf", brand: "Assorted", weight: "100g", price: 50, category: "Mukhvas", subcategory: "Traditional", img: "https://rajajionline.in/cdn/shop/files/1027.-01_large.jpg?v=1731072042", flavorProfile: "Premium, sweet", ingredients: "Fennel seeds coated with edible silver & sugar" },
  { id: 94, name: "Rose Petal Mukhvas (Gulkand Mix)", brand: "Assorted", weight: "100g", price: 50, category: "Mukhvas", subcategory: "Traditional", img: "https://m.media-amazon.com/images/I/71b7kmp1pbL._UF1000,1000_QL80_.jpg", flavorProfile: "Sweet, floral", ingredients: "Gulkand, cardamom, fennel, rose petals" },
  { id: 95, name: "Til Mukhvas", brand: "Assorted", weight: "100g", price: 50, category: "Mukhvas", subcategory: "Traditional", img: "https://images.meesho.com/images/products/188372326/tvmz7_512.webp", flavorProfile: "Nutty, sweet", ingredients: "Sesame seeds, jaggery/sugar" },
  { id: 96, name: "Anardana Goli", brand: "Assorted", weight: "100g", price: 50, category: "Mukhvas", subcategory: "Traditional", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUOiZbswKP8GGztyJYShVl2d7_uC89BC9vWA&s", flavorProfile: "Tangy, sour", ingredients: "Pomegranate powder, spices" },
  { id: 97, name: "Elaichi Dana", brand: "Assorted", weight: "100g", price: 50, category: "Mukhvas", subcategory: "Traditional", img: "https://rukminim2.flixcart.com/image/850/1000/xif0q/candy-mouth-freshener/b/6/b/50-silver-coated-elaichi-dana-cardamom-pearls-mouth-freshener-1-original-imagkuaqhhywgyd2.jpeg?q=20&crop=false", flavorProfile: "Strong, sweet, aromatic", ingredients: "Cardamom seeds, sugar coating" },
  { id: 98, name: "Dry Kachori", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJUrnC_X4TrTDfx2F4Jmmn6sSw_9yVN7_rDQ&s" },
  { id: 99, name: "Dry Patra", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://maniarrs.com/cdn/shop/products/Dry-patra_1000x.jpg?v=1655453894" },
  { id: 100, name: "Methi Puri", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://prashantcorner.com/cdn/shop/files/MethiPuri-3.jpg?v=1727760132" },
  { id: 101, name: "Chana Jor Garam", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://m.media-amazon.com/images/I/71bSCeNj3bL._UF1000,1000_QL80_.jpg" },
  { id: 102, name: "Fudwadi", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://cpimg.tistatic.com/4851696/b/4/fulwadi-namkeen.jpg" },
  { id: 103, name: "Mix Chavanu", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtErg78h_N5dj_i5ot1lk3EaALJKf-27F12g&s" },
  { id: 104, name: "Bhakharwadi", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://m.media-amazon.com/images/I/51U0wPZzsWL._UF350,350_QL80_.jpg" },
  { id: 105, name: "Ratlami Sev", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://m.media-amazon.com/images/I/71uhR7jA+AL._UF1000,1000_QL80_.jpg" },
  { id: 106, name: "Chorafali", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://cpimg.tistatic.com/5415851/b/4/chorafali-papad.jpg" },
  { id: 107, name: "Alu sev", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://www.bbassets.com/media/uploads/p/l/30010145_7-balaji-namkeen-aloo-sev.jpg" },
  { id: 108, name: "Khakhra", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://neelamfoodlandmumbai.com/cdn/shop/products/IMG_8258_a09380d6-2431-4497-b469-6e22e39336e1_1200x.jpg?v=1634020615" },
  { id: 109, name: "Gathiya", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://www.jiomart.com/images/product/original/rvgposm4ql/freshocartz-makhaniya-soft-salted-gathiya-namkeen-100-g-product-images-orvgposm4ql-p601692078-0-202305221700.jpg?im=Resize=(420,420)" },
  { id: 110, name: "Wheat Chakri", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://sonalbenpuriwala.com/cdn/shop/files/GhauChakri4_c979bb2f-591c-4de2-be17-102b859d6129.png?v=1715411202" },
  { id: 111, name: "Mung Dal", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://3.imimg.com/data3/YK/RH/MY-10353443/moong-dal-500x500.jpg" },
  { id: 112, name: "Makai Paua", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://5.imimg.com/data5/SELLER/Default/2022/2/MT/PY/LO/23881680/makkai-poha-500x500.jpg" },
  { id: 113, name: "Farsi Puri", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://i1.wp.com/indiaspicemart.com/wp-content/uploads/2021/07/Farsi-Puri-1_600x600.jpg?fit=600%2C600&ssl=1" },
  { id: 114, name: "Shakkar para Sweet", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://5.imimg.com/data5/JD/XP/MY-13778460/sweet-shakkar-para.jpg" },
  { id: 115, name: "Shakkar para (Spicy)", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://5.imimg.com/data5/SELLER/Default/2025/3/498681920/MG/FO/YN/28858320/healmillet-ragi-millet-jaggery-shakarpara.png" },
  { id: 116, name: "Lilo Chevdo", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://jagdishfarshan.com/cdn/shop/files/lilo_chevdo_G.png?v=1720604213" },
  { id: 117, name: "Sing Bhujia", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://www.bbassets.com/media/uploads/p/l/40050975_4-samrat-namkeen-sing-bhujia.jpg" },
  { id: 118, name: "Nylon Sev", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://m.media-amazon.com/images/I/61wXIDR7enS.jpg" },
  { id: 119, name: "Masala Sing", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://m.media-amazon.com/images/I/71wFNhTulxS._UF350,350_QL80_.jpg" },
  { id: 120, name: "Chana Dal", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://rukminim2.flixcart.com/image/300/300/l1nwnm80/snack-savourie/t/x/i/masala-chana-dal-spicy-and-crunchy-snacks-protein-rich-box-original-imagd6kstuswzekb.jpeg" },
  { id: 121, name: "Paled Sev", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://images-eu.ssl-images-amazon.com/images/I/61wXIDR7enS._AC_UL210_SR210,210_.jpg" },
  { id: 122, name: "Tomo Sev", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://5.imimg.com/data5/ED/ZN/FZ/SELLER-21848749/tomato-sev-namkeen-500x500.jpg" },
  { id: 123, name: "Dry samosa", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://dadus.co.in/cdn/shop/files/48_69aad44f-9773-498c-b8e2-aa5818c1733c.png?v=1742311222&width=1200" },
  { id: 124, name: "Sabudana Chevdo", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://m.media-amazon.com/images/I/61oQubzVIqL._UF350,350_QL80_.jpg" },
  { id: 125, name: "Farali Chevdo", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://www.bbassets.com/media/uploads/p/xl/30010133_2-balaji-farali-chevdo-namkeen.jpg" },
  { id: 126, name: "Khari Sing", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://rukminim2.flixcart.com/image/750/900/jz4g3gw0/snack-savourie/a/2/g/250-roasted-salted-peanuts-khari-sing-250g-tin-nutrilla-original-imafj7gs2swmtx9d.jpeg?q=90&crop=false" },
  { id: 127, name: "Wheat Paua", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://5.imimg.com/data5/SELLER/Default/2022/10/KF/FF/LI/12577106/banshi-wheat-500x500.jpg" },
  { id: 128, name: "papad", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://i0.wp.com/bajarhaat.com/wp-content/uploads/2024/06/Masala-Papad.webp?fit=500%2C500&ssl=1" },
  { id: 129, name: "soya sticks", brand: "Assorted", weight: "100g", price: 50, category: "Grains & Pulses", subcategory: "", img: "https://content.jdmagicbox.com/rep/b2b/soya-stick/soya-stick-11.jpg?impolicy=queryparam&im=Resize=(360,360),aspect=fit" },
  ]);

  const handleAddToCart = (id) => {
    setCart(prevCart => {
      const found = prevCart.find(item => item.id === id);
      if (found) {
        return prevCart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
      } else {
        return [...prevCart, { id, quantity: 1 }];
      }
    });
      setAddedId(id);
      setTimeout(() => setAddedId(null), 1000);
  };

  const handleIncrement = (id) => {
    setCart(prevCart => prevCart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const handleDecrement = (id) => {
    setCart(prevCart => prevCart
      .map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item)
      .filter(item => item.quantity > 0)
    );
  };

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
    setAddedId(null);
  };

  const handleCheckout = () => {
    setCartOpen(false);
    setPaymentOpen(true);
  };

  const handlePaymentSuccess = () => {
    setCart([]);
    setPaymentOpen(false);
    alert('Payment successful! Your order has been placed.');
  };

  const cartItems = cart.map(({id, quantity}) => {
    const product = products.find(p => p.id === id);
    return product ? { ...product, quantity } : null;
  }).filter(Boolean);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCategoryNavClick = (catName) => {
    setSelectedCategory(catName);
    setSelectedSubcategory(null);
  };

  const handleSubcategoryNavClick = (subcat) => {
    setSelectedSubcategory(subcat);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  let productsToShow = filteredProducts;
  if (!searchQuery) {
    if (selectedSubcategory) {
      productsToShow = products.filter(
        p => p.subcategory === selectedSubcategory && (!selectedCategory || p.category === selectedCategory)
      );
    } else if (selectedCategory) {
      productsToShow = products.filter(p => p.category === selectedCategory);
    } else {
      productsToShow = products;
    }
  }

  return (
    <Router>
    <div className="app-modern">
      <Header
          cartCount={cart.length}
          onLoginClick={() => setLoginOpen(true)}
          onCartClick={() => setCartOpen(true)}
          isLoggedIn={isLoggedIn}
          handleCategoryNavClick={handleCategoryNavClick}
          handleSubcategoryNavClick={handleSubcategoryNavClick}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        />
      <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Categories />
              <Products 
                onAddToCart={handleAddToCart} 
                addedId={addedId} 
                products={productsToShow}
                showSubcategoryFilter={selectedCategory === "Snacks & Beverages"}
                subcategories={categories.find(c => c.name === "Snacks & Beverages")?.subcategories || []}
          selectedSubcategory={selectedSubcategory}
                onSubcategoryClick={handleSubcategoryNavClick}
                selectedCategory={selectedCategory}
                cart={cart}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
              />
            </>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/admin" element={<AdminDashboard products={products} setProducts={setProducts} />} />
      </Routes>
        <Footer />
        <SignInModal open={loginOpen} onClose={() => setLoginOpen(false)} onLoginSuccess={() => { setIsLoggedIn(true); setLoginOpen(false); }} />
        <CartDrawer 
          open={cartOpen} 
          onClose={() => setCartOpen(false)} 
          cart={cart} 
          products={products} 
          onRemoveFromCart={handleRemoveFromCart} 
          onCheckout={handleCheckout} 
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
        <PaymentModal open={paymentOpen} onClose={() => setPaymentOpen(false)} total={total} onPaymentSuccess={handlePaymentSuccess} />
        <LeftSidebarMenu 
          categories={categories} 
          onCategoryClick={(catName) => { setSelectedCategory(catName); setSelectedSubcategory(null); setSidebarShow(true); }}
          onClose={() => setSidebarShow(false)}
          show={sidebarShow}
          selectedCategory={selectedCategory}
          onSubcategoryClick={handleSubcategoryNavClick}
        />
    </div>
    </Router>
  );
}

export default App;


