


export default defineNuxtRouteMiddleware(async(to) => {
if(import.meta.client){

if(to.path!="/"&&to.path!='/job-search'){
   const apiAddress=await useDataSourceTokenCheckAddress();
   const storage=localStorage;
   const token=storage.getItem("token");
   const userId=storage.getItem("userId")
   if(token==null||userId==null){
      
      if(!(await $fetch(apiAddress,{retryDelay:500,server:false, lazy:true, params:{token:token,userId:userId}}).catch(()=>false)))
      if(to.path!=="/login"){
      storage.setItem("prevPage",to.path)
      return navigateTo("/login");
      }

   }

   

}
}
})
