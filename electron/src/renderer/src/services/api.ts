import axios, { AxiosResponse } from "axios"

import { Server as ServerConst } from "../utils/constants"

const client = axios.create({
    baseURL: ServerConst.apiBaseURL
})

async function request(
    method: string,
    url: string,
    data: Record<string, any>,
    headers: Record<string, any>
): Promise<boolean> {
    const config = { method, url, data, headers }
    let isError = false
    let response: AxiosResponse | null = null
    try {
        response = await client.request(config)
    } catch (err: any) {
        console.log(err.response ? err.response.data["message"] : err)
        isError = true
    }

    if (response !== null) {
        if (!(response.status >= 200 && response.status <= 308)) {
            isError = true
        }
    }

    return isError
}

export async function sendImgPaths(paths: string[], yearOption: string): Promise<boolean> {
    const payload = { paths: paths, "year_option": yearOption }
    const headers = { "Content-Type": "application/json" }

    return await request("POST", "/images", payload, headers)
}
