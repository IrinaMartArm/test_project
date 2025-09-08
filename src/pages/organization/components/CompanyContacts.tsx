import {type ChangeEvent, useState} from "react";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";
import {Button} from "../../../components";
import {CheckIcon} from "../../../assets/Check.tsx";
import {Delete} from "../../../assets/Delete.tsx";
import {EditIcon} from "../../../assets/Edit.tsx";
import {contactsStore, type ContactsType} from "../../../store";
import './index.scss'

export const CompanyContactsCard = observer(() => {
	const {contacts, isEditMode, toggleEditMode, updateContacts} = contactsStore
	const [formState, setFormState] = useState<ContactsType | null>(contacts ? toJS(contacts) : null)

	if(!formState || !contacts){
		return null
	}

	const handleNameChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const value = e.target.value.split(" ")
		const firstname = value[0]
		const lastname = value[1]

		setFormState({
			...formState,
			firstname,
			lastname,
		})
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;

		const cleanedValue = name === "phone" ? value.replace(/[^\d+]/g, '') : value

			setFormState({
				...formState,
				[e.target.name]: cleanedValue,
			})

	}

	const handleSave = () => {
		const payload = {
			firstname: formState.firstname,
			lastname: formState.lastname,
			phone: formState.phone,
			email: formState.email,
		}

		updateContacts(contacts.id, payload)
		toggleEditMode()
	}

	return (
		<section className="card card--contacts">
			<div className="card__header">
				<div className="card__header-title">Contacts</div>
				<div className="card__header-actions">
					{isEditMode ? (
						<>
							<Button onClick={handleSave} variant="flattened">
								<CheckIcon/>
								Save changes
							</Button>
							<Button onClick={toggleEditMode} variant="flattened">
								<Delete/>
								Cancel
							</Button>
						</>
					) : (
						<Button onClick={toggleEditMode} variant="flattened">
							<EditIcon size="16"/>
							Edit
						</Button>
					)}
				</div>
			</div>

			{isEditMode ? (
				<form className="card__list">
					<div className="card__row">
						<label className="card__label">Responsible person:</label>
						<input
							className="card__input"
							type="text"
							name="name"
							value={`${formState.firstname} ${formState.lastname}`}
							onChange={handleNameChange}
						/>
					</div>
					<div className="card__row">
						<label className="card__label">Phone number:</label>
						<input
							className="card__input"
							type="tel"
							name="phone"
							value={formState.phone}
							onChange={handleChange}
						/>
					</div>
					<div className="card__row">
						<label className="card__label">E-mail:</label>
						<input
							className="card__input"
							type="email"
							name="email"
							value={formState.email}
							onChange={handleChange}
						/>
					</div>
				</form>
				) : (
				<div className="card__list">
					<div className="card__row">
						<span className="card__label">Responsible person:</span>
						<span className="card__value">
							{formState.firstname}{' '}{formState.lastname}
						 </span>
					</div>
					<div className="card__row">
						<span className="card__label">Phone number:</span>
						<span className="card__value">+{formState.phone}</span>
					</div>
					<div className="card__row">
						<span className="card__label">E-mail:</span>
						<div className="items">
							{formState.email}
						</div>
					</div>
				</div>
			)}
		</section>
	)
})