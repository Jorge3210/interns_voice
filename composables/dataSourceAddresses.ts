
export const useDataSourceBaseAddress = async ()  => {
 
  const backendRoutes= await $fetch("/api/backendRoutes") as DataSourceConfig;
  return backendRoutes.backendUrl;

 
}

export const useDataSourceTokenCheckAddress= async ()  => {

  const backendRoutes= await $fetch("api/backendRoutes")as DataSourceConfig;
  return backendRoutes.backendUrl+backendRoutes.backendTokenCheckAddress;

 
}

export const useDataSourceReviewsAddress= async ()  => {
 
  const backendRoutes= await $fetch("/api/backendRoutes") as DataSourceConfig;
  return backendRoutes.backendUrl+backendRoutes.backendReviewsAddress;

 
}

export const useDataSourceLoginAddress= async ()  => {
 
  const backendRoutes= await $fetch("/api/backendRoutes") as any as DataSourceConfig;
  return backendRoutes.backendUrl+backendRoutes.backendUserLoginAddress;

 
}

export const useDataSourceUserInfoAddress=async (id:string)=>{
  const backendRoutes= await $fetch("/api/backendRoutes") as any as DataSourceConfig;
  return backendRoutes.backendUrl+backendRoutes.backendUserInfoAddress+id;
}
