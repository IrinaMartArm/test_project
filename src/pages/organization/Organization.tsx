import {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {Button} from "../../components";
import {CompanyDetailsCard, CompanyPhotosCard, CompanyContactsCard} from "./components";
import {companyStore, contactsStore} from "../../store";
import './organization.scss'
import {ChevronIcon} from "../../assets/Chevron.tsx";

export const OrganizationPage = observer(() => {
	const {isLoading, fetchCompany} = companyStore
	const {isLoading: contactsLoading, fetchContacts} = contactsStore

	useEffect(() => {
		fetchCompany("12")
		fetchContacts('16')
	}, [])

	if (isLoading || contactsLoading) return <p>Loading...</p>

	return (
		<main className="main">
			<div className="content">
				<Button variant="icon">
					<ChevronIcon direction="left"/>
				</Button>

				<div className="content-items">
					<CompanyDetailsCard />

					<CompanyContactsCard/>

					<CompanyPhotosCard/>
				</div>
			</div>
		</main>
	)
})