<template>
	<div class='slide' id='goods'>
		<nav class="nav-bar1">
			<ul class="wrapper">
				<li v-for="(menus, index) in goodsMenu" 
					:class="{active: index == selectNavIndex}"
					@click="navAction(index)">
					{{menus.name}}
				</li>
			</ul>
		</nav>
		<div class="menu">
			<div class="menu-wrap">
				<div class="wrapper" v-for="(menus,i) in goodsMenu">
					<h3 class="title">{{menus.name}}<span>{{menus.description}}</span></h3>
					<ul>
						<li v-for="(item,index) in menus.foods" class="food one-bottom-px">
							<img :src="handleImg(item.image_path)" />
							<div class='goodsInfo'>
								<h5>{{item.name}}</h5>
								<p>{{item.description}}</p>
								<p>月售{{item.month_sales}}&nbsp;&nbsp;好评率{{item.satisfy_rate}}%</p>
								<h6>
									<span>￥{{item.specfoods[0].price}}</span>
									<i class="choice01" v-if="item.specfoods[0].specs.length>0" @click="selectSize(index,i)">选规格</i>
									
									<p v-else-if="item.specfoods[0].specs.length<=0" >
										<em v-if='item.num>=1' @click="reduceNum(index,i)">-</em>
										<span v-if='item.num>=1' class='num'>{{item.num}}</span>
										<i @click="addNum(index,i)">+</i>
									</p>
								</h6>
								
							</div>
							
						</li>
					</ul>
				</div>
			</div>
		</div>
		<size-cover :goodsSize="goodsSize" v-if='flag2' @hidden='btnHidden'></size-cover>
	</div>
	
	
</template>

<script>
	import { handleImg } from '../../common/common.js'
	import { getSellerGoods } from '../../service/homeService.js'
	import sizeCover from '../../component/home/sizelCover.vue'
	let menuScroll;
	export default{
		data(){
			return{
				goodsMenu:{},
				selectNavIndex:0,
				menusHeightArr: [],
				flag2:false,
				flag3:false,
				goodsArr:[],
				total:0,
				goodsSize:{},
				showStatus:false
			}
		},
		props:['sellerId'],
		components:{
			"size-cover":sizeCover
		},
		methods:{
			handleImg,
			navAction(index){
			//菜单栏的点击事件
			//让点击的菜单按钮选中
				this.selectNavIndex = index;
				//菜单列表滚动到对应位置
//				console.log(this.menusHeightArr);
				let height = 0;
				for(let i = 0; i < index; i++){
					height -= this.menusHeightArr[i];
				}
				menuScroll.refresh();
				if(height > menuScroll.maxScrollY){
					menuScroll.scrollTo(0, height);
				}else{
					menuScroll.scrollTo(0, menuScroll.maxScrollY);
				}
				
			},
			selectSize(index,i){
				this.flag2 = true
				console.log(this.goodsMenu[i].foods[index])
				this.goodsSize = this.goodsMenu[i].foods[index];
				
			},
			addNum(index,i){	
				// this.showStatus = true;
				var num = this.goodsMenu[i].foods[index].num;
				var price = this.goodsMenu[i].foods[index].specfoods[0].price;
				this.goodsMenu[i].foods[index].num++;
				console.log(num);
				this.total += (this.goodsMenu[i].foods[index].num-num)*price;
				this.$event.$emit('count',this.total);
				this.goodsArr.push(this.goodsMenu[i].foods[index]);
				this.$event.$emit('getnum',this.goodsArr);
				
			},
			reduceNum(index,i){
				 this.goodsMenu[i].foods[index].num--;
				let num = this.goodsMenu[i].foods[index].num;
				if(num<=0){
					num=1;
				}
				console.log( this.goodsMenu[i].foods[index].num);
				this.total -= num*this.goodsMenu[i].foods[index].specfoods[0].price;
				if(this.goodsMenu[i].foods[index].num<1){
					this.goodsMenu[i].foods[index].num=0;
					// this.showStatus = false
				}				
				console.log(this.total);
				if(this.total<=0){
					this.total = 0;
				}
				this.$event.$emit('count',this.total);
			},
			btnHidden(s,n){
				this.flag2 = s;
				this.total += n;
				this.$event.$emit('count',this.total);
			}
		},
		created(){
			getSellerGoods(this.sellerId)
			.then((result)=>{
				var arr = result.map((item)=>{
					item.foods.map((i)=>{
						i.num = 0;
						return i;
					})
					return item;
				})
				this.goodsMenu = arr;
				console.log(arr);
			})
		},
		mounted(){
			let navScroll = new IScroll('#goods .nav-bar1', {
				click: true,
				tap: true,
				bounce: false
			});
			navScroll.on('scrollStart', ()=>{
				navScroll.refresh();
			});
			menuScroll = new IScroll('#goods .menu', {
				click: true,
				tap: true,
				bounce: false,
				probeType: 3
			});
			menuScroll.on('scrollStart', ()=>{
				menuScroll.refresh();
			})
			menuScroll.on('scroll', ()=>{
			//判断滚到了哪个菜单列表之间
				let currentY = menuScroll.y;
				
				for (let i = 0; i < this.menusHeightArr.length; i++) {
					let min = 0;
					for(let j = 0; j < i; j++){
						min -= this.menusHeightArr[j];
					}
	//				let max = min+下一个数据;
					let max = min-this.menusHeightArr[i];
	//				console.log(`${min}~~~~${max}`);
					//最小值和最大值是负数
					if(currentY <= min && currentY > max){
						this.selectNavIndex = i;
	//					console.log('选中了!!!!!!!!!!!!!!');
						break;
					}
				}
				
				//判断菜单按钮是否可见
				//菜单按钮滚动视图当前的位置
				
				//选中按钮在哪里
				let btns = Array.from(document.querySelectorAll('.nav-bar1 li'));
				let height = 0;
				for(let i = 0; i < this.selectNavIndex; i++){
					height -= btns[i].offsetHeight;
				}
				//判断菜单按钮是否可见
				if( navScroll.y > height && navScroll.y-navScroll.wrapper.offsetHeight < height  ){
					//按钮可见
				}else if(height > navScroll.y){
					//按钮不可见,按钮在滚动视图上面
					navScroll.scrollTo(0, height);
				}else if(height < navScroll.y-navScroll.wrapper.offsetHeight){
					//按钮不可见,按钮在滚动视图下面
					//还需要判断容器的最大滚动范围能不到这个按钮在顶部，如果不能，就到滚动的最大值
					if(height > navScroll.maxScrollY){
						navScroll.scrollTo(0, height);
					}else{
						navScroll.scrollTo(0, navScroll.maxScrollY);
					}
					
				}
			})
		},
		updated(){
			//获得菜单列表每一项高度
			let wrapperArr = Array.from(document.querySelectorAll('#goods .menu-wrap .wrapper'));
			this.menusHeightArr = wrapperArr.map((wrapperDiv)=>{
				return wrapperDiv.offsetHeight;
				
			})
			
		}
		
	}
