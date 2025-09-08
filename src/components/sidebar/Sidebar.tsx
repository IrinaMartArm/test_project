import './sidebar.scss'
import {LogoIcon} from "../../assets/Logo.tsx";
import {SettingsIcon} from "../../assets/Settings.tsx";
import {SignOutIcon} from "../../assets/SignOut.tsx";
import {CompanyIcon} from "../../assets/Company.tsx";
import {SearchIcon} from "../../assets/Deceased.tsx";
import {Button, type ButtonVariant} from "../button";
import {Contractors} from "../../assets/Contractor.tsx";
import {Account} from "../../assets/Account.tsx";
import type {ReactNode} from "react";

type SidebarButtons = {
	icon: ReactNode
	label: string
	variant: ButtonVariant
}

const sidebarButtons: SidebarButtons[] = [
	{icon: <CompanyIcon/>, label: 'Organizations', variant: 'filled' },
	{icon: <Contractors/>, label: 'Contractors', variant: 'outline' },
	{icon: <Account/>, label: 'Clients', variant: 'outline' }];

export const Sidebar = () => {
	return (
		<aside className="sidebar">
			<div className="sidebar__menu">
				<div className="sidebar__menu-item">
					<LogoIcon/>
					<Button variant="filledIcon"><div className="testSize"><CompanyIcon/></div></Button>
					<Button variant="filledIcon"><SearchIcon/></Button>
				</div>
				<div className="sidebar__menu-item">
					<Button variant="filledIcon"><SettingsIcon/></Button>
					<Button variant="filledIcon"><SignOutIcon/></Button>
				</div>
			</div>
			<nav className="sidebar__nav">
				<div className="sidebar__nav-item">
					<div>
						<div className="sidebar__nav-title">Oak Tree Cemetery</div>
						<div className="sidebar__nav-subTitle">Process Manager</div>
					</div>
					<div className="sidebar__nav-divider"/>
					<div className="sidebar__nav-buttons">
						{sidebarButtons.map(({icon, label, variant}) => (
							<Button variant={variant} key={label} icon={icon}>{label}</Button>
						))}
					</div>
				</div>
				<div className="sidebar__nav-copyright ">All Funeral Services © 2015-2025</div>
			</nav>
		</aside>
	)
}