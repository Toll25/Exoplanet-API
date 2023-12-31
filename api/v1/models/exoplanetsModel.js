import mysql from 'mysql2/promise.js'
import dbConfig from './dbConfig.js'

const connection = await mysql.createConnection(dbConfig)


export async function getAllExoplanets() {
    const result = await connection.query(
        'select id, planet_name, hostname, planet_letter from exoplanets;')
    if (result.length>0){
        return result[0]
    }
}

export async function createExoplanet(exo){
    const result = await connection.query(
        'INSERT INTO exoplanets VALUES (?, ?, ?, ?, 0,0,0,0,0,0,0);',[exo.id, exo.planet_name, exo.hostname, exo.planet_letter])
    if (result.length>0){
        console.log(result[0])
        return result[0]
    }
}

export async function getExoplanetById(id){
    const result = await connection.query(
        'select id, planet_name, hostname, planet_letter from exoplanets where id = ?;',[id])
    if (result.length>0){
        console.log(result[0])
        return result[0]
    }
}

export async function updateExoplanetById(exo, id){
    const result = await connection.query(
        'UPDATE exoplanets SET planet_name=?, hostname=?, planet_letter=? where id = ?;',[exo.planet_name, exo.hostname, exo.planet_letter, id])
    if (result.length>0){
        console.log(result[0])
        return result[0]
    }
}

export async function deleteExoplanetById(id){
    await connection.query('delete from discoveries where exoplanet_id')
    const result = await connection.query(
        'delete from exoplanets where id = ?;',[id])
    if (result.length>0){
        console.log(result[0])
        return result[0]
    }
}

export async function replaceExoplanetById(id){
    const result = await connection.query(
        'select id, planet_name, hostname, planet_letter from exoplanets where id = ?;',[id])
    if (result.length>0){
        console.log(result[0])
        return result[0]
    }
}


export const exoplanetsModel = {
    exoplanets: [
        {
            id: 1,
            planet_name: 'WASP-47 b',
            hostname: 'WASP-47',
            planet_letter: 'b'
        },
        {
            id: 2,
            planet_name: 'WASP-47 c',
            hostname: 'WASP-47',
            planet_letter: 'c'
        },
        {
            id: 3,
            planet_name: 'WASP-47 d',
            hostname: 'WASP-47',
            planet_letter: 'd'
        },
        {
            id: 4,
            planet_name: 'WASP-47 e',
            hostname: 'WASP-47',
            planet_letter: 'e'
        }
    ]
};