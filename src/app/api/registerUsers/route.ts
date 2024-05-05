import {NextRequest,NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { db } from '../firebase';
import { collection, addDoc,query, where, limit, getDocs} from "firebase/firestore";


export async function POST(req:NextRequest) {
    const {firstName,lastName,emailAddress,password}= await req.json();

    //hashing and salting user passwords
    async function hashPassword(password:string) {
        const saltRounds = 10;
        try {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            return hashedPassword;
        } catch (error) {
            console.error(error);
            return null;
        }
    }


    //query db to check if this new user already exists in the database
    async function findUser():Promise<any[]>{
      const findUserQuery = query(
        collection(db,'users'),
        where('emailAddress','==',emailAddress),
        limit(1)
      )

       const querySnapshot = await getDocs(findUserQuery);


       return querySnapshot.docs;

    }
    

    //saving users into our firestore database
    const userResult = await findUser();
    
    if(userResult.length === 0){
      
      try {
        const docRef = await addDoc(collection(db, "users"), {
          firstName:firstName ,
          lastName: lastName,
          emailAddress: emailAddress,
          password: await hashPassword(password)
        });
        console.log("new user Document written with ID: ", docRef.id);
        return NextResponse.json({'message':`created new user with email ${emailAddress} in cloud firestore`,success:true,statusCode:201});
      } catch (e) {
        console.error("Error adding document: ", e);
        return NextResponse.json({'message':'failure'});
      }

    }else{ // 409 Conflict
      return NextResponse.json({'message':`account not created! because a user with the email ${emailAddress} already exists!,please choose a different email address.`,success:false,statusCode:409});
    }
   
      




    
   












    
   
};


