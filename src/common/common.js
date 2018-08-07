//处理图片地址
import URL from './api.js'
export function handleImg(path){
	if(!path){
		return ''
	}
	path=path.split('');
	path.splice(1,0,"/");
	path.splice(4,0,"/");
	path=path.join('')

	if(path.endsWith('png')){
		path = path + '.png'
	}
	else if(path.endsWith('jpeg')){
		path = path + '.jpeg'
	}
	return URL.imgHost+path;
}
