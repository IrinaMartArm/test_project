import {type ChangeEvent, useState} from "react";
import {toJS} from "mobx";
import {observer} from "mobx-react-lite";
import {Button} from "../../../components";
import {CheckIcon} from "../../../assets/Check.tsx";
import {Delete} from "../../../assets/Delete.tsx";
import {EditIcon} from "../../../assets/Edit.tsx";
import {companyStore, type CompanyType} from "../../../store";
import {MultiSelect, Modal, Select} from "../../../components";
import {businessEntityList, companyTypeList} from "../constants";
import {TrashIcon} from "../../../assets/Trash.tsx";
import {formatDate} from "../../../utils";
import './index.scss'

export const CompanyDetailsCard = observer(() => {
	const { company, isEditMode, toggleEditMode, updateCompany, deleteCompany } = companyStore
	const [formState, setFormState] = useState<CompanyType | null>(company ? toJS(company) : null)
	const [isModalOpen, setIsModalOpen] = useState({edit: false, delete: false});

	if(!formState || !company){
		return null
	}

	const date = formatDate(formState.contract.issue_date)

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;

		setFormState(prevState => {
			if (!prevState) return null;

			if (name in prevState.contract) {
				return {
					...prevState,
					contract: {
						...prevState.contract,
						[name]: value
					}
				};
			} else {
				return {
					...prevState,
					[name]: value
				};
			}
		});
	};

	const onBusinessEntityChange = (value: string) => {
		setFormState({
			...formState,
			businessEntity: value,
		})
	}

	const onCompanyTypeListChange = (value: string) => {
		setFormState(prevState => {
			if (!prevState) return null;

			return {
				...prevState,
				type: prevState.type.includes(value)
					? prevState.type.filter((v) => v !== value)
					: [...prevState.type, value]
			}
		})
	}

	const handleSave = () => {
		const payload = {
			contract: {
				no: formState.contract.no,
				issue_date: formState.contract.issue_date,
			},
			businessEntity: formState.businessEntity,
			type: formState.type,
		}

		updateCompany(company.id, payload)
		toggleEditMode()
	}

	const toggleEditModal = () => setIsModalOpen(prev => ({ ...prev, edit: !prev.edit }));
	const toggleDeleteModal = () => setIsModalOpen(prev => ({ ...prev, delete: !prev.delete }));

	return (
		<>
		<header className="header">
			<h1 className="header__title">{formState.name}</h1>
			<div className="header__actions">
				<Button variant="icon" onClick={toggleEditModal}>
					<EditIcon size="20"/>
				</Button>
				<Button onClick={toggleDeleteModal} variant="icon">
					<TrashIcon color="var(--color-error)"/>
				</Button>
			</div>
		</header>

		<section className="card">
			<div className="card__header">
				<div className="card__header-title">Company Details</div>
				<div className="card__header-actions">
					{isEditMode ? (
						<>
							<Button onClick={handleSave} variant="flattened">
								<CheckIcon/>Save changes
							</Button>
							<Button onClick={toggleEditMode} variant="flattened">
								<Delete/>Cancel
							</Button>
						</>
					) : (
						<Button onClick={toggleEditMode} variant="flattened">
							<EditIcon size="16"/>Edit
						</Button>
					)}
				</div>
			</div>


			{isEditMode ? (
				<form className="card__list">
					<div className="card__row">
						<label className="card__label">Agreement number:</label>
						<input
							className="card__input card__input-small"
							type="text"
							name="no"
							value={formState.contract.no}
							onChange={handleChange}
						/>
						<label className="card__label-date">Date:</label>
						<input
							className="card__input card__input-small"
							type="text"
							name="issue_date"
							value={date}
							onChange={handleChange}
						/>
					</div>
					<div className="card__row">
						<label className="card__label">Business entity:</label>
						<Select items={businessEntityList} onChange={onBusinessEntityChange} value={formState.businessEntity}/>
					</div>
					<div className="card__row">
						<label className="card__label">Company type:</label>
						<MultiSelect
							options={companyTypeList}
							values={formState.type}
							onChange={onCompanyTypeListChange}
						/>
					</div>
				</form>
			) : (
				<div className="card__list">
					<div className="card__row">
						<span className="card__label">Agreement:</span>
						<span className="card__value-date">
							{formState.contract.no}
							<span>/</span>
							{date}
						</span>
					</div>
					<div className="card__row">
						<span className="card__label">Business entity:</span>
						<span className="card__value">{formState.businessEntity}</span>
					</div>
					<div className="card__row">
						<span className="card__label">Company type:</span>
						<div className="items">
							<span className="card__value">
    							{formState.type.join(', ')}
  							</span>
						</div>
					</div>
				</div>
			)}
			{isModalOpen.edit && <Modal onClick={toggleEditModal}>
				<div className="modal__content-title">Specify the Organization's name</div>
                <input
                    className="card__input"
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                />
				<div className="modal__content-buttons">
					<Button onClick={toggleEditModal} variant="outline">Cancel</Button>
					<Button onClick={()=> {
						handleSave()
						toggleEditModal()
					}}>Save changes</Button>
				</div>
			</Modal>}
			{isModalOpen.delete && <Modal onClick={toggleDeleteModal}>
                <div className="modal__content-title">Remove the Organization?</div>
                <div className="modal__content-subtitle">
					Are you sure you want to remove this Organozation?
				</div>
                <div className="modal__content-buttons">
                    <Button onClick={toggleDeleteModal} variant="outline">No</Button>
                    <Button onClick={()=> {
						deleteCompany('12')
						toggleDeleteModal()
					}}>Yes, remove</Button>
                </div>
            </Modal>}
		</section>
		</>
	)
})