//处理首页的url请求
import axios from 'axios'
import URL from "../common/api.js"

//地址请求
export function getAddress(lat, lon){
	return new Promise((resolve,reject)=>{
		axios.get(`${URL.addressApi}?latitude=${lat}&longitude=${lon}`)
		.then((response)=>{
			const address = response.data.address;
			resolve(address)
		})
	})
	
}
//天气请求
export function getWeather(lat,lon){
	return new Promise((resolve,reject)=>{
		axios.get(`${URL.weatherApi}?latitude=${lat}&longitude=${lon}`)
		.then((response)=>{
			const weatherInfo = response.data;
			resolve(weatherInfo)
		})
	})
}
//关键字请求
export function getHotWord(lat,lon){
	return new Promise((resolve,reject)=>{
		axios.get(`${URL.hotWordApi}?latitude=${lat}&longitude=${lon}`)
		.then((response)=>{
			const hotword = response.data.map((item)=>{
				return item.word
			});
			resolve(hotword)
		})
	})
}
////搜索页面的关键字
export function getsearchWord(lat,lon,geohash,timestamp,locationName){
	return new Promise((resolve,reject)=>{
		axios.get(`${URL.hotWordApi}?geohash${geohash}&latitude=${lat}&longitude=${lon}&timestamp=${timestamp}&locationName=${locationName}`)
		.then((response)=>{
			const hotword = response.data.map((item)=>{
				return item.word
			});
			resolve(hotword)
		})
	})
}

//bannner
export function banner(lat,lon,tem){
	return new Promise((resolve,reject)=>{
		axios.get(`${URL.bannerApi}?latitude=${lat}&longitude=${lon}&templates[]=${tem}`)
		.then((response)=>{
			const list = response.data[0].entries.map((item)=>{
				var obj={};
				obj.name = item.name;
				obj.image_hash = item.image_hash;
				return obj;
			});
			resolve(list)
		})
	})
}
//商家信息请求
export function restaurants(lat,lon,offset,limit){
	return new Promise((resolve,reject)=>{
		axios.get(`${URL.restaurantsApi}?latitude=${lat}&longitude=${lon}&offset=${offset}&limit=${limit}&extras[]=activities`)
		.then((response)=>{
			const list = response.data.map((item)=>{
				let newItem = {};
				newItem.image_path = item.image_path;
				newItem.name = item.name;
				newItem.rating = item.rating;
				newItem.orderNum = item.recent_order_num;
				//运费
				newItem.float_delivery_fee = item.float_delivery_fee;
				//起送费用
				newItem.float_minimum_order_amount = item.float_minimum_order_amount;
				//.....
				//配送距离
				newItem.distance = item.distance;
				//配送时间
				newItem.time = item.order_lead_time;
				//活动
				newItem.activity = item.activities;
				//商家id
				newItem.id = item.id;
				//发票
				newItem.supports = item.supports[0];
				newItem.showActivity = false;
				return newItem;
			});
			resolve(list)
			//console.log(response.data);
		})
	})
}
//搜索附近
export function nearby(lat,lon,keyword){
	return new Promise((resolve,reject)=>{
		axios.get(`${URL.nearbyApi}?keyword=${keyword}&&offset=0&limit=20&latitude=${lat}&longitude=${lon}`)
		.then((response)=>{
			let arr = response.data.map((item)=>{
				let newItem = {};
				newItem.lat = item.latitude;
				newItem.lon = item.longitude;
				newItem.name = item.name;
				newItem.address = item.address;
				return newItem;
			})
			resolve(arr);
		})
	})
}
//请求商家的商品
export function getSellerGoods(id){
	return new Promise((resolve, reject)=>{
		axios.get(`${URL.sellerGoodsApi}?restaurant_id=${id}`)
		.then((response)=>{
			//console.log(response.data);
			let arr = response.data.map((item)=>{
				let newItem = {};
				newItem.foods = item.foods;
				newItem.name = item.name;
				newItem.description = item.description;
				return newItem;
			})
			resolve(arr);

		})
	})
}
//请求商家店铺信息
export function getSellerInfo(id,lat,lon){
	return new Promise((resolve, reject)=>{
		axios.get(`${URL.sellerInfo}/${id}?extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification&extras[]=qualification&terminal=h5
&latitude=${lat}&longitude=${lon}`)
		.then((response)=>{
			//console.log(response.data);
//			let arr = response.data.map((item)=>{
//				let newItem = {};
//				newItem.activity = item.activities;
//				newItem.albums = item.albums;
//				newItem.description = item.description;
//				newItem.address = item.address;
//				newItem.opening_hours = item.opening_hours;
//				item.promotion_info = item.promotion_info;
//				item.
//				return newItem;
//			})
			resolve(response.data);
			//console.log(response.data);
		})
	})
}
//请求商家评价信息
export function getSellerRating(id){
	return new Promise((resolve, reject)=>{
		axios.get(`${URL.buyerRating}/${id}/ratings?has_content=true&offset=0&limit=10
`)
		.then((response)=>{
			resolve(response.data);
		})
	})
}
export function getAllRating(id){
	return new Promise((resolve, reject)=>{
		axios.get(`${URL.AllRating}/${id}/ratings/scores`)
		.then((response)=>{
			resolve(response.data);
		})
	})
}
export function getRatingClassfify(id){
	return new Promise((resolve, reject)=>{
		axios.get(`${URL.ratingClassify}/${id}/ratings/tags`)
		.then((response)=>{
			resolve(response.data);
		})
	})
}
//关键字搜索列表
export function getSearchSeller(word, lat, lon){
	return new Promise((resolve, reject)=>{
		axios.get(`${URL.searchWordApi}?offset=0&limit=20&keyword=${word}&latitude=${lat}&longitude=${lon}&search_item_type=2&extra[]=activities`)
		.then((response)=>{
			console.log(response.data);
			let data0 = response.data['0'] || {};
			let arr0 = data0.restaurant_with_foods || [];
			let data1 = response.data['1'] || {};
			let arr1 = data1.restaurant_with_foods || [];
			
			let data = [...arr0, ...arr1];
			
			let arr = data.map((item)=>{
				let newItem = {};
				newItem.id = item.restaurant.id;
				newItem.image_path = item.restaurant.image_path;
				newItem.name = item.restaurant.name;
				newItem.rating = item.restaurant.rating;
				newItem.orderNum = item.restaurant.recent_order_num;
				newItem.distance = item.restaurant.distance;
				newItem.time = item.restaurant.order_lead_time;
				newItem.free = item.restaurant.float_delivery_fee;
				newItem.sendFree = item.restaurant.float_minimum_order_amount;
				newItem.send = item.restaurant.delivery_mode;
				newItem.support = item.restaurant.supports;
				newItem.showActivity = false;
				//.....
				return newItem;
			})
			resolve(arr);
		})
	})
}