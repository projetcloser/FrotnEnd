import { Membre } from "../models/membre";
import { Pays } from "../models/pays";
import { Quartier } from "../models/quartier";
import { Ville } from "../models/ville";

export const getEntityPorperties = (entity: String): Array<String>=>{
  let results: any = []
  let entityClass: any;

  if(entity == "pays"){
    entityClass = new Pays()
  }

  if(entity == "ville"){
    entityClass = new Ville()
  }

  if(entity == "quartier"){
    entityClass = new Quartier()
  }

  if(entity == "membre"){
    entityClass = new Membre()
  }
  // si
  if(entityClass){
    results = Object.keys(entityClass)
  }
  return results
}
