'use server';

import db from "@/services/prisma";
import { nanoid } from "nanoid";
import { Prisma } from "../../generated/prisma";

export async function getAllUrls(){
    try{
        const resp = await db.link.findMany();
        return {
            success: true,
            urls: resp
        }
    }catch(error){
        console.error("Error occurred: ", error);
        return{
            success: false,
            message: "can't get links"
        }
    }   
}

export async function createShortUrl(originalUrl: string) {
    let retries = 5;
    while (retries > 0) {
        const shortCode = nanoid(7);
        try {
            const createUrl = {
                originalUrl,
                shortCode
            }
            const resp = await db.link.create({
                data: createUrl,
            });
            return {
                success: true,
                shortCode: resp.shortCode
            }
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                console.log("Collision detected. Retrying...");
                retries--;
            }
            else {
                console.error("Failed to create link:", error);
                return { success: false, error: 'Could not create link.' };
            }
        }
    }
    return { success: false, error: 'Failed to generate a unique link after multiple attempts.' };
}

export async function checkUrl(shortCode: string){
    try{
        const resp = await db.link.findUnique({
            where:{
                shortCode: shortCode
            },
        });
        return resp?.originalUrl;
    }catch(error){
        console.error("Database error: ", error);
    }
}