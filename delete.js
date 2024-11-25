// Firebase 配置
const firebaseConfig = {
    apiKey: "AIzaSyC6eM0-qNoaq1bM58LwbHh5RfO1bqGIjFA",
    authDomain: "food-805fe.firebaseapp.com",
    databaseURL: "https://food-805fe-default-rtdb.firebaseio.com",
    projectId: "food-805fe",
    storageBucket: "food-805fe.appspot.com",
    messagingSenderId: "1083735236426",
    appId: "1:1083735236426:web:0e7d8afa0a6a8df58babb3"
};

// 初始化 Firebase
firebase.initializeApp(firebaseConfig);
let database = firebase.database();
let foodsRef = database.ref('foods');

// 要重新添加的正確格式的資料
const correctFoodsData = {
    "桃竹苗": [
        "頭份胡家院牛肉麵",
        "北門街熊川牛肉麵",
        "原夜市鴨肉麵",
        "小鵲sing紅豆餅",
        "東南起家店",
        "璽子牛肉麵",
        "牛肉王子",
        "艷麗",
        "肉多多",
        "巨城美食街",
        "竹南福州包",
        "頭份田新牛家莊",
        "樹林頭夜市",
        "JAI宅新竹巨城",
        "鷹王肉圓"
    ],
    "北北基": [
        "蘆洲林太太炸雞"
    ],
    "高屏": [
        "高雄厚得福"
    ]
};

// 清除原資料並重新上傳正確的資料
function fixDatabaseData() {
    // 清除舊有資料
    foodsRef.remove()
        .then(() => {
            console.log("成功移除舊有資料。");
            // 重新上傳正確格式的資料
            for (const region in correctFoodsData) {
                correctFoodsData[region].forEach(food => {
                    foodsRef.child(region).push().set(food)
                        .then(() => console.log(`成功新增美食：${food} 至區域：${region}`))
                        .catch(error => console.error(`新增失敗：${error.message}`));
                });
            }
        })
        .catch(error => console.error(`移除舊資料失敗：${error.message}`));
}

// 呼叫修復資料的函數
fixDatabaseData();
