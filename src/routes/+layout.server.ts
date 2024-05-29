import { env } from '$env/dynamic/private'
const INVENTEC_SERVICE_URL = env.INVENTEC_SERVICE_URL
export async function load() {
	return { INVENTEC_SERVICE_URL }
}
