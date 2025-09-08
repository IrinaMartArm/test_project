import {makeAutoObservable} from "mobx";
import * as api from "../api";

export type ContactsType = {
	id: string
	lastname: string
	firstname: string
	phone: string
	email: string
	createdAt: string
	updatedAt: string
}


class ContactsStore {
	contacts: ContactsType | null = null
	isEditMode: boolean = false
	isLoading: boolean = false

	constructor() {
		makeAutoObservable(this);
	}

	 fetchContacts = async (id: string) => {
		this.isLoading = true
		try {
			this.contacts = await api.getContacts(id)
		} finally {
			this.isLoading = false
		}
	}

	updateContacts = async (id: string, payload: any) => {
		this.isLoading = true
		try {
			this.contacts = await api.updateContacts(id, payload)
		} finally {
			this.isLoading = false
		}
	}

	toggleEditMode = () => {
		this.isEditMode = !this.isEditMode
	}
}

export const contactsStore = new ContactsStore()
