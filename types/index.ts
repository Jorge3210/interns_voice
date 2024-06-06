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
    backendUserInfoAddress:string,
    backendCoursesAddress:string,
    backendCompaniesAddress:string,
    backendReviewAdress:string,
    backendCompanyAddress:string,
    backendReviewByCompanyAddress:string,
    backendVotesByReviewAndUserAddress:string,
    backendVoteActionAddress:string,
    backendReviewWithFiltersAdress:string,

    
  
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
  
  interface Company{
    id:number,
    nombre:string,
    direccionWeb:string,
    logo:string,
    valoracion:number,

  }

  interface Review{
    id: number,
    titulo: string,
    modalidad: string,
    descripcion:string,
    empresaPracticas: {
        id: number,
        nombre: string,
        logo:string,
        direccionWeb: string,
        valoracion: number
    },
    fechaPublicacion: Date,
    estrellas: number,
    votos:number,
    userVoted:string,
    showDialog: boolean|undefined
  }

  interface VoteResponse{
    voteType:string,
    totalVotes:number,
  }

  type FilterTransferObject={
     modality:number| undefined
     company:Company|undefined
     rating:number|undefined,
     dateRange:string|undefined[]|undefined
  }

 
