import fs from "fs";
import { useScheduler } from "#scheduler";
import path from "path";
import { useFormattedTime } from "~/composables/useFormattedTime";//Si no importas en la carpeta server revienta

export default defineNitroPlugin(() => {
    if (process.env.APP_ENV === 'build') {
        console.log('[server/plugins/scheduler.ts] Skipping scheduler, in build context');
        return;
    }
    
    fetchReviews()
})

function fetchReviews(){
    const scheduler= useScheduler();

    scheduler.run(async()=>{

            
            console.log(useFormattedTime()+` SCHEDULER: START FETCHING FOR fetchReviews`)
            const reviews= await fetch("https://iaxcloud.com/api/actividades",{method:"get"})
            const reviews_json=await reviews.json();
            try{
            fs.writeFileSync(path.join(process.cwd(),"content","reviews.json"),JSON.stringify(reviews_json),{flag:'w'});
            console.log(useFormattedTime()+" REVIEW DATA SAVED SUCCESFULLY")
        } catch (err) {
            console.log(useFormattedTime()+' ERROR WRITING reviews.json:' + err)
        }
           
            
    }).everySeconds(5);
    
}