import http from "./http-common";




class DataService {



    getItems(){
      return  http.get('/')
    }

    getItemById(id){
        return http.get('/${id}')
}}

export default new DataService();