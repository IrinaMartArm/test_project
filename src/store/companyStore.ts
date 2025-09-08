import {makeAutoObservable} from "mobx";
import * as api from "../api";

export type Photo = {
	name: string;
	createdAt: string;
	filepath: string;
	thumbpath: string;
}

type Contract = {
	no: string;
	issue_date: string;
}

export type CompanyType = {
	id: string;
	name: string;
	shortName: string;
	status: string;
	type: string[];
	photos: Photo[];
	contract: Contract;
	contactId: string;
	businessEntity: string;
	issue_date: string;
	no: string;
	createdAt: string;
	updatedAt?: string;
}


class CompanyStore {
	company: CompanyType | null = null
	isEditMode: boolean = false
	isLoading: boolean = false

	constructor() {
		makeAutoObservable(this);
	}

	 fetchCompany = async (id: string) => {
		this.isLoading = true
		try {
			this.company = await api.getCompany(id)
		} finally {
			this.isLoading = false
		}
	}

	updateCompany = async (id: string, payload: any) => {
		this.isLoading = true
		try {
			this.company = await api.updateCompany(id, payload)
		} finally {
			this.isLoading = false
		}
	}

	 deleteCompany = async(id: string)=> {
		await api.deleteCompany(id)
		this.company = null
	}

	uploadImage = async (file: File) => {
		const img = await api.uploadImage(file)
		if (this.company) {
			this.company.photos.push(img)
		}
	}

	 deleteImage = async (imageName: string)=> {
		 await api.deleteImage(imageName)
		 if (this.company) {
			 this.company.photos = this.company.photos.filter(
				 (p) => p.name !== imageName
			 )
		 }
	}

	toggleEditMode = () => {
		this.isEditMode = !this.isEditMode
	}
}

export const companyStore = new CompanyStore()


