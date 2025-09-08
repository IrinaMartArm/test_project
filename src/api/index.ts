import axios from "axios"

export const api = axios.create({
	baseURL: "https://test-task-api.allfuneral.com",
	headers: {
		"Content-Type": "application/json",
	},
})

export async function auth(user: string) {
	const res = await api.get(`/auth?user=${user}`)
	const token = res.headers["authorization"]
	api.defaults.headers.common["Authorization"] = token
	return token
}

export async function getCompany(id: string) {
	const { data } = await api.get(`/companies/${id}`)
	return data
}

export async function updateCompany(id: string, payload: any) {
	const { data } = await api.patch(`/companies/${id}`, payload)
	return data
}

export async function deleteCompany(id: string) {
	await api.delete(`/companies/${id}`)
}

export async function getContacts(id: string) {
	const { data } = await api.get(`/contacts/${id}`)
	return data
}

export async function updateContacts(id: string, payload: any) {
	const { data } = await api.patch(`/contacts/${id}`, payload)
	return data
}

export async function uploadImage(file: File) {
	const formData = new FormData()
	formData.append("file", file)
	const { data } = await api.post(`/companies/12/image`, formData, {
		headers: { "Content-Type": "multipart/form-data" },
	})
	return data
}

export async function deleteImage(imageName: string) {
	await api.delete(`/companies/12/image/${imageName}`)
}