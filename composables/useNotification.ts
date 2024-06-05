export const useNotification = (notification:string,$q:any) => {
  
  $q.notify({
    color: 'primary',
    textColor: 'secondary',
    icon: 'info',
    message: notification,
    
  })
}
