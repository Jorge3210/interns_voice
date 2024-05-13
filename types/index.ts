interface LoginResponse{
    id:number,
    token:string,
    resultCode:string,
    


}
interface DataSourceConfig {
    backendUrl: string,
    backendTokenCheckAddress:string,
    backendReviewsAddress:string,
    backendUserLoginAddress:string,
    backendUserInfoAddress:string
  
  }

interface UserProfile {
    id: number
    email: string
    dni: string
    nombre: string
    apellidos: string
    telefono: string
    empresa: string
    direccion: string
    imagen: string
    creado: string
  }
  
