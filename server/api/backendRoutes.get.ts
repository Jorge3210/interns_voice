import { useServerDataSourceAddress } from "~/composables/useServerDataSourceAddress";

export default defineEventHandler(()=>{
    
    return useServerDataSourceAddress();
})


