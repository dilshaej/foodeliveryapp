import { commonAPI } from "./commonAPI"
import { SERVER_URL } from "./serverURL"

//register api - called by component Authentication
export const registerAPI = async (reqBody)=>{
    return  await commonAPI ("POST",`${SERVER_URL}/register`,reqBody)
 }
 
 //login api - called by component Authentication
 export const loginAPI = async (reqBody)=>{
     return  await commonAPI ("POST",`${SERVER_URL}/login`,reqBody)
  }
//   add food = called by additems component
export const addFoodAPI = async (reqBody,reqHeader)=>{
    return  await commonAPI ("POST",`${SERVER_URL}/add`,reqBody,reqHeader)
 
 }
// get all food items list
 export const getAllFoodListAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/list`,"",reqHeader)
 }

 // remove food items from list
export const removeFoodListAPI = async (foodId,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/remove/${foodId}`,{},reqHeader)
 }
