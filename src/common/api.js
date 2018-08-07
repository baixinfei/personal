
//天气图片地址
const imgHost = 'http://fuss10.elemecdn.com/';
//home-ad图片
const imgHomneAd = 'http//fuss10.elemecdn.com/'
//地址
const addressApi = '/bgs/poi/reverse_geo_coding'
//天气
const weatherApi = '/bgs/weather/current'
//关键字
const hotWordApi = '/shopping/v3/hot_search_words'
//搜索页面的关键字
const bannerApi = '/shopping/v2/entries'
//商家列表
const restaurantsApi = '/shopping/restaurants'
//地址搜索
const nearbyApi =  '/bgs/poi/search_poi_nearby'
//商家详情
const sellerGoodsApi = '/shopping/v2/menu';
//商家店铺信息
const sellerInfo = '/shopping/restaurant'
//买家评价
const buyerRating = '/ugc/v2/restaurants'
const AllRating = '/ugc/v2/restaurants'
//评价分类
const ratingClassify = '/ugc/v2/restaurants'
const searchWordApi = '/shopping/v1/restaurants/search';
//发现页面
const discoverApi = '/member/v1/discover'
const bannerAd = 'https://fuss10.elemecdn.com/'
const saleApi = '/shopping/v1/sale_list_index'
const timeList = '/member/gifts/suggest'
const confirmOrder = '/booking/v1/carts/checkout'
export default{
	addressApi,
	weatherApi,
	hotWordApi,
	imgHost,
	bannerApi,
	restaurantsApi,
	nearbyApi,
	sellerGoodsApi,
	sellerInfo,
	buyerRating,
	AllRating,
	ratingClassify,
	searchWordApi,
	discoverApi,
	bannerAd,
	saleApi,
	timeList,
	confirmOrder
}
