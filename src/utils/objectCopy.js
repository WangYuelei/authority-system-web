//快速吧obj1里面的内容复制到obj2
export default async function objCopy(obj1,obj2){
  Object.keys(obj2).forEach(key=>{
    obj2[key]=obj1[key]
  })
}
