


export default defineNuxtRouteMiddleware(async(to) => {
if(import.meta.client){

if(to.path!="/"&&to.path!="/search"){
   const apiAddress=await useDataSourceTokenCheckAddress();
   const storage=localStorage;
   const token=storage.getItem("token");
   const userId=storage.getItem("userId")
   /*console.log((await useFetch(apiAddress,{server:false, lazy:true, params:{token:token,userId:userId}})).data.value)*/
   if(token==null||userId==null||!(await useFetch(apiAddress,{server:false, lazy:true, params:{token:token,userId:userId}})).data.value){
         
      if(to.path!=="/login"){
      storage.setItem("prevPage",to.path)
      return navigateTo("/login");
      }

   }

   

}
}
})
