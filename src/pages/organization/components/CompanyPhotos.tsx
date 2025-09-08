import {Button} from "../../../components/button";
import {type ChangeEvent, useRef, useState} from "react";
import {companyStore, type CompanyType, type Photo} from "../../../store/companyStore.ts";
import {observer} from "mobx-react-lite";
import './index.scss'
import {toJS} from "mobx";
import {AddPhotoIcon} from "../../../assets/AddPhoto.tsx";
import {TrashIcon} from "../../../assets/Trash.tsx";

export const CompanyPhotosCard = observer(() => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const { company, deleteImage, uploadImage } = companyStore
	const [formState, setFormState] = useState<CompanyType | null>(company ? toJS(company) : null)

	if(!formState || !company){
		return null
	}

	const handleButtonClick = () => {
		fileInputRef.current?.click();
	};

	const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const newPhoto: Photo = {
				name: file.name,
				filepath: URL.createObjectURL(file),
				createdAt: new Date().toISOString(),
				thumbpath: URL.createObjectURL(file),
			}
			setFormState({
				...formState,
				photos: [...formState.photos, newPhoto],
			})
			await uploadImage(file);
		}
	};

	const onDeleteImage = (name: string) => {
		setFormState({
			...formState,
			photos: formState.photos.filter((photo) => photo.name !== name),
		})
		deleteImage(name)
	}

	return (
		<section className="card">
			<div className="card__header">
				<div className="card__header-title">Photos</div>
				<div className="card__header-actions">
					<input
						type="file"
						ref={fileInputRef}
						onChange={handleFileSelect}
						accept="image/*"
						style={{ display: 'none' }}
					/>
					<Button onClick={handleButtonClick} variant="flattened">
						<AddPhotoIcon/>Add
					</Button>
				</div>
			</div>

			<ul className="card__gallery">
				{formState.photos.map((photo, index) => (
					<li key={index} className="card__photo">
						<img src={photo.filepath} width="100%" height="100%" alt="Funeral Home"/>
						<div className="card__photo-action">
							<Button onClick={()=>onDeleteImage(photo.name)} variant="filledIcon">
								<TrashIcon size="16"/>
							</Button>
						</div>
					</li>
				))}
			</ul>
		</section>
	)
})
