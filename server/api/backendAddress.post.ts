import fs from "fs";
import path from "path";
import { useServerDataSourceAddress } from "~/composables/useServerDataSourceAddress";


interface DataSourceConfig {
  backendUrl: string;

}

export default defineEventHandler(async(event)=>{
  
    const auth_id=event.headers.get("auth_id");
    const auth_token=event.headers.get("auth_token");
    const authorized=await $fetch(useServerDataSourceAddress()+"/token/comprobarToken",{params:{
      userId:auth_id,
      token:auth_token

    }})
    if(authorized){
    const query = getQuery(event)
    const configPath = path.resolve( "~static/config.json").replace("~","");;
    const config: DataSourceConfig = JSON.parse(fs.readFileSync(configPath,"utf-8"))
    if(query.newBackend!=null){
      if((JSON.parse(fs.readFileSync(configPath, 'utf-8')) as DataSourceConfig).backendUrl==query.newBackend){
      setResponseStatus(event,304)
      }else{
        setResponseStatus(event,200,"OK")
       
      }
      config.backendUrl=query.newBackend as string
    }
    fs.writeFile(configPath, JSON.stringify(config),(err) => {
      if(err){
        setResponseStatus(event,500)
      }
    })
    return "";
   
  }else{
    setResponseStatus(event,401)
  }
  
    

    
})