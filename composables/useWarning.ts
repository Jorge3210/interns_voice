export const useWarning = (warn_message:string,$q:any) => {

  $q.notify({
    color: 'negative',
    textColor: 'secondary',
    icon: 'warning',
    message: warn_message,
    
  })
}
