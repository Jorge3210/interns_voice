import Id from "~/pages/company/[id].vue";

export const useDataSourceBaseAddress = async ()  => {
 
  const backendRoutes= await $fetch("/api/backendRoutes") as DataSourceConfig;
  return backendRoutes.backendUrl;

 
}

export const useDataSourceTokenCheckAddress= async ()  => {

  const backendRoutes= await $fetch("/api/backendRoutes")as DataSourceConfig;
  return backendRoutes.backendUrl+backendRoutes.backendTokenCheckAddress;

 
}

export const useDataSourceReviewsAddress= async ()  => {
 
  const backendRoutes= await $fetch("/api/backendRoutes") as DataSourceConfig;
  return backendRoutes.backendUrl+backendRoutes.backendReviewsAddress;

 
}

export const useDataSourceCoursesAddress= async ()  => {
 
  const backendRoutes= await $fetch("/api/backendRoutes") as DataSourceConfig;
  return backendRoutes.backendUrl+backendRoutes.backendCoursesAddress;

 
}

export const useDataSourceCompaniesAddress= async ()  => {
 
  const backendRoutes= await $fetch("/api/backendRoutes") as DataSourceConfig;
  return backendRoutes.backendUrl+backendRoutes.backendCompaniesAddress;

 
}

export const useDataSourceLoginAddress= async ()  => {
 
  const backendRoutes= await $fetch("/api/backendRoutes") as any as DataSourceConfig;
  return backendRoutes.backendUrl+backendRoutes.backendUserLoginAddress;

 
}

export const useDataSourceUserInfoAddress=async (id:string)=>{
  const backendRoutes= await $fetch("/api/backendRoutes") as any as DataSourceConfig;
  return backendRoutes.backendUrl+backendRoutes.backendUserInfoAddress+id;
}

export const useDataSourceReviewAddress=async ()=>{
  const backendRoutes= await $fetch("/api/backendRoutes") as any as DataSourceConfig;
  return backendRoutes.backendUrl+backendRoutes.backendReviewAdress;
}

export const useDataSourceCompanyAddress=async (id:string)=>{
  const backendRoutes= await $fetch("/api/backendRoutes") as any as DataSourceConfig;
  return backendRoutes.backendUrl+backendRoutes.backendCompanyAddress+id;
}

export const useDataSourceReviewByCompanyAddress=async (id:string)=>{
  const backendRoutes= await $fetch("/api/backendRoutes") as any as DataSourceConfig;
  return backendRoutes.backendUrl+backendRoutes.backendReviewByCompanyAddress+id;
}

export const useDataSourceVotesByReviewAndUserAddress=async (id:string)=>{
  const backendRoutes= await $fetch("/api/backendRoutes") as any as DataSourceConfig;
  return backendRoutes.backendUrl+backendRoutes.backendVotesByReviewAndUserAddress+id;
}

export const useDataSourceBackendVoteActionAddress=async ()=>{
  const backendRoutes= await $fetch("/api/backendRoutes") as any as DataSourceConfig;
  return backendRoutes.backendUrl+backendRoutes.backendVoteActionAddress;
}

export const useDataSourceBackendReviewWithFiltersAdress=async ()=>{
  const backendRoutes= await $fetch("/api/backendRoutes") as any as DataSourceConfig;
  return backendRoutes.backendUrl+backendRoutes.backendReviewWithFiltersAdress;
}




