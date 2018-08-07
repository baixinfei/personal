//处理首页的url请求
import axios from 'axios'
import URL from "../common/api.js"

//分类请求
export function getclassfify(lat, lon){
	return new Promise((resolve,reject)=>{
		axios.get(`${URL.discoverApi}?platform=1&block_index=0&latitude=${lat}&longitude=${lon}`)
		.then((response)=>{
			resolve(response.data)
		})
	})
	
}
export function getsale(lat, lon){
	return new Promise((resolve,reject)=>{
		axios.get(`${URL.saleApi}?type=special_food&latitude=${lat}&longitude=${lon}&params=%7B%7D`)
		.then((response)=>{
			resolve(response.data)
		})
	})
	
}
export function getTimeList(){
	return new Promise((resolve,reject)=>{
		axios.get(`${URL.timeList}`)
		.then((response)=>{
			resolve(response.data)
		})
	})
	
}
export function confirm(){
	return new Promise((resolve,reject)=>{
		axios.get(`${URL.confirmOrder}`)
		.then((response)=>{
			resolve(response.data)
			console.log(response.data);
		})
	})
	
}