</script>

<style>
#goods{
	display: flex;
	
}
#goods .nav-bar1{
	width: 70px;
	height: 100%;
	overflow: hidden;
}

#goods .nav-bar1 li{
	padding: 15px 4px;
	background: #ededed;
	font-size: 12px;
	color: #666;
	line-height: 16px;
	border-left: 2px solid #ededed;
	border-bottom: 1px solid #ddd;
}
#goods .nav-bar1 li.active{
	background: #fff;
	border-left: 2px solid #0085FF;
}
#goods .menu{
	flex: 1;
	height: 100%;
	background: #fff;
	overflow: hidden;
}
#goods .menu .title{
	height: 30px;
	font-size: 14px;
	font-weight: bold;
	color: #666;
	background: #EDEDED;
	line-height: 30px;
}
#goods .menu .title span{
	color:#999;
	font-size:12px;
	margin-left:5px;
}
#goods .menu .food{
	padding: 10px;
	display: flex;
	border-bottom: 1px solid #eee;
}
#goods .menu .food>img{
	width: 60px;
	height: 60px;
}
#goods .menu .food>.goodsInfo{
	flex: 1;
	padding:0 5px;
}
.goodsInfo>h5{
	font-size:14px;
	color:#333;
	line-height:14px;
}
.goodsInfo>p{
	width:220px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	line-height:18px;
	font-size:12px;
	color:#666;
}
.goodsInfo>h6{
	position: relative;
	margin:0;
	padding: 0;
	margin-top:5px;
}
.goodsInfo>h6>span{
	display: block;
	color:red;
	font-size:14px;
	font-weight: bold;
	
}
.goodsInfo>h6>p{
	display: block;
	position:absolute;
	top:0;
	right:0;
}
.goodsInfo>h6>p>em{
	display: inline-block;
	font-size:14px;
	width:20px;
	height:20px;
	background: #fff;
	border:1px solid #0089DC;
	border-radius: 50%;
	font-weight: bold;
	color:#fff;
	text-align: center;
	line-height: 20px;
	color:#0089DC;
}
.goodsInfo>h6>p>i{
	display: inline-block;
	font-size:14px;
	width:20px;
	height:20px;
	background: #0089DC;
	border-radius: 50%;
	font-weight: bold;
	color:#fff;
	text-align: center;
	line-height: 20px;
}
.goodsInfo>h6>p>span{
	display: inline-block;
	font-size:14px;
	width:20px;
	height:20px;
	color:#666;
	text-align: center;
	line-height: 20px;
}
.goodsInfo>h6 .choice01{
	width:50px;
	height:20px;
	line-height: 20px;
	border-radius: 10px;
	background: #0096FF;
	position:absolute;
	right:0;
	top:0;
	text-align: center;
	color:#fff;
	
}
.goods_discount{
	color:red;
	border:1px solid red;
	line-height:20px;
}
</style>