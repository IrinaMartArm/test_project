import type {ReactNode} from "react";
import './modal.scss'

type ModalProps = {
	children: ReactNode
	onClick: () => void
}

export const Modal = ({children, onClick}: ModalProps) => {
	return (
		<div className="modal" onClick={onClick}>
			<div className="modal__content" onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>
	)
}