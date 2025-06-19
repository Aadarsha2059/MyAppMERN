const request =require("supertest")
const app= require("../index")
const User= require("../models/User")
const mongoose=require("mongoose")

afterAll(async ()=>{
    await mongoose.disconnect()
})
let authToken
// describe - what are you testing? grouping
describe("User Authentication API",
    () => {
        beforeAll(async () =>{
            await User.deleteOne({email: "ram123@gmail.com"})
        })
        // test() individual test- what api route are we testing
        test("can validate use while creating user",
            async() =>{
                // actions "actual api call"
                const res= await request(app)
                .post("/api/auth/register")
                .send({
                   
                    email:"ram123@gmail.com",
                    password:"password"
                }
            )
            // expectation-assertion - what should happen?
            expect(res.statusCode).toBe(400)
            expect(res.body.success).toBe(false)
            expect(res.body.message).toBe("Missing fields")

            }
        )
        // more test
        test(
            "can register user with all fields",
            async() =>{
                const res= await request(app)
                   .post("/api/auth/register")
                   .send({
                    firstName:"ram",
                    lastName:"bahadur",
                    email:"ram123@gmail.com",
                    username:"ram123",
                    password:"password"
                   }
                )
                expect(res.statusCode).toBe(201)
                expect(res.body.success).toBe(true)
            }
        )
        test(
            "can login user with valid credentials",
            async () =>{
                const res= await request(app)
                .post("/api/auth/login")
                .send(
                    {
                        email:"ram123@gmail.com",
                        password:"password"
                    }
                )
                expect(res.statusCode).toBe(200)
                expect(res.body.success).toBe(true)
                expect(res.body.token).toEqual(expect.any(String))
                authToken=res.body.token
            }
        )
    }
)

describe(
    "Authenticated Admin routes",
    () =>{
        beforeAll (async () =>{
            await User.updateOne(
                {email:"ram123@gmail.com"},
                { $set:{role:"admin"}}
            )
        })
        test(
            "can get users as admin with token",
            async() =>{
                const res = await request(app)
                .get("/api/admin/users")
                .set("Authorization", "Bearer " + authToken)

                expect(res.statusCode).toBe(200)
                expect(res.body.success).toBe(true)
            }
        )
        // test(
        //     "cannot get users as admin without token"
        // )
    }
)