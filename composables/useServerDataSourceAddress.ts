import fs from "fs";
import path from "path";

export const useServerDataSourceAddress = () => {
  const configPath = path.resolve( "~static/config.json").replace("~","");
   return (JSON.parse(fs.readFileSync(configPath, 'utf-8')) as DataSourceConfig)
}
